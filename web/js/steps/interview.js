/* 6. ЖИ-сұхбат: сұрақтарды ЖИ қояды, бағалауды тест жасайды.
   Сұхбат тек дәйексөзге сүйенген түзетулер береді (сервер тексереді). */
import { S, save, interviewTurn } from "../state.js";
import { t, getLang, L } from "../i18n.js";
import { h, screen } from "../ui.js";
import { score, archetype, domainLabel } from "../engine.js";
import { VALUES } from "../data/values.js";

export function interview(app, { go }) {
  const iv = S.interview;
  const chat = h("div", { class: "chat" });
  const input = h("textarea", { class: "input", rows: 2, placeholder: t("iv_ph"), maxlength: 1000 });
  const send = h("button", { class: "btn btn--primary" }, t("iv_send"));
  const composer = h("div", { class: "composer" }, input, send);
  const footer = h("div", { class: "actions" });
  const counter = h("div", { class: "q-counter" });

  const bubble = (role, text) => h("div", { class: "msg msg--" + (role === "ai" ? "ai" : "me") }, text);
  iv.messages.forEach(m => chat.append(bubble(m.role, m.text)));

  function finish() {
    composer.hidden = true;
    footer.replaceChildren(h("button", { class: "btn btn--primary btn--block", onclick: () => go("top3") }, t("next") + " →"));
  }
  function fail() {
    composer.hidden = true;
    chat.append(h("div", { class: "banner banner--warn" }, t("iv_err")));
    footer.replaceChildren(h("button", { class: "btn btn--ghost", onclick: () => { iv.done = true; iv.skipped = true; save(); go("top3"); } }, t("skip") + " →"));
  }

  async function turn(message) {
    const typing = bubble("ai", "…  " + t("iv_typing"));
    typing.classList.add("msg--typing");
    chat.append(typing); typing.scrollIntoView({ behavior: "smooth", block: "end" });
    send.disabled = input.disabled = true;
    try {
      let context = null;
      if (!iv.messages.length) {                       // бірінші қадам: тест қорытындысы
        const res = score(S), top = res.visible.slice(0, 5);
        context = {
          top: top.map(r => ({ id: r.c.id, name: L(r.c.name), fit: +r.total.toFixed(2) })),
          tied: res.tied, types: archetype(res.profile),
          strong: [...new Set(top.slice(0, 3).flatMap(r => r.strong.map(d => L(domainLabel(d)))))],
          weak: [...new Set(top.slice(0, 3).flatMap(r => r.weak.map(d => L(domainLabel(d)))))],
          values: (S.values || []).slice(0, 3).map(id => VALUES.find(v => v.id === id)?.ru).filter(Boolean),
        };
      }
      const r = await interviewTurn({ sid: S.sid, lang: getLang(), context, message });
      typing.remove();
      iv.messages.push({ role: "ai", text: r.reply });
      chat.append(bubble("ai", r.reply));
      counter.textContent = `${Math.min(r.answered + 1, r.total)} / ${r.total}`;
      if (r.done) { iv.done = true; iv.adj = r.adj || {}; counter.textContent = "✓ " + t("iv_done"); finish(); }
      save();
    } catch (e) {
      console.warn(e); typing.remove(); fail();
    } finally {
      send.disabled = input.disabled = false; input.focus();
    }
  }

  function submit() {
    const text = input.value.trim();
    if (!text || send.disabled) return;
    input.value = "";
    iv.messages.push({ role: "me", text }); save();
    chat.append(bubble("me", text));
    turn(text);
  }
  send.addEventListener("click", submit);
  input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } });

  app.append(screen(
    h("span", { class: "eyebrow" }, "🤖 AI"),
    h("h1", { class: "title" }, t("iv_t")),
    h("p", { class: "lead" }, t("iv_l")),
    h("div", { class: "banner banner--warn", style: "margin-bottom:14px;font-size:13.5px" }, "🔒 " + t("iv_privacy") + " ",
      h("a", { href: "#/privacy" }, t("priv_link"))),
    counter, chat, composer, footer));

  if (!S.sid) return fail();
  if (iv.done) { counter.textContent = "✓ " + t("iv_done"); finish(); }
  else if (!iv.messages.length) turn(null);
}
