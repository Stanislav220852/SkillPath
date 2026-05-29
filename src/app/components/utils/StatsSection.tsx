import { useContext, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { LanguageContext } from "../../App";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function AnimatedStat({ value, suffix = "", label, delay = 0 }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="text-center relative group"
    >
      <div className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
        {count.toLocaleString()}
        <span className="text-cyan-500 dark:text-cyan-400">{suffix}</span>
      </div>
      <div className="text-sm font-semibold text-slate-500 dark:text-white/50 uppercase tracking-widest">
        {label}
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -z-10 w-24 h-24 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export const StatsSection = () => {
  const { t } = useContext(LanguageContext);

  const stats = [
    { value: 12400, suffix: "+", label: t.stats.students },
    { value: 85,    suffix: "",  label: t.stats.mentors },
    { value: 12,    suffix: "",  label: t.stats.profs },
    { value: 94,    suffix: "%", label: t.stats.completion },
  ];

  return (
    <section className="relative py-20 border-y border-black/5 dark:border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100/80 via-white to-white dark:from-white/[0.03] dark:via-transparent dark:to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <AnimatedStat
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};