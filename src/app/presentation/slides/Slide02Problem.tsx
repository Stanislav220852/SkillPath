import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export function Slide02Problem() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto" />
        </motion.div>

        <motion.h2
          className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-amber-400">73%</span>{' '}
          <span className="text-white">студентов</span>
        </motion.h2>

        <motion.p
          className="text-[clamp(1.25rem,3vw,2rem)] text-zinc-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          не знают, какую профессию выбрать в IT
        </motion.p>

        <motion.p
          className="text-lg text-zinc-500 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Бесконечные курсы, противоречивые советы, страх выбрать не то.
          Мы знаем эту проблему и решили её.
        </motion.p>
      </div>
    </section>
  );
}
