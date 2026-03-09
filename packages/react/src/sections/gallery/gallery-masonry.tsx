import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface GalleryMasonryProps {
  headline?: string;
  columns?: number;
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

export function GalleryMasonry({
  headline,
  columns = 3,
  bg,
  className,
  children,
}: GalleryMasonryProps) {
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
          data-part="masonry"
          className={cn(
            'gap-[var(--dk-space-6,1.5rem)]',
            'max-lg:columns-2 max-md:columns-1',
            '[&>*]:break-inside-avoid [&>*]:mb-[var(--dk-space-6,1.5rem)] [&>*]:block',
          )}
          style={{ columnCount: columns }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
