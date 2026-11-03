/* Әкімші панелі (CSP: сыртқы файл, inline скрипт жоқ). */
import { byId } from "./engine.js";
import { REGIONS } from "./data/filters.js";
const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const date = t => t ? new Date(t * 1000).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" }) : "—";
const reg = id => REGIONS.find(r => r.id === id)?.ru || id || "—";
const prof = id => byId(id) ? `${byId(id).emoji} ${byId(id).name.ru}` : id;
const PRICE_IN = 4 / 1e6, PRICE_OUT = 20 / 1e6;   // claude-opus-5-5, $ за токен
let TOKEN = sessionStorage.getItem("bagdar.admin") || "", DATA = [];

async function api(path) {
  const r = await fetch("/api/admin" + path, { headers: { Authorization: "Bearer " + TOKEN } });
  if (r.status === 401) throw new Error("Неверный токен");
  if (r.status === 429) throw new Error("Слишком много попыток — подождите 15 минут");
  if (r.status === 403) throw new Error("Доступ с этого IP запрещён");
  if (!r.ok) throw new Error("Ошибка " + r.status);
  return r.json();
}
async function load() {
  try { DATA = await api("/sessions"); }
  catch (e) { $("err").textContent = e.message; $("login").hidden = false; $("panel").hidden = true; return; }
  sessionStorage.setItem("bagdar.admin", TOKEN);
  $("login").hidden = true; $("panel").hidden = false; render();
}
function render() {
  const q = $("q").value.trim().toLowerCase();
  const rows = DATA.filter(d => !q || JSON.stringify([reg(d.region), d.review_text, d.top3.map(prof)]).toLowerCase().includes(q));
  const done = DATA.filter(d => ["result", "share"].includes(d.step)).length;
  const rated = DATA.filter(d => d.review_rating);
  const tin = DATA.reduce((s, d) => s + d.tokens_in, 0), tout = DATA.reduce((s, d) => s + d.tokens_out, 0);
  const ivN = DATA.filter(d => d.interview_done).length;
  const cost = tin * PRICE_IN + tout * PRICE_OUT;
  const stat = (v, l) => `<div class="kpi"><div class="kpi__v">${v}</div><div class="kpi__l">${l}</div></div>`;
  $("stats").innerHTML =
    stat(DATA.length, "всего сессий") +
    stat(DATA.length ? Math.round(done / DATA.length * 100) + "%" : "—", "дошли до результата") +
    stat(rated.length ? (rated.reduce((s, d) => s + d.review_rating, 0) / rated.length).toFixed(1) + " ⭐" : "—", `средняя оценка (${rated.length})`) +
    stat(DATA.filter(d => d.parent).length, "родителей ответили") +
    stat("$" + cost.toFixed(2), "расход на ИИ") +
    stat(ivN ? "$" + (cost / ivN).toFixed(3) : "—", "за одно интервью");
  /* Валидация: нәтиже ұқсас па, ретест тұрақтылығы, маманмен келісім */
  const fb = DATA.filter(d => d.feedback?.like);
  const fbNew = DATA.filter(d => d.feedback?.new);
  const rt = DATA.filter(d => d.retest);
  const ex = DATA.filter(d => d.expert?.picks?.length && d.top3.length);
  const agree = ex.map(d => d.expert.picks.filter(id => d.top3.includes(id)).length / Math.min(3, d.expert.picks.length));
  const avg = a => a.reduce((s, x) => s + x, 0) / a.length;
  $("vstats").innerHTML =
    stat(fb.length ? avg(fb.map(d => d.feedback.like)).toFixed(2) + " / 5" : "—", `«результат похож на меня» (n=${fb.length})`) +
    stat(fb.length ? Math.round(fb.filter(d => d.feedback.like >= 4).length / fb.length * 100) + "%" : "—", "ответили «похож» или «точно я»") +
    stat(fbNew.length ? Math.round(fbNew.filter(d => d.feedback.new !== "no").length / fbNew.length * 100) + "%" : "—", `узнали новое (n=${fbNew.length})`) +
    stat(rt.length ? avg(rt.map(d => d.retest.overlap)).toFixed(2) + " / 3" : "—", `ретест: совпадение топ-3 (n=${rt.length})`) +
    stat(rt.length ? Math.round(rt.filter(d => d.retest.top1Same).length / rt.length * 100) + "%" : "—", "ретест: тот же топ-1") +
    stat(ex.length ? Math.round(avg(agree) * 100) + "%" : "—", `совпадение со специалистом (n=${ex.length})`);
  $("rows").innerHTML = rows.map(d => `<tr data-id="${esc(d.id)}">
    <td>${date(d.created_at)}</td><td>${esc(d.grade ?? "—")}</td><td>${esc(reg(d.region))}</td>
    <td><span class="pill ${["result", "share"].includes(d.step) ? "pill--ok" : ""}">${esc(d.step || "—")}</span></td>
    <td>${d.top3.map(id => esc(prof(id))).join("<br>") || "—"}</td>
    <td>${d.interview_done ? "✓" : ""}</td><td>${d.parent ? "✓" : ""}</td>
    <td>${d.review_rating ? "⭐".repeat(d.review_rating) + "<br><span class='muted'>" + esc(d.review_text) + "</span>" : ""}</td></tr>`).join("")
    || `<tr><td colspan="8" class="muted">Пока пусто</td></tr>`;
}
async function open(id) {
  const d = await api("/session/" + encodeURIComponent(id));
  const iv = d.interview?.messages?.slice(1) || [];
  $("dlg-in").innerHTML = `
    <div style="display:flex;justify-content:space-between"><h2>Сессия ${esc(d.id)}</h2><button class="btn btn--ghost" data-close>✕</button></div>
    <p class="muted">Создана ${date(d.created_at)} · обновлена ${date(d.updated_at)} · ${esc(reg(d.region))} · ${esc(d.grade ?? "—")} класс</p>
    ${d.review_rating ? `<div class="banner banner--info">${"⭐".repeat(d.review_rating)} ${esc(d.review_text)}</div>` : ""}
    ${iv.length ? `<h3>ИИ-интервью</h3><div class="msgs chat">${iv.map(m => m.role === "user"
        ? `<div class="msg msg--me">${esc(m.content)}</div>`
        : `<div class="msg msg--ai">${esc((() => { try { return JSON.parse(m.content).reply; } catch { return m.content; } })())}</div>`).join("")}</div>
      ${Object.keys(d.interview.adj || {}).length ? `<h3>Корректировки от интервью</h3><pre>${esc(JSON.stringify(d.interview.adj, null, 2))}</pre>` : ""}` : ""}
    ${d.parent ? `<h3>Родитель</h3><pre>${esc(JSON.stringify(d.parent, null, 2))}</pre>` : ""}
    ${d.expert ? `<h3>Специалист</h3><pre>${esc(JSON.stringify(d.expert, null, 2))}</pre>` : ""}
    <h3>Полное состояние теста</h3><pre>${esc(JSON.stringify(d.state, null, 2))}</pre>`;
  $("dlg").showModal();
}
function csv() {
  const head = ["id", "created", "grade", "region", "step", "budget", "top1", "top2", "top3", "interview", "parent", "rating", "review", "tokens_in", "tokens_out"];
  const q = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = DATA.map(d => [d.id, date(d.created_at), d.grade, reg(d.region), d.step, d.budget, ...[0, 1, 2].map(i => d.top3[i] ? byId(d.top3[i])?.name.ru : ""),
    d.interview_done ? 1 : 0, d.parent ? 1 : 0, d.review_rating, d.review_text, d.tokens_in, d.tokens_out].map(q).join(","));
  const blob = new Blob(["﻿" + [head.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `bagdar-${new Date().toISOString().slice(0, 10)}.csv` });
  a.click(); URL.revokeObjectURL(a.href);
}
$("go").onclick = () => { TOKEN = $("tok").value.trim(); load(); };
$("tok").onkeydown = e => e.key === "Enter" && $("go").onclick();
async function items() {                      // калибровкаға арналған ұзын формат
  const r = await fetch("/api/admin/export/items.csv", { headers: { Authorization: "Bearer " + TOKEN } });
  if (!r.ok) return alert("Ошибка " + r.status);
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(await r.blob()), download: "bagdar-items.csv" });
  a.click(); URL.revokeObjectURL(a.href);
}
$("reload").onclick = load; $("csv").onclick = csv; $("items").onclick = items; $("q").oninput = render;
$("rows").onclick = e => { const tr = e.target.closest("tr[data-id]"); if (tr) open(tr.dataset.id); };
$("dlg").addEventListener("click", e => { if (e.target.closest("[data-close]")) $("dlg").close(); });
if (TOKEN) load();
