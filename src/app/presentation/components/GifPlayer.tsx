import { useState } from 'react';
import { motion } from 'framer-motion';

interface GifPlayerProps {
  src: string;
  alt: string;
  caption?: string;
}

export function GifPlayer({ src, alt, caption }: GifPlayerProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/30 pointer-events-none z-10" />

      <motion.div
        className="rounded-2xl overflow-hidden bg-zinc-900"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            className="w-full aspect-video object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-zinc-400 text-sm font-medium">{alt}</p>
            <p className="text-zinc-600 text-xs mt-1">Положи GIF в: public/gifs/</p>
          </div>
        )}
      </motion.div>

      {caption && (
        <p className="text-center text-zinc-500 mt-4 text-sm">{caption}</p>
      )}
    </div>
  );
}
