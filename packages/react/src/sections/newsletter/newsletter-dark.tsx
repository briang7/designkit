import { cn } from '../../utils/cn.js';

export interface NewsletterDarkProps {
  headline?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export function NewsletterDark({
  headline,
  description,
  buttonText = 'Subscribe',
  placeholder = 'Enter your email',
  className,
}: NewsletterDarkProps) {
  return (
    <section
      data-part="section"
      className={cn(
        'py-[var(--dk-section-padding-y,5rem)] px-[var(--dk-section-padding-x,1.5rem)]',
        'bg-[var(--dk-color-dark-bg,#111827)]',
        className,
      )}
    >
      <div
        data-part="container"
        className="mx-auto max-w-[var(--dk-section-max-width,1200px)]"
      >
        <div
          data-part="content"
          className="max-w-[560px] mx-auto text-center"
        >
          {headline && (
            <h2
              data-part="headline"
              className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-[#f9fafb] mb-3"
            >
              {headline}
            </h2>
          )}
          {description && (
            <p
              data-part="description"
              className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-base leading-relaxed text-[#d1d5db] mb-8 mt-0"
            >
              {description}
            </p>
          )}
          <form
            data-part="form"
            className="flex gap-3 justify-center max-md:flex-col"
          >
            <input
              data-part="input"
              className={cn(
                'flex-1 min-w-0 py-3 px-4',
                'font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm',
                'border border-[rgba(255,255,255,0.15)] rounded-[var(--dk-radius-lg,0.75rem)]',
                'bg-[rgba(255,255,255,0.08)] text-[#f9fafb] outline-none',
                'placeholder:text-[#9ca3af]',
                'transition-[border-color,box-shadow] duration-150',
                'focus:border-dk-primary focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]',
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
    </section>
  );
}
