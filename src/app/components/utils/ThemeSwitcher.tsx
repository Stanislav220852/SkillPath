import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { LanguageContext } from "../../App";
import { themes, themeLabels, type ThemeId } from "../../theme.config";

const themeSwatches: Record<ThemeId, { from: string; via: string; to: string }> = {
  blue:   { from: "#8AA8FF", via: "#002A54", to: "#FF9800" },
  purple: { from: "#B388FF", via: "#6A0DAD", to: "#FF6B9D" },
  mono:   { from: "#FFFFFF", via: "#666666", to: "#1A1A1A" },
};

export const ThemeSwitcher = () => {
  const { colorTheme, setColorTheme, lang } = useContext(LanguageContext);

  return (
    <div className="relative group">
      <button
        className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-slate-700 dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all backdrop-blur-md"
        aria-label="Color theme"
      >
        <Palette className="w-5 h-5" />
      </button>

      <AnimatePresence>
        <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-white dark:bg-[#0d0e12] border border-[#002A54]/10 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/15 dark:shadow-black/50 p-2 min-w-[180px] backdrop-blur-xl"
          >
            <p className="px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#002A54]/40 dark:text-white/30 mb-1">
              {lang === "RU" ? "Цветовая тема" : "Color theme"}
            </p>
            {(Object.keys(themes) as ThemeId[]).map((id) => (
              <button
                key={id}
                onClick={() => setColorTheme(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  colorTheme === id
                    ? "bg-[#8AA8FF]/10 dark:bg-white/[0.06]"
                    : "hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                }`}
              >
                <div className="relative w-7 h-7 rounded-full flex-shrink-0 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#0d0e12]"
                  style={{
                    background: `linear-gradient(135deg, ${themeSwatches[id].from}, ${themeSwatches[id].via}, ${themeSwatches[id].to})`,
                    ringColor: colorTheme === id ? themes[id].primary : 'transparent',
                  }}
                />
                <span className={`text-sm font-bold flex-1 text-left ${
                  colorTheme === id
                    ? "text-[#00000F] dark:text-white"
                    : "text-[#002A54]/60 dark:text-white/50"
                }`}>
                  {themeLabels[id][lang]}
                </span>
                {colorTheme === id && (
                  <Check className="w-4 h-4 text-[#8AA8FF] dark:text-[#8AA8FF] flex-shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};
