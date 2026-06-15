import { motion } from 'framer-motion';
import { GifPlayer } from '../components/GifPlayer';

export function Slide07GifQuiz() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm text-cyan-300 font-medium">Демо</span>
        </motion.div>

        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Интерактивный квиз
        </motion.h2>

        <motion.p
          className="text-zinc-400 mb-10 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          5 вопросов за 2 минуты — и ты знаешь, куда идти
        </motion.p>

        <GifPlayer
          src="/gifs/quiz-demo.gif"
          alt="Демо: Прохождение квиза"
          caption="Прохождение мини-квиза с выбором ответов и результатом"
        />
      </div>
    </section>
  );
}
