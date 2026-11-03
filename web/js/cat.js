/* =========================================================
   cat.js — компьютерлік бейімделгіш тестілеу (CAT).
   Модель: 3PL (Бирнбаум), бөлшектенбеген түрі:
       P(дұрыс | θ) = c + (1 − c) · σ(θ − b)
   b — тапсырманың қиындығы (деңгей 1..5 → b = −2..+2),
   c — кездейсоқ табу ықтималдығы (1 / нұсқалар саны).
   θ бағасы — апостериорлық орта (EAP), приор N(0, 1).
   Келесі тапсырма θ-ға ең жақын қиындықта беріледі (Раш үшін ақпарат максимумы).
   Қиындықтар — АЛДЫН АЛА калибровка; нақтысы пилоттық іріктемеде бағаланады.
   ========================================================= */
import { CALIB } from "./data/calibration.js";

const GRID = Array.from({ length: 81 }, (_, i) => -4 + i * 0.1);
const prior = GRID.map(t => Math.exp(-t * t / 2));
const sigmoid = z => 1 / (1 + Math.exp(-z));

export const levelToB = level => level - 3;

export function newDomain() { return { post: prior.slice(), log: [] }; }

/* Пилоттан кейін әр үлгінің (tpl) нақты қиындығы белгілі болса — сол қолданылады */
export const itemB = (level, tpl) => CALIB[tpl] ?? levelToB(level);

export function update(d, { level, tpl, correct, options }) {
  const b = itemB(level, tpl), c = 1 / options;
  d.post = d.post.map((p, i) => {
    const pc = c + (1 - c) * sigmoid(GRID[i] - b);
    return p * (correct ? pc : 1 - pc);
  });
  const s = d.post.reduce((a, x) => a + x, 0);
  d.post = d.post.map(x => x / s);
  d.log.push({ level, correct });
}

export function estimate(d) {
  const mean = d.post.reduce((a, p, i) => a + p * GRID[i], 0);
  const sd = Math.sqrt(d.post.reduce((a, p, i) => a + p * (GRID[i] - mean) ** 2, 0));
  return { theta: mean, sd, pct: normCdf(mean) };
}

/* Келесі деңгей: θ-ға ең жақын b (1..5) */
export const nextLevel = d => Math.min(5, Math.max(1, Math.round(estimate(d).theta + 3)));

/* Тоқтау ережесі: ең көбі 6 тапсырма, не 4-тен кейін бағаның дәлдігі жеткілікті.
   Модельдік эксперимент (800 виртуал оқушы): 5 → r=.62, 6 → r=.66, 8 → r=.72 */
export const done = d => d.log.length >= 6 || (d.log.length >= 4 && estimate(d).sd < 0.5);

/* Стандартты қалыпты үлестірім функциясы (Абрамовиц–Стиган жуықтауы) */
export function normCdf(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const p = 0.3989423 * Math.exp(-x * x / 2) * t *
    (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}
