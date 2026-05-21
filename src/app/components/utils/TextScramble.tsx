import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export const TextScramble = ({
  text,
  className = "",
  speed = 30,
  delay = 0,
}: TextScrambleProps) => {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number>(0);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);

  useEffect(() => {
    const length = text.length;
    const startQueue: typeof queueRef.current = [];
    for (let i = 0; i < length; i++) {
      startQueue.push({
        from: CHARS[Math.floor(Math.random() * CHARS.length)],
        to: text[i],
        start: Math.floor(Math.random() * 20),
        end: Math.floor(Math.random() * 20) + 20,
      });
    }
    queueRef.current = startQueue;

    let frame = 0;
    const animate = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < length; i++) {
        const q = queueRef.current[i];
        if (frame >= q.end) {
          complete++;
          output += q.to;
        } else if (frame >= q.start) {
          if (!q.char || Math.random() < 0.28) {
            q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          output += q.char;
        } else {
          output += q.from;
        }
      }
      setDisplay(output);
      if (complete === length) {
        cancelAnimationFrame(frameRef.current);
        return;
      }
      frame++;
      frameRef.current = requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay]);

  return <span className={className}>{display}</span>;
};