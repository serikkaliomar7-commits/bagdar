"""
Bağdar сервері: сайт + деректер қоры + ЖИ-сұхбат + пікірлер + әкімші панелі.

Іске қосу (жергілікті):
    ANTHROPIC_API_KEY=...  ADMIN_TOKEN=...  python3 -m uvicorn server.app:app --port 8000
Дерекқор: data/bagdar.db (SQLite). Өндірісте — ҚР аумағындағы сервер (PS.kz),
себебі «Дербес деректер туралы» Заң деректерді ҚР-да сақтауды талап етеді.
"""
from __future__ import annotations

import csv
import hmac
import io
import json
import os
import re
import secrets
import sqlite3
import time
from contextlib import contextmanager
from pathlib import Path
from typing import List, Optional

import anthropic
from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import RedirectResponse, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

ROOT = Path(__file__).resolve().parent.parent
DB_PATH = Path(os.environ.get("BAGDAR_DB", ROOT / "data" / "bagdar.db"))
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "")
MODEL = "claude-opus-5-5"
MAX_STATE_BYTES = 200_000
MAX_ANSWER_CHARS = 1000
INTERVIEW_QUESTIONS = 5          # 3 ортақ + 2 нысаналы
INTERVIEW_MAX_CALLS = 12         # API-ді теріс пайдаланудан қорғау
RETENTION_DAYS = int(os.environ.get("RETENTION_DAYS", "365"))   # соңғы әрекеттен кейін өшіру
ADMIN_IPS = {ip.strip() for ip in os.environ.get("ADMIN_IPS", "").split(",") if ip.strip()}  # бос — шектеу жоқ
ADMIN_MIN_TOKEN = 24             # қысқа токенмен әкімші панелі мүлде ашылмайды

# web/js/data/careers.js-тегі id-лермен бірдей болуы керек (research/build_professions.py)
PROFESSION_IDS = ["civil", "electrical", "mechanical", "petroleum", "mining", "pilot", "agro", "vet", "chef", "geologist", "architect", "backend", "ml", "cyber", "doctor", "dentist", "pharmacist", "biochem", "chemist", "ecologist", "economist", "designer", "gamedev", "graphic", "interior", "journalist", "director", "translator", "teacher", "primary", "psych", "nurse", "social", "coach", "speech", "physio", "lawyer", "marketing", "market_an", "pm", "hr", "sales", "finance", "hotel", "manager", "logist", "accountant", "banker"]

app = FastAPI(title="Bağdar", docs_url=None, redoc_url=None)
client = anthropic.Anthropic(timeout=60.0)


# ---------------------------------------------------------------- дерекқор
@contextmanager
def db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    try:
        yield con
        con.commit()
    finally:
        con.close()


with db() as c:
    c.execute("""CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY, parent_token TEXT UNIQUE NOT NULL,
        created_at REAL NOT NULL, updated_at REAL NOT NULL,
        lang TEXT, grade INTEGER, region TEXT,
        state TEXT,                       -- тесттің толық күйі (JSON)
        interview TEXT,                   -- ЖИ-сұхбат хаттамасы (JSON)
        interview_calls INTEGER DEFAULT 0,
        tokens_in INTEGER DEFAULT 0, tokens_out INTEGER DEFAULT 0,
        parent TEXT,                      -- ата-ана жауаптары (JSON)
        review_rating INTEGER, review_text TEXT, review_at REAL)""")
    cols = {r[1] for r in c.execute("PRAGMA table_info(sessions)")}
    for col, typ in (("expert_token", "TEXT"), ("expert", "TEXT")):   # маман сілтемесі (соқыр салыстыру)
        if col not in cols:
            c.execute(f"ALTER TABLE sessions ADD COLUMN {col} {typ}")
    c.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_expert ON sessions(expert_token)")


def purge_old():
    """Сақтау мерзімі өткен сессияларды біржола өшіру (құпиялылық саясаты)."""
    with db() as c:
        c.execute("DELETE FROM sessions WHERE updated_at < ?", (time.time() - RETENTION_DAYS * 86400,))


purge_old()
_last_purge = time.time()


def get_session(con, sid: str):
    row = con.execute("SELECT * FROM sessions WHERE id = ?", (sid,)).fetchone()
    if not row:
        raise HTTPException(404, "session not found")
    return row


# ---------------------------------------------------------------- сессия
class NewSession(BaseModel):
    lang: str = Field("kk", max_length=5)


@app.post("/api/session")
def create_session(body: NewSession):
    sid, ptok, etok, now = (secrets.token_urlsafe(12), secrets.token_urlsafe(12),
                            secrets.token_urlsafe(12), time.time())
    with db() as c:
        c.execute("INSERT INTO sessions (id, parent_token, expert_token, created_at, updated_at, lang) VALUES (?,?,?,?,?,?)",
                  (sid, ptok, etok, now, now, body.lang))
    return {"id": sid, "parent_token": ptok, "expert_token": etok}


@app.delete("/api/session/{sid}")
def delete_session(sid: str):
    """Оқушы өз деректерін біржола жояды. sid — тек оның браузерінде сақталатын құпия кілт."""
    with db() as c:
        if not c.execute("DELETE FROM sessions WHERE id = ?", (sid,)).rowcount:
            raise HTTPException(404, "session not found")
    return {"ok": True}


@app.put("/api/session/{sid}")
async def save_state(sid: str, request: Request):
    raw = await request.body()
    if len(raw) > MAX_STATE_BYTES:
        raise HTTPException(413, "state too large")
    try:
        state = json.loads(raw)
    except ValueError:
        raise HTTPException(400, "invalid json")
    about = state.get("about") or {}
    state.pop("interview", None)          # сұхбат серверде жеке сақталады
    with db() as c:
        get_session(c, sid)
        c.execute("UPDATE sessions SET state=?, updated_at=?, grade=?, region=? WHERE id=?",
                  (json.dumps(state, ensure_ascii=False), time.time(),
                   about.get("grade"), about.get("region"), sid))
    return {"ok": True}


class Review(BaseModel):
    rating: int = Field(ge=1, le=5)
    text: str = Field("", max_length=2000)


@app.post("/api/session/{sid}/review")
def save_review(sid: str, body: Review):
    with db() as c:
        get_session(c, sid)
        c.execute("UPDATE sessions SET review_rating=?, review_text=?, review_at=? WHERE id=?",
                  (body.rating, body.text.strip(), time.time(), sid))
    return {"ok": True}


# ---------------------------------------------------------------- ЖИ-сұхбат
SYSTEM = f"""You are a warm, perceptive career-guidance interviewer on Bağdar, a website for school \
students in Kazakhstan aged 14-17. The student has already finished aptitude tasks and an interest \
questionnaire; you are given a short summary of those results. Your job is to ask exactly \
{INTERVIEW_QUESTIONS} questions, one at a time, that the tests cannot answer.

Questions:
1-3 (everyone gets these, adapted naturally to the conversation): what they do in free time when \
nobody makes them; which school subject they like most and least, and why; how they picture an \
ordinary day of their life at 30.
4-5 (targeted): use the test summary. If the top professions are tied, ask what would separate them \
for this student. Otherwise probe where their interests and abilities point in different directions. \
Build on what the student has already said - quote their own words back when it helps.

Style: reply in the language given in the summary. One or two short sentences per turn, then the \
question. Friendly and curious, never evaluative. Do not tell the student their result, do not name \
salaries, universities, or statistics, and do not ask for their name, school, contacts, or anything \
identifying. If the student writes something suggesting they may hurt themselves or are in danger, \
respond with care, encourage them to talk to a trusted adult or the school psychologist, mention \
that the free helpline 150 is available in Kazakhstan, and set done to true without adjustments.

Every response is JSON. While asking: "done" false and "adjustments" empty. After the student \
answers question {INTERVIEW_QUESTIONS}: "done" true, "reply" a short warm thank-you, and \
"adjustments" listing only professions (by id) where the answers give clear evidence for or \
against. "delta" is between -1 and 1. "quote" must be copied word for word from one of the \
student's messages - never paraphrase or translate it. "reason" is one sentence in the student's \
language explaining what the quote shows. Leave out professions without such evidence."""

SCHEMA = {
    "type": "object",
    "properties": {
        "reply": {"type": "string"},
        "done": {"type": "boolean"},
        "adjustments": {"type": "array", "items": {
            "type": "object",
            "properties": {
                "id": {"type": "string", "enum": PROFESSION_IDS},
                "delta": {"type": "number"},
                "quote": {"type": "string"},
                "reason": {"type": "string"},
            },
            "required": ["id", "delta", "quote", "reason"],
            "additionalProperties": False,
        }},
    },
    "required": ["reply", "done", "adjustments"],
    "additionalProperties": False,
}


class InterviewContext(BaseModel):
    top: List[dict] = Field(default_factory=list, max_length=8)   # [{id, name, fit}]
    tied: bool = False
    types: List[str] = Field(default_factory=list, max_length=6)  # жетекші RIASEC типтері
    strong: List[str] = Field(default_factory=list, max_length=8)
    weak: List[str] = Field(default_factory=list, max_length=8)
    values: List[str] = Field(default_factory=list, max_length=6)  # маңызды құндылықтар (реті бойынша)


class InterviewTurn(BaseModel):
    sid: str
    lang: str = Field("kk", max_length=5)
    context: Optional[InterviewContext] = None
    message: Optional[str] = Field(None, max_length=MAX_ANSWER_CHARS)


LANG_NAME = {"kk": "Kazakh", "ru": "Russian", "en": "English"}

# Сыртқы ЖИ-ге жібермес бұрын жеке деректерді жасыру: пошта, сілтеме, ЖСН (12 сан), телефон
PII = [(re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+"), "[email]"),
       (re.compile(r"https?://\S+|www\.\S+", re.I), "[link]"),
       (re.compile(r"(?<!\d)\d{12}(?!\d)"), "[id]"),
       (re.compile(r"(?<![\w])(?:\+?7|8)[\s(-]*\d{3}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}(?!\d)"), "[phone]"),
       (re.compile(r"@[A-Za-z0-9_.]{3,}"), "[account]")]


def scrub(text: str) -> str:
    for rx, repl in PII:
        text = rx.sub(repl, text)
    return text
norm = lambda s: re.sub(r"\s+", " ", s).strip().lower()


def summary(ctx: InterviewContext, lang: str) -> str:
    tops = ", ".join(f"{p.get('id')} ({p.get('name')}, fit {p.get('fit')})" for p in ctx.top)
    return (f"Language: {LANG_NAME.get(lang, 'Kazakh')}\n"
            f"Top professions: {tops}\n"
            f"Top two tied: {'yes' if ctx.tied else 'no'}\n"
            f"Dominant Holland types: {', '.join(ctx.types) or 'unclear'}\n"
            f"Abilities above what top professions need: {', '.join(ctx.strong) or 'none'}\n"
            f"Abilities below what top professions need: {', '.join(ctx.weak) or 'none'}\n"
            f"Most important work values (in order): {', '.join(ctx.values) or 'not given'}\n"
            "Begin the interview with question 1.")


@app.post("/api/interview")
def interview(turn: InterviewTurn):
    with db() as c:
        row = get_session(c, turn.sid)
        hist = json.loads(row["interview"] or "{}")
        msgs = hist.get("messages", [])
        if hist.get("done"):
            raise HTTPException(409, "interview finished")
        if row["interview_calls"] >= INTERVIEW_MAX_CALLS:
            raise HTTPException(429, "interview limit reached")

        if not msgs:
            if not turn.context:
                raise HTTPException(400, "context required for the first turn")
            msgs.append({"role": "user", "content": summary(turn.context, turn.lang)})
        else:
            if not (turn.message or "").strip():
                raise HTTPException(400, "empty message")
            msgs.append({"role": "user", "content": scrub(turn.message.strip())})

        answers = len(msgs) - 1                      # бірінші хабар — контекст
        final = answers >= INTERVIEW_QUESTIONS
        try:
            resp = client.beta.messages.create(
                model=MODEL,
                max_tokens=16000,
                system=SYSTEM,
                messages=msgs,
                # Сұрақ қою — жеңіл тапсырма; соңғы бағалауға тереңірек ойлау керек.
                output_config={"effort": "medium" if final else "low",
                               "format": {"type": "json_schema", "schema": SCHEMA}},
                betas=["server-side-fallback-2026-07-01"],
                fallbacks="default",
            )
        except anthropic.RateLimitError:
            raise HTTPException(503, "ai busy")
        except anthropic.APIStatusError as e:
            raise HTTPException(503, f"ai error {e.status_code}")
        except anthropic.APIConnectionError:
            raise HTTPException(503, "ai unreachable")
        except TypeError as e:
            # SDK кілтті таппаса TypeError лақтырады; басқа TypeError-ларды жасырмаймыз
            if "authentication method" in str(e):
                raise HTTPException(503, "ai not configured: set ANTHROPIC_API_KEY")
            raise

        if resp.stop_reason == "refusal":
            raise HTTPException(503, "ai declined")
        text = next((b.text for b in resp.content if b.type == "text"), "")
        try:
            out = json.loads(text)
        except ValueError:
            raise HTTPException(502, "ai returned invalid json")

        msgs.append({"role": "assistant", "content": text})
        done = bool(out.get("done")) or final

        # Адалдық тексерісі: дәйексөз оқушының сөзінде шын бар ма
        adj = {}
        if done:
            said = norm(" ".join(m["content"] for m in msgs[1:] if m["role"] == "user"))
            for a in out.get("adjustments", []):
                q = (a.get("quote") or "").strip()
                if len(q) >= 3 and norm(q) in said and a.get("id") in PROFESSION_IDS:
                    adj[a["id"]] = {"delta": max(-1.0, min(1.0, float(a["delta"]))),
                                    "quote": q, "reason": a.get("reason", "")}

        hist = {"messages": msgs, "done": done, "adj": adj}
        c.execute("""UPDATE sessions SET interview=?, interview_calls=interview_calls+1,
                     tokens_in=tokens_in+?, tokens_out=tokens_out+?, updated_at=? WHERE id=?""",
                  (json.dumps(hist, ensure_ascii=False), resp.usage.input_tokens,
                   resp.usage.output_tokens, time.time(), turn.sid))

    return {"reply": out.get("reply", ""), "done": done, "adj": adj,
            "answered": answers, "total": INTERVIEW_QUESTIONS}


# ---------------------------------------------------------------- ата-ана
@app.get("/api/parent/{ptok}")
def parent_view(ptok: str):
    with db() as c:
        row = c.execute("SELECT state, parent, lang FROM sessions WHERE parent_token=?", (ptok,)).fetchone()
    if not row:
        raise HTTPException(404, "not found")
    st = json.loads(row["state"] or "{}")
    # Ата-анаға тек қорытынды көрсетіледі — жеке жауаптар емес
    return {"lang": row["lang"], "top3": st.get("top3", []), "fits": st.get("fits", {}),
            "values": (st.get("values") or [])[:3],
            "parent": json.loads(row["parent"]) if row["parent"] else None}


class ParentAnswers(BaseModel):
    expect: List[str] = Field(default_factory=list, max_length=3)
    values: List[str] = Field(default_factory=list, max_length=6)
    note: str = Field("", max_length=1000)


@app.post("/api/parent/{ptok}")
def parent_save(ptok: str, body: ParentAnswers):
    expect = [p for p in body.expect if p in PROFESSION_IDS]
    with db() as c:
        cur = c.execute("UPDATE sessions SET parent=? WHERE parent_token=?",
                        (json.dumps({"expect": expect, "values": body.values, "note": body.note.strip(),
                                     "at": time.time()}, ensure_ascii=False), ptok))
        if not cur.rowcount:
            raise HTTPException(404, "not found")
    return {"ok": True}


# ---------------------------------------------------------------- маман (соқыр салыстыру)
@app.get("/api/expert/{etok}")
def expert_view(etok: str):
    with db() as c:
        row = c.execute("SELECT state, expert, lang FROM sessions WHERE expert_token=?", (etok,)).fetchone()
    if not row:
        raise HTTPException(404, "not found")
    st = json.loads(row["state"] or "{}")
    expert = json.loads(row["expert"]) if row["expert"] else None
    # Маман тест нәтижесін өз пікірін жібергеннен кейін ғана көреді
    return {"lang": row["lang"], "ready": bool(st.get("top3")), "expert": expert,
            "top3": st.get("top3", []) if expert else []}


class ExpertAnswers(BaseModel):
    picks: List[str] = Field(default_factory=list, max_length=3)
    confidence: Optional[int] = Field(None, ge=1, le=3)
    note: str = Field("", max_length=1000)


@app.post("/api/expert/{etok}")
def expert_save(etok: str, body: ExpertAnswers):
    picks = [p for p in body.picks if p in PROFESSION_IDS]
    if not picks:
        raise HTTPException(400, "no valid picks")
    with db() as c:
        row = c.execute("SELECT expert FROM sessions WHERE expert_token=?", (etok,)).fetchone()
        if not row:
            raise HTTPException(404, "not found")
        if row["expert"]:
            raise HTTPException(409, "already answered")     # соқыр бағалауды қайта жазуға болмайды
        c.execute("UPDATE sessions SET expert=? WHERE expert_token=?",
                  (json.dumps({"picks": picks, "confidence": body.confidence, "note": body.note.strip(),
                               "at": time.time()}, ensure_ascii=False), etok))
    return {"ok": True}


# ---------------------------------------------------------------- әкімші
_admin_fail: dict = {}               # IP → [сәтсіз әрекет уақыттары]
ADMIN_MAX_FAILS, ADMIN_WINDOW = 5, 900


def require_admin(request: Request, authorization: Optional[str]):
    ip = request.client.host if request.client else "?"
    if ADMIN_IPS and ip not in ADMIN_IPS:
        raise HTTPException(403, "forbidden")
    now = time.time()
    fails = [t for t in _admin_fail.get(ip, []) if now - t < ADMIN_WINDOW]
    if len(fails) >= ADMIN_MAX_FAILS:                    # құпиясөзді іріктеуден қорғау
        raise HTTPException(429, "too many attempts, try later")
    token = (authorization or "").removeprefix("Bearer ").strip()
    if len(ADMIN_TOKEN) < ADMIN_MIN_TOKEN or not hmac.compare_digest(token, ADMIN_TOKEN):
        _admin_fail[ip] = fails + [now]
        raise HTTPException(401, "unauthorized")
    _admin_fail.pop(ip, None)


@app.get("/api/admin/sessions")
def admin_list(request: Request, authorization: Optional[str] = Header(None)):
    require_admin(request, authorization)
    with db() as c:
        rows = c.execute("""SELECT id, created_at, updated_at, lang, grade, region, state,
                            interview, tokens_in, tokens_out, parent, expert,
                            review_rating, review_text, review_at
                            FROM sessions ORDER BY created_at DESC""").fetchall()
    out = []
    for r in rows:
        st = json.loads(r["state"] or "{}")
        iv = json.loads(r["interview"] or "{}")
        out.append({
            "id": r["id"], "created_at": r["created_at"], "updated_at": r["updated_at"],
            "lang": r["lang"], "grade": r["grade"], "region": r["region"],
            "step": st.get("step"), "top3": st.get("top3", []),
            "budget": (st.get("about") or {}).get("budget"),
            "interview_done": bool(iv.get("done")), "tokens_in": r["tokens_in"], "tokens_out": r["tokens_out"],
            "parent": bool(r["parent"]),
            "review_rating": r["review_rating"], "review_text": r["review_text"],
            # Валидация көрсеткіштері (пилот): ұқсастық, ретест, маманмен келісім
            "feedback": st.get("feedback") or None, "retest": st.get("retest") or None,
            "expert": json.loads(r["expert"]) if r["expert"] else None,
            "conf": (st.get("result") or {}).get("conf"),
        })
    return out


@app.get("/api/admin/export/items.csv")
def admin_export(request: Request, authorization: Optional[str] = Header(None)):
    """Тапсырма деңгейіндегі жауаптар (ұзын формат) — калибровка үшін (research/calibrate.py)."""
    require_admin(request, authorization)
    buf = io.StringIO()
    w = csv.writer(buf)
    w.writerow(["session", "block", "domain", "item", "level", "value", "correct", "options", "ms"])
    with db() as c:
        for r in c.execute("SELECT id, state FROM sessions"):
            st = json.loads(r["state"] or "{}")
            if not isinstance(st.get("abilities"), dict) or not isinstance(st.get("interests"), dict):
                continue                                  # сайттың ескі нұсқасының сессиясы
            for a in (st.get("interests") or {}).get("answers", []):
                w.writerow([r["id"], "interest", a.get("t"), a.get("id"), "", a.get("v"), "", "", a.get("ms")])
            for dom, d in (st.get("abilities") or {}).items():
                if dom == "clerical":
                    w.writerow([r["id"], "clerical", dom, "clerical45", "", d.get("rate"), d.get("right"), d.get("wrong"), ""])
                    continue
                for x in d.get("log", []):
                    w.writerow([r["id"], "ability", dom, x.get("tpl", ""), x.get("level"), "",
                                int(bool(x.get("correct"))), x.get("options"), x.get("ms")])
            for pid, x in (st.get("rjp") or {}).items():
                w.writerow([r["id"], "rjp", "", pid, "", x.get("reaction"), "", "", ""])
    return Response(buf.getvalue(), media_type="text/csv",
                    headers={"Content-Disposition": "attachment; filename=bagdar-items.csv"})


@app.get("/api/admin/session/{sid}")
def admin_detail(sid: str, request: Request, authorization: Optional[str] = Header(None)):
    require_admin(request, authorization)
    with db() as c:
        r = get_session(c, sid)
    d = dict(r)
    d.pop("parent_token", None); d.pop("expert_token", None)   # сілтеме кілттерін панельде көрсетпейміз
    for k in ("state", "interview", "parent", "expert"):
        d[k] = json.loads(d[k]) if d[k] else None
    return d


@app.get("/admin")
def admin_page():
    return RedirectResponse("/admin.html")


CSP = ("default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
       "font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; "
       "base-uri 'none'; form-action 'self'")


@app.middleware("http")
async def headers_and_purge(request: Request, call_next):
    """Қауіпсіздік тақырыптары + кэш + сағатына бір рет мерзімі өткен деректерді өшіру."""
    global _last_purge
    if time.time() - _last_purge > 3600:
        _last_purge = time.time()
        purge_old()
    resp = await call_next(request)
    path = request.url.path
    if not path.startswith("/api/"):
        resp.headers["Cache-Control"] = "no-cache"   # JS-модульдердің ескі нұсқасы кэштен алынбасын
    else:
        resp.headers["Cache-Control"] = "no-store"
    resp.headers["Content-Security-Policy"] = CSP
    resp.headers["X-Content-Type-Options"] = "nosniff"
    resp.headers["X-Frame-Options"] = "DENY"
    resp.headers["Referrer-Policy"] = "no-referrer"
    if path.startswith("/admin"):
        resp.headers["X-Robots-Tag"] = "noindex, nofollow"
    return resp


# Тек web/ қалтасы ашық: server/ мен data/ (дерекқор) сырттан қолжетімсіз
app.mount("/", StaticFiles(directory=ROOT / "web", html=True), name="site")
