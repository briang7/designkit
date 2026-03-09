import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface FeaturesWithImageProps {
  headline?: string;
  subheadline?: string;
  image?: string;
  media?: React.ReactNode;
  children?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function FeaturesWithImage({
  headline,
  subheadline,
  image,
  media,
  children,
  bg,
  className,
}: FeaturesWithImageProps) {
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
        className="mx-auto max-w-[var(--dk-section-max-width,1280px)]"
      >
        {(headline || subheadline) && (
          <div data-part="header" className="text-center mb-12">
            {headline && (
              <h2
                data-part="headline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-dk-text m-0 mb-4"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                data-part="subheadline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-dk-text-muted m-0 max-w-[640px] mx-auto"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div
          data-part="layout"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div data-part="media" className="relative md:order-none order-first">
            {media || (
              image ? (
                <img
                  data-part="image"
                  src={image}
                  alt=""
                  loading="lazy"
                  className="w-full h-auto rounded-[var(--dk-radius-xl,1rem)] shadow-lg object-cover"
                />
              ) : null
            )}
          </div>
          <div data-part="features" className="flex flex-col gap-6">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
