/* Шағын DOM көмекшілері. */
export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k === "html") el.innerHTML = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : String(c));
  return el;
}
export const fmt = n => Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ");
export const mln = n => (n / 1e6).toLocaleString("ru-RU", { maximumFractionDigits: 1 });
export const pct = (x, d = 0) => (x * 100).toFixed(d).replace(".", ",") + "%";
export function screen(...kids) { return h("section", { class: "screen" }, ...kids); }
export function shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
