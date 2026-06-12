import { memo } from "react";
import { Code2, Brain, Shield, Database, Globe, Cpu, Layers, Zap } from "lucide-react";

const techs = [
  { name: "React",      color: "bg-stone-100 text-[#002A54] border-stone-200 dark:bg-[#0d0e12] dark:text-[#8AA8FF] dark:border-white/10", icon: Code2 },
  { name: "TypeScript", color: "bg-stone-100 text-[#002A54] border-stone-200 dark:bg-[#0d0e12] dark:text-[#8AA8FF] dark:border-white/10", icon: Code2 },
  { name: "Python",     color: "bg-stone-100 text-[#FF9800] border-stone-200 dark:bg-[#0d0e12] dark:text-[#FF9800] dark:border-white/10", icon: Zap },
  { name: "TensorFlow", color: "bg-stone-100 text-[#002A54] border-stone-200 dark:bg-[#0d0e12] dark:text-[#8AA8FF] dark:border-white/10", icon: Brain },
  { name: "CyberSec",   color: "bg-stone-100 text-[#002A54] border-stone-300 dark:bg-[#0d0e12] dark:text-[#FF9800] dark:border-white/10", icon: Shield },
  { name: "PostgreSQL", color: "bg-stone-100 text-[#002A54] border-stone-200 dark:bg-[#0d0e12] dark:text-[#8AA8FF] dark:border-white/10", icon: Database },
  { name: "Docker",     color: "bg-stone-100 text-[#002A54] border-stone-200 dark:bg-[#0d0e12] dark:text-[#FF9800] dark:border-white/10", icon: Globe },
  { name: "Rust",       color: "bg-stone-100 text-[#FF9800] border-stone-200 dark:bg-[#0d0e12] dark:text-[#8AA8FF] dark:border-white/10", icon: Cpu },
  { name: "Next.js",    color: "bg-stone-100 text-[#002A54] border-stone-300 dark:bg-[#0d0e12] dark:text-[#FF9800] dark:border-white/10", icon: Layers },
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
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#0d0e12] dark:to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-[#0d0e12] dark:to-transparent z-10 pointer-events-none" />

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
