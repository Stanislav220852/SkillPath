import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VisualizerProps {
  isPlaying: boolean;
  barCount?: number;
}

export const AudioVisualizer: React.FC<VisualizerProps> = ({ isPlaying, barCount = 6 }) => {
  const [heights, setHeights] = useState<number[]>(new Array(barCount).fill(4));
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      setHeights(new Array(barCount).fill(4));
      if (ivRef.current) clearInterval(ivRef.current);
      return;
    }

    const tick = () => {
      setHeights(prev =>
        prev.map(() => 6 + Math.random() * 30)
      );
    };

    tick();
    ivRef.current = setInterval(tick, 180);
    return () => { if (ivRef.current) clearInterval(ivRef.current); };
  }, [isPlaying, barCount]);

  return (
    <div className="flex items-end justify-center gap-[3px] h-10 px-2">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: isPlaying ? h : 4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="w-[5px] rounded-full"
          style={{
            background: "linear-gradient(to top, var(--tp), var(--ta))",
            minHeight: 4,
          }}
        />
      ))}
    </div>
  );
};
