import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Star, Briefcase, Clock, MessageCircle, X, Check,
  Award, Calendar, Globe, Linkedin, Github, Search,
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

interface MentorsPageProps {
  onBack: () => void;
  lang: "EN" | "RU";
  t: any;
}

export const MentorsPage = ({ onBack, lang, t }: MentorsPageProps) => {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
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

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* HEADER */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black mb-6"
          >
            <span className="text-slate-900 dark:text-white">
              {lang === "RU" ? "Найди своего " : "Find Your "}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-400">
              {lang === "RU" ? "Ментора" : "Mentor"}
            </span>
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-400 text-xl max-w-2xl mx-auto">
            {lang === "RU"
              ? "Учись у инженеров из Yandex, Tinkoff, OpenAI и других топовых компаний"
              : "Learn from engineers at Yandex, Tinkoff, OpenAI and other top companies"}
          </p>
        </div>

        {/* SEARCH + FILTERS */}
        <div className={`${glassCard} p-5 mb-10 flex flex-wrap items-center gap-3`}>
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
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = filter === f.id;
              const c = colorMap[f.color] || { gradient: "from-slate-600 to-slate-700", bg: "bg-slate-500/10", text: "text-slate-700 dark:text-slate-300", border: "border-slate-300" };
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white font-black text-xl shadow-lg flex-shrink-0`}>
                        {m.initials}
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Back */}
        <div className="text-center mt-16">
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
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Top gradient banner */}
              <div className={`h-32 bg-gradient-to-br ${colorMap[selectedMentor.color].gradient} relative`}>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 -mt-16 relative">
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${colorMap[selectedMentor.color].gradient} flex items-center justify-center text-white font-black text-3xl shadow-2xl border-4 border-white dark:border-slate-900 mb-4`}>
                  {selectedMentor.initials}
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

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button className="py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-slate-700 dark:text-white/80 font-bold text-sm">
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
    </div>
  );
};