/* 9. Нәтиже (үш тірек, себептер, жасырылғандар) · 10. Мамандық карточкасы */
import { S, save } from "../state.js";
import { t, L, getLang } from "../i18n.js";
import { h, screen, fmt, mln, pct } from "../ui.js";
import { score, confidence, entAdvice, domainLabel, byId } from "../engine.js";
import { TYPE_NAMES } from "../data/interest_items.js";
import { tagLabel, regionK } from "../data/filters.js";
import { analyse, monteCarlo, TUITION } from "../econ.js";
import { pillars, preview, reactBlock } from "./explore.js";
import { VALUES } from "../data/values.js";

const START_AGE = 18;

function reasons(r, res) {
  const up = [], down = [];
  const myTop = [...res.profile.interest].sort((a, b) => b.mean - a.mean).slice(0, 2).map(x => x.t);
  const cTop = ["R", "I", "A", "S", "E", "C"].map((t, i) => [t, r.c.riasec[i]]).sort((a, b) => b[1] - a[1]).slice(0, 2).map(x => x[0]);
  const shared = cTop.filter(x => myTop.includes(x));
  if (shared.length) up.push(t("why_int").replace("{x}", shared.map(x => L(TYPE_NAMES[x])).join(" + ")));
  else down.push(t("why_int_no").replace("{x}", cTop.map(x => L(TYPE_NAMES[x])).join(" + ")));
  if (r.strong.length) up.push(r.strong.map(d => L(domainLabel(d))).join(", "));
  if (r.weak.length) down.push(t("why_weak") + ": " + r.weak.map(d => L(domainLabel(d))).join(", "));
  if (r.iv?.delta > 0) up.push({ quote: r.iv.quote, reason: r.iv.reason });
  if (r.iv?.delta < 0) down.push({ quote: r.iv.quote, reason: r.iv.reason });
  if (r.rjp?.reaction >= 4) up.push("👀 " + t("why_rjp_yes"));
  if (r.rjp?.reaction <= 2) down.push("👀 " + t("why_rjp_no"));
  if (r.valuesR != null && S.values?.length) {          // ең маңызды құндылықпен сәйкестік
    const v = VALUES.find(x => x.id === S.values[0]), name = v ? `${v.e} ${L(v).toLowerCase()}` : "";
    if (r.valuesR >= 0.5) up.push(t("why_val_yes").replace("{x}", name));
    else if (r.valuesR <= -0.2) down.push(t("why_val_no").replace("{x}", name));
  }
  if (r.future < 0.5) down.push("🔮 " + t("why_future"));
  return { up, down };
}
const reasonRow = (kind, x) => typeof x === "string"
  ? h("div", { class: "why__row why__row--" + kind }, kind === "up" ? "▲" : "▼", h("span", {}, x))
  : h("div", {}, h("div", { class: "quote" }, "💬 «" + x.quote + "»"),
      h("div", { class: "why__row why__row--" + kind, style: "margin-top:4px" }, kind === "up" ? "▲" : "▼", h("span", {}, x.reason)));

export function result(app, { go }) {
  const res = score(S), conf = confidence(S, res);
  S.top3 = res.visible.slice(0, 3).map(r => r.c.id);
  S.fits = Object.fromEntries(res.rows.map(r => [r.c.id, +r.total.toFixed(3)]));
  S.result = { conf: conf.level, flags: conf.validity.flags, hidden: res.hidden.length };
  S.resultAt ||= Date.now();
  save();

  const card = (r, i) => {
    const { up, down } = reasons(r, res);
    return h("div", { class: "card" },
      h("div", { class: "rank" }, h("div", { class: "rank__n" }, i + 1),
        h("div", { class: "rank__body" }, h("div", { class: "rank__name" }, `${r.c.emoji} ${L(r.c.name)}`)),
        h("div", { class: "rank__pct" }, pct(r.total))),
      pillars(r),
      !conf.flat && h("div", { class: "why" }, up.map(x => reasonRow("up", x)), down.map(x => reasonRow("down", x))),
      h("div", { class: "actions", style: "margin-top:14px" },
        h("button", { class: "btn btn--ghost", style: "padding:10px 18px;font-size:14px", onclick: () => go("card", r.c.id) },
          t("open_card") + (wageOf(r.c) ? " · NPV, IRR" : "") + " →")));
  };
  const ent = entAdvice(res.visible.slice(0, 3), getLang());
  const all = h("details", { class: "card", style: "margin-top:14px" },
    h("summary", { style: "cursor:pointer;font-weight:700" }, `📋 ${t("all_list")} (${res.rows.length})`),
    h("div", { class: "stack", style: "margin-top:12px" }, res.rows.map(r =>
      h("div", { class: "rank", style: "opacity:" + (r.blockedBy.length ? .45 : 1) },
        h("div", { class: "rank__body" }, `${r.c.emoji} ${L(r.c.name)}`,
          r.blockedBy.length ? h("div", { class: "muted", style: "font-size:12px" }, "⛔ " + r.blockedBy.map(x => L(tagLabel(x))).join(", ")) : null),
        h("b", {}, pct(r.total))))));

  app.append(screen(
    h("span", { class: "eyebrow" }, t("conf")[conf.level]),
    h("h1", { class: "title" }, t("res_t")),
    !conf.validity.ok && h("div", { class: "banner banner--warn", style: "margin:14px 0" }, t("val_warn")),
    conf.flat && h("div", { class: "banner banner--warn", style: "margin:14px 0" }, t("flat")),
    res.tied && h("div", { class: "banner banner--info", style: "margin:14px 0" },
      t("tied").replace("{a}", L(res.visible[0].c.name)).replace("{b}", L(res.visible[1].c.name))),
    h("div", { class: "stack", style: "margin-top:18px" }, res.visible.slice(0, 5).map(card)),
    res.hidden.length > 0 && h("p", { class: "muted", style: "margin-top:14px" },
      "⛔ " + t("hidden_n").replace("{n}", res.hidden.length)),
    all,
    h("div", { class: "card", style: "margin-top:26px" },
      h("h2", {}, "📚 " + t("ent_t")),
      !ent.shared && h("p", { class: "muted" }, t("ent_diff")),
      h("div", { class: "stack" }, ent.list.map((e, i) =>
        h("div", {}, h("b", {}, (ent.shared && i === 0 ? "🥇 " : "• ") + e.subj),
          h("div", { class: "muted" }, e.profs.join(" · ")),
          e.verify && h("div", { class: "muted", style: "font-size:12px" }, t("ent_verify")))))),
    prevBlock(res),
    feedbackBlock(),
    h("p", { class: "note-us", style: "margin-top:18px" }, t("method_note")),
    h("div", { class: "actions" },
      h("button", { class: "btn btn--primary btn--block", onclick: () => go("share") }, t("next") + " →"))));
}

/* Ретест: алдыңғы өтудің үздік үштігімен салыстыру (тұрақтылық тексерісі) */
function prevBlock(res) {
  const prev = S.prev;
  if (!prev?.top3?.length) return null;
  const now = res.visible.slice(0, 3).map(r => r.c.id);
  const same = prev.top3.filter(id => now.includes(id));
  const days = Math.max(0, Math.round((Date.now() - prev.at) / 864e5));
  S.retest = { overlap: same.length, top1Same: prev.top3[0] === now[0], days }; save();
  return h("div", { class: "card", style: "margin-top:18px" }, h("h2", {}, "🔁 " + t("prev_t")),
    same.length ? h("p", { style: "margin:0" }, t("prev_same").replace("{n}", days).replace("{x}", same.map(id => L(byId(id).name)).join(", ")))
      : h("p", { style: "margin:0" }, t("prev_none")),
    h("div", { class: "muted", style: "margin-top:6px" }, `${same.length} / 3`));
}

/* Пилоттық сауалнама: нәтиже оқушыға ұқсай ма, жаңа нәрсе білді ме */
function feedbackBlock() {
  const fb = S.feedback ||= {};
  const box = h("div", { class: "card", style: "margin-top:18px" });
  const paint = () => box.replaceChildren(
    h("h3", {}, t("fb_t")),
    h("div", { class: "chips" }, t("fb_scale").map((l, i) =>
      h("button", { class: "chip" + (fb.like === i + 1 ? " on" : ""), onclick: () => { fb.like = i + 1; fb.at = Date.now(); save(); paint(); } }, l))),
    h("h3", { style: "margin-top:14px" }, t("fb_new")),
    h("div", { class: "chips" }, [["yes", t("fb_yes")], ["bit", t("fb_bit")], ["no", t("fb_no")]].map(([k, l]) =>
      h("button", { class: "chip" + (fb.new === k ? " on" : ""), onclick: () => { fb.new = k; fb.at = Date.now(); save(); paint(); } }, l))),
    fb.like && fb.new ? h("p", { class: "muted", style: "margin:10px 0 0" }, t("fb_ok")) : "");
  paint();
  return box;
}

/* ---------- Кумулятивтік дисконтталған ағын графигі ---------- */
function chart(curve) {
  const W = 640, H = 260, P = { l: 56, r: 14, t: 16, b: 34 };
  const ys = curve, minY = Math.min(0, ...ys), maxY = Math.max(0, ...ys);
  const x = i => P.l + (i + 1) / ys.length * (W - P.l - P.r);
  const y = v => P.t + (maxY - v) / (maxY - minY || 1) * (H - P.t - P.b);
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); return e; };
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "chart", role: "img" });
  const pts = ys.map((v, i) => `${x(i)},${y(v)}`), zero = y(0);
  svg.append(el("rect", { x: P.l, y: zero, width: W - P.l - P.r, height: Math.max(0, H - P.b - zero), fill: "#fdecec", opacity: .5 }));
  svg.append(el("polygon", { points: `${x(0)},${zero} ${pts.join(" ")} ${x(ys.length - 1)},${zero}`, fill: "#4f46e5", opacity: .08 }));
  svg.append(el("line", { x1: P.l, x2: W - P.r, y1: zero, y2: zero, stroke: "#14162b", "stroke-width": 1.2 }));
  svg.append(el("polyline", { points: pts.join(" "), fill: "none", stroke: "#4f46e5", "stroke-width": 3, "stroke-linejoin": "round" }));
  for (let i = 0; i < ys.length; i += 4) { const tx = el("text", { x: x(i), y: H - 10, "text-anchor": "middle", "font-size": 12, fill: "#8a8ea8" }); tx.textContent = START_AGE + i + 1; svg.append(tx); }
  [minY, 0, maxY].forEach(v => { const tx = el("text", { x: P.l - 8, y: y(v) + 4, "text-anchor": "end", "font-size": 12, fill: "#8a8ea8" }); tx.textContent = mln(v); svg.append(tx); });
  return svg;
}

/* Жалақы: ҰСБ-ның нақты жалақысы болса — сол, әйтпесе hh.kz вакансиялары.
   Жұмысқа орналасу: мамандық бойынша дерек болса — сол, әйтпесе жалпы модель. */
const wageOf = c => c.kz?.salaryBns ?? c.salary;
const employOf = c => c.kz?.employ == null ? undefined : (c.kz.employ > 1 ? c.kz.employ / 100 : c.kz.employ);

function econBlock(c) {
  const wMonth = wageOf(c) * regionK(S.about.region), pEmp = employOf(c);
  const paths = [["grant", t("p_grant")], ["paid", t("p_paid")], ["private", t("p_private")]];
  let cur = S.about.budget === "paid" ? "paid" : "grant";
  const body = h("div"), tabs = h("div", { class: "tabs" });
  function paint() {
    const a = analyse({ wMonth, tuition: TUITION[cur], pEmp }), mc = monteCarlo({ wMonth, tuition: TUITION[cur], pEmp });
    tabs.replaceChildren(...paths.map(([k, label]) => h("button", { class: k === cur ? "on" : "", onclick: () => { cur = k; paint(); } }, label)));
    const dppTxt = a.dpp ? `${a.dpp.toFixed(1).replace(".", ",")} ${t("c_years")}` : t("c_never");
    body.replaceChildren(
      h("div", { class: "kpis", style: "margin-top:14px" },
        h("div", { class: "kpi" }, h("div", { class: "kpi__v" }, mln(a.invest) + " млн ₸"), h("div", { class: "kpi__l" }, t("c_invest"))),
        h("div", { class: "kpi " + (a.npv >= 0 ? "kpi--good" : "kpi--bad") }, h("div", { class: "kpi__v" }, (a.npv >= 0 ? "+" : "") + mln(a.npv) + " млн ₸"), h("div", { class: "kpi__l" }, t("c_npv"))),
        h("div", { class: "kpi" }, h("div", { class: "kpi__v" }, a.irr != null ? pct(a.irr, 1) : "—"), h("div", { class: "kpi__l" }, t("c_irr"))),
        h("div", { class: "kpi " + (a.dpp ? "" : "kpi--bad") }, h("div", { class: "kpi__v" }, dppTxt),
          h("div", { class: "kpi__l" }, a.dpp ? `${t("c_dpp")} · ${Math.round(START_AGE + a.dpp)} ${t("c_age")}` : t("c_dpp")))),
      h("div", { class: "card", style: "margin-top:14px" }, h("h3", {}, "📈 " + t("c_chart")), chart(a.curve)),
      h("div", { class: "card", style: "margin-top:14px" }, h("h3", {}, "🎲 " + t("c_risk")),
        h("div", { class: "kpi__v", style: `color:${mc.lossProb > 0.3 ? "var(--bad)" : mc.lossProb > 0.1 ? "var(--money)" : "var(--good)"}` }, pct(mc.lossProb)),
        h("p", { class: "muted", style: "margin:4px 0 0" }, `${t("c_mc")} · NPV 90%: ${mln(mc.p05)} … ${mln(mc.p95)} млн ₸`)));
  }
  paint();
  return h("div", { style: "margin-top:22px" }, h("h2", {}, "💸 " + t("c_paths")), tabs, body,
    h("p", { class: "muted", style: "margin-top:10px" }, t("c_note")));
}

export function card(app, { go, arg }) {
  const c = byId(arg);
  if (!c) return go("result");
  const r = score(S).rows.find(x => x.c.id === arg);
  app.append(screen(
    h("button", { class: "btn btn--ghost", style: "padding:9px 16px;font-size:14px;margin-bottom:16px", onclick: () => go("result") }, "← " + t("card_back")),
    h("h1", { class: "title" }, `${c.emoji} ${L(c.name)}`),
    pillars(r), h("div", { style: "margin-top:16px" }, preview(c)),
    reactBlock(c.id, () => go("result")),
    wageOf(c) ? econBlock(c) : h("div", { class: "banner banner--info", style: "margin-top:16px" }, t("no_salary_econ")),
    h("p", { class: "muted", style: "margin-top:14px;font-size:12px" }, t("src_note"))));
}
