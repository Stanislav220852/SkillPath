import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SlideNavProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function SlideNav({ current, total, onPrev, onNext }: SlideNavProps) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-800/50 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        <button
          onClick={onPrev}
          disabled={current === 0}
          className="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30 hover:bg-zinc-700 transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          disabled={current === total - 1}
          className="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30 hover:bg-zinc-700 transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      <div className="fixed bottom-4 left-4 z-50 px-3 py-1 rounded-full bg-zinc-800/80 backdrop-blur-sm text-sm text-zinc-400 font-mono">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </>
  );
}
