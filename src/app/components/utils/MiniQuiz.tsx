import { useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Sparkles, X } from "lucide-react";
import { LanguageContext } from "../../App";

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

const roleNames: Record<string, { EN: string; RU: string; gradient: string }> = {
  frontend:    { EN: "Frontend Developer",       RU: "Frontend-разработчик",  gradient: "from-cyan-500 to-blue-600" },
  ai:          { EN: "AI / ML Engineer",         RU: "AI / ML Инженер",       gradient: "from-pink-500 to-rose-600" },
  cybersec:    { EN: "Cybersecurity Specialist", RU: "Спец. по кибербезу",    gradient: "from-purple-500 to-violet-600" },
  datascience: { EN: "Data Scientist",           RU: "Data Scientist",        gradient: "from-blue-500 to-indigo-600" },
};

export const MiniQuiz = () => {
  const { t, lang, setCurrentPage, setOpenRoadmap } = useContext(LanguageContext);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const totalQuestions = t.mini.questions.length;
  const progressPercent = showResult 
    ? 100 
    : Math.round((step / totalQuestions) * 100);

  // ============ jQuery UI Progressbar ============
  useEffect(() => {
    if (typeof window.$ === "undefined" || !progressRef.current) return;
    const $ = window.$;

    try {
      // Инициализация только если ещё не создан
      if (!$(progressRef.current).hasClass("ui-progressbar")) {
        $(progressRef.current).progressbar({ value: 0 });
      }
      // Обновляем значение
      $(progressRef.current).progressbar("value", progressPercent);
    } catch (e) {
      console.warn("jQuery progressbar error:", e);
    }
  }, [progressPercent]);

  // Cleanup при размонтировании
  useEffect(() => {
    return () => {
      if (typeof window.$ === "undefined" || !progressRef.current) return;
      try {
        if (window.$(progressRef.current).hasClass("ui-progressbar")) {
          window.$(progressRef.current).progressbar("destroy");
        }
      } catch (e) {}
    };
  }, []);

  const handleAnswer = (v: string) => {
    const newAnswers = [...answers, v];
    setAnswers(newAnswers);
    if (step < totalQuestions - 1) {
      setStep(step + 1);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const reset = () => {
    setShowResult(false);
    setTimeout(() => {
      setStep(0);
      setAnswers([]);
    }, 200);
  };

  // determine winning role (most frequent answer)
  const winner = answers.length === totalQuestions
    ? Object.entries(answers.reduce((acc: any, a) => ({ ...acc, [a]: (acc[a] || 0) + 1 }), {}))
        .sort((a: any, b: any) => b[1] - a[1])[0][0]
    : null;

  const openRoadmap = () => {
    if (winner) {
      setShowResult(false);
      setOpenRoadmap(winner);
      setCurrentPage("roadmaps");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span className="text-xs font-bold text-slate-600 dark:text-white/70 uppercase tracking-wider">
              {t.mini.subtitle}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            {t.mini.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-400">
              {t.mini.titleAccent}
            </span>
          </h2>
        </div>

        {/* QUIZ CARD */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl p-8 shadow-xl">

          {/* jQuery UI Progressbar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2 text-xs">
              <span className="font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider">
                {Math.min(step + 1, totalQuestions)} / {totalQuestions}
              </span>
              <span className="font-black text-pink-500">{progressPercent}%</span>
            </div>
            <div ref={progressRef} className="quiz-progress" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6">
                {t.mini.questions[step]?.q}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {t.mini.questions[step]?.opts.map((o: any) => (
                  <motion.button
                    key={o.text}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(o.v)}
                    className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-cyan-500/50 transition-all text-left"
                  >
                    <div className="text-3xl mb-2">{o.emoji}</div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{o.text}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/10 text-center">
            <span className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest font-bold">
              ⚡ jQuery UI Progressbar
            </span>
          </div>
        </div>
      </div>

      {/* RESULT MODAL — React-модалка для надёжности */}
      <AnimatePresence>
        {showResult && winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={reset}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Gradient header */}
              <div className={`bg-gradient-to-br ${roleNames[winner].gradient} p-6 relative overflow-hidden`}>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                <button
                  onClick={reset}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative text-center">
                  <div className="text-6xl mb-2">🎯</div>
                  <p className="text-xs uppercase tracking-widest text-white/80 font-bold">
                    {t.mini.result}
                  </p>
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className={`text-3xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r ${roleNames[winner].gradient}`}>
                  {roleNames[winner][lang as "EN" | "RU"]}
                </h3>

                <div className="flex flex-wrap justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openRoadmap}
                    className={`px-6 py-3 rounded-full bg-gradient-to-r ${roleNames[winner].gradient} text-white font-bold shadow-lg flex items-center gap-2`}
                  >
                    {t.mini.cta} <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <button
                    onClick={reset}
                    className="px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-white font-bold flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t.mini.retake}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};