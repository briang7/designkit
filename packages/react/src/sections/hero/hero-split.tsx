import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface HeroSplitProps {
  headline: string;
  subheadline?: string;
  ctaPrimary?: React.ReactNode;
  ctaSecondary?: React.ReactNode;
  media?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function HeroSplit({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  media,
  bg,
  className,
}: HeroSplitProps) {
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
        className="mx-auto max-w-[var(--dk-section-max-width,1280px)] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        <div
          data-part="content"
          className="flex flex-col text-center md:text-left"
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
              className="text-dk-text-muted text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-balance mb-10"
            >
              {subheadline}
            </p>
          )}

          <div
            data-part="cta-group"
            className="flex flex-wrap gap-3 justify-center md:justify-start"
          >
            {ctaPrimary}
            {ctaSecondary}
          </div>
        </div>

        <div
          data-part="media"
          className="flex items-center justify-center order-first md:order-last [&>*]:max-w-full [&>*]:h-auto [&>*]:rounded-[var(--dk-radius-lg,0.75rem)]"
        >
          {media}
        </div>
      </div>
    </section>
  );
}
