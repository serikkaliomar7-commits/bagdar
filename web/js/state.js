/* Тест күйі: браузерде сақталады және серверге синхрондалады. */
const KEY = "bagdar.state.v2";   // v2: жаңа тест құрылымы

const fresh = () => ({
  sid: null, ptok: null, step: "home",
  about: {},
  interests: { answers: [], attention: [] },   // O*NET IP: {id, t, v, ms}
  abilities: {},                               // домен → {log, theta, sd, pct} | clerical → {rate}
  dealbreakers: [], dealbreakersDone: false,
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
export function reset() { S = fresh(); save(); }

/* ---------- Сервер ---------- */
async function api(path, opts = {}) {
  const r = await fetch("/api" + path, { headers: { "Content-Type": "application/json" }, ...opts });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return r.json();
}
export async function startSession(lang) {
  if (S.sid) return S.sid;
  const { id, parent_token } = await api("/session", { method: "POST", body: JSON.stringify({ lang }) });
  S.sid = id; S.ptok = parent_token; save(); return id;
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
