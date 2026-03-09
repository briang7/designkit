import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';

export interface TestimonialsDarkProps {
  headline?: string;
  subheadline?: string;
  className?: string;
  children?: ReactNode;
}

export function TestimonialsDark({
  headline,
  subheadline,
  className,
  children,
}: TestimonialsDarkProps) {
  return (
    <section
      className={cn(
        'block py-20 px-6 bg-[var(--dk-color-dark-bg,#0f172a)] text-[#f9fafb]',
        className,
      )}
      style={{
        '--dk-color-text': '#f9fafb',
        '--dk-color-text-muted': '#9ca3af',
        '--dk-color-surface': 'rgba(255,255,255,0.06)',
        '--dk-color-border': 'rgba(255,255,255,0.1)',
        '--dk-color-primary-subtle': 'rgba(96,165,250,0.15)',
      } as React.CSSProperties}
      data-part="section"
    >
      <div className="max-w-[1200px] mx-auto" data-part="container">
        {(headline || subheadline) && (
          <div className="text-center mb-12" data-part="header">
            {headline && (
              <h2
                className="font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight mb-4 text-[#f9fafb]"
                data-part="headline"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="font-sans text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed max-w-[640px] mx-auto text-[#9ca3af]"
                data-part="subheadline"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-part="grid"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
