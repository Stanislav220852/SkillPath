import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target } from 'lucide-react';

export function Slide20Gamification() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Геймификация
        </motion.h2>

        <motion.p
          className="text-zinc-400 text-center mb-16 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Учись как в игре: получай XP, открывай достижения, соревнуйся
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: Zap, title: 'XP за задания', desc: 'Каждый урок приносит опыт. Чем сложнее — тем больше.', value: '+50 XP', color: 'from-amber-400 to-orange-500' },
            { icon: Trophy, title: 'Достижения', desc: 'Открывай бейджи за вехи: первый урок, 10 подряд, финальный экзамен.', value: '15 бейджей', color: 'from-indigo-400 to-purple-500' },
            { icon: Star, title: 'Лидерборд', desc: 'Соревнуйся с другими студентами. Лучшие попадают в топ.', value: 'Топ-100', color: 'from-cyan-400 to-blue-500' },
            { icon: Target, title: 'Квесты', desc: 'Дополнительные задания для ускоренного роста.', value: 'Еженедельно', color: 'from-pink-400 to-rose-500' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-mono font-bold text-zinc-400 bg-white/[0.05] px-3 py-1 rounded-full">{item.value}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
