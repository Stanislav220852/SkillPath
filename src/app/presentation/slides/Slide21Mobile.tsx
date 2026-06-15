import { motion } from 'framer-motion';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

export function Slide21Mobile() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl w-full text-center">
        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Учится на{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">любом устройстве</span>
        </motion.h2>

        <motion.p
          className="text-zinc-400 mb-16 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Полностью адаптивный дизайн — от смартфона до десктопа
        </motion.p>

        <div className="flex items-end justify-center gap-8 mb-16">
          {[
            { icon: Smartphone, label: 'Мобилка', size: 'w-20 h-36', iconSize: 'w-8 h-8', delay: 0.3 },
            { icon: Tablet, label: 'Планшет', size: 'w-32 h-44', iconSize: 'w-10 h-10', delay: 0.5 },
            { icon: Monitor, label: 'Десктоп', size: 'w-48 h-32', iconSize: 'w-12 h-12', delay: 0.7 },
          ].map((device, i) => (
            <motion.div
              key={device.label}
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: device.delay }}
            >
              <div className={`${device.size} bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl flex items-center justify-center`}>
                <device.icon className={device.iconSize} style={{ color: 'rgba(255,255,255,0.2)' }} />
              </div>
              <span className="text-xs text-zinc-500">{device.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.06]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-sm text-zinc-400">Адаптивный дизайн — работает везде</span>
        </motion.div>
      </div>
    </section>
  );
}
