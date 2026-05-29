import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { LanguageContext } from "../../App";

const avatarGradients = [
  "from-cyan-500 to-blue-600",
  "from-pink-500 to-rose-600",
  "from-purple-500 to-violet-600",
  "from-amber-500 to-orange-600",
];

export const TestimonialsCarousel = () => {
  const { t } = useContext(LanguageContext);
  const items = t.testimonials.items;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // auto-rotate
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(timer);
  }, [paused, items.length]);

  // если сменился язык/массив — не выходим за границы
  useEffect(() => {
    if (idx >= items.length) setIdx(0);
  }, [items.length, idx]);

  const current = items[idx];
  const initials = current.name.split(" ").map((s: string) => s[0]).join("").slice(0, 2);

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-gradient-to-br from-cyan-500/5 via-pink-500/5 to-purple-500/5 dark:from-cyan-500/10 dark:via-pink-500/10 dark:to-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            {t.testimonials.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-400">
              {t.testimonials.titleAccent}
            </span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl p-6 md:p-12 shadow-xl relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 text-cyan-500/20 dark:text-cyan-400/20" />

              <p className="text-base md:text-xl text-slate-700 dark:text-white/80 leading-relaxed mb-8">
                "{current.text}"
              </p>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarGradients[idx % avatarGradients.length]} flex items-center justify-center text-white font-black text-lg shadow-lg flex-shrink-0`}>
                    {initials}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 dark:text-white">{current.name}</p>
                    <p className="text-sm text-slate-500 dark:text-white/50">{current.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 px-4 py-2 rounded-2xl border border-green-500/20 self-start md:self-auto">
                  <span className="text-xs font-bold text-slate-600 dark:text-white/60">{current.before}</span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-black text-green-600 dark:text-green-400">{current.after}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* nav buttons */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setIdx((idx - 1 + items.length) % items.length)}
              aria-label="Previous"
              className="w-10 h-10 rounded-full bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center justify-center text-slate-700 dark:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {items.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-gradient-to-r from-cyan-500 to-pink-500" : "w-1.5 bg-slate-300 dark:bg-white/20"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((idx + 1) % items.length)}
              aria-label="Next"
              className="w-10 h-10 rounded-full bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center justify-center text-slate-700 dark:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
