import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface ProductsGridProps {
  headline?: string;
  subheadline?: string;
  columns?: 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

const colsMap: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

export function ProductsGrid({
  headline,
  subheadline,
  columns = 4,
  children,
  bg,
  className,
}: ProductsGridProps) {
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
            'grid gap-6',
            colsMap[columns] || 'grid-cols-4',
            columns >= 4 && 'max-lg:grid-cols-2',
            'max-md:!grid-cols-1',
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
