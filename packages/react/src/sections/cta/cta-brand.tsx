import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface CtaBrandProps {
  headline?: string;
  description?: string;
  cta?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function CtaBrand({
  headline,
  description,
  cta,
  bg = 'brand',
  className,
}: CtaBrandProps) {
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
        className="mx-auto max-w-[var(--dk-section-max-width,1280px)] flex flex-col items-center text-center"
      >
        <div
          data-part="panel"
          className="bg-white/10 rounded-[var(--dk-radius-xl,1rem)] py-12 px-10 max-w-[720px] w-full backdrop-blur-sm"
        >
          {headline && (
            <h2
              data-part="headline"
              className="font-[var(--dk-font-display,var(--dk-font-sans))] text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight tracking-tight text-balance text-white mb-4"
            >
              {headline}
            </h2>
          )}

          {description && (
            <p
              data-part="description"
              className="text-white/85 text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-balance mb-8 max-w-[560px] mx-auto"
            >
              {description}
            </p>
          )}

          <div
            data-part="cta-group"
            className="flex flex-wrap gap-3 justify-center"
          >
            {cta}
          </div>
        </div>
      </div>
    </section>
  );
}
