import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';

const testimonials = [
  { name: 'Алексей Петров', role: 'Junior Frontend @ Yandex', text: 'Уходить из бухгалтерии в 30 лет было дико страшно. Но SkillPath работает — через полгода я получил оффер.', before: 'Бухгалтер', after: 'Frontend Dev', color: 'from-cyan-400 to-blue-500' },
  { name: 'Мария Волкова', role: 'ML Engineer @ Tinkoff', text: 'У меня был ноль по математике. Роадмап разбил всё на маленькие шаги. Сейчас тренирую модели в банке.', before: 'Маркетолог', after: 'ML Engineer', color: 'from-pink-400 to-rose-500' },
  { name: 'Данил Ким', role: 'Pentester @ Group-IB', text: 'От просмотра Mr. Robot до реальных взломов систем легально. Лучшее решение в карьере.', before: 'Сисадмин', after: 'Pentester', color: 'from-purple-400 to-indigo-500' },
];

export function Slide15Testimonials() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Реальные{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">истории</span>
        </motion.h2>

        <motion.p
          className="text-zinc-400 mb-16 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Наши студенты делятся своим опытом
        </motion.p>

        <div className="space-y-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15 }}
            >
              <Quote className="w-8 h-8 text-indigo-400/30 mb-4" />
              <p className="text-zinc-300 text-lg leading-relaxed mb-6">«{t.text}»</p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                    <span className="text-sm font-bold text-white">{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 line-through">{t.before}</span>
                  <ArrowRight className="w-3 h-3 text-zinc-600" />
                  <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-400 font-semibold">{t.after}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
