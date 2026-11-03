/* Тест күйі: браузерде сақталады және серверге синхрондалады. */
const KEY = "bagdar.state.v2";   // v2: жаңа тест құрылымы

const fresh = () => ({
  sid: null, ptok: null, step: "home",
  about: {},
  interests: { answers: [], attention: [] },   // O*NET IP: {id, t, v, ms}
  abilities: {},                               // домен → {log, theta, sd, pct} | clerical → {rate}
  dealbreakers: [], dealbreakersDone: false,
  values: [], valuesDone: false,               // O*NET Work Values: маңыздылық реті
  interview: { messages: [], adj: {}, done: false },
  rjp: {}, top3: [], review: null,
});

export let S = (() => { try { return { ...fresh(), ...JSON.parse(localStorage.getItem(KEY)) }; } catch { return fresh(); } })();

let timer = null;
export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {}
  clearTimeout(timer);
  timer = setTimeout(sync, 600);          // серверге жиі сұраныс жібермеу үшін
}
/* keepPrev: ретест — алдыңғы нәтиже салыстыру үшін сақталады (ұпайға әсер етпейді) */
export function reset(keepPrev = false) {
  const prev = keepPrev && S.top3?.length ? { sid: S.sid, top3: S.top3, at: S.resultAt || Date.now() } : null;
  S = fresh(); if (prev) S.prev = prev; save();
}

/* ---------- Сервер ---------- */
async function api(path, opts = {}) {
  const r = await fetch("/api" + path, { headers: { "Content-Type": "application/json" }, ...opts });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return r.json();
}
export async function startSession(lang) {
  if (S.sid) return S.sid;
  const { id, parent_token, expert_token } = await api("/session", { method: "POST", body: JSON.stringify({ lang }) });
  S.sid = id; S.ptok = parent_token; S.etok = expert_token; save(); return id;
}
async function sync() {
  if (!S.sid) return;
  try { await api(`/session/${S.sid}`, { method: "PUT", body: JSON.stringify(S) }); }
  catch (e) { console.warn("sync:", e.message); }
}
export const sendReview = (rating, text) =>
  api(`/session/${S.sid}/review`, { method: "POST", body: JSON.stringify({ rating, text }) });
export const interviewTurn = payload =>
  api("/interview", { method: "POST", body: JSON.stringify(payload) });
export const getParentView = ptok => api(`/parent/${ptok}`);
export const sendParent = (ptok, body) =>
  api(`/parent/${ptok}`, { method: "POST", body: JSON.stringify(body) });
export const getExpertView = etok => api(`/expert/${etok}`);
export const sendExpert = (etok, body) =>
  api(`/expert/${etok}`, { method: "POST", body: JSON.stringify(body) });
/* Оқушы өз деректерін біржола жоя алады (sid — тек оның браузерінде) */
export async function deleteMyData() {
  for (const sid of [S.sid, S.prev?.sid].filter(Boolean))       // ретест болса — алдыңғы сессия да
    await api(`/session/${sid}`, { method: "DELETE" }).catch(e => { if (!String(e.message).startsWith("404")) throw e; });
  try { localStorage.removeItem(KEY); } catch {}
  S = fresh();
}
