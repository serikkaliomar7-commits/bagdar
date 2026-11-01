# -*- coding: utf-8 -*-
"""
Мамандықтар базасын ғылыми дереккөздерден құрастыру → web/js/data/careers.js

Дереккөздер (research/raw/):
  O*NET 30.0 (АҚШ Еңбек министрлігі, CC BY 4.0):
     Interests.txt     — RIASEC бейіні (OI шкаласы, 1–7)
     Abilities.txt     — 52 қабілетке талап (LV деңгей 0–7, IM маңыздылық 1–5)
     Knowledge.txt     — «Mechanical» білімі (механикалық ойлау үшін)
     WorkContext.txt   — жұмыс жағдайлары (CX, 1–5)
     WorkActivities.txt— 41 жалпы жұмыс түрі (IM)
     JobZones.txt      — дайындық деңгейі (1–5)
  Frey & Osborne (2013) The Future of Employment — автоматтандыру ықтималдығы (702 кәсіп, SOC-2010)
  Eloundou et al. (2023, Science 2024) GPTs are GPTs — LLM әсері, human_rating_beta (MIT)
  hh.kz (2026-09) — ҚР-дағы жалақы медианасы (13 мамандық бойынша жинақталған)
"""
import csv, json, statistics as st
from collections import defaultdict
from pathlib import Path

RAW = Path(__file__).parent / "raw"
OUT = Path(__file__).parent.parent / "web" / "js" / "data" / "careers.js"

# (id, O*NET-SOC, қабілет үшін балама SOC, Frey-Osborne SOC-2010, emoji, kk, ru, en, ҰБТ kk, ҰБТ ru, тексеру керек пе, қолмен тегтер)
M, F, B, CH, G, H, I, CR, FL, TV = ("Математика + Физика", "Математика + Информатика", "Биология + Химия",
     "Химия + Биология", "Математика + География", "Дүниежүзі тарихы + Құқық негіздері", "Шет тілі + Дүниежүзі тарихы",
     "Шығармашылық емтихан", "Биология + География", "Пәнге байланысты")
RU = {M: "Математика + Физика", F: "Математика + Информатика", B: "Биология + Химия", CH: "Химия + Биология",
      G: "Математика + География", H: "Всемирная история + Основы права", I: "Иностранный язык + Всемирная история",
      CR: "Творческий экзамен", FL: "Биология + География", TV: "Зависит от предмета"}
P = [
 # ---- R: практик / техника
 ("civil",      "17-2051.00", None, "17-2051", "🏗️", "Инженер-құрылысшы", "Инженер-строитель", "Civil engineer", M, 0, []),
 ("electrical", "17-2071.00", None, "17-2071", "⚡", "Электр инженері", "Инженер-электрик", "Electrical engineer", M, 0, []),
 ("mechanical", "17-2141.00", None, "17-2141", "⚙️", "Механик-инженер", "Инженер-механик", "Mechanical engineer", M, 0, []),
 ("petroleum",  "17-2171.00", None, "17-2171", "🛢️", "Мұнай-газ инженері", "Инженер нефти и газа", "Petroleum engineer", M, 1, ["travel"]),
 ("mining",     "17-2151.00", None, "17-2151", "⛏️", "Тау-кен инженері", "Горный инженер", "Mining engineer", M, 1, ["travel"]),
 ("pilot",      "53-2011.00", None, "53-2011", "✈️", "Ұшқыш", "Пилот", "Airline pilot", M, 1, ["travel", "night"]),
 ("agro",       "19-1013.00", None, "19-1013", "🌾", "Агроном", "Агроном", "Agronomist", FL, 1, []),
 ("vet",        "29-1131.00", None, "29-1131", "🐾", "Ветеринар", "Ветеринар", "Veterinarian", B, 0, ["longstudy"]),
 ("chef",       "35-1011.00", None, "35-1011", "👨‍🍳", "Аспаз-шеф", "Шеф-повар", "Chef", CR, 1, ["night"]),
 ("geologist",  "19-2042.00", None, "19-2042", "🪨", "Геолог", "Геолог", "Geoscientist", G, 1, ["travel"]),
 ("architect",  "17-1011.00", None, "17-1011", "🏛️", "Сәулетші", "Архитектор", "Architect", CR, 1, ["longstudy"]),
 # ---- I: зерттеуші
 ("backend",    "15-1252.00", None, "15-1132", "💻", "Бағдарламашы", "Программист", "Software developer", F, 0, []),
 ("ml",         "15-2051.00", "15-2041.00", "15-1111", "🤖", "Деректер ғалымы (ЖИ)", "Data Scientist (ИИ)", "Data scientist", F, 0, []),
 ("cyber",      "15-1212.00", None, "15-1179", "🛡️", "Киберқауіпсіздік маманы", "Специалист по кибербезопасности", "Security analyst", F, 0, []),
 ("doctor",     "29-1215.00", None, "29-1060", "🩺", "Дәрігер", "Врач", "Physician", B, 0, ["night", "longstudy"]),
 ("dentist",    "29-1021.00", None, "29-1021", "🦷", "Стоматолог", "Стоматолог", "Dentist", B, 0, ["longstudy"]),
 ("pharmacist", "29-1051.00", None, "29-1051", "💊", "Фармацевт", "Фармацевт", "Pharmacist", B, 0, ["longstudy"]),
 ("biochem",    "19-1021.00", None, "19-1021", "🧬", "Биотехнолог", "Биотехнолог", "Biochemist", B, 1, []),
 ("chemist",    "19-2031.00", None, "19-2031", "⚗️", "Химик", "Химик", "Chemist", CH, 1, []),
 ("ecologist",  "19-2041.00", None, "19-2041", "🌿", "Эколог", "Эколог", "Environmental scientist", FL, 1, []),
 ("economist",  "19-3011.00", None, "19-3011", "📈", "Экономист", "Экономист", "Economist", G, 0, []),
 # ---- A: шығармашыл
 ("designer",   "15-1255.00", "15-1254.00", "15-1179", "🎨", "UI/UX дизайнер", "UI/UX дизайнер", "UI/UX designer", CR, 1, []),
 ("gamedev",    "15-1255.01", None, "27-1014", "🎮", "Ойын әзірлеуші", "Разработчик игр", "Game designer", F, 1, []),
 ("graphic",    "27-1024.00", None, "27-1024", "🖌️", "Графикалық дизайнер", "Графический дизайнер", "Graphic designer", CR, 0, []),
 ("interior",   "27-1025.00", None, "27-1025", "🛋️", "Интерьер дизайнері", "Дизайнер интерьера", "Interior designer", CR, 0, []),
 ("journalist", "27-3023.00", None, "27-3022", "📰", "Журналист", "Журналист", "Journalist", CR, 0, []),
 ("director",   "27-2012.00", None, "27-2012", "🎬", "Режиссер / продюсер", "Режиссёр / продюсер", "Producer / director", CR, 0, []),
 ("translator", "27-3091.00", None, "27-3091", "🌐", "Аудармашы", "Переводчик", "Translator", I, 0, []),
 # ---- S: қамқоршы
 ("teacher",    "25-2031.00", None, "25-2031", "👩‍🏫", "Мектеп мұғалімі", "Учитель (старшие классы)", "Secondary teacher", TV, 0, ["children"]),
 ("primary",    "25-2021.00", None, "25-2021", "🧒", "Бастауыш сынып мұғалімі", "Учитель начальных классов", "Primary teacher", TV, 1, ["children"]),
 ("psych",      "19-3033.00", None, "19-3031", "🧠", "Психолог", "Психолог", "Psychologist", FL, 0, []),
 ("nurse",      "29-1141.00", None, "29-1111", "💉", "Медбике", "Медсестра / медбрат", "Registered nurse", B, 0, ["night"]),
 ("social",     "21-1021.00", None, "21-1021", "🤝", "Әлеуметтік қызметкер", "Социальный работник", "Social worker", FL, 1, ["children"]),
 ("coach",      "27-2022.00", None, "27-2022", "🏅", "Спорт жаттықтырушысы", "Спортивный тренер", "Coach", CR, 1, ["children"]),
 ("speech",     "29-1127.00", None, "29-1127", "🗣️", "Логопед", "Логопед", "Speech therapist", FL, 1, ["children"]),
 ("physio",     "29-1123.00", None, "29-1123", "🦵", "Физиотерапевт", "Физиотерапевт", "Physical therapist", B, 1, []),
 # ---- E: көшбасшы
 ("lawyer",     "23-1011.00", None, "23-1011", "⚖️", "Заңгер", "Юрист", "Lawyer", H, 0, []),
 ("marketing",  "11-2021.00", None, "11-2021", "📣", "Маркетинг менеджері", "Маркетолог", "Marketing manager", G, 1, ["sales"]),
 ("market_an",  "13-1161.00", None, "13-1161", "🔍", "Нарық талдаушысы", "Маркетинговый аналитик", "Market research analyst", G, 1, []),
 ("pm",         "13-1082.00", "13-1111.00", "13-1199", "📋", "Жоба менеджері", "Менеджер проектов", "Project manager", G, 1, []),
 ("hr",         "13-1071.00", None, "13-1078", "👥", "HR маманы", "HR-специалист", "HR specialist", G, 1, []),
 ("sales",      "41-4012.00", None, "41-4012", "🤝", "Сату менеджері", "Менеджер по продажам", "Sales representative", G, 1, ["sales"]),
 ("finance",    "13-2051.00", "13-2031.00", "13-2051", "💹", "Қаржы талдаушысы", "Финансовый аналитик", "Financial analyst", G, 0, []),
 ("hotel",      "11-9081.00", None, "11-9081", "🏨", "Қонақ үй менеджері", "Менеджер гостиницы", "Lodging manager", G, 1, ["night"]),
 ("manager",    "11-1021.00", None, "11-1021", "🏢", "Компания басшысы", "Руководитель компании", "Operations manager", G, 1, []),
 # ---- C: ұйымдастырушы
 ("logist",     "13-1081.00", None, "13-1081", "🚚", "Логист", "Логист", "Logistician", G, 0, []),
 ("accountant", "13-2011.00", None, "13-2011", "🧾", "Бухгалтер", "Бухгалтер", "Accountant", G, 0, []),
 ("banker",     "13-2072.00", None, "13-2072", "🏦", "Банк несие маманы", "Кредитный специалист", "Loan officer", G, 1, ["sales"]),
]
HH = {  # hh.kz медианасы, ₸/ай, n — вакансия саны (2026-09)
 "civil": (575000, 18), "backend": (750000, 17), "ml": (1000000, 7), "designer": (400000, 58),
 "lawyer": (500000, 37), "logist": (462500, 40), "accountant": (450000, 49), "economist": (432500, 28),
 "doctor": (425000, 39), "nurse": (300000, 41), "teacher": (325000, 41), "psych": (300000, 37), "agro": (550000, 13)}

ABILITY = {   # біз өлшейтін домен → O*NET элементтері
 "verbal":   ["Oral Comprehension", "Written Comprehension"],
 "logic":    ["Deductive Reasoning", "Inductive Reasoning"],
 "numeric":  ["Mathematical Reasoning", "Number Facility"],
 "spatial":  ["Spatial Orientation", "Visualization"],
 "clerical": ["Perceptual Speed"],
}
CONTEXT = {   # бас тарту фильтрі үшін (CX, 1–5) → шек
 "disease":  ("Exposed to Disease or Infections", 3.5),
 "outdoors": ("Outdoors, Exposed to All Weather Conditions", 3.0),
 "sitting":  ("Spend Time Sitting", 4.0),
 "public":   ("Public Speaking", 3.5),
 "customers":("Deal With External Customers or the Public in General", 4.0),
 "conflict": ("Conflict Situations", 3.5),
 "hazard":   ("Exposed to Hazardous Conditions", 3.0),
}

def table(name, key="O*NET-SOC Code"):
    return list(csv.DictReader(open(RAW / name, encoding="utf-8", errors="ignore"), delimiter="\t"))

inter = defaultdict(dict)
for r in table("Interests.txt"):
    if r["Scale ID"] == "OI" and r["Element Name"] in ("Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"):
        inter[r["O*NET-SOC Code"]][r["Element Name"][0]] = float(r["Data Value"])

def by_scale(rows, scale):
    d = defaultdict(dict)
    for r in rows:
        if r["Scale ID"] == scale: d[r["O*NET-SOC Code"]][r["Element Name"]] = float(r["Data Value"])
    return d
ab_rows = table("Abilities.txt"); ab_lv, ab_im = by_scale(ab_rows, "LV"), by_scale(ab_rows, "IM")
kn_rows = table("Knowledge.txt"); kn_lv, kn_im = by_scale(kn_rows, "LV"), by_scale(kn_rows, "IM")
ctx = by_scale(table("WorkContext.txt"), "CX")
wa = by_scale(table("WorkActivities.txt"), "IM")
jz = {r["O*NET-SOC Code"]: int(r["Job Zone"]) for r in table("JobZones.txt")}
elo = {r["O*NET-SOC Code"]: float(r["human_rating_beta"]) for r in csv.DictReader(open(RAW / "occ_level.csv"))}
fo = json.load(open(RAW / "FO.json"))

# Жұмыс түрлерінің ерекшелігі: барлық кәсіптер бойынша z-баға
wa_stats = {}
for name in {n for d in wa.values() for n in d}:
    vals = [d[name] for d in wa.values() if name in d]
    wa_stats[name] = (st.mean(vals), st.pstdev(vals) or 1)

out = []
for (pid, soc, ab_soc, fo_soc, emoji, kk, ru, en, ent, verify, tags) in P:
    a_soc = ab_soc or soc
    riasec = [round((inter[soc][t] - 1) / 6, 3) for t in "RIASEC"]
    ability = {}
    for dom, els in ABILITY.items():
        lv = st.mean(ab_lv[a_soc][e] for e in els) / 7
        im = st.mean(ab_im[a_soc][e] for e in els) / 5
        ability[dom] = {"lv": round(lv, 3), "im": round(im, 3)}
    ability["mechanical"] = {"lv": round(kn_lv[a_soc]["Mechanical"] / 7, 3), "im": round(kn_im[a_soc]["Mechanical"] / 5, 3)}

    c = ctx.get(a_soc, {})
    ctx_tags = [k for k, (name, thr) in CONTEXT.items() if c.get(name, 0) >= thr]
    if ability["numeric"]["lv"] >= 0.55: ctx_tags.append("math")
    # «Ұзақ оқу» — ҚР нормасы бойынша (Job Zone АҚШ-тың магистратура талабын көрсетеді):
    # медицина 6 жыл + резидентура, стоматология / фармация / ветеринария / сәулет — 5 жыл
    if wa.get(a_soc, {}).get("Selling or Influencing Others", 0) >= 3.8: ctx_tags.append("sales")
    tags_all = sorted(set(ctx_tags + tags))

    acts = wa.get(a_soc, {})
    distinct = sorted(acts, key=lambda n: -(acts[n] - wa_stats[n][0]) / wa_stats[n][1])[:4]

    fo_p = fo.get(fo_soc)
    beta = elo.get(soc)
    risk = None if fo_p is None or beta is None else 0.5 * fo_p + 0.5 * beta
    sal = HH.get(pid)
    out.append({
        "id": pid, "soc": soc, "abilitySoc": a_soc, "emoji": emoji,
        "name": {"kk": kk, "ru": ru, "en": en},
        "riasec": riasec, "ability": ability, "jobZone": jz.get(soc),
        "tags": tags_all, "context": {k: round(c.get(n, 0), 2) for k, (n, _) in CONTEXT.items()},
        "activities": distinct,
        "future": {"automation": fo_p, "llm": None if beta is None else round(beta, 3),
                   "risk": None if risk is None else round(risk, 3)},
        "ent": {"kk": ent, "ru": RU[ent], "verify": bool(verify)},
        "salary": sal[0] if sal else None, "n": sal[1] if sal else None,
    })

missing = [p["id"] for p in out if p["future"]["risk"] is None]
assert not missing, f"future data missing: {missing}"
src = ("/* АВТОМАТТЫ ТҮРДЕ ҚҰРАСТЫРЫЛҒАН — research/build_professions.py.\n"
       "   Қолмен өзгертпеңіз: дереккөз деректерін өзгертіп, скриптті қайта іске қосыңыз.\n"
       "   O*NET 30.0 (CC BY 4.0) · Frey & Osborne (2013) · Eloundou et al. (2023, MIT) · hh.kz (2026-09) */\n"
       f"export const CAREERS = {json.dumps(out, ensure_ascii=False, indent=1)};\n")
OUT.write_text(src, encoding="utf-8")
print(f"{len(out)} мамандық → {OUT.relative_to(OUT.parents[2])}")
for p in out:
    print(f"{p['id']:11s} RIASEC={''.join(t for t,v in sorted(zip('RIASEC',p['riasec']),key=lambda x:-x[1])[:3])} "
          f"JZ={p['jobZone']} risk={p['future']['risk']:.2f} (FO {p['future']['automation']}, LLM {p['future']['llm']}) tags={','.join(p['tags'])}")
