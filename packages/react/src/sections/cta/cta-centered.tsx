import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface CtaCenteredProps {
  headline?: string;
  description?: string;
  cta?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function CtaCentered({
  headline,
  description,
  cta,
  bg,
  className,
}: CtaCenteredProps) {
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
        {headline && (
          <h2
            data-part="headline"
            className="font-[var(--dk-font-display,var(--dk-font-sans))] text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight tracking-tight text-balance text-dk-text mb-4"
          >
            {headline}
          </h2>
        )}

        {description && (
          <p
            data-part="description"
            className="text-dk-text-muted text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-balance mb-8 max-w-[640px]"
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
    </section>
  );
}
