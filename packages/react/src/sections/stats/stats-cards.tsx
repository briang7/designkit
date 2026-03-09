import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface StatsCardsProps {
  headline?: string;
  children?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function StatsCards({
  headline,
  children,
  bg,
  className,
}: StatsCardsProps) {
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
          <div data-part="header" className="text-center mb-12">
            <h2
              data-part="headline"
              className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-dk-text m-0"
            >
              {headline}
            </h2>
          </div>
        )}

        <div
          data-part="grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 [&>*]:p-6 [&>*]:bg-[var(--dk-color-surface,#ffffff)] [&>*]:border [&>*]:border-[var(--dk-color-border,#e5e7eb)] [&>*]:rounded-[var(--dk-radius-xl,1rem)]"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
