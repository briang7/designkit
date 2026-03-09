import React from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface FeaturesAlternatingProps {
  headline?: string;
  subheadline?: string;
  children?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function FeaturesAlternating({
  headline,
  subheadline,
  children,
  bg,
  className,
}: FeaturesAlternatingProps) {
  // Apply reverse to even-indexed FeatureRow children
  const enhanced = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child) && i % 2 === 1) {
      return React.cloneElement(child as React.ReactElement<{ reverse?: boolean }>, {
        reverse: true,
      });
    }
    return child;
  });

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
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-dk-text m-0 mb-4"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                data-part="subheadline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-dk-text-muted m-0 max-w-[640px] mx-auto"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div data-part="rows" className="flex flex-col gap-16">
          {enhanced}
        </div>
      </div>
    </section>
  );
}
