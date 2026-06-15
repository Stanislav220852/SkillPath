import React, { useState, useEffect, useCallback, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "../../App";
import { themes, type ThemeId } from "../../theme.config";
import { GuideDialog } from "./GuideDialog";
import { guideDialogs, type CharacterState, type ItemKind } from "./guideData";

const PIXEL = 6;
const GRID = 16;
type PC = string | null;

const EYES_OPEN: PC[][] = [
  [null,null,null,null,"#fff","#fff",null,null,null,"#fff","#fff",null,null,null,null,null],
  [null,null,null,"#fff","#000","#000","#fff",null,"#fff","#000","#000","#fff",null,null,null,null],
  [null,null,null,"#fff","#000","#000","#fff",null,"#fff","#000","#000","#fff",null,null,null,null],
  [null,null,null,null,"#fff","#fff",null,null,null,"#fff","#fff",null,null,null,null,null],
];
const EYES_CLOSED: PC[][] = [
  [null,null,null,null,"#fff","#fff",null,null,null,"#fff","#fff",null,null,null,null,null],
  [null,null,null,null,"#000","#000",null,null,null,"#000","#000",null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,"#fff","#fff",null,null,null,"#fff","#fff",null,null,null,null,null],
];
const EYES_SLEEPY: PC[][] = [
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,"#000","#000",null,null,null,"#000","#000",null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,"#fff","#fff",null,null,null,"#fff","#fff",null,null,null,null,null],
];
const MOUTH_HAPPY: PC[][] = [
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,"#000","#000",null,null,null,null,null,null,null,null],
  [null,null,null,null,null,"#000",null,null,"#000",null,null,null,null,null,null,null],
];
const MOUTH_WIDE: PC[][] = [
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,"#000","#000","#000","#000",null,null,null,null,null,null,null],
  [null,null,null,null,null,"#000","#ff6b6b","#ff6b6b","#000",null,null,null,null,null,null,null],
  [null,null,null,null,null,"#000","#000","#000","#000",null,null,null,null,null,null,null],
];
const MOUTH_SLEEPY: PC[][] = [
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,"#000",null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
];
const WHISKERS: PC[][] = [
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  ["#000",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"#000"],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  ["#000","#000",null,null,null,null,null,null,null,null,null,null,null,null,"#000","#000"],
];

// Tour character states
type TourState = "idle" | "wave" | "running" | "arriving" | "showItem" | "excited" | "sleepy";

const CatPixelArt: React.FC<{
  theme: ThemeId; state: TourState; blinking: boolean;
  item?: string; hovered: boolean;
}> = ({ theme, state, blinking, item, hovered }) => {
  const c = themes[theme];
  const [p, d, a] = [c.primary, c.primaryDark, c.accent];
  const eyes = state === "sleepy" ? EYES_SLEEPY : blinking ? EYES_CLOSED : EYES_OPEN;
  const mouth = state === "wave" || state === "excited" ? MOUTH_WIDE
    : state === "sleepy" ? MOUTH_SLEEPY : MOUTH_HAPPY;

  const grid = React.useMemo(() => {
    const g: PC[][] = Array.from({ length: GRID }, () => Array(GRID).fill(null));
    g[0][4]=p; g[0][5]=p; g[0][6]=d; g[0][9]=d; g[0][10]=p; g[0][11]=p;
    g[1][3]=p; g[1][4]=p; g[1][5]=p; g[1][6]=d; g[1][9]=d; g[1][10]=p; g[1][11]=p; g[1][12]=p;
    g[2][2]=p; g[2][3]=p; g[2][4]=p; g[2][5]=p; g[2][10]=p; g[2][11]=p; g[2][12]=p; g[2][13]=p;
    for (let r=3;r<=7;r++) for (let c2=2;c2<=13;c2++) g[r][c2]=p;
    g[3][2]=null; g[3][13]=null;
    for (let dr=0;dr<eyes.length;dr++) for (let dc=0;dc<16;dc++) if (eyes[dr][dc]) g[3+dr][dc]=eyes[dr][dc];
    g[6][7]="#ff9999"; g[6][8]="#ff9999";
    for (let dr=0;dr<WHISKERS.length;dr++) for (let dc=0;dc<16;dc++) if (WHISKERS[dr][dc]) g[7+dr][dc]=WHISKERS[dr][dc];
    for (let dr=0;dr<mouth.length;dr++) for (let dc=0;dc<16;dc++) if (mouth[dr][dc]) g[8+dr][dc]=mouth[dr][dc];
    for (let r=10;r<=13;r++) for (let c2=3;c2<=12;c2++) g[r][c2]=d;
    g[11][7]=a; g[11][8]=a; g[12][7]=a; g[12][8]=a;
    if (state==="wave") { g[10][1]=p; g[10][2]=p; g[9][1]=p; }
    else if (state==="showItem"||state==="excited") { g[10][1]=p; g[10][2]=p; g[10][13]=p; g[10][14]=p; }
    else { g[11][2]=p; g[12][2]=p; g[11][13]=p; g[12][13]=p; }
    g[14][4]=d; g[14][5]=d; g[14][6]=d; g[14][9]=d; g[14][10]=d; g[14][11]=d;
    g[15][4]=d; g[15][5]=d; g[15][6]=d; g[15][9]=d; g[15][10]=d; g[15][11]=d;
    return g;
  }, [p, d, a, state, eyes, mouth]);

  const tailSpeed = hovered ? 0.4 : state==="wave" ? 0.5 : state==="excited" ? 0.6 : 2;

  const catBodyAnimation = state === "running"
    ? { scaleX: [1, 1.15, 0.9, 1.15, 1], y: [0, -3, 0, -3, 0] }
    : state === "arriving"
    ? { scaleX: [1.1, 0.9, 1], scaleY: [0.9, 1.1, 1], y: [0, 5, 0] }
    : state === "sleepy"
    ? { y: [0,-1,0], rotate: [0,2,0] }
    : state === "excited"
    ? { y: [0,-8,0,-8,0], rotate: [0,-3,3,-3,0] }
    : state === "wave"
    ? { rotate: [0,-5,5,0], y: [0,-2,0] }
    : state === "showItem"
    ? { y: [0,-4,0] }
    : { y: [0,-3,0] };

  const catDuration = state === "running" ? 0.4 : state === "arriving" ? 0.3 : state === "sleepy" ? 3 : state === "excited" ? 0.6 : 1.8;

  return (
    <div className="relative" style={{ width: GRID*PIXEL, height: GRID*PIXEL }}>
      {/* Tail */}
      <motion.div
        animate={state==="wave"?{rotate:[-10,10,-10]}:state==="excited"?{rotate:[-15,15,-15,15,-15],x:[0,3,0,3,0]}:{rotate:[-5,5,-5],x:[0,2,0]}}
        transition={{ duration: tailSpeed, repeat:Infinity, ease:"easeInOut" }}
        className="absolute -right-4 top-[60px]" style={{ transformOrigin:"left center" }}>
        <div className="relative">{[0,1,2,3,4].map(i=>(
          <div key={i} className="absolute rounded-full"
            style={{ width:PIXEL, height:PIXEL, backgroundColor:p, left:i*PIXEL*0.7, top:-i*2 }}/>
        ))}</div>
      </motion.div>

      {/* Body */}
      <motion.div className="relative grid"
        style={{ gridTemplateColumns:`repeat(${GRID},${PIXEL}px)`, gridTemplateRows:`repeat(${GRID},${PIXEL}px)`, imageRendering:"pixelated" }}
        animate={catBodyAnimation}
        transition={{ duration: catDuration, repeat: state==="running" ? Infinity : 0, ease:"easeInOut" }}>
        {grid.flat().map((color,i)=>(
          <div key={i} style={{ width:PIXEL, height:PIXEL, backgroundColor:color||"transparent" }}/>
        ))}
      </motion.div>

      {/* Emoji above head */}
      <AnimatePresence>
        {item && state === "showItem" && (
          <motion.div initial={{scale:0,y:10,opacity:0}} animate={{scale:1,y:-8,opacity:1}}
            exit={{scale:0,y:10,opacity:0}} transition={{type:"spring",stiffness:400,damping:12}}
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-xl">
            {item}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleepy zzz */}
      {state==="sleepy"&&(
        <div className="absolute -top-6 -right-2">
          <motion.span className="text-xs font-bold text-white/40"
            animate={{y:[0,-4,0],opacity:[0.3,0.8,0.3]}}
            transition={{duration:2,repeat:Infinity}}>z</motion.span>
          <motion.span className="absolute text-[10px] font-bold text-white/30"
            style={{top:-4,left:6}}
            animate={{y:[0,-6,0],opacity:[0.2,0.6,0.2]}}
            transition={{duration:2.5,repeat:Infinity,delay:0.5}}>z</motion.span>
        </div>
      )}

      {/* Idle sparkles */}
      {state==="idle"&&(
        <div className="absolute -top-3 -left-2">
          {[0,1,2].map(i=>(
            <motion.div key={i} className="absolute w-[2px] rounded-full bg-white/40"
              style={{height:6,left:i*4}} animate={{y:[0,-8,0],opacity:[0.4,0.8,0.4]}}
              transition={{duration:1.5,repeat:Infinity,delay:i*0.3}}/>
          ))}
        </div>
      )}

      {/* Speed lines when running */}
      {state === "running" && (
        <div className="absolute -left-6 top-1/2 -translate-y-1/2">
          {[0,1,2].map(i => (
            <motion.div key={i} className="absolute h-[2px] rounded-full bg-white/30"
              style={{ width: 12 + i*4, top: -6 + i*6, left: -i*3 }}
              animate={{ x: [-5, -20], opacity: [0.5, 0] }}
              transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.1 }} />
          ))}
        </div>
      )}
    </div>
  );
};

// Tour bubble — dark gradient with word-by-word text
const TourBubble: React.FC<{
  messages: string[];
  lang: string;
  onAdvance: () => void;
  onClose: () => void;
  isLast: boolean;
}> = ({ messages, lang, onAdvance, onClose, isLast }) => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [allShown, setAllShown] = useState(false);
  const timerRef = useRef<number | null>(null);

  const currentMsg = messages[msgIdx] || "";
  const words = currentMsg.split(" ");

  useEffect(() => {
    setDisplayedWords([]);
    setAllShown(false);
    let i = 0;
    timerRef.current = window.setInterval(() => {
      i++;
      setDisplayedWords(words.slice(0, i));
      if (i >= words.length) {
        clearInterval(timerRef.current!);
        setAllShown(true);
      }
    }, 200);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [msgIdx, currentMsg]);

  const handleClick = () => {
    if (!allShown) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayedWords(words);
      setAllShown(true);
      return;
    }
    if (msgIdx < messages.length - 1) {
      setMsgIdx(i => i + 1);
    } else {
      onAdvance();
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="absolute bottom-full right-0 mb-4 w-[280px] cursor-pointer select-none"
      onClick={handleClick}
    >
      {/* Bubble */}
      <div className="rounded-2xl p-4 relative"
        style={{
          background: "linear-gradient(135deg, rgba(15,15,30,0.95), rgba(10,10,20,0.98))",
          border: "1px solid rgba(138,168,255,0.2)",
          boxShadow: "0 0 20px rgba(138,168,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",
        }}>
        {/* Close button */}
        <button onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors text-[10px]">
          ✕
        </button>

        {/* Text */}
        <p className="text-[13px] text-white/90 pr-4 min-h-[32px] leading-relaxed">
          {displayedWords.map((word, i) => (
            <motion.span key={`${msgIdx}-${i}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          ))}
        </p>

        {/* Dots */}
        <div className="flex gap-1 mt-3 pt-2 border-t border-white/5">
          {messages.map((_, i) => (
            <div key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === msgIdx ? "bg-[#8AA8FF] w-4" : i < msgIdx ? "bg-[#8AA8FF]/40" : "bg-white/10"
              }`} />
          ))}
        </div>

        {/* Next hint */}
        <div className="text-[10px] text-white/20 mt-2 text-center">
          {allShown ? (isLast && msgIdx === messages.length - 1 ? "click to finish" : "click to continue →") : ""}
        </div>
      </div>

      {/* Arrow */}
      <div className="absolute bottom-[-6px] right-8 w-3 h-3 rotate-45"
        style={{
          background: "rgba(15,15,30,0.95)",
          borderRight: "1px solid rgba(138,168,255,0.2)",
          borderBottom: "1px solid rgba(138,168,255,0.2)",
        }} />
    </motion.div>
  );
};

// Tour overlay — blur + particles only
const TourOverlay: React.FC<{
  active: boolean;
  highlightSelector?: string;
}> = ({ active, highlightSelector }) => {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none">
      {/* Floating particles only */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${10 + (i * 13) % 80}%`,
            top: `${15 + (i * 15) % 70}%`,
            background: i % 2 === 0 ? "rgba(138,168,255,0.4)" : "rgba(255,152,0,0.3)",
          }}
          animate={{
            y: [-8, 8, -8],
            x: [-4, 4, -4],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}
    </div>
  );
};

// Tour steps
interface TourStep {
  page?: string;
  section?: string;
  messages: { EN: string[]; RU: string[] };
  catState: TourState;
  emoji?: string;
  delay: number;
}

const TOUR_STEPS: TourStep[] = [
  // 1. Welcome
  {
    messages: {
      EN: ["Hey there! I'm Pixel, your personal guide!", "Welcome to SkillPath — the platform where you pick a tech career and we build your learning path.", "Let me show you everything we've got!"],
      RU: ["Привет! Я Pixel, твой персональный гид!", "Добро пожаловать в SkillPath — платформа, где ты выбираешь карьеру в IT, а мы строим твой путь обучения.", "Давай покажу всё что у нас есть!"],
    },
    catState: "wave",
  },
  // 2. Hero
  {
    page: "home",
    section: "hero",
    messages: {
      EN: ["This is our main page — the Hero section!", "See the big title 'Choose Your Future Class In Tech'? That's what we help you do.", "Two buttons: 'Start Your Quest' launches the aptitude quiz, 'Explore Roles' shows all career paths.", "Up top is the navigation bar with Professions, Roadmaps, Mentors, language toggle, and Sign In."],
      RU: ["Это главная страница — секция Hero!", "Заголовок 'Выбери своё направление в IT' — мы помогаем тебе это сделать.", "Две кнопки: 'Начать тест' запускает профориентацию, 'Все роли' показывает все карьерные пути.", "Сверху навигация: Профессии, Роадмапы, Менторы, переключатель языка и кнопка входа."],
    },
    catState: "showItem",
    emoji: "🚀",
  },
  // 3. Stats
  {
    page: "home",
    section: "stats",
    messages: {
      EN: ["Here's our platform stats — real numbers!", "5,000+ students, 50+ mentors, 8 career directions, 92% completion rate.", "These represent real people changing their lives through tech."],
      RU: ["Статистика платформы — реальные цифры!", "5000+ студентов, 50+ менторов, 8 направлений, 92% завершения.", "За цифрами стоят реальные люди, меняющие жизнь через технологии."],
    },
    catState: "showItem",
    emoji: "⭐",
  },
  // 4. Roles
  {
    page: "home",
    section: "roles",
    messages: {
      EN: ["8 career paths to choose from!", "Frontend, AI, Cybersecurity, Data Science, Backend, Mobile, DevOps, GameDev.", "Each path has unique skills, tools, and a specialized roadmap.", "Click on any card to see full details."],
      RU: ["8 карьерных путей на выбор!", "Frontend, AI, Кибербезопасность, Data Science, Backend, Mobile, DevOps, GameDev.", "У каждого пути уникальные навыки, инструменты и специализированный план.", "Нажми на любую карточку чтобы увидеть подробности."],
    },
    catState: "showItem",
    emoji: "🧭",
  },
  // 5. Steps
  {
    page: "home",
    section: "steps",
    messages: {
      EN: ["Getting started is super easy — just 3 steps!", "Step 1: Take our quick 5-minute aptitude test.", "Step 2: Get your personalized roadmap.", "Step 3: Level up, connect with mentors, and build your portfolio."],
      RU: ["Начать проще простого — всего 3 шага!", "Шаг 1: Пройди быстрый 5-минутный тест.", "Шаг 2: Получи персональный роадмап.", "Шаг 3: Прокачивайся, общайся с менторами и собирай портфолио."],
    },
    catState: "showItem",
    emoji: "🗺️",
  },
  // 6. Bento
  {
    page: "home",
    section: "bento",
    messages: {
      EN: ["Everything you need to level up — all in one platform!", "Tests, roadmaps, mentors, certificates, workshops, library, career tools, and AI copilot 24/7."],
      RU: ["Всё что нужно для прокачки — на одной платформе!", "Тесты, роадмапы, менторы, сертификаты, воркшопы, библиотека, карьерные инструменты и AI-копилот 24/7."],
    },
    catState: "showItem",
    emoji: "📖",
  },
  // 7. Roadmaps
  {
    page: "roadmaps",
    messages: {
      EN: ["Welcome to the Roadmaps page!", "All available learning paths for every tech career.", "Each roadmap has phases: Fundamentals → Advanced → Specialization.", "Click skills to see resources, duration, and difficulty. Track your progress!"],
      RU: ["Добро пожаловать на страницу Роадмапов!", "Все доступные пути обучения для каждой IT-профессии.", "Каждый роадмап разделён на фазы: Основы → Продвинутый → Специализация.", "Кликай на навыки чтобы увидеть ресурсы, длительность и сложность. Отслеживай прогресс!"],
    },
    catState: "showItem",
    emoji: "💻",
  },
  // 8. Roadmaps — уроки
  {
    page: "roadmaps",
    messages: {
      EN: ["Each skill has interactive lessons with a built-in code editor!", "Write code and see results instantly — like a mini IDE in your browser.", "After lessons, take exams to earn certificates.", "Certificates prove your skills — share them on LinkedIn!"],
      RU: ["У каждого навыка есть интерактивные уроки с встроенным редактором кода!", "Пиши код и видь результат сразу — как мини-IDE в браузере.", "После уроков сдавай экзамены чтобы получить сертификаты.", "Сертификаты подтверждают навыки — делись ими в LinkedIn!"],
    },
    catState: "showItem",
    emoji: "🏆",
  },
  // 9. Mentors
  {
    page: "mentors",
    messages: {
      EN: ["Meet our team of experienced mentors!", "Each works at a top tech company with real industry experience.", "Filter by category: Frontend, AI, Cybersec, Data, Backend, Mobile, DevOps, GameDev.", "Every mentor has a rating, reviews, price per hour, and skills list."],
      RU: ["Познакомься с нашей командой менторов!", "Каждый работает в топовой IT-компании с реальным опытом.", "Фильтруй по категории: Frontend, AI, Кибер, Data, Backend, Mobile, DevOps, GameDev.", "У каждого рейтинг, отзывы, цена за час и список навыков."],
    },
    catState: "showItem",
    emoji: "👨‍💻",
  },
  // 10. Mentors — чат
  {
    page: "mentors",
    messages: {
      EN: ["Click a mentor to see their profile and start a chat!", "Message them directly — ask questions, discuss career plans, get code review.", "Book a 1-on-1 session: pick date and time, mentor prepares for you."],
      RU: ["Нажми на ментора чтобы увидеть профиль и начать чат!", "Напиши им напрямую — задавай вопросы, обсуждай карьеру, получи ревью кода.", "Забронируй сессию 1-на-1: выбери дату и время, ментор подготовится."],
    },
    catState: "showItem",
    emoji: "💬",
  },
  // 11. Professions
  {
    page: "professions",
    messages: {
      EN: ["This is our Professions page!", "Each profession shows: key skills, popular tools, salary range (Junior to Senior), and a day-in-the-life description.", "You can watch overview videos and click 'Open Full Roadmap' to start learning.", "Every profession has a clear career progression path."],
      RU: ["Это страница Профессий!", "Каждая показывает: ключевые навыки, инструменты, зарплату (Junior до Senior) и описание дня из жизни.", "Можно посмотреть видео и нажать 'Открыть полный курс' чтобы начать.", "У каждой профессии чёткий путь карьерного роста."],
    },
    catState: "showItem",
    emoji: "🎯",
  },
  // 12. Quiz
  {
    page: "home",
    messages: {
      EN: ["Now let me show you how our aptitude quiz works!", "5-minute interactive test: interests, superpowers, ideal Saturday, preferred tools, desired impact.", "We match you with the perfect career path. No coding background needed!"],
      RU: ["Покажу как работает тест на профориентацию!", "5-минутный тест: интересы, суперсилы, идеальная суббота, инструменты, желаемое влияние.", "Мы подберём идеальный карьерный путь. Опыт программирования не нужен!"],
    },
    catState: "excited",
    emoji: "🎯",
  },
  // 13. Profile
  {
    page: "profile",
    messages: {
      EN: ["This is your Profile — personal dashboard!", "Avatar, progress index, courses, quiz history, mentor bookings.", "Upload avatar, edit name, track study calendar.", "Heatmap shows activity — green means productive days!"],
      RU: ["Это твой Профиль — персональная панель!", "Аватар, прогресс, курсы, история квизов, бронирования менторов.", "Загрузи аватар, отредактируй имя, отслеживай календарь.", "Тепловая карта показывает активность — зелёный = продуктивные дни!"],
    },
    catState: "showItem",
    emoji: "👤",
  },
  // 14. Footer
  {
    page: "home",
    messages: {
      EN: ["Here's the footer with contacts and social media.", "Find us on Telegram, Instagram, GitHub.", "Navigation links for quick access. We're available 24/7 for support."],
      RU: ["Футер с контактами и соцсетями.", "Нас можно найти в Telegram, Instagram, GitHub.", "Ссылки навигации для быстрого доступа. Мы на связи 24/7."],
    },
    catState: "showItem",
    emoji: "📱",
  },
  // 15. Final
  {
    messages: {
      EN: ["That's SkillPath! 🎉", "You've seen everything: professions, roadmaps, mentors, lessons, quizzes, and your profile.", "Creating an account is free — just 30 seconds.", "Click 'Sign In' to get started. Good luck — you've got this!"],
      RU: ["Это SkillPath! 🎉", "Ты увидел всё: профессии, роадмапы, менторов, уроки, тесты и профиль.", "Создать аккаунт бесплатно — всего 30 секунд.", "Нажми 'Войти' чтобы начать. Удачи — у тебя всё получится!"],
    },
    catState: "excited",
    emoji: "🚀",
  },
];

const TOUR_SECTION_MAP: Record<string, string> = {
  hero: "[data-tour='hero']",
  stats: "[data-tour='stats']",
  roles: "[data-tour='roles']",
  steps: "[data-tour='steps']",
  bento: "[data-tour='bento']",
};

// Main GuideCharacter component
export const GuideCharacter: React.FC = () => {
  const { lang, colorTheme, currentPage, setCurrentPage } = useContext(LanguageContext);
  const [catState, setCatState] = useState<TourState>("idle");
  const [blinking, setBlinking] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [sleepy, setSleepy] = useState(false);
  const [item, setItem] = useState<string | undefined>();

  // Tour state
  const [touring, setTouring] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [catPos, setCatPos] = useState({ x: 0, y: 0 });
  const [showOverlay, setShowOverlay] = useState(false);

  // Non-tour dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessages, setDialogMessages] = useState<{EN:string[],RU:string[]}>({EN:[],RU:[]});

  const lastPage = useRef("");
  const greetedRef = useRef(false);
  const sleepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLoggedIn = !!localStorage.getItem("skillpath_token");
  const wasLoggedOut = useRef(!isLoggedIn);
  const welcomeShown = useRef(false);

  // Blink
  useEffect(() => {
    const iv = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, []);

  // Sleep timer
  const resetSleep = useCallback(() => {
    setSleepy(false);
    if (sleepTimer.current) clearTimeout(sleepTimer.current);
    sleepTimer.current = setTimeout(() => {
      if (!touring) setSleepy(true);
    }, 25000);
  }, [touring]);

  useEffect(() => {
    resetSleep();
    return () => { if (sleepTimer.current) clearTimeout(sleepTimer.current); };
  }, [resetSleep]);

  // Auto-start tour for non-logged-in users on first visit
  useEffect(() => {
    if (isLoggedIn || greetedRef.current || currentPage !== "home") return;
    const t = setTimeout(() => {
      greetedRef.current = true;
      startTour();
    }, 2000);
    return () => clearTimeout(t);
  }, [isLoggedIn, currentPage]);

  // Welcome back for logged-in users
  useEffect(() => {
    if (isLoggedIn && wasLoggedOut.current && !welcomeShown.current && !touring) {
      welcomeShown.current = true;
      wasLoggedOut.current = false;
      setTimeout(() => {
        const msgs = {
          EN: ["Welcome back! I'm Pixel!", "Ready to continue learning?"],
          RU: ["С возвращением! Я Pixel!", "Готов продолжить обучение?"],
        };
        setDialogMessages(msgs);
        setCatState("excited");
        setItem("⭐");
        setShowDialog(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => { setShowDialog(false); setCatState("idle"); setItem(undefined); }, 8000);
      }, 1500);
    }
    if (!isLoggedIn) wasLoggedOut.current = true;
  }, [isLoggedIn, touring]);

  // Tour logic
  const startTour = useCallback(() => {
    setTouring(true);
    setTourStep(0);
    setShowBubble(true);
    setShowOverlay(true);
    setCatState("wave");
    setItem("👋");
    setCatPos({ x: 0, y: 0 });
    resetSleep();
  }, [resetSleep]);

  const endTour = useCallback(() => {
    setShowBubble(false);
    setCatState("idle");
    setItem(undefined);
    setShowOverlay(false);
    setTouring(false);
    setCatPos({ x: 0, y: 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const advanceTourRef = useRef<() => void>(() => {});
  const tourStepRef = useRef(0);
  const pendingStepRef = useRef<number | null>(null);

  const showStepContent = useCallback((stepIdx: number) => {
    const step = TOUR_STEPS[stepIdx];
    if (!step) return;

    // Move cat
    const positions = [
      { x: 0, y: 0 }, { x: -150, y: -20 }, { x: -300, y: -40 },
      { x: 0, y: 0 }, { x: 100, y: -15 }, { x: -200, y: -30 },
      { x: 0, y: 0 }, { x: -100, y: -20 }, { x: -250, y: -35 },
      { x: 0, y: 0 }, { x: -150, y: -25 }, { x: 0, y: 0 },
    ];
    setCatPos(positions[stepIdx % positions.length]);

    // Scroll to section if on same page
    if (step.section && TOUR_SECTION_MAP[step.section]) {
      setTimeout(() => {
        const el = document.querySelector<HTMLElement>(TOUR_SECTION_MAP[step.section]);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }

    // Scroll to footer for the footer step (no section, on home page)
    if (stepIdx === 13 && !step.section) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 300);
    }

    // Arrive and show bubble
    setTimeout(() => {
      setCatState("arriving");
      setTimeout(() => {
        setCatState(step.catState);
        setItem(step.emoji);
        setTourStep(stepIdx);
        setShowBubble(true);
        resetSleep();
      }, 400);
    }, 800);
  }, [resetSleep]);

  // Watch for page changes during tour — show content after page loads
  useEffect(() => {
    if (!touring || pendingStepRef.current === null) return;
    const stepIdx = pendingStepRef.current;
    pendingStepRef.current = null;
    // Page has changed, now show content
    setTimeout(() => showStepContent(stepIdx), 500);
  }, [currentPage, touring, showStepContent]);

  const advanceTour = useCallback(() => {
    const nextStep = tourStepRef.current + 1;
    if (nextStep >= TOUR_STEPS.length) {
      endTour();
      return;
    }
    tourStepRef.current = nextStep;
    setShowBubble(false);
    setCatState("running");
    setItem(undefined);

    const step = TOUR_STEPS[nextStep];

    if (step.page && step.page !== currentPage) {
      // Store pending step, navigate — useEffect will pick it up
      pendingStepRef.current = nextStep;
      setCurrentPage(step.page);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      showStepContent(nextStep);
    }
  }, [currentPage, setCurrentPage, showStepContent, endTour]);

  advanceTourRef.current = advanceTour;

  const skipTour = useCallback(() => {
    endTour();
  }, [endTour]);

  // Re-trigger
  useEffect(() => {
    (window as any).__showPresentation = () => {
      localStorage.removeItem("skillpath_tour_seen");
      greetedRef.current = false;
      startTour();
    };
    return () => { delete (window as any).__showPresentation; };
  }, [startTour]);

  const currentTourStep = touring ? TOUR_STEPS[tourStep] : null;
  const tourSelector = currentTourStep?.section ? TOUR_SECTION_MAP[currentTourStep.section] : undefined;

  return (
    <>
      {/* Tour overlay */}
      <TourOverlay active={showOverlay} highlightSelector={tourSelector} />

      {/* Cat container */}
      <motion.div
        className="fixed bottom-5 right-24 z-[9999] tour-no-blur"
        animate={{ x: catPos.x, y: catPos.y }}
        transition={{ type: "spring", stiffness: 120, damping: 15, duration: 1.5 }}
      >
        {/* Tour bubble */}
        <AnimatePresence>
          {touring && showBubble && currentTourStep && (
            <TourBubble
              messages={currentTourStep.messages[lang]}
              lang={lang}
              onAdvance={advanceTour}
              onClose={skipTour}
              isLast={tourStep === TOUR_STEPS.length - 1}
            />
          )}
        </AnimatePresence>

        {/* Non-tour dialog (for logged-in users) */}
        <AnimatePresence>
          {showDialog && !touring && (
            <GuideDialog messages={dialogMessages[lang]} onClose={() => { setShowDialog(false); setCatState("idle"); setItem(undefined); }} />
          )}
        </AnimatePresence>

        {/* Cat character */}
        <motion.div
          onClick={() => {
            if (touring) return;
            if (showDialog) { setShowDialog(false); setCatState("idle"); setItem(undefined); }
            else {
              const d = guideDialogs.find(x => x.section === "hero") || guideDialogs[0];
              setDialogMessages(d.messages);
              setCatState(d.characterState);
              setItem(d.item);
              setShowDialog(true);
              resetSleep();
            }
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative cursor-pointer select-none"
          role="button"
          tabIndex={0}
          aria-label="Guide character"
        >
          <CatPixelArt theme={colorTheme} state={sleepy && !touring ? "sleepy" : catState}
            blinking={blinking} item={item} hovered={hovered} />

          {/* Notification dot */}
          {!showDialog && !touring && (
            <motion.div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--ta)]"
              animate={{ y: [0, -3, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }} />
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export function emitMusicState(playing: boolean) {
  window.dispatchEvent(new CustomEvent("guide-music-state", { detail: playing }));
}
