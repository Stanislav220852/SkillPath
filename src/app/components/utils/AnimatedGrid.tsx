import { useContext } from "react";
import { LanguageContext } from "../../App";

export const AnimatedGrid = () => {
  const { colorTheme } = useContext(LanguageContext);

  const gridColor = colorTheme === "purple"
    ? "rgba(179,136,255,0.3)"
    : colorTheme === "mono"
      ? "rgba(200,200,200,0.2)"
      : "rgba(138,168,255,0.3)";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
      />
    </div>
  );
};
