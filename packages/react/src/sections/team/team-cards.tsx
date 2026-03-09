import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface TeamCardsProps {
  headline?: string;
  subheadline?: string;
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

export function TeamCards({
  headline,
  subheadline,
  bg,
  className,
  children,
}: TeamCardsProps) {
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
          <div className="text-center mb-12" data-part="header">
            {headline && (
              <h2
                data-part="headline"
                className="font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-dk-text mb-4"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                data-part="subheadline"
                className="font-sans text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-dk-text-muted max-w-[640px] mx-auto"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div
          data-part="grid"
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--dk-space-8,2rem)]',
            'max-md:max-w-[400px] max-md:mx-auto',
            '[&>*]:bg-[var(--dk-color-surface,#ffffff)]',
            '[&>*]:rounded-xl',
            '[&>*]:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]',
            '[&>*]:overflow-hidden',
            '[&>*]:transition-[box-shadow,transform] [&>*]:duration-200 [&>*]:ease-out',
            'hover:[&>*]:shadow-[0_10px_25px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.05)]',
            'hover:[&>*]:-translate-y-0.5',
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
