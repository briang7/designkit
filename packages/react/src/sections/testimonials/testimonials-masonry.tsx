import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface TestimonialsMasonryProps {
  headline?: string;
  subheadline?: string;
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

export function TestimonialsMasonry({
  headline,
  subheadline,
  bg = 'primary',
  className,
  children,
}: TestimonialsMasonryProps) {
  return (
    <section
      className={cn(
        'block py-20 px-6',
        bgVariant(bg),
        className,
      )}
      data-part="section"
    >
      <div className="max-w-[1200px] mx-auto" data-part="container">
        {(headline || subheadline) && (
          <div className="text-center mb-12" data-part="header">
            {headline && (
              <h2
                className={cn(
                  'font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight mb-4',
                  bg === 'brand' || bg === 'dark' ? 'text-white' : 'text-[var(--dk-color-text,#111827)]',
                )}
                data-part="headline"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className={cn(
                  'font-sans text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed max-w-[640px] mx-auto',
                  bg === 'brand' || bg === 'dark' ? 'text-white/90' : 'text-[var(--dk-color-text-muted,#6b7280)]',
                )}
                data-part="subheadline"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div
          className="columns-1 md:columns-2 lg:columns-3 gap-6 [&>*]:inline-block [&>*]:w-full [&>*]:break-inside-avoid [&>*]:mb-6"
          data-part="masonry"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
