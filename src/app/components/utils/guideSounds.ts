let audioCtx: AudioContext | null = null;
let ready = false;

function getCtx(): AudioContext | null {
  if (!audioCtx) {
    try {
      audioCtx = new AudioContext();
    } catch { return null; }
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Init on first user gesture (click/touch anywhere)
if (typeof window !== "undefined") {
  const init = () => {
    ready = true;
    getCtx();
    window.removeEventListener("click", init);
    window.removeEventListener("touchstart", init);
    window.removeEventListener("keydown", init);
  };
  window.addEventListener("click", init, { once: false });
  window.addEventListener("touchstart", init, { once: false });
  window.addEventListener("keydown", init, { once: false });
}

// Soft mechanical keyboard click — ASMR style
export function playTypeSound() {
  if (!ready) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Click — filtered noise burst
    const bufSize = Math.floor(ctx.sampleRate * 0.015);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.12));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2000 + Math.random() * 2000;
    filter.Q.value = 0.7;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.04, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.025);

    // Low thud
    const thud = ctx.createOscillator();
    const tGain = ctx.createGain();
    thud.type = "sine";
    thud.frequency.value = 120 + Math.random() * 100;
    tGain.gain.setValueAtTime(0, now);
    tGain.gain.linearRampToValueAtTime(0.025, now + 0.001);
    tGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    thud.connect(tGain);
    tGain.connect(ctx.destination);
    thud.start(now);
    thud.stop(now + 0.035);
  } catch {}
}

// Pleasant chime
export function playItemSound() {
  if (!ready) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = now + i * 0.08;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.01);
      gain.gain.setValueAtTime(0.12, t + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  } catch {}
}

// Soft greeting jingle
export function playGreetingSound() {
  if (!ready) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    [392, 493.88, 587.33, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = now + i * 0.1;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.015);
      gain.gain.setValueAtTime(0.1, t + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    });
  } catch {}
}
