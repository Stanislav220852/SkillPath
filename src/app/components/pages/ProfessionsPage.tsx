import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Cpu, ShieldCheck, Database, ArrowLeft, Play, X,
  Code2, Brain, Lock, BarChart3, Coffee, Zap, ArrowRight,
  Server, Smartphone, Settings, Gamepad2
} from "lucide-react";
import { LanguageContext } from "../../App";

const glassCard = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl shadow-xl";

interface ProfessionsPageProps {
  onBack: () => void;
  lang: "EN" | "RU";
  t: any;
}

export const ProfessionsPage = ({ onBack, lang, t }: ProfessionsPageProps) => {
  const { setCurrentPage, setOpenRoadmap } = useContext(LanguageContext);
  const [activeId, setActiveId] = useState("frontend");
  const [videoOpen, setVideoOpen] = useState(false);

  const professions = [
    {
      id: "frontend",
      roadmapKey: "frontend",
      title: lang === "RU" ? "Frontend-разработчик" : "Frontend Developer",
      icon: Terminal,
      desc: lang === "RU"
        ? `Frontend Developer — это специалист, который создаёт пользовательский интерфейс сайтов и веб-приложений.

Именно Frontend-разработчик отвечает за всё, что пользователи видят и с чем взаимодействуют на экране: кнопки, формы, меню, анимации, страницы и другие элементы интерфейса. Он превращает макеты дизайнеров в полноценные работающие сайты и приложения, делая их удобными, быстрыми и привлекательными.

Frontend-разработчик разрабатывает новые функции, улучшает пользовательский опыт, адаптирует сайты для мобильных устройств и следит за тем, чтобы интерфейс корректно работал в разных браузерах и на разных устройствах. Он тесно сотрудничает с дизайнерами, backend-разработчиками и менеджерами продукта, чтобы создавать качественные цифровые продукты.

Для работы Frontend-разработчик использует современные веб-технологии, такие как HTML, CSS, JavaScript и популярные фреймворки. Его задача — сделать так, чтобы пользователи могли легко и комфортно взаимодействовать с сайтом или приложением.`
        : `A Frontend Developer is a specialist who creates the user interface of websites and web applications.

Frontend Developers are responsible for everything users see and interact with on their screens: buttons, forms, menus, animations, pages, and other interface elements. They transform designers’ mockups into fully functional websites and applications, making them intuitive, fast, and visually appealing.

Frontend Developers build new features, improve user experience, adapt websites for mobile devices, and ensure that interfaces work correctly across different browsers and devices. They work closely with designers, backend developers, and product managers to create high-quality digital products.

To do this, Frontend Developers use modern web technologies such as HTML, CSS, JavaScript, and popular frameworks. Their goal is to make websites and applications easy, efficient, and enjoyable for users to interact with.`,
      skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind", "Next.js"],
      tools: ["VS Code", "Figma", "Chrome DevTools", "Git", "Vercel"],
      salaryMin: 80,
      salaryMax: 150,
      color: "cyan",
      gradient: "from-cyan-500 to-blue-600",
      videoId: "Tn6-PIqc4UM",
      dayInLife: lang === "RU"
        ? ["Ревью кода коллег утром", "Реализация новых компонентов UI", "Митинги с дизайнерами", "Дебаг и оптимизация производительности"]
        : ["Morning code reviews", "Building new UI components", "Sync with designers", "Debugging and performance tuning"],
    },
    {
      id: "ai",
      roadmapKey: "ai",
      title: lang === "RU" ? "AI/ML Инженер" : "AI/ML Engineer",
      icon: Cpu,
      desc: lang === "RU"
        ? `AI/ML Engineer — это специалист, который создаёт и внедряет системы искусственного интеллекта и машинного обучения.

AI/ML Инженер разрабатывает модели, которые способны анализировать данные, распознавать изображения и речь, понимать текст, делать прогнозы и автоматически решать сложные задачи. Именно такие специалисты стоят за современными чат-ботами, голосовыми помощниками, рекомендательными системами и генеративными AI-моделями.

В своей работе AI/ML Инженер обучает нейронные сети на больших объёмах данных, тестирует их качество, улучшает точность предсказаний и внедряет готовые решения в реальные продукты. Например, он может создать систему, которая рекомендует фильмы и товары пользователям, распознаёт объекты на фотографиях или помогает автоматизировать общение с клиентами.

Для работы используются программирование, математика, анализ данных и современные инструменты искусственного интеллекта. AI/ML Инженер находится на переднем крае технологических инноваций и участвует в создании продуктов, которые меняют способы работы, обучения и общения миллионов людей.`
        : `An AI/ML Engineer is a specialist who designs and deploys artificial intelligence and machine learning systems.

AI/ML Engineers develop models that can analyze data, recognize images and speech, understand text, make predictions, and automatically solve complex problems. These professionals are behind modern chatbots, voice assistants, recommendation engines, and generative AI applications.

In their work, AI/ML Engineers train neural networks on large datasets, evaluate model performance, improve prediction accuracy, and integrate AI solutions into real-world products. For example, they may build systems that recommend movies and products, identify objects in photos, or automate customer interactions.

To accomplish this, they use programming, mathematics, data analysis, and advanced artificial intelligence tools. AI/ML Engineers work at the forefront of technological innovation, helping create products that transform how millions of people work, learn, and communicate.`,
      skills: ["Python", "PyTorch", "TensorFlow", "LangChain", "Hugging Face", "Math", "SQL"],
      tools: ["Jupyter", "Colab", "Weights & Biases", "MLflow", "Docker"],
      salaryMin: 100,
      salaryMax: 220,
      color: "pink",
      gradient: "from-pink-500 to-rose-600",
      videoId: "aircAruvnKk",
      dayInLife: lang === "RU"
        ? ["Анализ датасетов", "Эксперименты с архитектурами моделей", "Тренировка и валидация", "Деплой моделей в продакшн"]
        : ["Analyzing datasets", "Experimenting with model architectures", "Training & validation", "Deploying models to production"],
    },
    {
      id: "cybersec",
      roadmapKey: "cybersec",
      title: lang === "RU" ? "Кибербезопасность" : "Cybersecurity Specialist",
      icon: ShieldCheck,
      desc: lang === "RU"
        ? `Специалист по кибербезопасности — это эксперт, который защищает компании, продукты и пользователей от хакерских атак, утечек данных и других цифровых угроз.

Он анализирует безопасность систем, ищет уязвимости в приложениях и инфраструктуре, расследует инциденты и разрабатывает меры защиты. Именно специалисты по кибербезопасности помогают предотвращать взломы, кражу данных и финансовые потери компаний.

В своей работе они проводят тестирование безопасности, мониторят подозрительную активность, настраивают защитные системы и проверяют, насколько надёжно защищены корпоративные сети и сервисы. Некоторые специалисты занимаются этичным хакингом и легально взламывают системы, чтобы обнаружить слабые места раньше злоумышленников.

Для работы используются сетевые технологии, операционные системы, программирование и специализированные инструменты безопасности. `
        : `A Cybersecurity Specialist is a professional who protects companies, products, and users from cyberattacks, data breaches, and other digital threats.

They analyze system security, identify vulnerabilities in applications and infrastructure, investigate security incidents, and develop protection strategies. Cybersecurity professionals play a critical role in preventing hacks, data theft, and financial losses for organizations.

In their daily work, they perform security assessments, monitor suspicious activity, configure security solutions, and evaluate how well corporate networks and services are protected. Some specialists focus on ethical hacking, legally testing systems to discover weaknesses before malicious attackers can exploit them.

To do this, they use networking technologies, operating systems, programming skills, and specialized security tools. `,
      skills: ["Linux", "Networking", "Python", "Kali", "Burp Suite", "OWASP", "Cryptography"],
      tools: ["Wireshark", "Metasploit", "Nmap", "Splunk", "TryHackMe"],
      salaryMin: 90,
      salaryMax: 180,
      color: "purple",
      gradient: "from-purple-500 to-violet-600",
      videoId: "U_P23SqJaDc",
      dayInLife: lang === "RU"
        ? ["Мониторинг угроз через SIEM", "Пентесты внутренних систем", "Расследование инцидентов", "Обучение сотрудников"]
        : ["Threat monitoring via SIEM", "Internal pentests", "Incident investigation", "Security training for staff"],
    },
    {
      id: "datascience",
      roadmapKey: "datascience",
      title: lang === "RU" ? "Data Scientist" : "Data Scientist",
      icon: Database,
      desc: lang === "RU"
        ? `Data Scientist — это специалист, который помогает компаниям принимать решения на основе данных.

Каждый день бизнес собирает огромные объёмы информации: данные о клиентах, покупках, посещениях сайта, рекламе, продажах и работе продуктов. Data Scientist анализирует эти данные, находит скрытые закономерности и превращает цифры в понятные выводы, которые помогают компании расти и зарабатывать больше.

Он изучает поведение пользователей, выявляет причины успехов и проблем, прогнозирует будущие результаты и предлагает решения для улучшения бизнес-показателей. Например, может определить, какие товары будут пользоваться спросом, почему клиенты перестают пользоваться сервисом или как увеличить продажи с помощью изменений в продукте.

Для этого Data Scientist использует методы анализа данных, статистику, программирование и технологии машинного обучения.`
        : `A Data Scientist is a professional who helps companies make data-driven decisions.

Every day, businesses collect vast amounts of information, including data about customers, purchases, website visits, advertising campaigns, sales, and product performance. Data Scientists analyze this data, uncover hidden patterns, and turn raw numbers into meaningful insights that help companies grow and increase profitability.

They study user behavior, identify the causes of successes and challenges, forecast future outcomes, and recommend solutions to improve business performance. For example, they can predict which products will be in demand, understand why customers stop using a service, or determine how product changes can drive higher sales.

To accomplish this, Data Scientists use data analysis techniques, statistics, programming, and machine learning technologies.`,
      skills: ["Python", "SQL", "Pandas", "Statistics", "Tableau", "Spark", "scikit-learn"],
      tools: ["Jupyter", "PowerBI", "Snowflake", "Airflow", "dbt"],
      salaryMin: 95,
      salaryMax: 190,
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      videoId: "X3paOmcrTjQ",
      dayInLife: lang === "RU"
        ? ["SQL-запросы и EDA", "Построение дашбордов", "Презентации стейкхолдерам", "Создание предиктивных моделей"]
        : ["SQL queries and EDA", "Building dashboards", "Presenting to stakeholders", "Creating predictive models"],
    },
    {
      id: "backend",
      roadmapKey: "backend",
      title: lang === "RU" ? "Backend-разработчик" : "Backend Developer",
      icon: Server,
      desc: lang === "RU"
        ? `Backend Developer — это специалист, который разрабатывает серверную часть сайтов и приложений.

Backend-разработчик отвечает за логику работы продукта, обработку данных, взаимодействие с базами данных и интеграцию внешних сервисов. Именно его код обеспечивает работу авторизации, платежей, личных кабинетов, уведомлений и других функций, которые пользователи используют каждый день.

В своей работе Backend Developer создаёт API, проектирует базы данных, оптимизирует производительность системы и обеспечивает её надёжность и безопасность. Он тесно взаимодействует с frontend-разработчиками, мобильными разработчиками и другими членами команды, чтобы все части продукта работали как единое целое.

Для работы используются языки программирования, серверные технологии, базы данных и облачные платформы. Backend-разработчик играет ключевую роль в создании масштабируемых и стабильных цифровых продуктов, способных обслуживать тысячи и миллионы пользователей одновременно.`
        : `A Backend Developer is a specialist who builds the server-side infrastructure of websites and applications.

Backend Developers are responsible for application logic, data processing, database interactions, and integrations with external services. Their code powers essential features such as authentication, payments, user accounts, notifications, and many other functions that users rely on every day.

In their work, Backend Developers create APIs, design databases, optimize system performance, and ensure reliability and security. They collaborate closely with frontend developers, mobile developers, and other team members to make sure all parts of a product work seamlessly together.

To accomplish this, they use programming languages, server technologies, databases, and cloud platforms. Backend Developers play a critical role in building scalable and reliable digital products capable of serving thousands or even millions of users simultaneously.`,
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST", "GraphQL", "Docker"],
      tools: ["Postman", "DBeaver", "Docker", "AWS", "Linux"],
      salaryMin: 90,
      salaryMax: 180,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-600",
      videoId: "Oe421EPjeBE",
      dayInLife: lang === "RU"
        ? ["Проектирование API эндпоинтов", "Оптимизация SQL запросов", "Код-ревью", "Деплой обновлений на серверы"]
        : ["Designing API endpoints", "Optimizing SQL queries", "Code reviews", "Deploying updates to servers"],
    },
    {
      id: "mobile",
      roadmapKey: "mobile",
      title: lang === "RU" ? "Mobile-разработчик" : "Mobile Developer",
      icon: Smartphone,
      desc: lang === "RU"
        ? `Mobile Developer — это специалист, который создаёт приложения для смартфонов и планшетов на платформах iOS и Android.

Mobile-разработчик разрабатывает пользовательские интерфейсы, реализует бизнес-логику приложений, интегрирует серверные сервисы и обеспечивает стабильную работу продукта на мобильных устройствах. Именно такие специалисты создают приложения для банков, социальных сетей, онлайн-магазинов, сервисов доставки и других популярных цифровых продуктов.

В своей работе Mobile-разработчик проектирует новые функции, оптимизирует производительность приложений, тестирует их на различных устройствах и следит за качеством пользовательского опыта. Он тесно сотрудничает с дизайнерами, backend-разработчиками и менеджерами продукта, чтобы создавать удобные и современные мобильные решения.

Для работы используются языки программирования, мобильные фреймворки и инструменты разработки для iOS и Android. Mobile-разработчик участвует в создании приложений, которыми ежедневно пользуются миллионы людей по всему миру.`
        : `A Mobile Developer is a specialist who builds applications for smartphones and tablets on iOS and Android platforms.

Mobile Developers create user interfaces, implement application logic, integrate backend services, and ensure that products run smoothly across mobile devices. These professionals are responsible for developing apps used in banking, social media, e-commerce, food delivery, and many other digital services.

In their work, Mobile Developers design new features, optimize application performance, test products on different devices, and focus on delivering a high-quality user experience. They collaborate closely with designers, backend developers, and product managers to build modern and user-friendly mobile solutions.

To accomplish this, they use programming languages, mobile frameworks, and development tools for iOS and Android. Mobile Developers help create applications that millions of people use every day around the world.`,
      skills: ["React Native", "Swift", "Kotlin", "Expo", "Firebase", "Redux"],
      tools: ["Xcode", "Android Studio", "Figma", "TestFlight", "Sentry"],
      salaryMin: 95,
      salaryMax: 185,
      color: "amber",
      gradient: "from-amber-500 to-orange-600",
      videoId: "0-S5a0eXPoc",
      dayInLife: lang === "RU"
        ? ["Реализация новых экранов", "Тестирование на разных девайсах", "Публикация в App Store", "Работа с push-уведомлениями"]
        : ["Building new screens", "Testing on different devices", "App Store publishing", "Working with push notifications"],
    },
    {
      id: "devops",
      roadmapKey: "devops",
      title: lang === "RU" ? "DevOps Инженер" : "DevOps Engineer",
      icon: Settings,
      desc: lang === "RU"
        ? `DevOps Engineer — это специалист, который отвечает за автоматизацию, надёжность и бесперебойную работу IT-инфраструктуры.

DevOps Инженер помогает командам быстрее разрабатывать, тестировать и выпускать программные продукты. Он настраивает процессы автоматической сборки и доставки кода, управляет серверами, облачными платформами и следит за стабильностью работы сервисов.

В своей работе DevOps Инженер создаёт CI/CD-пайплайны, автоматизирует развёртывание приложений, настраивает контейнеризацию и оркестрацию сервисов, а также занимается мониторингом и устранением технических проблем. Благодаря его работе новые версии продуктов могут выпускаться быстро, безопасно и без простоев.

Для работы используются Linux, Docker, Kubernetes, облачные платформы и инструменты автоматизации. DevOps Инженер играет важную роль в создании масштабируемой инфраструктуры, способной поддерживать современные цифровые продукты и миллионы пользователей.`
        : `A DevOps Engineer is a specialist responsible for automation, reliability, and the smooth operation of IT infrastructure.

DevOps Engineers help teams build, test, and release software products more efficiently. They manage servers, cloud platforms, and deployment processes while ensuring that services remain stable, secure, and highly available.

In their daily work, DevOps Engineers create CI/CD pipelines, automate application deployments, configure containerization and orchestration platforms, and monitor systems to identify and resolve technical issues. Their work enables organizations to deliver new product updates quickly, safely, and with minimal downtime.

To accomplish this, they use Linux, Docker, Kubernetes, cloud platforms, and infrastructure automation tools. DevOps Engineers play a key role in building scalable infrastructure capable of supporting modern digital products and millions of users worldwide.`,
      skills: ["Linux", "Docker", "Kubernetes", "Terraform", "AWS", "Jenkins", "Bash"],
      tools: ["Grafana", "Prometheus", "GitLab CI", "Ansible", "Helm"],
      salaryMin: 110,
      salaryMax: 200,
      color: "orange",
      gradient: "from-orange-500 to-red-600",
      videoId: "j5Zsa_eOXeY",
      dayInLife: lang === "RU"
        ? ["Мониторинг продакшн-серверов", "Настройка CI/CD пайплайнов", "Деплой через Kubernetes", "Оптимизация облачных затрат"]
        : ["Monitoring production servers", "Setting up CI/CD pipelines", "Deploying via Kubernetes", "Optimizing cloud costs"],
    },
    {
      id: "gamedev",
      roadmapKey: "gamedev",
      title: lang === "RU" ? "Game-разработчик" : "Game Developer",
      icon: Gamepad2,
      desc: lang === "RU"
        ? `Game-разработчик — это специалист, который создаёт видеоигры, превращая идеи и концепции в интерактивные игровые миры.

Game-разработчик работает над игровой логикой, механиками, персонажами, физикой объектов и другими элементами, которые делают игру увлекательной и интересной для игроков. Он участвует в разработке как небольших мобильных игр, так и масштабных проектов для ПК, консолей и других платформ.

В своей работе Game-разработчик реализует игровые механики, оптимизирует производительность, интегрирует графику и анимации, а также тесно сотрудничает с художниками, дизайнерами уровней и другими членами команды. Его задача — создать качественный игровой опыт, который будет удерживать внимание игроков и дарить яркие эмоции.

Для работы используются игровые движки, языки программирования, инструменты 3D-графики и современные технологии разработки. Game-разработчик участвует в создании проектов, которыми ежедневно наслаждаются миллионы игроков по всему миру.`
        : `A Game Developer is a specialist who creates video games, transforming ideas and concepts into interactive digital worlds.

Game Developers work on gameplay logic, mechanics, characters, physics systems, and other elements that make games engaging and enjoyable. They contribute to projects ranging from small mobile games to large-scale titles for PC, consoles, and other platforms.

In their work, Game Developers implement gameplay features, optimize performance, integrate graphics and animations, and collaborate closely with artists, level designers, and other team members. Their goal is to create high-quality gaming experiences that captivate players and deliver memorable experiences.

To accomplish this, they use game engines, programming languages, 3D graphics tools, and modern development technologies. Game Developers help create products enjoyed by millions of players around the world every day.`,
      skills: ["C#", "Unity", "Unreal", "C++", "Blender", "Shaders", "Math"],
      tools: ["Unity Editor", "Visual Studio", "Blender", "Photoshop", "Git LFS"],
      salaryMin: 75,
      salaryMax: 160,
      color: "rose",
      gradient: "from-rose-500 to-pink-600",
      videoId: "XtQMytORBmM",
      dayInLife: lang === "RU"
        ? ["Программирование игровой механики", "Работа с 3D-моделями", "Оптимизация производительности", "Плейтесты с командой"]
        : ["Programming game mechanics", "Working with 3D models", "Performance optimization", "Playtesting with the team"],
    },
  ];

  const active = professions.find((p) => p.id === activeId)!;
  const Icon = active.icon;

  const goToRoadmap = () => {
    setOpenRoadmap(active.roadmapKey);
    setCurrentPage("roadmaps");
  };

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-20 px-5 md:px-6 relative overflow-hidden">
      {/* background blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
            <span className="text-slate-900 dark:text-white">{t.profPage.title1}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-400">
              {t.profPage.title2}
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl max-w-2xl mx-auto">
            {t.profPage.subtitle}
          </p>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
          {/* LEFT — list: горизонтальная лента на мобилке, sticky-колонка на десктопе */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-5 px-5 lg:mx-0 lg:px-0 lg:sticky lg:top-32 lg:self-start snap-x">
            {professions.map((p) => {
              const ItemIcon = p.icon;
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={`flex-shrink-0 lg:flex-shrink min-w-[240px] lg:min-w-0 lg:w-full snap-start text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3
                    ${isActive
                      ? `bg-gradient-to-r ${p.gradient} border-transparent text-white shadow-lg`
                      : "bg-white/60 dark:bg-white/5 border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 text-slate-700 dark:text-slate-200"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? "bg-white/20" : `bg-${p.color}-500/10`}`}>
                    <ItemIcon className={`w-5 h-5 ${isActive ? "text-white" : `text-${p.color}-500 dark:text-${p.color}-400`}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{p.title}</p>
                    <p className={`text-xs ${isActive ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
                      ${p.salaryMin}k – ${p.salaryMax}k
                    </p>
                  </div>
                  {isActive && <ArrowRight className="w-4 h-4 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* RIGHT — details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-5 md:space-y-6"
            >
              {/* Video preview */}
              <div className={`${glassCard} p-0 overflow-hidden relative aspect-video group cursor-pointer`}
                   onClick={() => setVideoOpen(true)}>
                <div className={`absolute inset-0 bg-gradient-to-br ${active.gradient} opacity-30`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 md:gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 dark:bg-white/95 flex items-center justify-center shadow-2xl group-hover:shadow-cyan-500/50 transition-shadow"
                  >
                    <Play className="w-7 h-7 md:w-8 md:h-8 text-slate-900 ml-1" fill="currentColor" />
                  </motion.div>
                  <p className="text-white font-bold text-base md:text-lg drop-shadow-lg">
                    {t.profPage.watchVideo}
                  </p>
                </div>
                {/* big bg icon */}
                <Icon className="absolute -bottom-8 -right-8 w-40 h-40 md:w-48 md:h-48 text-white/10" />
              </div>

              {/* Title block */}
              <div className={`${glassCard} p-6 md:p-8`}>
                <div className="flex items-start gap-4 md:gap-5 mb-5">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${active.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">{active.title}</h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base whitespace-pre-line">
  {active.desc}
</p>
                  </div>
                </div>
              </div>

              {/* Salary visual */}
              <div className={`${glassCard} p-6 md:p-8`}>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                  {t.profPage.salary}
                </p>
                <div className="flex items-baseline gap-2 mb-4 flex-wrap">
                  <span className={`text-3xl md:text-4xl font-black text-${active.color}-600 dark:text-${active.color}-400`}>
                    ${active.salaryMin}k
                  </span>
                  <span className="text-slate-400">–</span>
                  <span className={`text-3xl md:text-4xl font-black text-${active.color}-600 dark:text-${active.color}-400`}>
                    ${active.salaryMax}k
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">/ year</span>
                </div>
                <div className="relative h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${active.gradient} rounded-full`}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>{t.profPage.juniorLabel}</span>
                  <span>Mid</span>
                  <span>{t.profPage.seniorLabel}</span>
                </div>
              </div>

              {/* Skills tags */}
              <div className={`${glassCard} p-6 md:p-8`}>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                  {t.profPage.skills}
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold border bg-${active.color}-500/10 text-${active.color}-700 dark:text-${active.color}-300 border-${active.color}-500/20`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Day in life + Tools */}
              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                <div className={`${glassCard} p-6 md:p-8`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Coffee className={`w-5 h-5 text-${active.color}-500 dark:text-${active.color}-400`} />
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      {t.profPage.dayInLife}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {active.dayInLife.map((task, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${active.color}-500 mt-2 flex-shrink-0`} />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${glassCard} p-6 md:p-8`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className={`w-5 h-5 text-${active.color}-500 dark:text-${active.color}-400`} />
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      {t.profPage.tools}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goToRoadmap}
                className={`w-full p-5 md:p-6 rounded-3xl bg-gradient-to-r ${active.gradient} text-white font-black text-base md:text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-shadow`}
              >
                {t.profPage.openRoadmap}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Back button */}
        <div className="text-center mt-12 md:mt-16">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-bold"
          >
            <ArrowLeft className="w-5 h-5" /> {t.profPage.back}
          </button>
        </div>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1`}
                title={active.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
