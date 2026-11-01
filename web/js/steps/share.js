/* 11. Бөлісу + ата-ана сілтемесі + пікір. Ата-ана беті — /#/parent/<token>. */
import { S, save, reset, sendReview, getParentView, sendParent } from "../state.js";
import { t, L, getLang, setLang } from "../i18n.js";
import { h, screen, pct } from "../ui.js";
import { buildProfile, archetype, byId } from "../engine.js";
import { TYPE_NAMES } from "../data/interest_items.js";
import { CAREERS as PROFESSIONS } from "../data/careers.js";

const VALUES = {
  money: { e: "💰", kk: "Жоғары жалақы", ru: "Высокая зарплата" }, freedom: { e: "🕊️", kk: "Еркіндік", ru: "Свобода" },
  stability: { e: "🛡️", kk: "Тұрақтылық", ru: "Стабильность" }, help: { e: "❤️", kk: "Адамдарға пайда", ru: "Польза людям" },
  fame: { e: "⭐", kk: "Танымалдық", ru: "Известность" } };

const P_STR = {
  kk: { title: "Балаңызды кім ретінде көресіз?", lead: "3 минут. Жауаптарыңыз балаңыздың нәтижесімен салыстырылады — оның жеке жауаптарын көрмейсіз.",
        pick: "3 мамандыққа дейін таңдаңыз", val: "Баланың жұмысында не маңызды?", note: "Қосымша пікір (міндетті емес)",
        send: "Салыстыру", cmp: "Салыстыру", match: "Сәйкес келеді", you: "Сіз таңдадыңыз", child: "Баланың нәтижесі", fit: "сәйкестік",
        gap: "Көзқарастарыңыз ерекшеленеді. Бұл — ұрыс емес, сөйлесуге себеп: балаңызбен оның нәтижесін бірге қараңыз.",
        wait: "Балаңыз тестті әлі аяқтаған жоқ." },
  ru: { title: "Кем вы видите своего ребёнка?", lead: "3 минуты. Ваши ответы сравнятся с результатом ребёнка — его личные ответы вы не увидите.",
        pick: "Выберите до 3 профессий", val: "Что важно в работе ребёнка?", note: "Комментарий (необязательно)",
        send: "Сравнить", cmp: "Сравнение", match: "Совпадает", you: "Вы выбрали", child: "Результат ребёнка", fit: "соответствие",
        gap: "Ваши взгляды расходятся. Это не повод для спора, а повод поговорить: посмотрите результат вместе с ребёнком.",
        wait: "Ребёнок ещё не закончил тест." },
};
const PS = k => (P_STR[getLang()] || P_STR.ru)[k];

/* ---------- Салыстыру блогы (балаға да, ата-анаға да) ---------- */
function comparison(view) {
  const exp = view.parent?.expect || [], top = view.top3 || [];
  const both = exp.filter(id => top.includes(id));
  return h("div", { class: "card stack" },
    h("h2", {}, "👨‍👩‍👧 " + PS("cmp")),
    both.length > 0 && h("div", { class: "banner banner--info" }, "✅ " + PS("match") + ": " + both.map(id => L(byId(id).name)).join(", ")),
    h("div", { class: "grid2" },
      h("div", {}, h("b", {}, PS("you")), exp.map(id => h("div", {}, `${byId(id).emoji} ${L(byId(id).name)}` +
        (view.fits?.[id] != null ? ` — ${pct(view.fits[id])}` : "")))),
      h("div", {}, h("b", {}, PS("child")), top.map(id => h("div", {}, `${byId(id).emoji} ${L(byId(id).name)}`)))),
    exp.some(id => !top.includes(id)) && h("p", { class: "muted", style: "margin:0" }, PS("gap")));
}

export function share(app, { go }) {
  const prof = buildProfile(S);
  const [t1, t2] = archetype(prof);
  const link = `${location.origin}${location.pathname}#/parent/${S.ptok}`;
  const copyBtn = h("button", { class: "btn btn--ghost", onclick: async () => {
    try { await navigator.clipboard.writeText(link); copyBtn.textContent = t("copied"); } catch {} } }, t("copy"));

  const parentBox = h("div");
  if (S.ptok) getParentView(S.ptok).then(v => v.parent && parentBox.replaceChildren(comparison(v))).catch(() => {});

  /* Пікір */
  let rating = S.review?.rating || 0;
  const stars = h("div", { style: "display:flex;gap:6px;font-size:30px;margin:8px 0" });
  const paintStars = () => stars.replaceChildren(...[1, 2, 3, 4, 5].map(n =>
    h("button", { style: "border:0;background:none;padding:0;filter:" + (n <= rating ? "none" : "grayscale(1) opacity(.35)"),
                  "aria-label": n, onclick: () => { rating = n; paintStars(); } }, "⭐")));
  paintStars();
  const text = h("textarea", { class: "input", rows: 3, maxlength: 2000, placeholder: t("review_ph") }, S.review?.text || "");
  const reviewBox = h("div", { class: "card" });
  const paintReview = () => reviewBox.replaceChildren(
    h("h2", {}, "💬 " + t("review_t")),
    S.review ? h("div", { class: "banner banner--info" }, t("review_ok")) : h("div", {},
      h("p", { class: "muted", style: "margin:0" }, t("review_l")), stars, text,
      h("div", { class: "actions", style: "margin-top:12px" },
        h("button", { class: "btn btn--primary", onclick: async e => {
          if (!rating) return stars.animate([{ transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "none" }], 250);
          e.target.disabled = true;
          try { await sendReview(rating, text.value); S.review = { rating, text: text.value }; save(); }
          catch (err) { console.warn(err); e.target.disabled = false; return; }
          paintReview();
        } }, t("review_send")))));
  paintReview();

  app.append(screen(
    h("h1", { class: "title" }, t("share_t")),
    h("div", { class: "story", style: "margin:20px auto" },
      h("div", {}, h("div", { class: "story__k" }, "Bağdar · 2026"),
        h("div", { class: "story__emoji" }, TYPE_NAMES[t1].emoji),
        h("div", { class: "story__arch" }, `${L(TYPE_NAMES[t1])} + ${L(TYPE_NAMES[t2])}`)),
      h("div", { class: "story__list" }, S.top3.map((id, i) => h("div", {}, `${i + 1}. ${byId(id).emoji} ${L(byId(id).name)}`))),
      h("div", { class: "story__brand" }, location.host || "bagdar.kz")),

    S.ptok && h("div", { class: "card", style: "margin-top:18px" },
      h("h2", {}, "👨‍👩‍👧 " + t("parent_t")), h("p", { class: "muted" }, t("parent_l")),
      h("input", { class: "input", value: link, readonly: true, onclick: e => e.target.select() }),
      h("div", { class: "actions", style: "margin-top:12px" }, copyBtn)),
    h("div", { style: "margin-top:14px" }, parentBox),
    h("div", { style: "margin-top:14px" }, reviewBox),
    h("div", { class: "actions" },
      h("button", { class: "btn btn--ghost", onclick: () => go("result") }, "← " + t("res_t")),
      h("button", { class: "btn btn--ghost", onclick: () => { if (confirm(t("restart") + "?")) { reset(); go("home"); } } }, "↺ " + t("restart")))
  ));
}

/* ---------- Ата-ана беті ---------- */
export function parent(app, { arg }) {
  document.getElementById("progress").hidden = true;
  const box = h("div");
  app.append(screen(box));
  getParentView(arg).then(view => {
    if (view.lang && view.lang !== getLang() && P_STR[view.lang]) { setLang(view.lang); }
    if (view.parent) return box.replaceChildren(comparison(view));
    if (!view.top3?.length) return box.replaceChildren(h("div", { class: "banner banner--warn" }, PS("wait")));

    const pick = new Set(), vals = new Set();
    const note = h("textarea", { class: "input", rows: 2, maxlength: 1000, placeholder: PS("note") });
    const grid = h("div", { class: "chips" });
    const vgrid = h("div", { class: "chips" });
    const paint = () => {
      grid.replaceChildren(...PROFESSIONS.map(p => h("button", { class: "chip" + (pick.has(p.id) ? " on" : ""), onclick: () => {
        pick.has(p.id) ? pick.delete(p.id) : pick.size < 3 && pick.add(p.id); paint(); } }, `${p.emoji} ${L(p.name)}`)));
      vgrid.replaceChildren(...Object.entries(VALUES).map(([k, v]) => h("button", { class: "chip" + (vals.has(k) ? " on" : ""),
        onclick: () => { vals.has(k) ? vals.delete(k) : vals.add(k); paint(); } }, `${v.e} ${L(v)}`)));
    };
    paint();
    box.replaceChildren(
      h("h1", { class: "title" }, PS("title")), h("p", { class: "lead" }, PS("lead")),
      h("div", { class: "field" }, h("span", { class: "field__label" }, PS("pick")), grid),
      h("div", { class: "field" }, h("span", { class: "field__label" }, PS("val")), vgrid),
      h("div", { class: "field" }, note),
      h("div", { class: "actions" }, h("button", { class: "btn btn--primary btn--block", onclick: async e => {
        if (!pick.size) return;
        e.target.disabled = true;
        await sendParent(arg, { expect: [...pick], values: [...vals], note: note.value });
        const v = await getParentView(arg);
        box.replaceChildren(comparison(v));
      } }, PS("send") + " →")));
  }).catch(() => box.replaceChildren(h("div", { class: "banner banner--warn" }, "404")));
}
