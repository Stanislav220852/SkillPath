import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Briefcase,
  Clock,
  MessageCircle,
  X,
  Check,
  Award,
  Calendar,
  Globe,
  Send,
  Trash2,
  Search,
  Sparkles,
} from "lucide-react";

const glassCard =
  "bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-3xl shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]";

type Lang = "EN" | "RU";
type ColorKey = "cyan" | "pink" | "purple" | "blue" | "emerald" | "amber" | "orange" | "rose";

type Mentor = {
  id: number;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatar?: string;
  color: ColorKey;
  category: string;
  experience: number;
  rating: number;
  reviews: number;
  pricePerHour: number;
  skills: string[];
  languages: string[];
  bio: string;
  sessionsCompleted: number;
  nextSlot: string;
};

type ChatMessage = {
  from: "me" | "mentor";
  text: string;
  time: number;
};

const colorMap: Record<ColorKey, { gradient: string; bg: string; text: string; border: string }> = {
  cyan: {
    gradient: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
    bg: "bg-[#8AA8FF]/10",
    text: "text-[#002A54] dark:text-[#8AA8FF]",
    border: "border-[#8AA8FF]/30",
  },
  pink: {
    gradient: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
    bg: "bg-[#8AA8FF]/10",
    text: "text-[#002A54] dark:text-[#8AA8FF]",
    border: "border-[#8AA8FF]/30",
  },
  purple: {
    gradient: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
    bg: "bg-[#8AA8FF]/10",
    text: "text-[#002A54] dark:text-[#8AA8FF]",
    border: "border-[#8AA8FF]/30",
  },
  blue: {
    gradient: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
    bg: "bg-[#8AA8FF]/10",
    text: "text-[#002A54] dark:text-[#8AA8FF]",
    border: "border-[#8AA8FF]/30",
  },
  emerald: {
    gradient: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
    bg: "bg-[#8AA8FF]/10",
    text: "text-[#002A54] dark:text-[#8AA8FF]",
    border: "border-[#8AA8FF]/30",
  },
  amber: {
    gradient: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
    bg: "bg-[#8AA8FF]/10",
    text: "text-[#002A54] dark:text-[#8AA8FF]",
    border: "border-[#8AA8FF]/30",
  },
  orange: {
    gradient: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
    bg: "bg-[#8AA8FF]/10",
    text: "text-[#002A54] dark:text-[#8AA8FF]",
    border: "border-[#8AA8FF]/30",
  },
  rose: {
    gradient: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
    bg: "bg-[#8AA8FF]/10",
    text: "text-[#002A54] dark:text-[#8AA8FF]",
    border: "border-[#8AA8FF]/30",
  },
};

const fallbackColor = {
  gradient: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
  bg: "bg-[#8AA8FF]/10",
  text: "text-[#002A54] dark:text-[#8AA8FF]",
  border: "border-[#8AA8FF]/30",
};

const buildMentors = (lang: Lang): Mentor[] => [
  {
    id: 1,
    name: lang === "RU" ? "Анна Соколова" : "Anna Sokolova",
    role: "Senior Frontend Engineer",
    company: "Yandex",
    initials: "AS",
    avatar: "/images/mentors/anna.jpg",
    color: "cyan",
    category: "frontend",
    experience: 8,
    rating: 4.9,
    reviews: 142,
    pricePerHour: 75,
    skills: ["React", "TypeScript", "Next.js", "Performance"],
    languages: lang === "RU" ? ["Русский", "English"] : ["Russian", "English"],
    bio:
      lang === "RU"
        ? "8 лет в продуктовой разработке. Помогаю джунам и мидлам пройти собеседования в Big Tech и вырасти до сеньоров."
        : "8 years in product development. I help juniors and middles pass Big Tech interviews and grow to senior level.",
    sessionsCompleted: 320,
    nextSlot: lang === "RU" ? "Сегодня в 18:00" : "Today at 6:00 PM",
  },
  {
    id: 2,
    name: lang === "RU" ? "Дмитрий Петров" : "Dmitry Petrov",
    role: "AI / ML Engineer",
    company: "Tinkoff AI",
    initials: "DP",
    avatar: "/images/mentors/dmitry.jpg",
    color: "pink",
    category: "ai",
    experience: 6,
    rating: 5.0,
    reviews: 89,
    pricePerHour: 120,
    skills: ["PyTorch", "LLMs", "MLOps", "Computer Vision"],
    languages: lang === "RU" ? ["Русский", "English"] : ["Russian", "English"],
    bio:
      lang === "RU"
        ? "Работаю с трансформерами и LLM. Создаю карьерные планы для тех, кто хочет войти в AI с нуля или сменить специализацию."
        : "Working with transformers and LLMs. I build career plans for people entering AI from scratch or switching specialization.",
    sessionsCompleted: 180,
    nextSlot: lang === "RU" ? "Завтра в 10:00" : "Tomorrow at 10:00 AM",
  },
  {
    id: 3,
    name: lang === "RU" ? "Михаил Кузнецов" : "Mikhail Kuznetsov",
    role: lang === "RU" ? "Специалист по кибербезопасности" : "Cybersecurity Specialist",
    company: "Group-IB",
    initials: "MK",
    avatar: "/images/mentors/mikhail.jpg",
    color: "purple",
    category: "cybersec",
    experience: 10,
    rating: 4.8,
    reviews: 67,
    pricePerHour: 95,
    skills: ["Pentest", "OSCP", "Red Team", "Web Security"],
    languages: lang === "RU" ? ["Русский"] : ["Russian"],
    bio:
      lang === "RU"
        ? "OSCP, 10 лет в offensive security. Готовлю к сертификациям и помогаю с реальными pentest-кейсами."
        : "OSCP certified, 10 years in offensive security. I prepare you for certifications and help with real pentest cases.",
    sessionsCompleted: 95,
    nextSlot: lang === "RU" ? "Послезавтра в 14:00" : "In 2 days at 2:00 PM",
  },
  {
    id: 4,
    name: lang === "RU" ? "Елена Морозова" : "Elena Morozova",
    role: "Lead Data Scientist",
    company: "Sberbank",
    initials: "EM",
    avatar: "/images/mentors/elena.jpg",
    color: "blue",
    category: "datascience",
    experience: 7,
    rating: 4.9,
    reviews: 211,
    pricePerHour: 90,
    skills: ["Python", "SQL", "A/B Testing", "Spark"],
    languages: lang === "RU" ? ["Русский", "English"] : ["Russian", "English"],
    bio:
      lang === "RU"
        ? "Веду команду из 12 человек. Учу мыслить как датасаентист, а не как программист. Подготовлю к собесам в FAANG/Яндекс/Сбер."
        : "Leading a team of 12. I teach you to think like a data scientist, not like a programmer. FAANG/Yandex/Sber interview prep.",
    sessionsCompleted: 450,
    nextSlot: lang === "RU" ? "Сегодня в 20:00" : "Today at 8:00 PM",
  },
  {
    id: 5,
    name: lang === "RU" ? "Артём Волков" : "Artyom Volkov",
    role: "Staff Frontend Engineer",
    company: "Avito",
    initials: "AV",
    avatar: "/images/mentors/artyom.jpg",
    color: "cyan",
    category: "frontend",
    experience: 11,
    rating: 4.9,
    reviews: 178,
    pricePerHour: 130,
    skills: ["Architecture", "React", "Microfrontends", "Leadership"],
    languages: lang === "RU" ? ["Русский", "English"] : ["Russian", "English"],
    bio:
      lang === "RU"
        ? "11 лет, прошёл путь от джуна до Staff. Помогаю с архитектурой больших фронтенд-приложений и переходом в лидерство."
        : "11 years, went from junior to Staff. I help with large frontend architecture and transition into leadership roles.",
    sessionsCompleted: 280,
    nextSlot: lang === "RU" ? "Завтра в 19:00" : "Tomorrow at 7:00 PM",
  },
  {
    id: 6,
    name: lang === "RU" ? "София Лебедева" : "Sofia Lebedeva",
    role: "ML Research Engineer",
    company: "OpenAI",
    initials: "SL",
    avatar: "/images/mentors/sofia.jpg",
    color: "pink",
    category: "ai",
    experience: 5,
    rating: 5.0,
    reviews: 54,
    pricePerHour: 200,
    skills: ["Research", "PyTorch", "RLHF", "Diffusion Models"],
    languages: lang === "RU" ? ["English", "Русский"] : ["English", "Russian"],
    bio:
      lang === "RU"
        ? "Research в области LLM и диффузионных моделей. Топ менторов по подготовке к ресёрч-позициям."
        : "Research on LLMs and diffusion models. Top mentor for research position prep.",
    sessionsCompleted: 60,
    nextSlot: lang === "RU" ? "На следующей неделе" : "Next week",
  },
  {
    id: 7,
    name: lang === "RU" ? "Иван Козлов" : "Ivan Kozlov",
    role: "Senior Backend Engineer",
    company: "Sber",
    initials: lang === "RU" ? "ИК" : "IK",
    avatar: "/images/mentors/ivan.jpg",
    color: "emerald",
    category: "backend",
    experience: 9,
    rating: 4.8,
    reviews: 134,
    pricePerHour: 85,
    skills: ["Node.js", "Go", "PostgreSQL", "Docker"],
    languages: lang === "RU" ? ["Русский", "English"] : ["Russian", "English"],
    bio:
      lang === "RU"
        ? "9 лет в бэкенд-разработке. Строю высоконагруженные системы. Помогаю освоить серверную архитектуру с нуля."
        : "9 years in backend dev. Building high-load systems. I help you master server architecture from scratch.",
    sessionsCompleted: 210,
    nextSlot: lang === "RU" ? "Завтра в 11:00" : "Tomorrow at 11:00 AM",
  },
  {
    id: 8,
    name: lang === "RU" ? "Ольга Никитина" : "Olga Nikitina",
    role: "Mobile Lead",
    company: "VK",
    initials: lang === "RU" ? "ОН" : "ON",
    avatar: "/images/mentors/olga.jpg",
    color: "amber",
    category: "mobile",
    experience: 7,
    rating: 4.9,
    reviews: 98,
    pricePerHour: 90,
    skills: ["React Native", "Swift", "Kotlin", "Expo"],
    languages: lang === "RU" ? ["Русский"] : ["Russian"],
    bio:
      lang === "RU"
        ? "Лид мобильной разработки. Помогаю запустить первое приложение и пройти ревью в App Store / Play Store."
        : "Mobile dev lead. I help you ship your first app and pass App Store / Play Store review.",
    sessionsCompleted: 150,
    nextSlot: lang === "RU" ? "Послезавтра в 16:00" : "In 2 days at 4:00 PM",
  },
  {
    id: 9,
    name: lang === "RU" ? "Максим Орлов" : "Maxim Orlov",
    role: "DevOps Engineer",
    company: "Ozon",
    initials: lang === "RU" ? "МО" : "MO",
    avatar: "/images/mentors/maxim.jpg",
    color: "orange",
    category: "devops",
    experience: 8,
    rating: 4.7,
    reviews: 76,
    pricePerHour: 100,
    skills: ["Kubernetes", "Terraform", "AWS", "CI/CD"],
    languages: lang === "RU" ? ["Русский", "English"] : ["Russian", "English"],
    bio:
      lang === "RU"
        ? "DevOps в высоконагруженном e-commerce. Автоматизирую всё. Научу деплоить как профи."
        : "DevOps in high-load e-commerce. I automate everything. I'll teach you to deploy like a pro.",
    sessionsCompleted: 120,
    nextSlot: lang === "RU" ? "Сегодня в 21:00" : "Today at 9:00 PM",
  },
  {
    id: 10,
    name: lang === "RU" ? "Кирилл Зайцев" : "Kirill Zaitsev",
    role: "Game Developer",
    company: "Playrix",
    initials: lang === "RU" ? "КЗ" : "KZ",
    avatar: "/images/mentors/kirill.jpg",
    color: "rose",
    category: "gamedev",
    experience: 6,
    rating: 4.9,
    reviews: 63,
    pricePerHour: 80,
    skills: ["Unity", "C#", "Shaders", "3D Math"],
    languages: lang === "RU" ? ["Русский", "English"] : ["Russian", "English"],
    bio:
      lang === "RU"
        ? "Делаю игры в Playrix. Помогу освоить Unity, шейдеры и геймдизайн. Создадим игру вместе!"
        : "Making games at Playrix. I'll help you master Unity, shaders and game design. Let's build a game together!",
    sessionsCompleted: 85,
    nextSlot: lang === "RU" ? "На следующей неделе" : "Next week",
  },
];

const Avatar = ({
  mentor,
  c,
  className = "",
  textClass = "",
}: {
  mentor: Mentor;
  c: { gradient: string };
  className?: string;
  textClass?: string;
}) => {
  const [error, setError] = useState(false);

  if (mentor.avatar && !error) {
    return (
      <img
        src={mentor.avatar}
        alt={mentor.name}
        onError={() => setError(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white font-black ${className} ${textClass}`}>
      {mentor.initials}
    </div>
  );
};

const CHAT_KEY = "skillpath-mentor-chats-v1";

const loadChat = (mentorId: number): ChatMessage[] => {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(CHAT_KEY);
    if (!raw) return [];
    return JSON.parse(raw)?.[mentorId] || [];
  } catch {
    return [];
  }
};

const saveChat = (mentorId: number, messages: ChatMessage[]) => {
  try {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(CHAT_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[mentorId] = messages;
    localStorage.setItem(CHAT_KEY, JSON.stringify(data));
  } catch {
    // ignore localStorage errors
  }
};

const autoReplies = (lang: Lang, mentorRole?: string) => {
  const role = mentorRole || "IT";
  return lang === "RU"
    ? [
        `Привет! Рад знакомству 👋 Расскажи, какой у тебя опыт в ${role}?`,
        "Отличный вопрос! Давай разберём подробнее. Какая у тебя конкретная цель — трудоустройство, проект или сертификация?",
        "Понял тебя. Рекомендую начать с основ, я составлю для тебя план. Запишись на сессию — всё обсудим!",
        "Я обычно отвечаю в течение пары часов. Кстати, ты уже прошёл профориентационный тест на SkillPath?",
        "Звучит как хороший план! На первой сессии мы составим роадмап конкретно под твои цели. Нажми «Записаться» 👆",
        "Хороший подход. Главное — регулярность. Даже 30 минут в день дают результат через пару месяцев.",
        `Я работаю в ${role} уже давно, видел разные кейсы. Расскажи подробнее о своей ситуации.`,
        "Не переживай, все с чего-то начинали. Важно не откуда стартуешь, а куда идёшь 🚀",
      ]
    : [
        `Hi! Nice to meet you 👋 Tell me about your experience in ${role}?`,
        "Great question! Let's break it down. What's your specific goal — job, project, or certification?",
        "Got it. I recommend starting with fundamentals, I'll create a plan for you. Book a session — we'll discuss!",
        "I usually reply within a couple of hours. By the way, have you taken the career test on SkillPath?",
        "Sounds like a good plan! On our first session we'll build a roadmap tailored to your goals. Hit 'Book' above 👆",
        "Good approach. Consistency is key. Even 30 minutes a day shows results in a couple of months.",
        `I've been working in ${role} for years, seen many cases. Tell me more about your situation.`,
        "Don't worry, everyone starts somewhere. What matters is not where you start but where you're heading 🚀",
      ];
};

const ChatWindow = ({ mentor, lang, onClose }: { mentor: Mentor; lang: Lang; onClose: () => void }) => {
  const c = colorMap[mentor.color];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = loadChat(mentor.id);
    if (saved.length) {
      setMessages(saved);
      return;
    }

    const firstName = mentor.name.split(" ")[0];
    const greeting =
      lang === "RU"
        ? `Привет! Я ${firstName}. Спрашивай что угодно про ${mentor.role} 🚀`
        : `Hey! I'm ${firstName}. Ask me anything about ${mentor.role} 🚀`;
    setMessages([{ from: "mentor", text: greeting, time: Date.now() }]);
  }, [mentor.id, mentor.name, mentor.role, lang]);

  useEffect(() => {
    if (messages.length) saveChat(mentor.id, messages);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, [messages, typing, mentor.id]);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: "me", text, time: Date.now() }]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      const replies = autoReplies(lang, mentor.role);
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [...prev, { from: "mentor", text: reply, time: Date.now() }]);
      setTyping(false);
    }, 1100 + Math.random() * 900);
  };

  const clearChat = () => {
    setMessages([]);
    saveChat(mentor.id, []);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-0 backdrop-blur-md sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full flex-col overflow-hidden border border-black/5 bg-white shadow-2xl dark:border-white/10 dark:bg-stone-900 sm:h-[600px] sm:max-h-[85vh] sm:max-w-lg sm:rounded-3xl"
      >
        <div className={`flex flex-shrink-0 items-center gap-3 bg-gradient-to-r ${c.gradient} px-4 py-3 text-white`}>
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/40">
            <Avatar mentor={mentor} c={c} className="h-10 w-10 text-sm" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{mentor.name}</p>
            <p className="flex items-center gap-1 text-[11px] text-white/80">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-300" />
              {lang === "RU" ? "в сети" : "online"}
            </p>
          </div>
          <button
            onClick={clearChat}
            title={lang === "RU" ? "Очистить" : "Clear"}
            className="rounded-full p-2 transition-colors hover:bg-white/20"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-stone-50 p-4 dark:bg-stone-950/50">
          {messages.map((m, i) => (
            <div key={`${m.time}-${i}`} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.from === "me"
                    ? `rounded-br-md bg-gradient-to-r ${c.gradient} text-white`
                    : "rounded-bl-md border border-black/5 bg-white text-stone-800 dark:border-white/10 dark:bg-white/10 dark:text-white"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-md border border-black/5 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/10">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 border-t border-black/5 bg-white p-3 dark:border-white/10 dark:bg-stone-900">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder={lang === "RU" ? "Напишите сообщение..." : "Type a message..."}
            className="flex-1 rounded-full border border-black/10 bg-black/5 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-[#8AA8FF] focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${c.gradient} text-white transition-all hover:opacity-90 disabled:opacity-40`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface MentorsPageProps {
  onBack: () => void;
  lang: Lang;
  t?: any;
}

const BookingModal = ({
  mentor,
  lang,
  onClose,
  onConfirm,
}: {
  mentor: Mentor;
  lang: Lang;
  onClose: () => void;
  onConfirm: (date: string, time: string) => void;
}) => {
  const c = colorMap[mentor.color];
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const dates = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      return {
        value: d.toISOString().split("T")[0],
        label: d.toLocaleDateString(lang === "RU" ? "ru-RU" : "en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
      };
    });
  }, [lang]);

  const times = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "18:00", "19:00", "20:00"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl dark:border-white/10 dark:bg-stone-900"
      >
        <div className={`flex items-center justify-between bg-gradient-to-r ${c.gradient} px-6 py-4 text-white`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">
              {lang === "RU" ? "Запись к ментору" : "Book a Session"}
            </p>
            <p className="text-lg font-black">{mentor.name}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-white/80">
              <Calendar className="h-4 w-4 text-cyan-500" />
              {lang === "RU" ? "Выберите дату" : "Select a date"}
            </p>
            <div className="grid grid-cols-4 gap-2">
              {dates.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDate(d.value)}
                  className={`rounded-xl p-2 text-center text-xs font-bold transition-all ${
                    selectedDate === d.value
                      ? `bg-gradient-to-r ${c.gradient} text-white shadow-lg`
                      : "bg-black/5 text-stone-600 hover:bg-black/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-white/80">
                <Clock className="h-4 w-4 text-cyan-500" />
                {lang === "RU" ? "Выберите время" : "Select a time"}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-xl py-2.5 text-sm font-bold transition-all ${
                      selectedTime === time
                        ? `bg-gradient-to-r ${c.gradient} text-white shadow-lg`
                        : "bg-black/5 text-stone-600 hover:bg-black/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div className="flex items-center justify-between pt-2 text-sm text-stone-500 dark:text-white/50">
            <span>{lang === "RU" ? "Стоимость:" : "Price:"}</span>
            <span className={`text-lg font-black ${c.text}`}>${mentor.pricePerHour}/h</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!selectedDate || !selectedTime}
            onClick={() => onConfirm(selectedDate, selectedTime)}
            className={`flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${c.gradient} py-3.5 font-bold text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <Check className="h-4 w-4" />
            {lang === "RU" ? "Подтвердить запись" : "Confirm Booking"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const MentorsPage = ({ onBack, lang }: MentorsPageProps) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [chatMentor, setChatMentor] = useState<Mentor | null>(null);
  const [bookedId, setBookedId] = useState<number | null>(null);
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<{ mentorId: number; date: string; time: string } | null>(null);

  const mentors = useMemo(() => buildMentors(lang), [lang]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mentors.filter((m) => {
      const matchesCat = filter === "all" || m.category === filter;
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.skills.some((s) => s.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [mentors, filter, search]);

  const filters = [
    { id: "all", label: lang === "RU" ? "Все" : "All", color: "slate" },
    { id: "frontend", label: "Frontend", color: "cyan" },
    { id: "ai", label: "AI/ML", color: "pink" },
    { id: "cybersec", label: lang === "RU" ? "Кибербез" : "Cybersec", color: "purple" },
    { id: "datascience", label: lang === "RU" ? "Data Science" : "Data", color: "blue" },
    { id: "backend", label: "Backend", color: "emerald" },
    { id: "mobile", label: "Mobile", color: "amber" },
    { id: "devops", label: "DevOps", color: "orange" },
    { id: "gamedev", label: "GameDev", color: "rose" },
  ];

  const handleBook = (mentor: Mentor) => {
    setBookingMentor(mentor);
  };

  const confirmBooking = (date: string, time: string) => {
    if (!bookingMentor) return;

    setBookingConfirmed({ mentorId: bookingMentor.id, date, time });
    setBookedId(bookingMentor.id);
    setBookingMentor(null);
    setSelectedMentor(null);

    window.setTimeout(() => {
      setBookedId(null);
      setBookingConfirmed(null);
    }, 4000);
  };

  const openChat = (mentor: Mentor) => {
    setSelectedMentor(null);
    setChatMentor(mentor);
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28 md:px-6 md:pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] dark:opacity-[0.18] [background-image:linear-gradient(rgba(138,168,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,42,84,.13)_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-[#8AA8FF]/10 blur-[120px] dark:bg-[#8AA8FF]/20" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-[#8AA8FF]/10 blur-[120px] dark:bg-[#8AA8FF]/20" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/5 bg-black/[0.035] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-stone-500 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white/50"
          >
            <Sparkles className="h-4 w-4 text-[#b8893a]" />
            SkillPath Mentors
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-black md:mb-6 md:text-5xl lg:text-6xl"
          >
            <span className="text-stone-900 dark:text-white">{lang === "RU" ? "Найди своего " : "Find Your "}</span>
            <span className="bg-gradient-to-r from-[#f3dfa8] via-[#e6c272] to-[#c89a3f] bg-clip-text text-transparent dark:from-[#f3dfa8] dark:via-[#e6c272] dark:to-[#c89a3f]">
              {lang === "RU" ? "Ментора" : "Mentor"}
            </span>
          </motion.h1>
          <p className="mx-auto max-w-2xl text-base text-stone-600 dark:text-stone-400 md:text-xl">
            {lang === "RU"
              ? "Учись у инженеров из Yandex, Tinkoff, OpenAI и других топовых компаний"
              : "Learn from engineers at Yandex, Tinkoff, OpenAI and other top companies"}
          </p>
        </div>

        <div className={`${glassCard} mb-8 flex flex-col gap-3 p-4 md:mb-10 md:flex-row md:flex-wrap md:items-center md:p-5`}>
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder={lang === "RU" ? "Поиск по имени или навыкам..." : "Search by name or skills..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-black/5 py-2.5 pl-11 pr-4 text-stone-800 placeholder:text-stone-400 focus:border-[#8AA8FF] focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="-mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0 md:pb-0">
            {filters.map((f) => {
              const active = filter === f.id;
              const c = f.color === "slate" ? fallbackColor : colorMap[f.color as ColorKey];
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex-shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                    active
                      ? f.color === "slate"
                        ? "bg-stone-900 text-white dark:bg-white dark:text-stone-900"
                        : `bg-gradient-to-r ${c.gradient} text-white shadow-lg`
                      : "bg-black/5 text-stone-600 hover:bg-black/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-stone-400">
            <p className="text-xl">{lang === "RU" ? "Никого не нашли 🤷" : "Nobody found 🤷"}</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((m, i) => {
                const c = colorMap[m.color];
                return (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    whileHover={{ y: -6 }}
                    className={`${glassCard} group relative cursor-pointer overflow-hidden p-6`}
                    onClick={() => setSelectedMentor(m)}
                  >
                    <div className={`absolute -right-10 -top-10 h-40 w-40 bg-gradient-to-br ${c.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />

                    <div className="relative z-10 mb-4 flex items-start gap-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg">
                        <Avatar mentor={m} c={c} className="h-16 w-16 text-xl" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-lg font-bold text-stone-900 dark:text-white">{m.name}</h3>
                        <p className="truncate text-sm text-stone-600 dark:text-stone-400">{m.role}</p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <Briefcase className="h-3 w-3 text-stone-400" />
                          <span className={`text-xs font-bold ${c.text}`}>{m.company}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-stone-800 dark:text-white">{m.rating}</span>
                        <span className="text-stone-400">({m.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {m.experience} {lang === "RU" ? "лет" : "yrs"}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {m.skills.slice(0, 3).map((s) => (
                        <span key={s} className={`rounded-md px-2 py-0.5 text-xs font-bold ${c.bg} ${c.text}`}>
                          {s}
                        </span>
                      ))}
                      {m.skills.length > 3 && <span className="px-2 py-0.5 text-xs text-stone-400">+{m.skills.length - 3}</span>}
                    </div>

                    <div className="flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/10">
                      <div>
                        <p className={`text-xl font-black ${c.text}`}>
                          ${m.pricePerHour}
                          <span className="text-xs font-normal text-stone-500">/h</span>
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-stone-400">
                          {lang === "RU" ? "Свободно: " : "Free: "}
                          {m.nextSlot}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openChat(m);
                          }}
                          title={lang === "RU" ? "Написать" : "Message"}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/5 text-stone-600 transition-all hover:bg-black/10 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBook(m);
                          }}
                          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                            bookedId === m.id ? "bg-green-500 text-white" : `bg-gradient-to-r ${c.gradient} text-white shadow-md hover:shadow-lg`
                          }`}
                        >
                          {bookedId === m.id ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              {lang === "RU" ? "Запрошено!" : "Requested!"}
                            </>
                          ) : (
                            <>
                              <Calendar className="h-3.5 w-3.5" />
                              {lang === "RU" ? "Записаться" : "Book"}
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-12 text-center md:mt-16">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 font-bold text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" /> {lang === "RU" ? "На главную" : "Back home"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedMentor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMentor(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md md:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl dark:border-white/10 dark:bg-stone-900"
            >
              <div className={`relative h-28 bg-gradient-to-br ${colorMap[selectedMentor.color].gradient} md:h-32`}>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative -mt-16 p-6 md:p-8">
                <div className="mb-4 h-20 w-20 overflow-hidden rounded-3xl border-4 border-white shadow-2xl dark:border-slate-900 md:h-24 md:w-24">
                  <Avatar mentor={selectedMentor} c={colorMap[selectedMentor.color]} className="h-full w-full text-2xl md:text-3xl" />
                </div>
                <h2 className="text-2xl font-black text-stone-900 dark:text-white">{selectedMentor.name}</h2>
                <p className="text-stone-600 dark:text-stone-400">
                  {selectedMentor.role} · {selectedMentor.company}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-stone-800 dark:text-white">{selectedMentor.rating}</span>
                    <span className="text-stone-400">({selectedMentor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500">
                    <Award className="h-3.5 w-3.5" />
                    <span>
                      {selectedMentor.sessionsCompleted} {lang === "RU" ? "сессий" : "sessions"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500">
                    <Globe className="h-3.5 w-3.5" />
                    <span>{selectedMentor.languages.join(", ")}</span>
                  </div>
                </div>

                <p className="mt-5 leading-relaxed text-stone-700 dark:text-stone-300">{selectedMentor.bio}</p>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-500">
                    {lang === "RU" ? "Экспертиза" : "Expertise"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.skills.map((s) => (
                      <span
                        key={s}
                        className={`rounded-lg px-3 py-1 text-sm font-bold ${colorMap[selectedMentor.color].bg} ${colorMap[selectedMentor.color].text}`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => openChat(selectedMentor)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-black/5 py-3 text-sm font-bold text-stone-700 transition-colors hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {lang === "RU" ? "Написать" : "Message"}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBook(selectedMentor)}
                    className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${colorMap[selectedMentor.color].gradient} py-3 text-sm font-bold text-white shadow-lg`}
                  >
                    <Calendar className="h-4 w-4" />${selectedMentor.pricePerHour}/h · {lang === "RU" ? "Записаться" : "Book Session"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookingMentor && (
          <BookingModal
            mentor={bookingMentor}
            lang={lang}
            onClose={() => setBookingMentor(null)}
            onConfirm={confirmBooking}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookingConfirmed && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 z-[300] flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-green-500 px-6 py-4 font-bold text-white shadow-2xl shadow-green-500/40"
          >
            <Check className="h-5 w-5" />
            <div>
              <p className="text-sm font-black">{lang === "RU" ? "Запись подтверждена!" : "Booking confirmed!"}</p>
              <p className="text-xs opacity-80">
                {bookingConfirmed.date} · {bookingConfirmed.time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chatMentor && <ChatWindow mentor={chatMentor} lang={lang} onClose={() => setChatMentor(null)} />}
      </AnimatePresence>
    </div>
  );
};
