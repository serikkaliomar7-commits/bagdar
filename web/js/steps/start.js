import { S, save, startSession } from "../state.js";
import { t, L, getLang } from "../i18n.js";
import { h, screen } from "../ui.js";
import { REGIONS } from "../data/filters.js";

export function home(app, { go }) {
  const resume = S.step && !["home", "about"].includes(S.step);
  app.append(screen(
    h("div", { class: "hero" },
      h("span", { class: "eyebrow" }, t("hero_eyebrow")),
      h("h1", { class: "title" }, t("hero_title")),
      h("p", { class: "lead" }, t("hero_lead")),
      h("div", { class: "actions", style: "justify-content:center" },
        h("button", { class: "btn btn--primary", onclick: () => go("about") }, t("start") + " →"),
        resume && h("button", { class: "btn btn--ghost", onclick: () => go(S.step) }, "↻ " + t("next"))),
      h("p", { class: "muted", style: "margin-top:14px" }, t("hero_time")),
      h("ul", { class: "steps-list" },
        t("hero_steps").map((s, i) => h("li", {}, h("b", {}, i + 1), s))))
  ));
}

export function about(app, { go }) {
  const a = S.about;
  const set = (k, v) => { a[k] = v; save(); paint(); };

  const chips = (key, opts) => h("div", { class: "chips" },
    opts.map(([v, label]) => h("button", { class: "chip" + (a[key] === v ? " on" : ""), onclick: () => set(key, v) }, label)));

  const body = h("div");
  function paint() {
    const ok = a.grade && a.region && a.lang && a.budget && a.consent && (a.grade !== 9 || a.after9);
    body.replaceChildren(...[
      h("div", { class: "field" }, h("span", { class: "field__label" }, t("grade")),
        chips("grade", [[9, "9"], [10, "10"], [11, "11"]])),
      a.grade === 9 && h("div", { class: "field" }, h("span", { class: "field__label" }, t("after9")),
        chips("after9", [["school", t("a9_school")], ["college", t("a9_college")], ["unsure", t("a9_unsure")]])),
      h("div", { class: "field" }, h("label", { class: "field__label", for: "rg" }, t("region")),
        h("select", { class: "input", id: "rg", onchange: e => set("region", e.target.value) },
          h("option", { value: "" }, "—"),
          REGIONS.map(r => h("option", { value: r.id, selected: a.region === r.id }, L(r))))),
      h("div", { class: "field" }, h("span", { class: "field__label" }, t("study_lang")),
        chips("lang", [["kk", "Қазақ"], ["ru", "Русский"], ["en", "English"]])),
      h("div", { class: "field" }, h("span", { class: "field__label" }, t("budget")),
        chips("budget", [["grant", t("b_grant")], ["paid", t("b_paid")], ["any", t("b_any")]])),
      h("label", { class: "card", style: "display:flex;gap:12px;margin-top:24px;cursor:pointer;align-items:flex-start" },
        h("input", { type: "checkbox", checked: !!a.consent, style: "margin-top:4px;width:20px;height:20px",
                     onchange: e => set("consent", e.target.checked) }),
        h("span", {}, h("b", {}, t("consent")), h("br"), h("span", { class: "muted" }, t("consent_note") + " "),
          h("a", { href: "#/privacy" }, t("priv_read")))),
      h("div", { class: "actions" },
        h("button", { class: "btn btn--primary btn--block", disabled: !ok, onclick: async () => {
          try { await startSession(getLang()); } catch (e) { console.warn(e); }
          go("interests");
        } }, t("next") + " →"))].filter(Boolean));   // false/null элементтерін өткізбеу
  }
  paint();
  app.append(screen(h("h1", { class: "title" }, t("about_t")), h("p", { class: "lead" }, t("about_l")), body));
}
