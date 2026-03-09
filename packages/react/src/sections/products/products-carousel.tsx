'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface ProductsCarouselProps {
  headline?: string;
  subheadline?: string;
  children: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function ProductsCarousel({
  headline,
  subheadline,
  children,
  bg,
  className,
}: ProductsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const snapTimerRef = useRef<number>();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateScrollButtons, { passive: true });
    requestAnimationFrame(updateScrollButtons);
    return () => track.removeEventListener('scroll', updateScrollButtons);
  }, [updateScrollButtons]);

  const scrollPrev = () => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' });
  };

  const scrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  };

  const onWheel = (e: React.WheelEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 5) return;
    e.preventDefault();
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
    track.scrollLeft += delta;
    clearTimeout(snapTimerRef.current);
    snapTimerRef.current = window.setTimeout(() => {
      if (!track) return;
      track.style.scrollBehavior = 'smooth';
      track.style.scrollSnapType = 'x mandatory';
    }, 200);
  };

  const isDarkBg = bg === 'brand' || bg === 'dark';

  return (
    <section
      data-part="section"
      className={cn(
        'py-[var(--dk-section-padding-y,5rem)] px-[var(--dk-section-padding-x,1.5rem)]',
        bgVariant(bg),
        className,
      )}
    >
      <div
        data-part="container"
        className="mx-auto max-w-[var(--dk-section-max-width,1280px)]"
      >
        {(headline || subheadline) && (
          <div data-part="header" className="text-center mb-12">
            {headline && (
              <h2
                data-part="headline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight text-dk-text mb-4 tracking-tight"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                data-part="subheadline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-dk-text-muted max-w-[640px] mx-auto m-0"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div data-part="carousel" className="relative overflow-hidden">
          <div
            ref={trackRef}
            data-part="track"
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:flex-[0_0_calc(25%-1.5rem*3/4)] [&>*]:min-w-[240px] [&>*]:snap-start max-lg:[&>*]:flex-[0_0_calc(50%-0.75rem)] max-sm:[&>*]:flex-[0_0_85%]"
            onWheel={onWheel}
          >
            {children}
          </div>
        </div>
        <div data-part="controls" className="flex justify-center items-center gap-4 mt-8">
          <button
            data-part="prev-btn"
            aria-label="Previous products"
            disabled={!canScrollLeft}
            onClick={scrollPrev}
            className={cn(
              'flex items-center justify-center w-11 h-11 rounded-full border cursor-pointer transition-all active:scale-95 disabled:opacity-40 disabled:cursor-default disabled:pointer-events-none',
              isDarkBg
                ? 'bg-white/10 border-white/25 text-white hover:bg-white/20 hover:border-white/50'
                : 'bg-[var(--dk-color-surface,#ffffff)] border-[var(--dk-color-border,#e5e7eb)] text-dk-text hover:bg-[var(--dk-color-neutral-50,#f9fafb)] hover:border-[var(--dk-color-primary,#3b82f6)] hover:shadow-sm',
            )}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            data-part="next-btn"
            aria-label="Next products"
            disabled={!canScrollRight}
            onClick={scrollNext}
            className={cn(
              'flex items-center justify-center w-11 h-11 rounded-full border cursor-pointer transition-all active:scale-95 disabled:opacity-40 disabled:cursor-default disabled:pointer-events-none',
              isDarkBg
                ? 'bg-white/10 border-white/25 text-white hover:bg-white/20 hover:border-white/50'
                : 'bg-[var(--dk-color-surface,#ffffff)] border-[var(--dk-color-border,#e5e7eb)] text-dk-text hover:bg-[var(--dk-color-neutral-50,#f9fafb)] hover:border-[var(--dk-color-primary,#3b82f6)] hover:shadow-sm',
            )}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
