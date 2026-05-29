import React, { useРеф, useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * HScroller — горизонтальная лента с кнопками ‹ › , свайпом и drag-мышью.
 *
 * Использование:
 *   <HScroller>
 *     <Card /> <Card /> <Card /> ...
 *   </HScroller>
 *
 * Каждый прямой потомок становится «слайдом». Управляй шириной слайда
 * через itemClassName (по умолчанию подходит для карточек).
 */
interface HScrollerProps {
  children: React.ReactNode;
  /** классы для контейнера-обёртки */
  className?: string;
  /** классы для каждого слайда (ширина/min-width) */
  itemClassName?: string;
  /** показывать кнопки-стрелки (на десктопе). По умолчанию true */
  arrows?: boolean;
  /** градиентные «затухания» по краям. По умолчанию true */
  fade?: boolean;
  /** на сколько px прокручивать по клику стрелки (по умолчанию ~85% ширины) */
  scrollAmount?: number;
}

export const HScroller = ({
  children,
  className = "",
  itemClassName = "w-[280px] sm:w-[320px]",
  arrows = true,
  fade = true,
  scrollAmount,
}: HScrollerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, children]);

  const scrollBy = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const amount = scrollAmount ?? Math.round(el.clientWidth * 0.85);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // --- drag-to-scroll мышью (на десктопе) ---
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
    // только мышь; на тач — нативный свайп
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const el = ref.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  // глушим клик после перетаскивания, чтобы случайно не нажать карточку
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Лента */}
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="flex gap-5 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hscroll-hide scroll-smooth select-none cursor-grab active:cursor-grabbing -mx-5 px-5 md:mx-0 md:px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {React.Children.map(children, (child, i) => (
          <div key={i} className={`flex-shrink-0 snap-start ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>

      {/* Затухания по краям */}
      {fade && (
        <>
          <div
            className={`pointer-events-none absolute left-0 top-0 bottom-4 w-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-300 hidden md:block ${canLeft ? "opacity-100" : "opacity-0"}`}
          />
          <div
            className={`pointer-events-none absolute right-0 top-0 bottom-4 w-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 hidden md:block ${canRight ? "opacity-100" : "opacity-0"}`}
          />
        </>
      )}

      {/* Стрелки (десктоп) */}
      {arrows && (
        <>
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-white/90 dark:bg-slate-800/90 border border-black/10 dark:border-white/15 text-slate-700 dark:text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 ${canLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-white/90 dark:bg-slate-800/90 border border-black/10 dark:border-white/15 text-slate-700 dark:text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 ${canRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};
