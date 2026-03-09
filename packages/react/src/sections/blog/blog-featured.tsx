import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface BlogFeaturedProps {
  headline?: string;
  subheadline?: string;
  featured?: ReactNode;
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

export function BlogFeatured({
  headline,
  subheadline,
  featured,
  bg = 'primary',
  className,
  children,
}: BlogFeaturedProps) {
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
          data-part="layout"
          className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-[var(--dk-space-8,2rem)]"
        >
          <div data-part="featured" className="[&>*]:h-full">
            {featured}
          </div>
          <div data-part="sidebar" className="flex flex-col gap-[var(--dk-space-6,1.5rem)] [&>*]:flex-1">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
