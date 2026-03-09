import { cn } from '../../utils/cn.js';
import { type BgVariant } from '../../utils/bg.js';

export interface HeroBackgroundProps {
  headline: string;
  subheadline?: string;
  image?: string;
  ctaPrimary?: React.ReactNode;
  ctaSecondary?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function HeroBackground({
  headline,
  subheadline,
  image,
  ctaPrimary,
  ctaSecondary,
  className,
}: HeroBackgroundProps) {
  return (
    <section
      data-part="section"
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden',
        className,
      )}
    >
      {image && (
        <div
          data-part="bg-image"
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${image}')` }}
        />
      )}

      <div
        data-part="overlay"
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/55 to-black/70"
      />

      <div
        data-part="container"
        className="relative z-[2] mx-auto flex w-full max-w-[var(--dk-section-max-width,1280px)] flex-col items-center text-center py-[var(--dk-section-padding-y,5rem)] px-[var(--dk-section-padding-x,1.5rem)]"
      >
        <h1
          data-part="headline"
          className="font-[var(--dk-font-display,var(--dk-font-sans))] text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-tight tracking-tight text-balance text-white mb-5"
        >
          {headline}
        </h1>

        {subheadline && (
          <p
            data-part="subheadline"
            className="max-w-[640px] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-balance text-white/85 mb-10"
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
