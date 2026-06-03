import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Home } from 'lucide-react';


interface Question {
  question: string;
  options: string[];
}


interface QuizProps {
  onExit: () => void;
  lang: "RU" | "EN";
  onGoToRoadmap?: (roadmapKey: string) => void;
}


const glassCard = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]";


export const Quiz: React.FC<QuizProps> = ({ onExit, lang, onGoToRoadmap }) => {
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
  question: "Что тебе интереснее всего?",
  options: [
    "Создавать красивые интерфейсы",
    "Обучать нейросети",
    "Искать уязвимости",
    "Анализировать данные",
    "Писать серверную логику",
    "Создавать мобильные приложения",
    "Настраивать инфраструктуру",
    "Создавать игровые миры"
  ]
},
{
  question: "Что тебя больше вдохновляет?",
  options: [
    "UI и дизайн",
    "Искусственный интеллект",
    "Безопасность",
    "Статистика",
    "API и базы данных",
    "iOS / Android",
    "Автоматизация процессов",
    "Графика и анимация"
  ]
},
{
  question: "Какой тип задач тебе ближе?",
  options: [
    "Креативные",
    "Математические",
    "Аналитические",
    "Исследовательские",
    "Архитектурные",
    "Практичные",
    "Системные",
    "Творческие"
  ]
},
{
  question: "Где ты видишь себя?",
  options: [
    "В веб‑разработке",
    "В AI стартапе",
    "В киберотделе",
    "В аналитике",
    "В backend‑команде",
    "В мобильной студии",
    "В DevOps команде",
    "В гейм‑индустрии"
  ]
},
{
  question: "Что тебе нравится изучать?",
  options: [
    "React / Vue",
    "PyTorch",
    "Kali Linux",
    "Pandas",
    "Node.js",
    "React Native",
    "Docker",
    "Unity"
  ]
},
{
  question: "Какая работа кажется крутой?",
  options: [
    "Frontend Developer",
    "ML Engineer",
    "Pentester",
    "Data Scientist",
    "Backend Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "Game Developer"
  ]
},
{
  question: "Какой инструмент ближе?",
  options: [
    "Figma",
    "Jupyter Notebook",
    "Wireshark",
    "Excel",
    "PostgreSQL",
    "Xcode",
    "AWS",
    "Unreal Engine"
  ]
},
{
  question: "Что приносит кайф?",
  options: [
    "Красивый UI",
    "Работающий алгоритм",
    "Закрытая уязвимость",
    "График с инсайтом",
    "Стабильный сервер",
    "Запущенное приложение",
    "Автоматизированный деплой",
    "Играбельный уровень"
  ]
},
{
  question: "Что тебе проще?",
  options: [
    "Верстка",
    "Математика",
    "Логика атак",
    "Статистика",
    "Архитектура API",
    "UI для мобильных",
    "Настройка серверов",
    "Работа с 3D"
  ]
},
{
  question: "Какой формат нравится?",
  options: [
    "Веб‑проекты",
    "AI проекты",
    "CTF соревнования",
    "Data проекты",
    "Backend сервисы",
    "Мобильные приложения",
    "Облачные системы",
    "Игры"
  ]
},
{
  question: "Что кажется сложным, но интересным?",
  options: [
    "CSS анимации",
    "Нейросети",
    "Этичный хакинг",
    "A/B тесты",
    "Микросервисы",
    "Push уведомления",
    "Kubernetes",
    "Шейдеры"
  ]
},
{
  question: "Что ближе к характеру?",
  options: [
    "Креатив",
    "Интеллект",
    "Настороженность",
    "Аналитика",
    "Структурность",
    "Практичность",
    "Контроль",
    "Воображение"
  ]
},
{
  question: "Что хочешь создавать?",
  options: [
    "Сайты",
    "ИИ системы",
    "Безопасные системы",
    "Отчёты",
    "Серверы",
    "Приложения",
    "Инфраструктуру",
    "Игры"
  ]
},
{
  question: "Какой стиль работы?",
  options: [
    "Работа с дизайном",
    "Исследования",
    "Защита",
    "Анализ",
    "Архитектура",
    "UX мобильный",
    "Автоматизация",
    "Геймдизайн"
  ]
},
{
  question: "Кем хочешь стать через 3 года?",
  options: [
    "Senior Frontend",
    "AI Lead",
    "Security Expert",
    "Data Lead",
    "Backend Architect",
    "Mobile Lead",
    "Cloud Engineer",
    "Game Director"
  ]
}
],
      descriptions: {
        "Frontend Dev": "Вы прирожденный Frontend Developer! Вас вдохновляет создание красивых и функциональных интерфейсов, которые радуют пользователей.",
        "AI Engineer": "Вы идеальный AI Engineer! Вам нравится создавать умные системы и работать с передовыми технологиями искусственного интеллекта.",
        "Cybersec": "Вы прирожденный специалист по кибербезопасности! Вам нравится находить уязвимости и защищать системы от угроз.",
        "Data Scientist": "Вы идеальный Data Scientist! Вам нравится находить инсайты в данных и создавать предсказательные модели.",
        "Backend Dev": "Вы Backend‑разработчик! Вам нравится создавать масштабируемые API, работать с базами данных и строить надёжную серверную архитектуру, которая является сердцем любого приложения.",

        "Mobile Dev": "Вы Mobile‑разработчик! Вам нравится создавать приложения, которыми люди пользуются каждый день на своих смартфонах.",

        "DevOps Engineer": "Вы DevOps‑инженер! Вам по душе автоматизация, облачные технологии и построение надёжной инфраструктуры для быстрого и стабильного выпуска продуктов.",

        "Game Developer": "Вы Game‑разработчик! Вам нравится создавать игровые миры, продумывать механику и превращать идеи в интерактивные впечатления."
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
  question: "What excites you the most?",
  options: [
    "Designing beautiful interfaces",
    "Training neural networks",
    "Finding system vulnerabilities",
    "Analyzing data patterns",
    "Building server logic",
    "Creating mobile apps",
    "Managing cloud infrastructure",
    "Building game worlds"
  ]
},
{
  question: "What motivates you at work?",
  options: [
    "Seeing a polished UI",
    "Making machines learn",
    "Securing systems",
    "Finding insights in data",
    "Designing APIs",
    "Launching mobile apps",
    "Automating deployments",
    "Creating immersive gameplay"
  ]
},
{
  question: "What type of thinking suits you?",
  options: [
    "Creative and visual",
    "Logical and mathematical",
    "Analytical and investigative",
    "Statistical and research-based",
    "Architectural and structural",
    "Practical and user-focused",
    "System-oriented",
    "Imaginative and artistic"
  ]
},
{
  question: "Where do you see yourself working?",
  options: [
    "Web development team",
    "AI startup",
    "Cybersecurity department",
    "Data analytics team",
    "Backend engineering team",
    "Mobile development studio",
    "DevOps/cloud team",
    "Game development studio"
  ]
},
{
  question: "Which technology sounds most exciting?",
  options: [
    "React / Vue",
    "PyTorch / TensorFlow",
    "Kali Linux",
    "Pandas / NumPy",
    "Node.js / Django",
    "React Native / Swift",
    "Docker / Kubernetes",
    "Unity / Unreal Engine"
  ]
},
{
  question: "What kind of project would you start today?",
  options: [
    "A personal website",
    "An AI chatbot",
    "A penetration testing lab",
    "A data dashboard",
    "A REST API service",
    "A mobile productivity app",
    "A cloud automation script",
    "A 2D or 3D game"
  ]
},
{
  question: "Which tool feels closest to you?",
  options: [
    "Figma",
    "Jupyter Notebook",
    "Wireshark",
    "Excel / Tableau",
    "PostgreSQL",
    "Xcode / Android Studio",
    "AWS Console",
    "Blender / Unity Editor"
  ]
},
{
  question: "What gives you the most satisfaction?",
  options: [
    "A perfectly styled layout",
    "A model that predicts accurately",
    "A vulnerability patched",
    "A graph that reveals insight",
    "A stable backend system",
    "An app published to stores",
    "A successful CI/CD pipeline",
    "A playable level"
  ]
},
{
  question: "What feels easier for you?",
  options: [
    "Styling components",
    "Solving math problems",
    "Understanding attack logic",
    "Interpreting statistics",
    "Designing APIs",
    "Optimizing mobile UX",
    "Configuring servers",
    "Working with 3D environments"
  ]
},
{
  question: "Which environment do you prefer?",
  options: [
    "Collaborating with designers",
    "Researching and experimenting",
    "Testing system defenses",
    "Exploring datasets",
    "Building scalable services",
    "Designing mobile flows",
    "Managing infrastructure",
    "Designing gameplay mechanics"
  ]
},
{
  question: "What sounds challenging but exciting?",
  options: [
    "Advanced CSS animations",
    "Deep learning models",
    "Ethical hacking",
    "A/B testing",
    "Microservices architecture",
    "Push notifications system",
    "Kubernetes clusters",
    "Shader programming"
  ]
},
{
  question: "Which trait describes you best?",
  options: [
    "Creative",
    "Intelligent",
    "Cautious",
    "Analytical",
    "Structured",
    "User-oriented",
    "Control-focused",
    "Imaginative"
  ]
},
{
  question: "What do you want to build?",
  options: [
    "Web platforms",
    "AI-powered systems",
    "Secure infrastructures",
    "Data-driven reports",
    "High-performance servers",
    "Mobile ecosystems",
    "Automated systems",
    "Interactive games"
  ]
},
{
  question: "What type of learning do you enjoy?",
  options: [
    "UI frameworks",
    "Machine learning research",
    "Security practices",
    "Data modeling",
    "Backend frameworks",
    "Mobile UI/UX",
    "Cloud architecture",
    "Game engines"
  ]
},
{
  question: "Who do you want to become in 3 years?",
  options: [
    "Senior Frontend Developer",
    "AI Lead Engineer",
    "Security Expert",
    "Data Science Lead",
    "Backend Architect",
    "Mobile Lead Developer",
    "Cloud / DevOps Engineer",
    "Game Director"
  ]
}
],
      descriptions: {
        "Frontend Dev": "You are a natural Frontend Developer! You are inspired by creating beautiful and functional interfaces that delight users.",
        "AI Engineer": "You are a perfect AI Engineer! You enjoy creating smart systems and working with cutting-edge AI technologies.",
        "Cybersec": "You are a born Cybersecurity Specialist! You enjoy finding vulnerabilities and protecting systems from threats.",
        "Data Scientist": "You are an ideal Data Scientist! You enjoy finding insights in data and creating predictive models.",
        "Backend Dev": "You are a Backend Developer! You enjoy building scalable APIs, databases, and the engine behind every application.",
        "Mobile Dev": "You are a Mobile Developer! You love creating apps that people use every day on their phones.",
        "DevOps Engineer": "You are a DevOps Engineer! You thrive on automation, cloud systems, and building reliable infrastructure.",
        "Game Developer": "You are a Game Developer! You enjoy creating immersive worlds, gameplay mechanics, and interactive experiences."
      }
    }
  };


  const currentContent = quizData[lang];
  const questions = currentContent.questions;


  const categories = [
  "Frontend Dev",
  "AI Engineer",
  "Cybersec",
  "Data Scientist",
  "Backend Dev",
  "Mobile Dev",
  "DevOps Engineer",
  "Game Developer"
];


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
    const score: Record<string, number> = {};

categories.forEach((cat) => (score[cat] = 0));

Object.values(answers).forEach((answerIndex) => {
  const role = categories[answerIndex];
  if (role) {
    score[role]++;
  }
});


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
      },
      "Backend Dev": {
  grad: "from-emerald-400 to-green-500",
  btn: "from-emerald-500 to-green-600",
  text: "text-emerald-500",
  shadow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]"
},
"Mobile Dev": {
  grad: "from-amber-400 to-orange-500",
  btn: "from-amber-500 to-orange-600",
  text: "text-amber-500",
  shadow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]"
},
"DevOps Engineer": {
  grad: "from-orange-400 to-red-500",
  btn: "from-orange-500 to-red-600",
  text: "text-orange-500",
  shadow: "shadow-[0_0_20px_rgba(249,115,22,0.3)]"
},
"Game Developer": {
  grad: "from-rose-400 to-pink-500",
  btn: "from-rose-500 to-pink-600",
  text: "text-rose-500",
  shadow: "shadow-[0_0_20px_rgba(244,63,94,0.3)]"
}
    };

    const roleToRoadmapKey: Record<string, string> = {
      "Frontend Dev": "frontend",
      "AI Engineer": "ai",
      "Cybersec": "cybersec",
      "Data Scientist": "datascience",
      "Backend Dev": "backend",
      "Mobile Dev": "mobile",
      "DevOps Engineer": "devops",
      "Game Developer": "gamedev",
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
              onClick={() => {
                if (onGoToRoadmap) {
                  onGoToRoadmap(roleToRoadmapKey[topRole] || "frontend");
                }
              }}
              className={`px-10 py-4 rounded-full bg-gradient-to-r ${activeStyle.btn} text-white font-black flex items-center justify-center gap-2 shadow-lg ${activeStyle.shadow} transition-all`}
            >
              <ChevronRight className="w-5 h-5" /> {lang === "RU" ? "Перейти к роадмапу" : "Go to Roadmap"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="px-10 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <RotateCcw className="w-5 h-5" /> {currentContent.ui.retry}
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
