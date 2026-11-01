/* Роутер: әр қадам — бөлек экран, күй URL-де және localStorage-та. */
import { S, save } from "./state.js";
import { t, setLang, getLang } from "./i18n.js";
import { home, about } from "./steps/start.js";
import { interests, abilities, dealbreakers } from "./steps/tests.js";
import { interview } from "./steps/interview.js";
import { top3, explore } from "./steps/explore.js";
import { result, card } from "./steps/result.js";
import { share, parent } from "./steps/share.js";

/* Прогресс жолағында көрінетін қадамдар реті */
const FLOW = ["about", "interests", "abilities", "dealbreakers", "interview", "top3", "explore", "result", "share"];
const ROUTES = { home, about, interests, abilities, dealbreakers, interview, top3, explore, result, card, share, parent };

const app = document.getElementById("app");

export function go(step, arg) {
  if (ROUTES[step] && step !== "card" && step !== "parent") { S.step = step; save(); }
  location.hash = "#/" + step + (arg ? "/" + arg : "");
  window.scrollTo(0, 0);
}

function render() {
  const [step = S.step || "home", arg] = location.hash.replace(/^#\/?/, "").split("/");
  const route = ROUTES[step] || home;

  const i = FLOW.indexOf(step);
  const bar = document.getElementById("progress");
  bar.hidden = i < 0;
  if (i >= 0) {
    document.getElementById("progress-fill").style.width = ((i + 1) / FLOW.length * 100) + "%";
    document.getElementById("progress-label").textContent = `${t("step")} ${i + 1}/${FLOW.length}`;
  }
  document.querySelectorAll("#langs button").forEach(b => b.classList.toggle("on", b.dataset.lang === getLang()));

  app.replaceChildren();
  route(app, { go, arg });
}

document.querySelectorAll("#langs button").forEach(b =>
  b.addEventListener("click", () => { setLang(b.dataset.lang); render(); }));

window.addEventListener("hashchange", render);
setLang(getLang());
render();
