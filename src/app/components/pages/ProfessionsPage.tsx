import { useState, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal, Cpu, ShieldCheck, Database, ArrowLeft, Play, X,
  Code2, Brain, Lock, BarChart3, Coffee, Zap, ArrowRight,
  Server, Smartphone, Settings, Gamepad2  // 🆕 добавь это
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
        ? "Создавайте интерактивные пользовательские интерфейсы. Превращайте идеи дизайнеров в работающие сайты, которые видят миллионы людей."
        : "Build interactive user interfaces. Turn designer mockups into live websites that millions of people use every day.",
      skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind", "Next.js"],
      tools: ["VS Code", "Figma", "Chrome DevTools", "Git", "Vercel"],
      salaryMin: 80,
      salaryMax: 150,
      color: "cyan",
      gradient: "from-cyan-500 to-blue-600",
      videoId: "Tn6-PIqc4UM", // React intro
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
        ? "Обучайте нейросети, создавайте чат-ботов, рекомендательные системы и генеративный AI. Самая горячая профессия 2025."
        : "Train neural networks, build chatbots, recommendation systems and generative AI. The hottest career of 2025.",
      skills: ["Python", "PyTorch", "TensorFlow", "LangChain", "Hugging Face", "Math", "SQL"],
      tools: ["Jupyter", "Colab", "Weights & Biases", "MLflow", "Docker"],
      salaryMin: 100,
      salaryMax: 220,
      color: "pink",
      gradient: "from-pink-500 to-rose-600",
      videoId: "aircAruvnKk", // 3Blue1Brown neural networks
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
        ? "Защищайте компании от хакеров, взламывайте системы легально, находите уязвимости и зарабатывайте через bug bounty."
        : "Defend companies from hackers, hack systems legally, find vulnerabilities and earn through bug bounty programs.",
      skills: ["Linux", "Networking", "Python", "Kali", "Burp Suite", "OWASP", "Cryptography"],
      tools: ["Wireshark", "Metasploit", "Nmap", "Splunk", "TryHackMe"],
      salaryMin: 90,
      salaryMax: 180,
      color: "purple",
      gradient: "from-purple-500 to-violet-600",
      videoId: "U_P23SqJaDc", // cybersec intro
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
        ? "Превращайте сырые данные в бизнес-решения. A/B тесты, дашборды, предсказания продаж и поведения пользователей."
        : "Turn raw data into business decisions. A/B tests, dashboards, sales forecasts and user behavior predictions.",
      skills: ["Python", "SQL", "Pandas", "Statistics", "Tableau", "Spark", "scikit-learn"],
      tools: ["Jupyter", "PowerBI", "Snowflake", "Airflow", "dbt"],
      salaryMin: 95,
      salaryMax: 190,
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      videoId: "X3paOmcrTjQ", // data science intro
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
        ? "Создавайте серверы, API и базы данных. Невидимая часть веба, которая держит все приложения."
        : "Build servers, APIs and databases. The invisible part of the web that powers every application.",
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
        ? "Создавайте приложения для iOS и Android. Миллионы людей будут носить ваши продукты в карманах."
        : "Build iOS and Android applications. Millions will carry your products in their pockets every day.",
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
        ? "Автоматизируйте инфраструктуру. CI/CD пайплайны, Kubernetes, облака. Делайте деплой одним кликом."
        : "Automate infrastructure. CI/CD pipelines, Kubernetes, cloud platforms. Deploy with one click.",
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
        ? "Создавайте миры. Unity, Unreal, шейдеры, физика — превращайте воображение в играбельную реальность."
        : "Create worlds. Unity, Unreal, shaders, physics — turn imagination into playable reality.",
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
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* background blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-6">
            <span className="text-slate-900 dark:text-white">{t.profPage.title1}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-400">
              {t.profPage.title2}
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xl max-w-2xl mx-auto">
            {t.profPage.subtitle}
          </p>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* LEFT — list */}
          <div className="lg:sticky lg:top-32 lg:self-start space-y-3">
            {professions.map((p) => {
              const ItemIcon = p.icon;
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3
                    ${isActive
                      ? `bg-gradient-to-r ${p.gradient} border-transparent text-white shadow-lg`
                      : "bg-white/60 dark:bg-white/5 border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 text-slate-700 dark:text-slate-200"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                    ${isActive ? "bg-white/20" : `bg-${p.color}-500/10`}`}>
                    <ItemIcon className={`w-5 h-5 ${isActive ? "text-white" : `text-${p.color}-500 dark:text-${p.color}-400`}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{p.title}</p>
                    <p className={`text-xs ${isActive ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
                      ${p.salaryMin}k – ${p.salaryMax}k
                    </p>
                  </div>
                  {isActive && <ArrowRight className="w-4 h-4" />}
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
              className="space-y-6"
            >
              {/* Video preview */}
              <div className={`${glassCard} p-0 overflow-hidden relative aspect-video group cursor-pointer`}
                   onClick={() => setVideoOpen(true)}>
                <div className={`absolute inset-0 bg-gradient-to-br ${active.gradient} opacity-30`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-white/90 dark:bg-white/95 flex items-center justify-center shadow-2xl group-hover:shadow-cyan-500/50 transition-shadow"
                  >
                    <Play className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" />
                  </motion.div>
                  <p className="text-white font-bold text-lg drop-shadow-lg">
                    {t.profPage.watchVideo}
                  </p>
                </div>
                {/* big bg icon */}
                <Icon className="absolute -bottom-8 -right-8 w-48 h-48 text-white/10" />
              </div>

              {/* Title block */}
              <div className={`${glassCard} p-8`}>
                <div className="flex items-start gap-5 mb-5">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${active.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{active.title}</h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{active.desc}</p>
                  </div>
                </div>
              </div>

              {/* Salary visual */}
              <div className={`${glassCard} p-8`}>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                  {t.profPage.salary}
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className={`text-4xl font-black text-${active.color}-600 dark:text-${active.color}-400`}>
                    ${active.salaryMin}k
                  </span>
                  <span className="text-slate-400">–</span>
                  <span className={`text-4xl font-black text-${active.color}-600 dark:text-${active.color}-400`}>
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
              <div className={`${glassCard} p-8`}>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                  {t.profPage.skills}
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 rounded-full text-sm font-bold border bg-${active.color}-500/10 text-${active.color}-700 dark:text-${active.color}-300 border-${active.color}-500/20`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Day in life + Tools */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`${glassCard} p-8`}>
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

                <div className={`${glassCard} p-8`}>
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
                className={`w-full p-6 rounded-3xl bg-gradient-to-r ${active.gradient} text-white font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-shadow`}
              >
                {t.profPage.openRoadmap}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Back button */}
        <div className="text-center mt-16">
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
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors flex items-center justify-center text-white"
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