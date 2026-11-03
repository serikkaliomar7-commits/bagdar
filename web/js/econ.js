/* =========================================================
   econ.js — білім беру инвестициясының экономикалық моделі.
   Python моделінің (daryn-model/model.py) нақты көшірмесі;
   формулалар ғылыми жұмыстың 1.2-тарауына сәйкес.
   ========================================================= */

export const P = {
  rNominal: 0.1675,  // ҚРҰБ базалық мөлшерлемесі, 24.07.2026
  inflation: 0.103,  // жылдық инфляция, маусым 2026
  gReal: 0.018,      // нақты жалақы өсімі, ҰСБ 2025
  T: 4,              // бакалавриат, жыл
  H: 20,             // еңбек көкжиегі, жыл
  wSchool: 207500,   // жоғары білімсіз жалақы — hh.kz медианасы (күзетші, n=45)
  pEmp: 0.795,       // жұмысқа орналасу — «Атамекен» рейтингі
  pEmpLow: 0.40,     // жұмысқа орналасу — ЖАП аудиті (пессимистік)
};
// Фишер теңдеуі: ақша ағындары нақты мәнде, сондықтан мөлшерлеме де нақты
P.rReal = (1 + P.rNominal) / (1 + P.inflation) - 1;

/** Оқу ақысы сценарийлері, ₸/жыл (Kursiv Media 14.07.2026 диапазоны). */
export const TUITION = { grant: 0, paid: 1_200_000, private: 4_000_000 };

/** Жылдық ақша ағындары: 1..T — инвестиция, T+1..T+H — жалақы сыйақысы. */
export function cashFlows({ wMonth, tuition, pEmp = P.pEmp, wSchool = P.wSchool,
                            T = P.T, H = P.H, g = P.gReal }) {
  const cf = [];
  for (let t = 0; t < T; t++) cf.push(-(tuition + wSchool * 12));
  for (let k = 0; k < H; k++) cf.push((wMonth - wSchool) * 12 * (1 + g) ** k * pEmp);
  return cf;
}

export const npv = (cf, r) => cf.reduce((s, c, t) => s + c / (1 + r) ** (t + 1), 0);

/** IRR — биссекция әдісі. */
export function irr(cf, lo = -0.9, hi = 3.0, tol = 1e-7) {
  const f = r => npv(cf, r);
  if (f(lo) * f(hi) > 0) return null;
  for (let i = 0; i < 200 && hi - lo > tol; i++) {
    const mid = (lo + hi) / 2;
    if (f(lo) * f(mid) <= 0) hi = mid; else lo = mid;
  }
  return (lo + hi) / 2;
}

/** Кумулятивтік дисконтталған ағын — график үшін. */
export function cumulative(cf, r) {
  let acc = 0;
  return cf.map((c, t) => (acc += c / (1 + r) ** (t + 1)));
}

/** DPP — сызықтық интерполяциямен, бөлшек жылға дейін. */
export function dpp(cf, r) {
  const cum = cumulative(cf, r);
  for (let t = 0; t < cum.length; t++) {
    const prev = t ? cum[t - 1] : 0;
    if (prev < 0 && cum[t] >= 0) return t + (0 - prev) / (cum[t] - prev);
  }
  return null;
}

/** Толық талдау: NPV, IRR, DPP, ROI және график деректері. */
export function analyse(opts) {
  const r = P.rReal, T = opts.T ?? P.T;
  const cf = cashFlows(opts);
  const invest = -cf.slice(0, T).reduce((a, b) => a + b, 0);
  const gains = cf.slice(T).reduce((a, b) => a + b, 0);
  return { invest, npv: npv(cf, r), irr: irr(cf), dpp: dpp(cf, r),
           roi: (gains - invest) / invest, curve: cumulative(cf, r), r };
}

/* ---------- Монте-Карло: «өтелмеу» тәуекелі ----------
   Жалақы ~ N(медиана, 25%), жұмысқа орналасу ~ U(ЖАП, «Атамекен»),
   нақты өсім ~ N(1,8%, 1%). Нүктелік баға емес — таралым. */
function gauss() {                       // Бокс–Мюллер түрлендіруі
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function monteCarlo(opts, n = 5000) {
  const sd = opts.wMonth * 0.25;
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const w = Math.max(P.wSchool, opts.wMonth + gauss() * sd);
    // Мамандық бойынша жұмысқа орналасу белгілі болса — соның айналасында (±), әйтпесе жалпы диапазон
    const lo = opts.pEmp != null ? Math.max(0.05, opts.pEmp - 0.15) : P.pEmpLow;
    const hi = opts.pEmp != null ? Math.min(1, opts.pEmp + 0.10) : P.pEmp;
    const p = lo + Math.random() * (hi - lo);
    const g = Math.max(0, P.gReal + gauss() * 0.01);
    out[i] = npv(cashFlows({ ...opts, wMonth: w, pEmp: p, g }), P.rReal);
  }
  out.sort();
  const q = f => out[Math.floor(f * (n - 1))];
  let neg = 0; for (const x of out) if (x < 0) neg++;
  return { median: q(0.5), p05: q(0.05), p95: q(0.95), lossProb: neg / n };
}
