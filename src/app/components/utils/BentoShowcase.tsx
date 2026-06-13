import { useContext } from "react";
import { motion } from "framer-motion";
import {
  Target, Route, Users, Award, Zap, BookOpen, TrendingUp, Sparkles,
  ChevronRight,
} from "lucide-react";
import { LanguageContext } from "../../App";
import { HScroller } from "./HScroller.tsx";


const bentoItems = [
  { id: 1, key: "aptitude", icon: Target,     className: "md:col-span-2 md:row-span-2", color: "blue",     gradient: "from-[#8AA8FF] to-[#002A54]",     lightBg: "bg-gradient-to-br from-stone-50 to-white border-stone-200/60" },
  { id: 2, key: "roadmaps", icon: Route,      className: "md:col-span-1 md:row-span-1", color: "orange",   gradient: "from-[#FF9800] to-[#e68900]",     lightBg: "bg-gradient-to-br from-stone-50 to-white border-stone-200/60" },
  { id: 3, key: "mentors",  icon: Users,      className: "md:col-span-1 md:row-span-1", color: "navy",     gradient: "from-[#002A54] to-[#001a3a]",     lightBg: "bg-gradient-to-br from-stone-50 to-white border-stone-200/60" },
  { id: 4, key: "certs",    icon: Award,      className: "md:col-span-1 md:row-span-1", color: "blue2",    gradient: "from-[#8AA8FF] to-[#002A54]",     lightBg: "bg-gradient-to-br from-stone-50 to-white border-stone-200/60" },
  { id: 5, key: "workshops",icon: Zap,        className: "md:col-span-1 md:row-span-1", color: "orange2",  gradient: "from-[#FF9800] to-[#e68900]",     lightBg: "bg-gradient-to-br from-stone-50 to-white border-stone-200/60" },
  { id: 6, key: "library",  icon: BookOpen,   className: "md:col-span-2 md:row-span-1", color: "blue3",    gradient: "from-[#8AA8FF] to-[#002A54]",     lightBg: "bg-gradient-to-br from-stone-50 to-white border-stone-200/60" },
  { id: 7, key: "career",   icon: TrendingUp, className: "md:col-span-1 md:row-span-1", color: "navy2",    gradient: "from-[#002A54] to-[#001a3a]",     lightBg: "bg-gradient-to-br from-stone-50 to-white border-stone-200/60" },
  { id: 8, key: "copilot",  icon: Sparkles,   className: "md:col-span-1 md:row-span-1", color: "orange3",  gradient: "from-[#FF9800] to-[#e68900]",     lightBg: "bg-gradient-to-br from-stone-50 to-white border-stone-200/60" },
];


const colorText: Record<string, string> = {
  blue:    "text-[#002A54] dark:text-[#8AA8FF]",
  orange:  "text-[#FF9800] dark:text-[#FF9800]",
  navy:    "text-[#002A54] dark:text-[#8AA8FF]",
  blue2:   "text-[#8AA8FF] dark:text-[#8AA8FF]",
  orange2: "text-[#FF9800] dark:text-[#FF9800]",
  blue3:   "text-[#002A54] dark:text-[#8AA8FF]",
  navy2:   "text-[#002A54] dark:text-[#8AA8FF]",
  orange3: "text-[#FF9800] dark:text-[#FF9800]",
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
        dark:bg-none dark:bg-[#0d0e12]/80 dark:border-white/[0.07] dark:backdrop-blur-2xl
        dark:from-transparent dark:to-transparent
        hover:shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
      `}
    >
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
      />

      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 border border-black/5 dark:border-white/10 flex items-center justify-center mb-4 shadow-sm">
          <Icon className={`w-5 h-5 ${colorText[item.color]}`} />
        </div>
        <h3 className="text-lg font-bold text-[#00000F] dark:text-white mb-1">
          {tr.t}
        </h3>
        <p className="text-sm text-[#002A54]/70 dark:text-white/60 leading-relaxed">
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
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8AA8FF] via-[#002A54] to-[#002A54] text-white font-bold text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(138,168,255,0.3)] hover:shadow-[0_0_25px_rgba(138,168,255,0.5)] transition-all w-fit"
          >
            {lang === "RU" ? "Пройти тест" : "Take the Test"}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      ) : (
        <div className="relative z-10 mt-4">
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-transparent via-[#8AA8FF] to-transparent dark:via-[#FF9800] group-hover:w-full transition-all duration-500 opacity-60" />
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
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#00000F] dark:text-white"
          >
            {t.bento.title1}{" "}
            <span className="text-[var(--tp)]">
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
