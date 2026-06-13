import { useMemo, useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../../App";

export const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const { colorTheme } = useContext(LanguageContext);

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.05,
      isPrimary: Math.random() > 0.4,
    }));
  }, [count]);

  const getAnimate = (p: typeof particles[0]) => {
    if (colorTheme === "blue") {
      return {
        y: [0, -40 - Math.random() * 60, 0],
        x: [0, (Math.random() - 0.5) * 80, 0],
        opacity: [p.opacity, p.opacity * 2, p.opacity],
      };
    }
    if (colorTheme === "purple") {
      return {
        y: [0, -20 - Math.random() * 30, 20, 0],
        x: [0, 30, -30, 0],
        opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity],
        scale: [1, 1.3, 0.8, 1],
      };
    }
    // mono: slow drift
    return {
      y: [0, -15, 0],
      x: [0, (Math.random() - 0.5) * 30, 0],
      opacity: [p.opacity, p.opacity * 1.3, p.opacity],
    };
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.isPrimary ? "var(--tp)" : "var(--ta)",
          }}
          animate={getAnimate(p)}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
