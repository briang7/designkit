import { cn } from '../../utils/cn.js';
import { type BgVariant } from '../../utils/bg.js';

export interface HeroVideoProps {
  headline: string;
  subheadline?: string;
  videoSrc: string;
  ctaPrimary?: React.ReactNode;
  ctaSecondary?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function HeroVideo({
  headline,
  subheadline,
  videoSrc,
  ctaPrimary,
  ctaSecondary,
  className,
}: HeroVideoProps) {
  return (
    <section
      data-part="section"
      className={cn(
        'relative flex min-h-[var(--dk-hero-video-min-height,100vh)] items-center justify-center overflow-hidden',
        className,
      )}
    >
      <div className="absolute inset-0 z-0">
        <video
          data-part="video"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
        />
      </div>

      <div
        data-part="overlay"
        className="absolute inset-0 z-[1] bg-[var(--dk-hero-video-overlay,rgba(0,0,0,0.55))]"
      />

      <div className="relative z-[2] flex flex-col items-center text-center px-[var(--dk-section-padding-x,1.5rem)]">
        <h1
          data-part="headline"
          className="font-[var(--dk-font-display,var(--dk-font-sans))] text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-tight tracking-tight text-balance text-[var(--dk-hero-video-text-color,#ffffff)] mb-5"
        >
          {headline}
        </h1>

        {subheadline && (
          <p
            data-part="subheadline"
            className="max-w-[640px] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-balance text-[var(--dk-hero-video-subtext-color,rgba(255,255,255,0.85))] mb-10"
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
