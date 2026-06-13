export type ThemeId = "blue" | "purple" | "mono";

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  accent: string;
  accentGlow: string;
  gradient: string;
  gradientText: string;
  gradientCTA: string;
  cardShadow: string;
  blurPrimary: string;
  blurAccent: string;
  border: string;
  borderHover: string;
  ring: string;
  particle1: string;
  particle2: string;
  glowClass: string;
}

export const themes: Record<ThemeId, ThemeColors> = {
  blue: {
    primary: "#8AA8FF",
    primaryDark: "#002A54",
    accent: "#FF9800",
    accentGlow: "rgba(255,152,0,0.3)",
    gradient: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
    gradientText: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
    gradientCTA: "from-[#8AA8FF] via-[#002A54] to-[#FF9800]",
    cardShadow: "rgba(0,42,84,0.15)",
    blurPrimary: "rgba(138,168,255,0.2)",
    blurAccent: "rgba(255,152,0,0.15)",
    border: "rgba(138,168,255,0.2)",
    borderHover: "rgba(255,152,0,0.4)",
    ring: "#8AA8FF",
    particle1: "#8AA8FF",
    particle2: "#FF9800",
    glowClass: "shadow-[0_0_20px_rgba(138,168,255,0.3)]",
  },
  purple: {
    primary: "#B388FF",
    primaryDark: "#1A0033",
    accent: "#FF6B9D",
    accentGlow: "rgba(255,107,157,0.3)",
    gradient: "from-[#B388FF] via-[#6A0DAD] to-[#FF6B9D]",
    gradientText: "from-[#B388FF] via-[#6A0DAD] to-[#FF6B9D]",
    gradientCTA: "from-[#B388FF] via-[#6A0DAD] to-[#FF6B9D]",
    cardShadow: "rgba(106,13,173,0.15)",
    blurPrimary: "rgba(179,136,255,0.2)",
    blurAccent: "rgba(255,107,157,0.15)",
    border: "rgba(179,136,255,0.2)",
    borderHover: "rgba(255,107,157,0.4)",
    ring: "#B388FF",
    particle1: "#B388FF",
    particle2: "#FF6B9D",
    glowClass: "shadow-[0_0_20px_rgba(179,136,255,0.3)]",
  },
  mono: {
    primary: "#FFFFFF",
    primaryDark: "#1A1A1A",
    accent: "#E0E0E0",
    accentGlow: "rgba(255,255,255,0.2)",
    gradient: "from-white via-gray-500 to-black",
    gradientText: "from-white via-gray-400 to-gray-700",
    gradientCTA: "from-white via-gray-600 to-black",
    cardShadow: "rgba(0,0,0,0.2)",
    blurPrimary: "rgba(255,255,255,0.1)",
    blurAccent: "rgba(0,0,0,0.1)",
    border: "rgba(255,255,255,0.2)",
    borderHover: "rgba(255,255,255,0.5)",
    ring: "#FFFFFF",
    particle1: "#FFFFFF",
    particle2: "#888888",
    glowClass: "shadow-[0_0_20px_rgba(255,255,255,0.2)]",
  },
};

export const themeLabels: Record<ThemeId, Record<string, string>> = {
  blue: { RU: "Синяя", EN: "Blue" },
  purple: { RU: "Фиолетовая", EN: "Purple" },
  mono: { RU: "Чёрно-белая", EN: "Monochrome" },
};
