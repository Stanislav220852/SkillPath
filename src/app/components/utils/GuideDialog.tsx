import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { playTypeSound } from "./guideSounds";

interface GuideDialogProps {
  messages: string[];
  onClose: () => void;
  compact?: boolean;
}

export const GuideDialog: React.FC<GuideDialogProps> = ({ messages, onClose, compact }) => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(true);
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const msg = messages[msgIdx] || "";

  useEffect(() => {
    setText("");
    setTyping(true);
    let char = 0;
    if (ivRef.current) clearInterval(ivRef.current);
    ivRef.current = setInterval(() => {
      if (char < msg.length) {
        setText(msg.slice(0, char + 1));
        if (char % 5 === 0) playTypeSound();
        char++;
      } else {
        setTyping(false);
        if (ivRef.current) clearInterval(ivRef.current);
        closeTimer.current = setTimeout(() => {
          if (msgIdx < messages.length - 1) {
            setMsgIdx(i => i + 1);
          } else {
            onClose();
          }
        }, compact ? 1500 : 3000);
      }
    }, 35);

    return () => {
      if (ivRef.current) clearInterval(ivRef.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [msgIdx, msg, messages.length, onClose, compact]);

  const handleClick = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (typing) {
      setText(msg);
      setTyping(false);
      if (ivRef.current) clearInterval(ivRef.current);
      closeTimer.current = setTimeout(() => {
        if (msgIdx < messages.length - 1) setMsgIdx(i => i + 1);
        else onClose();
      }, 1500);
    } else if (msgIdx < messages.length - 1) {
      setMsgIdx(i => i + 1);
    } else {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 8 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="absolute bottom-full right-0 mb-3 w-[260px]
        bg-white/90 dark:bg-white/10 backdrop-blur-xl
        border border-black/10 dark:border-white/15
        rounded-2xl p-3 shadow-lg
        cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="absolute bottom-[-6px] right-6 w-3 h-3 rotate-45
        bg-white/90 dark:bg-white/10 border-r border-b border-black/10 dark:border-white/15" />

      <button onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-1.5 right-1.5 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
        <X className="w-3 h-3 text-slate-400 dark:text-white/50" />
      </button>

      <p className="text-[13px] text-slate-700 dark:text-white/90 pr-4 min-h-[32px] leading-relaxed">
        {text}
        {typing && <span className="inline-block w-[2px] h-3.5 ml-0.5 bg-[var(--tp)] animate-pulse align-middle" />}
      </p>

      <div className="flex gap-1 mt-2 pt-1.5 border-t border-black/5 dark:border-white/10">
        {messages.map((_, i) => (
          <div key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === msgIdx ? "bg-[var(--tp)]" : i < msgIdx ? "bg-[var(--ta)]" : "bg-black/10 dark:bg-white/15"
            }`} />
        ))}
      </div>
    </motion.div>
  );
};
