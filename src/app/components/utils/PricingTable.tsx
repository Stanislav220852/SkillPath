import { useContext, useState } from "react";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { LanguageContext } from "../../App";

import React from "react";
export const PricingTable = () => {
  const { t } = useContext(LanguageContext);
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.pricing.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-400">
              {t.pricing.titleAccent}
            </span>
          </h2>
          <p className="text-slate-600 dark:text-white/60 mb-8">{t.pricing.subtitle}</p>

          {/* toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                !yearly ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-white/50"
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                yearly ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-white/50"
              }`}
            >
              {t.pricing.yearly}
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-green-500 text-white font-black">{t.pricing.save}</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.pricing.plans.map((plan: any, i: number) => {
            const price = yearly ? plan.yearPrice : plan.price;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  plan.popular
                    ? "bg-gradient-to-br from-slate-900 to-slate-800 dark:from-cyan-500 dark:to-blue-600 border-2 border-cyan-500 dark:border-white/20 shadow-2xl shadow-cyan-500/30 scale-105 z-10"
                    : "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    {t.pricing.popular}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-2xl font-black mb-1 ${plan.popular ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? "text-white/70" : "text-slate-500 dark:text-white/50"}`}>
                    {plan.desc}
                  </p>
                </div>

                <div className="mb-6">
                  <span className={`text-5xl font-black ${plan.popular ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    ${price}
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-white/60" : "text-slate-500 dark:text-white/50"}`}>
                    {t.pricing.perMonth}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f: string) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.popular ? "text-white/90" : "text-slate-700 dark:text-white/80"}`}>
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-cyan-300" : "text-cyan-500 dark:text-cyan-400"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 rounded-2xl font-bold transition-all ${
                    plan.popular
                      ? "bg-white text-slate-900 hover:bg-white/90 shadow-lg"
                      : "bg-slate-900 dark:bg-white/10 text-white border border-transparent dark:border-white/20 hover:bg-slate-800 dark:hover:bg-white/20"
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};