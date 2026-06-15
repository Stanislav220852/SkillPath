import { motion } from 'framer-motion';

export function Slide01Title() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-[120px]" />
      <div className="absolute top-[20%] right-[15%] w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]" />

      <div className="text-center z-10 px-8">
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          <div className="w-24 h-24 mx-auto rounded-[1.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.4)]">
            <span className="text-5xl font-extrabold text-white">S</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-[clamp(3rem,8vw,7rem)] font-extrabold tracking-tight leading-none mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <span className="text-white">Skill</span>
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Path</span>
        </motion.h1>

        <motion.p
          className="text-[clamp(1.25rem,3vw,2rem)] text-zinc-400 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Выбери своё будущее в IT
        </motion.p>

        <motion.div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Бета 2.0 — Уже доступно
        </motion.div>
      </div>
    </section>
  );
}
