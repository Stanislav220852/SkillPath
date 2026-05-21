
  # High-end UI/UX landing page

  This is a code bundle for High-end UI/UX landing page. The original project is available at https://www.figma.com/design/btYUEDKzppqCWt2RUMcmHP/High-end-UI-UX-landing-page.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  import React, { useEffect, useState, createContext, useContext } from "react";

import { motion } from "motion/react";
import { ThemeProvider, useTheme } from "next-themes";
import { 
  Code2, 
  Cpu, 
  ShieldAlert, 
  Database, 
  Sparkles, 
  ChevronRight,
  Terminal,
  Layers,
  ArrowRight,
  Sun,
  Moon
} from "lucide-react";
import { Quiz } from "./components/QuizQuest.tsx";

// --- ДАННЫЕ ПЕРЕВОДОВ ---
const translations = {
  EN: {
    nav: { profs: "Professions", roads: "Roadmaps", mentors: "Mentors", login: "Login" },
    hero: {
      badge: "SkillPath Beta 2.0",
      t1: "Choose Your",
      t2: "Future Class",
      t3: "In Tech",
      desc: "Interactive guide for youth IT academy. Find the profession that fits your vibe. Whether you love breaking things or building them—start your journey here.",
      btnQuest: "Start Your Quest",
      btnRoles: "Explore Roles"
    },
    roles: {
      t: "Select Your",
      ts: "Character Class",
      d: "Discover the paths available in the tech realm. Each class has unique abilities, tools, and a specialized skill tree.",
      f: { t: "Frontend Dev", d: "Master of the visual realm. Create stunning UI/UX with code and design magic." },
      ai: { t: "AI Engineer", d: "Train neural networks. Speak to machines and build the artificial minds of tomorrow." },
      cs: { t: "Cybersec", d: "The digital guardian. Hack systems to patch them and protect data from dark hats." },
      ds: { t: "Data Scientist", d: "The modern alchemist. Turn raw data into predictive gold and uncover hidden truths." },
      view: "View Roadmap"
    },
    steps: {
      t: "How to begin your",
      ts: "Adventure",
      s1: { t: "Take the Aptitude Test", d: "A quick 5-minute interactive quiz to analyze your vibe, interests, and logic style." },
      s2: { t: "Get Your Roadmap", d: "Unlock a personalized skill tree with curated tutorials, quests, and mini-projects." },
      s3: { t: "Level Up & Connect", d: "Join guilds (cohorts), find mentors, and build a portfolio to showcase your skills." }
    },
    footer: {
      desc: "Empowering the next generation of builders, hackers, and creators. Start your tech journey today."
    },
    profPage: {
      title1: "Tech",
      title2: "Professions",
      subtitle: "Explore all available career paths in the tech industry",
      skills: "Key Skills",
      salary: "Salary Range",
    }
  },
  RU: {
    nav: { profs: "Профессии", roads: "Роадмапc", mentors: "Менторы", login: "Войти" },
    hero: {
      badge: "SkillPath Бета 2.0",
      t1: "Выбери свой",
      t2: "Класс Будущего",
      t3: "В IT",
      desc: "Интерактивный гид по IT-академии. Найди профессию, которая подходит именно тебе. Любишь ли ты создавать или проверять на прочность — начни свой путь здесь.",
      btnQuest: "Начать тест",
      btnRoles: "Все Роли"
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
      s1: { t: "Пройти тест", d: "Быстрый 5-минутный интерактивный квиз для анализа твоих интересов и стиля мышления." },
      s2: { t: "Получить Roadmap", d: "Открой персональное дерево навыков с подборкой туториалов, квестов и мини-проектов." },
      s3: { t: "Прокачаться", d: "Вступай в сообщества, находи менторов и создавай портфолио, чтобы показать свои скиллы." }
    },
    footer: {
      desc: "Даем возможности новому поколению строителей, хакеров и творцов. Начни свое IT-путешествие сегодня."
    },
    profPage: {
      title1: "Tech",
      title2: "Профессии",
      subtitle: "Изучите все доступные карьерные пути в технологической индустрии",
      skills: "Ключевые навыки",
      salary: "Зарплатная вилка",
    },
  }
};

const LanguageContext = createContext('ru');

const glassCard = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]";
const neonCyan = "text-cyan-500 dark:text-cyan-400 dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]";
const neonPink = "text-pink-500 dark:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-slate-700 dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all backdrop-blur-md"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

const LanguageToggle = () => {
  const { lang, setLang } = useContext(LanguageContext);
  const cycleLang = () => {
    const order = ["EN", "RU"];
    const next = order[(order.indexOf(lang) + 1) % order.length];
    setLang(next);
  };
  return (
    <button
      onClick={cycleLang}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-slate-700 dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all backdrop-blur-md font-bold text-xs"
    >
      {lang}
    </button>
  );
};

const Hero = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  const { t } = useContext(LanguageContext);
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden pb-20">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-pink-500 dark:text-pink-400" />
            <span className="text-sm font-medium tracking-wide text-slate-600 dark:text-white/80">{t.hero.badge}</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
            {t.hero.t1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">{t.hero.t2}</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-500 dark:to-purple-500">{t.hero.t3}</span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-white/60 max-w-xl leading-relaxed">
            {t.hero.desc}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartQuiz}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold tracking-wide shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center gap-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all"
            >
              {t.hero.btnQuest}
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold tracking-wide hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2"
            >
              {t.hero.btnRoles}
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] w-full flex items-center justify-center"
        >
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute z-20 p-6 w-[320px] ${glassCard} border-t-black/10 dark:border-t-white/20 border-l-black/10 dark:border-l-white/20`}
          >
            <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative group">
              <img 
                src="https://images.unsplash.com/photo-1680783954745-3249be59e527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHJvYm90JTIwbmVvbiUyMGN5YW4lMjBwaW5rfGVufDF8fHx8MTc3ODgyNzEwMHww&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="3D Robot" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-[#0b1120] to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-cyan-300 dark:text-cyan-400 uppercase tracking-wider mb-1">AI Engineer</p>
                    <p className="text-sm text-white font-medium">Lvl 1 Novice</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center backdrop-blur-md border border-cyan-500/50">
                    <Cpu className={`w-4 h-4 text-cyan-300 dark:text-cyan-400`} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-500 h-full rounded-full"
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-white/50 text-right">45% to Lvl 2</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10], x: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className={`absolute -left-12 top-20 z-30 p-4 ${glassCard} flex items-center gap-4`}
          >
            <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center border border-pink-200 dark:border-pink-500/30">
              <Code2 className={`w-6 h-6 ${neonPink}`} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">Frontend</p>
              <p className="text-xs text-slate-500 dark:text-white/60">UI/UX Magic</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [-15, 15, -15], x: [5, -5, 5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className={`absolute -right-8 bottom-32 z-10 p-4 ${glassCard} flex items-center gap-4`}
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center border border-purple-200 dark:border-purple-500/30">
              <ShieldAlert className="w-6 h-6 text-purple-500 dark:text-purple-400 dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">Cybersec</p>
              <p className="text-xs text-slate-500 dark:text-white/60">Defense Arts</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const RoleCard = ({ icon: Icon, title, desc, colorClass }) => {
  const { t } = useContext(LanguageContext);
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`p-8 ${glassCard} relative overflow-hidden group hover:border-${colorClass}-400/50 dark:hover:border-${colorClass}-500/50 transition-all duration-300`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${colorClass}-500/5 dark:bg-${colorClass}-500/10 rounded-full blur-[40px] group-hover:bg-${colorClass}-500/10 dark:group-hover:bg-${colorClass}-500/20 transition-all`} />
      
      <div className={`w-16 h-16 rounded-2xl bg-${colorClass}-500/10 flex items-center justify-center mb-6 border border-${colorClass}-500/20 relative z-10`}>
        <Icon className={`w-8 h-8 text-${colorClass}-500 dark:text-${colorClass}-400 dark:drop-shadow-[0_0_10px_rgba(var(--${colorClass}-400),0.8)]`} />
      </div>
      
      <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white relative z-10">{title}</h3>
      <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-6 relative z-10 min-h-[60px]">
        {desc}
      </p>
      
      <button className="text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all text-slate-800 dark:text-white relative z-10">
        <span>{t.roles.view}</span>
        <ArrowRight className={`w-4 h-4 text-${colorClass}-500 dark:text-${colorClass}-400`} />
      </button>
    </motion.div>
  );
};

const RolesSection = () => {
  const { t } = useContext(LanguageContext);
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">
            {t.roles.t} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-500">{t.roles.ts}</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60">{t.roles.d}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RoleCard icon={Terminal} title={t.roles.f.t} desc={t.roles.f.d} colorClass="cyan" />
          <RoleCard icon={Cpu} title={t.roles.ai.t} desc={t.roles.ai.d} colorClass="pink" />
          <RoleCard icon={ShieldAlert} title={t.roles.cs.t} desc={t.roles.cs.d} colorClass="purple" />
          <RoleCard icon={Database} title={t.roles.ds.t} desc={t.roles.ds.d} colorClass="blue" />
        </div>
      </div>
    </section>
  );
};

const StepsSection = () => {
  const { t } = useContext(LanguageContext);
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
              {t.steps.t} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">{t.steps.ts}</span>
            </h2>
            
            <div className="space-y-6">
              {[t.steps.s1, t.steps.s2, t.steps.s3].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  key={i} 
                  className={`p-6 ${glassCard} flex gap-6 items-start`}
                >
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-pink-500 drop-shadow-sm">
                    0{i+1}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.t}</h4>
                    <p className="text-sm text-slate-600 dark:text-white/60">{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative">
             <div className={`p-2 ${glassCard} rounded-[3rem]`}>
               <img 
                 src="https://images.unsplash.com/photo-1634715841611-67741dc71459?auto=format&fit=crop&q=80&w=600" 
                 alt="Future Tech" 
                 className="w-full h-auto rounded-[2.5rem]"
               />
             </div>
             
             {/* Floating decorative elements */}
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full border border-dashed border-cyan-500/20 dark:border-cyan-500/30 flex items-center justify-center"
             >
                <div className="w-16 h-16 rounded-full border border-solid border-pink-500/20" />
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Navbar = () => {
  const { t } = useContext(LanguageContext);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="container mx-auto flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group hover:opacity-90 transition-opacity outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">SkillPath</span>
        </button>
        
        <div className="hidden md:flex items-center gap-8 px-8 py-3 rounded-full bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white transition-colors">{t.nav.profs}</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white transition-colors">{t.nav.roads}</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white transition-colors">{t.nav.mentors}</a>
        </div>
        
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <button className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white/10 border border-transparent dark:border-white/20 text-white font-bold text-sm hover:bg-slate-800 dark:hover:bg-white/20 transition-all backdrop-blur-md">
            {t.nav.login}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { t } = useContext(LanguageContext);
  return (
    <footer className="border-t border-black/5 dark:border-white/10 py-12 relative z-10 bg-black/[0.01] dark:bg-white/[0.02]">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 text-slate-900 dark:text-white">
          <Layers className={`w-6 h-6 ${neonCyan}`} />
          <span className="text-2xl font-black tracking-tight">SkillPath</span>
        </div>
        <p className="text-slate-500 dark:text-white/50 mb-8 max-w-md mx-auto">{t.footer.desc}</p>
        <div className="flex items-center justify-center gap-6 text-slate-400 dark:text-white/40">
          <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Twitter</a>
          <a href="#" className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors">Discord</a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

const Content = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const { lang } = useContext(LanguageContext);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <Navbar />
      <main>
        {showQuiz ? (
          <Quiz onExit={() => setShowQuiz(false)} lang={lang} /> 
        ) : (
          <>
            <Hero onStartQuiz={() => setShowQuiz(true)} />
            <RolesSection />
            <StepsSection />
          </>
        )}
      </main>
      {!showQuiz && <Footer />}
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState("EN");
  const t = translations[lang];
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        <Content />
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}









