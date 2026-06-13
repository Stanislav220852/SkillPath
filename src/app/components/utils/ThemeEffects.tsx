import { useContext, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../../App";

function useIsDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () => setDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/* ═══════════════════════════════════════════════════════════════
   BLUE THEME — Ocean Waves
   ═══════════════════════════════════════════════════════════════ */
const OceanWaves = () => {
  const dark = useIsDark();
  const m = dark ? 1 : 0.5; // multiplier for dark mode

  const waveData = useMemo(() => [
    { d: "M0,80 C120,120 240,40 360,80 C480,120 600,40 720,80 C840,120 960,40 1080,80 C1200,120 1320,40 1440,80 L1440,160 L0,160 Z", baseOp: 0.22, duration: 10, delay: 0, y: [0, -20, 0], top: "62%", height: 160 },
    { d: "M0,100 C180,60 360,120 540,80 C720,40 900,110 1080,70 C1260,30 1350,100 1440,90 L1440,160 L0,160 Z", baseOp: 0.14, duration: 14, delay: 1.5, y: [0, -14, 0], top: "70%", height: 140 },
    { d: "M0,110 C200,80 400,130 600,90 C800,50 1000,120 1200,80 C1300,60 1400,100 1440,100 L1440,160 L0,160 Z", baseOp: 0.09, duration: 18, delay: 3, y: [0, -8, 0], top: "78%", height: 120 },
    { d: "M0,120 C250,100 500,140 750,110 C1000,80 1250,130 1440,110 L1440,160 L0,160 Z", baseOp: 0.05, duration: 22, delay: 5, y: [0, -5, 0], top: "85%", height: 100 },
  ], []);

  const bubbles = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i, size: 3 + Math.random() * 18, left: `${5 + Math.random() * 90}%`,
    bottom: `${-3 + Math.random() * 20}%`, duration: 10 + Math.random() * 15,
    delay: Math.random() * 10, drift: (Math.random() - 0.5) * 70,
  })), []);

  const lightRays = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    id: i, left: `${12 + i * 18}%`, width: 2 + Math.random() * 3, angle: -15 + Math.random() * 30,
    opacity: (0.02 + Math.random() * 0.03) * m, duration: 8 + i * 2,
  })), [m]);

  return (
    <>
      {lightRays.map((ray) => (
        <motion.div key={`ray-${ray.id}`} className="pointer-events-none absolute top-0"
          style={{ left: ray.left, width: ray.width, height: "60%", background: `linear-gradient(180deg, var(--tp), transparent)`, opacity: ray.opacity, transform: `rotate(${ray.angle}deg)`, transformOrigin: "top center", filter: "blur(25px)" }}
          animate={{ opacity: [ray.opacity, ray.opacity * 2, ray.opacity] }}
          transition={{ duration: ray.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {waveData.map((w, i) => (
        <motion.div key={i} className="pointer-events-none absolute left-0 right-0"
          style={{ top: w.top, height: w.height, filter: i < 2 ? "none" : `blur(${(i - 1) * 1}px)` }}
          animate={{ y: w.y }}
          transition={{ duration: w.duration, repeat: Infinity, ease: "easeInOut", delay: w.delay }}
        >
          <svg viewBox="0 0 1440 160" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`wg${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--tp)" stopOpacity={w.baseOp * m * 1.5} />
                <stop offset="100%" stopColor="var(--tp)" stopOpacity={w.baseOp * m * 0.3} />
              </linearGradient>
            </defs>
            <path d={w.d} fill={`url(#wg${i})`} />
          </svg>
        </motion.div>
      ))}
      {bubbles.map((b) => (
        <motion.div key={`b-${b.id}`} className="absolute rounded-full"
          style={{ width: b.size, height: b.size, left: b.left, bottom: b.bottom,
            background: dark
              ? `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35), rgba(var(--tp-rgb),0.3))`
              : `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(var(--tp-rgb),0.15))`,
            border: dark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(var(--tp-rgb),0.1)",
          }}
          animate={{ y: [0, -(200 + Math.random() * 300)], x: [0, b.drift], opacity: [0, dark ? 0.5 : 0.3, 0], scale: [0.4, 1, 0.8, 0.2] }}
          transition={{ duration: b.duration, repeat: Infinity, delay: b.delay, ease: "easeOut" }}
        />
      ))}
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PURPLE THEME — Starry Sky + Planets + Comets
   ═══════════════════════════════════════════════════════════════ */
const CosmicGlow = () => {
  const dark = useIsDark();
  const m = dark ? 1 : 0.4;

  const starsFar = useMemo(() => Array.from({ length: dark ? 100 : 35 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 0.5 + Math.random() * 1, dur: 2 + Math.random() * 4, delay: Math.random() * 6,
  })), [dark]);

  const starsMid = useMemo(() => Array.from({ length: dark ? 50 : 18 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 1.2 + Math.random() * 2, dur: 1.5 + Math.random() * 3, delay: Math.random() * 5,
  })), [dark]);

  const starsBright = useMemo(() => Array.from({ length: dark ? 25 : 8 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 2.5 + Math.random() * 2.5, dur: 0.8 + Math.random() * 2, delay: Math.random() * 3,
  })), [dark]);

  const nebulae = useMemo(() => [], []);

  const planets = useMemo(() => [
    { x: "8%",  y: "18%", size: 90,  c1: "var(--tp)",     c2: "var(--tp-dark)", ring: true,  dur: 35, floatDur: 9 },
    { x: "85%", y: "55%", size: 72,  c1: "var(--ta)",     c2: "var(--tp-dark)", ring: true,  dur: 28, floatDur: 11 },
    { x: "50%", y: "80%", size: 48,  c1: "var(--tp)",     c2: "var(--ta)",      ring: false, dur: 42, floatDur: 7 },
    { x: "72%", y: "12%", size: 56,  c1: "var(--ta)",     c2: "var(--tp)",      ring: true,  dur: 38, floatDur: 10 },
    { x: "20%", y: "65%", size: 38,  c1: "var(--tp-dark)",c2: "var(--ta)",      ring: false, dur: 50, floatDur: 8 },
    { x: "60%", y: "35%", size: 28,  c1: "var(--tp)",     c2: "white",         ring: false, dur: 30, floatDur: 6 },
  ], []);

  const comets = useMemo(() => Array.from({ length: dark ? 5 : 2 }, (_, i) => ({
    id: i, startX: 10 + Math.random() * 60, startY: 2 + Math.random() * 20,
    angle: 30 + Math.random() * 20, length: 80 + Math.random() * 80,
    dur: 1.5 + Math.random() * 1, delay: i * 8 + Math.random() * 4, repeatDelay: 12 + Math.random() * 8,
  })), [dark]);

  return (
    <>
      {planets.map((p, i) => (
        <motion.div key={`planet-${i}`} className="pointer-events-none absolute" style={{ left: p.x, top: p.y }}
          animate={{ y: [0, -10, 0] }} transition={{ duration: p.floatDur, repeat: Infinity, ease: "easeInOut" }}
        >
          {p.ring && (
            <div className="absolute pointer-events-none"
              style={{ width: p.size * 1.8, height: p.size * 0.5, left: -p.size * 0.4, top: p.size * 0.3,
                border: `1.5px solid ${p.c1}`, borderRadius: "50%", transform: "rotateX(72deg)", opacity: dark ? 0.5 : 0.25 }} />
          )}
          <motion.svg width={p.size} height={p.size} viewBox="0 0 60 60"
            animate={{ rotate: 360 }} transition={{ duration: p.dur, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <radialGradient id={`pg${i}`} cx="35%" cy="35%">
                <stop offset="0%" stopColor={p.c1} stopOpacity={dark ? 1 : 0.7} />
                <stop offset="60%" stopColor={p.c2} stopOpacity={dark ? 0.6 : 0.35} />
                <stop offset="100%" stopColor={p.c2} stopOpacity={dark ? 0.15 : 0.08} />
              </radialGradient>
            </defs>
            <circle cx="30" cy="30" r="24" fill={`url(#pg${i})`} />
            <circle cx="30" cy="30" r="24" fill="none" stroke={p.c1} strokeWidth="0.5" strokeOpacity={dark ? 0.6 : 0.3} />
            <ellipse cx="22" cy="20" rx="5" ry="3" fill={p.c1} opacity={dark ? 0.2 : 0.1} transform="rotate(-15 22 20)" />
            <circle cx="37" cy="32" r="3" fill={p.c1} opacity={dark ? 0.12 : 0.07} />
          </motion.svg>
          {p.ring && (
            <div className="absolute pointer-events-none"
              style={{ width: p.size * 1.8, height: p.size * 0.5, left: -p.size * 0.4, top: p.size * 0.3,
                borderTop: `1.5px solid ${p.c1}`, borderLeft: "none", borderRight: "none", borderBottom: "none",
                borderRadius: "50%", transform: "rotateX(72deg)", opacity: dark ? 0.4 : 0.2 }} />
          )}
        </motion.div>
      ))}

      {starsFar.map((s) => (
        <motion.div key={`sf-${s.id}`} className="absolute rounded-full"
          style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%`,
            backgroundColor: dark ? "white" : "var(--tp)", opacity: dark ? 0.4 : 0.2 }}
          animate={{ opacity: [dark ? 0.2 : 0.1, dark ? 0.8 : 0.3, dark ? 0.2 : 0.1] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}

      {starsMid.map((s) => (
        <motion.div key={`sm-${s.id}`} className="absolute rounded-full"
          style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%`,
            backgroundColor: dark ? "white" : "var(--tp)",
            boxShadow: dark ? `0 0 ${s.size * 2}px rgba(255,255,255,0.6)` : "none" }}
          animate={{ opacity: [dark ? 0.3 : 0.12, dark ? 1 : 0.45, dark ? 0.3 : 0.12], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}

      {starsBright.map((s) => (
        <motion.div key={`sb-${s.id}`} className="absolute rounded-full"
          style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%`,
            backgroundColor: dark ? "white" : "var(--tp)",
            boxShadow: dark ? `0 0 ${s.size * 4}px rgba(255,255,255,0.8), 0 0 ${s.size * 8}px rgba(255,255,255,0.3)` : `0 0 ${s.size * 3}px rgba(var(--tp-rgb),0.35)` }}
          animate={{ opacity: [dark ? 0.25 : 0.1, dark ? 1 : 0.35, dark ? 0.25 : 0.1], scale: [0.6, 1.3, 0.6] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}

      {comets.map((c) => (
        <motion.div key={`comet-${c.id}`} className="pointer-events-none absolute"
          style={{ left: `${c.startX}%`, top: `${c.startY}%`, width: c.length, height: 2,
            background: `linear-gradient(${c.angle}deg, transparent, rgba(var(--tp-rgb),${dark ? 0.8 : 0.3}), var(--ta), ${dark ? "white" : "var(--tp)"})`,
            borderRadius: "50%", opacity: 0, transform: `rotate(${c.angle}deg)`, transformOrigin: "left center" }}
          animate={{ x: [0, 500], y: [0, 300], opacity: [0, dark ? 0.5 : 0.2, dark ? 0.5 : 0.2, 0], scaleX: [0.3, 1, 1, 0.5] }}
          transition={{ duration: c.dur, repeat: Infinity, delay: c.delay, repeatDelay: c.repeatDelay, ease: "easeIn" }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
            style={{ boxShadow: `0 0 8px 3px rgba(255,255,255,${dark ? 0.4 : 0.15}), 0 0 16px 6px rgba(var(--tp-rgb),${dark ? 0.25 : 0.1})` }} />
        </motion.div>
      ))}


    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MONO THEME — Geometric Grids + Objects
   ═══════════════════════════════════════════════════════════════ */
const GeometricGrid = () => {
  const dark = useIsDark();
  const op = dark ? 1 : 0.6;

  const hLines = useMemo(() => Array.from({ length: 10 }, (_, i) => ({ id: i, y: `${10 + i * 10}%`, delay: i * 0.4 })), []);
  const vLines = useMemo(() => Array.from({ length: 7 }, (_, i) => ({ id: i, x: `${12 + i * 14}%`, delay: i * 0.5 })), []);

  const polygons = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i, size: 20 + Math.random() * 70, x: `${5 + Math.random() * 85}%`, y: `${5 + Math.random() * 85}%`,
    rot: Math.random() * 360, delay: Math.random() * 5, type: i % 4,
  })), []);

  const nodes = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: 2 + Math.random() * 3, delay: Math.random() * 4,
  })), []);

  const connections = useMemo(() => {
    const pairs: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const b = nodes[Math.floor(Math.random() * nodes.length)];
      if (a && b) pairs.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, delay: i * 0.4 });
    }
    return pairs;
  }, [nodes]);

  const floatingSquares = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: i, size: 100 + Math.random() * 200, x: `${Math.random() * 80}%`, y: `${Math.random() * 80}%`,
    dur: 25 + Math.random() * 20, delay: Math.random() * 5,
  })), []);

  /* ── Rotating diamond ── */
  const diamond = useMemo(() => ({ x: "50%", y: "30%", size: 120, dur: 45 }), []);

  /* ── Pulsing circle ── */
  const pulsingCircle = useMemo(() => ({ x: "75%", y: "60%", size: 80, dur: 8 }), []);

  /* ── Floating triangle ── */
  const triangle = useMemo(() => ({ x: "20%", y: "45%", size: 60, dur: 35, floatDur: 10 }), []);

  return (
    <>
      {/* Grid lines */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full" style={{ opacity: 0.05 * op }}>
        {hLines.map((l) => (
          <motion.line key={`h-${l.id}`} x1="0%" y1={l.y} x2="100%" y2={l.y} stroke="var(--tp)" strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1], opacity: [0, 1] }}
            transition={{ duration: 4, delay: l.delay, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
          />
        ))}
        {vLines.map((l) => (
          <motion.line key={`v-${l.id}`} x1={l.x} y1="0%" x2={l.x} y2="100%" stroke="var(--tp)" strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1], opacity: [0, 1] }}
            transition={{ duration: 5, delay: l.delay, repeat: Infinity, repeatDelay: 7, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Connection lines */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full" style={{ opacity: 0.06 * op }}>
        {connections.map((c, i) => (
          <motion.line key={`conn-${i}`} x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`}
            stroke="var(--tp)" strokeWidth="0.4"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 5, delay: c.delay, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* ★ Rotating diamond outline */}
      <motion.div className="pointer-events-none absolute"
        style={{ left: diamond.x, top: diamond.y, width: diamond.size, height: diamond.size, marginLeft: -diamond.size / 2, marginTop: -diamond.size / 2 }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: diamond.dur, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full border border-[var(--tp)]/[0.12] rotate-45" />
        <div className="absolute inset-[15%] border border-[var(--tp)]/[0.08] rotate-45" />
      </motion.div>

      {/* ★ Pulsing concentric circles */}
      <motion.div className="pointer-events-none absolute"
        style={{ left: pulsingCircle.x, top: pulsingCircle.y, width: 0, height: 0 }}
      >
        {[0, 1, 2].map((ring) => (
          <motion.div key={ring} className="absolute rounded-full border border-[var(--tp)]"
            style={{ width: pulsingCircle.size + ring * 30, height: pulsingCircle.size + ring * 30,
              marginLeft: -(pulsingCircle.size + ring * 30) / 2,
              marginTop: -(pulsingCircle.size + ring * 30) / 2,
              opacity: 0.06 * op * (1 - ring * 0.3) }}
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.04 * op, 0.1 * op, 0.04 * op] }}
            transition={{ duration: pulsingCircle.dur, delay: ring * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute w-2 h-2 rounded-full bg-[var(--tp)] -ml-1 -mt-1" style={{ opacity: 0.15 * op }} />
      </motion.div>

      {/* ★ Floating triangle (SVG) */}
      <motion.div className="pointer-events-none absolute"
        style={{ left: triangle.x, top: triangle.y }}
        animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: triangle.floatDur, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width={triangle.size} height={triangle.size} viewBox="0 0 60 60" fill="none" style={{ opacity: 0.08 * op }}>
          <polygon points="30,5 55,50 5,50" stroke="var(--tp)" strokeWidth="1" fill="none" />
          <polygon points="30,18 44,44 16,44" stroke="var(--tp)" strokeWidth="0.5" fill="none" opacity="0.5" />
        </svg>
      </motion.div>

      {/* ★ Cross / plus shape */}
      <motion.div className="pointer-events-none absolute"
        style={{ left: "40%", top: "70%", opacity: 0.06 * op }}
        animate={{ rotate: [0, 90, 0], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <line x1="25" y1="5" x2="25" y2="45" stroke="var(--tp)" strokeWidth="1" />
          <line x1="5" y1="25" x2="45" y2="25" stroke="var(--tp)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Large floating rotating squares */}
      {floatingSquares.map((s) => (
        <motion.div key={`fsq-${s.id}`} className="pointer-events-none absolute border border-[var(--tp)]"
          style={{ width: s.size, height: s.size, left: s.x, top: s.y, opacity: 0.04 * op }}
          animate={{ rotate: [0, 90], opacity: [0.02 * op, 0.07 * op, 0.02 * op], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Floating polygons */}
      {polygons.map((p) => {
        const cls = p.type === 0 ? "rounded-full" : p.type === 1 ? "rounded-sm" : p.type === 2 ? "rounded-sm rotate-45" : "rounded-sm";
        return (
          <motion.div key={`poly-${p.id}`} className={`pointer-events-none absolute border border-[var(--tp)] ${cls}`}
            style={{ width: p.size, height: p.size, left: p.x, top: p.y, opacity: 0.06 * op }}
            animate={{ rotate: [p.rot, p.rot + 120, p.rot], y: [0, -15, 0], opacity: [0.03 * op, 0.1 * op, 0.03 * op], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 10 + p.id * 2, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        );
      })}

      {/* Node dots */}
      {nodes.map((n) => (
        <motion.div key={`node-${n.id}`} className="absolute rounded-full bg-[var(--tp)]"
          style={{ width: n.size, height: n.size, left: `${n.x}%`, top: `${n.y}%`, opacity: 0.06 * op }}
          animate={{ opacity: [0.04 * op, 0.2 * op, 0.04 * op], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: 4 + n.id * 0.3, repeat: Infinity, delay: n.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Scan line */}
      <motion.div className="pointer-events-none absolute left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 5%, var(--tp) 50%, transparent 95%)", opacity: 0.1 * op }}
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
export const ThemeEffects = () => {
  const { colorTheme } = useContext(LanguageContext);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {colorTheme === "blue" && <OceanWaves />}
      {colorTheme === "purple" && <CosmicGlow />}
      {colorTheme === "mono" && <GeometricGrid />}
    </div>
  );
};
