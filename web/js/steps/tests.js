/* 3. Қызығушылық (O*NET IP, бейімделгіш) · 4. Қабілет (CAT) · 5. «Маған келмейді» сүзгісі */
import { S, save } from "../state.js";
import { t, L } from "../i18n.js";
import { h, screen, shuffle } from "../ui.js";
import { SCALE, ATTENTION } from "../data/interest_items.js";
import { DOMAINS, clericalPair } from "../data/ability_items.js";
import { DEALBREAKERS } from "../data/filters.js";
import { nextInterestItem, domainLabel } from "../engine.js";
import * as CAT from "../cat.js";

const rerender = (app, fn, ctx) => { app.replaceChildren(); fn(app, ctx); };

/* =========================================================
   3. ҚЫЗЫҒУШЫЛЫҚ — 5 баллдық шкала, ортасы «Білмеймін».
   Зейін тексеру тармақтары 9-шы және 21-ші орындарда.
   ========================================================= */
const ATT_AT = { 8: ATTENTION[0], 20: ATTENTION[1] };

export function interests(app, ctx) {
  const I = S.interests, n = I.answers.length + I.attention.length;
  const att = ATT_AT[n] && !I.attention.some(a => a.id === ATT_AT[n].id) ? ATT_AT[n] : null;
  const item = att || nextInterestItem(I.answers);
  if (!item) return ctx.go("abilities");

  const t0 = performance.now();
  const answer = v => {
    const ms = Math.round(performance.now() - t0);
    const at = Date.now();
    if (att) I.attention.push({ id: att.id, v, ok: v === att.answer, ms, at });
    else I.answers.push({ id: item.id, t: item.t, v, ms, at });
    save(); rerender(app, interests, ctx);
  };

  app.append(screen(
    n === 0 && h("div", {}, h("h1", { class: "title" }, t("int_t")), h("p", { class: "lead" }, t("int_l"))),
    h("div", { class: "q-counter" }, `${I.answers.length + 1}`, n >= 18 && h("span", { class: "muted" }, "  ·  ✨ " + t("adapt"))),
    h("p", { class: "muted", style: "margin:0 0 6px" }, t("int_q")),
    h("div", { class: "q-text", style: "font-size:24px;min-height:64px" }, L(item)),
    h("div", { class: "scale" }, SCALE.map(s =>
      h("button", { class: "scale__btn" + (s.v === 3 ? " scale__btn--mid" : ""), onclick: () => answer(s.v) },
        h("span", { class: "scale__e" }, s.e), h("span", { class: "scale__l" }, L(s))))),
    n > 0 && h("div", { class: "actions" }, h("button", { class: "btn btn--ghost", onclick: () => {
      const la = I.answers.at(-1)?.at ?? 0, lt = I.attention.at(-1)?.at ?? 0;   // соңғы жауапты алып тастау
      (lt > la ? I.attention : I.answers).pop();
      save(); rerender(app, interests, ctx); } }, "← " + t("back"))),
    h("p", { class: "muted", style: "margin-top:20px;font-size:12px" }, t("int_src"))
  ));
}

/* =========================================================
   4. ҚАБІЛЕТ — әр доменде бейімделгіш 4–5 тапсырма, сосын кеңсе жылдамдығы
   ========================================================= */
const ITEM_SEC = 75;
const NS = "http://www.w3.org/2000/svg";
const svgEl = (tag, a = {}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); return e; };

function shapeSvg(cells, size = 18, color = "#4f46e5") {
  const mx = Math.min(...cells.map(c => c[0])), my = Math.min(...cells.map(c => c[1]));
  const c = cells.map(([x, y]) => [x - mx, y - my]);
  const w = Math.max(...c.map(p => p[0])) + 1, hh = Math.max(...c.map(p => p[1])) + 1;
  const s = svgEl("svg", { viewBox: `0 0 ${w * size} ${hh * size}`, width: w * size, height: hh * size });
  c.forEach(([x, y]) => s.append(svgEl("rect", { x: x * size + 1, y: y * size + 1, width: size - 2, height: size - 2, rx: 3, fill: color })));
  return s;
}
function leverSvg({ wl, wr, dl, dr }) {
  const s = svgEl("svg", { viewBox: "0 0 360 120", width: 360, height: 120 });
  const cx = 180, u = 26;
  s.append(svgEl("line", { x1: cx - 6 * u, y1: 70, x2: cx + 6 * u, y2: 70, stroke: "#14162b", "stroke-width": 4 }));
  s.append(svgEl("polygon", { points: `${cx},72 ${cx - 14},100 ${cx + 14},100`, fill: "#8a8ea8" }));
  [[-dl, wl], [dr, wr]].forEach(([d, w]) => {
    const x = cx + d * u, sz = 18 + w * 2.5;
    s.append(svgEl("rect", { x: x - sz / 2, y: 68 - sz, width: sz, height: sz, rx: 4, fill: "#4f46e5" }));
    const tx = svgEl("text", { x, y: 64 - sz / 2 + 4, "text-anchor": "middle", "font-size": 12, fill: "#fff", "font-weight": 700 });
    tx.textContent = w + " кг"; s.append(tx);
    const dt = svgEl("text", { x: (x + cx) / 2, y: 92, "text-anchor": "middle", "font-size": 11, fill: "#8a8ea8" });
    dt.textContent = Math.abs(d) + " м"; s.append(dt);
  });
  return s;
}
function gearsSvg({ n, crossed }) {
  const r = 20, gap = 2 * r + 2, W = Math.min(360, n * gap + (crossed !== undefined ? 70 : 20));
  const s = svgEl("svg", { viewBox: `0 0 ${n * gap + 80} 70`, width: W, height: 70 });
  for (let i = 0; i < n; i++) {
    const x = 26 + i * gap;
    s.append(svgEl("circle", { cx: x, cy: 35, r, fill: "none", stroke: "#4f46e5", "stroke-width": 5, "stroke-dasharray": "4 3" }));
    const tx = svgEl("text", { x, y: 39, "text-anchor": "middle", "font-size": 11, fill: "#14162b", "font-weight": 700 }); tx.textContent = i + 1; s.append(tx);
  }
  const a = svgEl("text", { x: 26, y: 10, "text-anchor": "middle", "font-size": 14, fill: "#ef4444" }); a.textContent = "↻"; s.append(a);
  return s;
}

export function abilities(app, ctx) {
  const AB = S.abilities;
  const dom = DOMAINS.find(d => !AB[d.id]?.done);
  if (!dom) return AB.clerical ? ctx.go("dealbreakers") : clerical(app, ctx);

  const st = AB[dom.id] ||= { log: [], used: [] };
  const d = CAT.newDomain(); st.log.forEach(x => CAT.update(d, x));      // постериорды журналдан қалпына келтіру
  const level = CAT.nextLevel(d);
  const used = new Set(st.used);
  const item = dom.gen(level, { has: x => used.has(JSON.stringify(x.q)), add: x => used.add(JSON.stringify(x.q)) });
  const di = DOMAINS.indexOf(dom);

  const t0 = performance.now(); let left = ITEM_SEC, done = false;
  const timerEl = h("span", { class: "timer" }, `⏱ ${left} ${t("sec")}`);
  const iv = setInterval(() => {
    if (!timerEl.isConnected) { clearInterval(iv); done = true; return; }
    timerEl.textContent = `⏱ ${--left} ${t("sec")}`;
    if (left <= 0) finish(-1);
  }, 1000);

  function finish(choice) {
    if (done) return; done = true; clearInterval(iv);
    const rec = { level: item.level, correct: choice === item.a, options: item.options, ms: Math.round(performance.now() - t0) };
    st.log.push(rec); st.used.push(JSON.stringify(item.q));
    CAT.update(d, rec);
    if (CAT.done(d)) Object.assign(st, CAT.estimate(d), { done: true });
    save(); rerender(app, abilities, ctx);
  }

  let fig = null, optClass = "options";
  if (item.fig) { fig = shapeSvg(item.fig.base, 24, "#14162b"); optClass = "options grid2"; }
  if (item.lever) fig = leverSvg(item.lever);
  if (item.gears) fig = gearsSvg(item.gears);
  const opts = item.o.map((o, k) => h("button", { class: "opt", style: item.fig ? "justify-content:center;min-height:96px" : "",
    onclick: () => finish(k) }, h("span", { class: "opt__key" }, "ABCD"[k]), item.fig ? shapeSvg(item.fig.opts[k]) : h("span", {}, L(o))));

  app.append(screen(
    di === 0 && st.log.length === 0 && h("div", {}, h("h1", { class: "title" }, t("abl_t")), h("p", { class: "lead" }, t("abl_l"))),
    h("div", { class: "q-counter", style: "display:flex;justify-content:space-between;align-items:center" },
      h("span", {}, `${dom.e} ${L(domainLabel(dom.id))} · ${t("section")} ${di + 1}/${DOMAINS.length + 1}`), timerEl),
    h("div", { class: "lvl" }, [1, 2, 3, 4, 5].map(l => h("i", { class: l <= item.level ? "on" : "" }))),
    h("div", { class: "q-text" }, L(item.q)),
    fig && h("div", { class: "figure" }, fig),
    h("div", { class: optClass }, opts),
    h("button", { class: "btn btn--ghost", style: "margin-top:16px;font-size:14px;padding:10px 16px", onclick: () => finish(-1) }, t("dont_know"))
  ));
}

/* ---------- Кеңсе жылдамдығы мен ұқыптылығы: 45 секунд ---------- */
function clerical(app, ctx) {
  const SEC = 45;
  let pair = clericalPair(), right = 0, wrong = 0, started = false, t0, iv;
  const a = h("div", { class: "code" }), b = h("div", { class: "code" });
  const timerEl = h("span", { class: "timer" }, `⏱ ${SEC} ${t("sec")}`);
  const score = h("div", { class: "muted", style: "text-align:center" });
  const show = () => { a.textContent = pair.a; b.textContent = pair.b; score.textContent = `✓ ${right}   ✗ ${wrong}`; };
  const end = () => {
    clearInterval(iv);
    S.abilities.clerical = { right, wrong, rate: (right - wrong) * 60 / SEC };
    save(); rerender(app, abilities, ctx);
  };
  const ans = same => {
    if (!started) { started = true; t0 = performance.now();
      iv = setInterval(() => { if (!timerEl.isConnected) return clearInterval(iv);
        const l = SEC - Math.floor((performance.now() - t0) / 1000); timerEl.textContent = `⏱ ${l} ${t("sec")}`; if (l <= 0) end(); }, 250); }
    same === pair.same ? right++ : wrong++;
    pair = clericalPair(); show();
  };
  app.append(screen(
    h("div", { class: "q-counter", style: "display:flex;justify-content:space-between" },
      h("span", {}, `🗂️ ${L(domainLabel("clerical"))} · ${t("section")} ${DOMAINS.length + 1}/${DOMAINS.length + 1}`), timerEl),
    h("h2", {}, t("cler_t")), h("p", { class: "lead" }, t("cler_l")),
    h("div", { class: "codes" }, a, h("span", { class: "muted" }, "⇄"), b),
    h("div", { class: "grid2", style: "margin-top:18px" },
      h("button", { class: "btn btn--ghost", onclick: () => ans(true) }, "＝ " + t("same")),
      h("button", { class: "btn btn--ghost", onclick: () => ans(false) }, "≠ " + t("diff"))),
    score));
  show();
}

/* =========================================================
   5. «БҰЛ МАҒАН КЕЛМЕЙДІ» — элиминация (Тверски, Гати)
   ========================================================= */
export function dealbreakers(app, ctx) {
  const sel = new Set(S.dealbreakers);
  const grid = h("div", { class: "chips", style: "margin-top:18px" });
  const btn = h("button", { class: "btn btn--primary btn--block", onclick: () => {
    S.dealbreakers = [...sel]; S.dealbreakersDone = true; save(); ctx.go("interview"); } });
  const paint = () => {
    grid.replaceChildren(...DEALBREAKERS.map(d =>
      h("button", { class: "chip" + (sel.has(d.id) ? " on" : ""), onclick: () => { sel.has(d.id) ? sel.delete(d.id) : sel.add(d.id); paint(); } },
        `${d.e} ${L(d)}`)));
    btn.textContent = (sel.size ? `${t("next")} (${sel.size})` : t("db_none")) + " →";   // таңдау санын көрсету
  };
  paint();
  app.append(screen(
    h("h1", { class: "title" }, t("db_t")), h("p", { class: "lead" }, t("db_l")), grid,
    h("p", { class: "muted", style: "margin-top:14px" }, t("db_note")),
    h("div", { class: "actions" }, btn)));
}
