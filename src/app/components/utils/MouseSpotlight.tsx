import { useEffect, useContext } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { LanguageContext } from "../../App";

export const MouseSpotlight = () => {
  const { colorTheme } = useContext(LanguageContext);
  const springConfig = { damping: 30, stiffness: 500, mass: 1 };
  const x = useSpring(typeof window !== "undefined" ? window.innerWidth / 2 : 0, springConfig);
  const y = useSpring(typeof window !== "undefined" ? window.innerHeight / 2 : 0, springConfig);

  const spotColor = colorTheme === "purple"
    ? "rgba(179,136,255,0.04)"
    : colorTheme === "mono"
      ? "rgba(200,200,200,0.03)"
      : "rgba(138,168,255,0.05)";

  const spotColor2 = colorTheme === "purple"
    ? "rgba(255,107,157,0.02)"
    : colorTheme === "mono"
      ? "rgba(100,100,100,0.02)"
      : "rgba(255,152,0,0.03)";

  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${x}px ${y}px,
      ${spotColor} 0%,
      ${spotColor2} 40%,
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
