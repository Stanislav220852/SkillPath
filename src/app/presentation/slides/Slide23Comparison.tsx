import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

const features = [
  { name: 'Бесплатный старт', skillpath: true, stepik: true, skillbox: false },
  { name: 'Персональный роадмап', skillpath: true, stepik: false, skillbox: true },
  { name: 'Интерактивный квиз', skillpath: true, stepik: false, skillbox: false },
  { name: 'Личный ментор', skillpath: true, stepik: false, skillbox: true },
  { name: 'Геймификация (XP)', skillpath: true, stepik: false, skillbox: false },
  { name: 'NFT-сертификаты', skillpath: true, stepik: false, skillbox: false },
  { name: 'AI-помощник 24/7', skillpath: true, stepik: false, skillbox: false },
  { name: 'Комьюнити 5000+', skillpath: true, stepik: true, skillbox: true },
];

function StatusIcon({ value }: { value: boolean | null }) {
  if (value === true) return <Check className="w-4 h-4 text-green-400" />;
  if (value === false) return <X className="w-4 h-4 text-zinc-600" />;
  return <Minus className="w-4 h-4 text-zinc-600" />;
}

export function Slide23Comparison() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-4xl w-full">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          SkillPath vs другие
        </motion.h2>

        <motion.div
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-sm text-zinc-400 font-medium p-4 w-1/3">Фича</th>
                <th className="text-center text-sm font-semibold p-4 w-1/3">
                  <span className="text-indigo-400">SkillPath</span>
                </th>
                <th className="text-center text-sm text-zinc-500 font-medium p-4 w-1/6">Stepik</th>
                <th className="text-center text-sm text-zinc-500 font-medium p-4 w-1/6">Skillbox</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={f.name} className="border-b border-white/[0.03] last:border-0">
                  <td className="p-4 text-sm text-zinc-300">{f.name}</td>
                  <td className="p-4 text-center"><StatusIcon value={f.skillpath} /></td>
                  <td className="p-4 text-center"><StatusIcon value={f.stepik} /></td>
                  <td className="p-4 text-center"><StatusIcon value={f.skillbox} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
