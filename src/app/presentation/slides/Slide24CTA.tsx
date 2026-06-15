import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';

export function Slide24CTA() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]" />

      <div className="max-w-3xl text-center z-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Rocket className="w-4 h-4 text-indigo-400" />
          <span className="text-sm text-indigo-300">Присоединяйся</span>
        </motion.div>

        <motion.h2
          className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <span className="text-white">Начни свой путь</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            в IT
          </span>
        </motion.h2>

        <motion.p
          className="text-lg text-zinc-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          Присоединяйся к 5000+ студентов, которые уже нашли свой путь
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Начать обучение
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            className="px-8 py-4 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white font-semibold text-lg"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.95 }}
          >
            Смотреть демо
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
