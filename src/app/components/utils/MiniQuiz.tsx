import React from "react";

import { useContext, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { LanguageContext } from "../../App";

const roleNames: Record<string, { EN: string; RU: string; gradient: string }> = {
  frontend:    { EN: "Frontend Developer",      RU: "Frontend-разработчик",  gradient: "from-cyan-500 to-blue-600" },
  ai:          { EN: "AI / ML Engineer",        RU: "AI / ML Инженер",       gradient: "from-pink-500 to-rose-600" },
  cybersec:    { EN: "Cybersecurity Specialist",RU: "Спец. по кибербезу",    gradient: "from-purple-500 to-violet-600" },
  datascience: { EN: "Data Scientist",          RU: "Data Scientist",        gradient: "from-blue-500 to-indigo-600" },
};

export const MiniQuiz = () => {
  const { t, lang, setCurrentPage, setOpenRoadmap } = useContext(LanguageContext);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (v: string) => {
    const newAnswers = [...answers, v];
    setAnswers(newAnswers);
    if (step < t.mini.questions.length - 1) {
      setStep(step + 1);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  // most-frequent answer
  const winner = answers.length === t.mini.questions.length
    ? Object.entries(answers.reduce((acc: any, a) => ({ ...acc, [a]: (acc[a] || 0) + 1 }), {}))
        .sort((a: any, b: any) => b[1] - a[1])[0][0]
    : null;

  const openRoadmap = () => {
    if (winner) {
      setOpenRoadmap(winner);
      setCurrentPage("roadmaps");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span className="text-xs font-bold text-slate-600 dark:text-white/70 uppercase tracking-wider">{t.mini.subtitle}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            {t.mini.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-400">
              {t.mini.titleAccent}
            </span>
          </h2>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl p-8 shadow-xl">
          {!showResult ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {/* progress */}
                <div className="flex gap-1.5 mb-6">
                  {t.mini.questions.map((_: any, i: number) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i <= step ? "bg-gradient-to-r from-cyan-500 to-pink-500" : "bg-slate-200 dark:bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/40 mb-2">
                  {step + 1} / {t.mini.questions.length}
                </p>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6">
                  {t.mini.questions[step].q}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {t.mini.questions[step].opts.map((o: any) => (
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
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-center py-4"
            >
              <div className="text-6xl mb-3">🎯</div>
              <p className="text-sm text-slate-500 dark:text-white/50 uppercase tracking-widest font-bold mb-2">
                {t.mini.result}
              </p>
              <h3 className={`text-3xl md:text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r ${roleNames[winner!].gradient}`}>
                {roleNames[winner!][lang as "EN" | "RU"]}
              </h3>

              <div className="flex flex-wrap justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openRoadmap}
                  className={`px-6 py-3 rounded-full bg-gradient-to-r ${roleNames[winner!].gradient} text-white font-bold shadow-lg flex items-center gap-2`}
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
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};