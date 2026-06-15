import React, { useEffect, useState, createContext, useContext, lazy, Suspense } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
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
  Menu,
  X,
  ArrowUp,
  ChevronDown,
} from "lucide-react";
import { MouseSpotlight } from "./components/utils/MouseSpotlight.tsx";
import { BentoShowcase } from "./components/utils/BentoShowcase.tsx";
import { StatsSection } from "./components/utils/StatsSection.tsx";
import { TechMarquee } from "./components/utils/TechMarquee.tsx";
import { TextScramble } from "./components/utils/TextScramble.tsx";
import { TiltCard } from "./components/utils/TiltCard.tsx";
import { MagneticButton } from "./components/utils/MagneticButton.tsx";
import { AnimatedGrid } from "./components/utils/AnimatedGrid.tsx";
import { CompaniesStrip } from "./components/utils/CompaniesStrip.tsx";
import { TestimonialsCarousel } from "./components/utils/TestimonialsCarousel.tsx";
import { FAQAccordion } from "./components/utils/FAQAccordion.tsx";
import { PricingTable } from "./components/utils/PricingTable.tsx";
import { MiniQuiz } from "./components/utils/MiniQuiz.tsx";
import { BootstrapInfo } from "./components/utils/BootstrapInfo.tsx";
import { 
  Instagram, 
  Send, // для Telegram
  Youtube, 
  Github,
  Mail,
  Phone,
   Server,       // ← добавить
  Smartphone,   // ← добавить
  Gamepad2
} from "lucide-react";
import { AuthModal } from "./components/utils/AuthModal.tsx";
import { FloatingParticles } from "./components/utils/FloatingParticles.tsx";
import { ThemeSwitcher } from "./components/utils/ThemeSwitcher.tsx";
import { ThemeEffects } from "./components/utils/ThemeEffects.tsx";
import { MusicPlayer } from "./components/utils/MusicPlayer.tsx";
import { emitMusicState } from "./components/utils/emitMusicState.ts";
import { themes, themeLabels, type ThemeId, type ThemeColors } from "./theme.config.ts";
import enTranslations from "./translations/en";
import ruTranslations from "./translations/ru";
import * as API from "./api"

const RoadmapsPage = lazy(() => import("./components/pages/RoadmapsPage.tsx").then(m => ({ default: m.RoadmapsPage })));
const MentorsPage = lazy(() => import("./components/pages/MentorsPage.tsx").then(m => ({ default: m.MentorsPage })));
const AdminLogin = lazy(() => import("./components/pages/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./components/pages/AdminDashboard.tsx"));
const AdminUsers = lazy(() => import("./components/pages/AdminUsers.tsx"));
const AdminMentors = lazy(() => import("./components/pages/AdminMentors.tsx"));
const AdminBookings = lazy(() => import("./components/pages/AdminBookings.tsx"));
const AdminSettings = lazy(() => import("./components/pages/AdminSettings.tsx"));
const MentorDashboard = lazy(() => import("./components/pages/MentorDashboard.tsx"));
const ChatsPage = lazy(() => import("./components/pages/ChatsPage.tsx"));
const Presentation = lazy(() => import("./presentation/Presentation.tsx").then(m => ({ default: m.Presentation })));
const Quiz = lazy(() => import("./components/utils/QuizQuest.tsx").then(m => ({ default: m.Quiz })));
const ProfessionsPage = lazy(() => import("./components/pages/ProfessionsPage.tsx").then(m => ({ default: m.ProfessionsPage })));
const SkillLearningPage = lazy(() => import("./components/pages/SkillLearningPage.tsx").then(m => ({ default: m.SkillLearningPage })));
const ProfilePage = lazy(() => import("./components/pages/ProfilePage.tsx").then(m => ({ default: m.ProfilePage })));
const GuideCharacter = lazy(() => import("./components/utils/GuideCharacter.tsx").then(m => ({ default: m.GuideCharacter })));


// --- ДАННЫЕ ПЕРЕВОДОВ ---
const translations = { EN: enTranslations, RU: ruTranslations } as const;

type Lang = "EN" | "RU";
interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.EN;
  currentPage: string;
  setCurrentPage: (p: string) => void;
  openRoadmap: string | null;
  setOpenRoadmap: (k: string | null) => void;
  colorTheme: ThemeId;
  setColorTheme: (t: ThemeId) => void;
  colors: ThemeColors;
}

export const LanguageContext = createContext<LangCtx>({
  lang: 'RU',
  setLang: () => {},
  t: translations.EN,
  currentPage: 'home',
  setCurrentPage: () => {},
  openRoadmap: null,
  setOpenRoadmap: () => {},
  colorTheme: 'purple',
  setColorTheme: () => {},
  colors: themes.purple,
});

const glassCard = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]";
const neonCyan = "text-[#8AA8FF] dark:text-[#8AA8FF] dark:drop-shadow-[0_0_8px_rgba(138,168,255,0.8)]";
const neonPink = "text-[#FF9800] dark:drop-shadow-[0_0_8px_rgba(255,152,0,0.8)]";

/* ────────────────────────────────────────────────────────────
   useMediaQuery — определяем мобилку для условного рендера
──────────────────────────────────────────────────────────── */
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const handler = () => setMatches(m.matches);
    handler();
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [query]);
  return matches;
};

const LanguageToggle = () => {
  const { lang, setLang } = useContext(LanguageContext);
  const cycleLang = () => {
    const order: Lang[] = ["EN", "RU"];
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
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-28 md:pt-24 overflow-hidden pb-16 md:pb-20">
      <AnimatedGrid />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none" style={{backgroundColor: "rgba(var(--tp-rgb),0.08)"}} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none" style={{backgroundColor: "rgba(var(--ta-rgb),0.06)"}} />
      <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] rounded-full blur-[100px] pointer-events-none" style={{backgroundColor: "rgba(var(--tpd-rgb),0.1)"}} />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 md:space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#FF9800] dark:text-[#FF9800]" />
            <TextScramble
              text={t.hero.badge}
              className="text-sm font-medium tracking-wide text-slate-600 dark:text-white/80"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-[#00000F] dark:text-white">
            {t.hero.t1} <br />
            <span className="text-[var(--tp)]">{t.hero.t2}</span> <br />
            <span className="text-[var(--ta)]">{t.hero.t3}</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {t.hero.desc}
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartQuiz}
              className="px-6 md:px-8 py-3.5 md:py-4 rounded-full text-white font-bold tracking-wide flex items-center gap-2 transition-all duration-300"
              style={{background: "linear-gradient(to right, var(--tp), var(--tp-dark), var(--ta))", boxShadow: "0 0_20px_rgba(var(--tp-rgb),0.35)"}}
            >
              {t.hero.btnQuest}
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold tracking-wide hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2"
            >
              {t.hero.btnRoles}
            </motion.button>
          </div>
        </motion.div>

        {/* Декоративная сцена — скрыта на мобилке, чтобы не растягивать экран */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] w-full hidden lg:flex items-center justify-center"
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
                    <p className="text-xs font-bold text-[#8AA8FF] dark:text-[#8AA8FF] uppercase tracking-wider mb-1">AI Engineer</p>
                    <p className="text-sm text-white font-medium">Lvl 1 Novice</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#8AA8FF]/20 flex items-center justify-center backdrop-blur-md border border-[#8AA8FF]/50">
                    <Cpu className="w-4 h-4 text-[#8AA8FF] dark:text-[#8AA8FF]" />
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
                  className="bg-gradient-to-r from-[#8AA8FF] to-[#002A54] dark:from-[#8AA8FF] dark:to-[#002A54] h-full rounded-full"
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
            <div className="w-12 h-12 rounded-xl bg-[#FF9800]/10 dark:bg-[#FF9800]/20 flex items-center justify-center border border-[#FF9800]/20 dark:border-[#FF9800]/30">
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
            <div className="w-12 h-12 rounded-xl bg-[#002A54]/10 dark:bg-[#002A54]/20 flex items-center justify-center border border-[#002A54]/20 dark:border-[#002A54]/30">
              <ShieldAlert className="w-6 h-6 text-[#002A54] dark:text-[#8AA8FF] dark:drop-shadow-[0_0_8px_rgba(138,168,255,0.8)]" />
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

const RoleCard = ({ icon: Icon, title, desc, colorClass, roadmapKey }: {
  icon: any;
  title: string;
  desc: string;
  colorClass: string;
  roadmapKey: string;
}) => {
  const { t, setCurrentPage, setOpenRoadmap } = useContext(LanguageContext);
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`p-6 md:p-8 ${glassCard} relative overflow-hidden group hover:border-${colorClass}-400/50 dark:hover:border-${colorClass}-500/50 transition-all duration-300`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${colorClass}-500/5 dark:bg-${colorClass}-500/10 rounded-full blur-[40px] group-hover:bg-${colorClass}-500/10 dark:group-hover:bg-${colorClass}-500/20 transition-all`} />

      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-${colorClass}-500/10 flex items-center justify-center mb-4 md:mb-6 border border-${colorClass}-500/20`}>
        <Icon className={`w-7 h-7 md:w-8 md:h-8 text-${colorClass}-500 dark:text-${colorClass}-400`} />
      </div>

      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-slate-900 dark:text-white relative z-10">{title}</h3>
      <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-5 md:mb-6 relative z-10 md:min-h-[60px]">
        {desc}
      </p>

      <button
        onClick={() => { setCurrentPage('roadmaps'); setOpenRoadmap(roadmapKey); }}
        className="text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all text-slate-800 dark:text-white relative z-10"
      >
        <span>{t.roles.view}</span>
        <ArrowRight className={`w-4 h-4 text-${colorClass}-500`} />
      </button>
    </motion.div>
  );
};

const RolesSection = () => {
  const { t, lang, setCurrentPage, setOpenRoadmap } = useContext(LanguageContext);
  const [showAll, setShowAll] = useState(false);

  // Иконки для каждого colorClass
  const iconMap: Record<string, any> = {
    cyan: Terminal,
    pink: Cpu,
    purple: ShieldAlert,
    blue: Database,
    emerald: Layers,
    amber: Smartphone,
    orange: Server,
    rose: Gamepad2,
  };

  const cards = t.roadmaps.cards;
  const visibleCards = showAll ? cards : cards.slice(0, 4);

 return (
    <section id="roles" className="py-16 md:py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-slate-900 dark:text-white">
            {t.roles.t}             <span className="text-[var(--tp)]">{t.roles.ts}</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60">{t.roles.d}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {visibleCards.map((card, i) => (
            <RoleCard
              key={card.roadmapKey}
              icon={iconMap[card.colorClass] || Layers}
              title={card.title}
              desc={card.desc}
              colorClass={card.colorClass}
              roadmapKey={card.roadmapKey}
            />
          ))}
        </div>

        {/* Кнопки под карточками */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-14">
          {!showAll && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="px-8 py-3.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold text-sm flex items-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-md"
            >
              {lang === "RU" ? "Показать ещё" : "Show more"}
              <ChevronDown className="w-4 h-4" />
            </motion.button>
          )}

          {showAll && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentPage('roadmaps');
                setOpenRoadmap(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full text-white font-bold text-sm flex items-center gap-2 transition-all"
              style={{background: "linear-gradient(to right, var(--tp), var(--tp-dark))", boxShadow: "0_0_15px_rgba(var(--tp-rgb),0.3)"}}
            >
              {lang === "RU" ? "Все роадмапы" : "All Roadmaps"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

const StepsSection = () => {
  const { t } = useContext(LanguageContext);
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* LEFT — steps */}
          <div className="flex-1 space-y-6 md:space-y-8 w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white text-center lg:text-left">
              {t.steps.t} <br />              <span className="text-[var(--tp)]">{t.steps.ts}</span>
            </h2>

            <div className="space-y-5 md:space-y-6">
              {[t.steps.s1, t.steps.s2, t.steps.s3].map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  key={i}
                  className={`p-5 md:p-6 ${glassCard} flex gap-4 md:gap-6 items-start`}
                >
                  <div className="text-3xl md:text-4xl font-black text-[var(--tp)] drop-shadow-sm">
                    0{i+1}
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-slate-900 dark:text-white">{item.t}</h4>
                    <p className="text-sm text-slate-600 dark:text-white/60">{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — device showcase (скрыт на мобилке) */}
          <div className="flex-1 relative w-full max-w-[500px] h-[600px] hidden lg:flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[480px] h-[480px] rounded-full border border-dashed border-[#8AA8FF]/20 dark:border-[#8AA8FF]/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-[#FF9800]/20 dark:border-[#FF9800]/30"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ y: [-8, 8, -8] }}
              transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              className="relative z-20 w-[260px] h-[540px] rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-3 shadow-2xl border-[3px] border-slate-700 dark:border-slate-800"
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-30" />
              <div className="w-full h-full rounded-[2.3rem] bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden relative">
                <div className="px-6 pt-4 pb-2 flex justify-between items-center text-[10px] font-bold text-slate-900 dark:text-white">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-2 rounded-sm bg-slate-900 dark:bg-white" />
                    <div className="w-4 h-2 rounded-sm bg-slate-900 dark:bg-white" />
                  </div>
                </div>
                <div className="px-5 pt-3 pb-4">
                  <p className="text-[10px] text-slate-500 dark:text-white/50 uppercase tracking-wider font-bold mb-1">Your Roadmap</p>
                  <p className="text-base font-black text-slate-900 dark:text-white">Frontend Dev</p>
                </div>
                <div className="px-5 mb-4">
                  <div className="flex justify-between text-[9px] mb-1 font-bold">
                    <span className="text-slate-500 dark:text-white/60">Progress</span>
                    <span className="text-[#8AA8FF] dark:text-[#8AA8FF]">68%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "68%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#8AA8FF] to-[#002A54] rounded-full shadow-[0_0_10px_rgba(138,168,255,0.6)]"
                    />
                  </div>
                </div>
                <div className="px-4 space-y-2">
                  {[
                    { name: "HTML & CSS", done: true,  color: "cyan" },
                    { name: "JavaScript",  done: true,  color: "cyan" },
                    { name: "React",       done: true,  color: "cyan" },
                    { name: "TypeScript",  done: false, color: "pink", current: true },
                    { name: "Testing",     done: false, color: "pink" },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        s.current
                          ? "bg-[#FF9800]/10 dark:bg-[#FF9800]/10 border border-[#FF9800]/30"
                          : s.done
                            ? "bg-green-50 dark:bg-green-500/10"
                            : "bg-slate-50 dark:bg-white/5"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        s.done ? "bg-green-500" : s.current ? `bg-[#FF9800] animate-pulse` : "bg-slate-200 dark:bg-white/10"
                      }`}>
                        {s.done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <span className={`text-[11px] font-bold ${
                        s.done ? "text-slate-400 dark:text-white/40 line-through" : "text-slate-800 dark:text-white"
                      }`}>{s.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gradient-to-r from-[#8AA8FF] to-[#002A54] rounded-xl p-3 text-center shadow-lg shadow-[#8AA8FF]/30">
                    <p className="text-[10px] text-white/80 font-medium">Continue</p>
                    <p className="text-xs text-white font-black">TypeScript →</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ────────────────────────────────────────────────────────────
   Navbar c МОБИЛЬНЫМ бургер-меню
──────────────────────────────────────────────────────────── */
const Navbar = ({ onLoginClick, onNavigate, onStartQuiz, currentUser }: { onLoginClick: () => void; onNavigate?: () => void; onStartQuiz?: () => void; currentUser?: any }) => {
  const { t, lang, setCurrentPage, setOpenRoadmap, colorTheme, setColorTheme } = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // блокируем скролл фона при открытом меню
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const go = (page: string) => {
    if (page === "quiz") {
      setMenuOpen(false);
      setOpenRoadmap(null);
      setCurrentPage('home');
      onStartQuiz?.();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    onNavigate?.();
    setCurrentPage(page);
    setOpenRoadmap(null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { label: lang === "RU" ? "Профориентационное\nтестирование" : "Career\nAssessment", page: "quiz" },
    { label: lang === "RU" ? "Профиль\nпрофессии" : "Profession\nProfiles", page: "professions" },
    { label: lang === "RU" ? "Обучающие\nкурсы" : "Learning\nCourses", page: "roadmaps" },
    { label: lang === "RU" ? "Наши\nменторы" : "Our\nMentors", page: "mentors" },
    { label: lang === "RU" ? "Чаты" : "Chats", page: "chats" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="container mx-auto flex items-center justify-between">
        <button
          onClick={() => { onNavigate?.(); setCurrentPage('home'); setOpenRoadmap(null); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 group hover:opacity-90 transition-opacity outline-none"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(var(--tp-rgb),0.3)] dark:shadow-[0_0_15px_rgba(var(--tp-rgb),0.5)] group-hover:scale-105 transition-transform" style={{background: "linear-gradient(to bottom right, var(--tp), var(--tp-dark))"}}>
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-[#FF9800] transition-colors">SkillPath</span>
        </button>

        {/* Десктоп-меню */}
        <div className="hidden md:flex items-center gap-8 px-8 py-3 rounded-full bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none">
          {navItems.map((item) => (
            <button key={item.page} onClick={() => go(item.page)} className="text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white transition-colors text-center leading-tight whitespace-pre-line">{item.label}</button>
          ))}
        </div>

        {/* Десктоп-кнопки */}
                <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <ThemeSwitcher />
                    {currentUser ? (
            <>
              {currentUser.role === "admin" && (
                <button onClick={() => go("admin")} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors">
                  Admin
                </button>
              )}
              {currentUser.role === "mentor" && (
                <button onClick={() => go("mentor-dashboard")} className="px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 text-xs font-medium hover:bg-orange-500/20 transition-colors">
                  Mentor
                </button>
              )}
              <button
                onClick={() => go("profile")}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black hover:scale-110 transition-transform"
                style={{background: "linear-gradient(to bottom right, var(--tp), var(--tp-dark))"}}
                title={currentUser.name}
              >
                {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-5 py-2 rounded-full text-white font-bold text-sm hover:opacity-90 transition-all"
              style={{background: "linear-gradient(to right, var(--tp), var(--tp-dark))"}}
            >
              {lang === "RU" ? "Войти" : "Sign In"}
            </button>
          )}
        </div>

        {/* Мобилка: язык + бургер */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-slate-700 dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all backdrop-blur-md"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Мобильное выезжающее меню */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-sm bg-white dark:bg-[#0b1120] border-l border-black/10 dark:border-white/10 p-6 flex flex-col md:hidden shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(to bottom right, var(--tp), var(--tp-dark))"}}>
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">SkillPath</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-slate-700 dark:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.page}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => go(item.page)}
                    className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 text-base font-bold text-slate-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                  >
                    <span className="text-left leading-tight">{item.label.replace(/\n/g, ' ')}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </motion.button>
                ))}
              </div>

              {/* Color theme picker — mobile */}
              <div className="mt-6 mb-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#002A54]/40 dark:text-white/30 mb-3 px-1">
                  {lang === "RU" ? "Цветовая тема" : "Color theme"}
                </p>
                <div className="flex gap-2">
                  {(Object.keys(themes) as ThemeId[]).map((id) => (
                    <button
                      key={id}
                      onClick={() => setColorTheme(id)}
                      className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                        colorTheme === id
                          ? "border-[#8AA8FF] bg-[#8AA8FF]/10 dark:border-[#8AA8FF]/50 dark:bg-[#8AA8FF]/10"
                          : "border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/15"
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full ring-2 ring-offset-1 ring-offset-white dark:ring-offset-[#0b1120]"
                        style={{
                          background: `linear-gradient(135deg, ${id === "blue" ? "#8AA8FF,#002A54,#FF9800" : id === "purple" ? "#B388FF,#6A0DAD,#FF6B9D" : "#FFFFFF,#666666,#1A1A1A"})`,
                          ringColor: colorTheme === id ? themes[id].primary : 'transparent',
                        }}
                      />
                      <span className="text-[10px] font-bold text-[#002A54]/60 dark:text-white/50">
                        {themeLabels[id][lang]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {currentUser ? (
                <button
                  onClick={() => { setMenuOpen(false); go('profile'); }}
                  className="w-full mt-3 px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 text-base font-bold text-slate-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                    style={{background: "linear-gradient(to bottom right, var(--tp), var(--tp-dark))"}}>
                    {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-left leading-tight">{currentUser.name || (lang === "RU" ? "Профиль" : "Profile")}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 ml-auto" />
                </button>
              ) : (
                <button
                  onClick={() => { setMenuOpen(false); onLoginClick(); }}
                  className="w-full mt-3 px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 text-base font-bold text-slate-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center justify-between"
                >
                  <span>{lang === "RU" ? "Войти" : "Sign In"}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                </button>
              )}

              <button
                onClick={() => { setMenuOpen(false); go('quiz'); }}
                className="mt-auto w-full px-6 py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2"
                style={{background: "linear-gradient(to right, var(--tp), var(--tp-dark))", boxShadow: "0_8px_24px_rgba(var(--tp-rgb),0.3)"}}
              >
                {lang === "RU" ? "Пройти тест" : "Take the Test"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ────────────────────────────────────────────────────────────
   Кнопка «Наверх» — появляется после прокрутки
──────────────────────────────────────────────────────────── */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 z-40 p-3.5 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
          style={{background: "linear-gradient(to bottom right, var(--tp), var(--tp-dark))", boxShadow: "0_8px_24px_rgba(var(--tp-rgb),0.4)"}}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ────────────────────────────────────────────────────────────
   Sticky-CTA снизу (только мобилка) — главное действие под рукой
──────────────────────────────────────────────────────────── */
const MobileStickyCTA = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  const { t } = useContext(LanguageContext);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-30 p-3 md:hidden bg-gradient-to-t from-white dark:from-[#0b1120] to-transparent pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
        >
          <button
            onClick={onStartQuiz}
            className="w-full px-6 py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2"
            style={{background: "linear-gradient(to right, var(--tp), var(--tp-dark), var(--ta))", boxShadow: "0_8px_24px_rgba(var(--tp-rgb),0.3)"}}
          >
            {t.hero.btnQuest}
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ────────────────────────────────────────────────────────────
   «Показать ещё» — сворачивает доп-секции на мобилке
──────────────────────────────────────────────────────────── */
const MobileShowMore = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useContext(LanguageContext);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [open, setOpen] = useState(false);

  // На десктопе показываем всё как обычно
  if (!isMobile) return <>{children}</>;

  return (
    <>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <div className="py-8 flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold text-sm flex items-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
          >
            {lang === "RU" ? "Показать больше" : "Show more"}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
};

const Footer = () => {
  const { t, setCurrentPage, lang } = useContext(LanguageContext);

  const navItems = [
    { label: t.nav.profs, page: "professions" },
    { label: t.nav.roads, page: "roadmaps" },
    { label: t.nav.mentors, page: "mentors" },
    { label: lang === 'RU' ? 'Презентация' : 'Presentation', page: "presentation" },
  ];

  return (
    <footer className="bg-[#FBFFFF] dark:bg-[#00000F] text-slate-900 dark:text-white pt-16 pb-12 border-t-2 border-[#8AA8FF]/50 relative z-10 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
          
          {/* КОЛОНКА 1: ЛОГОТИП */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{background: "linear-gradient(to bottom right, var(--tp), var(--tp-dark))", boxShadow: "0_8px_24px_rgba(var(--tp-rgb),0.2)"}}>
                <Layers className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase italic">SkillPath</span>
            </div>
            <div className="space-y-2">
              <p className="text-slate-500 dark:text-zinc-500 text-sm font-medium leading-relaxed max-w-xs">
                {t.footer.desc}
              </p>
              <p className="text-slate-400 dark:text-zinc-600 text-xs uppercase tracking-[0.2em] pt-4">
                © {new Date().getFullYear()} {t.footer.rights}
              </p>
            </div>
          </div>

          {/* КОЛОНКА 2: НАВИГАЦИЯ (С ЗАГОЛОВКОМ) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-[#002A54] dark:text-[#8AA8FF]">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => { setCurrentPage(item.page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-600 dark:text-zinc-400 hover:text-[#FF9800] dark:hover:text-white uppercase text-sm font-bold tracking-wider transition-all hover:translate-x-2 flex items-center gap-2"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* КОЛОНКА 3: КОНТАКТЫ (С ЗАГОЛОВКОМ) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-[#002A54] dark:text-[#8AA8FF]">
              {t.footer.contacts}
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 rounded-lg bg-black/5 dark:bg-white/5">
                  <Mail className="w-5 h-5 text-[#8AA8FF]" />
                </div>
                <div>
                  <p className="text-slate-400 dark:text-zinc-500 text-[10px] uppercase font-bold mb-1">Email</p>
                  <a href="mailto:hello@skillpath.com" className="text-slate-700 dark:text-zinc-200 text-sm font-bold hover:text-[#FF9800] transition-colors">
                    HELLO@SKILLPATH.COM
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 rounded-lg bg-black/5 dark:bg-white/5">
                  <Phone className="w-5 h-5 text-[#8AA8FF]" />
                </div>
                <div>
                  <p className="text-slate-400 dark:text-zinc-500 text-[10px] uppercase font-bold mb-1">{lang === 'RU' ? 'Режим работы' : 'Working hours'}</p>
                  <p className="text-slate-700 dark:text-zinc-200 text-sm font-bold uppercase">
                    24/7 ONLINE • SUPPORT 09:00-21:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* КОЛОНКА 4: ТЕЛЕФОНЫ И СОЦСЕТИ */}
          <div className="flex flex-col items-start lg:items-end space-y-8">
            <div className="text-left lg:text-right space-y-2">
              <a href="tel:+375255172137" className="block text-2xl font-black tracking-tighter hover:text-[#FF9800] transition-colors">
                +375 (25) 517-21-37
              </a>
              <a href="tel:+375291754670" className="block text-2xl font-black tracking-tighter hover:text-[#FF9800] transition-colors">
                +375 (29) 175-46-70
              </a>
            </div>
            
            <div className="space-y-4 w-full lg:w-auto">
              <p className="text-slate-400 dark:text-zinc-500 text-xs uppercase font-bold tracking-widest lg:text-right">
                {t.footer.socials}
              </p>
              <div className="flex gap-4 lg:justify-end">
  {[
    { 
      icon: <Send size={20} />, 
      color: "hover:bg-[#229ED9]", 
      label: "Telegram",
      url: "https://t.me/Fordmash" // <-- ВСТАВЬ ССЫЛКУ СЮДА
    },
    { 
      icon: <Instagram size={20} />, 
      color: "hover:bg-gradient-to-tr hover:from-[#F58529] hover:to-[#DD2A7B]", 
      label: "Instagram",
      url: "https://www.instagram.com/qwayaa?igsh=MTFkdng5NDhicHhwNQ==" // <-- ВСТАВЬ ССЫЛКУ СЮДА
    },
    { 
      icon: <Github size={20} />, 
      color: "hover:bg-[#333]", 
      label: "Github",
      url: "https://github.com/Stanislav220852" // <-- ВСТАВЬ ССЫЛКУ СЮДА
    },
    
  ].map((social, i) => (
    <a
      key={i}
      href={social.url} // <-- Здесь теперь используется ссылка из объекта выше
      target="_blank"   // Открывает в новой вкладке
      rel="noopener noreferrer" // Безопасность при открытии новых вкладок
      aria-label={social.label}
      className={`w-12 h-12 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 transition-all duration-300 ${social.color} hover:text-white hover:border-transparent hover:-translate-y-1 shadow-sm`}
    >
      {social.icon}
    </a>
  ))}
</div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
const LoginModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src='src\app\logo .jpg'  // 👈 сюда вставь свою картинку
            alt="Login"
            className="w-[500px] h-auto object-cover"
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
const Content = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(API.getSavedUser());
  const { lang, t, currentPage, setCurrentPage, openRoadmap, setOpenRoadmap, colorTheme } = useContext(LanguageContext);

  useEffect(() => {
    document.documentElement.classList.remove("theme-blue", "theme-purple", "theme-mono");
    document.documentElement.classList.add(`theme-${colorTheme}`);
  }, [colorTheme]);

  useEffect(() => {
    if (API.isLoggedIn()) {
      API.getMe().then(setCurrentUser).catch(() => {
        API.logout();
        setCurrentUser(null);
      });
    }
  }, []);

  // Listen for onboarding roadmap open event
  useEffect(() => {
    const handler = (e: CustomEvent<string>) => {
      setOpenRoadmap(e.detail);
    };
    window.addEventListener("onboarding-open-roadmap" as any, handler);
    return () => window.removeEventListener("onboarding-open-roadmap" as any, handler);
  }, [setOpenRoadmap]);

  const isLearningPage = currentPage.startsWith("learning:");
  const learningSkillId = isLearningPage ? currentPage.split(":")[1] : null;
  const isHome = currentPage === "home" && !showQuiz;
  const isPresentation = currentPage === "presentation";
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isPresentation) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0A0A0A]">
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-[#0A0A0A]"><div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" /></div>}>
          <Presentation onExit={() => setCurrentPage("home")} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00000F] text-white font-sans transition-colors duration-300">
      {!currentPage.startsWith("admin") && !isMobile && <FloatingParticles count={15} />}
      {!currentPage.startsWith("admin") && <ThemeEffects isHome={isHome} isMobile={isMobile} />}
      {!currentPage.startsWith("admin") && !isMobile && <MouseSpotlight />}

      {!currentPage.startsWith("admin") && (
        <Navbar
          onLoginClick={() => setShowLogin(true)}
          onNavigate={() => setShowQuiz(false)}
          onStartQuiz={() => setShowQuiz(true)}
          currentUser={currentUser}
        />
      )}

      <main className="relative z-10" key={currentPage + (showQuiz ? "-quiz" : "")}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
        {showQuiz ? (
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-[#8AA8FF]/30 border-t-[#8AA8FF] rounded-full animate-spin" /></div>}>
            <Quiz
              onExit={() => {
                setShowQuiz(false);
                setCurrentPage("home");
              }}
              lang={lang}
              onGoToRoadmap={(roadmapKey) => {
                setShowQuiz(false);
                setCurrentPage("roadmaps");
                setOpenRoadmap(roadmapKey);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </Suspense>
        ) : currentPage === "professions" ? (
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-[#8AA8FF]/30 border-t-[#8AA8FF] rounded-full animate-spin" /></div>}>
            <ProfessionsPage onBack={() => setCurrentPage("home")} lang={lang} t={t} />
          </Suspense>
        ) : currentPage === "roadmaps" ? (
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-[#8AA8FF]/30 border-t-[#8AA8FF] rounded-full animate-spin" /></div>}>
            <RoadmapsPage
              t={t}
              initialRoadmap={openRoadmap}
              onOpenRoadmap={(val: string | null) => {
                if (val && val.startsWith("learn:")) {
                  const skillId = val.split(":")[1];
                  setCurrentPage("learning:" + skillId);
                  setOpenRoadmap(null);
                } else {
                  setOpenRoadmap(val);
                }
              }}
              lang={lang}
            />
          </Suspense>
        ) : currentPage === "mentors" ? (
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-[#FF9800]/30 border-t-[#FF9800] rounded-full animate-spin" /></div>}>
            <MentorsPage onBack={() => setCurrentPage("home")} lang={lang} t={t} />
          </Suspense>
        ) : currentPage === "chats" ? (
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-[#8AA8FF]/30 border-t-[#8AA8FF] rounded-full animate-spin" /></div>}>
            <ChatsPage onBack={() => setCurrentPage("home")} lang={lang} t={t} currentUser={currentUser} />
          </Suspense>
        ) : currentPage === "profile" ? (
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-[#8AA8FF]/30 border-t-[#8AA8FF] rounded-full animate-spin" /></div>}>
            <ProfilePage
              onBack={() => setCurrentPage("home")}
              lang={lang}
              currentUser={currentUser}
              onLogout={() => {
                API.logout();
                setCurrentUser(null);
                setCurrentPage("home");
              }}
              onNavigate={(page, roadmapKey) => {
                if (page === "quiz") {
                  setShowQuiz(true);
                  setCurrentPage("home");
                } else {
                  setShowQuiz(false);
                  setCurrentPage(page);
                  setOpenRoadmap(roadmapKey || null);
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              roadmapPhases={translations[lang].roadmaps.phases}
            />
          </Suspense>
        ) : isLearningPage ? (
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-[#8AA8FF]/30 border-t-[#8AA8FF] rounded-full animate-spin" /></div>}>
            <SkillLearningPage skillId={learningSkillId} onBack={() => setCurrentPage("roadmaps")} lang={lang} />
          </Suspense>
        ) : currentPage === "admin-login" ? (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-4 border-[#8AA8FF]/30 border-t-[#8AA8FF] rounded-full animate-spin" /></div>}>
            <AdminLogin onSuccess={(user) => { setCurrentUser(user); setCurrentPage("admin"); }} onBack={() => setCurrentPage("home")} />
          </Suspense>
        ) : currentPage.startsWith("admin") && currentUser?.role === "admin" ? (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-4 border-[#8AA8FF]/30 border-t-[#8AA8FF] rounded-full animate-spin" /></div>}>
            {currentPage === "admin" ? (
              <AdminDashboard onNavigate={(p) => { setCurrentPage(p); window.scrollTo({ top: 0 }); }} onLogout={() => { API.logout(); setCurrentUser(null); setCurrentPage("home"); }} />
            ) : currentPage === "admin-users" ? (
              <AdminUsers onNavigate={(p) => { setCurrentPage(p); window.scrollTo({ top: 0 }); }} />
            ) : currentPage === "admin-mentors" ? (
              <AdminMentors onNavigate={(p) => { setCurrentPage(p); window.scrollTo({ top: 0 }); }} />
            ) : currentPage === "admin-bookings" ? (
              <AdminBookings onNavigate={(p) => { setCurrentPage(p); window.scrollTo({ top: 0 }); }} />
            ) : currentPage === "admin-settings" ? (
              <AdminSettings onNavigate={(p) => { setCurrentPage(p); window.scrollTo({ top: 0 }); }} />
            ) : null}
          </Suspense>
        ) : currentPage === "mentor-dashboard" && currentUser?.role === "mentor" ? (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-4 border-[#FF9800]/30 border-t-[#FF9800] rounded-full animate-spin" /></div>}>
            <MentorDashboard onNavigate={(p) => { setCurrentPage(p); window.scrollTo({ top: 0 }); }} user={currentUser} />
          </Suspense>
        ) : (
          <>
            <div data-tour="hero"><Hero onStartQuiz={() => setShowQuiz(true)} /></div>
            <CompaniesStrip />
            <div data-tour="stats"><StatsSection /></div>
            
            <div data-tour="bento" className="hidden md:block"><BentoShowcase onStartQuiz={() => setShowQuiz(true)} /></div>
        
            <TechMarquee />
            <div data-tour="testimonials"><TestimonialsCarousel /></div>
            <div data-tour="steps"><StepsSection /></div>
            <div className="hidden md:block"><BootstrapInfo /></div>
            
            <div data-tour="faq"><FAQAccordion /></div>
          </>
        )}
        </motion.div>
      </main>

      {isHome && <Footer />}
      <ScrollToTop />
      {isHome && <MobileStickyCTA onStartQuiz={() => setShowQuiz(true)} />}

      {!currentPage.startsWith("admin") && <MusicPlayer onPlayStateChange={(playing) => emitMusicState(playing)} />}
      {!currentPage.startsWith("admin") && <Suspense fallback={null}><GuideCharacter /></Suspense>}

      {showLogin && (
        <AuthModal
          onClose={() => setShowLogin(false)}
          onSuccess={(user) => setCurrentUser(user)}
          lang={lang}
        />
      )}
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Lang>("RU");
  const t = translations[lang];
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [openRoadmap, setOpenRoadmap] = useState<string | null>(null);
  const [colorTheme, setColorTheme] = useState<ThemeId>("purple");
  const colors = themes[colorTheme];

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageContext.Provider value={{ lang, setLang, t, currentPage, setCurrentPage, openRoadmap, setOpenRoadmap, colorTheme, setColorTheme, colors }}>
        <Content />
        
      </LanguageContext.Provider>
      
    </ThemeProvider>
  );
}
