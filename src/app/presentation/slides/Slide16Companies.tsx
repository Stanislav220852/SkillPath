import { motion } from 'framer-motion';

const companies = ['Яндекс', 'Тинькофф', 'Авито', 'Озон', 'VK', 'Сбер', 'Group-IB', 'Kaspersky'];

export function Slide16Companies() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full text-center">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Наши выпускники работают в
        </motion.h2>

        <motion.p
          className="text-zinc-400 mb-16 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Топ IT-компании России
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {companies.map((company, i) => (
            <motion.div
              key={company}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg font-bold text-zinc-300">{company}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-zinc-600 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          и ещё 50+ компаний-партнёров
        </motion.p>
      </div>
    </section>
  );
}
