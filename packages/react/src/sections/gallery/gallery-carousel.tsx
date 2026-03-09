'use client';

import { useRef, useCallback, type ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface GalleryCarouselProps {
  headline?: string;
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

export function GalleryCarousel({
  headline,
  bg,
  className,
  children,
}: GalleryCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 5) return;
    e.preventDefault();
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
    track.scrollLeft += delta;
    clearTimeout(snapTimerRef.current);
    snapTimerRef.current = setTimeout(() => {
      track.style.scrollBehavior = 'smooth';
      track.style.scrollSnapType = 'x mandatory';
    }, 200);
  }, []);

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
        {headline && (
          <div className="text-center mb-10">
            <h2
              data-part="headline"
              className="font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-dk-text"
            >
              {headline}
            </h2>
          </div>
        )}
        <div
          ref={trackRef}
          data-part="track"
          className={cn(
            'flex gap-[var(--dk-space-4,1rem)]',
            'overflow-x-auto scroll-smooth snap-x snap-mandatory',
            'pb-[var(--dk-space-2,0.5rem)]',
            'scrollbar-none [&::-webkit-scrollbar]:hidden',
            '[&>*]:flex-[0_0_300px] [&>*]:snap-start',
            'max-md:[&>*]:flex-[0_0_260px]',
          )}
          onWheel={handleWheel}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
