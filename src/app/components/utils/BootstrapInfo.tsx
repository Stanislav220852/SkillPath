import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, Briefcase, MapPin, Target } from "lucide-react";
import { LanguageContext } from "../../App";

interface ProfData {
  id: string;
  nameRU: string;
  nameEN: string;
  junior: number;
  mid: number;
  senior: number;
  color: "cyan" | "pink" | "purple" | "blue" | "emerald";
  demand: number;
}

const professions: ProfData[] = [
  { id: "frontend",  nameEN: "Frontend Developer",  nameRU: "Frontend-разработчик",  junior: 1500, mid: 3500, senior: 7000,  color: "cyan",    demand: 92 },
  { id: "backend",   nameEN: "Backend Developer",   nameRU: "Backend-разработчик",   junior: 1800, mid: 4000, senior: 8000,  color: "emerald", demand: 88 },
  { id: "fullstack", nameEN: "Fullstack Developer", nameRU: "Fullstack-разработчик", junior: 2000, mid: 4500, senior: 8500,  color: "blue",    demand: 95 },
  { id: "ai",        nameEN: "AI / ML Engineer",    nameRU: "AI / ML Инженер",       junior: 2500, mid: 5500, senior: 12000, color: "pink",    demand: 98 },
  { id: "mobile",    nameEN: "Mobile Developer",    nameRU: "Mobile-разработчик",    junior: 1700, mid: 4000, senior: 7500,  color: "purple",  demand: 80 },
];

const colorGradient: Record<string, string> = {
  cyan: "from-cyan-500 to-blue-600",
  pink: "from-pink-500 to-rose-600",
  purple: "from-purple-500 to-violet-600",
  blue: "from-blue-500 to-indigo-600",
  emerald: "from-emerald-500 to-teal-600",
};

const colorBg: Record<string, string> = {
  cyan: "bg-cyan-500",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
};

const colorText: Record<string, string> = {
  cyan: "text-cyan-500 dark:text-cyan-400",
  pink: "text-pink-500 dark:text-pink-400",
  purple: "text-purple-500 dark:text-purple-400",
  blue: "text-blue-500 dark:text-blue-400",
  emerald: "text-emerald-500 dark:text-emerald-400",
};

const glassCard = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl shadow-xl";

type Level = "junior" | "mid" | "senior";

export const BootstrapInfo = () => {
  const { lang } = useContext(LanguageContext);
  const [selectedProf, setSelectedProf] = useState<string>("frontend");
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(15);
  const [level, setLevel] = useState<Level>("junior");
  const [country, setCountry] = useState<string>("ru");

  const monthsToReach = {
    junior: Math.ceil(6 * 10 / hoursPerWeek),
    mid: Math.ceil(18 * 10 / hoursPerWeek),
    senior: Math.ceil(36 * 10 / hoursPerWeek),
  };

  const countryMultiplier: Record<string, number> = { ru: 0.6, eu: 1.2, us: 2.0, asia: 0.9 };
  const currencySymbol: Record<string, string> = { ru: "$", eu: "€", us: "$", asia: "$" };

  const prof = professions.find((p) => p.id === selectedProf)!;
  const baseSalary = prof[level];
  const adjustedSalary = Math.round(baseSalary * countryMultiplier[country]);
  const yearlyEarning = adjustedSalary * 12;
  const yearsToROI = (3000 / adjustedSalary).toFixed(1);
  const progressPercent = Math.min(100, Math.round((hoursPerWeek / 25) * 100));

  const t = {
    badge: lang === "RU" ? "Калькулятор зарплаты" : "Salary Calculator",
    title1: lang === "RU" ? "Сколько ты будешь" : "How much you'll",
    title2: lang === "RU" ? "зарабатывать" : "earn",
    subtitle: lang === "RU" 
      ? "Рассчитай свою будущую зарплату на основе профессии, региона и времени обучения"
      : "Estimate your future salary based on profession, region and study time",
    chooseProf: lang === "RU" ? "Выбери профессию" : "Choose profession",
    hours: lang === "RU" ? "Часов в неделю на обучение" : "Hours per week",
    chooseLevel: lang === "RU" ? "Целевой уровень" : "Target level",
    chooseCountry: lang === "RU" ? "Регион работы" : "Work region",
    result: lang === "RU" ? "Твой результат" : "Your result",
    monthly: lang === "RU" ? "В месяц" : "Monthly",
    yearly: lang === "RU" ? "В год" : "Yearly",
    timeToReach: lang === "RU" ? "Время до уровня" : "Time to level",
    months: lang === "RU" ? "мес." : "mo",
    demand: lang === "RU" ? "Спрос на рынке" : "Market demand",
    roi: lang === "RU" ? "Окупаемость курса (~$3000)" : "Course ROI (~$3000)",
    junior: "Junior",
    mid: "Middle",
    senior: "Senior",
    disclaimer: lang === "RU" 
      ? "* Расчёт на основе средних рыночных зарплат 2024-2026"
      : "* Based on average market salaries 2024-2026",
    poweredBy: lang === "RU" ? "Bootstrap 5 компоненты" : "Powered by Bootstrap 5",
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* background blurs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-4">
            <Calculator className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-xs font-bold text-slate-600 dark:text-white/70 uppercase tracking-wider">
              {t.badge}
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-3"
          >
            {t.title1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-400">
              {t.title2}
            </span>
          </motion.h2>
          <p className="text-slate-600 dark:text-white/60 max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${glassCard} overflow-hidden`}
        >
          <div className="grid lg:grid-cols-[1fr_400px]">

            {/* LEFT — controls */}
            <div className="p-8 space-y-6">
              
              {/* 1. Profession */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-white/80 mb-3">
                  <Briefcase className="w-4 h-4 text-cyan-500" />
                  {t.chooseProf}
                </label>
                <div className="flex flex-wrap gap-2">
                  {professions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProf(p.id)}
                      className={`btn px-4 py-2 rounded-xl text-xs font-bold transition-all
                        ${selectedProf === p.id 
                          ? `bg-gradient-to-r ${colorGradient[p.color]} text-white shadow-lg`
                          : "bg-black/5 dark:bg-white/5 text-slate-700 dark:text-white/70 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10"
                        }`}
                    >
                      {lang === "RU" ? p.nameRU : p.nameEN}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Hours slider */}
              <div>
                <label className="flex items-center justify-between text-sm font-bold text-slate-700 dark:text-white/80 mb-3">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-500" />
                    {t.hours}
                  </span>
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${colorGradient[prof.color]} text-white text-xs font-black`}>
                    {hoursPerWeek}h
                  </span>
                </label>
                <input
                  type="range"
                  className="form-range w-full accent-cyan-500"
                  min={3}
                  max={40}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                />
                <div className="flex justify-between mt-1 text-[10px] text-slate-500 dark:text-white/40 font-bold">
                  <span>3h ({lang === "RU" ? "хобби" : "hobby"})</span>
                  <span>20h</span>
                  <span>40h ({lang === "RU" ? "фуллтайм" : "fulltime"})</span>
                </div>
              </div>

              {/* 3. Level */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-white/80 mb-3">
                  <Target className="w-4 h-4 text-cyan-500" />
                  {t.chooseLevel}
                </label>
                <div className="btn-group w-full flex gap-2" role="group">
                  {(["junior", "mid", "senior"] as Level[]).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevel(lvl)}
                      className={`btn flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all
                        ${level === lvl
                          ? `bg-gradient-to-r ${colorGradient[prof.color]} text-white shadow-lg`
                          : "bg-black/5 dark:bg-white/5 text-slate-600 dark:text-white/60 border border-black/10 dark:border-white/10"
                        }`}
                    >
                      {t[lvl]}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Country */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-white/80 mb-3">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  {t.chooseCountry}
                </label>
                <select
                  className="form-select w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-medium focus:outline-none focus:border-cyan-500"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="ru">🇷🇺 {lang === "RU" ? "СНГ / Россия" : "CIS / Russia"} (×0.6)</option>
                  <option value="eu">🇪🇺 {lang === "RU" ? "Европа" : "Europe"} (×1.2)</option>
                  <option value="us">🇺🇸 {lang === "RU" ? "США" : "USA"} (×2.0)</option>
                  <option value="asia">🇸🇬 {lang === "RU" ? "Азия" : "Asia"} (×0.9)</option>
                </select>
              </div>
            </div>

            {/* RIGHT — results */}
            <div className={`relative p-8 text-white bg-gradient-to-br ${colorGradient[prof.color]} overflow-hidden`}>
              {/* decorative orb */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl pointer-events-none" />
              
              <div className="relative">
                <p className="text-xs uppercase tracking-widest opacity-80 mb-3 font-bold">
                  {t.result}
                </p>

                {/* Salary */}
                <div className="mb-6">
                  <p className="text-xs opacity-70 mb-1">{t.monthly}</p>
                  <motion.div
                    key={adjustedSalary}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl font-black leading-none"
                  >
                    {currencySymbol[country]}{adjustedSalary.toLocaleString()}
                  </motion.div>
                  <p className="text-sm opacity-80 mt-2">
                    ≈ {currencySymbol[country]}{yearlyEarning.toLocaleString()} {t.yearly}
                  </p>
                </div>

                {/* Time to reach — Bootstrap progress */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2 text-xs">
                    <span>{t.timeToReach} {t[level]}</span>
                    <strong>{monthsToReach[level]} {t.months}</strong>
                  </div>
                  <div className="progress bg-white/20 rounded-full overflow-hidden" style={{ height: '6px' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.6 }}
                      className="progress-bar bg-white h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Market demand — Bootstrap progress */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2 text-xs">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {t.demand}
                    </span>
                    <strong>{prof.demand}/100</strong>
                  </div>
                  <div className="progress bg-white/20 rounded-full overflow-hidden" style={{ height: '6px' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prof.demand}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="progress-bar bg-yellow-300 h-full rounded-full"
                    />
                  </div>
                </div>

                {/* ROI — Bootstrap alert styled */}
                <div className="alert bg-white/15 backdrop-blur-sm border-0 rounded-2xl p-4 mb-0">
                  <p className="text-xs font-bold mb-1">💡 {t.roi}</p>
                  <p className="text-sm opacity-90 mb-0">
                    ~{yearsToROI} {lang === "RU" ? "месяца работы" : "months of work"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="flex items-center justify-between flex-wrap gap-2 mt-6">
          <p className="text-xs text-slate-500 dark:text-white/40">{t.disclaimer}</p>
          <span className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest font-bold">
            ⚡ {t.poweredBy}
          </span>
        </div>
      </div>
    </section>
  );
};