/* =========================================================
   «Бұл маған мүлдем келмейді» — элиминация әдісі.
   Тверски (1972) «Elimination by aspects», Гати (1986, 2010) PIC моделі:
   алдымен оқушы үшін қабылданбайтын жағдайлары бар мамандықтар алынып тасталады.
   Тегтер O*NET Work Context деректерінен (CX ≥ шек) және ҚР оқу мерзімінен алынған.
   ========================================================= */
export const DEALBREAKERS = [
  { id: "disease",  e: "🩸", kk: "Қан, аурулар, аурухана",               ru: "Кровь, болезни, больницы" },
  { id: "sitting",  e: "🪑", kk: "Күні бойы компьютер алдында отыру",     ru: "Весь день сидеть за компьютером" },
  { id: "outdoors", e: "🌧️", kk: "Кез келген ауа райында далада жұмыс",   ru: "Работа на улице в любую погоду" },
  { id: "customers",e: "🗣️", kk: "Бейтаныс адамдармен үнемі сөйлесу",     ru: "Постоянно общаться с незнакомыми" },
  { id: "public",   e: "🎤", kk: "Көпшілік алдында сөйлеу",               ru: "Выступать перед публикой" },
  { id: "math",     e: "➗", kk: "Көп математика",                        ru: "Много математики" },
  { id: "night",    e: "🌙", kk: "Түнгі ауысым, кезекшілік",              ru: "Ночные смены, дежурства" },
  { id: "travel",   e: "🧳", kk: "Ұзақ іссапар, вахта",                   ru: "Долгие командировки, вахта" },
  { id: "children", e: "🧸", kk: "Балалармен жұмыс",                      ru: "Работа с детьми" },
  { id: "sales",    e: "💼", kk: "Сату және сату жоспары",                ru: "Продажи и планы продаж" },
  { id: "longstudy",e: "🎓", kk: "5–7 жыл оқу",                           ru: "Учиться 5–7 лет" },
  { id: "hazard",   e: "⚠️", kk: "Қауіпті жағдайлар",                     ru: "Опасные условия" },
  { id: "conflict", e: "😤", kk: "Жанжалды жағдайлар",                    ru: "Конфликтные ситуации" },
];
const REJECTED = { id: "rejected", e: "👀", kk: "сен «мүлде менікі емес» дедің", ru: "ты отметил(а): «совсем не моё»" };
export const tagLabel = id => id === "rejected" ? REJECTED : DEALBREAKERS.find(d => d.id === id);

/* Жұмыс жағдайы (O*NET CX, 1–5) → жиілік сөзі */
export const CONTEXT_LABEL = {
  sitting:   { e: "🪑", kk: "Отырып жұмыс істеу",           ru: "Сидячая работа" },
  disease:   { e: "🩸", kk: "Аурумен байланыс",              ru: "Контакт с болезнями" },
  outdoors:  { e: "🌧️", kk: "Далада, кез келген ауа райында", ru: "На улице в любую погоду" },
  customers: { e: "🗣️", kk: "Клиенттермен, көпшілікпен",     ru: "С клиентами и людьми" },
  public:    { e: "🎤", kk: "Көпшілік алдында сөйлеу",        ru: "Выступления на публике" },
  conflict:  { e: "😤", kk: "Жанжалды жағдайлар",             ru: "Конфликтные ситуации" },
  hazard:    { e: "⚠️", kk: "Қауіпті жағдайлар",              ru: "Опасные условия" },
};
export const freq = (v, lang) => {
  const W = { kk: ["ешқашан дерлік", "сирек", "кейде", "жиі", "үнемі"], ru: ["почти никогда", "редко", "иногда", "часто", "постоянно"] };
  return (W[lang] || W.ru)[Math.max(0, Math.min(4, Math.round(v) - 1))];
};

/* O*NET-тің 41 жалпы жұмыс түрі */
export const ACTIVITIES = {
  "Getting Information": { kk: "Ақпарат жинау", ru: "Сбор информации" },
  "Monitoring Processes, Materials, or Surroundings": { kk: "Процестерді бақылау", ru: "Наблюдение за процессами" },
  "Identifying Objects, Actions, and Events": { kk: "Заттар мен оқиғаларды анықтау", ru: "Распознавание объектов и событий" },
  "Inspecting Equipment, Structures, or Materials": { kk: "Жабдық пен құрылымды тексеру", ru: "Проверка оборудования и конструкций" },
  "Estimating the Quantifiable Characteristics of Products, Events, or Information": { kk: "Өлшеу және бағалау", ru: "Измерения и оценки" },
  "Judging the Qualities of Objects, Services, or People": { kk: "Сапаны бағалау", ru: "Оценка качества" },
  "Processing Information": { kk: "Ақпаратты өңдеу", ru: "Обработка информации" },
  "Evaluating Information to Determine Compliance with Standards": { kk: "Стандарттарға сәйкестікті тексеру", ru: "Проверка соответствия нормам" },
  "Analyzing Data or Information": { kk: "Деректерді талдау", ru: "Анализ данных" },
  "Making Decisions and Solving Problems": { kk: "Шешім қабылдау, мәселе шешу", ru: "Решение проблем" },
  "Thinking Creatively": { kk: "Шығармашылықпен ойлау", ru: "Творческое мышление" },
  "Updating and Using Relevant Knowledge": { kk: "Білімді үнемі жаңарту", ru: "Постоянное обновление знаний" },
  "Developing Objectives and Strategies": { kk: "Мақсат пен стратегия құру", ru: "Разработка стратегий" },
  "Scheduling Work and Activities": { kk: "Жұмыс кестесін жасау", ru: "Составление расписаний" },
  "Organizing, Planning, and Prioritizing Work": { kk: "Жұмысты жоспарлау", ru: "Планирование работы" },
  "Performing General Physical Activities": { kk: "Дене еңбегі", ru: "Физическая работа" },
  "Handling and Moving Objects": { kk: "Заттарды тасу, қолмен жұмыс", ru: "Работа руками с предметами" },
  "Controlling Machines and Processes": { kk: "Машиналарды басқару", ru: "Управление машинами и процессами" },
  "Operating Vehicles, Mechanized Devices, or Equipment": { kk: "Көлік пен техниканы жүргізу", ru: "Управление транспортом и техникой" },
  "Working with Computers": { kk: "Компьютермен жұмыс", ru: "Работа на компьютере" },
  "Drafting, Laying Out, and Specifying Technical Devices, Parts, and Equipment": { kk: "Сызба мен жоба жасау", ru: "Чертежи и проектирование" },
  "Repairing and Maintaining Mechanical Equipment": { kk: "Механизмдерді жөндеу", ru: "Ремонт механизмов" },
  "Repairing and Maintaining Electronic Equipment": { kk: "Электрониканы жөндеу", ru: "Ремонт электроники" },
  "Documenting/Recording Information": { kk: "Құжаттар толтыру", ru: "Оформление документов" },
  "Interpreting the Meaning of Information for Others": { kk: "Күрделіні басқаларға түсіндіру", ru: "Объяснение сложного другим" },
  "Communicating with Supervisors, Peers, or Subordinates": { kk: "Командамен қарым-қатынас", ru: "Общение внутри команды" },
  "Communicating with People Outside the Organization": { kk: "Сырттағы адамдармен байланыс", ru: "Общение с внешними людьми" },
  "Establishing and Maintaining Interpersonal Relationships": { kk: "Байланыс орнату және сақтау", ru: "Построение отношений с людьми" },
  "Assisting and Caring for Others": { kk: "Адамдарға күтім жасау", ru: "Помощь и уход за людьми" },
  "Selling or Influencing Others": { kk: "Сату, сендіру", ru: "Продажи и убеждение" },
  "Resolving Conflicts and Negotiating with Others": { kk: "Келіссөз, дауды шешу", ru: "Переговоры и разрешение конфликтов" },
  "Performing for or Working Directly with the Public": { kk: "Көпшілікпен тікелей жұмыс", ru: "Работа с публикой" },
  "Coordinating the Work and Activities of Others": { kk: "Басқалардың жұмысын үйлестіру", ru: "Координация работы людей" },
  "Developing and Building Teams": { kk: "Команда құру", ru: "Построение команды" },
  "Training and Teaching Others": { kk: "Оқыту, үйрету", ru: "Обучение других" },
  "Guiding, Directing, and Motivating Subordinates": { kk: "Басшылық ету, шабыттандыру", ru: "Руководство и мотивация" },
  "Coaching and Developing Others": { kk: "Тәлімгерлік", ru: "Наставничество" },
  "Providing Consultation and Advice to Others": { kk: "Кеңес беру", ru: "Консультирование" },
  "Performing Administrative Activities": { kk: "Әкімшілік жұмыс", ru: "Административная работа" },
  "Staffing Organizational Units": { kk: "Қызметкер іріктеу", ru: "Подбор сотрудников" },
  "Monitoring and Controlling Resources": { kk: "Ресурстар мен бюджетті бақылау", ru: "Контроль ресурсов и бюджета" },
};

/* Өңірлік жалақы коэффициенті = өңірдегі орташа жалақы / республикалық (ҰСБ, 2025) */
export const REGIONS = [
  { id: "astana", kk: "Астана", ru: "Астана", k: 1.340 }, { id: "almaty", kk: "Алматы", ru: "Алматы", k: null },
  { id: "shymkent", kk: "Шымкент", ru: "Шымкент", k: null }, { id: "abai", kk: "Абай облысы", ru: "Абайская обл.", k: null },
  { id: "akmola", kk: "Ақмола облысы", ru: "Акмолинская обл.", k: null }, { id: "aktobe", kk: "Ақтөбе облысы", ru: "Актюбинская обл.", k: null },
  { id: "almaty_r", kk: "Алматы облысы", ru: "Алматинская обл.", k: null }, { id: "atyrau", kk: "Атырау облысы", ru: "Атырауская обл.", k: 1.383 },
  { id: "wko", kk: "Батыс Қазақстан", ru: "Западно-Казахст.", k: null }, { id: "zhambyl", kk: "Жамбыл облысы", ru: "Жамбылская обл.", k: 0.739 },
  { id: "zhetysu", kk: "Жетісу облысы", ru: "Жетысуская обл.", k: 0.749 }, { id: "karaganda", kk: "Қарағанды облысы", ru: "Карагандинская обл.", k: null },
  { id: "kostanay", kk: "Қостанай облысы", ru: "Костанайская обл.", k: null }, { id: "kyzylorda", kk: "Қызылорда облысы", ru: "Кызылординская обл.", k: null },
  { id: "mangystau", kk: "Маңғыстау облысы", ru: "Мангистауская обл.", k: 1.405 }, { id: "pavlodar", kk: "Павлодар облысы", ru: "Павлодарская обл.", k: null },
  { id: "nko", kk: "Солтүстік Қазақстан", ru: "Северо-Казахст.", k: 0.737 }, { id: "turkistan", kk: "Түркістан облысы", ru: "Туркестанская обл.", k: 0.720 },
  { id: "ulytau", kk: "Ұлытау облысы", ru: "Улытауская обл.", k: 1.324 }, { id: "eko", kk: "Шығыс Қазақстан", ru: "Восточно-Казахст.", k: null },
];
export const regionK = id => REGIONS.find(r => r.id === id)?.k ?? 1;
