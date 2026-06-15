import { motion } from 'framer-motion';
import { Layers, Sparkles, Shield, Cpu, Code2, Database, Globe, Smartphone } from 'lucide-react';

const tech = [
  { icon: Code2, name: 'React', desc: 'UI-фреймворк' },
  { icon: Layers, name: 'TypeScript', desc: 'Типизация' },
  { icon: Sparkles, name: 'Framer Motion', desc: 'Анимации' },
  { icon: Shield, name: 'Radix UI', desc: 'Компоненты' },
  { icon: Cpu, name: 'Tailwind CSS', desc: 'Стили' },
  { icon: Database, name: 'Vite', desc: 'Сборка' },
  { icon: Globe, name: 'Vercel', desc: 'Деплой' },
  { icon: Smartphone, name: 'Responsive', desc: 'Адаптив' },
];

export function Slide19TechStack() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Технологии
        </motion.h2>

        <motion.p
          className="text-zinc-400 text-center mb-16 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Современный стек для быстрой и надёжной платформы
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {tech.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -3 }}
            >
              <t.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-white mb-0.5">{t.name}</h3>
              <p className="text-xs text-zinc-500">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
