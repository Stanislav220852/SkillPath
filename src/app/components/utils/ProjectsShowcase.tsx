import { useContext } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Heart, Code2, Eye } from "lucide-react";
import { LanguageContext } from "../../App";
import { HScroller } from "./HScroller.tsx";

const buildProjects = (lang: "EN" | "RU") => [
  {
    title: lang === "RU" ? "Финтех-дашборд" : "Fintech Dashboard",
    author: "Анна К.",
    role: "Frontend",
    color: "cyan",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    views: "2.4k",
    likes: 187,
    tech: ["React", "TS", "Recharts"],
  },
  {
    title: lang === "RU" ? "AI чат-бот" : "AI Chat Bot",
    author: "Дмитрий П.",
    role: "AI/ML",
    color: "pink",
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    views: "5.1k",
    likes: 412,
    tech: ["Python", "LangChain", "FastAPI"],
  },
  {
    title: lang === "RU" ? "Pentest-инструмент" : "Pentest Tool",
    author: "Михаил К.",
    role: "Cybersec",
    color: "purple",
    gradient: "from-purple-600 via-violet-500 to-fuchsia-500",
    views: "1.8k",
    likes: 234,
    tech: ["Python", "Burp", "Nmap"],
  },
  {
    title: lang === "RU" ? "BI-аналитика продаж" : "Sales BI Analytics",
    author: "Елена М.",
    role: "Data",
    color: "blue",
    gradient: "from-blue-600 via-cyan-500 to-teal-500",
    views: "3.2k",
    likes: 298,
    tech: ["SQL", "Tableau", "Python"],
  },
  {
    title: lang === "RU" ? "E-commerce платформа" : "E-commerce Platform",
    author: "Артём В.",
    role: "Frontend",
    color: "cyan",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    views: "8.7k",
    likes: 612,
    tech: ["Next.js", "Stripe", "Tailwind"],
  },
  {
    title: lang === "RU" ? "Генератор изображений" : "Image Generator",
    author: "София Л.",
    role: "AI/ML",
    color: "pink",
    gradient: "from-rose-500 via-pink-500 to-purple-600",
    views: "12.3k",
    likes: 891,
    tech: ["PyTorch", "Diffusion", "Gradio"],
  },
];

const ProjectCard = ({ p, lang }: { p: any; lang: "EN" | "RU" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -8 }}
    className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer h-full"
  >
    {/* Mockup image (CSS gradient + abstract shapes) */}
    <div className={`relative h-48 md:h-56 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-white/30 blur-xl" />

      {/* fake UI mockup */}
      <div className="absolute inset-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-3 flex flex-col gap-2">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <div className="w-2 h-2 rounded-full bg-white/40" />
        </div>
        <div className="flex-1 flex flex-col gap-1.5 justify-end">
          <div className="h-2 w-3/4 rounded-full bg-white/40" />
          <div className="h-2 w-1/2 rounded-full bg-white/30" />
          <div className="grid grid-cols-3 gap-1.5 mt-2">
            <div className="h-8 rounded-md bg-white/20" />
            <div className="h-8 rounded-md bg-white/30" />
            <div className="h-8 rounded-md bg-white/20" />
          </div>
        </div>
      </div>

      {/* hover overlay with stats */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5 text-white">
          <Eye className="w-4 h-4" />
          <span className="text-sm font-bold">{p.views}</span>
        </div>
        <div className="flex items-center gap-1.5 text-white">
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
          <span className="text-sm font-bold">{p.likes}</span>
        </div>
        <button className="ml-2 px-3 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold flex items-center gap-1.5 hover:scale-105 transition-transform">
          {lang === "RU" ? "Открыть" : "View"} <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* role badge */}
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
        {p.role}
      </div>
    </div>

    {/* card body */}
    <div className="p-5">
      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">{p.title}</h3>
      <p className="text-xs text-slate-500 dark:text-white/50 mb-3">
        by {p.author}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {p.tech.map((tch: string) => (
          <span key={tch} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/70 border border-slate-200 dark:border-white/10">
            {tch}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export const ProjectsShowcase = () => {
  const { lang } = useContext(LanguageContext);
  const projects = buildProjects(lang as "EN" | "RU");

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4"
          >
            {lang === "RU" ? "Работы наших " : "Built by our "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-400">
              {lang === "RU" ? "выпускников" : "graduates"}
            </span>
          </motion.h2>
          <p className="text-slate-600 dark:text-white/60 max-w-xl mx-auto">
            {lang === "RU"
              ? "Реальные проекты, созданные после прохождения роадмапов SkillPath"
              : "Real projects built after completing SkillPath roadmaps"}
          </p>
        </div>

        {/* Десктоп: сетка */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} p={p} lang={lang as "EN" | "RU"} />
          ))}
        </div>

        {/* Мобилка/планшет: горизонтальная лента (свайп + стрелки) */}
        <div className="lg:hidden">
          <HScroller itemClassName="w-[280px] sm:w-[320px]">
            {projects.map((p, i) => (
              <ProjectCard key={i} p={p} lang={lang as "EN" | "RU"} />
            ))}
          </HScroller>
        </div>

        {/* CTA bottom */}
        <div className="text-center mt-10 md:mt-12">
          <p className="text-slate-500 dark:text-white/50 mb-4 text-sm">
            {lang === "RU"
              ? "Хочешь увидеть свой проект здесь?"
              : "Want to see your project here?"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-cyan-500/30"
          >
            <Code2 className="w-4 h-4" />
            {lang === "RU" ? "Начать роадмап" : "Start a Roadmap"}
          </motion.button>
        </div>
      </div>
    </section>
  );
};
