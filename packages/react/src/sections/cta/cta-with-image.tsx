import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface CtaWithImageProps {
  headline?: string;
  description?: string;
  image?: string;
  cta?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function CtaWithImage({
  headline,
  description,
  image,
  cta,
  bg,
  className,
}: CtaWithImageProps) {
  return (
    <section
      data-part="section"
      className={cn(
        'py-[var(--dk-section-padding-y,5rem)] px-[var(--dk-section-padding-x,1.5rem)]',
        'relative overflow-hidden',
        bgVariant(bg),
        className,
      )}
    >
      {/* Background image */}
      {image && (
        <div
          data-part="bg-image"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url('${image}')` }}
        />
      )}

      {/* Dark overlay */}
      <div
        data-part="overlay"
        className="absolute inset-0 bg-black/60 z-[1]"
      />

      <div
        data-part="container"
        className="mx-auto max-w-[var(--dk-section-max-width,1280px)] flex flex-col items-center text-center relative z-[2]"
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
            className="text-white/85 text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-balance mb-8 max-w-[640px] mx-auto"
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
