import React, { useState, useEffect, useCallback, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "../../App";
import { themes, type ThemeId } from "../../theme.config";
import { GuideDialog } from "./GuideDialog";
import { guideDialogs, type CharacterState, type ItemKind } from "./guideData";
import { playGreetingSound, playItemSound } from "./guideSounds";

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

const CatPixelArt: React.FC<{
  theme: ThemeId; state: CharacterState; blinking: boolean;
  item?: ItemKind; musicOn: boolean; hovered: boolean;
}> = ({ theme, state, blinking, item, musicOn, hovered }) => {
  const c = themes[theme];
  const [p, d, a] = [c.primary, c.primaryDark, c.accent];
  const eyes = state === "sleepy" ? EYES_SLEEPY : blinking ? EYES_CLOSED : EYES_OPEN;
  const mouth = state === "wave" || state === "curious" || state === "excited" ? MOUTH_WIDE
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

  return (
    <div className="relative" style={{ width: GRID*PIXEL, height: GRID*PIXEL }}>
      <motion.div
        animate={state==="wave"?{rotate:[-10,10,-10]}:state==="excited"?{rotate:[-15,15,-15,15,-15],x:[0,3,0,3,0]}:{rotate:[-5,5,-5],x:[0,2,0]}}
        transition={{ duration: tailSpeed, repeat:Infinity, ease:"easeInOut" }}
        className="absolute -right-4 top-[60px]" style={{ transformOrigin:"left center" }}>
        <div className="relative">{[0,1,2,3,4].map(i=>(
          <div key={i} className="absolute rounded-full"
            style={{ width:PIXEL, height:PIXEL, backgroundColor:p, left:i*PIXEL*0.7, top:-i*2 }}/>
        ))}</div>
      </motion.div>

      <motion.div className="relative grid"
        style={{ gridTemplateColumns:`repeat(${GRID},${PIXEL}px)`, gridTemplateRows:`repeat(${GRID},${PIXEL}px)`, imageRendering:"pixelated" }}
        animate={
          state==="sleepy"?{y:[0,-1,0],rotate:[0,2,0]}:
          state==="excited"?{y:[0,-8,0,-8,0],rotate:[0,-3,3,-3,0]}:
          state==="idle"?{y:[0,-4,0],rotate:[0,1,-1,0]}:
          state==="wave"?{rotate:[0,-5,5,0],y:[0,-2,0]}:
          state==="curious"?{rotate:[0,3,-3,0],y:[0,-2,0]}:
          state==="showItem"?{y:[0,-6,0]}:{}
        }
        transition={{ duration: state==="sleepy"?3:state==="excited"?0.6:state==="wave"?0.5:1.8, repeat:Infinity, ease:"easeInOut" }}>
        {grid.flat().map((color,i)=>(
          <div key={i} style={{ width:PIXEL, height:PIXEL, backgroundColor:color||"transparent" }}/>
        ))}
      </motion.div>

      {musicOn&&(
        <motion.div initial={{y:-10,opacity:0}} animate={{y:0,opacity:1}}
          className="absolute -top-1 left-1/2 -translate-x-1/2" style={{width:GRID*PIXEL+8}}>
          <div className="absolute top-0 left-1 right-1 h-[3px] rounded-full" style={{backgroundColor:d}}/>
          <div className="absolute -left-1 top-0 w-[10px] h-[10px] rounded-full border-2" style={{borderColor:d,backgroundColor:a}}/>
          <div className="absolute -right-1 top-0 w-[10px] h-[10px] rounded-full border-2" style={{borderColor:d,backgroundColor:a}}/>
        </motion.div>
      )}

      <AnimatePresence>
        {item&&(state==="showItem"||state==="excited")&&(
          <motion.div initial={{scale:0,y:10}} animate={{scale:1,y:0}}
            exit={{scale:0,y:10}} transition={{type:"spring",stiffness:400,damping:15}}
            className="absolute -top-6 -left-4 text-lg" onAnimationComplete={()=>playItemSound()}>
            {item==="map"&&"🗺️"}{item==="book"&&"📖"}{item==="compass"&&"🧭"}{item==="star"&&"⭐"}
            {item==="rocket"&&"🚀"}{item==="trophy"&&"🏆"}{item==="code"&&"💻"}{item==="shield"&&"🛡️"}
          </motion.div>
        )}
      </AnimatePresence>

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

      {state==="idle"&&(
        <div className="absolute -top-3 -left-2">
          {[0,1,2].map(i=>(
            <motion.div key={i} className="absolute w-[2px] rounded-full bg-white/40"
              style={{height:6,left:i*4}} animate={{y:[0,-8,0],opacity:[0.4,0.8,0.4]}}
              transition={{duration:1.5,repeat:Infinity,delay:i*0.3}}/>
          ))}
          <div className="w-[14px] h-[10px] rounded-sm bg-[#8B4513] border border-[#654321] relative">
            <div className="absolute -right-[3px] top-[2px] w-[4px] h-[5px] rounded-r-sm border border-[#654321] border-l-0"/>
          </div>
        </div>
      )}
    </div>
  );
};

// Onboarding steps — visits ALL pages, shows interactive demos
interface OnboardingStep {
  page: string;
  scrollTo?: number;
  openRoadmapKey?: string;
  learningSkillId?: string;
  messages: { EN: string[]; RU: string[] };
  characterState: CharacterState;
  item?: ItemKind;
  delay: number;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    page: "home",
    scrollTo: 0,
    messages: {
      EN: [
        "Hey there! I'm Pixel, your personal guide!",
        "Welcome to SkillPath — the platform where you pick a career and we build your learning path.",
        "Let me walk you through everything we've got!",
      ],
      RU: [
        "Привет! Я Пиксель, твой персональный гид!",
        "Добро пожаловать в SkillPath — платформа, где ты выбираешь карьеру, а мы строим твой путь обучения.",
        "Давай покажу всё что у нас есть!",
      ],
    },
    characterState: "wave",
    delay: 14000,
  },
  {
    page: "home",
    scrollTo: 2,
    messages: {
      EN: [
        "Over 5,000 students already started their tech journey here!",
        "We have roadmaps, mentors, quizzes, and interactive lessons.",
        "Everything you need to go from zero to hired — in one place.",
      ],
      RU: [
        "Более 5000 студентов уже начали свой путь в IT здесь!",
        "У нас есть роадмапы, менторы, тесты и интерактивные уроки.",
        "Всё что нужно чтобы перейти от нуля до трудоустройства — в одном месте.",
      ],
    },
    characterState: "showItem",
    item: "star",
    delay: 14000,
  },
  {
    page: "home",
    scrollTo: 6,
    messages: {
      EN: [
        "Getting started is super easy — just 3 steps!",
        "First, take our quick quiz — it finds the perfect career for you.",
        "Then get your personalized roadmap and start learning right away!",
      ],
      RU: [
        "Начать проще простого — всего 3 шага!",
        "Сначала пройди быстрый тест — он найдёт идеальную карьеру для тебя.",
        "Потом получи персональный роадмап и начинай учиться сразу!",
      ],
    },
    characterState: "showItem",
    item: "map",
    delay: 14000,
  },
  {
    page: "roadmaps",
    openRoadmapKey: "frontend",
    messages: {
      EN: [
        "Let me show you how learning works!",
        "I'm opening the Frontend roadmap — it has phases from basics to advanced.",
        "Each phase has skills you need to master.",
      ],
      RU: [
        "Давай покажу как работает обучение!",
        "Открываю роадмап Frontend — он имеет фазы от основ до продвинутого.",
        "У каждой фазы есть навыки которые нужно освоить.",
      ],
    },
    characterState: "showItem",
    item: "book",
    delay: 14000,
  },
  {
    page: "learning:html-css",
    learningSkillId: "html-css",
    messages: {
      EN: [
        "This is an actual lesson — HTML & CSS Fundamentals!",
        "On the left you have theory with code examples. On the right — a live code editor!",
        "You can write code and see results instantly. It's like having a mini IDE in your browser!",
      ],
      RU: [
        "Это настоящий урок — Основы HTML & CSS!",
        "Слева теория с примерами кода. Справа — живой редактор кода!",
        "Ты можешь писать код и видеть результат сразу. Как мини-IDE в браузере!",
      ],
    },
    characterState: "excited",
    item: "code",
    delay: 16000,
  },
  {
    page: "learning:html-css",
    learningSkillId: "html-css",
    messages: {
      EN: [
        "After each lesson there's a practice task — write real code to solve it!",
        "When you complete all lessons, you take an exam to earn your certificate.",
        "The certificate proves you've mastered the skill — share it on LinkedIn!",
      ],
      RU: [
        "После каждого урока есть практика — напиши реальный код чтобы решить!",
        "Когда пройдёшь все уроки, сдаёшь экзамен чтобы получить сертификат.",
        "Сертификат подтверждает что ты освоил навык — делись им в LinkedIn!",
      ],
    },
    characterState: "showItem",
    item: "trophy",
    delay: 16000,
  },
  {
    page: "professions",
    messages: {
      EN: [
        "Check out all 8 career paths!",
        "Frontend, AI, Cybersecurity, Data Science, Backend, Mobile, DevOps, and Game Dev.",
        "Each one shows you the required skills, tools, and expected salary range.",
      ],
      RU: [
        "Посмотри все 8 карьерных путей!",
        "Frontend, AI, Кибербезопасность, Data Science, Backend, Mobile, DevOps и Game Dev.",
        "У каждой показаны нужные навыки, инструменты и ожидаемая зарплата.",
      ],
    },
    characterState: "showItem",
    item: "compass",
    delay: 14000,
  },
  {
    page: "mentors",
    messages: {
      EN: [
        "Meet our team of experienced mentors!",
        "They work at top tech companies and have real industry experience.",
        "Book a 1-on-1 session to get personalized feedback on your code or career plan.",
      ],
      RU: [
        "Познакомься с нашей командой опытных менторов!",
        "Они работают в топовых IT-компаниях и имеют реальный опыт.",
        "Запишись на сессию 1-на-1 чтобы получить персональный фидбек.",
      ],
    },
    characterState: "showItem",
    item: "compass",
    delay: 14000,
  },
  {
    page: "home",
    messages: {
      EN: [
        "So — ready to start your tech career?",
        "Creating an account is free and takes just 30 seconds!",
        "Click the 'Sign In' button at the top right — I'll be waiting for you on the other side!",
      ],
      RU: [
        "Ну что — готов начать карьеру в IT?",
        "Создать аккаунт бесплатно и занимает всего 30 секунд!",
        "Нажми кнопку 'Sign In' в правом углу — я буду ждать тебя на той стороне!",
      ],
    },
    characterState: "excited",
    item: "rocket",
    delay: 14000,
  },
];

const PAGE_TO_SECTION: Record<string, string> = {
  home: "hero",
  roadmaps: "roadmaps",
  profile: "profile",
  mentors: "mentors",
  professions: "roles",
};

export const GuideCharacter: React.FC = () => {
  const { lang, colorTheme, currentPage, setCurrentPage } = useContext(LanguageContext);
  const [state, setState] = useState<CharacterState>("idle");
  const [blinking, setBlinking] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialog, setDialog] = useState(guideDialogs[0]);
  const [dialogMessages, setDialogMessages] = useState<{ EN: string[]; RU: string[] }>({ EN: [], RU: [] });
  const [greeted, setGreeted] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [item, setItem] = useState<ItemKind | undefined>();
  const [hovered, setHovered] = useState(false);
  const [sleepy, setSleepy] = useState(false);
  const [onboarding, setOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [catPos, setCatPos] = useState({ x: 0, y: 0 });
  const lastPage = useRef("");
  const lastSection = useRef("");
  const greetedRef = useRef(false);
  const sleepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onboardingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLoggedIn = !!localStorage.getItem("skillpath_token");
  const wasLoggedOut = useRef(!isLoggedIn);
  const welcomeShown = useRef(false);

  // Detect first login after onboarding — show welcome message
  useEffect(() => {
    if (isLoggedIn && wasLoggedOut.current && !welcomeShown.current && !onboarding) {
      welcomeShown.current = true;
      wasLoggedOut.current = false;
      setTimeout(() => {
        const msgs = {
          EN: [
            "Welcome back! I'm Pixel, your personal learning assistant!",
            "I'll help you navigate courses, track progress, and stay on top of your goals.",
            "Good luck on your journey — you've got this!",
          ],
          RU: [
            "С возвращением! Я Пиксель, твой персональный помощник в обучении!",
            "Я помогу тебе с курсами, прогрессом и целью.",
            "Удачи на пути — у тебя всё получится!",
          ],
        };
        setDialogMessages(msgs);
        setState("excited");
        setItem("star");
        setShowDialog(true);
        setCatPos({ x: 0, y: 0 });
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Close dialog and go to idle after message
        setTimeout(() => {
          setShowDialog(false);
          setState("idle");
          setItem(undefined);
        }, 12000);
      }, 1500);
    }
    if (!isLoggedIn) {
      wasLoggedOut.current = true;
    }
  }, [isLoggedIn, onboarding]);

  // Blink
  useEffect(() => {
    const iv = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, []);

  // Sleep timer
  const resetSleepTimer = useCallback(() => {
    setSleepy(false);
    if (sleepTimer.current) clearTimeout(sleepTimer.current);
    sleepTimer.current = setTimeout(() => {
      if (!onboarding) setSleepy(true);
    }, 25000);
  }, [onboarding]);

  useEffect(() => {
    resetSleepTimer();
    return () => { if (sleepTimer.current) clearTimeout(sleepTimer.current); };
  }, [resetSleepTimer]);

  // Auto-start onboarding for non-logged-in users on first visit
  useEffect(() => {
    if (isLoggedIn || greetedRef.current || currentPage !== "home") return;
    const t = setTimeout(() => {
      greetedRef.current = true;
      setOnboarding(true);
      setOnboardingStep(0);
      resetSleepTimer();
    }, 2000);
    return () => clearTimeout(t);
  }, [isLoggedIn, currentPage, resetSleepTimer]);

  // Onboarding step progression — navigates through all pages with demos
  useEffect(() => {
    if (!onboarding || onboardingStep >= ONBOARDING_STEPS.length) {
      if (onboarding && onboardingStep >= ONBOARDING_STEPS.length) {
        setOnboarding(false);
        setCatPos({ x: 0, y: 0 });
        setState("idle");
        setShowDialog(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const step = ONBOARDING_STEPS[onboardingStep];

    // Move cat to different positions during onboarding
    const positions = [
      { x: 0, y: 0 },
      { x: -200, y: 0 },
      { x: -400, y: -50 },
      { x: 0, y: 0 },
    ];
    setCatPos(positions[onboardingStep % positions.length]);

    // Handle roadmap opening
    if (step.openRoadmapKey) {
      setShowDialog(false);
      setState("idle");
      setCurrentPage("roadmaps");
      window.scrollTo({ top: 0, behavior: "instant" });
      // Open the roadmap after page loads
      onboardingTimer.current = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        // Use a custom event to open the roadmap
        window.dispatchEvent(new CustomEvent("onboarding-open-roadmap", { detail: step.openRoadmapKey }));
        setTimeout(() => {
          setDialogMessages(step.messages);
          setState(step.characterState);
          setItem(step.item);
          setShowDialog(true);
          resetSleepTimer();
        }, 1500);
      }, 500);
    }
    // Handle lesson navigation
    else if (step.learningSkillId) {
      setShowDialog(false);
      setState("idle");
      setCurrentPage(`learning:${step.learningSkillId}`);
      window.scrollTo({ top: 0, behavior: "instant" });
      onboardingTimer.current = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setTimeout(() => {
          setDialogMessages(step.messages);
          setState(step.characterState);
          setItem(step.item);
          setShowDialog(true);
          resetSleepTimer();
        }, 1000);
      }, 500);
    }
    // Regular page navigation
    else if (step.page !== currentPage) {
      setShowDialog(false);
      setState("idle");
      setCurrentPage(step.page);
      window.scrollTo({ top: 0, behavior: "instant" });
      onboardingTimer.current = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
          if (step.scrollTo !== undefined) {
            const sections = document.querySelectorAll<HTMLElement>("section");
            if (sections[step.scrollTo]) {
              sections[step.scrollTo].scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
          setTimeout(() => {
            setDialogMessages(step.messages);
            setState(step.characterState);
            setItem(step.item);
            setShowDialog(true);
            resetSleepTimer();
          }, 600);
        }, 400);
      }, 400);
    }
    // Same page — scroll and show dialog
    else {
      if (step.scrollTo !== undefined) {
        const sections = document.querySelectorAll<HTMLElement>("section");
        if (sections[step.scrollTo]) {
          sections[step.scrollTo].scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      onboardingTimer.current = setTimeout(() => {
        setDialogMessages(step.messages);
        setState(step.characterState);
        setItem(step.item);
        setShowDialog(true);
        resetSleepTimer();
      }, 800);
    }

    // Advance to next step
    stepTimer.current = setTimeout(() => {
      setShowDialog(false);
      setState("idle");
      setOnboardingStep(s => s + 1);
    }, step.delay);

    return () => {
      if (onboardingTimer.current) clearTimeout(onboardingTimer.current);
      if (stepTimer.current) clearTimeout(stepTimer.current);
    };
  }, [onboarding, onboardingStep, currentPage, setCurrentPage, resetSleepTimer]);

  // Page detection for logged-in users
  useEffect(() => {
    if (!isLoggedIn || !currentPage || currentPage === lastPage.current) return;
    if (onboarding) return;

    if (currentPage.startsWith("learning:")) {
      const d = guideDialogs.find(x => x.section === "lessons") || guideDialogs[0];
      setDialog(d);
      setDialogMessages(d.messages);
      setState(d.characterState);
      setItem(d.item);
      lastPage.current = currentPage;
      resetSleepTimer();
      return;
    }
    if (currentPage === "quiz") {
      const d = guideDialogs.find(x => x.section === "quiz") || guideDialogs[0];
      setDialog(d);
      setDialogMessages(d.messages);
      setState(d.characterState);
      setItem(d.item);
      lastPage.current = currentPage;
      resetSleepTimer();
      return;
    }
    const section = PAGE_TO_SECTION[currentPage] || "hero";
    if (section !== lastSection.current) {
      lastSection.current = section;
      lastPage.current = currentPage;
      const d = guideDialogs.find(x => x.section === section) || guideDialogs[0];
      setDialog(d);
      setDialogMessages(d.messages);
      setState(d.characterState);
      setItem(d.item);
      resetSleepTimer();
    }
  }, [currentPage, isLoggedIn, onboarding, resetSleepTimer]);

  // Scroll detection for logged-in users on landing page
  useEffect(() => {
    if (!isLoggedIn || currentPage !== "home" || onboarding) return;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const detect = () => {
      if (showDialog) return;
      const sections = document.querySelectorAll<HTMLElement>("section");
      const vh = window.innerHeight;
      let best = "";
      let bestRatio = 0;
      sections.forEach((sec) => {
        const r = sec.getBoundingClientRect();
        const visTop = Math.max(r.top, 0);
        const visBot = Math.min(r.bottom, vh);
        const vis = Math.max(0, visBot - visTop);
        const ratio = vis / Math.min(r.height || 1, vh);
        if (ratio > bestRatio && ratio > 0.15) {
          bestRatio = ratio;
          const text = (sec.textContent || "").slice(0, 400);
          if (/choose your|выбери/i.test(text)) best = "hero";
          else if (/frontend|ai engineer|cybersec|направление/i.test(text)) best = "roles";
          else if (/how to begin|как начать/i.test(text)) best = "steps";
          else if (/everything you need|всё.*нужно/i.test(text)) best = "bento";
          else if (/students|mentors|студент/i.test(text)) best = "stats";
          else if (/real stories|настоящие/i.test(text)) best = "testimonials";
          else if (/frequently|частые/i.test(text)) best = "faq";
          else if (/plan|план/i.test(text)) best = "pricing";
        }
      });
      if (best && best !== lastSection.current) {
        lastSection.current = best;
        const d = guideDialogs.find(x => x.section === best) || guideDialogs[0];
        setDialog(d);
        setDialogMessages(d.messages);
        setState(d.characterState);
        setItem(d.item);
      }
    };
    const onScroll = () => { if (timeout) clearTimeout(timeout); timeout = setTimeout(detect, 80); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(detect, 500);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); if (timeout) clearTimeout(timeout); };
  }, [currentPage, isLoggedIn, showDialog, onboarding]);

  // Music
  useEffect(() => {
    const h = (e: CustomEvent<boolean>) => setMusicOn(e.detail);
    window.addEventListener("guide-music-state" as any, h);
    return () => window.removeEventListener("guide-music-state" as any);
  }, []);

  const toggle = useCallback(() => {
    resetSleepTimer();
    if (onboarding) {
      // Skip onboarding on click
      setOnboarding(false);
      setShowDialog(false);
      setState("idle");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (showDialog) {
      setShowDialog(false);
      setState("idle");
    } else {
      setShowDialog(true);
      setState(dialog.characterState);
      setItem(dialog.item);
    }
  }, [showDialog, dialog, onboarding, resetSleepTimer]);

  const close = useCallback(() => {
    setShowDialog(false);
    if (!onboarding) setState("idle");
  }, [onboarding]);

  return (
    <motion.div
      className="fixed bottom-5 right-24 z-50"
      animate={{ x: catPos.x, y: catPos.y }}
      transition={{ type: "spring", stiffness: 120, damping: 20, duration: 1.5 }}
    >
      <AnimatePresence>
        {showDialog && (
          <GuideDialog messages={dialogMessages[lang]} onClose={close} compact={onboarding} />
        )}
      </AnimatePresence>

      <motion.div
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer select-none"
        role="button"
        tabIndex={0}
        aria-label="Guide character"
      >
        <CatPixelArt theme={colorTheme} state={sleepy ? "sleepy" : state}
          blinking={blinking} item={item} musicOn={musicOn} hovered={hovered} />

        {!showDialog && (
          <motion.div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--ta)]"
            animate={{ y: [0, -3, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }} />
        )}
      </motion.div>
    </motion.div>
  );
};

export function emitMusicState(playing: boolean) {
  window.dispatchEvent(new CustomEvent("guide-music-state", { detail: playing }));
}
