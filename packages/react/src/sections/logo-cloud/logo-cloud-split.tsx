import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface LogoCloudSplitProps {
  headline?: string;
  description?: string;
  cta?: ReactNode;
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

export function LogoCloudSplit({
  headline,
  description,
  cta,
  bg = 'primary',
  className,
  children,
}: LogoCloudSplitProps) {
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
        className="max-w-dk-section mx-auto grid grid-cols-1 md:grid-cols-2 gap-[var(--dk-space-12,3rem)] items-center"
      >
        <div data-part="content" className="flex flex-col max-md:text-center">
          {headline && (
            <h2 data-part="headline">{headline}</h2>
          )}
          {description && (
            <p data-part="description" className="text-dk-text-muted">
              {description}
            </p>
          )}
          {cta && (
            <div
              data-part="cta-group"
              className="flex gap-[var(--dk-space-3,0.75rem)] flex-wrap mt-[var(--dk-space-6,1.5rem)] max-md:justify-center"
            >
              {cta}
            </div>
          )}
        </div>
        <div
          data-part="logos"
          className={cn(
            'grid grid-cols-3 max-md:grid-cols-2 gap-[var(--dk-logo-cloud-split-gap,2rem)] items-center justify-items-center',
            '[&>*]:grayscale [&>*]:opacity-60 [&>*]:transition-all [&>*]:duration-300',
            '[&>*]:max-h-[var(--dk-logo-cloud-logo-height,40px)] [&>*]:w-auto',
            '[&>*:hover]:grayscale-0 [&>*:hover]:opacity-100',
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
