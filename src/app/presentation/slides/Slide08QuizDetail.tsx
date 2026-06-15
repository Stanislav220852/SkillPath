import { motion } from 'framer-motion';
import { ListChecks, Timer, Zap } from 'lucide-react';

export function Slide08QuizDetail() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Квиз за <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">2 минуты</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: ListChecks, title: '5 вопросов', desc: 'Короткие, понятные, без воды', color: 'from-cyan-400 to-blue-500' },
            { icon: Timer, title: '2 минуты', desc: 'Не нужно думать часами', color: 'from-indigo-400 to-purple-500' },
            { icon: Zap, title: 'Мгновенный результат', desc: 'Сразу видишь своё направление', color: 'from-purple-400 to-pink-500' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15 }}
            >
              <div className={`w-12 h-12 mb-5 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {['🎨 Красивый дизайн', '🤖 Умные машины', '🛡 Решать головоломки', '📊 Искать паттерны'].map((opt) => (
              <span key={opt} className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm text-zinc-300">
                {opt}
              </span>
            ))}
          </div>
          <p className="text-center text-zinc-500 text-xs mt-4">Пример вопроса: «Что тебя зажигает?»</p>
        </motion.div>
      </div>
    </section>
  );
}
