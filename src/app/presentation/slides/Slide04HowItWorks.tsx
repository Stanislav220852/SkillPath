import { motion } from 'framer-motion';
import { Brain, Map, Rocket } from 'lucide-react';

const steps = [
  { icon: Brain, num: '01', title: 'Тест', desc: '5-минутный квиз определит твои сильные стороны', gradient: 'from-cyan-400 to-blue-500' },
  { icon: Map, num: '02', title: 'Роадмап', desc: 'Персональная карта навыков с ресурсами', gradient: 'from-indigo-400 to-purple-500' },
  { icon: Rocket, num: '03', title: 'Карьера', desc: 'Портфолио, менторы и офферы', gradient: 'from-purple-400 to-pink-500' },
];

export function Slide04HowItWorks() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-6xl w-full">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Как это работает
        </motion.h2>

        <motion.p
          className="text-zinc-400 text-center mb-16 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          3 простых шага до твоей IT-карьеры
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15 }}
            >
              <div className="absolute top-4 right-4 text-5xl font-extrabold text-white/[0.03]">
                {step.num}
              </div>

              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
