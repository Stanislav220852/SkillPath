import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, X, CheckCircle2, BookOpen, Zap, ArrowRight,
  Terminal, Cpu, ShieldAlert, Database, Play, Search,
  Clock, RotateCcw, Users, Filter,
  Server, Smartphone, Settings, Gamepad2,
  ClipboardCheck, Award, Lock
} from 'lucide-react';
import { lessonData } from './LessonData.tsx';
import { useRoadmapProgress, useProgressVersion, getProgressPercent } from '../utils/useRoadmapProgress';
import { AchievementToast } from '../utils/AchievementToast';
import { PhaseExam } from './PhaseExam';
import { FinalExam } from './FinalExam';

const glassCard = "bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-[2rem] shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]";

const tagColors: Record<string, string> = {
  "Must": "bg-[var(--tp)]/10 text-[var(--tp-dark)] dark:text-[var(--tp)] border-[var(--tp)]/20",
  "Core": "bg-[var(--ta)]/10 text-[var(--tp-dark)] dark:text-[var(--ta)] border-[var(--ta)]/20",
  "Pro":  "bg-[var(--ta)]/10 text-[var(--tp-dark)] dark:text-[var(--ta)] border-[var(--ta)]/20",
};

const colorBorder: Record<string, string> = { 
  cyan: "border-[var(--tp)]", pink: "border-[var(--tp)]", purple: "border-[var(--tp)]", blue: "border-[var(--tp)]",
  emerald: "border-[var(--tp)]", amber: "border-[var(--tp)]", orange: "border-[var(--tp)]", rose: "border-[var(--tp)]"
};

const colorBg: Record<string, string> = { 
  cyan: "bg-[var(--tp)]", pink: "bg-[var(--tp)]", purple: "bg-[var(--tp)]", blue: "bg-[var(--tp)]",
  emerald: "bg-[var(--tp)]", amber: "bg-[var(--tp)]", orange: "bg-[var(--tp)]", rose: "bg-[var(--tp)]"
};

const colorText: Record<string, string> = { 
  cyan: "text-[var(--tp-dark)] dark:text-[var(--tp)]", pink: "text-[var(--tp-dark)] dark:text-[var(--tp)]", 
  purple: "text-[var(--tp-dark)] dark:text-[var(--tp)]", blue: "text-[var(--tp-dark)] dark:text-[var(--tp)]",
  emerald: "text-[var(--tp-dark)] dark:text-[var(--tp)]", amber: "text-[var(--tp-dark)] dark:text-[var(--tp)]", 
  orange: "text-[var(--tp-dark)] dark:text-[var(--tp)]", rose: "text-[var(--tp-dark)] dark:text-[var(--tp)]"
};

const colorGlow: Record<string, string> = { 
  cyan: "shadow-[0_0_20px_rgba(var(--tp-rgb),0.4)]", pink: "shadow-[0_0_20px_rgba(var(--tp-rgb),0.4)]", 
  purple: "shadow-[0_0_20px_rgba(var(--tp-rgb),0.4)]", blue: "shadow-[0_0_20px_rgba(var(--tp-rgb),0.4)]",
  emerald: "shadow-[0_0_20px_rgba(var(--tp-rgb),0.4)]", amber: "shadow-[0_0_20px_rgba(var(--tp-rgb),0.4)]",
  orange: "shadow-[0_0_20px_rgba(var(--tp-rgb),0.4)]", rose: "shadow-[0_0_20px_rgba(var(--tp-rgb),0.4)]"
};

const colorGradient: Record<string, string> = { 
  cyan: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", pink: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", 
  purple: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", blue: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]",
  emerald: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", amber: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]",
  orange: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]", rose: "from-[var(--tp)] via-[var(--tp-dark)] to-[var(--ta)]"
};

const iconMap: Record<string, any> = {
  frontend: Terminal,
  ai: Cpu,
  cybersec: ShieldAlert,
  datascience: Database,
  // 🆕
  backend: Server,
  mobile: Smartphone,
  devops: Settings,
  gamedev: Gamepad2,
};

const skillIdToLessonKey: Record<string, string> = {
   "html-css": "html-css", "js-core": "js-core", "react": "react", "typescript": "typescript",
  "python": "python", "math": "math", "sklearn": "sklearn", "dl": "dl","math-ml":"math-ml",
  "nlp": "nlp", "mlops": "mlops", "networking": "networking", "linux": "linux",
  "pentest": "pentest", "webapp": "webapp", "siem": "siem", "certs": "certs",
  "python-ds": "python-ds", "sql": "sql", "eda": "eda", "stats": "stats",
  "ml-ds": "ml-ds", "bi": "bi", "bigdata": "bigdata",
  "state": "state", "testing": "testing", "deploy": "deploy",
  "node": "node", "db-basics": "db-basics", "auth": "auth", "apis": "apis", "docker": "docker", "cloud": "cloud",
  // 🆕 mobile
  "rn-basics": "rn-basics", "mobile-ui": "mobile-ui", "native-api": "native-api", "state-mobile": "state-mobile", "appstore": "appstore", "perf-mobile": "perf-mobile",
  // 🆕 devops
  "linux-devops": "linux-devops", "git-devops": "git-devops", "k8s": "k8s", "terraform": "terraform", "monitoring": "monitoring", "aws-devops": "aws-devops",
  // 🆕 gamedev
  "csharp": "csharp", "game-math": "game-math", "2d-games": "2d-games", "3d-games": "3d-games", "shaders": "shaders", "multiplayer": "multiplayer",
};

// helper: парсит "4 wks" / "4 нед." / "Ongoing" → число недель
const parseWeeks = (duration: string): number => {
  const m = duration.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
};

// === ROADMAP PANEL ===
const RoadmapPanel = ({ roadmap, roadmapKey, onClose, t, onStartLearning, lang, onStartExam }: any) => {
  const { completed, toggle, reset } = useRoadmapProgress(roadmapKey);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "Must" | "Core" | "Pro">("all");
  const [search, setSearch] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [toast, setToast] = useState<{ msg: string; sub?: string } | null>(null);

  const allSkills = useMemo(() => roadmap.phases.flatMap((p: any) => p.skills), [roadmap]);
  const progress = allSkills.length > 0 ? Math.round((completed.size / allSkills.length) * 100) : 0;
  const totalWeeks = useMemo(
    () => allSkills.reduce((sum: number, s: any) => sum + parseWeeks(s.duration), 0),
    [allSkills]
  );

  // фильтрация фаз
  const filteredPhases = useMemo(() => {
    return roadmap.phases.map((phase: any) => ({
      ...phase,
      skills: phase.skills.filter((s: any) => {
        const matchesFilter = filter === "all" || s.tag === filter;
        const matchesSearch = !search ||
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.description.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
      }),
    })).filter((phase: any) => phase.skills.length > 0);
  }, [roadmap, filter, search]);

  // следующий незавершённый
  const nextSkill = allSkills.find((s: any) => !completed.has(s.id));

  // toast при завершении фазы или роадмапа
  const handleToggle = (skillId: string) => {
    const wasCompleted = completed.has(skillId);
    toggle(skillId);

    if (!wasCompleted) {
      // проверяем после toggle
      setTimeout(() => {
        const newCompleted = new Set(completed);
        newCompleted.add(skillId);

        if (newCompleted.size === allSkills.length) {
          setToast({ msg: t.roadmaps.toastRoadmap, sub: roadmap.title });
        } else {
          for (const phase of roadmap.phases) {
            const phaseIds = phase.skills.map((s: any) => s.id);
            const allPhaseDone = phaseIds.every((id: string) => newCompleted.has(id));
            const wasAllPhaseDone = phaseIds.every((id: string) => completed.has(id));
            if (allPhaseDone && !wasAllPhaseDone) {
              setToast({ msg: t.roadmaps.toastPhase, sub: phase.phase });
              break;
            }
          }
        }
      }, 50);
    }
  };

  const continueLearning = () => {
    if (nextSkill) {
      setActiveSkill(nextSkill.id);
      setTimeout(() => {
        document.getElementById(`skill-${nextSkill.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  // авто-закрытие тоста
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // фейковый счётчик "learning now"
  const learningNow = useMemo(() => 80 + Math.floor(Math.random() * 220), [roadmapKey]);

  if (!roadmap) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-8 px-4 bg-black/60 backdrop-blur-sm"
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-4xl relative"
          onClick={e => e.stopPropagation()}
        >
          <div className={`${glassCard} overflow-hidden`}>
            {/* HEADER */}
            <div className="p-8 pb-6 border-b border-black/5 dark:border-white/10 relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 ${colorBg[roadmap.colorClass]}`} />
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${colorText[roadmap.colorClass]}`}>
                    {t.roadmaps.interactiveLabel}
                  </div>
                  <h2 className="text-3xl font-black text-stone-900 dark:text-white mb-1">{roadmap.title}</h2>
                  <p className="text-stone-500 dark:text-white/50 text-sm">{t.roadmaps.interactiveDesc}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-stone-600 dark:text-white/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Live + Time stats */}
              <div className="flex flex-wrap items-center gap-4 mb-5 text-xs">
                <div className="flex items-center gap-1.5 text-stone-600 dark:text-white/60">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="font-bold">{learningNow}</span> {t.roadmaps.learningNow}
                </div>
                <div className="flex items-center gap-1.5 text-stone-600 dark:text-white/60">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-bold">{totalWeeks}</span> {t.roadmaps.weeks}
                  <span className="text-stone-400">·</span>
                  <span>~{Math.ceil((totalWeeks * hoursPerWeek) / 4)} h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="range" min={3} max={40} value={hoursPerWeek}
                    onChange={e => setHoursPerWeek(parseInt(e.target.value))}
                    className="w-20 accent-[var(--tp)]"
                  />
                  <span className="font-bold text-stone-700 dark:text-white/70">{hoursPerWeek} {t.roadmaps.hoursPerWeek}</span>
                </div>
              </div>

              {/* Filters + Search */}
              <div className="flex flex-wrap gap-2 mb-5">
                {(["all", "Must", "Core", "Pro"] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all
                      ${filter === f
                        ? `${colorBg[roadmap.colorClass]} text-white border-transparent`
                        : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-stone-600 dark:text-white/60 hover:bg-black/10"
                      }`}
                  >
                    {f === "all" ? t.roadmaps.filters.all
                      : f === "Must" ? t.roadmaps.filters.must
                      : f === "Core" ? t.roadmaps.filters.core
                      : t.roadmaps.filters.pro}
                  </button>
                ))}
                <div className="flex-1 min-w-[180px] relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder={t.roadmaps.searchPlaceholder}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-stone-700 dark:text-white/80 placeholder:text-stone-400 focus:outline-none focus:border-[var(--tp)]"
                  />
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-stone-500 dark:text-white/50">{t.roadmaps.progress}</span>
                  <div className="flex items-center gap-3">
                    {completed.size > 0 && (
                      <button
                        onClick={reset}
                        className="flex items-center gap-1 text-xs text-stone-400 hover:text-red-500 transition-colors"
                        title={t.roadmaps.reset}
                      >
                        <RotateCcw className="w-3 h-3" /> {t.roadmaps.reset}
                      </button>
                    )}
                    <span className={`text-xs font-black ${colorText[roadmap.colorClass]}`}>
                      {progress}{t.roadmaps.progressDone}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`h-full rounded-full ${colorBg[roadmap.colorClass]} ${progress > 0 ? colorGlow[roadmap.colorClass] : ""}`}
                  />
                </div>
              </div>

              {/* Continue button */}
              {nextSkill && progress < 100 && (
                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={continueLearning}
                  className={`mt-5 w-full p-3 rounded-2xl bg-gradient-to-r ${colorGradient[roadmap.colorClass]} text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity ${colorGlow[roadmap.colorClass]}`}
                >
                  {t.roadmaps.continueBtn}: {nextSkill.title}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            {/* PHASES */}
            <div className="p-8 space-y-10">
              {filteredPhases.length === 0 && (
                <div className="text-center py-12 text-stone-400 dark:text-white/40">
                  <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>{t.roadmaps.nothingFound}</p>
                </div>
              )}

              {filteredPhases.map((phase: any, phaseIdx: number) => (
                <div key={phase.phase}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white ${colorBg[roadmap.colorClass]} ${colorGlow[roadmap.colorClass]}`}>
                      {phaseIdx + 1}
                    </div>
                    <h3 className="text-lg font-black text-stone-900 dark:text-white tracking-tight">{phase.phase}</h3>
                    <div className={`flex-1 h-px ${colorBorder[roadmap.colorClass]} border-t border-dashed opacity-30`} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 ml-10">
                    {phase.skills.map((skill: any, skillIdx: number) => {
                      const isActive = activeSkill === skill.id;
                      const isDone = completed.has(skill.id);
                      const lessonKey = skillIdToLessonKey[skill.id];
                      const hasLesson = lessonKey && lessonData[lessonKey] && lessonData[lessonKey][lang];
                      return (
                        <div key={skill.id} id={`skill-${skill.id}`}>
                          <motion.button
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: phaseIdx * 0.05 + skillIdx * 0.03 }}
                            onClick={() => setActiveSkill(isActive ? null : skill.id)}
                            className={`w-full text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden
                              ${isActive
                                ? `${colorBorder[roadmap.colorClass]} bg-white/80 dark:bg-white/5`
                                : isDone
                                  ? "border-green-500/40 bg-green-500/5"
                                  : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-black/20 dark:hover:border-white/20"
                              }`}
                          >
                            <div className="p-4 flex items-center gap-3">
                              <button
                                onClick={e => { e.stopPropagation(); handleToggle(skill.id); }}
                                className={`w-8 h-8 rounded-full flex-shrink-0 border-2 flex items-center justify-center transition-all
                                  ${isDone
                                    ? "bg-green-500 border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]"
                                    : "border-slate-300 dark:border-white/30 hover:border-green-500"
                                  }`}
                              >
                                <CheckCircle2 className={`w-4 h-4 ${isDone ? "text-white" : "text-stone-400 dark:text-white/30"}`} />
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`font-bold text-sm ${isDone ? "line-through text-stone-400 dark:text-white/40" : "text-stone-900 dark:text-white"}`}>
                                    {skill.title}
                                  </span>
                                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${tagColors[skill.tag]}`}>
                                    {skill.tag}
                                  </span>
                                </div>
                                <span className="text-xs text-stone-500 dark:text-white/40">{skill.duration}</span>
                              </div>
                              <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? "rotate-90" : ""} ${colorText[roadmap.colorClass]}`} />
                            </div>

                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pt-0 border-t border-black/5 dark:border-white/10 space-y-3">
                                    <p className="text-sm text-stone-600 dark:text-white/60 leading-relaxed pt-3">
                                      {skill.description}
                                    </p>
                                    <div>
                                      <div className="flex items-center gap-1.5 mb-2">
                                        <BookOpen className={`w-3.5 h-3.5 ${colorText[roadmap.colorClass]}`} />
                                        <span className="text-xs font-bold text-stone-700 dark:text-white/70 uppercase tracking-wider">{t.roadmaps.resources}</span>
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {skill.resources.map((r: string) => (
                                          <span key={r} className="text-xs px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-stone-700 dark:text-white/60 font-medium">
                                            {r}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={e => { e.stopPropagation(); handleToggle(skill.id); }}
                                        className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${isDone ? "text-green-500" : colorText[roadmap.colorClass]}`}
                                      >
                                        <Zap className="w-3.5 h-3.5" />
                                        {isDone ? t.roadmaps.markNotDone : t.roadmaps.markDone}
                                      </button>
                                      {hasLesson && (
                                        <button
                                          onClick={e => { e.stopPropagation(); onStartLearning(skill.id, roadmap.title, roadmap.colorClass); }}
                                          className={`flex items-center gap-1.5 text-xs font-bold transition-colors text-white bg-gradient-to-r ${colorGradient[roadmap.colorClass]} px-3 py-1 rounded-full hover:opacity-90`}
                                        >
                                          <Play className="w-3 h-3" />
                                          {t.roadmaps.startLearning || 'Start'}
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Phase Exam Button */}
                  {(() => {
                    const phaseSkills = phase.skills.map((s: any) => s.id);
                    const phaseCompleted = phaseSkills.every((id: string) => completed.has(id));
                    const phasePartial = phaseSkills.some((id: string) => completed.has(id));
                    return (
                      <div className="ml-10 mt-4">
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: phaseIdx * 0.1 + 0.3 }}
                          onClick={() => phaseCompleted && onStartExam?.(`phase-${roadmapKey}-${phaseIdx}`, phase.phase, roadmap.colorClass, 'phase')}
                          disabled={!phaseCompleted}
                          className={`w-full p-4 rounded-2xl border-2 border-dashed transition-all duration-200 flex items-center gap-4
                            ${phaseCompleted
                              ? `border-green-500/40 bg-green-500/5 hover:bg-green-500/10 cursor-pointer`
                              : "border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/3 opacity-50 cursor-not-allowed"
                            }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                            ${phaseCompleted
                              ? "bg-green-500/10"
                              : "bg-stone-100 dark:bg-white/5"
                            }`}>
                            {phaseCompleted ? (
                              <ClipboardCheck className="w-6 h-6 text-green-500" />
                            ) : (
                              <Lock className="w-5 h-5 text-stone-400 dark:text-white/30" />
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <p className={`text-sm font-bold ${phaseCompleted ? "text-green-600 dark:text-green-400" : "text-stone-400 dark:text-white/30"}`}>
                              {lang === 'RU' ? `Зачёт: ${phase.phase}` : `Exam: ${phase.phase}`}
                            </p>
                            <p className="text-xs text-stone-500 dark:text-white/40">
                              {phaseCompleted
                                ? (lang === 'RU' ? 'Готово! Нажмите чтобы сдать' : 'Done! Click to take exam')
                                : (lang === 'RU' ? `Пройдите все ${phaseSkills.length} навыков чтобы разблокировать` : `Complete all ${phaseSkills.length} skills to unlock`)
                              }
                            </p>
                          </div>
                          <div className={`px-3 py-1.5 rounded-full text-xs font-bold
                            ${phaseCompleted
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-stone-100 dark:bg-white/5 text-stone-400 dark:text-white/30"
                            }`}>
                            {phaseCompleted
                              ? (lang === 'RU' ? 'Открыт' : 'Unlocked')
                              : `${phaseSkills.filter((id: string) => completed.has(id)).length}/${phaseSkills.length}`
                            }
                          </div>
                        </motion.button>
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>

            {/* FINAL EXAM */}
            <div className="p-8 pt-0">
              {(() => {
                const allDone = allSkills.every((s: any) => completed.has(s.id));
                const partial = allSkills.some((s: any) => completed.has(s.id));
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200
                      ${allDone
                        ? "border-[var(--ta)]/40 bg-gradient-to-r from-[var(--ta)]/5 to-[var(--tp)]/5"
                        : "border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/3"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
                        ${allDone
                          ? "bg-gradient-to-br from-[var(--tp)] to-[var(--ta)]"
                          : "bg-[var(--tp)]/10"
                        }`}>
                        {allDone ? (
                          <Award className="w-7 h-7 text-white" />
                        ) : !partial ? (
                          <Lock className={`w-7 h-7 ${colorText[roadmap.colorClass]}`} />
                        ) : (
                          <Award className={`w-7 h-7 ${colorText[roadmap.colorClass]}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-black ${allDone ? "text-[var(--ta)]" : "text-stone-900 dark:text-white"}`}>
                          {lang === 'RU' ? '🎯 Финальный экзамен' : '🎯 Final Exam'}
                        </h3>
                        <p className="text-sm text-stone-500 dark:text-white/50">
                          {allDone
                            ? (lang === 'RU' ? 'Ты готов! Покажи что знаешь профессию.' : 'You\'re ready! Show your professional knowledge.')
                            : !partial
                              ? (lang === 'RU' ? 'Пройди уроки чтобы разблокировать экзамен.' : 'Complete lessons to unlock the exam.')
                              : (lang === 'RU' ? `${completed.size}/${allSkills.length} навыков пройдено` : `${completed.size}/${allSkills.length} skills done`)
                          }
                        </p>
                      </div>
                      <button
                        onClick={() => allDone && onStartExam?.(`final-${roadmapKey}`, roadmap.title, roadmap.colorClass, 'final')}
                        disabled={!allDone}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all
                          ${allDone
                            ? `bg-gradient-to-r ${colorGradient[roadmap.colorClass]} text-white shadow-lg ${colorGlow[roadmap.colorClass]} hover:opacity-90 cursor-pointer`
                            : "bg-stone-100 dark:bg-white/5 text-stone-400 dark:text-white/30 cursor-not-allowed opacity-50"
                          }`}
                      >
                        {allDone
                          ? (lang === 'RU' ? 'Сдать экзамен' : 'Take Exam')
                          : (lang === 'RU' ? 'Заблокировано' : 'Locked')
                        }
                      </button>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AchievementToast
        message={toast?.msg || null}
        subtitle={toast?.sub}
        onClose={() => setToast(null)}
      />
    </>
  );
};

// === ROADMAP CARD with progress ===
const RoadmapCard = ({ icon: Icon, title, desc, colorClass, roadmapKey, onViewRoadmap, viewBtnText, t, phasesData }: any) => {
  useProgressVersion(); // подписка на обновления прогресса
  const totalSkills = phasesData?.phases?.flatMap((p: any) => p.skills).length || 0;
  const progress = getProgressPercent(roadmapKey, totalSkills);
  const isStarted = progress > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={`${glassCard} p-8 text-center cursor-pointer group relative overflow-hidden flex flex-col`}
    >
      <div className={`absolute inset-0 bg-gradient-to-b from-${colorClass}-500/0 via-${colorClass}-500/0 to-${colorClass}-500/5 dark:to-${colorClass}-500/10 opacity-0 group-hover:opacity-100 transition-opacity`} />

      {/* Progress badge top-right */}
      {isStarted && (
        <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-black ${colorBg[colorClass]} text-white shadow-lg ${colorGlow[colorClass]}`}>
          {progress}%
        </div>
      )}

      <div className={`w-16 h-16 rounded-2xl bg-${colorClass}-500/10 flex items-center justify-center mb-6 border border-${colorClass}-500/20 relative z-10 mx-auto`}>
        <Icon className={`w-8 h-8 text-${colorClass}-500 dark:text-${colorClass}-400`} />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-stone-900 dark:text-white relative z-10">{title}</h3>
      <p className="text-stone-600 dark:text-white/60 text-sm leading-relaxed mb-4 relative z-10 min-h-[60px]">
        {desc}
      </p>

      {/* Mini progress bar */}
      {isStarted && (
        <div className="mb-4 px-2 relative z-10">
          <div className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-full ${colorBg[colorClass]} rounded-full`}
            />
          </div>
          <p className="text-[10px] text-stone-500 dark:text-white/40 mt-1 uppercase tracking-widest font-bold">
            {progress}% {t.roadmaps.cardProgressLabel}
          </p>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewRoadmap(roadmapKey)}
        className={`mt-auto text-sm font-bold flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full bg-gradient-to-r ${colorGradient[colorClass]} text-white shadow-lg ${colorGlow[colorClass]} hover:opacity-90 transition-all relative z-10`}
      >
        <span>{isStarted ? t.roadmaps.continueBtn : viewBtnText}</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

// === MAIN PAGE ===
export const RoadmapsPage = ({ t, initialRoadmap, onOpenRoadmap, lang }: any) => {
  const [openRoadmap, setOpenRoadmap] = useState(initialRoadmap || null);
  const [activeExam, setActiveExam] = useState<{ id: string; name: string; colorClass: string; type: 'phase' | 'final' } | null>(null);

  useEffect(() => {
    setOpenRoadmap(initialRoadmap || null);
  }, [initialRoadmap]);

  const openRoadmapData = openRoadmap ? t.roadmaps.phases[openRoadmap] : null;

  const closeRoadmap = () => {
    setOpenRoadmap(null);
    if (onOpenRoadmap) onOpenRoadmap(null);
  };

  // Close on Escape key
  useEffect(() => {
    if (!openRoadmap) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeRoadmap(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openRoadmap]);

  const handleViewRoadmap = (key: string) => {
    setOpenRoadmap(key);
    if (onOpenRoadmap) onOpenRoadmap(key);
  };

  const handleStartExam = (examId: string, name: string, colorClass: string, type: 'phase' | 'final') => {
    setActiveExam({ id: examId, name, colorClass, type });
  };

  // If an exam is active, show it
  if (activeExam) {
    if (activeExam.type === 'phase') {
      const parts = activeExam.id.split('-');
      const phaseIdx = parseInt(parts[parts.length - 1]);
      const roadmapKey = parts.slice(1, -1).join('-');
      return (
        <PhaseExam
          roadmapKey={roadmapKey}
          phaseIdx={phaseIdx}
          colorClass={activeExam.colorClass}
          onBack={() => setActiveExam(null)}
          lang={lang}
        />
      );
    } else {
      const roadmapKey = activeExam.id.replace('final-', '');
      return (
        <FinalExam
          roadmapKey={roadmapKey}
          colorClass={activeExam.colorClass}
          onBack={() => setActiveExam(null)}
          lang={lang}
        />
      );
    }
  }

  return (
    <section className="min-h-screen py-32 relative">

      <AnimatePresence>
        {openRoadmapData && (
          <RoadmapPanel
            roadmap={openRoadmapData}
            roadmapKey={openRoadmap}
            onClose={closeRoadmap}
            t={t}
            lang={lang}
            onStartLearning={(skillId: string) => {
              if (onOpenRoadmap) onOpenRoadmap(`learn:${skillId}`);
            }}
            onStartExam={handleStartExam}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 text-stone-900 dark:text-white">
            {t.roadmaps.title}{" "}
            <span className="text-[var(--tp)]">
              {t.roadmaps.titleSuffix}
            </span>
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            {t.roadmaps.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.roadmaps.cards.map((card: any, i: number) => {
            const Icon = iconMap[card.roadmapKey];
            return (
              <RoadmapCard
                key={i}
                icon={Icon}
                title={card.title}
                desc={card.desc}
                colorClass={card.colorClass}
                roadmapKey={card.roadmapKey}
                onViewRoadmap={handleViewRoadmap}
                viewBtnText={t.roadmaps.viewBtn}
                t={t}
                phasesData={t.roadmaps.phases[card.roadmapKey]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};