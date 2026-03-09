import { cn } from '../../utils/cn.js';
import { type BgVariant } from '../../utils/bg.js';

export interface HeroGradientProps {
  headline: string;
  subheadline?: string;
  ctaPrimary?: React.ReactNode;
  ctaSecondary?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function HeroGradient({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  className,
}: HeroGradientProps) {
  return (
    <section
      data-part="section"
      className={cn(
        'relative flex min-h-[var(--dk-hero-gradient-min-height,100vh)] items-center justify-center overflow-hidden',
        className,
      )}
    >
      <div
        data-part="gradient"
        className="absolute inset-0 z-0 animate-[dk-gradient_15s_ease_infinite] bg-[length:400%_400%]"
        style={{
          background:
            'linear-gradient(-45deg, var(--dk-hero-gradient-color-1,#ee7752), var(--dk-hero-gradient-color-2,#e73c7e), var(--dk-hero-gradient-color-3,#23a6d5), var(--dk-hero-gradient-color-4,#23d5ab))',
          backgroundSize: '400% 400%',
        }}
      />

      <div className="relative z-[1] flex flex-col items-center text-center px-[var(--dk-section-padding-x,1.5rem)]">
        <h1
          data-part="headline"
          className="font-[var(--dk-font-display,var(--dk-font-sans))] text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-tight tracking-tight text-balance text-[var(--dk-hero-gradient-text-color,#ffffff)] mb-5"
        >
          {headline}
        </h1>

        {subheadline && (
          <p
            data-part="subheadline"
            className="max-w-[640px] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-balance text-[var(--dk-hero-gradient-subtext-color,rgba(255,255,255,0.9))] mb-10"
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
