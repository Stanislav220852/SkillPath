import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw, Home } from 'lucide-react';


interface Question {
  question: string;
  options: string[];
}


interface QuizProps {
  onExit: () => void;
  lang: "RU" | "EN";
}


const glassCard = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]";


export const Quiz: React.FC<QuizProps> = ({ onExit, lang }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(1);


  // --- ЛОКАЛИЗАЦИЯ ДАННЫХ ---
  const quizData = {
    RU: {
      ui: {
        result: "Ваш результат",
        match: "совпадение",
        dist: "Распределение баллов:",
        retry: "Пройти снова",
        home: "На главную",
        back: "Назад",
        next: "Далее",
        finish: "Завершить",
        question: "Вопрос",
        of: "из"
      },
      questions: [
        {
          question: "Какой тип проектов вам интереснее всего?",
          options: ["Создание интерактивных веб-приложений", "Разработка умных систем и ботов", "Защита данных и систем от угроз", "Анализ больших объемов данных"]
        },
        {
          question: "Что вас больше мотивирует в работе?",
          options: ["Видеть результат своего труда в виде красивого интерфейса", "Создавать решения, которые думают и учатся", "Находить и закрывать уязвимости", "Находить закономерности в хаосе данных"]
        },
        {
          question: "Какой подход к решению задач вам ближе?",
          options: ["Визуальный и креативный", "Логический и математический", "Детективный и аналитический", "Исследовательский и статистический"]
        },
        {
          question: "Что вы предпочитаете изучать в свободное время?",
          options: ["Новые фреймворки и UI библиотеки", "Алгоритмы машинного обучения", "Методы взлома и защиты систем", "Статистику и визуализацию данных"]
        },
        {
          question: "Какая рабочая среда вам комфортнее?",
          options: ["Работа с дизайнерами и продакт-менеджерами", "Исследования и эксперименты с моделями", "Тестирование на проникновение", "Работа с базами данных и отчетами"]
        }
      ],
      descriptions: {
        "Frontend Dev": "Вы прирожденный Frontend Developer! Вас вдохновляет создание красивых и функциональных интерфейсов, которые радуют пользователей.",
        "AI Engineer": "Вы идеальный AI Engineer! Вам нравится создавать умные системы и работать с передовыми технологиями искусственного интеллекта.",
        "Cybersec": "Вы прирожденный специалист по кибербезопасности! Вам нравится находить уязвимости и защищать системы от угроз.",
        "Data Scientist": "Вы идеальный Data Scientist! Вам нравится находить инсайты в данных и создавать предсказательные модели."
      }
    },
    EN: {
      ui: {
        result: "Your Result",
        match: "match",
        dist: "Score distribution:",
        retry: "Try Again",
        home: "Home",
        back: "Back",
        next: "Next",
        finish: "Finish",
        question: "Question",
        of: "of"
      },
      questions: [
        {
          question: "What type of projects interest you the most?",
          options: ["Creating interactive web applications", "Developing smart systems and bots", "Protecting data and systems from threats", "Analyzing large volumes of data"]
        },
        {
          question: "What motivates you most at work?",
          options: ["Seeing the result in a beautiful interface", "Creating solutions that think and learn", "Finding and fixing vulnerabilities", "Finding patterns in data chaos"]
        },
        {
          question: "What problem-solving approach is closer to you?",
          options: ["Visual and creative", "Logical and mathematical", "Detective and analytical", "Research and statistical"]
        },
        {
          question: "What do you prefer to study in your free time?",
          options: ["New frameworks and UI libraries", "Machine learning algorithms", "Methods of hacking and system defense", "Statistics and data visualization"]
        },
        {
          question: "Which work environment is more comfortable for you?",
          options: ["Working with designers and product managers", "Research and experimentation with models", "Penetration testing", "Working with databases and reports"]
        }
      ],
      descriptions: {
        "Frontend Dev": "You are a natural Frontend Developer! You are inspired by creating beautiful and functional interfaces that delight users.",
        "AI Engineer": "You are a perfect AI Engineer! You enjoy creating smart systems and working with cutting-edge AI technologies.",
        "Cybersec": "You are a born Cybersecurity Specialist! You enjoy finding vulnerabilities and protecting systems from threats.",
        "Data Scientist": "You are an ideal Data Scientist! You enjoy finding insights in data and creating predictive models."
      }
    }
  };


  const currentContent = quizData[lang];
  const questions = currentContent.questions;


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
    const categories = ["Frontend Dev", "AI Engineer", "Cybersec", "Data Scientist"];
    const score = categories.reduce((acc, role) => {
      const roleScore = Object.entries(answers).filter(([_, answerIdx]) => {
        return categories[Number(answerIdx)] === role;
      }).length;
      return { ...acc, [role]: roleScore };
    }, {} as Record<string, number>);


    const topRole = Object.entries(score).sort(([, a], [, b]) => b - a)[0][0];


    // СЛОВАРЬ ГРАДИЕНТОВ И ЦВЕТОВ
    const barStyles: Record<string, { grad: string, text: string, shadow: string, btn: string }> = {
      "Frontend Dev": {
        grad: "from-cyan-400 to-blue-500",
        btn: "from-cyan-500 to-blue-600",
        text: "text-cyan-500",
        shadow: "shadow-[0_0_20px_rgba(6,182,212,0.3)]"
      },
      "AI Engineer": {
        grad: "from-purple-400 to-pink-500",
        btn: "from-purple-500 to-pink-600",
        text: "text-purple-500",
        shadow: "shadow-[0_0_20px_rgba(168,85,247,0.3)]"
      },
      "Cybersec": {
        grad: "from-red-400 to-orange-500",
        btn: "from-red-500 to-orange-600",
        text: "text-red-500",
        shadow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]"
      },
      "Data Scientist": {
        grad: "from-green-400 to-emerald-500",
        btn: "from-green-500 to-emerald-600",
        text: "text-green-500",
        shadow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]"
      }
    };


    const activeStyle = barStyles[topRole];


    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
        {/* Фоновые эффекты */}
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
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${activeStyle.btn} flex items-center justify-center shadow-xl`}
            >
              <span className="text-5xl">🎉</span>
            </motion.div>


            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{currentContent.ui.result}</h2>


            <div className={`inline-block px-8 py-3 rounded-full bg-gradient-to-r ${activeStyle.grad} text-white font-bold text-2xl mb-2 shadow-lg`}>
              {topRole}
            </div>


            <div className="text-sm text-slate-500 dark:text-white/50 mt-2 uppercase tracking-widest font-bold">
              {Math.round((score[topRole] / questions.length) * 100)}% {currentContent.ui.match}
            </div>
          </div>


          <p className="text-lg text-slate-600 dark:text-white/70 mb-10 text-center leading-relaxed">
            {currentContent.descriptions[topRole as keyof typeof currentContent.descriptions]}
          </p>


          <div className="space-y-6 mb-10">
            <p className="text-sm font-bold text-slate-700 dark:text-white/80 mb-4">{currentContent.ui.dist}</p>
            {categories.map((role) => {
              const roleScore = score[role];
              const percentage = (roleScore / questions.length) * 100;
              const style = barStyles[role];


              return (
                <div key={role} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-700 dark:text-white/80 font-bold">{role}</span>
                    <span className={`${style.text} font-black`}>{roleScore}/{questions.length}</span>
                  </div>
                  <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      className={`bg-gradient-to-r ${style.grad} ${style.shadow} h-full rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>


          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className={`px-10 py-4 rounded-full bg-gradient-to-r ${activeStyle.btn} text-white font-black flex items-center justify-center gap-2 shadow-lg transition-all`}
            >
              <RotateCcw className="w-5 h-5" /> {currentContent.ui.retry}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExit}
              className="px-10 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <Home className="w-5 h-5" /> {currentContent.ui.home}
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
      <div className="max-w-3xl w-full relative z-10">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-slate-600 dark:text-white/70">
              {currentContent.ui.question} {currentQuestion + 1} {currentContent.ui.of} {questions.length}
            </span>
            <span className="text-sm font-bold text-cyan-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} className="bg-gradient-to-r from-cyan-500 to-pink-500 h-full rounded-full" />
          </div>
        </div>


        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            className={`${glassCard} p-10 mb-8`}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{currentQ.question}</h3>
            <div className="space-y-4">
              {currentQ.options.map((option, index) => {
                const isSelected = answers[currentQuestion] === index;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ x: 5 }}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4 ${isSelected ? 'border-cyan-500 bg-cyan-500/10' : 'border-black/10 dark:border-white/10'}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-slate-400'}`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="font-medium">{option}</span>
                  </motion.button>
                );
              })}
            </div>


          </motion.div>
        </AnimatePresence>



        <div className="flex justify-between items-center">
          <motion.button onClick={goPrev} disabled={currentQuestion === 0} className="px-6 py-3 rounded-full font-bold flex items-center gap-2 border border-black/10 disabled:opacity-40">
            <ChevronLeft className="w-5 h-5" /> {currentContent.ui.back}
          </motion.button>

          <motion.button onClick={goNext} disabled={!isAnswered} className="px-6 py-3 rounded-full font-bold flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white disabled:opacity-40">
            {currentQuestion === questions.length - 1 ? currentContent.ui.finish : currentContent.ui.next} <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="mt-16 pt-8 border-t border-black/5 dark:border-white/10 text-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExit}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10 transition-all backdrop-blur-md shadow-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:text-cyan-500 transition-colors">
              <Home className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase">
              {currentContent.ui.home}
            </span>
          </motion.button>

          {/* Подсказка под кнопкой */}
          <p className="mt-4 text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] font-medium">

          </p>
        </div>
      </div>
    </div>
  );
};
