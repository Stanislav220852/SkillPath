import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX, ChevronDown, Disc3, ExternalLink } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import { LanguageContext } from "../../App";

interface MusicPlayerProps {
  onPlayStateChange?: (playing: boolean) => void;
}

// These are REGULAR YouTube videos (NOT livestreams) that embed properly.
// Replace with your own preferred lofi video IDs.
const LOFI_VIDEO = "JCKBaJDRMw4"; // "1 A.M Study Session" by Lofi Girl

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ onPlayStateChange }) => {
  const { lang } = useContext(LanguageContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube iframe postMessage API
  const sendCommand = useCallback((command: string, args?: any) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(JSON.stringify({
      event: "command",
      func: command,
      args: args || [],
    }), "*");
  }, []);

  useEffect(() => { onPlayStateChange?.(isPlaying); }, [isPlaying, onPlayStateChange]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      sendCommand("pauseVideo");
      setIsPlaying(false);
    } else {
      sendCommand("playVideo");
      setIsPlaying(true);
    }
  }, [isPlaying, sendCommand]);

  useEffect(() => {
    sendCommand("setVolume", [isMuted ? 0 : volume]);
  }, [volume, isMuted, sendCommand]);

  const embedUrl = `https://www.youtube.com/embed/${LOFI_VIDEO}?enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}&autoplay=0&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&mute=0`;

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-5 z-50 w-[320px] rounded-2xl overflow-hidden
              bg-white/80 dark:bg-white/5 backdrop-blur-xl
              border border-black/10 dark:border-white/10
              shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            {/* YouTube video thumbnail / embed */}
            <div className="relative w-full h-[180px] bg-black">
              <iframe
                ref={iframeRef}
                className="absolute inset-0 w-full h-full"
                src={embedUrl}
                allow="autoplay; encrypted-media"
                allowFullScreen={false}
                title="Lofi Music"
              />
            </div>

            {/* Controls */}
            <div className="px-4 pt-3 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Disc3 className={`w-4 h-4 text-[var(--tp)] ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/40">
                    {lang === "RU" ? "Музыка" : "Music"}
                  </span>
                </div>
                <button onClick={() => setIsExpanded(false)} className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-white/50" />
                </button>
              </div>

              <p className="text-sm font-bold text-slate-800 dark:text-white truncate mb-1">
                {lang === "RU" ? "Lofi Girl" : "Lofi Girl"}
              </p>
              <p className="text-xs text-slate-500 dark:text-white/50 truncate mb-3">
                {lang === "RU" ? "Чилл биты для учёбы" : "Chill beats to study to"}
              </p>

              {/* Play/Pause */}
              <div className="flex items-center justify-center mb-3">
                <motion.button whileTap={{ scale: 0.9 }} onClick={togglePlay}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                  style={{ background: "linear-gradient(135deg, var(--tp), var(--tp-dark))", boxShadow: "0 0 15px rgba(var(--tp-rgb), 0.3)" }}>
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </motion.button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMuted(m => !m)} className="p-1">
                  {isMuted
                    ? <VolumeX className="w-3.5 h-3.5 text-slate-400 dark:text-white/50" />
                    : <Volume2 className="w-3.5 h-3.5 text-slate-400 dark:text-white/50" />}
                </button>
                <Slider.Root className="relative flex-1 h-1 bg-black/10 dark:bg-white/10 rounded-full cursor-pointer"
                  value={[isMuted ? 0 : volume]} onValueChange={([v]) => { setVolume(v); setIsMuted(false); }} max={100} step={1}>
                  <Slider.Track className="relative h-full rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
                    <Slider.Range className="absolute h-full rounded-full" style={{ background: "linear-gradient(to right, var(--tp), var(--ta))" }} />
                  </Slider.Track>
                  <Slider.Thumb className="block w-3 h-3 rounded-full bg-white shadow-md border-2 border-[var(--tp)] cursor-grab active:cursor-grabbing focus:outline-none" />
                </Slider.Root>
              </div>

              {/* Open in YouTube link */}
              <a
                href={`https://www.youtube.com/watch?v=${LOFI_VIDEO}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 mt-3 text-[10px] text-slate-400 dark:text-white/30 hover:text-[var(--tp)] transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {lang === "RU" ? "Открыть в YouTube" : "Open in YouTube"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(e => !e)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center
          bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/15
          shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
          hover:shadow-[0_4px_25px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_4px_25px_rgba(0,0,0,0.4)] transition-shadow"
        style={{ boxShadow: isPlaying ? `0 0 20px rgba(var(--tp-rgb), 0.3)` : undefined }}>
        <motion.div animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}>
          <Music className={`w-6 h-6 ${isPlaying ? "text-[var(--tp)]" : "text-slate-600 dark:text-white/70"}`} />
        </motion.div>
        {isPlaying && (
          <motion.div className="absolute inset-0 rounded-full border-2 border-[var(--tp)]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        )}
      </motion.button>
    </>
  );
};
