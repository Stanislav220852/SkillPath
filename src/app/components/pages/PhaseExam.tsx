import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ClipboardCheck, Check, X, ChevronRight, RotateCcw, Trophy, Code } from 'lucide-react';
import { examData, type PhaseExamData, type ExamQuestion, type CodeTask } from './examData';

const glassCard = "bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-[2rem] shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]";
const colorText: Record<string, string> = { cyan: "text-[var(--tp-dark)] dark:text-[var(--tp)]", pink: "text-[var(--tp-dark)] dark:text-[var(--tp)]", purple: "text-[var(--tp-dark)] dark:text-[var(--tp)]", blue: "text-[var(--tp-dark)] dark:text-[var(--tp)]", emerald: "text-[var(--tp-dark)] dark:text-[var(--tp)]", amber: "text-[var(--tp-dark)] dark:text-[var(--tp)]", orange: "text-[var(--tp-dark)] dark:text-[var(--tp)]", rose: "text-[var(--tp-dark)] dark:text-[var(--tp)]" };
const colorGradient: Record<string, string> = { cyan: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", pink: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", purple: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", blue: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", emerald: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", amber: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", orange: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", rose: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]" };

interface PhaseExamProps {
  roadmapKey: string;
  phaseIdx: number;
  colorClass: string;
  onBack: () => void;
  lang: string;
}

export const PhaseExam: React.FC<PhaseExamProps> = ({ roadmapKey, phaseIdx, colorClass, onBack, lang }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [codeAnswers, setCodeAnswers] = useState<Record<number, string>>({});

  const examKey = `phase-${phaseIdx}`;
  const examDataForPhase = examData[roadmapKey]?.[examKey] as PhaseExamData | undefined;

  if (!examDataForPhase) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-3xl relative z-10">
          <button onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-stone-600 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all text-sm font-medium mb-8">
            <ArrowLeft className="w-4 h-4" />
            {lang === 'RU' ? 'Назад' : 'Back'}
          </button>
          <div className={`${glassCard} p-8 text-center`}>
            <p className="text-stone-500 dark:text-white/50">{lang === 'RU' ? 'Зачёт ещё не доступен' : 'Exam not available yet'}</p>
          </div>
        </div>
      </div>
    );
  }

  const questions = examDataForPhase.theory;
  const tasks = examDataForPhase.practice;
  const question = questions[currentQ];
  const totalTheory = questions.length;
  const correctCount = Object.entries(answers).filter(([idx, ans]) => questions[parseInt(idx)]?.correct === ans).length;

  const handleAnswer = (optionIdx: number) => {
    setAnswers({ ...answers, [currentQ]: optionIdx });
  };

  const checkCode = (task: CodeTask, code: string) => {
    const codeLower = code.toLowerCase();
    const matched = task.checkFor.filter(kw => codeLower.includes(kw.toLowerCase()));
    return matched.length >= Math.ceil(task.checkFor.length * 0.5);
  };

  if (showResult) {
    const pct = Math.round((correctCount / totalTheory) * 100);
    const passed = pct >= 60;
    return (
      <div className="min-h-screen pt-24 pb-20 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-3xl relative z-10">
          <button onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-stone-600 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all text-sm font-medium mb-8">
            <ArrowLeft className="w-4 h-4" />
            {lang === 'RU' ? 'Назад к роадмапу' : 'Back to Roadmap'}
          </button>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`${glassCard} p-8 md:p-10 text-center`}>
            <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
            <h2 className="text-2xl font-black text-stone-900 dark:text-white mb-2">
              {passed ? (lang === 'RU' ? 'Зачёт сдан!' : 'Exam Passed!') : (lang === 'RU' ? 'Нужно подтянуть' : 'Needs Improvement')}
            </h2>
            <p className="text-stone-500 dark:text-white/50 mb-6">
              {correctCount}/{totalTheory} ({pct}%)
            </p>
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${passed ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'} font-bold`}>
              {passed ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              {passed ? (lang === 'RU' ? 'Прошёл порог 60%' : 'Passed 60% threshold') : (lang === 'RU' ? 'Набери минимум 60%' : 'Score at least 60%')}
            </div>
            <div className="flex gap-3 justify-center mt-8">
              <button onClick={() => { setAnswers({}); setCurrentQ(0); setShowResult(false); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-stone-700 dark:text-white font-bold text-sm hover:bg-black/10 dark:hover:bg-white/20 transition-all">
                <RotateCcw className="w-4 h-4" />
                {lang === 'RU' ? 'Пересдать' : 'Retry'}
              </button>
              <button onClick={onBack}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${colorGradient[colorClass]} text-white font-bold text-sm hover:opacity-90 transition-all`}>
                <ArrowLeft className="w-4 h-4" />
                {lang === 'RU' ? 'К роадмапу' : 'To Roadmap'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-5 md:px-6 relative">
      <div className="container mx-auto max-w-3xl relative z-10">
        <button onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-stone-600 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all text-sm font-medium mb-8">
          <ArrowLeft className="w-4 h-4" />
          {lang === 'RU' ? 'Назад' : 'Back'}
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${colorText[colorClass]}`}>
            {lang === 'RU' ? 'Зачёт' : 'Exam'}: {examDataForPhase.phaseName}
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white">
            {lang === 'RU' ? 'Теория и практика' : 'Theory and Practice'}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 bg-black/5 dark:bg-white/5 rounded-xl">
          <button onClick={() => setActiveTab('theory')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'theory' ? 'bg-white dark:bg-white/10 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-white/40'
            }`}>
            <ClipboardCheck className="w-4 h-4" />
            {lang === 'RU' ? 'Теория' : 'Theory'}
          </button>
          <button onClick={() => setActiveTab('practice')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'practice' ? 'bg-white dark:bg-white/10 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-white/40'
            }`}>
            <Code className="w-4 h-4" />
            {lang === 'RU' ? 'Практика' : 'Practice'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'theory' && (
            <motion.div key="theory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {/* Progress */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-bold text-stone-500 dark:text-white/40">
                  {currentQ + 1}/{totalTheory}
                </span>
                <div className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${((currentQ + 1) / totalTheory) * 100}%` }}
                    className={`h-full rounded-full bg-gradient-to-r ${colorGradient[colorClass]}`} />
                </div>
              </div>

              {/* Question */}
              <div className={`${glassCard} p-6 mb-6`}>
                <p className="text-lg font-bold text-stone-900 dark:text-white mb-5">{question.question}</p>
                <div className="space-y-3">
                  {question.options.map((opt, i) => {
                    const selected = answers[currentQ] === i;
                    const isCorrect = i === question.correct;
                    const answered = answers[currentQ] !== undefined;
                    return (
                      <button key={i} onClick={() => !answered && handleAnswer(i)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3
                          ${answered
                            ? isCorrect ? 'border-green-500 bg-green-500/10' : selected ? 'border-red-500 bg-red-500/10' : 'border-black/10 dark:border-white/10 opacity-50'
                            : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 bg-black/5 dark:bg-white/5'
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                          ${answered && isCorrect ? 'bg-green-500 text-white' : answered && selected ? 'bg-red-500 text-white' : 'bg-black/10 dark:bg-white/10 text-stone-500'}`}>
                          {answered && isCorrect ? <Check className="w-4 h-4" /> : answered && selected ? <X className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                        </div>
                        <span className={`text-sm font-medium ${answered && isCorrect ? 'text-green-700 dark:text-green-400' : answered && selected ? 'text-red-600 dark:text-red-400' : 'text-stone-700 dark:text-white/80'}`}>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {answers[currentQ] !== undefined && question.explanation && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-xl bg-[var(--tp)]/5 border border-[var(--tp)]/20">
                    <p className="text-xs text-stone-600 dark:text-white/60">{question.explanation}</p>
                  </motion.div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-stone-600 dark:text-white/60 font-medium text-sm disabled:opacity-30 hover:bg-black/10 dark:hover:bg-white/20 transition-all">
                  <ArrowLeft className="w-4 h-4" />
                  {lang === 'RU' ? 'Назад' : 'Back'}
                </button>
                {currentQ < totalTheory - 1 ? (
                  <button onClick={() => setCurrentQ(currentQ + 1)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${colorGradient[colorClass]} text-white font-bold text-sm hover:opacity-90 transition-all`}>
                    {lang === 'RU' ? 'Далее' : 'Next'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => setShowResult(true)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${colorGradient[colorClass]} text-white font-bold text-sm hover:opacity-90 transition-all`}>
                    <Trophy className="w-4 h-4" />
                    {lang === 'RU' ? 'Завершить' : 'Finish'}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'practice' && (
            <motion.div key="practice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-4">
              {tasks.map((task, i) => {
                const code = codeAnswers[i] || task.starterCode;
                const checked = codeAnswers[`${i}_checked`];
                const isCorrect = checkCode(task, code);
                return (
                  <div key={task.id} className={`${glassCard} p-5`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Code className={`w-5 h-5 ${colorText[colorClass]}`} />
                      <span className="text-sm font-bold text-stone-900 dark:text-white">{lang === 'RU' ? 'Задание' : 'Task'} {i + 1}</span>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-white/70 mb-3">{task.task}</p>
                    <textarea value={code} onChange={e => setCodeAnswers({ ...codeAnswers, [i]: e.target.value })}
                      className="w-full h-32 p-3 rounded-xl bg-[#282c34] text-green-400 font-mono text-sm border border-black/10 dark:border-white/10 focus:outline-none focus:border-[var(--tp)] resize-none" />
                    <button onClick={() => setCodeAnswers({ ...codeAnswers, [`${i}_checked`]: true })}
                      className={`mt-3 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        checked ? (isCorrect ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500') : `bg-gradient-to-r ${colorGradient[colorClass]} text-white hover:opacity-90`
                      }`}>
                      {checked ? (isCorrect ? '✅' : '❌') : (lang === 'RU' ? 'Проверить' : 'Check')}
                    </button>
                    {task.hint && (
                      <p className="mt-2 text-xs text-stone-400 dark:text-white/30 italic">💡 {task.hint}</p>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
