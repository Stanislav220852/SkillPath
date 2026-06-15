import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SlideNav } from './components/SlideNav';

import { Slide01Title } from './slides/Slide01Title';
import { Slide02Problem } from './slides/Slide02Problem';
import { Slide03Solution } from './slides/Slide03Solution';
import { Slide04HowItWorks } from './slides/Slide04HowItWorks';
import { Slide05GifHero } from './slides/Slide05GifHero';
import { Slide06Professions } from './slides/Slide06Professions';
import { Slide07GifQuiz } from './slides/Slide07GifQuiz';
import { Slide08QuizDetail } from './slides/Slide08QuizDetail';
import { Slide09Roadmaps } from './slides/Slide09Roadmaps';
import { Slide10GifRoadmap } from './slides/Slide10GifRoadmap';
import { Slide11Mentors } from './slides/Slide11Mentors';
import { Slide12Community } from './slides/Slide12Community';
import { Slide13Bento } from './slides/Slide13Bento';
import { Slide14Stats } from './slides/Slide14Stats';
import { Slide15Testimonials } from './slides/Slide15Testimonials';
import { Slide16Companies } from './slides/Slide16Companies';
import { Slide17GifFullDemo } from './slides/Slide17GifFullDemo';
import { Slide19TechStack } from './slides/Slide19TechStack';
import { Slide20Gamification } from './slides/Slide20Gamification';
import { Slide21Mobile } from './slides/Slide21Mobile';
import { Slide22FuturePlans } from './slides/Slide22FuturePlans';
import { Slide23Comparison } from './slides/Slide23Comparison';
import { Slide24CTA } from './slides/Slide24CTA';

const slides = [
  Slide01Title, Slide02Problem, Slide03Solution, Slide04HowItWorks,
  Slide05GifHero, Slide06Professions, Slide07GifQuiz, Slide08QuizDetail,
  Slide09Roadmaps, Slide10GifRoadmap, Slide11Mentors, Slide12Community,
  Slide13Bento, Slide14Stats, Slide15Testimonials, Slide16Companies,
  Slide17GifFullDemo, Slide19TechStack, Slide20Gamification,
  Slide21Mobile, Slide22FuturePlans, Slide23Comparison, Slide24CTA,
];

interface PresentationProps {
  onExit: () => void;
}

export function Presentation({ onExit }: PresentationProps) {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => setCurrent((p) => Math.min(p + 1, slides.length - 1)), []);
  const goPrev = useCallback(() => setCurrent((p) => Math.max(p - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goPrev(); }
      else if (e.key === 'Escape') { e.preventDefault(); onExit(); }
      else if (e.key === 'Home') { e.preventDefault(); setCurrent(0); }
      else if (e.key === 'End') { e.preventDefault(); setCurrent(slides.length - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, onExit]);

  useEffect(() => { window.scrollTo(0, 0); }, [current]);

  const CurrentSlide = slides[current];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <SlideNav current={current} total={slides.length} onPrev={goPrev} onNext={goNext} />

      <button
        onClick={onExit}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
        title="Выйти из презентации (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
