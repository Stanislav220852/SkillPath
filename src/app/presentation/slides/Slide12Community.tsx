import { motion } from 'framer-motion';
import { MessageCircle, Users, Heart } from 'lucide-react';

export function Slide12Community() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-4xl text-center">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Комьюнити{' '}
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">5000+</span>
        </motion.h2>

        <motion.p
          className="text-zinc-400 mb-16 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Ты не один. Тысячи студентов помогают друг другу каждый день.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Users, value: '5 000+', label: 'Студентов', color: 'from-indigo-400 to-purple-500' },
            { icon: MessageCircle, value: '24/7', label: 'Чат-поддержка', color: 'from-cyan-400 to-blue-500' },
            { icon: Heart, value: '98%', label: 'Довольных', color: 'from-pink-400 to-rose-500' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15 }}
            >
              <div className={`w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">{item.value}</div>
              <div className="text-sm text-zinc-400">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
