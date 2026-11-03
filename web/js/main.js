/* Роутер: әр қадам — бөлек экран, күй URL-де және localStorage-та. */
import { S, save } from "./state.js";
import { t, setLang, getLang } from "./i18n.js";
import { home, about } from "./steps/start.js";
import { interests, abilities, dealbreakers, values } from "./steps/tests.js";
import { interview } from "./steps/interview.js";
import { top3, explore } from "./steps/explore.js";
import { result, card } from "./steps/result.js";
import { share, parent, expert } from "./steps/share.js";
import { privacy } from "./steps/privacy.js";

/* Прогресс жолағы: басты беттегі 7 кезеңмен бірдей (hero_steps) */
const STAGES = [["about"], ["interests"], ["abilities"], ["dealbreakers", "values"], ["interview"], ["top3", "explore"], ["result", "share"]];
const ROUTES = { home, about, interests, abilities, dealbreakers, values, interview, top3, explore, result, card, share, parent, expert, privacy };
const NO_RESUME = ["card", "parent", "expert", "privacy"];   // бұл беттер тест қадамы емес

const app = document.getElementById("app");

export function go(step, arg) {
  if (ROUTES[step] && !NO_RESUME.includes(step)) { S.step = step; save(); }
  location.hash = "#/" + step + (arg ? "/" + arg : "");
  window.scrollTo(0, 0);
}

function render() {
  const [step = S.step || "home", arg] = location.hash.replace(/^#\/?/, "").split("/");
  const route = ROUTES[step] || home;

  const i = STAGES.findIndex(st => st.includes(step));
  const bar = document.getElementById("progress");
  bar.hidden = i < 0;
  if (i >= 0) {
    document.getElementById("progress-fill").style.width = ((i + 1) / STAGES.length * 100) + "%";
    document.getElementById("progress-label").textContent = `${t("step")} ${i + 1}/${STAGES.length}`;
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
