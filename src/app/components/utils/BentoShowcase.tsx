import { useContext } from "react";
import { motion } from "framer-motion";
import {
  Target, Route, Users, Award, Zap, BookOpen, TrendingUp, Sparkles,
  ChevronRight,
} from "lucide-react";
import { LanguageContext } from "../../App";
import { HScroller } from "./HScroller.tsx";


const bentoItems = [
  { id: 1, key: "aptitude", icon: Target,     className: "md:col-span-2 md:row-span-2", color: "cyan",    gradient: "from-cyan-500 to-blue-600",     lightBg: "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200/60" },
  { id: 2, key: "roadmaps", icon: Route,      className: "md:col-span-1 md:row-span-1", color: "pink",    gradient: "from-pink-500 to-rose-600",     lightBg: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200/60" },
  { id: 3, key: "mentors",  icon: Users,      className: "md:col-span-1 md:row-span-1", color: "purple",  gradient: "from-purple-500 to-violet-600", lightBg: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200/60" },
  { id: 4, key: "certs",    icon: Award,      className: "md:col-span-1 md:row-span-1", color: "amber",   gradient: "from-amber-500 to-orange-600",  lightBg: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/60" },
  { id: 5, key: "workshops",icon: Zap,        className: "md:col-span-1 md:row-span-1", color: "emerald", gradient: "from-emerald-500 to-teal-600",  lightBg: "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200/60" },
  { id: 6, key: "library",  icon: BookOpen,   className: "md:col-span-2 md:row-span-1", color: "blue",    gradient: "from-blue-500 to-indigo-600",   lightBg: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/60" },
  { id: 7, key: "career",   icon: TrendingUp, className: "md:col-span-1 md:row-span-1", color: "slate",   gradient: "from-slate-500 to-gray-600",    lightBg: "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200/60" },
  { id: 8, key: "copilot",  icon: Sparkles,   className: "md:col-span-1 md:row-span-1", color: "fuchsia", gradient: "from-fuchsia-500 to-pink-600",  lightBg: "bg-gradient-to-br from-fuchsia-50 to-pink-50 border-fuchsia-200/60" },
];


const colorText: Record<string, string> = {
  cyan:    "text-cyan-600 dark:text-cyan-400",
  pink:    "text-pink-600 dark:text-pink-400",
  purple:  "text-purple-600 dark:text-purple-400",
  amber:   "text-amber-600 dark:text-amber-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  blue:    "text-blue-600 dark:text-blue-400",
  slate:   "text-slate-600 dark:text-slate-400",
  fuchsia: "text-fuchsia-600 dark:text-fuchsia-400",
};


const BentoCard = ({ item, t, withSpan = true, onStartQuiz, lang }: { item: any; t: any; withSpan?: boolean; onStartQuiz?: () => void; lang?: string }) => {
  const Icon = item.icon;
  const tr = (t.bento.items as any)[item.key];
  const isAptitude = item.key === "aptitude";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden rounded-3xl border p-6 flex flex-col justify-between transition-colors duration-300 h-full
        ${withSpan ? item.className : ""}
        ${item.lightBg}
        dark:bg-none dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-xl
        dark:from-transparent dark:to-transparent
        hover:shadow-lg
      `}
    >
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
      />

      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 border border-black/5 dark:border-white/10 flex items-center justify-center mb-4 shadow-sm">
          <Icon className={`w-5 h-5 ${colorText[item.color]}`} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          {tr.t}
        </h3>
        <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">
          {tr.d}
        </p>
      </div>

      {/* Кнопка «Пройти тест» — только для карточки aptitude */}
      {isAptitude && onStartQuiz ? (
        <div className="relative z-10 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartQuiz}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all w-fit"
          >
            {lang === "RU" ? "Пройти тест" : "Take the Test"}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      ) : (
        <div className="relative z-10 mt-4">
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/20 group-hover:w-full transition-all duration-500 opacity-60" />
        </div>
      )}
    </motion.div>
  );
};


export const BentoShowcase = ({ onStartQuiz }: { onStartQuiz?: () => void }) => {
  const { t, lang } = useContext(LanguageContext);

  return (
    <section className="py-16 md:py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white"
          >
            {t.bento.title1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-400">
              {t.bento.title2}
            </span>
          </motion.h2>
        </div>

        {/* Десктоп/планшет: bento-сетка */}
        <div className="hidden md:grid grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">
          {bentoItems.map((item) => (
            <BentoCard key={item.id} item={item} t={t} onStartQuiz={onStartQuiz} lang={lang} />
          ))}
        </div>

        {/* Мобилка: горизонтальная лента (свайп) */}
        <div className="md:hidden">
          <HScroller itemClassName="w-[260px]">
            {bentoItems.map((item) => (
              <BentoCard key={item.id} item={item} t={t} withSpan={false} onStartQuiz={onStartQuiz} lang={lang} />
            ))}
          </HScroller>
        </div>
      </div>
    </section>
  );
};
