import { AnimatePresence, motion } from "framer-motion";
import { Trophy, X } from "lucide-react";

interface ToastProps {
  message: string | null;
  subtitle?: string;
  onClose: () => void;
}

export const AchievementToast = ({ message, subtitle, onClose }: ToastProps) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-8 right-8 z-[200] max-w-sm"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 p-[2px] shadow-2xl">
          <div className="bg-slate-900 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-black text-base mb-1">{message}</p>
              {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);