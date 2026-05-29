import { useEffect } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

export const MouseSpotlight = () => {
  const springConfig = { damping: 30, stiffness: 500, mass: 1 };
  const x = useSpring(typeof window !== "undefined" ? window.innerWidth / 2 : 0, springConfig);
  const y = useSpring(typeof window !== "undefined" ? window.innerHeight / 2 : 0, springConfig);

  // ВАЖНО: хук вызывается ДО любых return'ов
  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${x}px ${y}px,
      rgba(34,211,238,0.07) 0%,
      rgba(236,72,153,0.04) 40%,
      transparent 80%
    )
  `;

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-700"
      style={{ background }}
    />
  );
};