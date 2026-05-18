import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw, Home } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
}

interface QuizProps {
  onExit: () => void;
}

const glassCard = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]";

export const Quiz: React.FC<QuizProps> = ({ onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(1);

  const questions: Question[] = [
    {
      question: "Какой тип проектов вам интереснее всего?",
      options: [
        "Создание интерактивных веб-приложений",
        "Разработка умных систем и ботов",
        "Защита данных и систем от угроз",
        "Анализ больших объемов данных"
      ]
    },
    {
      question: "Что вас больше мотивирует в работе?",
      options: [
        "Видеть результат своего труда в виде красивого интерфейса",
        "Создавать решения, которые думают и учатся",
        "Находить и закрывать уязвимости",
        "Находить закономерности в хаосе данных"
      ]
    },
    {
      question: "Какой подход к решению задач вам ближе?",
      options: [
        "Визуальный и креативный",
        "Логический и математический",
        "Детективный и аналитический",
        "Исследовательский и статистический"
      ]
    },
    {
      question: "Что вы предпочитаете изучать в свободное время?",
      options: [
        "Новые фреймворки и UI библиотеки",
        "Алгоритмы машинного обучения",
        "Методы взлома и защиты систем",
        "Статистику и визуализацию данных"
      ]
    },
    {
      question: "Какая рабочая среда вам комфортнее?",
      options: [
        "Работа с дизайнерами и продакт-менеджерами",
        "Исследования и эксперименты с моделями",
        "Тестирование на проникновение",
        "Работа с базами данных и отчетами"
      ]
    }
  ];

  const categoryScores = {
    "Frontend Dev": 0,
    "AI Engineer": 0,
    "Cybersec": 0,
    "Data Scientist": 0
  };

  const resultColors: Record<string, string> = {
    "Frontend Dev": "cyan",
    "AI Engineer": "purple",
    "Cybersec": "red",
    "Data Scientist": "green"
  };

  const resultDescriptions: Record<string, string> = {
    "Frontend Dev": "Вы прирожденный Frontend Developer! Вас вдохновляет создание красивых и функциональных интерфейсов, которые радуют пользователей.",
    "AI Engineer": "Вы идеальный AI Engineer! Вам нравится создавать умные системы и работать с передовыми технологиями искусственного интеллекта.",
    "Cybersec": "Вы прирожденный специалист по кибербезопасности! Вам нравится находить уязвимости и защищать системы от угроз.",
    "Data Scientist": "Вы идеальный Data Scientist! Вам нравится находить инсайты в данных и создавать предсказательные модели."
  };

  const handleAnswer = (answerIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: answerIndex });
  };

  const goNext = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const goPrev = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const score = Object.keys(categoryScores).reduce((acc, role) => {
      const roleScore = Object.entries(answers).filter(([_, answerIdx]) => {
        const categories = ["Frontend Dev", "AI Engineer", "Cybersec", "Data Scientist"];
        return categories[answerIdx] === role;
      }).length;
      return { ...acc, [role]: roleScore };
    }, {} as Record<string, number>);

    const topRole = Object.entries(score).sort(([, a], [, b]) => b - a)[0][0];
    const color = resultColors[topRole];

    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${glassCard} p-12 max-w-2xl w-full relative z-10`}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-pink-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              <span className="text-5xl">🎉</span>
            </motion.div>

            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
              Ваш результат
            </h2>

            <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r from-${color}-500 to-${color}-600 text-white font-bold text-xl mb-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]`}>
              {topRole}
            </div>

            <div className="text-sm text-slate-500 dark:text-white/50 mt-2">
              <span className="font-bold">{Math.round((score[topRole] / questions.length) * 100)}%</span> совпадение
            </div>
          </div>

          <p className="text-lg text-slate-600 dark:text-white/70 mb-8 leading-relaxed">
            {resultDescriptions[topRole]}
          </p>

          <div className="space-y-4 mb-8">
            <p className="text-sm font-bold text-slate-700 dark:text-white/80 mb-4">Распределение баллов:</p>
            {Object.entries(categoryScores).map(([role]) => {
              const roleScore = Object.entries(answers).filter(([_, answerIdx]) => {
                const categories = ["Frontend Dev", "AI Engineer", "Cybersec", "Data Scientist"];
                return categories[answerIdx] === role;
              }).length;
              const percentage = (roleScore / questions.length) * 100;
              const roleColor = resultColors[role];

              return (
                <div key={role} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-700 dark:text-white/80 font-medium">{role}</span>
                    <span className={`text-${roleColor}-500 dark:text-${roleColor}-400 font-bold`}>{roleScore}/{questions.length}</span>
                  </div>
                  <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`bg-gradient-to-r from-${roleColor}-500 to-${roleColor}-600 dark:from-${roleColor}-400 dark:to-${roleColor}-500 h-full rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className={`px-8 py-4 rounded-full bg-gradient-to-r from-${color}-500 to-${color}-600 text-white font-bold tracking-wide shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center gap-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all`}
            >
              <RotateCcw className="w-5 h-5" />
              Пройти снова
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExit}
              className="px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold tracking-wide hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              На главную
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }
  

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== undefined;

  

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-slate-600 dark:text-white/70">
              Вопрос {currentQuestion + 1} из {questions.length}
            </span>
            <span className="text-sm font-bold text-cyan-500 dark:text-cyan-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-500 h-full rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.3 }}
            className={`${glassCard} p-10 mb-8`}
          >
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <span className="text-white font-black text-xl">{currentQuestion + 1}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight pt-1">
                {currentQ.question}
              </h3>
            </div>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => {
                const isSelected = answers[currentQuestion] === index;

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-5 rounded-2xl border-2 transition-all text-left relative overflow-hidden group
                      ${isSelected
                        ? 'border-cyan-500 dark:border-cyan-400 bg-cyan-500/10 dark:bg-cyan-500/20'
                        : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-cyan-500/50 dark:hover:border-cyan-400/50'
                      }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:to-pink-500/5 transition-all ${isSelected ? 'from-cyan-500/10 to-pink-500/10' : ''}`} />

                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                        ${isSelected
                          ? 'border-cyan-500 dark:border-cyan-400 bg-cyan-500 dark:bg-cyan-400'
                          : 'border-slate-400 dark:border-white/30'
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-white"
                          />
                        )}
                      </div>

                      <span className={`text-base font-medium transition-colors
                        ${isSelected
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-700 dark:text-white/80'
                        }`}
                      >
                        {option}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goPrev}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all backdrop-blur-md
              ${currentQuestion === 0
                ? 'opacity-40 cursor-not-allowed bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/50'
                : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10'
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Назад
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goNext}
            disabled={!isAnswered}
            className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all
              ${!isAnswered
                ? 'opacity-40 cursor-not-allowed bg-gradient-to-r from-cyan-500/50 to-pink-500/50 text-white'
                : 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]'
              }`}
          >
            {currentQuestion === questions.length - 1 ? 'Завершить' : 'Далее'}
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Exit Button */}
        <div className="text-center mt-8">
          <button
            onClick={onExit}
            className="text-sm text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/70 transition-colors font-medium"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
};
