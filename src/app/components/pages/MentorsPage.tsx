import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Star, Briefcase, Clock, MessageCircle, X, Check,
  Award, Calendar, Globe, Send, Trash2,Search
} from "lucide-react";

const glassCard = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl shadow-xl";

const colorMap: Record<string, { gradient: string; bg: string; text: string; border: string }> = {
  cyan:   { gradient: "from-cyan-500 to-blue-600",     bg: "bg-cyan-500/10",   text: "text-cyan-600 dark:text-cyan-400",   border: "border-cyan-500/30" },
  pink:   { gradient: "from-pink-500 to-rose-600",     bg: "bg-pink-500/10",   text: "text-pink-600 dark:text-pink-400",   border: "border-pink-500/30" },
  purple: { gradient: "from-purple-500 to-violet-600", bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", border: "border-purple-500/30" },
  blue:   { gradient: "from-blue-500 to-indigo-600",   bg: "bg-blue-500/10",   text: "text-blue-600 dark:text-blue-400",   border: "border-blue-500/30" },
};

const buildMentors = (lang: "EN" | "RU") => [
  {
    id: 1,
    name: lang === "RU" ? "Анна Соколова" : "Anna Sokolova",
    role: lang === "RU" ? "Senior Frontend Engineer" : "Senior Frontend Engineer",
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
    bio: lang === "RU"
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
    bio: lang === "RU"
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
    bio: lang === "RU"
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
    bio: lang === "RU"
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
    bio: lang === "RU"
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
    bio: lang === "RU"
      ? "Research в области LLM и диффузионных моделей. Топ менторов по подготовке к ресёрч-позициям."
      : "Research on LLMs and diffusion models. Top mentor for research position prep.",
    sessionsCompleted: 60,
    nextSlot: lang === "RU" ? "На следующей неделе" : "Next week",
  },
];

/* ─────────────────────────────────────────────
   Avatar — фото с фолбэком на инициалы
───────────────────────────────────────────── */
const Avatar = ({ mentor, c, className = "", textClass = "" }: any) => {
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

/* ─────────────────────────────────────────────
   Демо-чат с авто-ответами + localStorage
───────────────────────────────────────────── */
const CHAT_KEY = "skillpath-mentor-chats-v1";

const loadChat = (mentorId: number): any[] => {
  try {
    const raw = localStorage.getItem(CHAT_KEY);
    if (!raw) return [];
    return (JSON.parse(raw)[mentorId]) || [];
  } catch { return []; }
};

const saveChat = (mentorId: number, messages: any[]) => {
  try {
    const raw = localStorage.getItem(CHAT_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[mentorId] = messages;
    localStorage.setItem(CHAT_KEY, JSON.stringify(data));
  } catch {}
};

const autoReplies = (lang: "EN" | "RU") => lang === "RU" ? [
  "Привет! Рад знакомству 👋 Чем могу помочь?",
  "Отличный вопрос! Расскажи подробнее о своих целях.",
  "Понял тебя. Давай разберём это на ближайшей сессии — записывайся!",
  "Я обычно отвечаю в течение пары часов. Можешь смело писать вопросы.",
  "Звучит как хороший план. Какой у тебя сейчас уровень?",
] : [
  "Hi! Nice to meet you 👋 How can I help?",
  "Great question! Tell me more about your goals.",
  "Got it. Let's dig into this on our next session — book a slot!",
  "I usually reply within a couple of hours. Feel free to ask anything.",
  "Sounds like a good plan. What's your current level?",
];

const ChatWindow = ({ mentor, lang, onClose }: any) => {
  const c = colorMap[mentor.color];
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // загрузка истории
  useEffect(() => {
    const saved = loadChat(mentor.id);
    if (saved.length) {
      setMessages(saved);
    } else {
      // приветствие ментора
      const greeting = lang === "RU"
        ? `Привет! Я ${mentor.name.split(" ")[0]}. Спрашивай что угодно про ${mentor.role} 🚀`
        : `Hey! I'm ${mentor.name.split(" ")[0]}. Ask me anything about ${mentor.role} 🚀`;
      setMessages([{ from: "mentor", text: greeting, time: Date.now() }]);
    }
  }, [mentor.id]);

  // сохранение + автоскролл
  useEffect(() => {
    if (messages.length) saveChat(mentor.id, messages);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: "me", text, time: Date.now() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const replies = autoReplies(lang);
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-md flex items-center justify-center p-0 sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg h-full sm:h-[600px] sm:max-h-[85vh] bg-white dark:bg-slate-900 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-black/5 dark:border-white/10"
      >
        {/* HEADER */}
        <div className={`px-4 py-3 flex items-center gap-3 bg-gradient-to-r ${c.gradient} text-white flex-shrink-0`}>
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/40">
            <Avatar mentor={mentor} c={c} className="w-10 h-10 text-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate">{mentor.name}</p>
            <p className="text-[11px] text-white/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
              {lang === "RU" ? "в сети" : "online"}
            </p>
          </div>
          <button onClick={clearChat} title={lang === "RU" ? "Очистить" : "Clear"}
            className="p-2 rounded-full hover:bg-white/20 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MESSAGES */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                m.from === "me"
                  ? `bg-gradient-to-r ${c.gradient} text-white rounded-br-md`
                  : "bg-white dark:bg-white/10 text-slate-800 dark:text-white rounded-bl-md border border-black/5 dark:border-white/10"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white dark:bg-white/10 border border-black/5 dark:border-white/10 flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="p-3 border-t border-black/5 dark:border-white/10 flex items-center gap-2 flex-shrink-0 bg-white dark:bg-slate-900">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder={lang === "RU" ? "Напишите сообщение..." : "Type a message..."}
            className="flex-1 px-4 py-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 text-sm"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-all disabled:opacity-40 bg-gradient-to-r ${c.gradient} hover:opacity-90`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface MentorsPageProps {
  onBack: () => void;
  lang: "EN" | "RU";
  t: any;
}

export const MentorsPage = ({ onBack, lang, t }: MentorsPageProps) => {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [chatMentor, setChatMentor] = useState<any>(null);
  const [bookedId, setBookedId] = useState<number | null>(null);

  const mentors = useMemo(() => buildMentors(lang), [lang]);

  const filtered = useMemo(() => {
    return mentors.filter((m) => {
      const matchesCat = filter === "all" || m.category === filter;
      const matchesSearch = !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase()) ||
        m.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [mentors, filter, search]);

  const filters = [
    { id: "all",         label: lang === "RU" ? "Все"          : "All",        color: "slate" },
    { id: "frontend",    label: lang === "RU" ? "Frontend"     : "Frontend",   color: "cyan" },
    { id: "ai",          label: lang === "RU" ? "AI/ML"        : "AI/ML",      color: "pink" },
    { id: "cybersec",    label: lang === "RU" ? "Кибербез"     : "Cybersec",   color: "purple" },
    { id: "datascience", label: lang === "RU" ? "Data Science" : "Data",       color: "blue" },
  ];

  const handleBook = (id: number) => {
    setBookedId(id);
    setTimeout(() => setBookedId(null), 2500);
  };

  const openChat = (mentor: any) => {
    setSelectedMentor(null);
    setChatMentor(mentor);
  };

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-20 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6"
          >
            <span className="text-slate-900 dark:text-white">
              {lang === "RU" ? "Найди своего " : "Find Your "}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-400">
              {lang === "RU" ? "Ментора" : "Mentor"}
            </span>
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl max-w-2xl mx-auto">
            {lang === "RU"
              ? "Учись у инженеров из Yandex, Tinkoff, OpenAI и других топовых компаний"
              : "Learn from engineers at Yandex, Tinkoff, OpenAI and other top companies"}
          </p>
        </div>

        {/* SEARCH + FILTERS */}
        <div className={`${glassCard} p-4 md:p-5 mb-8 md:mb-10 flex flex-col md:flex-row md:flex-wrap md:items-center gap-3`}>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={lang === "RU" ? "Поиск по имени или навыкам..." : "Search by name or skills..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-1 md:pb-0">
            {filters.map((f) => {
              const active = filter === f.id;
              const c = colorMap[f.color] || { gradient: "from-slate-600 to-slate-700", bg: "bg-slate-500/10", text: "text-slate-700 dark:text-slate-300", border: "border-slate-300" };
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all
                    ${active
                      ? f.color === "slate"
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                        : `bg-gradient-to-r ${c.gradient} text-white shadow-lg`
                      : "bg-black/5 dark:bg-white/5 text-slate-600 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10"
                    }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">{lang === "RU" ? "Никого не нашли 🤷" : "Nobody found 🤷"}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
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
                    className={`${glassCard} p-6 cursor-pointer group relative overflow-hidden`}
                    onClick={() => setSelectedMentor(m)}
                  >
                    {/* Glow on hover */}
                    <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />

                    {/* Avatar + info */}
                    <div className="flex items-start gap-4 mb-4 relative z-10">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                        <Avatar mentor={m} c={c} className="w-16 h-16 text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{m.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{m.role}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Briefcase className="w-3 h-3 text-slate-400" />
                          <span className={`text-xs font-bold ${c.text}`}>{m.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating + experience */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800 dark:text-white">{m.rating}</span>
                        <span className="text-slate-400">({m.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{m.experience} {lang === "RU" ? "лет" : "yrs"}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {m.skills.slice(0, 3).map((s) => (
                        <span key={s} className={`text-xs font-bold px-2 py-0.5 rounded-md ${c.bg} ${c.text}`}>
                          {s}
                        </span>
                      ))}
                      {m.skills.length > 3 && (
                        <span className="text-xs text-slate-400 px-2 py-0.5">+{m.skills.length - 3}</span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/10">
                      <div>
                        <p className={`text-xl font-black ${c.text}`}>${m.pricePerHour}<span className="text-xs font-normal text-slate-500">/h</span></p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">
                          {lang === "RU" ? "Свободно: " : "Free: "}{m.nextSlot}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => { e.stopPropagation(); openChat(m); }}
                          title={lang === "RU" ? "Написать" : "Message"}
                          className="w-9 h-9 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/10 text-slate-600 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/20 transition-all"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => { e.stopPropagation(); handleBook(m.id); }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5
                            ${bookedId === m.id
                              ? "bg-green-500 text-white"
                              : `bg-gradient-to-r ${c.gradient} text-white shadow-md hover:shadow-lg`
                            }`}
                        >
                          {bookedId === m.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              {lang === "RU" ? "Запрошено!" : "Requested!"}
                            </>
                          ) : (
                            <>
                              <Calendar className="w-3.5 h-3.5" />
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

        {/* Back */}
        <div className="text-center mt-12 md:mt-16">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-bold"
          >
            <ArrowLeft className="w-5 h-5" /> {lang === "RU" ? "На главную" : "Back home"}
          </button>
        </div>
      </div>

      {/* MENTOR MODAL */}
      <AnimatePresence>
        {selectedMentor && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedMentor(null)}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl my-auto bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Top gradient banner */}
              <div className={`h-28 md:h-32 bg-gradient-to-br ${colorMap[selectedMentor.color].gradient} relative`}>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 -mt-16 relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 mb-4">
                  <Avatar mentor={selectedMentor} c={colorMap[selectedMentor.color]} className="w-full h-full text-2xl md:text-3xl" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">{selectedMentor.name}</h2>
                <p className="text-slate-600 dark:text-slate-400">{selectedMentor.role} · {selectedMentor.company}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800 dark:text-white">{selectedMentor.rating}</span>
                    <span className="text-slate-400">({selectedMentor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Award className="w-3.5 h-3.5" />
                    <span>{selectedMentor.sessionsCompleted} {lang === "RU" ? "сессий" : "sessions"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{selectedMentor.languages.join(", ")}</span>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-5">{selectedMentor.bio}</p>

                <div className="mt-5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {lang === "RU" ? "Экспертиза" : "Expertise"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.skills.map((s: string) => (
                      <span key={s} className={`text-sm font-bold px-3 py-1 rounded-lg ${colorMap[selectedMentor.color].bg} ${colorMap[selectedMentor.color].text}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={() => openChat(selectedMentor)}
                    className="py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-slate-700 dark:text-white/80 font-bold text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {lang === "RU" ? "Написать" : "Message"}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { handleBook(selectedMentor.id); setSelectedMentor(null); }}
                    className={`py-3 rounded-xl bg-gradient-to-r ${colorMap[selectedMentor.color].gradient} text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg`}
                  >
                    <Calendar className="w-4 h-4" />
                    ${selectedMentor.pricePerHour}/h · {lang === "RU" ? "Записаться" : "Book Session"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {chatMentor && (
          <ChatWindow mentor={chatMentor} lang={lang} onClose={() => setChatMentor(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
