import { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../../App";

// Простые SVG-логотипы (стилизованные текстовые)
const companies = [
  "Yandex", "Tinkoff", "Google", "Sber", "Avito", "Wildberries", "OpenAI", "Microsoft",
];

export const CompaniesStrip = () => {
  const { t } = useContext(LanguageContext);
  return (
    <section className="py-10 md:py-12 relative">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-bold uppercase tracking-[0.3em] text-[#002A54]/50 dark:text-white/40 mb-8"
        >
          {t.companies.title}
        </motion.p>

        {/* Мобилка: горизонтальная лента логотипов (свайп) */}
        <div className="flex md:hidden gap-8 overflow-x-auto pb-2 -mx-6 px-6 hscroll-hide snap-x" style={{ scrollbarWidth: "none" }}>
          {companies.map((name) => (
            <span
              key={name}
              className="flex-shrink-0 snap-start text-xl font-black text-[#002A54]/30 dark:text-white/30"
              style={{ fontFamily: "system-ui" }}
            >
              {name}
            </span>
          ))}
        </div>

        {/* Десктоп: обычный wrap */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="text-xl md:text-2xl font-black text-[#002A54]/30 dark:text-white/30 hover:text-[#002A54]/70 dark:hover:text-white/70 transition-all cursor-default"
              style={{ fontFamily: "system-ui" }}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
