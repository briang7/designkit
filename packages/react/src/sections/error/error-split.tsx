import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface ErrorSplitProps {
  code?: string;
  headline?: string;
  description?: string;
  image?: string;
  cta?: React.ReactNode;
  media?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

function FallbackSvg() {
  return (
    <svg className="w-full max-w-[400px] h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="100" y="30" width="200" height="240" rx="12" stroke="var(--dk-color-primary, #3b82f6)" strokeWidth="2" strokeDasharray="8 4" fill="none" opacity="0.3" />
      <circle cx="200" cy="120" r="40" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" stroke="var(--dk-color-primary, #3b82f6)" strokeWidth="2" />
      <line x1="175" y1="105" x2="215" y2="135" stroke="var(--dk-color-primary, #3b82f6)" strokeWidth="3" strokeLinecap="round" />
      <line x1="215" y1="105" x2="175" y2="135" stroke="var(--dk-color-primary, #3b82f6)" strokeWidth="3" strokeLinecap="round" />
      <rect x="140" y="185" width="120" height="8" rx="4" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" />
      <rect x="160" y="205" width="80" height="8" rx="4" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" />
      <circle cx="80" cy="60" r="8" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" />
      <circle cx="320" cy="240" r="12" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" />
      <circle cx="340" cy="80" r="6" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" />
    </svg>
  );
}

export function ErrorSplit({
  code = '404',
  headline = 'Page not found',
  description = "Sorry, we couldn't find the page you're looking for.",
  image,
  cta,
  media,
  bg,
  className,
}: ErrorSplitProps) {
  const isDark = bg === 'brand' || bg === 'dark';

  const renderMedia = () => {
    if (media) return media;
    if (image) return <img src={image} alt="Error illustration" data-part="image" className="max-w-full h-auto rounded-xl" />;
    return <FallbackSvg />;
  };

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
        className="mx-auto max-w-[var(--dk-section-max-width,1280px)] grid grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)] max-md:grid-cols-1 max-md:gap-8 max-md:min-h-auto"
      >
        <div data-part="content" className="flex flex-col max-md:text-center">
          <h1
            data-part="code"
            className={cn(
              'font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(4rem,10vw,8rem)] font-extrabold leading-none m-0 mb-2',
              isDark ? 'text-white/30' : 'text-[var(--dk-color-primary,#3b82f6)]',
              'max-md:text-[clamp(3rem,8vw,5rem)]',
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
              'font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed mb-8 m-0',
              isDark ? 'text-white/90' : 'text-dk-text-muted',
            )}
          >
            {description}
          </p>
          {cta && (
            <div data-part="cta-group" className="flex flex-wrap gap-3 max-md:justify-center">
              {cta}
            </div>
          )}
        </div>
        <div data-part="media" className="flex items-center justify-center max-md:-order-1">
          {renderMedia()}
        </div>
      </div>
    </section>
  );
}
