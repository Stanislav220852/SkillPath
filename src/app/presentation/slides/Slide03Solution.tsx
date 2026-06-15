import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export function Slide03Solution() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-4xl text-center">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm text-indigo-300">Наше решение</span>
        </motion.div>

        <motion.h2
          className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Интерактивный гайд, который поможет
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">найти свой путь</span>
        </motion.h2>

        <motion.p
          className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          SkillPath анализирует твои интересы и подбирает идеальное IT-направление
          с персональным роадмапом, менторами и ресурсами.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-3 text-indigo-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm font-medium">Смотри дальше</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}
