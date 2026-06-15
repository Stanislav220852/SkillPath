import { motion } from 'framer-motion';
import { GifPlayer } from '../components/GifPlayer';

export function Slide17GifFullDemo() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm text-indigo-300 font-medium">Полное демо</span>
        </motion.div>

        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Полный обзор платформы
        </motion.h2>

        <motion.p
          className="text-zinc-400 mb-10 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          15-20 секунд — и ты видишь всё: от квиза до роадмапа
        </motion.p>

        <GifPlayer
          src="/gifs/full-demo.gif"
          alt="Демо: Полный обзор SkillPath"
          caption="Быстрый обзор всех ключевых секций платформы"
        />
      </div>
    </section>
  );
}
