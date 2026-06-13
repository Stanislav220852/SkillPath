import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { LanguageContext } from "../../App";
import { HScroller } from "./HScroller.tsx";

const PlanCard = ({ plan, i, yearly, t, onStartQuiz, onPaidClick }: { plan: any; i: number; yearly: boolean; t: any; onStartQuiz?: () => void; onPaidClick?: (msg: string) => void }) => {
  const price = yearly ? plan.yearPrice : plan.price;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className={`relative rounded-3xl p-8 flex flex-col h-full ${
        plan.popular
          ? "bg-gradient-to-br from-[#002A54] via-[#001a3a] to-[#00000F] dark:from-[#002A54] dark:via-[#001a3a] dark:to-[#00000F] border-2 border-[#FF9800] dark:border-[#FF9800]/50 shadow-2xl shadow-[#FF9800]/30 lg:scale-105 z-10"
          : "bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] shadow-[0_8px_32px_rgba(0,42,84,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#8AA8FF] via-[#002A54] to-[#FF9800] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
          <Sparkles className="w-3 h-3" />
          {t.pricing.popular}
        </div>
      )}

      <div className="mb-6">
        <h3 className={`text-2xl font-black mb-1 ${plan.popular ? "text-white" : "text-[#00000F] dark:text-white"}`}>
          {plan.name}
        </h3>
        <p className={`text-sm ${plan.popular ? "text-white/70" : "text-[#002A54]/50 dark:text-white/50"}`}>
          {plan.desc}
        </p>
      </div>

      <div className="mb-6">
        <span className={`text-5xl font-black ${plan.popular ? "text-white" : "text-[#00000F] dark:text-white"}`}>
          ${price}
        </span>
        <span className={`text-sm ${plan.popular ? "text-white/60" : "text-[#002A54]/50 dark:text-white/50"}`}>
          {t.pricing.perMonth}
        </span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f: string) => (
          <li key={f} className={`flex items-start gap-2 text-sm ${plan.popular ? "text-white/90" : "text-[#002A54]/80 dark:text-white/80"}`}>
            <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-[#8AA8FF]" : "text-[#FF9800] dark:text-[#FF9800]"}`} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          if (plan.price === 0) {
            onStartQuiz?.();
          } else {
            onPaidClick?.(plan.name);
          }
        }}
        className={`w-full py-3 rounded-2xl font-bold transition-all ${
          plan.popular
            ? "bg-gradient-to-r from-[#FF9800] to-[#e68900] text-[#00000F] hover:opacity-90 shadow-lg"
            : "bg-[#002A54] dark:bg-white/10 text-white border border-transparent dark:border-white/20 hover:bg-[#001a3a] dark:hover:bg-white/20"
        }`}
      >
        {plan.cta}
      </motion.button>
    </motion.div>
  );
};

export const PricingTable = ({ onStartQuiz }: { onStartQuiz?: () => void }) => {
  const [toast, setToast] = useState<string | null>(null);
  const { t } = useContext(LanguageContext);
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#8AA8FF]/5 dark:bg-[#8AA8FF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#FF9800]/5 dark:bg-[#FF9800]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#00000F] dark:text-white mb-4">
            {t.pricing.title}{" "}
            <span className="text-[var(--tp)]">
              {t.pricing.titleAccent}
            </span>
          </h2>
          <p className="text-[#002A54]/60 dark:text-white/60 mb-8">{t.pricing.subtitle}</p>

          {/* toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                !yearly ? "bg-white dark:bg-white/10 text-[#00000F] dark:text-white shadow-sm" : "text-[#002A54]/50 dark:text-white/50"
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                yearly ? "bg-white dark:bg-white/10 text-[#00000F] dark:text-white shadow-sm" : "text-[#002A54]/50 dark:text-white/50"
              }`}
            >
              {t.pricing.yearly}
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#FF9800] text-[#00000F] font-black">{t.pricing.save}</span>
            </button>
          </div>
        </div>

        {/* Десктоп/планшет: сетка 3 колонки */}
        <div className="hidden md:grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.pricing.plans.map((plan: any, i: number) => (
            <PlanCard key={plan.name} plan={plan} i={i} yearly={yearly} t={t} onStartQuiz={onStartQuiz} onPaidClick={(msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); }} />
          ))}
        </div>

        {/* Мобилка: горизонтальная лента (свайп) */}
        <div className="md:hidden pt-3">
          <HScroller itemClassName="w-[300px]">
            {t.pricing.plans.map((plan: any, i: number) => (
              <PlanCard key={plan.name} plan={plan} i={i} yearly={yearly} t={t} onStartQuiz={onStartQuiz} onPaidClick={(msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); }} />
            ))}
          </HScroller>
        </div>
      </div>
        <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl bg-gradient-to-r from-[#8AA8FF] via-[#002A54] to-[#FF9800] text-white font-bold shadow-2xl shadow-[#FF9800]/40 flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5" />
            <div>
              <p className="text-sm font-black">{toast} — coming soon! 🚀</p>
              <p className="text-xs opacity-80">Оплата будет доступна в ближайшее время</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
