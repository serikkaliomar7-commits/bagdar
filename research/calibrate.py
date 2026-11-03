#!/usr/bin/env python3
"""
Пилот деректерінен калибровка: «ойлап табылған» параметрлерді өлшенген параметрлермен ауыстыру.

Не есептейді:
  1. Қабілет тапсырмалары — әр үлгінің (tpl) нақты қиындығы b
     (3PL, c = 1/нұсқа саны, a = 1; маргиналдық шынайыға ұқсастық, EM).
  2. Ұқыптылық тесті — нормасы (медиана және шкала).
  3. Қызығушылық сұрақтары — сұрақ пен шкаланың қалған бөлігінің корреляциясы,
     «Білмеймін» үлесі (аудармасы түсініксіз сұрақтарды табу үшін).
  4. Формула салмақтары — оқушының мамандыққа реакциясын (1–5) тіректердің
     логарифмдеріне регрессиялау: reaction ~ ln I + ln A + ln V + ln F.
  5. Ретест тұрақтылығы, «нәтиже маған ұқсайды» бағасы, маманмен келісім.

Іске қосу:
  python3 research/calibrate.py                    # data/bagdar.db
  python3 research/calibrate.py --db путь/к/bagdar.db
  python3 research/calibrate.py --write            # + web/js/data/calibration.js жазу
  python3 research/calibrate.py --simulate 400     # синтетикалық тексеріс (DB-ге тимейді)

Тек стандартты кітапхана (numpy қажет емес).
"""
from __future__ import annotations

import argparse
import json
import math
import random
import sqlite3
import statistics as st
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MIN_N_ITEM = 30        # калибровка үшін бір үлгіге ең аз жауап саны
MIN_N_WEIGHTS = 100    # салмақтарды бағалау үшін ең аз реакция саны
ASSUMED_W = {"I": 0.50, "A": 0.25, "V": 0.10, "F": 0.15}   # engine.js-тегі қазіргі салмақтар


def sigmoid(z):
    return 1 / (1 + math.exp(-max(-30, min(30, z))))


def pearson(x, y):
    if len(x) < 3:
        return None
    mx, my = st.fmean(x), st.fmean(y)
    sxy = sum((a - mx) * (b - my) for a, b in zip(x, y))
    sx = math.sqrt(sum((a - mx) ** 2 for a in x))
    sy = math.sqrt(sum((b - my) ** 2 for b in y))
    return sxy / (sx * sy) if sx and sy else None


# ------------------------------------------------------------------ деректер
def _dict(x):
    return x if isinstance(x, dict) else {}


def load_db(path: Path):
    con = sqlite3.connect(path)
    con.row_factory = sqlite3.Row
    cols = {r[1] for r in con.execute("PRAGMA table_info(sessions)")}
    sel = "id, state" + (", expert" if "expert" in cols else "")
    out = []
    for r in con.execute(f"SELECT {sel} FROM sessions"):
        state = json.loads(r["state"] or "{}")
        if not isinstance(state.get("abilities"), dict):    # сайттың ескі нұсқасының сессиялары — басқа құрылым
            continue
        out.append({"id": r["id"], "state": state,
                    "expert": json.loads(r["expert"]) if "expert" in cols and r["expert"] else None})
    return out


# ------------------------------------------------------------------ 1. қабілет
def calibrate_abilities(sessions, iters=60):
    """Маргиналдық шынайыға ұқсастық (Bock & Aitkin, 1981, EM): θ ~ N(0, 1) бойынша интегралданады.
    Әр оқушыда 4–6 тапсырма ғана болғанда бірлескен бағалау b-ны нөлге «қысады», MML — қыспайды."""
    resp = defaultdict(list)                      # person → [(tpl, y)]
    meta = {}                                     # tpl → (c, level-тердің тізімі, домен)
    for s in sessions:
        for dom, d in (s["state"].get("abilities") or {}).items():
            if dom == "clerical":
                continue
            for x in d.get("log", []):
                t = x.get("tpl")
                if not t:
                    continue
                resp[(s["id"], dom)].append((t, 1 if x.get("correct") else 0))
                m = meta.setdefault(t, [1 / max(2, x.get("options") or 4), [], dom])
                m[1].append(x.get("level") or 3)
    if not resp:
        return []
    G = [-4 + 0.2 * k for k in range(41)]
    prior = [math.exp(-g * g / 2) for g in G]
    b0 = {t: st.fmean(m[1]) - 3 for t, m in meta.items()}
    b = dict(b0)
    PRIOR_SD = 2.0                                # өте әлсіз приор: тек сирек үлгілерді тұрақтандыру үшін

    def P(t, g):
        c = meta[t][0]
        return c + (1 - c) * sigmoid(g - b[t])

    for _ in range(iters):
        n = {t: [0.0] * len(G) for t in meta}     # күтілетін жауап саны (θ нүктесінде)
        r = {t: [0.0] * len(G) for t in meta}     # күтілетін дұрыс жауап саны
        for items in resp.values():               # E-қадам
            w = prior[:]
            for t, y in items:
                for k, g in enumerate(G):
                    p_ = P(t, g)
                    w[k] *= p_ if y else 1 - p_
            z = sum(w) or 1
            w = [x / z for x in w]
            for t, y in items:
                for k in range(len(G)):
                    n[t][k] += w[k]
                    if y:
                        r[t][k] += w[k]
        for t in meta:                            # M-қадам: Ньютон
            c = meta[t][0]
            for _ in range(5):
                g_, info = -(b[t] - b0[t]) / PRIOR_SD ** 2, 1 / PRIOR_SD ** 2
                for k, th in enumerate(G):
                    s_ = sigmoid(th - b[t])
                    p_ = c + (1 - c) * s_
                    dP = -(1 - c) * s_ * (1 - s_)
                    g_ += (r[t][k] - n[t][k] * p_) / (p_ * (1 - p_)) * dP
                    info += n[t][k] * dP * dP / (p_ * (1 - p_))
                b[t] = max(-4, min(4, b[t] + g_ / info))
    rows = []
    for t, m in meta.items():
        c = m[0]
        info = 1 / PRIOR_SD ** 2 + sum(n[t][k] * ((1 - c) * sigmoid(th - b[t]) * (1 - sigmoid(th - b[t]))) ** 2
                                       / (P(t, th) * (1 - P(t, th))) for k, th in enumerate(G))
        ys = [y for items in resp.values() for tt, y in items if tt == t]
        rows.append({"tpl": t, "domain": m[2], "n": len(ys), "p": st.fmean(ys),
                     "b0": round(b0[t], 2), "b": round(b[t], 2), "se": round(1 / math.sqrt(info), 2)})
    return sorted(rows, key=lambda r: (r["domain"], r["b"]))


# ------------------------------------------------------------------ 2. ұқыптылық
def clerical_norm(sessions):
    rates = [s["state"]["abilities"]["clerical"]["rate"] for s in sessions
             if (s["state"].get("abilities") or {}).get("clerical", {}).get("rate") is not None]
    if len(rates) < 20:
        return {"n": len(rates)}
    q = st.quantiles(rates, n=4)
    return {"n": len(rates), "mid": round(st.median(rates), 1), "scale": round((q[2] - q[0]) / 2.197, 1)}


# ------------------------------------------------------------------ 3. қызығушылық сұрақтары
def interest_items(sessions):
    per = []                                       # әр оқушы: {item: (type, v)}
    for s in sessions:
        a = (s["state"].get("interests") or {}).get("answers", [])
        if a:
            per.append({x["id"]: (x["t"], x["v"]) for x in a})
    stats = {}
    items = {i for p in per for i in p}
    for it in sorted(items):
        xs, ys, unsure, n = [], [], 0, 0
        for p in per:
            if it not in p:
                continue
            t, v = p[it]
            n += 1
            unsure += v == 3
            rest = [vv for k, (tt, vv) in p.items() if tt == t and k != it]
            if len(rest) >= 2:
                xs.append(v)
                ys.append(st.fmean(rest))
        r = pearson(xs, ys) if len(xs) >= MIN_N_ITEM else None
        stats[it] = {"n": n, "r_rest": None if r is None else round(r, 2),
                     "unsure": round(unsure / n, 2) if n else None}
    return stats


# ------------------------------------------------------------------ 4. салмақтар
def solve(A, y):
    """Ең кіші квадраттар: (XᵀX)β = Xᵀy, Гаусс әдісі."""
    n = len(A[0])
    M = [[sum(r[i] * r[j] for r in A) for j in range(n)] + [sum(r[i] * yy for r, yy in zip(A, y))] for i in range(n)]
    for c in range(n):
        piv = max(range(c, n), key=lambda r: abs(M[r][c]))
        M[c], M[piv] = M[piv], M[c]
        if abs(M[c][c]) < 1e-12:
            return None
        for r in range(n):
            if r != c:
                f = M[r][c] / M[c][c]
                M[r] = [a - f * b for a, b in zip(M[r], M[c])]
    return [M[i][n] / M[i][i] for i in range(n)]


def fit_weights(sessions):
    X, y = [], []
    for s in sessions:
        for x in (s["state"].get("rjp") or {}).values():
            c = x.get("comp")
            if c and x.get("reaction"):
                X.append([1.0] + [math.log(max(1e-3, c[k])) for k in "IAVF"])
                y.append(x["reaction"])
    if len(y) < MIN_N_WEIGHTS:
        return {"n": len(y)}
    keep = [j for j in range(1, 5) if st.pstdev(r[j] for r in X) > 1e-6]   # тұрақты бағаннан (V өткізілсе) бас тарту
    Xk = [[r[0]] + [r[j] for j in keep] for r in X]
    beta = solve(Xk, y)
    if beta is None:
        return {"n": len(y)}
    pred = [sum(b * v for b, v in zip(beta, r)) for r in Xk]
    my = st.fmean(y)
    r2 = 1 - sum((a - b) ** 2 for a, b in zip(y, pred)) / sum((a - my) ** 2 for a in y)
    coef = {"IAVF"[j - 1]: beta[i + 1] for i, j in enumerate(keep)}
    pos = {k: max(0.0, v) for k, v in coef.items()}
    tot = sum(pos.values()) or 1
    return {"n": len(y), "r2": round(r2, 3), "coef": {k: round(v, 3) for k, v in coef.items()},
            "suggested": {k: round(v / tot, 2) for k, v in pos.items()}}


# ------------------------------------------------------------------ 5. валидация
def validation(sessions):
    fb = [s["state"]["feedback"] for s in sessions if (s["state"].get("feedback") or {}).get("like")]
    rt = [s["state"]["retest"] for s in sessions if s["state"].get("retest")]
    ex = [(s["expert"]["picks"], s["state"].get("top3", [])) for s in sessions
          if s.get("expert") and s["state"].get("top3")]
    out = {"sessions": len(sessions)}
    if fb:
        out["like_mean"] = round(st.fmean(f["like"] for f in fb), 2)
        out["like_share_4plus"] = round(sum(f["like"] >= 4 for f in fb) / len(fb), 2)
        out["like_n"] = len(fb)
    if rt:
        out["retest_n"] = len(rt)
        out["retest_overlap"] = round(st.fmean(r["overlap"] for r in rt), 2)
        out["retest_top1_same"] = round(sum(bool(r["top1Same"]) for r in rt) / len(rt), 2)
        out["retest_days_median"] = st.median(r["days"] for r in rt)
    if ex:
        out["expert_n"] = len(ex)
        out["expert_agree"] = round(st.fmean(len(set(p) & set(t)) / min(3, len(p)) for p, t in ex), 2)
        # Кездейсоқ деңгей: 48 мамандықтан 3-еуі кездейсоқ сәйкес келу үлесі ≈ 3/48
        out["expert_chance"] = round(3 / 48, 3)
    return out


# ------------------------------------------------------------------ синтетикалық тексеріс
def simulate(n, seed=7):
    """Нақты параметрлері белгілі жасанды пилот: калибровка оларды қалпына келтіре ме?"""
    rnd = random.Random(seed)
    tpls = {"logic": ["seq1", "seq2geo", "seq2dec", "seq3", "seq4", "seq5fib", "seq5dbl"],
            "numeric": [f"num{l}" for l in range(1, 6)], "spatial": [f"rot{k}" for k in range(4, 9)],
            "mechanical": ["lever1", "gears2", "compound", "lever4", "gears5", "gears5x"]}
    level = {t: (int(next(ch for ch in t if ch.isdigit())) if any(ch.isdigit() for ch in t) else 3) for d in tpls.values() for t in d}
    level.update({f"rot{k}": k - 3 for k in range(4, 9)}, compound=3)
    true_b = {t: level[t] - 3 + rnd.gauss(0, 0.6) for t in level}
    W = {"I": 0.50, "A": 0.25, "V": 0.10, "F": 0.15}
    sessions = []
    for s in range(n):
        ab = {}
        for dom, ts in tpls.items():
            th, log, lv = rnd.gauss(0, 1), [], 3
            for _ in range(6):
                # Нақты CAT сияқты: келесі деңгей тек байқалған жауаптарға тәуелді (θ-ға емес)
                pool = [x for x in ts if level[x] == lv] or sorted(ts, key=lambda x: abs(level[x] - lv))[:1]
                t = rnd.choice(pool)
                c = 0.5 if t.startswith("gears") else 1 / 3 if t.startswith("lever") else 0.25
                p = c + (1 - c) * sigmoid(th - true_b[t])
                ok = rnd.random() < p
                log.append({"tpl": t, "level": level[t], "correct": ok, "options": round(1 / c)})
                lv = max(1, min(5, lv + (1 if ok else -1)))
            ab[dom] = {"log": log}
        ab["clerical"] = {"rate": max(0, rnd.gauss(22, 8))}
        rjp = {}
        for k in range(3):
            comp = {"I": rnd.uniform(.1, 1), "A": rnd.uniform(.2, 1), "V": rnd.uniform(.6, 1), "F": rnd.uniform(.3, .9)}
            z = sum(W[q] * math.log(comp[q]) for q in W)
            rjp[f"c{k}"] = {"reaction": max(1, min(5, round(3 + 4 * z + 1.2 + rnd.gauss(0, .7)))), "comp": comp}
        sessions.append({"id": f"s{s}", "state": {"abilities": ab, "rjp": rjp}, "expert": None})
    return sessions, true_b, W


# ------------------------------------------------------------------ есеп
def report(sessions, write=False, truth=None):
    lines = ["# Bağdar — калибровка есебі", ""]
    v = validation(sessions)
    lines += ["## Валидация", "```", json.dumps(v, ensure_ascii=False, indent=1), "```", ""]

    ab = calibrate_abilities(sessions)
    lines += ["## Қабілет тапсырмаларының қиындығы", "",
              "| Домен | Үлгі | n | Дұрыс % | b алдын ала | b өлшенген | SE | Белгі |", "|---|---|---|---|---|---|---|---|"]
    calib = {}
    for r in ab:
        flag = "аз дерек" if r["n"] < MIN_N_ITEM else ("⚠ айырма > 0,7" if abs(r["b"] - r["b0"]) > 0.7 else "")
        if r["n"] >= MIN_N_ITEM:
            calib[r["tpl"]] = r["b"]
        lines.append(f"| {r['domain']} | {r['tpl']} | {r['n']} | {r['p']*100:.0f} | {r['b0']} | {r['b']} | {r['se']} | {flag} |")
    if truth:
        common = [r for r in ab if r["tpl"] in truth]
        rr = pearson([r["b"] for r in common], [truth[r["tpl"]] for r in common])
        r0 = pearson([r["b0"] for r in common], [truth[r["tpl"]] for r in common])
        lines += ["", f"**Симуляция:** шын b-мен корреляция — калибровкадан кейін r = {rr:.2f}, алдын ала деңгеймен r = {r0:.2f}."]
    lines.append("")

    cn = clerical_norm(sessions)
    lines += ["## Ұқыптылық нормасы", f"`{json.dumps(cn)}` (қазіргі: mid 24, scale 7)", ""]

    it = interest_items(sessions)
    bad = {k: v_ for k, v_ in it.items() if (v_["r_rest"] is not None and v_["r_rest"] < 0.2) or (v_["unsure"] or 0) > 0.4}
    lines += ["## Қызығушылық сұрақтары", f"Тексерілген сұрақтар: {len(it)}. Әлсіз не түсініксіз (r < 0,2 не «Білмеймін» > 40%): "
              + (", ".join(f"{k} (r={v_['r_rest']}, ?={v_['unsure']})" for k, v_ in bad.items()) or "жоқ"), ""]

    w = fit_weights(sessions)
    lines += ["## Формула салмақтары", f"Қазіргі (сарапшылық): `{ASSUMED_W}`",
              f"Реакциялар бойынша: `{json.dumps(w, ensure_ascii=False)}`",
              "Ескерту: салмақтарды тек n ≥ 100 болғанда және R² мағыналы болғанда ауыстыру керек; "
              "соңғы шешім — команданың, ұсыныс — бағдар.", ""]
    text = "\n".join(lines)
    print(text)
    if write and not truth:
        out = ROOT / "web" / "js" / "data" / "calibration.js"
        out.write_text("/* АВТОМАТТЫ: research/calibrate.py пилот деректерінен жазады.\n"
                       "   tpl → калибрленген қиындық b. Бос болса — алдын ала мән (деңгей − 3) қолданылады. */\n"
                       f"export const CALIB = {json.dumps(calib, indent=1)};\n", encoding="utf-8")
        (ROOT / "research" / "calibration_report.md").write_text(text, encoding="utf-8")
        print(f"\n→ {out.relative_to(ROOT)} ({len(calib)} үлгі), research/calibration_report.md")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--db", default=str(ROOT / "data" / "bagdar.db"))
    ap.add_argument("--write", action="store_true")
    ap.add_argument("--simulate", type=int, default=0)
    a = ap.parse_args()
    if a.simulate:
        sess, tb, _ = simulate(a.simulate)
        report(sess, truth=tb)
    else:
        report(load_db(Path(a.db)), write=a.write)
