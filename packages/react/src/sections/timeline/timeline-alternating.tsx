import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface TimelineAlternatingProps {
  headline?: string;
  subheadline?: string;
  children: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function TimelineAlternating({
  headline,
  subheadline,
  children,
  bg,
  className,
}: TimelineAlternatingProps) {
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
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight text-dk-text mb-4 tracking-tight"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                data-part="subheadline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-dk-text-muted max-w-[640px] mx-auto m-0"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div
          data-part="steps"
          className={cn(
            'relative flex flex-col gap-8 py-8',
            /* Center vertical line */
            'before:content-[\'\'] before:absolute before:top-0 before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-[var(--dk-timeline-line-color,#e5e7eb)]',
            /* Mobile: left-aligned line */
            'max-md:before:left-5 max-md:before:translate-x-0',
          )}
        >
          {/* Apply alternating alignment via wrapping children */}
          {Array.isArray(children)
            ? children.map((child, i) => (
                <div
                  key={i}
                  className={cn(
                    'relative w-[calc(50%-2rem)]',
                    i % 2 === 0 ? 'self-start text-right' : 'self-end text-left',
                    'max-md:w-auto max-md:!text-left max-md:!self-stretch max-md:pl-12',
                  )}
                >
                  {child}
                </div>
              ))
            : children}
        </div>
      </div>
    </section>
  );
}
