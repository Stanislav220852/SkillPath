import { motion } from 'framer-motion';
import { Star, Building2 } from 'lucide-react';

const mentors = [
  { name: 'Алексей С.', role: 'Senior Frontend @ Yandex', color: 'from-cyan-400 to-blue-500' },
  { name: 'Мария К.', role: 'ML Lead @ Tinkoff', color: 'from-pink-400 to-rose-500' },
  { name: 'Дмитрий В.', role: 'CISO @ Kaspersky', color: 'from-purple-400 to-indigo-500' },
  { name: 'Елена П.', role: 'Data Science @ Avito', color: 'from-blue-400 to-cyan-500' },
];

export function Slide11Mentors() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Учись у{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">профи</span>
        </motion.h2>

        <motion.p
          className="text-zinc-400 mb-16 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Менторы — практикующие инженеры из топ IT-компаний
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mentors.map((m, i) => (
            <motion.div
              key={m.name}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 flex items-center gap-4"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center shrink-0`}>
                <span className="text-xl font-bold text-white">{m.name[0]}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-white">{m.name}</h3>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                  <Building2 className="w-3.5 h-3.5" />
                  {m.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
