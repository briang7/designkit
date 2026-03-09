import React from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface CategoriesGridProps {
  headline?: string;
  subheadline?: string;
  columns?: number;
  children: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function CategoriesGrid({
  headline,
  subheadline,
  columns = 3,
  children,
  bg,
  className,
}: CategoriesGridProps) {
  const childArray = React.Children.toArray(children);
  const count = childArray.length;
  const minForSpan = columns * 2 - 1;
  const hasRows = count >= minForSpan;

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
        <div
          data-part="grid"
          className={cn(
            'grid gap-6 auto-rows-[minmax(200px,1fr)]',
            `grid-cols-[repeat(var(--dk-categories-columns,${columns}),1fr)]`,
            'max-lg:grid-cols-2 max-sm:grid-cols-1',
          )}
          style={{ '--dk-categories-columns': columns } as React.CSSProperties}
        >
          {childArray.map((child, i) => (
            <div
              key={i}
              className={cn(
                i === 0 && hasRows && 'row-span-2 max-sm:row-span-1',
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
