/* АВТОМАТТЫ ТҮРДЕ ҚҰРАСТЫРЫЛҒАН — research/build_professions.py.
   Қолмен өзгертпеңіз: дереккөз деректерін өзгертіп, скриптті қайта іске қосыңыз.
   O*NET 30.0 (CC BY 4.0) · Frey & Osborne (2013) · Eloundou et al. (2023, MIT) · hh.kz (2026-09) */
export const CAREERS = [
 {
  "id": "civil",
  "soc": "17-2051.00",
  "abilitySoc": "17-2051.00",
  "emoji": "🏗️",
  "name": {
   "kk": "Инженер-құрылысшы",
   "ru": "Инженер-строитель",
   "en": "Civil engineer"
  },
  "riasec": [
   0.893,
   0.685,
   0.192,
   0.132,
   0.317,
   0.605
  ],
  "ability": {
   "verbal": {
    "lv": 0.714,
    "im": 0.8
   },
   "logic": {
    "lv": 0.634,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.625,
    "im": 0.763
   },
   "spatial": {
    "lv": 0.401,
    "im": 0.563
   },
   "clerical": {
    "lv": 0.536,
    "im": 0.724
   },
   "mechanical": {
    "lv": 0.407,
    "im": 0.504
   }
  },
  "jobZone": 4,
  "tags": [
   "math",
   "sitting"
  ],
  "context": {
   "disease": 1.14,
   "outdoors": 2.81,
   "sitting": 4.14,
   "public": 2.33,
   "customers": 3.57,
   "conflict": 2.9,
   "hazard": 1.48
  },
  "activities": [
   "Drafting, Laying Out, and Specifying Technical Devices, Parts, and Equipment",
   "Coordinating the Work and Activities of Others",
   "Staffing Organizational Units",
   "Scheduling Work and Activities"
  ],
  "future": {
   "automation": 0.019,
   "llm": 0.375,
   "risk": 0.197
  },
  "ent": {
   "kk": "Математика + Физика",
   "ru": "Математика + Физика",
   "verify": false
  },
  "salary": 575000,
  "n": 18
 },
 {
  "id": "electrical",
  "soc": "17-2071.00",
  "abilitySoc": "17-2071.00",
  "emoji": "⚡",
  "name": {
   "kk": "Электр инженері",
   "ru": "Инженер-электрик",
   "en": "Electrical engineer"
  },
  "riasec": [
   0.892,
   0.718,
   0.168,
   0.095,
   0.218,
   0.668
  ],
  "ability": {
   "verbal": {
    "lv": 0.661,
    "im": 0.812
   },
   "logic": {
    "lv": 0.598,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.562,
    "im": 0.688
   },
   "spatial": {
    "lv": 0.259,
    "im": 0.424
   },
   "clerical": {
    "lv": 0.446,
    "im": 0.624
   },
   "mechanical": {
    "lv": 0.537,
    "im": 0.638
   }
  },
  "jobZone": 4,
  "tags": [
   "math",
   "sitting"
  ],
  "context": {
   "disease": 1.0,
   "outdoors": 2.21,
   "sitting": 4.06,
   "public": 2.26,
   "customers": 3.1,
   "conflict": 3.23,
   "hazard": 2.24
  },
  "activities": [
   "Drafting, Laying Out, and Specifying Technical Devices, Parts, and Equipment",
   "Scheduling Work and Activities",
   "Making Decisions and Solving Problems",
   "Working with Computers"
  ],
  "future": {
   "automation": 0.1,
   "llm": 0.406,
   "risk": 0.253
  },
  "ent": {
   "kk": "Математика + Физика",
   "ru": "Математика + Физика",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "mechanical",
  "soc": "17-2141.00",
  "abilitySoc": "17-2141.00",
  "emoji": "⚙️",
  "name": {
   "kk": "Механик-инженер",
   "ru": "Инженер-механик",
   "en": "Mechanical engineer"
  },
  "riasec": [
   0.933,
   0.717,
   0.2,
   0.017,
   0.127,
   0.608
  ],
  "ability": {
   "verbal": {
    "lv": 0.679,
    "im": 0.8
   },
   "logic": {
    "lv": 0.643,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.616,
    "im": 0.75
   },
   "spatial": {
    "lv": 0.313,
    "im": 0.5
   },
   "clerical": {
    "lv": 0.464,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.736,
    "im": 0.846
   }
  },
  "jobZone": 4,
  "tags": [
   "math"
  ],
  "context": {
   "disease": 1.39,
   "outdoors": 1.96,
   "sitting": 3.81,
   "public": 2.92,
   "customers": 3.16,
   "conflict": 2.79,
   "hazard": 1.75
  },
  "activities": [
   "Drafting, Laying Out, and Specifying Technical Devices, Parts, and Equipment",
   "Thinking Creatively",
   "Evaluating Information to Determine Compliance with Standards",
   "Making Decisions and Solving Problems"
  ],
  "future": {
   "automation": 0.011,
   "llm": 0.372,
   "risk": 0.192
  },
  "ent": {
   "kk": "Математика + Физика",
   "ru": "Математика + Физика",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "petroleum",
  "soc": "17-2171.00",
  "abilitySoc": "17-2171.00",
  "emoji": "🛢️",
  "name": {
   "kk": "Мұнай-газ инженері",
   "ru": "Инженер нефти и газа",
   "en": "Petroleum engineer"
  },
  "riasec": [
   0.742,
   0.708,
   0.152,
   0.133,
   0.317,
   0.568
  ],
  "ability": {
   "verbal": {
    "lv": 0.624,
    "im": 0.8
   },
   "logic": {
    "lv": 0.571,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.509,
    "im": 0.637
   },
   "spatial": {
    "lv": 0.241,
    "im": 0.437
   },
   "clerical": {
    "lv": 0.429,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.47,
    "im": 0.562
   }
  },
  "jobZone": 4,
  "tags": [
   "sitting",
   "travel"
  ],
  "context": {
   "disease": 1.01,
   "outdoors": 2.21,
   "sitting": 4.22,
   "public": 2.52,
   "customers": 3.21,
   "conflict": 2.83,
   "hazard": 1.95
  },
  "activities": [
   "Developing Objectives and Strategies",
   "Analyzing Data or Information",
   "Monitoring and Controlling Resources",
   "Estimating the Quantifiable Characteristics of Products, Events, or Information"
  ],
  "future": {
   "automation": 0.16,
   "llm": 0.431,
   "risk": 0.295
  },
  "ent": {
   "kk": "Математика + Физика",
   "ru": "Математика + Физика",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "mining",
  "soc": "17-2151.00",
  "abilitySoc": "17-2151.00",
  "emoji": "⛏️",
  "name": {
   "kk": "Тау-кен инженері",
   "ru": "Горный инженер",
   "en": "Mining engineer"
  },
  "riasec": [
   0.845,
   0.767,
   0.088,
   0.142,
   0.292,
   0.605
  ],
  "ability": {
   "verbal": {
    "lv": 0.706,
    "im": 0.8
   },
   "logic": {
    "lv": 0.679,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.581,
    "im": 0.726
   },
   "spatial": {
    "lv": 0.393,
    "im": 0.526
   },
   "clerical": {
    "lv": 0.464,
    "im": 0.624
   },
   "mechanical": {
    "lv": 0.384,
    "im": 0.476
   }
  },
  "jobZone": 4,
  "tags": [
   "math",
   "travel"
  ],
  "context": {
   "disease": 1.26,
   "outdoors": 2.87,
   "sitting": 3.71,
   "public": 2.12,
   "customers": 2.63,
   "conflict": 2.7,
   "hazard": 2.19
  },
  "activities": [
   "Providing Consultation and Advice to Others",
   "Making Decisions and Solving Problems",
   "Coordinating the Work and Activities of Others",
   "Drafting, Laying Out, and Specifying Technical Devices, Parts, and Equipment"
  ],
  "future": {
   "automation": 0.14,
   "llm": 0.5,
   "risk": 0.32
  },
  "ent": {
   "kk": "Математика + Физика",
   "ru": "Математика + Физика",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "pilot",
  "soc": "53-2011.00",
  "abilitySoc": "53-2011.00",
  "emoji": "✈️",
  "name": {
   "kk": "Ұшқыш",
   "ru": "Пилот",
   "en": "Airline pilot"
  },
  "riasec": [
   0.623,
   0.362,
   0.072,
   0.248,
   0.465,
   0.615
  ],
  "ability": {
   "verbal": {
    "lv": 0.634,
    "im": 0.8
   },
   "logic": {
    "lv": 0.616,
    "im": 0.812
   },
   "numeric": {
    "lv": 0.481,
    "im": 0.637
   },
   "spatial": {
    "lv": 0.616,
    "im": 0.738
   },
   "clerical": {
    "lv": 0.607,
    "im": 0.824
   },
   "mechanical": {
    "lv": 0.569,
    "im": 0.74
   }
  },
  "jobZone": 4,
  "tags": [
   "night",
   "outdoors",
   "public",
   "sitting",
   "travel"
  ],
  "context": {
   "disease": 2.05,
   "outdoors": 3.42,
   "sitting": 4.74,
   "public": 3.73,
   "customers": 3.34,
   "conflict": 3.47,
   "hazard": 2.78
  },
  "activities": [
   "Identifying Objects, Actions, and Events",
   "Operating Vehicles, Mechanized Devices, or Equipment",
   "Monitoring Processes, Materials, or Surroundings",
   "Evaluating Information to Determine Compliance with Standards"
  ],
  "future": {
   "automation": 0.18,
   "llm": 0.227,
   "risk": 0.204
  },
  "ent": {
   "kk": "Математика + Физика",
   "ru": "Математика + Физика",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "agro",
  "soc": "19-1013.00",
  "abilitySoc": "19-1013.00",
  "emoji": "🌾",
  "name": {
   "kk": "Агроном",
   "ru": "Агроном",
   "en": "Agronomist"
  },
  "riasec": [
   0.905,
   0.953,
   0.185,
   0.113,
   0.12,
   0.402
  ],
  "ability": {
   "verbal": {
    "lv": 0.731,
    "im": 0.8
   },
   "logic": {
    "lv": 0.706,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.481,
    "im": 0.624
   },
   "spatial": {
    "lv": 0.286,
    "im": 0.463
   },
   "clerical": {
    "lv": 0.429,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.517,
    "im": 0.562
   }
  },
  "jobZone": 5,
  "tags": [
   "outdoors"
  ],
  "context": {
   "disease": 1.14,
   "outdoors": 3.9,
   "sitting": 2.9,
   "public": 2.76,
   "customers": 3.38,
   "conflict": 2.5,
   "hazard": 2.43
  },
  "activities": [
   "Estimating the Quantifiable Characteristics of Products, Events, or Information",
   "Analyzing Data or Information",
   "Developing Objectives and Strategies",
   "Providing Consultation and Advice to Others"
  ],
  "future": {
   "automation": 0.021,
   "llm": 0.63,
   "risk": 0.326
  },
  "ent": {
   "kk": "Биология + География",
   "ru": "Биология + География",
   "verify": true
  },
  "salary": 550000,
  "n": 13
 },
 {
  "id": "vet",
  "soc": "29-1131.00",
  "abilitySoc": "29-1131.00",
  "emoji": "🐾",
  "name": {
   "kk": "Ветеринар",
   "ru": "Ветеринар",
   "en": "Veterinarian"
  },
  "riasec": [
   0.828,
   0.823,
   0.0,
   0.405,
   0.118,
   0.42
  ],
  "ability": {
   "verbal": {
    "lv": 0.626,
    "im": 0.824
   },
   "logic": {
    "lv": 0.652,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.446,
    "im": 0.612
   },
   "spatial": {
    "lv": 0.223,
    "im": 0.4
   },
   "clerical": {
    "lv": 0.34,
    "im": 0.55
   },
   "mechanical": {
    "lv": 0.284,
    "im": 0.4
   }
  },
  "jobZone": 5,
  "tags": [
   "conflict",
   "customers",
   "disease",
   "hazard",
   "longstudy"
  ],
  "context": {
   "disease": 4.21,
   "outdoors": 1.55,
   "sitting": 2.3,
   "public": 2.29,
   "customers": 4.65,
   "conflict": 3.59,
   "hazard": 3.15
  },
  "activities": [
   "Making Decisions and Solving Problems",
   "Identifying Objects, Actions, and Events",
   "Performing for or Working Directly with the Public",
   "Selling or Influencing Others"
  ],
  "future": {
   "automation": 0.038,
   "llm": 0.23,
   "risk": 0.134
  },
  "ent": {
   "kk": "Биология + Химия",
   "ru": "Биология + Химия",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "chef",
  "soc": "35-1011.00",
  "abilitySoc": "35-1011.00",
  "emoji": "👨‍🍳",
  "name": {
   "kk": "Аспаз-шеф",
   "ru": "Шеф-повар",
   "en": "Chef"
  },
  "riasec": [
   0.645,
   0.102,
   0.288,
   0.325,
   0.693,
   0.572
  ],
  "ability": {
   "verbal": {
    "lv": 0.518,
    "im": 0.75
   },
   "logic": {
    "lv": 0.536,
    "im": 0.763
   },
   "numeric": {
    "lv": 0.429,
    "im": 0.612
   },
   "spatial": {
    "lv": 0.276,
    "im": 0.5
   },
   "clerical": {
    "lv": 0.464,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.374,
    "im": 0.476
   }
  },
  "jobZone": 3,
  "tags": [
   "conflict",
   "hazard",
   "night"
  ],
  "context": {
   "disease": 2.17,
   "outdoors": 1.96,
   "sitting": 1.71,
   "public": 3.21,
   "customers": 3.79,
   "conflict": 3.75,
   "hazard": 3.33
  },
  "activities": [
   "Staffing Organizational Units",
   "Monitoring and Controlling Resources",
   "Coordinating the Work and Activities of Others",
   "Developing and Building Teams"
  ],
  "future": {
   "automation": 0.1,
   "llm": 0.262,
   "risk": 0.181
  },
  "ent": {
   "kk": "Шығармашылық емтихан",
   "ru": "Творческий экзамен",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "geologist",
  "soc": "19-2042.00",
  "abilitySoc": "19-2042.00",
  "emoji": "🪨",
  "name": {
   "kk": "Геолог",
   "ru": "Геолог",
   "en": "Geoscientist"
  },
  "riasec": [
   0.777,
   1.0,
   0.283,
   0.205,
   0.112,
   0.527
  ],
  "ability": {
   "verbal": {
    "lv": 0.723,
    "im": 0.812
   },
   "logic": {
    "lv": 0.634,
    "im": 0.812
   },
   "numeric": {
    "lv": 0.554,
    "im": 0.7
   },
   "spatial": {
    "lv": 0.321,
    "im": 0.5
   },
   "clerical": {
    "lv": 0.429,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.366,
    "im": 0.438
   }
  },
  "jobZone": 5,
  "tags": [
   "math",
   "outdoors",
   "travel"
  ],
  "context": {
   "disease": 1.16,
   "outdoors": 3.03,
   "sitting": 3.56,
   "public": 2.91,
   "customers": 2.91,
   "conflict": 2.38,
   "hazard": 2.0
  },
  "activities": [
   "Analyzing Data or Information",
   "Thinking Creatively",
   "Identifying Objects, Actions, and Events",
   "Getting Information"
  ],
  "future": {
   "automation": 0.63,
   "llm": 0.478,
   "risk": 0.554
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "architect",
  "soc": "17-1011.00",
  "abilitySoc": "17-1011.00",
  "emoji": "🏛️",
  "name": {
   "kk": "Сәулетші",
   "ru": "Архитектор",
   "en": "Architect"
  },
  "riasec": [
   0.702,
   0.53,
   0.592,
   0.252,
   0.408,
   0.52
  ],
  "ability": {
   "verbal": {
    "lv": 0.661,
    "im": 0.8
   },
   "logic": {
    "lv": 0.651,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.571,
    "im": 0.663
   },
   "spatial": {
    "lv": 0.464,
    "im": 0.637
   },
   "clerical": {
    "lv": 0.446,
    "im": 0.65
   },
   "mechanical": {
    "lv": 0.486,
    "im": 0.676
   }
  },
  "jobZone": 5,
  "tags": [
   "longstudy",
   "math",
   "sitting"
  ],
  "context": {
   "disease": 1.05,
   "outdoors": 2.65,
   "sitting": 4.4,
   "public": 2.71,
   "customers": 3.62,
   "conflict": 2.95,
   "hazard": 1.35
  },
  "activities": [
   "Drafting, Laying Out, and Specifying Technical Devices, Parts, and Equipment",
   "Thinking Creatively",
   "Scheduling Work and Activities",
   "Coordinating the Work and Activities of Others"
  ],
  "future": {
   "automation": 0.018,
   "llm": 0.43,
   "risk": 0.224
  },
  "ent": {
   "kk": "Шығармашылық емтихан",
   "ru": "Творческий экзамен",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "backend",
  "soc": "15-1252.00",
  "abilitySoc": "15-1252.00",
  "emoji": "💻",
  "name": {
   "kk": "Бағдарламашы",
   "ru": "Программист",
   "en": "Software developer"
  },
  "riasec": [
   0.488,
   0.81,
   0.21,
   0.147,
   0.145,
   0.743
  ],
  "ability": {
   "verbal": {
    "lv": 0.607,
    "im": 0.75
   },
   "logic": {
    "lv": 0.563,
    "im": 0.725
   },
   "numeric": {
    "lv": 0.438,
    "im": 0.538
   },
   "spatial": {
    "lv": 0.17,
    "im": 0.338
   },
   "clerical": {
    "lv": 0.393,
    "im": 0.524
   },
   "mechanical": {
    "lv": 0.097,
    "im": 0.282
   }
  },
  "jobZone": 4,
  "tags": [
   "sitting"
  ],
  "context": {
   "disease": 1.02,
   "outdoors": 1.01,
   "sitting": 4.95,
   "public": 1.62,
   "customers": 1.93,
   "conflict": 1.72,
   "hazard": 1.01
  },
  "activities": [
   "Thinking Creatively",
   "Processing Information",
   "Developing Objectives and Strategies",
   "Analyzing Data or Information"
  ],
  "future": {
   "automation": 0.042,
   "llm": 0.447,
   "risk": 0.245
  },
  "ent": {
   "kk": "Математика + Информатика",
   "ru": "Математика + Информатика",
   "verify": false
  },
  "salary": 750000,
  "n": 17
 },
 {
  "id": "ml",
  "soc": "15-2051.00",
  "abilitySoc": "15-2041.00",
  "emoji": "🤖",
  "name": {
   "kk": "Деректер ғалымы (ЖИ)",
   "ru": "Data Scientist (ИИ)",
   "en": "Data scientist"
  },
  "riasec": [
   0.193,
   0.998,
   0.265,
   0.11,
   0.118,
   0.733
  ],
  "ability": {
   "verbal": {
    "lv": 0.688,
    "im": 0.812
   },
   "logic": {
    "lv": 0.697,
    "im": 0.788
   },
   "numeric": {
    "lv": 0.723,
    "im": 0.913
   },
   "spatial": {
    "lv": 0.196,
    "im": 0.362
   },
   "clerical": {
    "lv": 0.411,
    "im": 0.576
   },
   "mechanical": {
    "lv": 0.096,
    "im": 0.258
   }
  },
  "jobZone": 4,
  "tags": [
   "math",
   "sitting"
  ],
  "context": {
   "disease": 1.1,
   "outdoors": 1.1,
   "sitting": 4.71,
   "public": 2.81,
   "customers": 2.24,
   "conflict": 2.48,
   "hazard": 1.0
  },
  "activities": [
   "Interpreting the Meaning of Information for Others",
   "Analyzing Data or Information",
   "Processing Information",
   "Providing Consultation and Advice to Others"
  ],
  "future": {
   "automation": 0.015,
   "llm": 0.594,
   "risk": 0.304
  },
  "ent": {
   "kk": "Математика + Информатика",
   "ru": "Математика + Информатика",
   "verify": false
  },
  "salary": 1000000,
  "n": 7
 },
 {
  "id": "cyber",
  "soc": "15-1212.00",
  "abilitySoc": "15-1212.00",
  "emoji": "🛡️",
  "name": {
   "kk": "Киберқауіпсіздік маманы",
   "ru": "Специалист по кибербезопасности",
   "en": "Security analyst"
  },
  "riasec": [
   0.435,
   0.738,
   0.053,
   0.172,
   0.303,
   0.86
  ],
  "ability": {
   "verbal": {
    "lv": 0.598,
    "im": 0.8
   },
   "logic": {
    "lv": 0.589,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.402,
    "im": 0.5
   },
   "spatial": {
    "lv": 0.214,
    "im": 0.375
   },
   "clerical": {
    "lv": 0.429,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.191,
    "im": 0.336
   }
  },
  "jobZone": 4,
  "tags": [
   "sitting"
  ],
  "context": {
   "disease": 1.03,
   "outdoors": 1.52,
   "sitting": 4.23,
   "public": 2.08,
   "customers": 2.87,
   "conflict": 2.92,
   "hazard": 1.3
  },
  "activities": [
   "Working with Computers",
   "Identifying Objects, Actions, and Events",
   "Evaluating Information to Determine Compliance with Standards",
   "Analyzing Data or Information"
  ],
  "future": {
   "automation": 0.21,
   "llm": 0.543,
   "risk": 0.377
  },
  "ent": {
   "kk": "Математика + Информатика",
   "ru": "Математика + Информатика",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "doctor",
  "soc": "29-1215.00",
  "abilitySoc": "29-1215.00",
  "emoji": "🩺",
  "name": {
   "kk": "Дәрігер",
   "ru": "Врач",
   "en": "Physician"
  },
  "riasec": [
   0.458,
   0.847,
   0.075,
   0.868,
   0.223,
   0.492
  ],
  "ability": {
   "verbal": {
    "lv": 0.714,
    "im": 0.913
   },
   "logic": {
    "lv": 0.669,
    "im": 0.837
   },
   "numeric": {
    "lv": 0.393,
    "im": 0.563
   },
   "spatial": {
    "lv": 0.17,
    "im": 0.35
   },
   "clerical": {
    "lv": 0.429,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.041,
    "im": 0.23
   }
  },
  "jobZone": 5,
  "tags": [
   "conflict",
   "customers",
   "disease",
   "longstudy",
   "night"
  ],
  "context": {
   "disease": 4.78,
   "outdoors": 1.0,
   "sitting": 3.05,
   "public": 1.26,
   "customers": 4.6,
   "conflict": 3.57,
   "hazard": 1.96
  },
  "activities": [
   "Assisting and Caring for Others",
   "Updating and Using Relevant Knowledge",
   "Documenting/Recording Information",
   "Interpreting the Meaning of Information for Others"
  ],
  "future": {
   "automation": 0.0042,
   "llm": 0.375,
   "risk": 0.19
  },
  "ent": {
   "kk": "Биология + Химия",
   "ru": "Биология + Химия",
   "verify": false
  },
  "salary": 425000,
  "n": 39
 },
 {
  "id": "dentist",
  "soc": "29-1021.00",
  "abilitySoc": "29-1021.00",
  "emoji": "🦷",
  "name": {
   "kk": "Стоматолог",
   "ru": "Стоматолог",
   "en": "Dentist"
  },
  "riasec": [
   0.718,
   0.733,
   0.025,
   0.545,
   0.158,
   0.475
  ],
  "ability": {
   "verbal": {
    "lv": 0.661,
    "im": 0.8
   },
   "logic": {
    "lv": 0.724,
    "im": 0.824
   },
   "numeric": {
    "lv": 0.437,
    "im": 0.6
   },
   "spatial": {
    "lv": 0.375,
    "im": 0.513
   },
   "clerical": {
    "lv": 0.446,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.476,
    "im": 0.556
   }
  },
  "jobZone": 5,
  "tags": [
   "conflict",
   "customers",
   "disease",
   "longstudy",
   "sitting"
  ],
  "context": {
   "disease": 4.78,
   "outdoors": 1.07,
   "sitting": 4.26,
   "public": 1.92,
   "customers": 4.48,
   "conflict": 3.53,
   "hazard": 2.57
  },
  "activities": [
   "Staffing Organizational Units",
   "Guiding, Directing, and Motivating Subordinates",
   "Assisting and Caring for Others",
   "Performing for or Working Directly with the Public"
  ],
  "future": {
   "automation": 0.0044,
   "llm": 0.225,
   "risk": 0.115
  },
  "ent": {
   "kk": "Биология + Химия",
   "ru": "Биология + Химия",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "pharmacist",
  "soc": "29-1051.00",
  "abilitySoc": "29-1051.00",
  "emoji": "💊",
  "name": {
   "kk": "Фармацевт",
   "ru": "Фармацевт",
   "en": "Pharmacist"
  },
  "riasec": [
   0.313,
   0.775,
   0.08,
   0.635,
   0.255,
   0.613
  ],
  "ability": {
   "verbal": {
    "lv": 0.706,
    "im": 0.824
   },
   "logic": {
    "lv": 0.598,
    "im": 0.776
   },
   "numeric": {
    "lv": 0.5,
    "im": 0.65
   },
   "spatial": {
    "lv": 0.179,
    "im": 0.325
   },
   "clerical": {
    "lv": 0.446,
    "im": 0.624
   },
   "mechanical": {
    "lv": 0.059,
    "im": 0.256
   }
  },
  "jobZone": 5,
  "tags": [
   "conflict",
   "customers",
   "disease",
   "longstudy"
  ],
  "context": {
   "disease": 4.44,
   "outdoors": 1.03,
   "sitting": 1.78,
   "public": 1.28,
   "customers": 4.68,
   "conflict": 3.52,
   "hazard": 1.69
  },
  "activities": [
   "Evaluating Information to Determine Compliance with Standards",
   "Documenting/Recording Information",
   "Updating and Using Relevant Knowledge",
   "Assisting and Caring for Others"
  ],
  "future": {
   "automation": 0.012,
   "llm": 0.4,
   "risk": 0.206
  },
  "ent": {
   "kk": "Биология + Химия",
   "ru": "Биология + Химия",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "biochem",
  "soc": "19-1021.00",
  "abilitySoc": "19-1021.00",
  "emoji": "🧬",
  "name": {
   "kk": "Биотехнолог",
   "ru": "Биотехнолог",
   "en": "Biochemist"
  },
  "riasec": [
   0.683,
   1.0,
   0.268,
   0.193,
   0.137,
   0.435
  ],
  "ability": {
   "verbal": {
    "lv": 0.795,
    "im": 0.837
   },
   "logic": {
    "lv": 0.732,
    "im": 0.825
   },
   "numeric": {
    "lv": 0.634,
    "im": 0.75
   },
   "spatial": {
    "lv": 0.241,
    "im": 0.425
   },
   "clerical": {
    "lv": 0.446,
    "im": 0.624
   },
   "mechanical": {
    "lv": 0.486,
    "im": 0.51
   }
  },
  "jobZone": 5,
  "tags": [
   "hazard",
   "math"
  ],
  "context": {
   "disease": 2.11,
   "outdoors": 1.05,
   "sitting": 3.58,
   "public": 2.65,
   "customers": 1.8,
   "conflict": 2.55,
   "hazard": 3.11
  },
  "activities": [
   "Estimating the Quantifiable Characteristics of Products, Events, or Information",
   "Analyzing Data or Information",
   "Thinking Creatively",
   "Developing Objectives and Strategies"
  ],
  "future": {
   "automation": 0.027,
   "llm": 0.443,
   "risk": 0.235
  },
  "ent": {
   "kk": "Биология + Химия",
   "ru": "Биология + Химия",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "chemist",
  "soc": "19-2031.00",
  "abilitySoc": "19-2031.00",
  "emoji": "⚗️",
  "name": {
   "kk": "Химик",
   "ru": "Химик",
   "en": "Chemist"
  },
  "riasec": [
   0.777,
   0.943,
   0.083,
   0.025,
   0.1,
   0.658
  ],
  "ability": {
   "verbal": {
    "lv": 0.697,
    "im": 0.8
   },
   "logic": {
    "lv": 0.697,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.589,
    "im": 0.737
   },
   "spatial": {
    "lv": 0.259,
    "im": 0.412
   },
   "clerical": {
    "lv": 0.429,
    "im": 0.624
   },
   "mechanical": {
    "lv": 0.39,
    "im": 0.54
   }
  },
  "jobZone": 4,
  "tags": [
   "hazard",
   "math"
  ],
  "context": {
   "disease": 1.15,
   "outdoors": 1.13,
   "sitting": 3.09,
   "public": 1.82,
   "customers": 2.98,
   "conflict": 2.45,
   "hazard": 3.65
  },
  "activities": [
   "Documenting/Recording Information",
   "Analyzing Data or Information",
   "Estimating the Quantifiable Characteristics of Products, Events, or Information",
   "Monitoring and Controlling Resources"
  ],
  "future": {
   "automation": 0.1,
   "llm": 0.4,
   "risk": 0.25
  },
  "ent": {
   "kk": "Химия + Биология",
   "ru": "Химия + Биология",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "ecologist",
  "soc": "19-2041.00",
  "abilitySoc": "19-2041.00",
  "emoji": "🌿",
  "name": {
   "kk": "Эколог",
   "ru": "Эколог",
   "en": "Environmental scientist"
  },
  "riasec": [
   0.617,
   1.0,
   0.132,
   0.27,
   0.263,
   0.573
  ],
  "ability": {
   "verbal": {
    "lv": 0.714,
    "im": 0.824
   },
   "logic": {
    "lv": 0.624,
    "im": 0.812
   },
   "numeric": {
    "lv": 0.517,
    "im": 0.612
   },
   "spatial": {
    "lv": 0.295,
    "im": 0.438
   },
   "clerical": {
    "lv": 0.411,
    "im": 0.524
   },
   "mechanical": {
    "lv": 0.259,
    "im": 0.452
   }
  },
  "jobZone": 4,
  "tags": [
   "customers",
   "sitting"
  ],
  "context": {
   "disease": 1.27,
   "outdoors": 2.52,
   "sitting": 4.4,
   "public": 2.53,
   "customers": 4.18,
   "conflict": 2.94,
   "hazard": 2.19
  },
  "activities": [
   "Evaluating Information to Determine Compliance with Standards",
   "Communicating with People Outside the Organization",
   "Analyzing Data or Information",
   "Identifying Objects, Actions, and Events"
  ],
  "future": {
   "automation": 0.033,
   "llm": 0.726,
   "risk": 0.379
  },
  "ent": {
   "kk": "Биология + География",
   "ru": "Биология + География",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "economist",
  "soc": "19-3011.00",
  "abilitySoc": "19-3011.00",
  "emoji": "📈",
  "name": {
   "kk": "Экономист",
   "ru": "Экономист",
   "en": "Economist"
  },
  "riasec": [
   0.09,
   1.0,
   0.248,
   0.203,
   0.467,
   0.557
  ],
  "ability": {
   "verbal": {
    "lv": 0.706,
    "im": 0.812
   },
   "logic": {
    "lv": 0.634,
    "im": 0.812
   },
   "numeric": {
    "lv": 0.607,
    "im": 0.762
   },
   "spatial": {
    "lv": 0.151,
    "im": 0.338
   },
   "clerical": {
    "lv": 0.303,
    "im": 0.476
   },
   "mechanical": {
    "lv": 0.036,
    "im": 0.224
   }
  },
  "jobZone": 5,
  "tags": [
   "math",
   "sitting"
  ],
  "context": {
   "disease": 1.13,
   "outdoors": 1.08,
   "sitting": 4.71,
   "public": 3.04,
   "customers": 2.79,
   "conflict": 2.25,
   "hazard": 1.0
  },
  "activities": [
   "Analyzing Data or Information",
   "Processing Information",
   "Interpreting the Meaning of Information for Others",
   "Estimating the Quantifiable Characteristics of Products, Events, or Information"
  ],
  "future": {
   "automation": 0.43,
   "llm": 0.458,
   "risk": 0.444
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": false
  },
  "salary": 432500,
  "n": 28
 },
 {
  "id": "designer",
  "soc": "15-1255.00",
  "abilitySoc": "15-1254.00",
  "emoji": "🎨",
  "name": {
   "kk": "UI/UX дизайнер",
   "ru": "UI/UX дизайнер",
   "en": "UI/UX designer"
  },
  "riasec": [
   0.262,
   0.645,
   0.582,
   0.202,
   0.357,
   0.565
  ],
  "ability": {
   "verbal": {
    "lv": 0.563,
    "im": 0.737
   },
   "logic": {
    "lv": 0.527,
    "im": 0.738
   },
   "numeric": {
    "lv": 0.42,
    "im": 0.587
   },
   "spatial": {
    "lv": 0.259,
    "im": 0.412
   },
   "clerical": {
    "lv": 0.446,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.03,
    "im": 0.216
   }
  },
  "jobZone": 4,
  "tags": [
   "sitting"
  ],
  "context": {
   "disease": 1.04,
   "outdoors": 1.04,
   "sitting": 4.79,
   "public": 1.96,
   "customers": 2.46,
   "conflict": 2.88,
   "hazard": 1.0
  },
  "activities": [
   "Thinking Creatively",
   "Working with Computers",
   "Updating and Using Relevant Knowledge",
   "Processing Information"
  ],
  "future": {
   "automation": 0.21,
   "llm": 0.683,
   "risk": 0.447
  },
  "ent": {
   "kk": "Шығармашылық емтихан",
   "ru": "Творческий экзамен",
   "verify": true
  },
  "salary": 400000,
  "n": 58
 },
 {
  "id": "gamedev",
  "soc": "15-1255.01",
  "abilitySoc": "15-1255.01",
  "emoji": "🎮",
  "name": {
   "kk": "Ойын әзірлеуші",
   "ru": "Разработчик игр",
   "en": "Game designer"
  },
  "riasec": [
   0.28,
   0.517,
   0.903,
   0.225,
   0.503,
   0.478
  ],
  "ability": {
   "verbal": {
    "lv": 0.563,
    "im": 0.788
   },
   "logic": {
    "lv": 0.563,
    "im": 0.75
   },
   "numeric": {
    "lv": 0.429,
    "im": 0.576
   },
   "spatial": {
    "lv": 0.268,
    "im": 0.425
   },
   "clerical": {
    "lv": 0.411,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.071,
    "im": 0.25
   }
  },
  "jobZone": 4,
  "tags": [
   "sitting"
  ],
  "context": {
   "disease": 1.0,
   "outdoors": 1.15,
   "sitting": 4.84,
   "public": 2.35,
   "customers": 2.05,
   "conflict": 2.8,
   "hazard": 1.0
  },
  "activities": [
   "Thinking Creatively",
   "Making Decisions and Solving Problems",
   "Working with Computers",
   "Developing Objectives and Strategies"
  ],
  "future": {
   "automation": 0.015,
   "llm": 0.583,
   "risk": 0.299
  },
  "ent": {
   "kk": "Математика + Информатика",
   "ru": "Математика + Информатика",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "graphic",
  "soc": "27-1024.00",
  "abilitySoc": "27-1024.00",
  "emoji": "🖌️",
  "name": {
   "kk": "Графикалық дизайнер",
   "ru": "Графический дизайнер",
   "en": "Graphic designer"
  },
  "riasec": [
   0.367,
   0.305,
   1.0,
   0.218,
   0.435,
   0.463
  ],
  "ability": {
   "verbal": {
    "lv": 0.527,
    "im": 0.737
   },
   "logic": {
    "lv": 0.464,
    "im": 0.637
   },
   "numeric": {
    "lv": 0.268,
    "im": 0.4
   },
   "spatial": {
    "lv": 0.259,
    "im": 0.412
   },
   "clerical": {
    "lv": 0.321,
    "im": 0.55
   },
   "mechanical": {
    "lv": 0.186,
    "im": 0.32
   }
  },
  "jobZone": 4,
  "tags": [
   "sitting"
  ],
  "context": {
   "disease": 1.06,
   "outdoors": 1.37,
   "sitting": 4.79,
   "public": 2.65,
   "customers": 3.05,
   "conflict": 2.45,
   "hazard": 1.05
  },
  "activities": [
   "Thinking Creatively",
   "Drafting, Laying Out, and Specifying Technical Devices, Parts, and Equipment",
   "Selling or Influencing Others",
   "Working with Computers"
  ],
  "future": {
   "automation": 0.082,
   "llm": 0.411,
   "risk": 0.246
  },
  "ent": {
   "kk": "Шығармашылық емтихан",
   "ru": "Творческий экзамен",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "interior",
  "soc": "27-1025.00",
  "abilitySoc": "27-1025.00",
  "emoji": "🛋️",
  "name": {
   "kk": "Интерьер дизайнері",
   "ru": "Дизайнер интерьера",
   "en": "Interior designer"
  },
  "riasec": [
   0.572,
   0.363,
   0.778,
   0.298,
   0.39,
   0.455
  ],
  "ability": {
   "verbal": {
    "lv": 0.571,
    "im": 0.788
   },
   "logic": {
    "lv": 0.482,
    "im": 0.687
   },
   "numeric": {
    "lv": 0.411,
    "im": 0.588
   },
   "spatial": {
    "lv": 0.366,
    "im": 0.588
   },
   "clerical": {
    "lv": 0.374,
    "im": 0.576
   },
   "mechanical": {
    "lv": 0.349,
    "im": 0.504
   }
  },
  "jobZone": 4,
  "tags": [
   "customers",
   "sales",
   "sitting"
  ],
  "context": {
   "disease": 1.17,
   "outdoors": 1.79,
   "sitting": 4.08,
   "public": 2.68,
   "customers": 4.0,
   "conflict": 2.92,
   "hazard": 1.29
  },
  "activities": [
   "Drafting, Laying Out, and Specifying Technical Devices, Parts, and Equipment",
   "Selling or Influencing Others",
   "Thinking Creatively",
   "Coordinating the Work and Activities of Others"
  ],
  "future": {
   "automation": 0.022,
   "llm": 0.362,
   "risk": 0.192
  },
  "ent": {
   "kk": "Шығармашылық емтихан",
   "ru": "Творческий экзамен",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "journalist",
  "soc": "27-3023.00",
  "abilitySoc": "27-3023.00",
  "emoji": "📰",
  "name": {
   "kk": "Журналист",
   "ru": "Журналист",
   "en": "Journalist"
  },
  "riasec": [
   0.078,
   0.527,
   0.682,
   0.3,
   0.493,
   0.438
  ],
  "ability": {
   "verbal": {
    "lv": 0.544,
    "im": 0.763
   },
   "logic": {
    "lv": 0.509,
    "im": 0.663
   },
   "numeric": {
    "lv": 0.259,
    "im": 0.425
   },
   "spatial": {
    "lv": 0.17,
    "im": 0.363
   },
   "clerical": {
    "lv": 0.303,
    "im": 0.524
   },
   "mechanical": {
    "lv": 0.166,
    "im": 0.298
   }
  },
  "jobZone": 4,
  "tags": [
   "sitting"
  ],
  "context": {
   "disease": 1.38,
   "outdoors": 2.66,
   "sitting": 4.15,
   "public": 2.78,
   "customers": 3.71,
   "conflict": 2.8,
   "hazard": 1.15
  },
  "activities": [
   "Communicating with People Outside the Organization",
   "Interpreting the Meaning of Information for Others",
   "Getting Information",
   "Performing for or Working Directly with the Public"
  ],
  "future": {
   "automation": 0.11,
   "llm": 0.633,
   "risk": 0.372
  },
  "ent": {
   "kk": "Шығармашылық емтихан",
   "ru": "Творческий экзамен",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "director",
  "soc": "27-2012.00",
  "abilitySoc": "27-2012.00",
  "emoji": "🎬",
  "name": {
   "kk": "Режиссер / продюсер",
   "ru": "Режиссёр / продюсер",
   "en": "Producer / director"
  },
  "riasec": [
   0.19,
   0.205,
   0.858,
   0.355,
   0.797,
   0.425
  ],
  "ability": {
   "verbal": {
    "lv": 0.607,
    "im": 0.8
   },
   "logic": {
    "lv": 0.571,
    "im": 0.774
   },
   "numeric": {
    "lv": 0.402,
    "im": 0.512
   },
   "spatial": {
    "lv": 0.393,
    "im": 0.55
   },
   "clerical": {
    "lv": 0.429,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.134,
    "im": 0.306
   }
  },
  "jobZone": 4,
  "tags": [
   "sitting"
  ],
  "context": {
   "disease": 1.0,
   "outdoors": 1.67,
   "sitting": 4.14,
   "public": 2.72,
   "customers": 3.61,
   "conflict": 3.42,
   "hazard": 1.07
  },
  "activities": [
   "Thinking Creatively",
   "Getting Information",
   "Scheduling Work and Activities",
   "Judging the Qualities of Objects, Services, or People"
  ],
  "future": {
   "automation": 0.022,
   "llm": 0.479,
   "risk": 0.25
  },
  "ent": {
   "kk": "Шығармашылық емтихан",
   "ru": "Творческий экзамен",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "translator",
  "soc": "27-3091.00",
  "abilitySoc": "27-3091.00",
  "emoji": "🌐",
  "name": {
   "kk": "Аудармашы",
   "ru": "Переводчик",
   "en": "Translator"
  },
  "riasec": [
   0.148,
   0.36,
   0.567,
   0.418,
   0.147,
   0.607
  ],
  "ability": {
   "verbal": {
    "lv": 0.607,
    "im": 0.812
   },
   "logic": {
    "lv": 0.437,
    "im": 0.612
   },
   "numeric": {
    "lv": 0.16,
    "im": 0.4
   },
   "spatial": {
    "lv": 0.151,
    "im": 0.375
   },
   "clerical": {
    "lv": 0.429,
    "im": 0.576
   },
   "mechanical": {
    "lv": 0.05,
    "im": 0.248
   }
  },
  "jobZone": 4,
  "tags": [],
  "context": {
   "disease": 2.85,
   "outdoors": 1.92,
   "sitting": 3.61,
   "public": 2.75,
   "customers": 2.9,
   "conflict": 2.92,
   "hazard": 1.34
  },
  "activities": [
   "Interpreting the Meaning of Information for Others",
   "Performing for or Working Directly with the Public",
   "Establishing and Maintaining Interpersonal Relationships",
   "Updating and Using Relevant Knowledge"
  ],
  "future": {
   "automation": 0.38,
   "llm": 0.84,
   "risk": 0.61
  },
  "ent": {
   "kk": "Шет тілі + Дүниежүзі тарихы",
   "ru": "Иностранный язык + Всемирная история",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "teacher",
  "soc": "25-2031.00",
  "abilitySoc": "25-2031.00",
  "emoji": "👩‍🏫",
  "name": {
   "kk": "Мектеп мұғалімі",
   "ru": "Учитель (старшие классы)",
   "en": "Secondary teacher"
  },
  "riasec": [
   0.308,
   0.372,
   0.452,
   1.0,
   0.292,
   0.438
  ],
  "ability": {
   "verbal": {
    "lv": 0.571,
    "im": 0.8
   },
   "logic": {
    "lv": 0.563,
    "im": 0.763
   },
   "numeric": {
    "lv": 0.429,
    "im": 0.588
   },
   "spatial": {
    "lv": 0.214,
    "im": 0.4
   },
   "clerical": {
    "lv": 0.411,
    "im": 0.576
   },
   "mechanical": {
    "lv": 0.096,
    "im": 0.278
   }
  },
  "jobZone": 4,
  "tags": [
   "children",
   "public"
  ],
  "context": {
   "disease": 2.48,
   "outdoors": 2.12,
   "sitting": 3.0,
   "public": 4.52,
   "customers": 3.34,
   "conflict": 3.43,
   "hazard": 1.18
  },
  "activities": [
   "Coaching and Developing Others",
   "Training and Teaching Others",
   "Developing Objectives and Strategies",
   "Resolving Conflicts and Negotiating with Others"
  ],
  "future": {
   "automation": 0.0078,
   "llm": 0.341,
   "risk": 0.175
  },
  "ent": {
   "kk": "Пәнге байланысты",
   "ru": "Зависит от предмета",
   "verify": false
  },
  "salary": 325000,
  "n": 41
 },
 {
  "id": "primary",
  "soc": "25-2021.00",
  "abilitySoc": "25-2021.00",
  "emoji": "🧒",
  "name": {
   "kk": "Бастауыш сынып мұғалімі",
   "ru": "Учитель начальных классов",
   "en": "Primary teacher"
  },
  "riasec": [
   0.258,
   0.397,
   0.498,
   1.0,
   0.262,
   0.422
  ],
  "ability": {
   "verbal": {
    "lv": 0.571,
    "im": 0.788
   },
   "logic": {
    "lv": 0.545,
    "im": 0.788
   },
   "numeric": {
    "lv": 0.393,
    "im": 0.588
   },
   "spatial": {
    "lv": 0.187,
    "im": 0.362
   },
   "clerical": {
    "lv": 0.357,
    "im": 0.524
   },
   "mechanical": {
    "lv": 0.07,
    "im": 0.254
   }
  },
  "jobZone": 4,
  "tags": [
   "children",
   "conflict",
   "customers",
   "public"
  ],
  "context": {
   "disease": 3.33,
   "outdoors": 2.52,
   "sitting": 2.32,
   "public": 4.59,
   "customers": 4.53,
   "conflict": 4.05,
   "hazard": 1.0
  },
  "activities": [
   "Training and Teaching Others",
   "Coaching and Developing Others",
   "Assisting and Caring for Others",
   "Resolving Conflicts and Negotiating with Others"
  ],
  "future": {
   "automation": 0.0044,
   "llm": 0.311,
   "risk": 0.158
  },
  "ent": {
   "kk": "Пәнге байланысты",
   "ru": "Зависит от предмета",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "psych",
  "soc": "19-3033.00",
  "abilitySoc": "19-3033.00",
  "emoji": "🧠",
  "name": {
   "kk": "Психолог",
   "ru": "Психолог",
   "en": "Psychologist"
  },
  "riasec": [
   0.012,
   0.75,
   0.337,
   0.928,
   0.278,
   0.425
  ],
  "ability": {
   "verbal": {
    "lv": 0.679,
    "im": 0.888
   },
   "logic": {
    "lv": 0.58,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.312,
    "im": 0.437
   },
   "spatial": {
    "lv": 0.151,
    "im": 0.312
   },
   "clerical": {
    "lv": 0.303,
    "im": 0.5
   },
   "mechanical": {
    "lv": 0.0,
    "im": 0.2
   }
  },
  "jobZone": 5,
  "tags": [
   "sitting"
  ],
  "context": {
   "disease": 2.32,
   "outdoors": 1.33,
   "sitting": 4.78,
   "public": 2.44,
   "customers": 3.44,
   "conflict": 3.28,
   "hazard": 1.08
  },
  "activities": [
   "Assisting and Caring for Others",
   "Establishing and Maintaining Interpersonal Relationships",
   "Providing Consultation and Advice to Others",
   "Resolving Conflicts and Negotiating with Others"
  ],
  "future": {
   "automation": 0.0047,
   "llm": 0.509,
   "risk": 0.257
  },
  "ent": {
   "kk": "Биология + География",
   "ru": "Биология + География",
   "verify": false
  },
  "salary": 300000,
  "n": 37
 },
 {
  "id": "nurse",
  "soc": "29-1141.00",
  "abilitySoc": "29-1141.00",
  "emoji": "💉",
  "name": {
   "kk": "Медбике",
   "ru": "Медсестра / медбрат",
   "en": "Registered nurse"
  },
  "riasec": [
   0.443,
   0.637,
   0.052,
   0.77,
   0.213,
   0.597
  ],
  "ability": {
   "verbal": {
    "lv": 0.652,
    "im": 0.8
   },
   "logic": {
    "lv": 0.634,
    "im": 0.812
   },
   "numeric": {
    "lv": 0.429,
    "im": 0.6
   },
   "spatial": {
    "lv": 0.259,
    "im": 0.45
   },
   "clerical": {
    "lv": 0.446,
    "im": 0.624
   },
   "mechanical": {
    "lv": 0.096,
    "im": 0.27
   }
  },
  "jobZone": 4,
  "tags": [
   "conflict",
   "customers",
   "disease",
   "night"
  ],
  "context": {
   "disease": 4.24,
   "outdoors": 1.05,
   "sitting": 2.93,
   "public": 2.32,
   "customers": 4.52,
   "conflict": 3.82,
   "hazard": 1.68
  },
  "activities": [
   "Assisting and Caring for Others",
   "Guiding, Directing, and Motivating Subordinates",
   "Performing General Physical Activities",
   "Documenting/Recording Information"
  ],
  "future": {
   "automation": 0.009,
   "llm": 0.381,
   "risk": 0.195
  },
  "ent": {
   "kk": "Биология + Химия",
   "ru": "Биология + Химия",
   "verify": false
  },
  "salary": 300000,
  "n": 41
 },
 {
  "id": "social",
  "soc": "21-1021.00",
  "abilitySoc": "21-1021.00",
  "emoji": "🤝",
  "name": {
   "kk": "Әлеуметтік қызметкер",
   "ru": "Социальный работник",
   "en": "Social worker"
  },
  "riasec": [
   0.117,
   0.387,
   0.317,
   0.975,
   0.322,
   0.428
  ],
  "ability": {
   "verbal": {
    "lv": 0.589,
    "im": 0.85
   },
   "logic": {
    "lv": 0.554,
    "im": 0.776
   },
   "numeric": {
    "lv": 0.313,
    "im": 0.412
   },
   "spatial": {
    "lv": 0.196,
    "im": 0.375
   },
   "clerical": {
    "lv": 0.374,
    "im": 0.524
   },
   "mechanical": {
    "lv": 0.073,
    "im": 0.266
   }
  },
  "jobZone": 4,
  "tags": [
   "children",
   "conflict",
   "customers"
  ],
  "context": {
   "disease": 2.47,
   "outdoors": 2.83,
   "sitting": 3.5,
   "public": 2.87,
   "customers": 4.27,
   "conflict": 4.53,
   "hazard": 1.09
  },
  "activities": [
   "Resolving Conflicts and Negotiating with Others",
   "Establishing and Maintaining Interpersonal Relationships",
   "Selling or Influencing Others",
   "Assisting and Caring for Others"
  ],
  "future": {
   "automation": 0.028,
   "llm": 0.3,
   "risk": 0.164
  },
  "ent": {
   "kk": "Биология + География",
   "ru": "Биология + География",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "coach",
  "soc": "27-2022.00",
  "abilitySoc": "27-2022.00",
  "emoji": "🏅",
  "name": {
   "kk": "Спорт жаттықтырушысы",
   "ru": "Спортивный тренер",
   "en": "Coach"
  },
  "riasec": [
   0.543,
   0.192,
   0.238,
   0.718,
   0.688,
   0.407
  ],
  "ability": {
   "verbal": {
    "lv": 0.554,
    "im": 0.787
   },
   "logic": {
    "lv": 0.58,
    "im": 0.75
   },
   "numeric": {
    "lv": 0.294,
    "im": 0.425
   },
   "spatial": {
    "lv": 0.411,
    "im": 0.513
   },
   "clerical": {
    "lv": 0.446,
    "im": 0.524
   },
   "mechanical": {
    "lv": 0.167,
    "im": 0.352
   }
  },
  "jobZone": 4,
  "tags": [
   "children",
   "conflict",
   "outdoors",
   "public"
  ],
  "context": {
   "disease": 1.36,
   "outdoors": 3.26,
   "sitting": 2.61,
   "public": 3.98,
   "customers": 2.96,
   "conflict": 3.67,
   "hazard": 1.24
  },
  "activities": [
   "Coaching and Developing Others",
   "Developing and Building Teams",
   "Judging the Qualities of Objects, Services, or People",
   "Scheduling Work and Activities"
  ],
  "future": {
   "automation": 0.013,
   "llm": 0.144,
   "risk": 0.079
  },
  "ent": {
   "kk": "Шығармашылық емтихан",
   "ru": "Творческий экзамен",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "speech",
  "soc": "29-1127.00",
  "abilitySoc": "29-1127.00",
  "emoji": "🗣️",
  "name": {
   "kk": "Логопед",
   "ru": "Логопед",
   "en": "Speech therapist"
  },
  "riasec": [
   0.282,
   0.772,
   0.328,
   0.818,
   0.072,
   0.505
  ],
  "ability": {
   "verbal": {
    "lv": 0.67,
    "im": 0.862
   },
   "logic": {
    "lv": 0.607,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.384,
    "im": 0.513
   },
   "spatial": {
    "lv": 0.187,
    "im": 0.35
   },
   "clerical": {
    "lv": 0.446,
    "im": 0.624
   },
   "mechanical": {
    "lv": 0.103,
    "im": 0.248
   }
  },
  "jobZone": 5,
  "tags": [
   "children"
  ],
  "context": {
   "disease": 3.47,
   "outdoors": 1.37,
   "sitting": 3.88,
   "public": 2.06,
   "customers": 3.8,
   "conflict": 2.78,
   "hazard": 1.1
  },
  "activities": [
   "Performing Administrative Activities",
   "Developing Objectives and Strategies",
   "Organizing, Planning, and Prioritizing Work",
   "Establishing and Maintaining Interpersonal Relationships"
  ],
  "future": {
   "automation": 0.0064,
   "llm": 0.39,
   "risk": 0.198
  },
  "ent": {
   "kk": "Биология + География",
   "ru": "Биология + География",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "physio",
  "soc": "29-1123.00",
  "abilitySoc": "29-1123.00",
  "emoji": "🦵",
  "name": {
   "kk": "Физиотерапевт",
   "ru": "Физиотерапевт",
   "en": "Physical therapist"
  },
  "riasec": [
   0.557,
   0.645,
   0.195,
   0.818,
   0.248,
   0.347
  ],
  "ability": {
   "verbal": {
    "lv": 0.589,
    "im": 0.8
   },
   "logic": {
    "lv": 0.589,
    "im": 0.776
   },
   "numeric": {
    "lv": 0.393,
    "im": 0.537
   },
   "spatial": {
    "lv": 0.223,
    "im": 0.4
   },
   "clerical": {
    "lv": 0.411,
    "im": 0.576
   },
   "mechanical": {
    "lv": 0.243,
    "im": 0.418
   }
  },
  "jobZone": 5,
  "tags": [
   "customers",
   "disease"
  ],
  "context": {
   "disease": 3.68,
   "outdoors": 1.34,
   "sitting": 2.34,
   "public": 2.16,
   "customers": 4.63,
   "conflict": 3.2,
   "hazard": 1.29
  },
  "activities": [
   "Assisting and Caring for Others",
   "Performing for or Working Directly with the Public",
   "Documenting/Recording Information",
   "Developing Objectives and Strategies"
  ],
  "future": {
   "automation": 0.021,
   "llm": 0.34,
   "risk": 0.181
  },
  "ent": {
   "kk": "Биология + Химия",
   "ru": "Биология + Химия",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "lawyer",
  "soc": "23-1011.00",
  "abilitySoc": "23-1011.00",
  "emoji": "⚖️",
  "name": {
   "kk": "Заңгер",
   "ru": "Юрист",
   "en": "Lawyer"
  },
  "riasec": [
   0.028,
   0.587,
   0.22,
   0.408,
   0.757,
   0.59
  ],
  "ability": {
   "verbal": {
    "lv": 0.714,
    "im": 0.924
   },
   "logic": {
    "lv": 0.625,
    "im": 0.812
   },
   "numeric": {
    "lv": 0.349,
    "im": 0.5
   },
   "spatial": {
    "lv": 0.187,
    "im": 0.362
   },
   "clerical": {
    "lv": 0.374,
    "im": 0.524
   },
   "mechanical": {
    "lv": 0.007,
    "im": 0.204
   }
  },
  "jobZone": 5,
  "tags": [
   "sitting"
  ],
  "context": {
   "disease": 1.07,
   "outdoors": 1.22,
   "sitting": 4.55,
   "public": 2.73,
   "customers": 3.86,
   "conflict": 3.44,
   "hazard": 1.0
  },
  "activities": [
   "Resolving Conflicts and Negotiating with Others",
   "Providing Consultation and Advice to Others",
   "Interpreting the Meaning of Information for Others",
   "Evaluating Information to Determine Compliance with Standards"
  ],
  "future": {
   "automation": 0.035,
   "llm": 0.475,
   "risk": 0.255
  },
  "ent": {
   "kk": "Дүниежүзі тарихы + Құқық негіздері",
   "ru": "Всемирная история + Основы права",
   "verify": false
  },
  "salary": 500000,
  "n": 37
 },
 {
  "id": "marketing",
  "soc": "11-2021.00",
  "abilitySoc": "11-2021.00",
  "emoji": "📣",
  "name": {
   "kk": "Маркетинг менеджері",
   "ru": "Маркетолог",
   "en": "Marketing manager"
  },
  "riasec": [
   0.0,
   0.317,
   0.242,
   0.303,
   1.0,
   0.617
  ],
  "ability": {
   "verbal": {
    "lv": 0.607,
    "im": 0.8
   },
   "logic": {
    "lv": 0.59,
    "im": 0.763
   },
   "numeric": {
    "lv": 0.509,
    "im": 0.624
   },
   "spatial": {
    "lv": 0.214,
    "im": 0.4
   },
   "clerical": {
    "lv": 0.411,
    "im": 0.55
   },
   "mechanical": {
    "lv": 0.077,
    "im": 0.266
   }
  },
  "jobZone": 4,
  "tags": [
   "customers",
   "sales",
   "sitting"
  ],
  "context": {
   "disease": 1.07,
   "outdoors": 1.38,
   "sitting": 4.36,
   "public": 3.35,
   "customers": 4.25,
   "conflict": 3.18,
   "hazard": 1.06
  },
  "activities": [
   "Selling or Influencing Others",
   "Establishing and Maintaining Interpersonal Relationships",
   "Developing and Building Teams",
   "Communicating with Supervisors, Peers, or Subordinates"
  ],
  "future": {
   "automation": 0.014,
   "llm": 0.578,
   "risk": 0.296
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "market_an",
  "soc": "13-1161.00",
  "abilitySoc": "13-1161.00",
  "emoji": "🔍",
  "name": {
   "kk": "Нарық талдаушысы",
   "ru": "Маркетинговый аналитик",
   "en": "Market research analyst"
  },
  "riasec": [
   0.012,
   0.6,
   0.26,
   0.247,
   0.753,
   0.603
  ],
  "ability": {
   "verbal": {
    "lv": 0.643,
    "im": 0.8
   },
   "logic": {
    "lv": 0.616,
    "im": 0.812
   },
   "numeric": {
    "lv": 0.545,
    "im": 0.65
   },
   "spatial": {
    "lv": 0.187,
    "im": 0.338
   },
   "clerical": {
    "lv": 0.411,
    "im": 0.55
   },
   "mechanical": {
    "lv": 0.037,
    "im": 0.218
   }
  },
  "jobZone": 4,
  "tags": [
   "sitting"
  ],
  "context": {
   "disease": 1.0,
   "outdoors": 1.43,
   "sitting": 4.65,
   "public": 2.65,
   "customers": 3.57,
   "conflict": 2.7,
   "hazard": 1.05
  },
  "activities": [
   "Interpreting the Meaning of Information for Others",
   "Analyzing Data or Information",
   "Selling or Influencing Others",
   "Developing Objectives and Strategies"
  ],
  "future": {
   "automation": 0.61,
   "llm": 0.577,
   "risk": 0.593
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "pm",
  "soc": "13-1082.00",
  "abilitySoc": "13-1111.00",
  "emoji": "📋",
  "name": {
   "kk": "Жоба менеджері",
   "ru": "Менеджер проектов",
   "en": "Project manager"
  },
  "riasec": [
   0.077,
   0.293,
   0.097,
   0.392,
   0.893,
   0.76
  ],
  "ability": {
   "verbal": {
    "lv": 0.598,
    "im": 0.824
   },
   "logic": {
    "lv": 0.598,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.446,
    "im": 0.588
   },
   "spatial": {
    "lv": 0.187,
    "im": 0.312
   },
   "clerical": {
    "lv": 0.303,
    "im": 0.524
   },
   "mechanical": {
    "lv": 0.229,
    "im": 0.32
   }
  },
  "jobZone": 4,
  "tags": [
   "sales",
   "sitting"
  ],
  "context": {
   "disease": 1.26,
   "outdoors": 1.75,
   "sitting": 4.19,
   "public": 2.76,
   "customers": 3.62,
   "conflict": 2.95,
   "hazard": 1.32
  },
  "activities": [
   "Providing Consultation and Advice to Others",
   "Selling or Influencing Others",
   "Developing Objectives and Strategies",
   "Establishing and Maintaining Interpersonal Relationships"
  ],
  "future": {
   "automation": 0.23,
   "llm": 0.4,
   "risk": 0.315
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "hr",
  "soc": "13-1071.00",
  "abilitySoc": "13-1071.00",
  "emoji": "👥",
  "name": {
   "kk": "HR маманы",
   "ru": "HR-специалист",
   "en": "HR specialist"
  },
  "riasec": [
   0.012,
   0.248,
   0.073,
   0.463,
   0.792,
   0.75
  ],
  "ability": {
   "verbal": {
    "lv": 0.58,
    "im": 0.8
   },
   "logic": {
    "lv": 0.536,
    "im": 0.713
   },
   "numeric": {
    "lv": 0.331,
    "im": 0.45
   },
   "spatial": {
    "lv": 0.151,
    "im": 0.3
   },
   "clerical": {
    "lv": 0.286,
    "im": 0.4
   },
   "mechanical": {
    "lv": 0.016,
    "im": 0.216
   }
  },
  "jobZone": 4,
  "tags": [
   "conflict",
   "sitting"
  ],
  "context": {
   "disease": 1.2,
   "outdoors": 1.46,
   "sitting": 4.18,
   "public": 3.33,
   "customers": 3.71,
   "conflict": 3.93,
   "hazard": 1.0
  },
  "activities": [
   "Performing Administrative Activities",
   "Resolving Conflicts and Negotiating with Others",
   "Staffing Organizational Units",
   "Communicating with Supervisors, Peers, or Subordinates"
  ],
  "future": {
   "automation": 0.31,
   "llm": 0.589,
   "risk": 0.449
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "sales",
  "soc": "41-4012.00",
  "abilitySoc": "41-4012.00",
  "emoji": "🤝",
  "name": {
   "kk": "Сату менеджері",
   "ru": "Менеджер по продажам",
   "en": "Sales representative"
  },
  "riasec": [
   0.273,
   0.217,
   0.115,
   0.272,
   0.848,
   0.648
  ],
  "ability": {
   "verbal": {
    "lv": 0.563,
    "im": 0.763
   },
   "logic": {
    "lv": 0.455,
    "im": 0.612
   },
   "numeric": {
    "lv": 0.349,
    "im": 0.476
   },
   "spatial": {
    "lv": 0.214,
    "im": 0.362
   },
   "clerical": {
    "lv": 0.303,
    "im": 0.424
   },
   "mechanical": {
    "lv": 0.034,
    "im": 0.248
   }
  },
  "jobZone": 4,
  "tags": [
   "customers",
   "sales"
  ],
  "context": {
   "disease": 1.07,
   "outdoors": 2.74,
   "sitting": 3.35,
   "public": 2.08,
   "customers": 4.91,
   "conflict": 3.31,
   "hazard": 1.07
  },
  "activities": [
   "Selling or Influencing Others",
   "Operating Vehicles, Mechanized Devices, or Equipment",
   "Updating and Using Relevant Knowledge",
   "Establishing and Maintaining Interpersonal Relationships"
  ],
  "future": {
   "automation": 0.85,
   "llm": 0.707,
   "risk": 0.778
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "finance",
  "soc": "13-2051.00",
  "abilitySoc": "13-2031.00",
  "emoji": "💹",
  "name": {
   "kk": "Қаржы талдаушысы",
   "ru": "Финансовый аналитик",
   "en": "Financial analyst"
  },
  "riasec": [
   0.0,
   0.677,
   0.13,
   0.208,
   0.682,
   0.757
  ],
  "ability": {
   "verbal": {
    "lv": 0.563,
    "im": 0.776
   },
   "logic": {
    "lv": 0.545,
    "im": 0.737
   },
   "numeric": {
    "lv": 0.607,
    "im": 0.776
   },
   "spatial": {
    "lv": 0.125,
    "im": 0.3
   },
   "clerical": {
    "lv": 0.429,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.011,
    "im": 0.208
   }
  },
  "jobZone": 4,
  "tags": [
   "customers",
   "math",
   "sitting"
  ],
  "context": {
   "disease": 1.37,
   "outdoors": 1.15,
   "sitting": 4.82,
   "public": 1.86,
   "customers": 4.08,
   "conflict": 3.01,
   "hazard": 1.0
  },
  "activities": [
   "Processing Information",
   "Working with Computers",
   "Analyzing Data or Information",
   "Getting Information"
  ],
  "future": {
   "automation": 0.23,
   "llm": 0.5,
   "risk": 0.365
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": false
  },
  "salary": null,
  "n": null
 },
 {
  "id": "hotel",
  "soc": "11-9081.00",
  "abilitySoc": "11-9081.00",
  "emoji": "🏨",
  "name": {
   "kk": "Қонақ үй менеджері",
   "ru": "Менеджер гостиницы",
   "en": "Lodging manager"
  },
  "riasec": [
   0.242,
   0.028,
   0.075,
   0.537,
   0.882,
   0.718
  ],
  "ability": {
   "verbal": {
    "lv": 0.571,
    "im": 0.8
   },
   "logic": {
    "lv": 0.509,
    "im": 0.724
   },
   "numeric": {
    "lv": 0.393,
    "im": 0.613
   },
   "spatial": {
    "lv": 0.303,
    "im": 0.462
   },
   "clerical": {
    "lv": 0.411,
    "im": 0.576
   },
   "mechanical": {
    "lv": 0.233,
    "im": 0.47
   }
  },
  "jobZone": 4,
  "tags": [
   "conflict",
   "customers",
   "night",
   "public"
  ],
  "context": {
   "disease": 1.14,
   "outdoors": 1.45,
   "sitting": 3.4,
   "public": 3.67,
   "customers": 4.49,
   "conflict": 3.72,
   "hazard": 1.13
  },
  "activities": [
   "Staffing Organizational Units",
   "Performing Administrative Activities",
   "Coordinating the Work and Activities of Others",
   "Resolving Conflicts and Negotiating with Others"
  ],
  "future": {
   "automation": 0.0039,
   "llm": 0.38,
   "risk": 0.192
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "manager",
  "soc": "11-1021.00",
  "abilitySoc": "11-1021.00",
  "emoji": "🏢",
  "name": {
   "kk": "Компания басшысы",
   "ru": "Руководитель компании",
   "en": "Operations manager"
  },
  "riasec": [
   0.203,
   0.232,
   0.052,
   0.395,
   0.993,
   0.72
  ],
  "ability": {
   "verbal": {
    "lv": 0.58,
    "im": 0.8
   },
   "logic": {
    "lv": 0.544,
    "im": 0.738
   },
   "numeric": {
    "lv": 0.437,
    "im": 0.576
   },
   "spatial": {
    "lv": 0.241,
    "im": 0.425
   },
   "clerical": {
    "lv": 0.321,
    "im": 0.476
   },
   "mechanical": {
    "lv": 0.491,
    "im": 0.57
   }
  },
  "jobZone": 4,
  "tags": [
   "customers"
  ],
  "context": {
   "disease": 1.21,
   "outdoors": 2.93,
   "sitting": 3.09,
   "public": 2.46,
   "customers": 4.49,
   "conflict": 3.35,
   "hazard": 1.34
  },
  "activities": [
   "Staffing Organizational Units",
   "Monitoring and Controlling Resources",
   "Guiding, Directing, and Motivating Subordinates",
   "Judging the Qualities of Objects, Services, or People"
  ],
  "future": {
   "automation": 0.16,
   "llm": 0.385,
   "risk": 0.272
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": true
  },
  "salary": null,
  "n": null
 },
 {
  "id": "logist",
  "soc": "13-1081.00",
  "abilitySoc": "13-1081.00",
  "emoji": "🚚",
  "name": {
   "kk": "Логист",
   "ru": "Логист",
   "en": "Logistician"
  },
  "riasec": [
   0.232,
   0.472,
   0.008,
   0.225,
   0.683,
   0.763
  ],
  "ability": {
   "verbal": {
    "lv": 0.599,
    "im": 0.8
   },
   "logic": {
    "lv": 0.616,
    "im": 0.8
   },
   "numeric": {
    "lv": 0.491,
    "im": 0.612
   },
   "spatial": {
    "lv": 0.231,
    "im": 0.424
   },
   "clerical": {
    "lv": 0.393,
    "im": 0.55
   },
   "mechanical": {
    "lv": 0.286,
    "im": 0.392
   }
  },
  "jobZone": 4,
  "tags": [],
  "context": {
   "disease": 1.32,
   "outdoors": 2.12,
   "sitting": 3.92,
   "public": 2.42,
   "customers": 3.96,
   "conflict": 3.08,
   "hazard": 1.75
  },
  "activities": [
   "Staffing Organizational Units",
   "Developing and Building Teams",
   "Monitoring and Controlling Resources",
   "Selling or Influencing Others"
  ],
  "future": {
   "automation": 0.012,
   "llm": 0.455,
   "risk": 0.233
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": false
  },
  "salary": 462500,
  "n": 40
 },
 {
  "id": "accountant",
  "soc": "13-2011.00",
  "abilitySoc": "13-2011.00",
  "emoji": "🧾",
  "name": {
   "kk": "Бухгалтер",
   "ru": "Бухгалтер",
   "en": "Accountant"
  },
  "riasec": [
   0.023,
   0.428,
   0.015,
   0.188,
   0.477,
   1.0
  ],
  "ability": {
   "verbal": {
    "lv": 0.598,
    "im": 0.788
   },
   "logic": {
    "lv": 0.634,
    "im": 0.75
   },
   "numeric": {
    "lv": 0.536,
    "im": 0.663
   },
   "spatial": {
    "lv": 0.143,
    "im": 0.324
   },
   "clerical": {
    "lv": 0.393,
    "im": 0.6
   },
   "mechanical": {
    "lv": 0.046,
    "im": 0.232
   }
  },
  "jobZone": 4,
  "tags": [
   "sitting"
  ],
  "context": {
   "disease": 1.02,
   "outdoors": 1.27,
   "sitting": 4.5,
   "public": 2.0,
   "customers": 3.77,
   "conflict": 2.75,
   "hazard": 1.08
  },
  "activities": [
   "Performing Administrative Activities",
   "Evaluating Information to Determine Compliance with Standards",
   "Staffing Organizational Units",
   "Monitoring and Controlling Resources"
  ],
  "future": {
   "automation": 0.94,
   "llm": 0.52,
   "risk": 0.73
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": false
  },
  "salary": 450000,
  "n": 49
 },
 {
  "id": "banker",
  "soc": "13-2072.00",
  "abilitySoc": "13-2072.00",
  "emoji": "🏦",
  "name": {
   "kk": "Банк несие маманы",
   "ru": "Кредитный специалист",
   "en": "Loan officer"
  },
  "riasec": [
   0.04,
   0.217,
   0.0,
   0.46,
   0.672,
   0.837
  ],
  "ability": {
   "verbal": {
    "lv": 0.58,
    "im": 0.8
   },
   "logic": {
    "lv": 0.554,
    "im": 0.75
   },
   "numeric": {
    "lv": 0.473,
    "im": 0.65
   },
   "spatial": {
    "lv": 0.08,
    "im": 0.288
   },
   "clerical": {
    "lv": 0.303,
    "im": 0.45
   },
   "mechanical": {
    "lv": 0.047,
    "im": 0.23
   }
  },
  "jobZone": 4,
  "tags": [
   "customers",
   "sales",
   "sitting"
  ],
  "context": {
   "disease": 1.37,
   "outdoors": 1.92,
   "sitting": 4.61,
   "public": 2.34,
   "customers": 4.55,
   "conflict": 3.19,
   "hazard": 1.0
  },
  "activities": [
   "Evaluating Information to Determine Compliance with Standards",
   "Selling or Influencing Others",
   "Establishing and Maintaining Interpersonal Relationships",
   "Analyzing Data or Information"
  ],
  "future": {
   "automation": 0.98,
   "llm": 0.648,
   "risk": 0.814
  },
  "ent": {
   "kk": "Математика + География",
   "ru": "Математика + География",
   "verify": true
  },
  "salary": null,
  "n": null
 }
];
