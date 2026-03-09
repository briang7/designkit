import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface HeroCenteredProps {
  headline: string;
  subheadline?: string;
  ctaPrimary?: React.ReactNode;
  ctaSecondary?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function HeroCentered({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  bg,
  className,
}: HeroCenteredProps) {
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
        <h1
          data-part="headline"
          className="font-[var(--dk-font-display,var(--dk-font-sans))] text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-tight tracking-tight text-balance text-dk-text mb-5"
        >
          {headline}
        </h1>

        {subheadline && (
          <p
            data-part="subheadline"
            className="text-dk-text-muted text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-balance mb-10 max-w-[640px]"
          >
            {subheadline}
          </p>
        )}

        <div
          data-part="cta-group"
          className="flex flex-wrap gap-3 justify-center"
        >
          {ctaPrimary}
          {ctaSecondary}
        </div>
      </div>
    </section>
  );
}
