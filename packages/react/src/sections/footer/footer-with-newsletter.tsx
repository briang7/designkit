import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface FooterWithNewsletterProps {
  brand?: string;
  description?: string;
  copyright?: string;
  placeholder?: string;
  buttonText?: string;
  logo?: React.ReactNode;
  columns?: React.ReactNode;
  social?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function FooterWithNewsletter({
  brand = '',
  description,
  copyright = `\u00A9 ${new Date().getFullYear()}`,
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  logo,
  columns,
  social,
  bg,
  className,
}: FooterWithNewsletterProps) {
  return (
    <footer
      data-part="footer"
      className={cn(
        'py-[var(--dk-section-padding-y,5rem)] px-[var(--dk-section-padding-x,1.5rem)] border-t border-[var(--dk-color-border,#e5e7eb)]',
        bgVariant(bg),
        className,
      )}
    >
      <div
        data-part="container"
        className="mx-auto max-w-[var(--dk-section-max-width,1200px)]"
      >
        <div className="flex gap-[var(--dk-space-12,3rem)] max-md:flex-col">
          <div
            data-part="brand-col"
            className="flex flex-col gap-[var(--dk-space-4,1rem)] shrink-0 basis-[300px] max-md:basis-auto"
          >
            {logo || (
              <p
                data-part="brand-name"
                className="font-[var(--dk-font-display,var(--dk-font-sans,system-ui,sans-serif))] text-[length:var(--dk-text-xl,1.25rem)] font-bold text-dk-text mb-[var(--dk-space-3,0.75rem)] tracking-tight m-0"
              >
                {brand}
              </p>
            )}
            {description && (
              <p
                data-part="description"
                className="text-[length:var(--dk-text-sm,0.875rem)] text-dk-text-muted leading-[var(--dk-leading-relaxed,1.6)] m-0 max-w-[320px]"
              >
                {description}
              </p>
            )}
            <form
              data-part="newsletter-form"
              className="flex gap-[var(--dk-space-2,0.5rem)] mt-[var(--dk-space-2,0.5rem)] max-[480px]:flex-col"
            >
              <input
                type="email"
                data-part="input"
                placeholder={placeholder}
                required
                aria-label="Email address"
                className="flex-1 min-w-0 px-[var(--dk-space-3,0.75rem)] py-[var(--dk-space-2,0.5rem)] border border-[var(--dk-color-border,#d1d5db)] rounded-[var(--dk-radius-md,0.375rem)] text-[length:var(--dk-text-sm,0.875rem)] text-dk-text bg-[var(--dk-color-surface,#fff)] outline-none transition-[border-color,box-shadow] duration-[var(--dk-transition-fast,150ms)] placeholder:text-dk-text-muted focus:border-[var(--dk-color-primary,#3b82f6)] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)]"
              />
              <button
                type="submit"
                data-part="button"
                className="px-[var(--dk-space-4,1rem)] py-[var(--dk-space-2,0.5rem)] border-none rounded-[var(--dk-radius-md,0.375rem)] text-[length:var(--dk-text-sm,0.875rem)] font-semibold text-[var(--dk-color-on-primary,#fff)] bg-[var(--dk-color-primary,#3b82f6)] cursor-pointer whitespace-nowrap transition-colors duration-[var(--dk-transition-fast,150ms)] hover:bg-[var(--dk-color-primary-hover,#2563eb)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dk-color-primary,#3b82f6)]"
              >
                {buttonText}
              </button>
            </form>
          </div>
          <div
            data-part="columns"
            className="flex-1 grid grid-cols-3 gap-8 max-md:grid-cols-2 max-[480px]:grid-cols-1"
          >
            {columns}
          </div>
        </div>

        <div
          data-part="bottom-bar"
          className="flex items-center justify-between pt-[var(--dk-space-6,1.5rem)] mt-[var(--dk-space-6,1.5rem)] border-t border-[var(--dk-color-border,#e5e7eb)] flex-wrap gap-4"
        >
          <p
            data-part="copyright"
            className="text-[length:var(--dk-text-xs,0.75rem)] text-dk-text-muted m-0"
          >
            {copyright}
          </p>
          <div
            data-part="social-row"
            className="flex gap-[var(--dk-space-3,0.75rem)] items-center"
          >
            {social}
          </div>
        </div>
      </div>
    </footer>
  );
}
