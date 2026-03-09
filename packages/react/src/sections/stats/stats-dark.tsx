import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface StatsDarkProps {
  headline?: string;
  children?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function StatsDark({
  headline,
  children,
  bg = 'dark',
  className,
}: StatsDarkProps) {
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
              className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-[#f9fafb] m-0"
            >
              {headline}
            </h2>
          </div>
        )}

        <div
          data-part="stats-row"
          className="flex justify-center items-start flex-wrap gap-0 max-md:flex-col max-md:items-center [&>*]:flex-[1_1_180px] [&>*]:min-w-[140px] [&>*]:px-8 [&>*]:py-6 [&>*]:[--dk-color-text:#f9fafb] [&>*]:[--dk-color-text-muted:#d1d5db]"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
