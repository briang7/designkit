import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';

export interface PricingDarkProps {
  headline?: string;
  subheadline?: string;
  className?: string;
  children?: ReactNode;
}

export function PricingDark({
  headline,
  subheadline,
  className,
  children,
}: PricingDarkProps) {
  return (
    <section
      className={cn(
        'block py-20 px-6 bg-[var(--dk-color-dark-bg,#111827)]',
        className,
      )}
      style={{
        '--dk-color-text': '#ffffff',
        '--dk-color-text-muted': '#9ca3af',
        '--dk-color-surface': '#1f2937',
        '--dk-color-border': '#374151',
      } as React.CSSProperties}
      data-part="section"
    >
      <div className="max-w-[1200px] mx-auto" data-part="container">
        {(headline || subheadline) && (
          <div className="text-center mb-12" data-part="header">
            {headline && (
              <h2
                className="font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight mb-4 text-white"
                data-part="headline"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="font-sans text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed max-w-[640px] mx-auto text-[var(--dk-color-dark-text-muted,#9ca3af)]"
                data-part="subheadline"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-md:max-w-[400px] max-md:mx-auto"
          data-part="grid"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
