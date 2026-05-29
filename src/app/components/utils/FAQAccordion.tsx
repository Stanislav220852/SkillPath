import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { LanguageContext } from "../../App";
import React from "react";
export const FAQAccordion = () => {
  const { t } = useContext(LanguageContext);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            {t.faq.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 dark:from-pink-400 dark:to-cyan-400">
              {t.faq.titleAccent}
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item: any, i: number) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white/60 dark:bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden transition-colors ${
                  isOpen ? "border-cyan-500/30" : "border-black/5 dark:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-bold text-slate-900 dark:text-white text-base md:text-lg">{item.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? "bg-gradient-to-r from-cyan-500 to-pink-500 text-white" : "bg-black/5 dark:bg-white/10 text-slate-600 dark:text-white/60"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-slate-600 dark:text-white/60 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};