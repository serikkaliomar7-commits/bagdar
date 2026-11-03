/* =========================================================
   Қызығушылықтар — O*NET Interest Profiler Short Form (60 тармақ).
   Rounds, Su, Lewis & Rivkin (2010), U.S. DOL, CC BY 4.0.
   Сенімділік (түпнұсқа): Кронбах α = .78–.87 (M = .81, N = 1061),
   ретест r = .78–.86 (M = .82, N = 132).
   Аудармасы мен мәдени бейімделуі — Bağdar; orig — бейімделген тармақтың O*NET түпнұсқасы.
   ========================================================= */
export const ITEMS = [
  // R — Practical / Realistic
  { id: "R1", t: "R", en: "Build kitchen cabinets", kk: "Ас үй жиһазын құрастыру", ru: "Собирать кухонную мебель" },
  { id: "R2", t: "R", en: "Lay brick or tile", kk: "Кірпіш немесе плитка қалау", ru: "Класть кирпич или плитку" },
  { id: "R3", t: "R", en: "Repair household appliances", kk: "Тұрмыстық техниканы жөндеу", ru: "Чинить бытовую технику" },
  { id: "R4", t: "R", en: "Raise fish in a fish hatchery", kk: "Балық фермасында балық өсіру", ru: "Разводить рыбу на рыбной ферме" },
  { id: "R5", t: "R", en: "Assemble electronic parts", kk: "Электрондық бөлшектерді құрастыру", ru: "Собирать электронные детали" },
  { id: "R6", t: "R", en: "Drive a truck to deliver packages", kk: "Жүк көлігімен сәлемдеме тасымалдау", ru: "Развозить посылки на грузовике" },
  { id: "R7", t: "R", en: "Test the quality of parts before shipment", kk: "Бөлшектердің сапасын жөнелту алдында тексеру", ru: "Проверять качество деталей перед отправкой" },
  { id: "R8", t: "R", orig: "Repair and install locks", en: "Repair cars", kk: "Көлік жөндеу", ru: "Ремонтировать автомобили" },
  { id: "R9", t: "R", en: "Set up and operate machines to make products", kk: "Зауытта станоктарды баптап, басқару", ru: "Настраивать станки на заводе" },
  { id: "R10", t: "R", orig: "Put out forest fires", en: "Put out fires", kk: "Өрт сөндіру", ru: "Тушить пожары" },
  // I — Investigative
  { id: "I1", t: "I", en: "Develop a new medicine", kk: "Жаңа дәрі ойлап табу", ru: "Разрабатывать новое лекарство" },
  { id: "I2", t: "I", en: "Study ways to reduce water pollution", kk: "Судың ластануын азайту жолдарын зерттеу", ru: "Изучать, как уменьшить загрязнение воды" },
  { id: "I3", t: "I", en: "Conduct chemical experiments", kk: "Химиялық тәжірибелер жүргізу", ru: "Проводить химические опыты" },
  { id: "I4", t: "I", en: "Study the movement of planets", kk: "Планеталардың қозғалысын зерттеу", ru: "Изучать движение планет" },
  { id: "I5", t: "I", en: "Examine blood samples using a microscope", kk: "Қан үлгілерін микроскоппен зерттеу", ru: "Изучать пробы крови под микроскопом" },
  { id: "I6", t: "I", en: "Investigate the cause of a fire", kk: "Өрттің себебін анықтау", ru: "Выяснять причину пожара" },
  { id: "I7", t: "I", en: "Develop a way to better predict the weather", kk: "Ауа райын дәлірек болжау әдісін жасау", ru: "Придумать, как точнее предсказывать погоду" },
  { id: "I8", t: "I", en: "Work in a biology lab", kk: "Биология зертханасында жұмыс істеу", ru: "Работать в биологической лаборатории" },
  { id: "I9", t: "I", orig: "Invent a replacement for sugar", en: "Create new food products in a lab", kk: "Зертханада жаңа тағам өнімдерін жасау", ru: "Создавать в лаборатории новые продукты питания" },
  { id: "I10", t: "I", en: "Do laboratory tests to identify diseases", kk: "Ауруды анықтау үшін зертханалық талдау жасау", ru: "Делать анализы, чтобы выявить болезнь" },
  // A — Artistic
  { id: "A1", t: "A", en: "Write books or plays", kk: "Кітап немесе пьеса жазу", ru: "Писать книги или пьесы" },
  { id: "A2", t: "A", en: "Play a musical instrument", kk: "Музыкалық аспапта ойнау", ru: "Играть на музыкальном инструменте" },
  { id: "A3", t: "A", en: "Compose or arrange music", kk: "Музыка шығару немесе аранжировка жасау", ru: "Сочинять или аранжировать музыку" },
  { id: "A4", t: "A", en: "Draw pictures", kk: "Сурет салу", ru: "Рисовать" },
  { id: "A5", t: "A", en: "Create special effects for movies", kk: "Фильмдерге арнайы эффектілер жасау", ru: "Делать спецэффекты для фильмов" },
  { id: "A6", t: "A", en: "Paint sets for plays", kk: "Спектакльге декорация салу", ru: "Рисовать декорации для спектаклей" },
  { id: "A7", t: "A", en: "Write scripts for movies or television shows", kk: "Фильм не телешоуға сценарий жазу", ru: "Писать сценарии для фильмов и шоу" },
  { id: "A8", t: "A", orig: "Perform jazz or tap dance", en: "Dance on stage", kk: "Сахнада би билеу", ru: "Танцевать на сцене" },
  { id: "A9", t: "A", en: "Sing in a band", kk: "Музыкалық топта ән айту", ru: "Петь в музыкальной группе" },
  { id: "A10", t: "A", en: "Edit movies", kk: "Фильм монтаждау", ru: "Монтировать видео и фильмы" },
  // S — Social
  { id: "S1", t: "S", en: "Teach an individual an exercise routine", kk: "Адамға жаттығу кешенін үйрету", ru: "Учить человека комплексу упражнений" },
  { id: "S2", t: "S", en: "Help people with personal or emotional problems", kk: "Адамдарға жеке және эмоционалдық мәселелерінде көмектесу", ru: "Помогать людям с личными переживаниями" },
  { id: "S3", t: "S", en: "Give career guidance to people", kk: "Адамдарға мамандық таңдауда кеңес беру", ru: "Помогать людям выбрать профессию" },
  { id: "S4", t: "S", en: "Perform rehabilitation therapy", kk: "Жарақаттан кейін адамдарды қалпына келтіру", ru: "Восстанавливать людей после травм" },
  { id: "S5", t: "S", en: "Do volunteer work at a non-profit organization", kk: "Қайырымдылық ұйымында ерікті болу", ru: "Быть волонтёром в благотворительном фонде" },
  { id: "S6", t: "S", en: "Teach children how to play sports", kk: "Балаларға спорт ойындарын үйрету", ru: "Учить детей спортивным играм" },
  { id: "S7", t: "S", en: "Teach sign language to people who are deaf", kk: "Естімейтін адамдарға ым тілін үйрету", ru: "Учить жестовому языку людей с нарушением слуха" },
  { id: "S8", t: "S", en: "Help conduct a group therapy session", kk: "Топтық психологиялық сабақ өткізуге көмектесу", ru: "Помогать вести групповое психологическое занятие" },
  { id: "S9", t: "S", en: "Take care of children at a day-care center", kk: "Балабақшада балаларға қарау", ru: "Присматривать за детьми в детском саду" },
  { id: "S10", t: "S", en: "Teach a high-school class", kk: "Жоғары сыныпта сабақ беру", ru: "Вести урок в старших классах" },
  // E — Enterprising
  { id: "E1", t: "E", en: "Buy and sell stocks and bonds", kk: "Акциялар сатып алу және сату", ru: "Покупать и продавать акции" },
  { id: "E2", t: "E", en: "Manage a retail store", kk: "Дүкенді басқару", ru: "Управлять магазином" },
  { id: "E3", t: "E", en: "Operate a beauty salon or barber shop", kk: "Сұлулық салонын не барбершоп ашып, басқару", ru: "Открыть и вести салон красоты или барбершоп" },
  { id: "E4", t: "E", en: "Manage a department within a large company", kk: "Ірі компанияда бөлім басқару", ru: "Руководить отделом в большой компании" },
  { id: "E5", t: "E", en: "Start your own business", kk: "Өз бизнесіңді ашу", ru: "Открыть свой бизнес" },
  { id: "E6", t: "E", en: "Negotiate business contracts", kk: "Келісімшарт бойынша келіссөз жүргізу", ru: "Вести переговоры о контрактах" },
  { id: "E7", t: "E", en: "Represent a client in a lawsuit", kk: "Сотта клиентті қорғау", ru: "Защищать клиента в суде" },
  { id: "E8", t: "E", en: "Market a new line of clothing", kk: "Жаңа киім коллекциясын жарнамалау", ru: "Продвигать новую коллекцию одежды" },
  { id: "E9", t: "E", en: "Sell merchandise at a department store", kk: "Сауда орталығында тауар сату", ru: "Продавать товары в торговом центре" },
  { id: "E10", t: "E", en: "Manage a clothing store", kk: "Киім дүкенін басқару", ru: "Управлять магазином одежды" },
  // C — Conventional
  { id: "C1", t: "C", en: "Develop a spreadsheet using computer software", kk: "Компьютерде кесте (Excel) құрастыру", ru: "Составлять таблицы в Excel" },
  { id: "C2", t: "C", en: "Proofread records or forms", kk: "Құжаттардағы қателерді тексеру", ru: "Проверять документы на ошибки" },
  { id: "C3", t: "C", en: "Install software across computers on a large network", kk: "Мекеменің барлық компьютеріне бағдарлама орнату", ru: "Устанавливать программы на все компьютеры организации" },
  { id: "C4", t: "C", en: "Operate a calculator", kk: "Калькулятормен есептеу", ru: "Делать расчёты на калькуляторе" },
  { id: "C5", t: "C", en: "Keep shipping and receiving records", kk: "Тауардың келуі мен жөнелтілуін есепке алу", ru: "Вести учёт приёма и отправки товаров" },
  { id: "C6", t: "C", en: "Calculate the wages of employees", kk: "Қызметкерлердің жалақысын есептеу", ru: "Рассчитывать зарплату сотрудникам" },
  { id: "C7", t: "C", en: "Inventory supplies using a hand-held computer", kk: "Қоймадағы тауарды сканермен түгендеу", ru: "Пересчитывать товар на складе сканером" },
  { id: "C8", t: "C", orig: "Record rent payments", en: "Keep records of customer payments", kk: "Клиенттердің төлемдерін есепке алу", ru: "Вести учёт оплат клиентов" },
  { id: "C9", t: "C", en: "Keep inventory records", kk: "Қойма есебін жүргізу", ru: "Вести складской учёт" },
  { id: "C10", t: "C", orig: "Stamp, sort, and distribute mail", en: "Register and route documents in an office", kk: "Мекемеде құжаттарды тіркеп, жөнелту", ru: "Регистрировать и рассылать документы в организации" },
];

/* Зейінді тексеретін тармақтар (жауабы алдын ала белгілі) */
export const ATTENTION = [
  { id: "AC1", answer: 1, kk: "Тексеру: осы жолда «Мүлде ұнамайды» батырмасын бас", ru: "Проверка внимания: здесь нажми «Совсем не нравится»" },
  { id: "AC2", answer: 5, kk: "Тексеру: осы жолда «Өте ұнайды» батырмасын бас", ru: "Проверка внимания: здесь нажми «Очень нравится»" },
];

/* Жауап шкаласы: ортасы — «Білмеймін / басқа» нұсқасы */
export const SCALE = [
  { v: 1, e: "😖", kk: "Мүлде ұнамайды", ru: "Совсем не нравится" },
  { v: 2, e: "🙁", kk: "Ұнамайды", ru: "Не нравится" },
  { v: 3, e: "🤷", kk: "Білмеймін", ru: "Не знаю" },
  { v: 4, e: "🙂", kk: "Ұнайды", ru: "Нравится" },
  { v: 5, e: "😍", kk: "Өте ұнайды", ru: "Очень нравится" },
];

export const TYPES = ["R", "I", "A", "S", "E", "C"];
export const TYPE_NAMES = {
  R: { kk: "Практик", ru: "Практик", emoji: "🔧", d: { kk: "қолмен, техникамен жұмыс", ru: "работа руками и с техникой" } },
  I: { kk: "Зерттеуші", ru: "Исследователь", emoji: "🔬", d: { kk: "зерттеу, талдау, ғылым", ru: "исследования, анализ, наука" } },
  A: { kk: "Шығармашыл", ru: "Творец", emoji: "🎨", d: { kk: "шығармашылық, өнер", ru: "творчество и искусство" } },
  S: { kk: "Қамқоршы", ru: "Помощник", emoji: "🤝", d: { kk: "адамдарға көмек, оқыту", ru: "помощь людям, обучение" } },
  E: { kk: "Көшбасшы", ru: "Лидер", emoji: "🚀", d: { kk: "басқару, бизнес, келіссөз", ru: "управление, бизнес, переговоры" } },
  C: { kk: "Ұйымдастырушы", ru: "Организатор", emoji: "📊", d: { kk: "тәртіп, сандар, құжаттар", ru: "порядок, числа, документы" } },
};
