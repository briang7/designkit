import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface NewsletterWithImageProps {
  headline?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  image?: string;
  bg?: BgVariant;
  className?: string;
}

export function NewsletterWithImage({
  headline,
  description,
  buttonText = 'Subscribe',
  placeholder = 'Enter your email',
  image,
  bg,
  className,
}: NewsletterWithImageProps) {
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
        className="mx-auto max-w-[var(--dk-section-max-width,1200px)]"
      >
        <div
          data-part="layout"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div
            data-part="media"
            className="relative rounded-xl overflow-hidden min-h-[220px] md:min-h-[320px]"
          >
            {image && (
              <img
                data-part="image"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                src={image}
                alt=""
              />
            )}
          </div>
          <div data-part="content">
            {headline && (
              <h2
                data-part="headline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-dk-text mb-3"
              >
                {headline}
              </h2>
            )}
            {description && (
              <p
                data-part="description"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-base leading-relaxed text-dk-text-muted mb-8 mt-0"
              >
                {description}
              </p>
            )}
            <form
              data-part="form"
              className="flex gap-3 max-md:flex-col"
            >
              <input
                data-part="input"
                className={cn(
                  'flex-1 min-w-0 py-3 px-4',
                  'font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm',
                  'border border-[var(--dk-color-border,#e5e7eb)] rounded-[var(--dk-radius-lg,0.75rem)]',
                  'bg-[var(--dk-color-surface,#fff)] text-dk-text outline-none',
                  'transition-[border-color] duration-150',
                  'focus:border-dk-primary focus:shadow-[0_0_0_3px_var(--dk-color-primary-subtle,rgba(59,130,246,0.1))]',
                )}
                type="email"
                placeholder={placeholder}
                required
                aria-label="Email address"
              />
              <button
                data-part="button"
                className={cn(
                  'py-3 px-6 whitespace-nowrap',
                  'font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm font-semibold',
                  'bg-dk-primary text-white border-none rounded-[var(--dk-radius-lg,0.75rem)]',
                  'cursor-pointer transition-colors duration-150',
                  'hover:bg-[var(--dk-color-primary-hover,#2563eb)]',
                )}
                type="submit"
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
