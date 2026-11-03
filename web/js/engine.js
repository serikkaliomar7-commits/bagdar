/* =========================================================
   engine.js — оқушы профилі → мамандыққа сәйкестік.

   Үш тірек (оқушының өзі сұрағандай):
     1. ҚЫЗЫҒУШЫЛЫҚ — O*NET Interest Profiler; сәйкестік O*NET әдісімен:
        оқушы мен мамандықтың RIASEC бейіндерінің Пирсон корреляциясы + ұнату деңгейі.
     2. ҚАБІЛЕТ — бейімделгіш тест (3PL CAT), O*NET талаптарымен салыстыру.
     3. БОЛАШАҚ — 1 − тәуекел; тәуекел = ½·Frey&Osborne + ½·Eloundou (LLM әсері).
     + ҚҰНДЫЛЫҚ — O*NET Work Values: оқушы 6 карточканы маңыздылығы бойынша реттейді.
   Біріктіру — салмақталған геометриялық орта (компенсацияланбайтын модель):
        Total = I^0.50 · A^0.25 · V^0.10 · F^0.15
   САЛМАҚТАР АЛДЫН АЛА (сарапшылық): пилоттан кейін research/calibrate.py
   оқушылардың нақты реакцияларына сүйеніп бағалайды.
   Қызығушылық нөл болса, жоғары қабілет мамандықты «сүйреп» шығара алмайды.
   Мейта-талдау: Nye, Su, Rounds & Drasgow (2012) — қызығушылық сәйкестігі
   жұмыс нәтижесі мен тұрақтылықты болжайды.
   ========================================================= */
import { CAREERS } from "./data/careers.js";
import { ITEMS, TYPES } from "./data/interest_items.js";
import { CLERICAL_NORM } from "./data/ability_items.js";
import { VALUES } from "./data/values.js";

export const W = { interest: 0.50, ability: 0.25, values: 0.10, future: 0.15 };
export const SHIFT = { interview: 0.35, rjp: 1.5 };   // логит-ығысу салмақтары
/* «Мүлде менікі емес» (реакция = 1) — шынайы көріністі көргеннен кейінгі саналы бас тарту:
   мамандық ұсынымнан алынады (сүзгі сияқты), ұпаймен «түзетілмейді». */
export const TIE_GAP = 0.03;
export const ABILITY_DOMAINS = ["logic", "numeric", "verbal", "spatial", "mechanical", "clerical"];

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mean = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0;
const sd = a => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) ** 2))); };
const logit = x => Math.log(x / (1 - x));
const sigmoid = z => 1 / (1 + Math.exp(-z));
function pearson(x, y) {
  const mx = mean(x), my = mean(y);
  let n = 0, dx = 0, dy = 0;
  x.forEach((v, i) => { n += (v - mx) * (y[i] - my); dx += (v - mx) ** 2; dy += (y[i] - my) ** 2; });
  return dx && dy ? n / Math.sqrt(dx * dy) : 0;
}

/* =========================================================
   1. Қызығушылық: шкала статистикасы және бейімделгіш тоқтау
   ========================================================= */
export function interestStats(answers = []) {
  return TYPES.map(t => {
    const v = answers.filter(a => a.t === t).map(a => a.v);
    const m = v.length ? mean(v) : 3;
    const s = v.length > 1 ? Math.max(sd(v), 0.7) : 1.2;     // кіші іріктемеде SE-ні жасанды кішірейтпеу
    return { t, n: v.length, mean: m, se: s / Math.sqrt(Math.max(1, v.length)), norm: (m - 1) / 4 };
  });
}

/* Бейімделгіш ереже:
   1-кезең: әр типке 3 тармақтан (18).
   2-кезең: 1–2 және 3–4 орындардың айырмасы статистикалық анық болғанша
            (z ≥ 1) белгісіз типтен тағы тармақ қойылады. Ең көбі — 48. */
export const INTEREST = { warm: 3, maxItems: 48, minItems: 24, z: 1.0 };
export function nextInterestItem(answers = []) {
  const asked = new Set(answers.map(a => a.id));
  const left = t => ITEMS.filter(i => i.t === t && !asked.has(i.id));
  const st = interestStats(answers);
  const warm = st.filter(s => s.n < INTEREST.warm && left(s.t).length).sort((a, b) => a.n - b.n || Math.random() - 0.5);
  if (warm.length) return left(warm[0].t)[Math.floor(Math.random() * left(warm[0].t).length)];
  if (answers.length >= INTEREST.maxItems) return null;
  const rank = [...st].sort((a, b) => b.mean - a.mean);
  const zOf = (a, b) => (a.mean - b.mean) / Math.hypot(a.se, b.se);
  const pairs = [[rank[0], rank[1]], [rank[2], rank[3]]].filter(([a, b]) => zOf(a, b) < INTEREST.z);
  let cand = pairs.flat().filter(s => left(s.t).length).sort((a, b) => b.se - a.se);
  if (!cand.length && answers.length < INTEREST.minItems)          // ең аз көлемге дейін теңгеріп сұрау
    cand = st.filter(s => left(s.t).length).sort((a, b) => a.n - b.n);
  if (!cand.length) return null;                                    // үздік үштік анық — тоқтаймыз
  const l = left(cand[0].t);
  return l[Math.floor(Math.random() * l.length)];
}

/* Жауаптардың сенімділігі (Meade & Craig, 2012 — немқұрайлы жауап беруді анықтау) */
export function validity(s) {
  const ans = s.interests?.answers || [], att = s.interests?.attention || [];
  const flags = [];
  const failedAtt = att.filter(a => !a.ok).length;
  if (failedAtt) flags.push("attention");
  const ms = ans.map(a => a.ms).filter(Boolean).sort((a, b) => a - b);
  if (ms.length >= 10 && ms[Math.floor(ms.length / 2)] < 1200) flags.push("fast");
  const counts = {}; ans.forEach(a => counts[a.v] = (counts[a.v] || 0) + 1);
  const top = Math.max(0, ...Object.values(counts));
  if (ans.length >= 12 && top / ans.length >= 0.85) flags.push("straight");
  if (ans.length >= 12 && (counts[3] || 0) / ans.length >= 0.6) flags.push("unsure");
  return { flags, ok: !flags.some(f => f !== "unsure") };
}

/* =========================================================
   2. Профиль
   ========================================================= */
export function buildProfile(s) {
  const st = interestStats(s.interests?.answers);
  const ability = {};
  for (const d of ABILITY_DOMAINS) {
    const a = s.abilities?.[d];
    if (!a) { ability[d] = null; continue; }
    if (d === "clerical") ability[d] = clamp(sigmoid((a.rate - CLERICAL_NORM.mid) / CLERICAL_NORM.scale));
    else ability[d] = a.pct ?? null;
  }
  /* Құндылық: 1-орын → 5 ұпай … 6-орын → 0; реттелмегендер — орта (2,5) */
  const rank = s.values || [];
  const values = rank.length ? VALUES.map(v => { const i = rank.indexOf(v.id); return i < 0 ? 2.5 : 5 - i; }) : null;
  return { interest: st, ability, values, dealbreakers: s.dealbreakers || [] };
}

/* O*NET талап деңгейін (LV) 48 мамандық бойынша [0,25; 0,80] аралығына келтіру:
   бұл «қажетті процентиль» ретінде түсіндіріледі (пилоттық калибровкаға дейін). */
const REQ = {};
for (const d of ABILITY_DOMAINS) {
  const key = d === "clerical" ? "clerical" : d;
  const lvs = CAREERS.map(c => c.ability[key].lv);
  const lo = Math.min(...lvs), hi = Math.max(...lvs);
  REQ[d] = lv => 0.25 + 0.55 * (lv - lo) / ((hi - lo) || 1);
}

const DOMAIN_LABEL = {
  logic: { kk: "логика", ru: "логика" }, numeric: { kk: "сандармен жұмыс", ru: "работа с числами" },
  verbal: { kk: "мәтінді түсіну", ru: "понимание текста" }, spatial: { kk: "кеңістіктік ойлау", ru: "пространственное мышление" },
  mechanical: { kk: "механиканы түсіну", ru: "механическое понимание" }, clerical: { kk: "ұқыптылық пен жылдамдық", ru: "внимательность и скорость" },
};
export const domainLabel = d => DOMAIN_LABEL[d];

function interestFit(profile, c) {
  const u = profile.interest.map(x => x.norm);
  const r = pearson(u, c.riasec);
  const cm = mean(c.riasec);
  const w = c.riasec.map(v => Math.max(0, v - cm));
  const level = w.reduce((s, x, i) => s + x * u[i], 0) / (w.reduce((a, b) => a + b, 0) || 1);
  return { value: clamp(0.5 * Math.max(0, r) + 0.5 * level), r, level };
}

function abilityFit(profile, c) {
  let need = 0, gap = 0; const strong = [], weak = [];
  for (const d of ABILITY_DOMAINS) {
    const u = profile.ability[d];
    if (u == null) continue;
    const req = REQ[d](c.ability[d].lv), im = c.ability[d].im;
    need += im; gap += im * Math.max(0, req - u);
    if (im >= 0.6) { if (u >= req) strong.push(d); else if (u < req - 0.15) weak.push(d); }
  }
  return { value: need ? clamp(1 - 2 * gap / need) : 0.5, strong, weak };
}

/* Құндылық сәйкестігі: Пирсон r ∈ [−1, 1] → V ∈ [0,2; 1].
   Әлсіз әсер (V^0.10): тең мамандықтарды ажыратады, бірақ қызығушылықты баспайды. */
function valuesFit(profile, c) {
  if (!profile.values || !c.values) return { value: 1, r: null };
  const r = pearson(profile.values, c.values);
  return { value: 0.6 + 0.4 * r, r };
}

/* =========================================================
   3. Бағалау
   ========================================================= */
export function score(s) {
  const profile = buildProfile(s);
  const iv = s.interview?.adj || {}, rjp = s.rjp || {};
  const rows = CAREERS.map(c => {
    const I = interestFit(profile, c), A = abilityFit(profile, c), V = valuesFit(profile, c);
    const F = 1 - c.future.risk;
    let interest = clamp(I.value, 0.01, 0.99);
    const dIv = iv[c.id] ? clamp(iv[c.id].delta, -1, 1) : 0;
    const dRjp = rjp[c.id]?.reaction ? (rjp[c.id].reaction - 3) / 2 : 0;
    if (dIv || dRjp) interest = sigmoid(logit(interest) + SHIFT.interview * dIv + SHIFT.rjp * dRjp);
    const total = Math.pow(interest, W.interest) * Math.pow(Math.max(A.value, 0.01), W.ability)
                * Math.pow(V.value, W.values) * Math.pow(F, W.future);
    const blockedBy = c.tags.filter(t => profile.dealbreakers.includes(t));
    if (rjp[c.id]?.reaction === 1) blockedBy.push("rejected");
    return { c, total, interest, ability: A.value, values: V.value, valuesR: V.r, future: F, r: I.r, strong: A.strong, weak: A.weak,
             iv: iv[c.id], rjp: rjp[c.id], blockedBy };
  }).sort((a, b) => b.total - a.total);
  const visible = rows.filter(r => !r.blockedBy.length);
  const tied = visible.length > 1 && visible[0].total - visible[1].total < TIE_GAP;
  return { rows, visible, hidden: rows.filter(r => r.blockedBy.length), tied, profile };
}

/* Сенімділік: жауаптардың сапасы + қызығушылық бейінінің айқындығы */
export function confidence(s, res) {
  const v = validity(s);
  const st = [...res.profile.interest].sort((a, b) => b.mean - a.mean);
  const z = (st[2].mean - st[3].mean) / Math.hypot(st[2].se, st[3].se);
  const flat = sd(res.profile.interest.map(x => x.mean)) < 0.35;
  const level = !v.ok || flat ? "low" : z < 1 || !s.interview?.done ? "moderate" : "high";
  return { level, flat, z, validity: v };
}

/* ҰБТ пәндері — тесттің жауабы */
export function entAdvice(top, lang) {
  const tally = {};
  top.forEach(r => {
    const k = r.c.ent[lang] || r.c.ent.ru;
    const e = (tally[k] ||= { subj: k, profs: [], weight: 0, verify: false });
    e.profs.push(r.c.name[lang] || r.c.name.ru); e.weight += r.total; e.verify ||= r.c.ent.verify;
  });
  const list = Object.values(tally).sort((a, b) => b.weight - a.weight);
  return { list, shared: list[0]?.profs.length > 1 };
}

export const archetype = profile =>
  [...profile.interest].sort((a, b) => b.mean - a.mean).slice(0, 2).map(x => x.t);
export const byId = id => CAREERS.find(c => c.id === id);
