import { motion } from 'framer-motion';
import { Rocket, Calendar, Brain, Users } from 'lucide-react';

const roadmap = [
  { q: 'Q3 2026', items: ['AI-копилот для обучения', 'Мобильное приложение'], icon: Brain, done: false },
  { q: 'Q4 2026', items: ['Мультиплеер-квизы', 'Система достижений'], icon: Users, done: false },
  { q: 'Q1 2027', items: ['Платформа для компаний', 'Корпоративные роадмапы'], icon: Rocket, done: false },
  { q: 'Q2 2027', items: ['Нейро-рекомендации', 'Глобальный запуск'], icon: Calendar, done: false },
];

export function Slide22FuturePlans() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Что{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">дальше</span>
        </motion.h2>

        <motion.p
          className="text-zinc-400 text-center mb-16 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Roadmap развития платформы
        </motion.p>

        <div className="space-y-6">
          {roadmap.map((item, i) => (
            <motion.div
              key={item.q}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 flex items-start gap-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-mono text-indigo-400 mb-2">{item.q}</div>
                <div className="flex flex-wrap gap-2">
                  {item.items.map((it) => (
                    <span key={it} className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-sm text-zinc-300">{it}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
