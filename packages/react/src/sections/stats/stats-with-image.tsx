import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface StatsWithImageProps {
  headline?: string;
  image?: string;
  children?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function StatsWithImage({
  headline,
  image,
  children,
  bg,
  className,
}: StatsWithImageProps) {
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
        <div
          data-part="layout"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div
            data-part="media"
            className="relative rounded-[var(--dk-radius-xl,1rem)] overflow-hidden min-h-[240px] md:min-h-[360px]"
          >
            {image && (
              <img
                data-part="image"
                src={image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover rounded-[var(--dk-radius-xl,1rem)]"
              />
            )}
          </div>

          <div>
            {headline && (
              <div data-part="header" className="text-left mb-8">
                <h2
                  data-part="headline"
                  className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-dk-text m-0"
                >
                  {headline}
                </h2>
              </div>
            )}

            <div
              data-part="stats"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
