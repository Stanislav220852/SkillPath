import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Award, Check, X, ChevronRight, RotateCcw, Trophy, Code, Clock, Target, BookOpen } from 'lucide-react';
import { finalExamData, type FinalExamData, type ExamQuestion, type CodeTask } from './examData';

const glassCard = "bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-[2rem] shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]";
const colorText: Record<string, string> = { cyan: "text-[var(--tp-dark)] dark:text-[var(--tp)]", pink: "text-[var(--tp-dark)] dark:text-[var(--tp)]", purple: "text-[var(--tp-dark)] dark:text-[var(--tp)]", blue: "text-[var(--tp-dark)] dark:text-[var(--tp)]", emerald: "text-[var(--tp-dark)] dark:text-[var(--tp)]", amber: "text-[var(--tp-dark)] dark:text-[var(--tp)]", orange: "text-[var(--tp-dark)] dark:text-[var(--tp)]", rose: "text-[var(--tp-dark)] dark:text-[var(--tp)]" };
const colorGradient: Record<string, string> = { cyan: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", pink: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", purple: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", blue: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", emerald: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", amber: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", orange: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", rose: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]" };

interface FinalExamProps {
  roadmapKey: string;
  colorClass: string;
  onBack: () => void;
  lang: string;
}

export const FinalExam: React.FC<FinalExamProps> = ({ roadmapKey, colorClass, onBack, lang }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [codeAnswers, setCodeAnswers] = useState<Record<number, string>>({});

  const exam = finalExamData[roadmapKey];

  if (!exam) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-3xl relative z-10">
          <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-stone-600 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all text-sm font-medium mb-8">
            <ArrowLeft className="w-4 h-4" /> {lang === 'RU' ? 'Назад' : 'Back'}
          </button>
          <div className={`${glassCard} p-8 text-center`}>
            <p className="text-stone-500 dark:text-white/50">{lang === 'RU' ? 'Экзамен ещё не готов' : 'Exam not ready yet'}</p>
          </div>
        </div>
      </div>
    );
  }

  const questions = exam.theory;
  const tasks = exam.practice;
  const question = questions[currentQ];
  const totalQ = questions.length;
  const correctCount = Object.entries(answers).filter(([idx, ans]) => questions[parseInt(idx)]?.correct === ans).length;

  const handleAnswer = (optionIdx: number) => {
    setAnswers({ ...answers, [currentQ]: optionIdx });
  };

  const checkCode = (task: CodeTask, code: string) => {
    const codeLower = code.toLowerCase();
    return task.checkFor.filter(kw => codeLower.includes(kw.toLowerCase())).length >= Math.ceil(task.checkFor.length * 0.5);
  };

  if (showResult) {
    const theoryPct = Math.round((correctCount / totalQ) * 100);
    const passed = theoryPct >= 70;
    return (
      <div className="min-h-screen pt-24 pb-20 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-3xl relative z-10">
          <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-stone-600 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all text-sm font-medium mb-8">
            <ArrowLeft className="w-4 h-4" /> {lang === 'RU' ? 'Назад к роадмапу' : 'Back to Roadmap'}
          </button>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`${glassCard} p-8 md:p-10 text-center`}>
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.2 }}
              className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${colorGradient[colorClass]} flex items-center justify-center mx-auto mb-6 shadow-xl`}>
              {passed ? <Award className="w-12 h-12 text-white" /> : <Trophy className="w-12 h-12 text-white" />}
            </motion.div>
            <h2 className="text-2xl font-black text-stone-900 dark:text-white mb-2">
              {passed ? (lang === 'RU' ? '🏆 Экзамен сдан!' : '🏆 Exam Passed!') : (lang === 'RU' ? '📚 Нужно подтянуть' : '📚 Needs Improvement')}
            </h2>
            <p className="text-stone-500 dark:text-white/50 mb-2">
              {lang === 'RU' ? 'Теория:' : 'Theory:'} {correctCount}/{totalQ} ({theoryPct}%)
            </p>
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${passed ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'} font-bold mt-4 mb-8`}>
              {passed ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              {passed ? (lang === 'RU' ? 'Поздравляем! Ты готов к профессии!' : 'Congratulations! You\'re ready for the profession!') : (lang === 'RU' ? 'Набери минимум 70%' : 'Score at least 70%')}
            </div>
            {passed && (
              <div className="mb-6 p-4 rounded-xl bg-[var(--tp)]/5 border border-[var(--tp)]/20">
                <p className="text-sm text-stone-600 dark:text-white/60">{lang === 'RU' ? 'В реальном экзамене ты также получишь:' : 'In the real exam you\'ll also get:'}</p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {['Сертификат', 'Рекомендация', 'Сообщество'].map((b, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-[var(--tp)]/10 font-bold">{b}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setAnswers({}); setCurrentQ(0); setShowResult(false); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-stone-700 dark:text-white font-bold text-sm hover:bg-black/10 dark:hover:bg-white/20 transition-all">
                <RotateCcw className="w-4 h-4" /> {lang === 'RU' ? 'Пересдать' : 'Retry'}
              </button>
              <button onClick={onBack}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${colorGradient[colorClass]} text-white font-bold text-sm hover:opacity-90 transition-all`}>
                <ArrowLeft className="w-4 h-4" /> {lang === 'RU' ? 'К роадмапу' : 'To Roadmap'}
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
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-stone-600 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all text-sm font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> {lang === 'RU' ? 'Назад' : 'Back'}
        </button>

        <div className="mb-6">
          <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${colorText[colorClass]}`}>
            {lang === 'RU' ? '🏆 Финальный экзамен' : '🏆 Final Exam'}
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white">{exam.title}</h1>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-bold text-stone-500 dark:text-white/40">{currentQ + 1}/{totalQ}</span>
          <div className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${((currentQ + 1) / totalQ) * 100}%` }}
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
            <ArrowLeft className="w-4 h-4" /> {lang === 'RU' ? 'Назад' : 'Back'}
          </button>
          {currentQ < totalQ - 1 ? (
            <button onClick={() => setCurrentQ(currentQ + 1)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${colorGradient[colorClass]} text-white font-bold text-sm hover:opacity-90 transition-all`}>
              {lang === 'RU' ? 'Далее' : 'Next'} <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={() => setShowResult(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${colorGradient[colorClass]} text-white font-bold text-sm hover:opacity-90 transition-all`}>
              <Trophy className="w-4 h-4" /> {lang === 'RU' ? 'Завершить экзамен' : 'Finish Exam'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
