'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface TestimonialsCarouselProps {
  headline?: string;
  autoplay?: boolean;
  interval?: number;
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

export function TestimonialsCarousel({
  headline,
  autoplay = false,
  interval = 5000,
  bg = 'primary',
  className,
  children,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  // Count children
  useEffect(() => {
    const count = Array.isArray(children)
      ? children.filter(Boolean).length
      : children
        ? 1
        : 0;
    setSlideCount(count);
  }, [children]);

  // Responsive visible count
  useEffect(() => {
    function updateVisible() {
      const w = window.innerWidth;
      if (w >= 1024) setVisibleCount(3);
      else if (w >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    }
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, slideCount - visibleCount);

  // Clamp index when maxIndex changes
  useEffect(() => {
    setCurrentIndex(prev => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const next = useCallback(() => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (index: number) => setCurrentIndex(Math.min(index, maxIndex)),
    [maxIndex],
  );

  // Autoplay timer
  useEffect(() => {
    if (!autoplay || interval <= 0 || slideCount <= 1) return;
    const timer = window.setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, slideCount, next]);

  const pct = currentIndex * (100 / visibleCount);
  const isDark = bg === 'brand' || bg === 'dark';

  return (
    <section
      className={cn('block py-20 px-6', bgVariant(bg), className)}
      data-part="section"
    >
      <div className="max-w-[1200px] mx-auto" data-part="container">
        {headline && (
          <div className="text-center mb-12" data-part="header">
            <h2
              className={cn(
                'font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight mb-4',
                isDark ? 'text-white' : 'text-[var(--dk-color-text,#111827)]',
              )}
              data-part="headline"
            >
              {headline}
            </h2>
          </div>
        )}

        <div className="relative overflow-hidden" data-part="carousel">
          <div
            className="flex items-stretch transition-transform duration-500 ease-out"
            data-part="track"
            style={{ transform: `translateX(-${pct}%)` }}
          >
            {Array.isArray(children)
              ? children.filter(Boolean).map((child, i) => (
                  <div
                    key={i}
                    className={cn(
                      'shrink-0 p-2 box-border',
                      'basis-full md:basis-1/2 lg:basis-1/3',
                    )}
                  >
                    {child}
                  </div>
                ))
              : children && (
                  <div className="shrink-0 p-2 box-border basis-full md:basis-1/2 lg:basis-1/3">
                    {children}
                  </div>
                )}
          </div>
        </div>

        {slideCount > 1 && (
          <div
            className="flex justify-center items-center gap-4 mt-8"
            data-part="controls"
          >
            <button
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full',
                'border border-[var(--dk-color-border,#e5e7eb)]',
                'bg-[var(--dk-color-surface,#ffffff)] text-[var(--dk-color-text,#111827)]',
                'cursor-pointer transition-[background,border-color] duration-150',
                'hover:bg-[var(--dk-color-neutral-50,#f9fafb)] hover:border-[var(--dk-color-primary,#3b82f6)]',
              )}
              data-part="arrow-prev"
              aria-label="Previous slide"
              onClick={prev}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="flex gap-2" data-part="dots">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  className={cn(
                    'w-2 h-2 rounded-full border-0 p-0 cursor-pointer transition-[background,transform] duration-150',
                    i === currentIndex
                      ? 'bg-[var(--dk-color-primary,#3b82f6)] scale-125'
                      : 'bg-[var(--dk-color-neutral-200,#e5e7eb)]',
                  )}
                  aria-current={i === currentIndex ? 'true' : undefined}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <button
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full',
                'border border-[var(--dk-color-border,#e5e7eb)]',
                'bg-[var(--dk-color-surface,#ffffff)] text-[var(--dk-color-text,#111827)]',
                'cursor-pointer transition-[background,border-color] duration-150',
                'hover:bg-[var(--dk-color-neutral-50,#f9fafb)] hover:border-[var(--dk-color-primary,#3b82f6)]',
              )}
              data-part="arrow-next"
              aria-label="Next slide"
              onClick={next}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
