/* 7. Үш мамандық → 8. Нақты жұмыс көрінісі (Realistic Job Preview, Wanous 1973)
   Викторина емес: мамандықтың шынайы жағы (O*NET деректері) көрсетіліп,
   оқушының реакциясы сұралады. «Мүлде менікі емес» — мамандық төмендейді. */
import { S, save } from "../state.js";
import { t, L, getLang } from "../i18n.js";
import { h, screen, fmt, pct } from "../ui.js";
import { score, byId } from "../engine.js";
import { ACTIVITIES, CONTEXT_LABEL, freq, regionK } from "../data/filters.js";
import { SCALE } from "../data/interest_items.js";

export function pillars(r) {
  const bar = (label, v, color) => h("div", { class: "pillar" },
    h("span", { class: "pillar__l" }, label), h("div", { class: "meter" }, h("div", { style: `width:${Math.round(v * 100)}%;background:${color}` })),
    h("span", { class: "pillar__v" }, pct(v)));
  return h("div", { class: "pillars" },
    bar("❤️ " + t("p_interest"), r.interest, "#4f46e5"),
    bar("🧠 " + t("p_ability"), r.ability, "#0ea5e9"),
    bar("🔮 " + t("p_future"), r.future, "#10b981"));
}

export function top3(app, { go }) {
  const res = score(S);
  const top = res.visible.slice(0, 3);
  S.top3 = top.map(r => r.c.id); save();
  app.append(screen(
    h("span", { class: "eyebrow" }, "🎯"),
    h("h1", { class: "title" }, t("top_t")),
    h("p", { class: "lead" }, t("top_l")),
    res.tied && h("div", { class: "banner banner--info", style: "margin:16px 0" },
      t("tied").replace("{a}", L(res.visible[0].c.name)).replace("{b}", L(res.visible[1].c.name))),
    h("div", { class: "stack", style: "margin-top:20px" }, top.map(r =>
      h("div", { class: "card" },
        h("div", { class: "rank" }, h("div", { class: "rank__n", style: "font-size:24px;background:none" }, r.c.emoji),
          h("div", { class: "rank__body" }, h("div", { class: "rank__name" }, L(r.c.name))),
          h("div", { class: "rank__pct" }, pct(r.total))),
        pillars(r)))),
    h("div", { class: "actions" },
      h("button", { class: "btn btn--primary btn--block", onclick: () => go("explore", "0") }, t("explore") + " →"))));
}

/* Жұмыстың шынайы бейнесі — тек деректерден */
export function preview(c) {
  const lang = getLang();
  const k = regionK(S.about.region);
  const conds = Object.entries(c.context).filter(([, v]) => v >= 2.5).sort((a, b) => b[1] - a[1]);
  return h("div", { class: "stack" },
    h("div", { class: "card" }, h("h3", {}, "🛠️ " + t("rjp_do")),
      h("div", { class: "chips" }, c.activities.map(a => h("span", { class: "chip", style: "cursor:default" }, L(ACTIVITIES[a])))),
      h("p", { class: "muted", style: "margin:10px 0 0;font-size:12px" }, t("rjp_do_note"))),
    h("div", { class: "card" }, h("h3", {}, "🏢 " + t("rjp_cond")),
      conds.length ? h("div", { class: "day" }, conds.map(([key, v]) =>
        h("div", { class: "day__row", style: "grid-template-columns:28px 1fr auto" },
          h("span", {}, CONTEXT_LABEL[key].e), h("span", {}, L(CONTEXT_LABEL[key])), h("b", {}, freq(v, lang)))))
        : h("p", { class: "muted", style: "margin:0" }, t("rjp_cond_none"))),
    h("div", { class: "grid2" },
      h("div", { class: "card" }, h("h3", {}, "💰 " + t("ex_pay")),
        c.salary ? [h("div", { class: "kpi__v", style: "font-size:19px" },
            `${fmt(c.salary * k * 0.7 / 1000) }–${fmt(c.salary * k * 1.3 / 1000)} мың ₸`),
            h("div", { class: "muted" }, `hh.kz · n = ${c.n}`)]
          : h("p", { class: "muted", style: "margin:0" }, t("no_salary"))),
      h("div", { class: "card" }, h("h3", {}, "🔮 " + t("p_future")),
        h("div", { class: "muted", style: "font-size:14px" },
          `${t("f_auto")}: ${pct(c.future.automation)}`, h("br"), `${t("f_llm")}: ${pct(c.future.llm)}`))),
    h("div", { class: "card" }, h("h3", {}, "📚 " + t("c_ent")), h("b", {}, L(c.ent)),
      c.ent.verify && h("div", { class: "muted", style: "font-size:13px" }, t("ent_verify"))));
}

export function explore(app, { go, arg }) {
  const i = +arg || 0;
  const id = S.top3[i];
  if (!id) return go("result");
  const c = byId(id);
  const r = score(S).rows.find(x => x.c.id === id);
  const next = () => go(i + 1 < S.top3.length ? "explore" : "result", i + 1 < S.top3.length ? String(i + 1) : undefined);
  const react = reactBlock(id, next);
  app.append(screen(
    h("div", { class: "q-counter" }, `${t("explore")} · ${i + 1} / ${S.top3.length}`),
    h("h1", { class: "title" }, `${c.emoji} ${L(c.name)}`),
    pillars(r),
    h("p", { class: "lead", style: "margin-top:16px" }, t("rjp_lead")),
    preview(c),
    react));
}

/* Реакция блогы — танысуда да, кез келген мамандық карточкасында да */
export function reactBlock(id, onDone) {
  const prev = S.rjp[id]?.reaction;
  return h("div", { class: "card", style: "margin-top:16px;border-color:var(--brand)" },
    h("h3", {}, t("rjp_q")),
    h("div", { class: "scale" }, SCALE.map(s =>
      h("button", { class: "scale__btn" + (prev === s.v ? " on" : ""), onclick: () => {
        S.rjp[id] = { reaction: s.v, at: Date.now() }; save(); onDone(); } },
        h("span", { class: "scale__e" }, s.e), h("span", { class: "scale__l" }, L(t("rjp_scale")[s.v - 1]))))));
}
