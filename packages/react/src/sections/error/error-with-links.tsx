import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface ErrorWithLinksProps {
  code?: string;
  headline?: string;
  description?: string;
  cta?: React.ReactNode;
  links?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function ErrorWithLinks({
  code = '404',
  headline = 'Page not found',
  description = "Sorry, we couldn't find the page you're looking for.",
  cta,
  links,
  bg,
  className,
}: ErrorWithLinksProps) {
  const isDark = bg === 'brand' || bg === 'dark';

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
        className="mx-auto max-w-[var(--dk-section-max-width,1280px)] flex flex-col items-center text-center min-h-[calc(100vh-200px)] justify-center"
      >
        <h1
          data-part="code"
          className={cn(
            'font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(4rem,10vw,8rem)] font-extrabold leading-none m-0 mb-2 tracking-tighter',
            isDark ? 'text-white/30' : 'text-[var(--dk-color-primary,#3b82f6)]',
          )}
        >
          {code}
        </h1>
        <h2
          data-part="headline"
          className={cn(
            'font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold mb-4 m-0',
            isDark ? 'text-white' : 'text-dk-text',
          )}
        >
          {headline}
        </h2>
        <p
          data-part="description"
          className={cn(
            'font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed mb-8 m-0 max-w-[480px]',
            isDark ? 'text-white/90' : 'text-dk-text-muted',
          )}
        >
          {description}
        </p>
        {cta && (
          <div data-part="cta-group" className="flex flex-wrap gap-3 justify-center mb-12">
            {cta}
          </div>
        )}
        {links && (
          <div
            data-part="links-section"
            className={cn(
              'w-full max-w-[800px] border-t pt-8',
              isDark ? 'border-white/15' : 'border-[var(--dk-color-border,#e5e7eb)]',
            )}
          >
            <h3
              data-part="links-title"
              className={cn(
                'font-[var(--dk-font-sans,system-ui,sans-serif)] text-lg font-semibold mb-6 m-0',
                isDark ? 'text-white' : 'text-dk-text',
              )}
            >
              Popular pages
            </h3>
            <div
              data-part="links-grid"
              className="grid grid-cols-3 gap-4 text-left max-md:grid-cols-2 max-[480px]:grid-cols-1"
            >
              {links}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
