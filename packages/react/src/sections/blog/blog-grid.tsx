import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface BlogGridProps {
  headline?: string;
  subheadline?: string;
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

export function BlogGrid({
  headline,
  subheadline,
  bg = 'primary',
  className,
  children,
}: BlogGridProps) {
  return (
    <section
      data-part="section"
      className={cn(
        'py-[var(--dk-section-padding-y,5rem)] px-[var(--dk-section-padding-x,1.5rem)]',
        bgVariant(bg),
        className,
      )}
    >
      <div data-part="container" className="max-w-dk-section mx-auto">
        {(headline || subheadline) && (
          <div data-part="header" className="text-center mb-[var(--dk-space-12,3rem)]">
            {headline && <h2 data-part="headline">{headline}</h2>}
            {subheadline && (
              <p data-part="subheadline" className="text-dk-text-muted max-w-[640px] mx-auto">
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div
          data-part="grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--dk-space-8,2rem)] [&>*]:h-full"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
