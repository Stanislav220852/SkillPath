import { motion } from 'framer-motion';
import { GifPlayer } from '../components/GifPlayer';

export function Slide05GifHero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm text-indigo-300 font-medium">Демо</span>
        </motion.div>

        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Посмотри, как это выглядит
        </motion.h2>

        <motion.p
          className="text-zinc-400 mb-10 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Интерактивная главная страница с частицами, spotlight-эффектом и анимациями
        </motion.p>

        <GifPlayer
          src="/gifs/hero-demo.gif"
          alt="Демо: Главная страница SkillPath"
          caption="Hero секция с FloatingParticles, MouseSpotlight и TextScramble"
        />
      </div>
    </section>
  );
}
