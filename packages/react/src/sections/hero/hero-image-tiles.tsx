import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface HeroImageTilesProps {
  headline: string;
  subheadline?: string;
  ctaPrimary?: React.ReactNode;
  ctaSecondary?: React.ReactNode;
  image1?: React.ReactNode;
  image2?: React.ReactNode;
  image3?: React.ReactNode;
  image4?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function HeroImageTiles({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  image1,
  image2,
  image3,
  image4,
  bg,
  className,
}: HeroImageTilesProps) {
  return (
    <section
      data-part="section"
      className={cn(
        'py-[var(--dk-section-padding-y,5rem)] px-[var(--dk-section-padding-x,1.5rem)]',
        bgVariant(bg),
        className,
      )}
    >
      <div className="mx-auto max-w-[var(--dk-section-max-width,1280px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--dk-hero-tiles-gap,3rem)] items-center">
          <div data-part="content" className="flex flex-col items-start">
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
              className="flex flex-wrap gap-3"
            >
              {ctaPrimary}
              {ctaSecondary}
            </div>
          </div>

          <div
            data-part="tiles"
            className="grid grid-cols-2 grid-rows-[repeat(3,var(--dk-hero-tile-row-height-sm,120px))] md:grid-rows-[repeat(3,var(--dk-hero-tile-row-height,140px))] gap-[var(--dk-hero-tiles-grid-gap,0.75rem)]"
          >
            <div
              data-part="tile"
              className="col-start-1 col-end-2 row-start-1 row-end-3 overflow-hidden rounded-[var(--dk-hero-tile-radius,var(--dk-radius-lg,0.75rem))] bg-[var(--dk-hero-tile-bg,#e5e7eb)] [&>*]:block [&>*]:h-full [&>*]:w-full [&>*]:object-cover"
            >
              {image1}
            </div>
            <div
              data-part="tile"
              className="col-start-2 col-end-3 row-start-1 row-end-2 overflow-hidden rounded-[var(--dk-hero-tile-radius,var(--dk-radius-lg,0.75rem))] bg-[var(--dk-hero-tile-bg,#e5e7eb)] [&>*]:block [&>*]:h-full [&>*]:w-full [&>*]:object-cover"
            >
              {image2}
            </div>
            <div
              data-part="tile"
              className="col-start-2 col-end-3 row-start-2 row-end-4 overflow-hidden rounded-[var(--dk-hero-tile-radius,var(--dk-radius-lg,0.75rem))] bg-[var(--dk-hero-tile-bg,#e5e7eb)] [&>*]:block [&>*]:h-full [&>*]:w-full [&>*]:object-cover"
            >
              {image3}
            </div>
            <div
              data-part="tile"
              className="col-start-1 col-end-2 row-start-3 row-end-4 overflow-hidden rounded-[var(--dk-hero-tile-radius,var(--dk-radius-lg,0.75rem))] bg-[var(--dk-hero-tile-bg,#e5e7eb)] [&>*]:block [&>*]:h-full [&>*]:w-full [&>*]:object-cover"
            >
              {image4}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
