import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, X, CheckCircle2, BookOpen, Zap, ArrowRight,
  Terminal, Cpu, ShieldAlert, Database, Play, Search,
  Clock, RotateCcw, Users, Filter,
  Server, Smartphone, Settings, Gamepad2  // 🆕 добавь эти 4 иконки
} from 'lucide-react';
import { lessonData } from './LessonData.tsx';
import { useRoadmapProgress, useProgressVersion, getProgressPercent } from '../utils/useRoadmapProgress';
import { AchievementToast } from '../utils/AchievementToast';

const glassCard = "bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-[2rem] shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]";

const tagColors: Record<string, string> = {
  "Must": "bg-[#8AA8FF]/10 text-[#002A54] dark:text-[#8AA8FF] border-[#8AA8FF]/20",
  "Core": "bg-[#FF9800]/10 text-[#002A54] dark:text-[#FF9800] border-[#FF9800]/20",
  "Pro":  "bg-[#FF9800]/10 text-[#002A54] dark:text-[#FF9800] border-[#FF9800]/20",
};

const colorBorder: Record<string, string> = { 
  cyan: "border-[#8AA8FF]", pink: "border-[#8AA8FF]", purple: "border-[#8AA8FF]", blue: "border-[#8AA8FF]",
  emerald: "border-[#8AA8FF]", amber: "border-[#8AA8FF]", orange: "border-[#8AA8FF]", rose: "border-[#8AA8FF]"
};

const colorBg: Record<string, string> = { 
  cyan: "bg-[#8AA8FF]", pink: "bg-[#8AA8FF]", purple: "bg-[#8AA8FF]", blue: "bg-[#8AA8FF]",
  emerald: "bg-[#8AA8FF]", amber: "bg-[#8AA8FF]", orange: "bg-[#8AA8FF]", rose: "bg-[#8AA8FF]"
};

const colorText: Record<string, string> = { 
  cyan: "text-[#002A54] dark:text-[#8AA8FF]", pink: "text-[#002A54] dark:text-[#8AA8FF]", 
  purple: "text-[#002A54] dark:text-[#8AA8FF]", blue: "text-[#002A54] dark:text-[#8AA8FF]",
  emerald: "text-[#002A54] dark:text-[#8AA8FF]", amber: "text-[#002A54] dark:text-[#8AA8FF]", 
  orange: "text-[#002A54] dark:text-[#8AA8FF]", rose: "text-[#002A54] dark:text-[#8AA8FF]"
};

const colorGlow: Record<string, string> = { 
  cyan: "shadow-[0_0_20px_rgba(138,168,255,0.4)]", pink: "shadow-[0_0_20px_rgba(138,168,255,0.4)]", 
  purple: "shadow-[0_0_20px_rgba(138,168,255,0.4)]", blue: "shadow-[0_0_20px_rgba(138,168,255,0.4)]",
  emerald: "shadow-[0_0_20px_rgba(138,168,255,0.4)]", amber: "shadow-[0_0_20px_rgba(138,168,255,0.4)]",
  orange: "shadow-[0_0_20px_rgba(138,168,255,0.4)]", rose: "shadow-[0_0_20px_rgba(138,168,255,0.4)]"
};

const colorGradient: Record<string, string> = { 
  cyan: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]", pink: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]", 
  purple: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]", blue: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
  emerald: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]", amber: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
  orange: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]", rose: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]"
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
const RoadmapPanel = ({ roadmap, roadmapKey, onClose, t, onStartLearning, lang }: any) => {
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
                    className="w-20 accent-[#8AA8FF]"
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
                    className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-stone-700 dark:text-white/80 placeholder:text-stone-400 focus:outline-none focus:border-[#8AA8FF]"
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
                </div>
              ))}
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

  useEffect(() => {
    setOpenRoadmap(initialRoadmap || null);
  }, [initialRoadmap]);

  const openRoadmapData = openRoadmap ? t.roadmaps.phases[openRoadmap] : null;

  const closeRoadmap = () => {
    setOpenRoadmap(null);
    if (onOpenRoadmap) onOpenRoadmap(null);
  };

  const handleViewRoadmap = (key: string) => {
    setOpenRoadmap(key);
    if (onOpenRoadmap) onOpenRoadmap(key);
  };

  return (
    <section className="min-h-screen py-32 relative">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#8AA8FF]/10 dark:bg-[#8AA8FF]/20 rounded-full blur-[150px] pointer-events-none" />

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AA8FF] via-[#002A54] to-[#FF9800] dark:from-[#8AA8FF] dark:via-[#002A54] dark:to-[#FF9800]">
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