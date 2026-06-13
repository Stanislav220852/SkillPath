import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Calendar,
  Trophy,
  Target,
  BookOpen,
  MessageCircle,
  Clock,
  Star,
  ChevronRight,
  LogOut,
  Edit3,
  Check,
  X,
  Briefcase,
  TrendingUp,
  Loader2,
  ShieldCheck,
  Crown,
  Gem,
  Sparkles,
  Award,
  Layers,
  Flame,
  Activity,
  CheckCircle2,
  Camera,
  Zap,
  Diamond,
  Terminal,
  Cpu,
  ShieldAlert,
  Database,
  Server,
  Smartphone,
  Settings,
  Gamepad2,
} from "lucide-react";
import * as API from "../../api";
import { API_URL } from "../../api";
import { getActivityEvents } from "../utils/activityTracker";
import { getProgressPercent, useProgressVersion, useRoadmapProgress } from "../utils/useRoadmapProgress";

/**
 * PREMIUM EDITION — Champagne Gold × Deep Graphite
 * Visual language: liquid gold accents, glassmorphism depth, cinematic lighting
 */

/* ─── Palette ──────────────────────────────────────────────────────────── */

const card =
  "bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] shadow-[0_8px_32px_rgba(0,42,84,0.10),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.02)] transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(var(--tp-rgb),0.18),0_4px_12px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_24px_70px_rgba(0,0,0,0.6),0_0_0_1px_rgba(var(--tp-rgb),0.06)]";

const panel =
  "bg-stone-50/60 dark:bg-white/[0.025] border border-stone-200/70 dark:border-white/[0.06] backdrop-blur-xl transition-all duration-300 hover:border-[var(--tp)]/30 dark:hover:border-[var(--tp)]/15 hover:bg-stone-50/80 dark:hover:bg-white/[0.04]";

const softButton =
  "bg-white/70 dark:bg-white/[0.03] border border-stone-200/80 dark:border-white/[0.07] text-stone-800 dark:text-stone-100 hover:bg-[var(--tp)]/5 hover:border-[var(--tp)]/30 dark:hover:bg-[var(--tp)]/[0.05] dark:hover:border-[var(--tp)]/20 transition-all duration-300";

const goldGradient = "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]";
const goldGradientWide = "from-[var(--tp)] via-[var(--tp)] via-[var(--tp-dark)] via-[var(--tp-dark)] to-[var(--ta)]";
const blackGradient = "from-stone-900 via-zinc-900 to-black";

const accentIcon = "text-[var(--tp-dark)] dark:text-[var(--tp)]";

const roleGradients: Record<string, string> = {
  frontend: "from-[#7dd3fc] via-[#3b82f6] to-[#1e3a8a]",
  ai: "from-[#c4b5fd] via-[#8b5cf6] to-[#4c1d95]",
  cybersec: "from-[#a78bfa] via-[#7c3aed] to-[#1e1b4b]",
  datascience: "from-[#67e8f9] via-[#0ea5e9] to-[#0c4a6e]",
  backend: "from-[#5eead4] via-[#14b8a6] to-[#134e4a]",
  mobile: "from-[#fcd34d] via-[#f59e0b] to-[#92400e]",
  devops: "from-[#fdba74] via-[#f97316] to-[#7c2d12]",
  gamedev: "from-[#fda4af] via-[#f43f5e] to-[#881337]",
};

const roleNames: Record<string, Record<"RU" | "EN", string>> = {
  frontend: { RU: "Frontend-разработчик", EN: "Frontend Developer" },
  ai: { RU: "AI / ML Инженер", EN: "AI / ML Engineer" },
  cybersec: { RU: "Кибербезопасность", EN: "Cybersecurity" },
  datascience: { RU: "Data Scientist", EN: "Data Scientist" },
  backend: { RU: "Backend-разработчик", EN: "Backend Developer" },
  mobile: { RU: "Mobile-разработчик", EN: "Mobile Developer" },
  devops: { RU: "DevOps Инженер", EN: "DevOps Engineer" },
  gamedev: { RU: "Game-разработчик", EN: "Game Developer" },
};

interface ProfilePageProps {
  onBack: () => void;
  lang: "EN" | "RU";
  currentUser: any;
  onLogout: () => void;
  onNavigate: (page: string, roadmapKey?: string) => void;
  roadmapPhases?: Record<string, any>;
}

type TabId = "overview" | "quizzes" | "bookings" | "courses";

type ActivityItem = {
  id: string;
  type: "quiz" | "booking" | "profile" | "lesson" | "roadmap_skill";
  title: string;
  subtitle: string;
  date: Date;
  icon: any;
  gradient: string;
};

const dateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const parseDate = (value: any) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

const formatDate = (value: any, lang: "EN" | "RU") => {
  const date = value instanceof Date ? value : parseDate(value);
  if (!date) return "—";
  return date.toLocaleDateString(lang === "RU" ? "ru-RU" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getMatchPercent = (scores: any) => {
  const values = Object.values(scores || {})
    .map((v) => Number(v))
    .filter((v) => Number.isFinite(v));
  if (!values.length) return null;
  return Math.round((Math.max(...values) / 15) * 100);
};

const roleTitle = (role: string | undefined, lang: "EN" | "RU") => {
  if (!role) return "—";
  return roleNames[role]?.[lang] || role;
};

const getStudyIntensityClass = (count: number) => {
  if (count <= 0)
    return "bg-stone-100 dark:bg-white/[0.04] border-stone-200/80 dark:border-white/[0.06]";
  if (count === 1)
    return "bg-[var(--tp)]/20 dark:bg-[var(--tp)]/10 border-[var(--tp)]/40 dark:border-[var(--tp)]/20";
  if (count === 2)
    return "bg-[var(--tp)]/40 dark:bg-[var(--tp)]/20 border-[var(--tp)]/60 dark:border-[var(--tp)]/30";
  if (count === 3)
    return "bg-[var(--ta)]/40 dark:bg-[var(--ta)]/20 border-[var(--ta)]/60 dark:border-[var(--ta)]/30";
  return "bg-[var(--tp-dark)]/60 dark:bg-[var(--tp)]/40 border-[var(--tp-dark)]/80 dark:border-[var(--tp)]/50";
};

export const ProfilePage = ({ onBack, lang, currentUser, onLogout, onNavigate, roadmapPhases }: ProfilePageProps) => {
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [profileStats, setProfileStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || "");
  const [avatarUrl, setAvatarUrl] = useState<string>(currentUser?.avatar_url || "");

  useProgressVersion();

  const topRole = quizHistory[0]?.top_role || null;
  const { completed: roadmapCompleted } = useRoadmapProgress(topRole);

  const roadmapKeys = ["frontend", "ai", "cybersec", "datascience", "backend", "mobile", "devops", "gamedev"] as const;
  const roadmapProgressData = roadmapKeys.map((key) => {
    const { completed } = useRoadmapProgress(key);
    return { key, completed };
  });

  const roadmapIconMap: Record<string, any> = {
    frontend: Terminal, ai: Cpu, cybersec: ShieldAlert, datascience: Database,
    backend: Server, mobile: Smartphone, devops: Settings, gamedev: Gamepad2,
  };

  const roadmapColorMap: Record<string, string> = {
    frontend: "cyan", ai: "pink", cybersec: "purple", datascience: "blue",
    backend: "emerald", mobile: "amber", devops: "orange", gamedev: "rose",
  };

  const roadmapTitleMap: Record<string, Record<string, string>> = {
    frontend: { RU: "Frontend-разработчик", EN: "Frontend Developer" },
    ai: { RU: "AI / ML Инженер", EN: "AI / ML Engineer" },
    cybersec: { RU: "Кибербезопасность", EN: "Cybersecurity" },
    datascience: { RU: "Data Scientist", EN: "Data Scientist" },
    backend: { RU: "Backend-разработчик", EN: "Backend Developer" },
    mobile: { RU: "Mobile-разработчик", EN: "Mobile Developer" },
    devops: { RU: "DevOps Инженер", EN: "DevOps Engineer" },
    gamedev: { RU: "Game-разработчик", EN: "Game Developer" },
  };

  const t = {
    profile: lang === "RU" ? "Личный кабинет" : "Personal Cabinet",
    subtitle:
      lang === "RU"
        ? "Премиальный центр управления обучением: прогресс, рекомендации, тесты и менторы."
        : "A premium learning command center: progress, recommendations, quizzes and mentors.",
    home: lang === "RU" ? "На главную" : "Back home",
    overview: lang === "RU" ? "Обзор" : "Overview",
    quizzes: lang === "RU" ? "Тесты" : "Quizzes",
    bookingsTab: lang === "RU" ? "Записи" : "Bookings",
    memberSince: lang === "RU" ? "На платформе с" : "Member since",
    topRole: lang === "RU" ? "Карьерный трек" : "Career track",
    quizzesTaken: lang === "RU" ? "Тестов" : "Quizzes",
    mentorSessions: lang === "RU" ? "Сессий" : "Sessions",
    lessonsCompleted: lang === "RU" ? "Уроков пройдено" : "Lessons done",
    skillsCompleted: lang === "RU" ? "Навыков освоено" : "Skills done",
    noQuizzes: lang === "RU" ? "Вы ещё не проходили тесты" : "No quizzes taken yet",
    noBookings: lang === "RU" ? "Нет записей к менторам" : "No mentor bookings yet",
    takeQuiz: lang === "RU" ? "Пройти тест" : "Take a Quiz",
    findMentor: lang === "RU" ? "Найти ментора" : "Find a Mentor",
    goToRoadmap: lang === "RU" ? "Открыть роадмап" : "Open Roadmap",
    logout: lang === "RU" ? "Выйти из аккаунта" : "Sign Out",
    match: lang === "RU" ? "совпадение" : "match",
    pending: lang === "RU" ? "Ожидает" : "Pending",
    confirmed: lang === "RU" ? "Подтверждено" : "Confirmed",
    cancelled: lang === "RU" ? "Отменено" : "Cancelled",
    cancel: lang === "RU" ? "Отменить" : "Cancel",
    editName: lang === "RU" ? "Изменить имя" : "Edit name",
    nextStep: lang === "RU" ? "Следующий шаг" : "Next step",
    latestResult: lang === "RU" ? "Последний результат" : "Latest result",
    fullQuiz: lang === "RU" ? "Большой тест" : "Full Quiz",
    miniQuiz: lang === "RU" ? "Мини-тест" : "Mini Quiz",
    mentor: lang === "RU" ? "Ментор" : "Mentor",
    verified: lang === "RU" ? "Активный аккаунт" : "Active account",
    premium: lang === "RU" ? "Elite доступ" : "Elite access",
    cabinetId: lang === "RU" ? "ID кабинета" : "Cabinet ID",
    learningIndex: lang === "RU" ? "Индекс прогресса" : "Progress index",
    bestMatch: lang === "RU" ? "лучшее совпадение" : "best match",
    activityFeed: lang === "RU" ? "Лента активности" : "Activity feed",
    studyCalendar: lang === "RU" ? "Дни занятий" : "Study days",
    lastWeeks: lang === "RU" ? "последние 14 недель" : "last 14 weeks",
    less: lang === "RU" ? "меньше" : "less",
    more: lang === "RU" ? "больше" : "more",
    activeDays: lang === "RU" ? "активных дней" : "active days",
    totalActions: lang === "RU" ? "действий" : "actions",
    loading: lang === "RU" ? "Загружаем кабинет..." : "Loading cabinet...",
    profileCreated: lang === "RU" ? "Профиль создан" : "Profile created",
    quizCompleted: lang === "RU" ? "Тест завершён" : "Quiz completed",
    mentorBooked: lang === "RU" ? "Запись к ментору" : "Mentor booking",
    lessonCompleted: lang === "RU" ? "Урок пройден" : "Lesson completed",
    skillCompleted: lang === "RU" ? "Навык освоен" : "Skill completed",
    courses: lang === "RU" ? "Курсы" : "Courses",
    noCourses: lang === "RU" ? "Вы ещё не начали ни одного курса" : "You haven't started any courses yet",
    startCourse: lang === "RU" ? "Начать курс" : "Start a course",
    emptyHintCourses: lang === "RU"
      ? "Откройте роадмап и начните первый урок — курс появится здесь."
      : "Open a roadmap and start the first lesson — the course will appear here.",
    skillsDone: lang === "RU" ? "навыков" : "skills",
    inProgress: lang === "RU" ? "В процессе" : "In progress",
    completed: lang === "RU" ? "Завершён" : "Completed",
    notStarted: lang === "RU" ? "Не начат" : "Not started",
    noActivity: lang === "RU" ? "Пока нет активности" : "No activity yet",
    emptyHintQuiz:
      lang === "RU"
        ? "Пройдите тест — система подберёт направление и построит персональную траекторию."
        : "Take the quiz and the system will build a personal learning trajectory.",
    emptyHintBookings:
      lang === "RU"
        ? "Запишитесь к ментору, чтобы ускорить путь и получить персональный фидбек."
        : "Book a mentor to accelerate your path and get personal feedback.",
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setAvatarUrl(currentUser?.avatar_url || "");
  }, [currentUser?.avatar_url]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [quizzes, bks, stats] = await Promise.all([
        API.getQuizHistory().catch(() => []),
        API.getBookings().catch(() => []),
        API.getProfileStats().catch(() => null),
      ]);
      setQuizHistory(Array.isArray(quizzes) ? quizzes : []);
      setBookings(Array.isArray(bks) ? bks : []);
      setProfileStats(stats);
    } catch (err) {
      console.error("Failed to load profile data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    try {
      await API.cancelBooking(bookingId);
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b)));
    } catch (err) {
      console.error("Failed to cancel:", err);
    }
  };

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API.getToken()}`,
        },
        body: JSON.stringify({ name: newName.trim() }),
      });

      if (res.ok) {
        const updated = await res.json();
        API.setSavedUser(updated);
        currentUser.name = updated.name;
        setEditingName(false);
      }
    } catch (err) {
      console.error("Failed to update name:", err);
    }
  };

  const handleAvatarUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file || !file.type?.startsWith("image/")) return;
    e.target.value = "";

    if (API.isLoggedIn()) {
      try {
        const updated = await API.uploadAvatar(file);
        setAvatarUrl(updated.avatar_url || "");
      } catch (err) {
        console.error("Failed to upload avatar:", err);
      }
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(String(reader.result || ""));
      };
      reader.readAsDataURL(file);
    }
  };

  const latestQuiz = quizHistory[0];
  const topGradient = topRole ? roleGradients[topRole] || goldGradient : goldGradient;
  const latestMatch = getMatchPercent(latestQuiz?.scores);
  const activeBookings = bookings.filter((b) => b.status !== "cancelled");

  const totalRoadmapSkills = useMemo(() => {
    if (!topRole || !roadmapPhases?.[topRole]) return 0;
    return roadmapPhases[topRole].phases?.flatMap((p: any) => p.skills).length || 0;
  }, [topRole, roadmapPhases]);

  const roadmapProgress = totalRoadmapSkills > 0
    ? Math.round((roadmapCompleted.size / totalRoadmapSkills) * 100)
    : 0;

  const lessonCount = profileStats?.total_lessons_completed ?? 0;
  const quizCount = quizHistory.length;
  const bookingCount = activeBookings.length;

  const progressIndex = (() => {
    if (roadmapProgress > 0) return roadmapProgress;
    if (lessonCount > 0) return Math.min(100, lessonCount * 5);
    if (latestMatch !== null) return latestMatch;
    return Math.min(100, quizCount * 12 + bookingCount * 8);
  })();

  const activities = useMemo<ActivityItem[]>(() => {
    const items: ActivityItem[] = [];

    quizHistory.forEach((quiz, index) => {
      const d = parseDate(quiz.created_at);
      if (!d) return;
      const pct = getMatchPercent(quiz.scores);
      items.push({
        id: `quiz-${quiz.id || index}`,
        type: "quiz",
        title: t.quizCompleted,
        subtitle: `${roleTitle(quiz.top_role, lang)}${pct !== null ? ` • ${pct}% ${t.match}` : ""}`,
        date: d,
        icon: Trophy,
        gradient: roleGradients[quiz.top_role] || goldGradient,
      });
    });

    bookings.forEach((booking, index) => {
      const d = parseDate(booking.date || booking.created_at);
      if (!d) return;
      items.push({
        id: `booking-${booking.id || index}`,
        type: "booking",
        title: t.mentorBooked,
        subtitle: `${t.mentor} #${booking.mentor_id}${booking.time ? ` • ${booking.time}` : ""}`,
        date: d,
        icon: Briefcase,
        gradient: blackGradient,
      });
    });

    const created = parseDate(currentUser?.created_at);
    if (created) {
      items.push({
        id: "profile-created",
        type: "profile",
        title: t.profileCreated,
        subtitle: currentUser.email || "SkillPath",
        date: created,
        icon: Crown,
        gradient: goldGradient,
      });
    }

    const activityEvents = getActivityEvents();
    activityEvents.forEach((ev, index) => {
      const d = parseDate(ev.date);
      if (!d) return;
      if (ev.type === "lesson") {
        items.push({
          id: `lesson-${index}`,
          type: "lesson",
          title: t.lessonCompleted,
          subtitle: ev.detail || "",
          date: d,
          icon: BookOpen,
          gradient: goldGradient,
        });
      } else if (ev.type === "roadmap_skill") {
        items.push({
          id: `roadmap-${index}`,
          type: "roadmap_skill",
          title: t.skillCompleted,
          subtitle: ev.detail || "",
          date: d,
          icon: Target,
          gradient: blackGradient,
        });
      }
    });

    return items.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 15);
  }, [quizHistory, bookings, currentUser?.created_at, currentUser?.email, lang, t.match, t.mentor, t.mentorBooked, t.profileCreated, t.quizCompleted, t.lessonCompleted, t.skillCompleted]);

  const heatmap = useMemo(() => {
    const counts: Record<string, number> = {};
    const add = (date: Date | null, amount = 1) => {
      if (!date) return;
      const key = dateKey(date);
      counts[key] = (counts[key] || 0) + amount;
    };

    quizHistory.forEach((q) => add(parseDate(q.created_at), 2));
    bookings.forEach((b) => add(parseDate(b.date || b.created_at), 1));
    add(parseDate(currentUser?.created_at), 1);

    const activityEvents = getActivityEvents();
    activityEvents.forEach((ev) => {
      const weight = ev.type === "lesson" ? 1 : ev.type === "roadmap_skill" ? 1 : 0;
      if (weight > 0) {
        const d = parseDate(ev.date);
        add(d, weight);
      }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(today);
    start.setDate(start.getDate() - 97);
    start.setHours(0, 0, 0, 0);

    const weeks: { date: Date; key: string; count: number }[][] = [];
    const current = new Date(start);

    for (let w = 0; w < 14; w++) {
      const week: { date: Date; key: string; count: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const itemDate = new Date(current);
        const key = dateKey(itemDate);
        week.push({ date: itemDate, key, count: counts[key] || 0 });
        current.setDate(current.getDate() + 1);
      }
      weeks.push(week);
    }

    const activeDays = Object.values(counts).filter((v) => v > 0).length;
    const totalActions = Object.values(counts).reduce((sum, v) => sum + v, 0);

    return { weeks, activeDays, totalActions };
  }, [quizHistory, bookings, currentUser?.created_at]);

  const statusColors: Record<string, string> = {
    pending:
      "bg-amber-100/80 text-amber-800 border-amber-300/70 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/25",
    confirmed:
      "bg-emerald-100/80 text-emerald-800 border-emerald-300/70 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/25",
    cancelled:
      "bg-rose-100/80 text-rose-700 border-rose-300/70 dark:bg-rose-400/10 dark:text-rose-300 dark:border-rose-400/25",
  };

  const tabs: { id: TabId; icon: any; label: string }[] = [
    { id: "overview", icon: Activity, label: t.overview },
    { id: "courses", icon: BookOpen, label: t.courses },
    { id: "quizzes", icon: Target, label: t.quizzes },
    { id: "bookings", icon: Calendar, label: t.bookingsTab },
  ];

  const statCards = [
    { icon: Award, value: roleTitle(topRole, lang), label: t.topRole, gradient: topGradient },
    { icon: Trophy, value: quizHistory.length, label: t.quizzesTaken, gradient: goldGradient },
    { icon: BookOpen, value: profileStats?.total_lessons_completed ?? 0, label: t.lessonsCompleted, gradient: goldGradient },
    { icon: Layers, value: `${roadmapCompleted.size}/${totalRoadmapSkills}`, label: t.skillsCompleted, gradient: goldGradient },
  ];

  if (!currentUser) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative min-h-screen overflow-hidden px-5 pb-20 pt-24 md:px-6"
    >
      {/* ─── Minimal grid overlay (ThemeEffects handles the rest) ─── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--tp-rgb),0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--tp-rgb),0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Header bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white/70 px-4 py-2.5 text-sm font-bold text-stone-600 backdrop-blur-xl transition-all hover:border-amber-300/70 hover:text-stone-950 hover:shadow-lg hover:shadow-amber-900/5 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-stone-300 dark:hover:border-amber-200/25 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.home}
          </motion.button>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 rounded-xl border bg-gradient-to-r px-5 py-2.5 text-xs font-black uppercase tracking-[0.22em] backdrop-blur-xl dark:text-[var(--tp)]"
            style={{ borderColor: "rgba(var(--tp-rgb),0.3)", backgroundImage: "linear-gradient(to right, rgba(var(--tp-rgb),0.2), rgba(var(--tpd-rgb),0.15), rgba(var(--ta-rgb),0.2))" }}
          >
            <Diamond className={`h-4 w-4 ${accentIcon}`} />
            SkillPath Elite
          </motion.div>
        </div>

        {/* ═══════ Split Hero ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]"
        >
          {/* ── Left: Profile Card ── */}
          <section className={`${card} premium-card-highlight relative overflow-hidden rounded-3xl p-7 md:p-9`}>
            {/* Top shimmer line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--tp)]/80 to-transparent dark:via-[var(--tp)]/50" />
            <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#8AA8FF]/15 blur-[90px] dark:bg-[#8AA8FF]/[0.10]" />
            
            <div className="relative flex flex-col gap-7 md:flex-row md:items-center">
              {/* Avatar with animated ring */}
              <motion.label
                whileHover={{ scale: 1.04 }}
                className="premium-avatar-ring group relative h-28 w-28 flex-shrink-0 cursor-pointer md:h-32 md:w-32"
                title={lang === "RU" ? "Загрузить фото" : "Upload photo"}
              >
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                <div className="absolute inset-0 rounded-full blur-2xl dark:bg-[var(--tp)]/20" style={{backgroundColor: "rgba(var(--tp-rgb),0.25)"}} />
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-[var(--tp)]/40 bg-gradient-to-br from-stone-50 to-stone-200 text-5xl font-black text-stone-900 shadow-2xl ring-4 ring-white/80 dark:border-[var(--tp)]/30 dark:from-stone-800 dark:to-stone-950 dark:text-[var(--tp)] dark:ring-black/60">
                  {avatarUrl ? (
                    <img src={avatarUrl.startsWith("/") ? `${API_URL}${avatarUrl}` : avatarUrl} alt={currentUser.name || "Profile"} className="h-full w-full object-cover" />
                  ) : (
                    currentUser.name?.charAt(0)?.toUpperCase() || "U"
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Camera className="h-7 w-7" />
                  </div>
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-white bg-emerald-500 shadow-lg dark:border-[#0d0e12]" />
              </motion.label>

              <div className="min-w-0 flex-1">
                {/* Premium badge */}
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-3 inline-flex items-center gap-2 rounded-xl border border-[var(--tp)]/50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--tp-dark)] shadow-sm dark:border-[var(--tp)]/25 dark:text-[var(--tp)]"
            style={{ backgroundImage: "linear-gradient(to right, rgba(var(--tp-rgb),0.3), rgba(var(--tpd-rgb),0.2))" }}
                >
                  <Crown className="h-4 w-4 text-[var(--tp-dark)] dark:text-[var(--tp)]" />
                  {t.premium}
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                </motion.div>

                {editingName ? (
                  <div className="mb-3 flex w-full flex-wrap items-center gap-2">
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="min-w-0 flex-1 rounded-xl border border-[#8AA8FF]/60 bg-white/90 px-5 py-3.5 text-2xl font-black text-stone-950 outline-none backdrop-blur-xl transition-all focus:border-[#002A54] focus:shadow-lg focus:shadow-amber-500/20 focus:ring-2 focus:ring-[#8AA8FF]/30 dark:border-[#8AA8FF]/30 dark:bg-white/[0.06] dark:text-stone-50 dark:focus:border-[#8AA8FF]/70"
                      autoFocus
                    />
                    <motion.button whileTap={{ scale: 0.95 }} onClick={handleSaveName} className="rounded-xl bg-emerald-600 p-3.5 text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500 hover:shadow-emerald-500/40">
                      <Check className="h-5 w-5" />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => setEditingName(false)} className="rounded-xl bg-rose-600 p-3.5 text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-500 hover:shadow-rose-500/40">
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>
                ) : (
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h1 className="min-w-0 max-w-full break-words text-[clamp(1.8rem,5vw,3.8rem)] font-black leading-[1.05] tracking-tight text-stone-950 dark:text-white">
                      {currentUser.name}
                    </h1>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setNewName(currentUser.name);
                        setEditingName(true);
                      }}
                      title={t.editName}
                      className="rounded-xl border border-stone-200/80 bg-white/70 p-2.5 text-stone-500 shadow-sm transition-all hover:border-amber-300/70 hover:text-[#002A54] hover:shadow-md dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-stone-500 dark:hover:border-amber-200/25 dark:hover:text-[#8AA8FF]"
                    >
                      <Edit3 className="h-4 w-4" />
                    </motion.button>
                  </div>
                )}

                <p className="max-w-2xl text-sm leading-relaxed text-stone-500 dark:text-stone-400 md:text-base">
                  {t.subtitle}
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5 text-sm">
                  <Badge icon={Mail}>{currentUser.email}</Badge>
                  <Badge icon={ShieldCheck}>{t.verified}</Badge>
                  <Badge icon={Calendar}>{t.memberSince} {formatDate(currentUser.created_at, lang)}</Badge>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate("quiz")}
                    className={`inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r ${goldGradientWide} px-6 py-3.5 text-sm font-black text-stone-950 shadow-[0_14px_40px_rgba(138,168,255,0.35)] transition-shadow hover:shadow-[0_18px_50px_rgba(138,168,255,0.50)]`}
                  >
                    <Target className="h-4 w-4" />
                    {t.takeQuiz}
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate("roadmaps", topRole || undefined)}
                    className={`inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-black ${softButton} shadow-sm`}
                  >
                    <Layers className={`h-4 w-4 ${accentIcon}`} />
                    {t.goToRoadmap}
                  </motion.button>
                </div>
              </div>
            </div>
          </section>

          {/* ── Right: Progress Card ── */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-[#8AA8FF]/30 bg-gradient-to-br from-[#fdf8f0] via-[#f5efe3] to-[#ede4d0] p-7 text-stone-900 shadow-xl shadow-amber-900/10 dark:border-[#8AA8FF]/20 dark:bg-gradient-to-br dark:from-stone-950 dark:via-zinc-900 dark:to-black dark:text-stone-50 dark:shadow-black/60"
          >
            {/* Animated background accents */}
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full blur-[100px] animate-[premiumPulse_6s_ease-in-out_infinite]"
              style={{backgroundColor: "rgba(var(--tp-rgb),0.2)"}} />
            <div className="absolute -bottom-24 left-0 h-52 w-52 rounded-full bg-white/5 blur-[100px]" />
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--tp)]/70 to-transparent" />
            
            <div className="relative flex h-full min-h-[300px] flex-col justify-between">
              <div>
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--tp)]/60">{t.learningIndex}</p>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="premium-text-gradient mt-3 text-7xl font-black tracking-tighter md:text-8xl"
                    >
                      {progressIndex}%
                    </motion.p>
                  </div>
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${topGradient} p-3 shadow-xl shadow-black/40 ring-1 ring-white/25`}
                  >
                    <Star className="h-8 w-8 text-white drop-shadow-lg" />
                  </motion.div>
                </div>

                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between text-xs font-bold text-stone-400">
                    <span>{t.topRole}</span>
                    <span className="text-[var(--tp)]">
                      {totalRoadmapSkills > 0
                        ? `${roadmapCompleted.size}/${totalRoadmapSkills} ${lang === "RU" ? "навыков" : "skills"}`
                        : latestMatch !== null ? `${latestMatch}% ${t.match}` : "Elite"}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressIndex}%` }}
                      transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${goldGradientWide} shadow-[0_0_20px_rgba(138,168,255,0.4)]`}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--tp)]/20 bg-white/[0.04] p-5 backdrop-blur-sm">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--tp)]/50">{t.topRole}</p>
                <p className="mt-1.5 truncate text-2xl font-black text-stone-50">{roleTitle(topRole, lang)}</p>
                <p className="mt-1 text-sm text-stone-400">
                  {totalRoadmapSkills > 0
                    ? `${progressIndex}% ${lang === "RU" ? "роадмап пройден" : "roadmap done"}`
                    : latestMatch !== null ? `${latestMatch}% ${t.bestMatch}` : "SkillPath Elite"}
                </p>
              </div>
            </div>
          </motion.section>
        </motion.div>

        {/* ═══════ Metrics Row ═══════ */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`${card} premium-card-highlight group relative overflow-hidden rounded-2xl p-5 cursor-default`}
            >
              <div className={`absolute -right-10 -top-12 h-28 w-28 rounded-full bg-gradient-to-br ${stat.gradient} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40`} />
              <div className="relative flex items-center gap-4">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg shadow-black/20 ring-1 ring-white/30 dark:ring-white/10 transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className="h-5 w-5 text-white drop-shadow" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-lg md:text-xl font-black text-stone-950 dark:text-stone-50">{stat.value}</p>
                  <p className="mt-0.5 text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══════ Main Split: Feed + Sidebar ═══════ */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
          {/* ── Left: Tabs Content ── */}
          <section className={`${card} overflow-hidden rounded-3xl`}>
            <div className="border-b border-stone-200/70 p-5 dark:border-white/[0.06]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-black text-stone-950 dark:text-stone-50">{activeTab === "overview" ? t.activityFeed : activeTab === "quizzes" ? t.quizzes : t.bookingsTab}</h2>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{activeTab === "overview" ? `${activities.length} ${t.totalActions}` : "SkillPath"}</p>
                </div>

                <div className="inline-grid grid-cols-4 rounded-xl border border-stone-200/70 bg-stone-100/60 p-1 dark:border-white/[0.06] dark:bg-white/[0.025]">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative rounded-lg px-4 py-2.5 text-sm font-black transition-all duration-300 ${
                        activeTab === tab.id
                          ? "text-stone-950 dark:text-stone-50"
                          : "text-stone-500 hover:text-stone-900 dark:text-stone-500 dark:hover:text-stone-200"
                      }`}
                    >
                      {activeTab === tab.id && (
                        <motion.span
                          layoutId="profile-split-tab"
                          className="absolute inset-0 rounded-lg bg-white shadow-[0_8px_24px_rgba(0,42,84,0.16)] ring-1 ring-stone-200/70 dark:bg-white/[0.10] dark:shadow-none dark:ring-white/[0.06]"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <span className="relative flex items-center justify-center gap-2">
                        <tab.icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 md:p-6">
              {loading ? (
                <div className="flex items-center justify-center gap-3 p-14 text-stone-500 dark:text-stone-400">
                  <Loader2 className={`h-6 w-6 animate-spin ${accentIcon}`} />
                  {t.loading}
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                      {activities.length === 0 ? (
                        <EmptyState icon={Activity} title={t.noActivity} hint={t.emptyHintQuiz} button={t.takeQuiz} onClick={() => onNavigate("quiz")} />
                      ) : (
                        <div className="relative space-y-3">
                          <div className="absolute bottom-6 left-[25px] top-6 w-px bg-gradient-to-b from-[var(--tp)]/50 via-stone-300/50 to-transparent dark:from-[var(--tp)]/40 dark:via-white/10" />
                          {activities.map((item, i) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05, duration: 0.4 }}
                              whileHover={{ x: 4, scale: 1.01 }}
                              className={`relative flex gap-4 rounded-xl p-4 transition-all duration-300 ${panel}`}
                            >
                              <div className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg shadow-black/15 ring-1 ring-white/30 dark:ring-white/10`}>
                                <item.icon className="h-5 w-5 text-white drop-shadow" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                  <div>
                                    <p className="font-black text-stone-950 dark:text-stone-50">{item.title}</p>
                                    <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">{item.subtitle}</p>
                                  </div>
                                  <span className="rounded-lg border border-stone-200/70 bg-white/70 px-3 py-1.5 text-xs font-bold text-stone-500 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-stone-400">
                                    {formatDate(item.date, lang)}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "quizzes" && (
                    <motion.div key="quizzes" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                      {quizHistory.length === 0 ? (
                        <EmptyState icon={Target} title={t.noQuizzes} hint={t.emptyHintQuiz} button={t.takeQuiz} onClick={() => onNavigate("quiz")} />
                      ) : (
                        <div className="space-y-3">
                          {quizHistory.map((quiz, i) => {
                            const g = roleGradients[quiz.top_role] || blackGradient;
                            const pct = getMatchPercent(quiz.scores);
                            return (
                              <motion.div
                                key={quiz.id || i}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -3, scale: 1.01 }}
                                className={`flex items-center gap-4 rounded-xl p-4 transition-all duration-300 ${panel}`}
                              >
                                <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${g} shadow-lg shadow-black/15 ring-1 ring-white/30 dark:ring-white/10`}>
                                  <Trophy className="h-6 w-6 text-white drop-shadow" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate font-black text-stone-950 dark:text-stone-50">{roleTitle(quiz.top_role, lang)}</p>
                                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
                                    <span>{quiz.quiz_type === "main" ? t.fullQuiz : t.miniQuiz}</span>
                                    <span className="h-1 w-1 rounded-full bg-stone-400/60" />
                                    <span>{formatDate(quiz.created_at, lang)}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className={`bg-gradient-to-r ${g} bg-clip-text text-3xl font-black text-transparent`}>{pct ?? "—"}%</p>
                                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">{t.match}</p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "bookings" && (
                    <motion.div key="bookings" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                      {bookings.length === 0 ? (
                        <EmptyState icon={Calendar} title={t.noBookings} hint={t.emptyHintBookings} button={t.findMentor} onClick={() => onNavigate("mentors")} />
                      ) : (
                        <div className="space-y-3">
                          {bookings.map((booking, i) => (
                            <motion.div
                              key={booking.id || i}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              whileHover={{ y: -2, scale: 1.01 }}
                              className={`flex flex-col gap-4 rounded-xl p-4 transition-all duration-300 ${panel} sm:flex-row sm:items-center`}
                            >
                              <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${blackGradient} shadow-lg shadow-black/25 ring-1 ring-white/20 dark:ring-white/10`}>
                                <Briefcase className="h-6 w-6 text-[var(--tp)]" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-black text-stone-950 dark:text-stone-50">
                                  {t.mentor} #{booking.mentor_id}
                                </p>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-medium text-stone-500 dark:text-stone-400">
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {booking.date}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    {booking.time}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 sm:flex-shrink-0">
                                <span className={`rounded-full border px-4 py-1.5 text-xs font-black ${statusColors[booking.status] || "border-stone-200 bg-stone-100 text-stone-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50"}`}>
                                  {booking.status === "pending" ? t.pending : booking.status === "confirmed" ? t.confirmed : t.cancelled}
                                </span>
                                {booking.status === "pending" && (
                                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleCancelBooking(booking.id)} className="text-xs font-black text-rose-600 transition-colors hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300">
                                    {t.cancel}
                                  </motion.button>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "courses" && (
                    <motion.div key="courses" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                      {(() => {
                        const courses = roadmapProgressData
                          .map(({ key, completed }) => {
                            const phases = roadmapPhases?.[key]?.phases;
                            const total = phases ? phases.flatMap((p: any) => p.skills).length : 0;
                            const done = completed.size;
                            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                            return { key, done, total, pct, hasStarted: done > 0 };
                          })
                          .sort((a, b) => {
                            if (a.hasStarted !== b.hasStarted) return a.hasStarted ? -1 : 1;
                            return b.pct - a.pct;
                          });

                        const started = courses.filter((c) => c.hasStarted);
                        const notStarted = courses.filter((c) => !c.hasStarted);

                        if (started.length === 0) {
                          return <EmptyState icon={BookOpen} title={t.noCourses} hint={t.emptyHintCourses} button={t.startCourse} onClick={() => onNavigate("roadmaps")} />;
                        }

                        return (
                          <div className="space-y-6">
                            {started.length > 0 && (
                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3">{t.inProgress} ({started.length})</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {started.map((course, i) => {
                                    const Icon = roadmapIconMap[course.key] || BookOpen;
                                    const colorClass = roadmapColorMap[course.key] || "cyan";
                                    const title = roadmapTitleMap[course.key]?.[lang] || course.key;
                                    const isComplete = course.pct === 100;
                                    return (
                                      <motion.button
                                        key={course.key}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        whileHover={{ y: -3, scale: 1.01 }}
                                        onClick={() => onNavigate("roadmaps", course.key)}
                                        className={`text-left rounded-2xl border-2 p-4 transition-all duration-200 ${
                                          isComplete
                                            ? "border-green-500/40 bg-green-500/5"
                                            : `border-[var(--tp)]/30 bg-white/60 dark:bg-white/[0.03] hover:border-[var(--tp)]/50`
                                        }`}
                                      >
                                        <div className="flex items-center gap-3 mb-3">
                                          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${goldGradient} shadow-md`}>
                                            <Icon className="h-5 w-5 text-white" />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <p className="font-black text-sm text-stone-900 dark:text-white truncate">{title}</p>
                                            <p className="text-xs text-stone-500 dark:text-stone-400">{course.done}/{course.total} {t.skillsDone}</p>
                                          </div>
                                          {isComplete ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                          ) : (
                                            <span className="text-lg font-black text-[var(--tp)]">{course.pct}%</span>
                                          )}
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${course.pct}%` }}
                                            transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                                            className={`h-full rounded-full ${isComplete ? "bg-green-500" : `bg-gradient-to-r ${goldGradient}`}`}
                                          />
                                        </div>
                                      </motion.button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {notStarted.length > 0 && (
                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3">{t.notStarted} ({notStarted.length})</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {notStarted.map((course, i) => {
                                    const Icon = roadmapIconMap[course.key] || BookOpen;
                                    const title = roadmapTitleMap[course.key]?.[lang] || course.key;
                                    return (
                                      <motion.button
                                        key={course.key}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + i * 0.03 }}
                                        whileHover={{ y: -2, scale: 1.01 }}
                                        onClick={() => onNavigate("roadmaps", course.key)}
                                        className="text-left rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4 transition-all duration-200 hover:border-black/10 dark:hover:border-white/20 opacity-60 hover:opacity-100"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-stone-100 dark:bg-white/5">
                                            <Icon className="h-5 w-5 text-stone-400 dark:text-stone-500" />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <p className="font-bold text-sm text-stone-600 dark:text-stone-400 truncate">{title}</p>
                                            <p className="text-xs text-stone-400 dark:text-stone-500">0/{course.total} {t.skillsDone}</p>
                                          </div>
                                          <ArrowRight className="h-4 w-4 text-stone-300 dark:text-stone-600 flex-shrink-0" />
                                        </div>
                                      </motion.button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </section>

          {/* ── Right: Sidebar ── */}
          <aside className="space-y-6">
            <StudyCalendar heatmap={heatmap} lang={lang} t={t} />

            <section className={`${card} rounded-3xl p-6`}>
              <div className="mb-5 flex items-center gap-2.5">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${goldGradient} shadow-md`}>
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-black text-stone-950 dark:text-stone-50">{t.nextStep}</h3>
              </div>
              <div className="space-y-3">
                <ActionButton icon={Target} label={t.takeQuiz} primary onClick={() => onNavigate("quiz")} />
                <ActionButton icon={BookOpen} label={t.goToRoadmap} onClick={() => onNavigate("roadmaps", topRole || undefined)} />
                <ActionButton icon={MessageCircle} label={t.findMentor} onClick={() => onNavigate("mentors")} />
              </div>
            </section>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-rose-300/60 bg-gradient-to-r from-rose-50/80 to-rose-100/60 p-4 text-sm font-black text-rose-600 shadow-sm transition-all hover:border-rose-400/70 hover:from-rose-100/80 hover:to-rose-200/60 hover:shadow-md hover:shadow-rose-500/10 dark:border-rose-400/20 dark:from-rose-400/[0.05] dark:to-rose-400/[0.08] dark:text-rose-400 dark:hover:border-rose-400/35 dark:hover:from-rose-400/10 dark:hover:to-rose-400/15"
            >
              <LogOut className="h-4 w-4" />
              {t.logout}
            </motion.button>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

const Badge = ({ icon: Icon, children }: { icon: any; children: any }) => (
  <span className="inline-flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white/70 px-3.5 py-2 font-medium text-stone-600 shadow-sm backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-stone-300">
    <Icon className={`h-4 w-4 ${accentIcon}`} />
    {children}
  </span>
);

const ActionButton = ({ icon: Icon, label, onClick, primary = false }: { icon: any; label: string; onClick: () => void; primary?: boolean }) => (
  <motion.button
    whileHover={{ y: -2, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`group flex w-full items-center gap-3.5 rounded-xl p-4 text-left text-sm font-black transition-all duration-300 ${
      primary
        ? `bg-gradient-to-r ${goldGradientWide} text-stone-950 shadow-lg shadow-[var(--tp)]/25 hover:shadow-xl hover:shadow-[var(--tp)]/40`
        : softButton
    }`}
  >
    <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${primary ? "bg-white/40 shadow-sm" : "bg-stone-100 dark:bg-white/[0.05]"}`}>
      <Icon className="h-4 w-4" />
    </span>
    <span className="flex-1">{label}</span>
    <ChevronRight className="h-4 w-4 opacity-40 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-80" />
  </motion.button>
);

const StudyCalendar = ({ heatmap, lang, t }: { heatmap: any; lang: "EN" | "RU"; t: any }) => {
  const monthLabels = useMemo(() => {
    const labels: { label: string; index: number }[] = [];
    let last = "";

    heatmap.weeks.forEach((week: any[], index: number) => {
      const firstDay = week[0]?.date;
      if (!firstDay) return;
      const month = firstDay.toLocaleDateString(lang === "RU" ? "ru-RU" : "en-US", { month: "short" });
      if (month !== last) {
        labels.push({ label: month.replace(".", ""), index });
        last = month;
      }
    });

    return labels;
  }, [heatmap.weeks, lang]);

  return (
    <section className={`${card} rounded-3xl p-6`}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${goldGradient} shadow-md`}>
              <Flame className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-black text-stone-950 dark:text-stone-50">{t.studyCalendar}</h3>
          </div>
          <p className="mt-1.5 text-xs font-medium text-stone-500 dark:text-stone-400">{t.lastWeeks}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-stone-950 dark:text-stone-50">{heatmap.activeDays}</p>
          <p className="text-[10px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">{t.activeDays}</p>
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="min-w-[330px]">
          <div className="relative mb-2 h-4">
            {monthLabels.map((m) => (
              <span
                key={`${m.label}-${m.index}`}
                className="absolute text-[10px] font-bold text-stone-400 dark:text-stone-500"
                style={{ left: `${m.index * 22}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-1.5">
            {heatmap.weeks.map((week: any[], wi: number) => (
              <div key={wi} className="grid grid-rows-7 gap-1.5">
                {week.map((day) => (
                  <div
                    key={day.key}
                    title={`${formatDate(day.date, lang)}: ${day.count}`}
                    className={`premium-heatmap-glow h-4 w-4 rounded-[5px] border transition-all duration-300 ${getStudyIntensityClass(day.count)}`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-stone-500 dark:text-stone-400">
              <CheckCircle2 className={`h-3.5 w-3.5 ${accentIcon}`} />
              {heatmap.totalActions} {t.totalActions}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 dark:text-stone-500">
              <span>{t.less}</span>
              {[0, 1, 2, 3, 4].map((v) => (
                <span key={v} className={`h-3 w-3 rounded-[4px] border ${getStudyIntensityClass(v)}`} />
              ))}
              <span>{t.more}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EmptyState = ({
  icon: Icon,
  title,
  hint,
  button,
  onClick,
}: {
  icon: any;
  title: string;
  hint: string;
  button: string;
  onClick: () => void;
}) => (
  <div className={`rounded-2xl p-12 text-center md:p-14 ${panel}`}>
    <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--tp)]/50 bg-gradient-to-br from-[var(--tp)]/30 to-[var(--tp-dark)]/20 dark:border-[var(--tp)]/25 dark:from-[var(--tp)]/10 dark:to-[var(--tp-dark)]/8">
      <div className="absolute inset-0 rounded-2xl bg-[var(--tp)]/25 blur-2xl" />
      <Icon className={`relative h-10 w-10 ${accentIcon}`} />
    </div>
    <h3 className="text-xl font-black text-stone-950 dark:text-stone-50">{title}</h3>
    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-500 dark:text-stone-400">{hint}</p>
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${goldGradientWide} px-7 py-3.5 text-sm font-black text-stone-950 shadow-lg shadow-[var(--tp)]/30 transition-shadow hover:shadow-xl hover:shadow-[var(--tp)]/45`}
    >
      {button}
      <ChevronRight className="h-4 w-4" />
    </motion.button>
  </div>
);
