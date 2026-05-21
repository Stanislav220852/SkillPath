import { memo } from "react";
import { Code2, Brain, Shield, Database, Globe, Cpu, Layers, Zap } from "lucide-react";

const techs = [
  { name: "React",      color: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800", icon: Code2 },
  { name: "TypeScript", color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800", icon: Code2 },
  { name: "Python",     color: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800", icon: Zap },
  { name: "TensorFlow", color: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800", icon: Brain },
  { name: "CyberSec",   color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800", icon: Shield },
  { name: "PostgreSQL", color: "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800", icon: Database },
  { name: "Docker",     color: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800", icon: Globe },
  { name: "Rust",       color: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800", icon: Cpu },
  { name: "Next.js",    color: "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700", icon: Layers },
];

const TechPill = memo(({ name, color, icon: Icon }: typeof techs[0]) => (
  <div
    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold whitespace-nowrap ${color}`}
  >
    <Icon className="w-4 h-4 opacity-70" />
    {name}
  </div>
));

export const TechMarquee = () => {
  const row = [...techs, ...techs, ...techs];

  return (
    <section className="py-10 overflow-hidden relative group">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#0b1120] dark:to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-[#0b1120] dark:to-transparent z-10 pointer-events-none" />

      <div className="flex gap-4 animate-marquee w-max group-hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <TechPill key={`${t.name}-${i}`} {...t} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};