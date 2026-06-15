import { motion } from 'framer-motion';
import { Brain, Map, Users, Award, Calendar, BookOpen, TrendingUp, Bot } from 'lucide-react';

const features = [
  { icon: Brain, title: 'Тест на профориентацию', desc: '5-минутный квиз', span: 'col-span-2', gradient: 'from-cyan-400/10 to-blue-500/10' },
  { icon: Map, title: 'Роадмапы', desc: 'Пошаговые деревья навыков', span: 'col-span-1', gradient: 'from-indigo-400/10 to-purple-500/10' },
  { icon: Users, title: 'Менторы', desc: 'Из топ-компаний', span: 'col-span-1', gradient: 'from-purple-400/10 to-pink-500/10' },
  { icon: Award, title: 'Сертификаты', desc: 'NFT-подтверждение', span: 'col-span-1', gradient: 'from-amber-400/10 to-orange-500/10' },
  { icon: Calendar, title: 'Воркшопы', desc: 'Еженедельно', span: 'col-span-1', gradient: 'from-pink-400/10 to-rose-500/10' },
  { icon: BookOpen, title: 'Библиотека', desc: 'Отобранные материалы', span: 'col-span-2', gradient: 'from-emerald-400/10 to-green-500/10' },
  { icon: TrendingUp, title: 'Карьерный рост', desc: 'Подготовка к собесам', span: 'col-span-1', gradient: 'from-blue-400/10 to-indigo-500/10' },
  { icon: Bot, title: 'AI Копилот', desc: 'Помощник 24/7', span: 'col-span-1', gradient: 'from-violet-400/10 to-purple-500/10' },
];

export function Slide13Bento() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Всё, что нужно чтобы{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">прокачаться</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className={`${feat.span} bg-gradient-to-br ${feat.gradient} backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.06 }}
            >
              <feat.icon className="w-7 h-7 text-indigo-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">{feat.title}</h3>
              <p className="text-sm text-zinc-400">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
