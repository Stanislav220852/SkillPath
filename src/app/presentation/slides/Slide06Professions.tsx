import { motion } from 'framer-motion';
import { Code, Brain, Shield, Database, Server, Smartphone, Cloud, Gamepad2 } from 'lucide-react';

const professions = [
  { icon: Code, title: 'Frontend', color: 'from-cyan-400 to-cyan-600', count: '12 навыков' },
  { icon: Brain, title: 'AI Engineer', color: 'from-pink-400 to-pink-600', count: '10 навыков' },
  { icon: Shield, title: 'Cybersec', color: 'from-purple-400 to-purple-600', count: '10 навыков' },
  { icon: Database, title: 'Data Science', color: 'from-blue-400 to-blue-600', count: '11 навыков' },
  { icon: Server, title: 'Backend', color: 'from-emerald-400 to-emerald-600', count: '8 навыков' },
  { icon: Smartphone, title: 'Mobile', color: 'from-amber-400 to-amber-600', count: '8 навыков' },
  { icon: Cloud, title: 'DevOps', color: 'from-orange-400 to-orange-600', count: '8 навыков' },
  { icon: Gamepad2, title: 'Game Dev', color: 'from-rose-400 to-rose-600', count: '8 навыков' },
];

export function Slide06Professions() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-6xl w-full">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          8 карьерных направлений
        </motion.h2>

        <motion.p
          className="text-zinc-400 text-center mb-16 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Каждое с персональным роадмапом и ресурсами
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {professions.map((prof, i) => (
            <motion.div
              key={prof.title}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 text-center group cursor-pointer hover:bg-white/[0.06] transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${prof.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <prof.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">{prof.title}</h3>
              <p className="text-xs text-zinc-500">{prof.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
