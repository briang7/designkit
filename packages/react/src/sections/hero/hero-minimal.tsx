import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface HeroMinimalProps {
  headline: string;
  subheadline?: string;
  ctaPrimary?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function HeroMinimal({
  headline,
  subheadline,
  ctaPrimary,
  bg,
  className,
}: HeroMinimalProps) {
  return (
    <section
      data-part="section"
      className={cn(
        'relative flex min-h-[var(--dk-hero-minimal-min-height,100vh)] items-center justify-center py-[var(--dk-section-padding-y,5rem)] px-[var(--dk-section-padding-x,1.5rem)]',
        bgVariant(bg),
        className,
      )}
    >
      <div className="flex flex-col items-center text-center">
        <h1
          data-part="headline"
          className="font-[var(--dk-font-serif,Georgia,serif)] text-[var(--dk-hero-minimal-headline-size,clamp(3rem,8vw,6rem))] font-[var(--dk-hero-minimal-headline-weight,400)] leading-[var(--dk-hero-minimal-headline-leading,1.1)] tracking-[var(--dk-hero-minimal-headline-tracking,-0.03em)] max-w-[var(--dk-hero-minimal-headline-max-width,900px)] text-balance text-dk-text mb-5"
        >
          {headline}
        </h1>

        {subheadline && (
          <p
            data-part="subheadline"
            className="max-w-[560px] text-[var(--dk-hero-minimal-sub-size,clamp(1rem,1.5vw,1.25rem))] leading-relaxed text-balance text-dk-text-muted mb-10"
          >
            {subheadline}
          </p>
        )}

        <div
          data-part="cta-group"
          className="flex flex-wrap gap-3 justify-center"
        >
          {ctaPrimary}
        </div>
      </div>

      <div
        data-part="scroll-indicator"
        className="absolute bottom-[var(--dk-hero-minimal-scroll-bottom,2rem)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dk-text-muted animate-bounce"
      >
        <svg
          className="size-[var(--dk-hero-minimal-chevron-size,1.5rem)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
