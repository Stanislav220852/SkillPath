const ruTranslations = {
  companies: {
    title: "Наши выпускники работают в",
  },
  testimonials: {
    title: "Реальные истории",
    titleAccent: "наших студентов",
    items: [
      { name: "Алексей Петров",   role: "Junior Frontend @ Yandex",  text: "Уходить из бухгалтерии в 30 лет было дико страшно, казалось, что код — это для гениев математики. Но курс построен так, что тебя ведут за руку от простых тегов до сложных штук. Было ли тяжело? Да, иногда хотелось всё бросить. Но поддержка в чате и чёткий план не дали слиться. Ребята, это реально работает!", before: "Бухгалтер", after: "$3k/мес" },
      { name: "Мария Волкова",    role: "ML Engineer @ Tinkoff",     text: "У меня был ноль по математике. Роадмап разбил всё на маленькие шаги. Сейчас тренирую модели в банке.", before: "Маркетолог", after: "$5k/мес" },
      { name: "Данил Ким",        role: "Pentester @ Group-IB",      text: "От просмотра Mr. Robot до реальных взломов систем легально. Лучшее решение в карьере.", before: "Сисадмин", after: "$4k/мес" },
      { name: "София Лебедева",   role: "Data Analyst @ Avito",      text: "Два года пыталась учиться сама по роликам на YouTube. В итоге каша в голове и полное ощущение, что IT не для меня. В SkillPath пришла ради структуры. Ментор просто спас: разложил всё по полочкам, честно критиковал домашку и помог собрать нормальное портфолио. Через полгода я прошла собес в Авито!", before: "Студентка", after: "$3.5k/мес" },
      { name: "Игорь Савченко",   role: "Backend Dev @ Ozon",        text: "После армии думал, что в IT уже поздно. Друг скинул SkillPath, я прошёл тест и попал на бэкенд-роадмап. Через 4 месяца написал первый API, через 7 — получил оффер. Менторы реально разбирают твой код, а не просто ставят оценку. Лучшая инвестиция в жизни.", before: "Военнослужащий", after: "$3.2k/мес" },
      { name: "Анна Крылова",     role: "Mobile Dev @ VK",           text: "Пришла в SkillPath мамой в декрете, которая не знала, что такое Git. Училась по ночам, пока ребёнок спал. Роадмап по мобильной разработке — просто бомба: каждый шаг понятен, проекты реальные. Сейчас работаю удалённо в VK и наконец-то финансово независима.", before: "В декрете", after: "$3.8k/мес" },
    ]
  },
  faq: {
    title: "Частые",
    titleAccent: "вопросы",
    items: [
      { q: "Сколько это стоит?", a: "Обучение полностью бесплатное. У вас будет доступ ко всем учебным материалам и практическим заданиям без скрытых платежей и подписок." },
      { q: "Как быстро я найду работу?", a: "Всё зависит от вашего темпа и выбранного направления. В среднем наши студенты осваивают базу и собирают первое портфолио за 6–9 месяцев, после чего можно активно откликаться на вакансии." },
      { q: "Нужен ли опыт программирования?", a: "Нет, наши программы рассчитаны на новичков. Мы начинаем с самых азов, а интерактивный тест на старте поможет выбрать направление, которое подходит именно вам." },
      { q: "Что делать, если у меня возникнут трудности с заданием?", a: "Вы не останетесь одни. Вы всегда можете задать вопрос в нашем комьюнити или обратиться к менторам — практикующим IT-специалистам, которые помогут разобраться со сложной темой." },
      { q: "Помогаете с трудоустройством?", a: "Да, мы помогаем оформить сильное портфолио, составить резюме и делимся советами, как успешно проходить собеседования в IT-компании." },
      { q: "Можно ли переключиться на другое направление в процессе?", a: "Да, конечно. Если вы поймёте, что выбранная сфера вам не подходит, вы можете в любой момент открыть другой курс и начать изучать новую профессию." },
    ]
  },
  pricing: {
    title: "Выбери свой",
    titleAccent: "план",
    subtitle: "Начни бесплатно. Прокачайся когда будешь готов.",
    monthly: "Помесячно",
    yearly: "Годовой",
    save: "Скидка 20%",
    popular: "Популярный",
    perMonth: "/мес",
    cta: "Начать",
    plans: [
      { name: "Free",    price: 0,  yearPrice: 0,    desc: "Чтобы попробовать",   features: ["Все публичные роадмапы", "Доступ к сообществу", "Базовое отслеживание прогресса", "1 бесплатная сессия с ментором"], cta: "Начать бесплатно" },
      { name: "Pro",     price: 19, yearPrice: 15,   desc: "Для серьёзного обучения", features: ["Всё из Free", "Безлимит чата с ментором", "Все сертификаты", "Live-воркшопы", "Ревью проектов", "Приоритетная поддержка"], cta: "Перейти на Pro", popular: true },
      { name: "Premium", price: 49, yearPrice: 39,   desc: "Полный карьерный пакет", features: ["Всё из Pro", "1-на-1 с ментором еженедельно", "Программа подготовки к собесам", "Помощь с трудоустройством", "Ревью резюме и LinkedIn", "Доступ навсегда"], cta: "Перейти на Premium" },
    ]
  },
  footer: {
    navigation: "Навигация",
    contacts: "Контакты",
    socials: "Мы в соц. сетях",
    rights: "Все права защищены",
    desc: "Даем возможности новому поколению строителей, хакеров и творцов. Начни свое IT-путешествие сегодня.",
  },
  nav: {
    profs: "Профессии",
    roads: "Роадмапы",
    mentors: "Менторы",
    login: "Войти",
    loginTitle: "С возвращением",
    loginSubtitle: "Войдите чтобы продолжить обучение",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Пароль",
    loginBtn: "Войти",
    noAccount: "Нет аккаунта?",
    signUp: "Регистрация",
    orContinue: "или войдите через",
    comingSoon: "Скоро! 🚀",
    mentorsToast: "Запуск раздела менторов уже в следующем месяце",
  },
  hero: {
    badge: "SkillPath Бета 2.0",
    t1: "Выбери своё",
    t2: "Направление",
    t3: "В IT",
    desc: "Интерактивный гид по IT-академии. Найди профессию, которая подходит именно тебе. Начни свой путь здесь.",
    btnQuest: "Начать тест",
    btnRoles: "Все Роли"
  },
  bento: {
    title1: "Всё, что нужно чтобы",
    title2: "прокачаться",
    items: {
      aptitude:   { t: "Тест на профориентацию", d: "5-минутный интерактивный квиз, который расшифрует твой мозг и подберёт идеальное направление." },
      roadmaps:   { t: "Роадмапы",               d: "Пошаговые деревья навыков с подобранными ресурсами и контрольными точками." },
      mentors:    { t: "Менторы",                d: "Учись у инженеров из топовых компаний." },
      certs:      { t: "Сертификаты",            d: "Получай NFT-сертификаты за прохождение роадмапов." },
      workshops:  { t: "Воркшопы вживую",        d: "Еженедельные кодинг-сессии, CTF и ML-хакатоны." },
      library:    { t: "Подборка материалов",    d: "Отобранные туториалы, доки и видеокурсы — без воды." },
      career:     { t: "Карьерный рост",         d: "Зарплатная аналитика, подготовка к собесам и ревью портфолио." },
      copilot:    { t: "AI Копилот",             d: "Твой персональный ассистент по обучению 24/7." },
    }
  },
  stats: {
    students: "Студентов",
    mentors: "Менторов",
    profs: "Профессий",
    completion: "Завершение",
  },
  roles: {
    t: "Выбери свое",
    ts: "Направление",
    d: "Исследуй доступные пути в мире технологий. У каждого наравления есть уникальные способности, инструменты и свое дерево навыков.",
    f: { t: "Frontend-разработчик", d: "Мастер визуального мира. Создавай потрясающие интерфейсы с помощью кода и магии дизайна." },
    ai: { t: "AI Инженер", d: "Обучай нейросети. Общайся с машинами и создавай искусственный интеллект будущего." },
    cs: { t: "Кибербезопасность", d: "Цифровой страж. Вскрывай системы, чтобы защитить их и спасти данные от хакеров." },
    ds: { t: "Data Scientist", d: "Современный алхимик. Превращай сырые данные в золото прогнозов и находи скрытые истины." },
    view: "Карта пути"
  },
  steps: {
    t: "Как начать свое",
    ts: "Приключение",
    s1: { t: "Пройти профориентацию", d: "Быстрый тест для анализа твоих интересов, который поможет подобрать идеальное направление в IT." },
    s2: { t: "Освоить базу", d: "Получи доступ к интерактивной программе обучения и пошагово изучай профессию на практике." },
    s3: { t: "Выйти на рынок", d: "Нарабатывай сильное портфолио, общайся с менторами в сообществе и готовься к первым офферам." }
  },
  profPage: {
    title1: "Карьерный",
    title2: "трек",
    subtitle: "Изучите все доступные карьерные пути в технологической индустрии",
    skills: "Ключевые навыки",
    salary: "Зарплатная вилка",
    watchVideo: "Смотреть обзор",
    dayInLife: "Один день из жизни",
    tools: "Популярные инструменты",
    juniorLabel: "Джуниор",
    seniorLabel: "Сеньор",
    openRoadmap: "Открыть полный курс",
    selectProf: "Выберите профессию",
    back: "Назад",
  },
  roadmaps: {
    title: "Карта",
    titleSuffix: "Развития",
    subtitle: "Персонализированные дорожные карты обучения для каждой профессии",
    viewBtn: "Показать роадмап",
    interactiveLabel: "Интерактивный роадмап",
    interactiveDesc: "Кликни на навык — изучи детали. Отмечай пройденные этапы.",
    progress: "Прогресс",
    progressDone: "% завершено",
    resources: "Ресурсы",
    markDone: "Отметить как пройденное",
    markNotDone: "Отметить как не пройденное",
    startLearning: "Начать обучение",
    filters: { all: "Все", must: "Обязательно", core: "Основа", pro: "Продвинутое" },
    totalTime: "Общее время",
    weeks: "недель",
    hoursPerWeek: "ч/неделя",
    searchPlaceholder: "Поиск навыков...",
    continueBtn: "Продолжить",
    nothingFound: "По запросу ничего не найдено",
    reset: "Сбросить прогресс",
    learningNow: "учат прямо сейчас",
    toastPhase: "Фаза завершена!",
    toastRoadmap: "Роадмап пройден! Ты зверь 🔥",
    cardProgressLabel: "завершено",
    phases: {
      frontend: {
        title: "Frontend-разработчик",
        colorClass: "cyan",
        phases: [
          {
            phase: "Основы",
            skills: [
              { id: "html-css", title: "HTML & CSS", description: "Разметка страниц, flexbox, grid, анимации. Основа всего визуала.", resources: ["MDN Web Docs", "CSS Tricks", "freeCodeCamp"], duration: "4 нед.", tag: "Must" },
              { id: "js-core", title: "JavaScript Core", description: "Переменные, функции, DOM, асинхронность. Язык, который оживляет страницы.", resources: ["javascript.info", "Eloquent JS", "You Don't Know JS"], duration: "6 нед.", tag: "Must" },
            ]
          },
          {
            phase: "Фреймворки",
            skills: [
              { id: "react", title: "React", description: "Компоненты, хуки, состояние. Самый популярный UI-фреймворк в мире.", resources: ["react.dev", "Scrimba React", "Epic React"], duration: "8 нед.", tag: "Core" },
              { id: "typescript", title: "TypeScript", description: "Типизация делает код надёжным и масштабируемым. Must-have в 2024.", resources: ["TypeScript Handbook", "Total TypeScript", "TS Exercises"], duration: "3 нед.", tag: "Core" },
            ]
          },
          {
            phase: "Продвинутый",
            skills: [
              { id: "state", title: "State Management", description: "Zustand, Redux Toolkit, Jotai — управление глобальным состоянием приложения.", resources: ["Zustand docs", "Redux Toolkit docs", "Jotai"], duration: "3 нед.", tag: "Pro" },
              { id: "testing", title: "Тестирование", description: "Vitest, Playwright — надёжный код требует тестов.", resources: ["Testing Library", "Vitest Docs", "Playwright"], duration: "3 нед.", tag: "Pro" },
              { id: "deploy", title: "Deploy & CI/CD", description: "Vercel, Netlify, GitHub Actions — доставка кода до пользователей.", resources: ["Vercel Docs", "GitHub Actions", "Docker Intro"], duration: "2 нед.", tag: "Pro" },
            ]
          }
        ]
      },
      ai: {
        title: "AI / ML Инженер",
        colorClass: "pink",
        phases: [
          {
            phase: "Основы",
            skills: [
              { id: "python", title: "Python", description: "Синтаксис, структуры данных, ООП. Основной язык AI/ML мира.", resources: ["Python.org", "Automate the Boring Stuff", "RealPython"], duration: "5 нед.", tag: "Must" },
              { id: "math", title: "Математика для ML", description: "Линейная алгебра, статистика, матанализ. Без этого нейросети — чёрный ящик.", resources: ["3Blue1Brown", "Khan Academy", "Mathematics for ML book"], duration: "6 нед.", tag: "Must" },
            ]
          },
          {
            phase: "Машинное обучение",
            skills: [
              { id: "sklearn", title: "Scikit-learn", description: "Классические алгоритмы ML: регрессия, классификация, кластеризация.", resources: ["sklearn docs", "Kaggle Learn", "Hands-on ML book"], duration: "5 нед.", tag: "Core" },
              { id: "dl", title: "Deep Learning", description: "PyTorch — нейросети, CNN, RNN. Основа современного AI.", resources: ["fast.ai", "PyTorch tutorials", "Deep Learning book"], duration: "8 нед.", tag: "Core" },
            ]
          },
          {
            phase: "Специализация",
            skills: [
              { id: "nlp", title: "NLP & LLMs", description: "Трансформеры, fine-tuning, RAG — работа с языковыми моделями.", resources: ["Hugging Face", "LLM course", "LangChain docs"], duration: "6 нед.", tag: "Pro" },
              { id: "mlops", title: "MLOps", description: "MLflow, DVC, deployment моделей в продакшн.", resources: ["MLflow docs", "Made With ML", "Full Stack Deep Learning"], duration: "4 нед.", tag: "Pro" },
            ]
          }
        ]
      },
      cybersec: {
        title: "Кибербезопасность",
        colorClass: "purple",
        phases: [
          {
            phase: "Основы",
            skills: [
              { id: "networking", title: "Сети (Networking)", description: "TCP/IP, DNS, HTTP, Wireshark. Без знания сетей — не понять атаки.", resources: ["CompTIA Network+", "Professor Messer", "TryHackMe"], duration: "6 нед.", tag: "Must" },
              { id: "linux", title: "Linux & CLI", description: "Bash, права доступа, процессы. Большинство серверов — Linux.", resources: ["OverTheWire", "Linux Journey", "Bandit Wargame"], duration: "4 нед.", tag: "Must" },
            ]
          },
          {
            phase: "Атаки и защита",
            skills: [
              { id: "pentest", title: "Penetration Testing", description: "Kali Linux, Metasploit, OWASP Top 10. Взламывай легально.", resources: ["HackTheBox", "TryHackMe", "PentesterLab"], duration: "8 нед.", tag: "Core" },
              { id: "webapp", title: "Web App Security", description: "SQL Injection, XSS, CSRF — уязвимости веб-приложений.", resources: ["OWASP WebGoat", "PortSwigger Academy", "DVWA"], duration: "5 нед.", tag: "Core" },
            ]
          },
          {
            phase: "Продвинутый",
            skills: [
              { id: "siem", title: "SIEM & SOC", description: "Splunk, ELK — мониторинг, обнаружение инцидентов.", resources: ["Splunk Fundamentals", "Blue Team Labs", "SANS SOC"], duration: "5 нед.", tag: "Pro" },
              { id: "certs", title: "Сертификации", description: "CEH, OSCP, CompTIA Security+ — подтверди навыки документально.", resources: ["CompTIA", "Offensive Security", "EC-Council"], duration: "Ongoing", tag: "Pro" },
            ]
          }
        ]
      },
      datascience: {
        title: "Data Scientist",
        colorClass: "blue",
        phases: [
          {
            phase: "Основы",
            skills: [
              { id: "python-ds", title: "Python для данных", description: "Pandas, NumPy — обработка и анализ табличных данных.", resources: ["Kaggle Python", "Pandas docs", "Python Data Science Handbook"], duration: "5 нед.", tag: "Must" },
              { id: "sql", title: "SQL", description: "SELECT, JOIN, агрегации. Данные живут в базах.", resources: ["Mode SQL Tutorial", "SQLZoo", "LeetCode SQL"], duration: "3 нед.", tag: "Must" },
            ]
          },
          {
            phase: "Анализ и визуализация",
            skills: [
              { id: "eda", title: "EDA & Визуализация", description: "Matplotlib, Seaborn, Plotly — найди паттерны в данных.", resources: ["Kaggle EDA", "Plotly docs", "Seaborn gallery"], duration: "4 нед.", tag: "Core" },
              { id: "stats", title: "Статистика", description: "Гипотезы, p-value, A/B тесты — основа data-driven решений.", resources: ["StatQuest", "Think Stats", "Khan Statistics"], duration: "5 нед.", tag: "Core" },
            ]
          },
          {
            phase: "ML и продакшн",
            skills: [
              { id: "ml-ds", title: "Machine Learning", description: "Sklearn, feature engineering, модели предсказания.", resources: ["Kaggle ML", "Hands-on ML", "fast.ai"], duration: "7 нед.", tag: "Pro" },
              { id: "bi", title: "BI & Дашборды", description: "Tableau, Power BI, Superset — визуализация для бизнеса.", resources: ["Tableau Public", "Power BI Docs", "Metabase"], duration: "3 нед.", tag: "Pro" },
              { id: "bigdata", title: "Big Data", description: "Spark, Hadoop — обработка данных в промышленных масштабах.", resources: ["Databricks", "Apache Spark", "Coursera Big Data"], duration: "5 нед.", tag: "Pro" },
            ]
          }
        ]
      },
      backend: {
        title: "Backend-разработчик",
        colorClass: "emerald",
        phases: [
          {
            phase: "Основы",
            skills: [
              { id: "node", title: "Node.js & Express", description: "Серверный JavaScript, REST API, middleware.", resources: ["Node.js docs", "Express guide", "The Net Ninja"], duration: "5 нед.", tag: "Must" },
              { id: "db-basics", title: "Базы данных", description: "SQL vs NoSQL, схемы, запросы, индексы.", resources: ["PostgreSQL Tutorial", "MongoDB University", "SQLBolt"], duration: "4 нед.", tag: "Must" },
            ]
          },
          {
            phase: "Бэкенд-навыки",
            skills: [
              { id: "auth", title: "Авторизация & безопасность", description: "JWT, OAuth, сессии, хеширование паролей.", resources: ["Auth0 Blog", "OWASP Guide", "JWT.io"], duration: "3 нед.", tag: "Core" },
              { id: "apis", title: "REST & GraphQL", description: "Проектирование API, версионирование, GraphQL.", resources: ["REST API Design", "GraphQL.org", "Apollo Tutorial"], duration: "4 нед.", tag: "Core" },
            ]
          },
          {
            phase: "Production",
            skills: [
              { id: "docker", title: "Docker & контейнеры", description: "Контейнеризация, Docker Compose, деплой.", resources: ["Docker Docs", "Docker Mastery", "Play with Docker"], duration: "3 нед.", tag: "Pro" },
              { id: "cloud", title: "Облака (AWS/GCP)", description: "EC2, S3, Lambda, деплой в продакшн.", resources: ["AWS Free Tier", "GCP Codelabs", "Cloud Guru"], duration: "5 нед.", tag: "Pro" },
            ]
          }
        ]
      },
      mobile: {
        title: "Mobile-разработчик",
        colorClass: "amber",
        phases: [
          {
            phase: "Основы",
            skills: [
              { id: "rn-basics", title: "React Native основы", description: "Компоненты, навигация, управление состоянием на мобиле.", resources: ["RN Docs", "Expo Docs", "Academind RN"], duration: "5 нед.", tag: "Must" },
              { id: "mobile-ui", title: "Mobile UI/UX", description: "iOS HIG, Material Design, жесты, анимации.", resources: ["Apple HIG", "Material Design", "Mobbin"], duration: "3 нед.", tag: "Must" },
            ]
          },
          {
            phase: "Нативные фичи",
            skills: [
              { id: "native-api", title: "Нативные API", description: "Камера, GPS, push-уведомления, биометрия.", resources: ["RN Camera", "Expo Notifications", "RN Maps"], duration: "4 нед.", tag: "Core" },
              { id: "state-mobile", title: "State & хранилище", description: "Redux/Zustand, AsyncStorage, SQLite на мобиле.", resources: ["Zustand docs", "AsyncStorage", "WatermelonDB"], duration: "3 нед.", tag: "Core" },
            ]
          },
          {
            phase: "Публикация",
            skills: [
              { id: "appstore", title: "App Store публикация", description: "Сборка, подпись, отправка в App Store / Play Store.", resources: ["Apple Developer", "Google Play Console", "EAS Build"], duration: "2 нед.", tag: "Pro" },
              { id: "perf-mobile", title: "Mobile производительность", description: "Размер бандла, оптимизация рендера, нативные модули.", resources: ["RN Performance", "Flipper", "Hermes engine"], duration: "3 нед.", tag: "Pro" },
            ]
          }
        ]
      },
      devops: {
        title: "DevOps Инженер",
        colorClass: "orange",
        phases: [
          {
            phase: "Основы",
            skills: [
              { id: "linux-devops", title: "Linux & Bash", description: "Shell-скрипты, процессы, права, сеть.", resources: ["Linux Journey", "Bash Academy", "OverTheWire"], duration: "4 нед.", tag: "Must" },
              { id: "git-devops", title: "Git & CI/CD основы", description: "Продвинутый Git, GitHub Actions, GitLab CI.", resources: ["Pro Git book", "GitHub Actions", "GitLab CI Docs"], duration: "3 нед.", tag: "Must" },
            ]
          },
          {
            phase: "Инфраструктура",
            skills: [
              { id: "k8s", title: "Kubernetes", description: "Pods, deployments, services, ingress, Helm charts.", resources: ["K8s.io tutorials", "KodeKloud", "Helm docs"], duration: "6 нед.", tag: "Core" },
              { id: "terraform", title: "Terraform & IaC", description: "Infrastructure as Code, провайдеры, управление state.", resources: ["HashiCorp Learn", "Terraform Up & Running", "Pluralsight"], duration: "4 нед.", tag: "Core" },
            ]
          },
          {
            phase: "Production",
            skills: [
              { id: "monitoring", title: "Мониторинг & логи", description: "Prometheus, Grafana, ELK stack, алертинг.", resources: ["Prometheus Docs", "Grafana Tutorials", "Elastic Guide"], duration: "4 нед.", tag: "Pro" },
              { id: "aws-devops", title: "AWS / Cloud Pro", description: "ECS, EKS, CloudFormation, оптимизация затрат.", resources: ["AWS Solutions Architect", "A Cloud Guru", "Cloud Resume"], duration: "6 нед.", tag: "Pro" },
            ]
          }
        ]
      },
      gamedev: {
        title: "Game-разработчик",
        colorClass: "rose",
        phases: [
          {
            phase: "Основы",
            skills: [
              { id: "csharp", title: "C# & Unity основы", description: "Программирование через движок Unity.", resources: ["Unity Learn", "Brackeys YouTube", "C# Microsoft Docs"], duration: "6 нед.", tag: "Must" },
              { id: "game-math", title: "Математика для игр", description: "Векторы, матрицы, тригонометрия, физика.", resources: ["3Blue1Brown", "Real-Time Rendering", "Math for Games"], duration: "4 нед.", tag: "Must" },
            ]
          },
          {
            phase: "Геймдизайн",
            skills: [
              { id: "2d-games", title: "2D разработка", description: "Спрайты, анимации, коллизии, тайлмапы.", resources: ["Unity 2D", "GDQuest Godot", "Pixel art assets"], duration: "5 нед.", tag: "Core" },
              { id: "3d-games", title: "3D разработка", description: "Модели, освещение, материалы, камеры, физика.", resources: ["Unity 3D", "Unreal Engine Docs", "Blender Guru"], duration: "8 нед.", tag: "Core" },
            ]
          },
          {
            phase: "Специализация",
            skills: [
              { id: "shaders", title: "Шейдеры & графика", description: "HLSL/GLSL, shader graph, пост-процессинг.", resources: ["Catlike Coding", "Book of Shaders", "Ronja Shader Tutorials"], duration: "6 нед.", tag: "Pro" },
              { id: "multiplayer", title: "Мультиплеер", description: "Mirror, Netcode, серверная архитектура.", resources: ["Mirror Networking", "Photon Docs", "Gaffer on Games"], duration: "5 нед.", tag: "Pro" },
            ]
          }
        ]
      },
    },
    cards: [
      { title: "Frontend Dev", desc: "Мастер визуального мира. Создавай потрясающие интерфейсы с помощью кода и магии дизайна.", colorClass: "cyan", roadmapKey: "frontend" },
      { title: "AI Engineer", desc: "Обучай нейросети. Общайся с машинами и создавай искусственный интеллект будущего.", colorClass: "pink", roadmapKey: "ai" },
      { title: "Cybersec", desc: "Цифровой страж. Вскрывай системы, чтобы защитить их и спасти данные от хакеров.", colorClass: "purple", roadmapKey: "cybersec" },
      { title: "Data Scientist", desc: "Современный алхимик. Превращай сырые данные в золото прогнозов и находи скрытые истины.", colorClass: "blue", roadmapKey: "datascience" },
      { title: "Backend Dev",     desc: "Архитектор серверной части. API, базы данных и движок за каждым приложением.",   colorClass: "emerald", roadmapKey: "backend" },
      { title: "Mobile Dev",      desc: "Создавай iOS и Android приложения, которые миллионы носят в карманах.",           colorClass: "amber",   roadmapKey: "mobile" },
      { title: "DevOps",          desc: "Хозяин инфраструктуры. Автоматизируй всё, доставляй код быстро и надёжно.",        colorClass: "orange",  roadmapKey: "devops" },
      { title: "Game Dev",        desc: "Создавай миры. Unity, Unreal, шейдеры — превращай воображение в играбельную реальность.", colorClass: "rose", roadmapKey: "gamedev" }
    ]
  },
  mini: {
    title: "Найди свой",
    titleAccent: "идеальный путь",
    subtitle: "Ответь на 5 быстрых вопросов",
    questions: [
      { q: "Что тебя зажигает?", opts: [
        { emoji: "🎨", text: "Красивый дизайн", v: "frontend" },
        { emoji: "🤖", text: "Умные машины",    v: "ai" },
        { emoji: "🛡", text: "Решать головоломки", v: "cybersec" },
        { emoji: "📊", text: "Искать паттерны", v: "datascience" },
      ]},
      { q: "Твоя суперсила?", opts: [
        { emoji: "✨", text: "Чувство вкуса",    v: "frontend" },
        { emoji: "🧮", text: "Математика и логика", v: "ai" },
        { emoji: "🔍", text: "Внимание к деталям", v: "cybersec" },
        { emoji: "📈", text: "Видеть тренды",    v: "datascience" },
      ]},
      { q: "Идеальная суббота?", opts: [
        { emoji: "🖌", text: "Рисовать концепты", v: "frontend" },
        { emoji: "📚", text: "Читать исследования", v: "ai" },
        { emoji: "🕵", text: "Расследовать тайны", v: "cybersec" },
        { emoji: "📉", text: "Анализировать данные", v: "datascience" },
      ]},
      { q: "Какой инструмент хочешь освоить?", opts: [
        { emoji: "⚛️", text: "Figma и React",    v: "frontend" },
        { emoji: "🧠", text: "PyTorch и TensorFlow", v: "ai" },
        { emoji: "🔓", text: "Kali Linux и Burp Suite", v: "cybersec" },
        { emoji: "📊", text: "SQL и Tableau",    v: "datascience" },
      ]},
      { q: "Какой след хочешь оставить?", opts: [
        { emoji: "🌐", text: "Сделать веб красивым", v: "frontend" },
        { emoji: "🚀", text: "Строить будущее ИИ", v: "ai" },
        { emoji: "🛡️", text: "Защищать людей в сети", v: "cybersec" },
        { emoji: "💡", text: "Превращать данные в решения", v: "datascience" },
      ]},
    ],
    result: "Тебе подходит",
    cta: "Открыть роадмап",
    retake: "Пройти ещё раз",
  },
};

export default ruTranslations;
