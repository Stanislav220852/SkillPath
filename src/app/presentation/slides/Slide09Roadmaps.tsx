import { motion } from 'framer-motion';
import { GitBranch, CheckCircle2, Clock } from 'lucide-react';

export function Slide09Roadmaps() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Персональные{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">роадмапы</span>
        </motion.h2>

        <motion.p
          className="text-zinc-400 mb-16 text-lg max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Пошаговые деревья навыков с отмеченными контрольными точками, ресурсами и таймлайнами
        </motion.p>

        {/* Дерево навыков — визуализация */}
        <motion.div
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">Frontend Developer — Роадмап</span>
          </div>

          <div className="space-y-4">
            {[
              { phase: 'Основы', skills: ['HTML & CSS', 'JavaScript Core'], time: '10 нед.', progress: 100 },
              { phase: 'Фреймворки', skills: ['React', 'TypeScript'], time: '11 нед.', progress: 60 },
              { phase: 'Продвинутый', skills: ['State Management', 'Testing', 'Deploy & CI/CD'], time: '8 нед.', progress: 0 },
            ].map((p, i) => (
              <div key={p.phase} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    p.progress === 100 ? 'bg-green-500/20 text-green-400' :
                    p.progress > 0 ? 'bg-indigo-500/20 text-indigo-400' :
                    'bg-zinc-800 text-zinc-500'
                  }`}>
                    {p.progress === 100 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  {i < 2 && <div className="w-px h-8 bg-zinc-700/50 mt-1" />}
                </div>

                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white">{p.phase}</h4>
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Clock className="w-3 h-3" /> {p.time}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-white/[0.05] text-xs text-zinc-400">{s}</span>
                    ))}
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${
                      p.progress === 100 ? 'bg-green-500' : 'bg-indigo-500'
                    }`} style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
