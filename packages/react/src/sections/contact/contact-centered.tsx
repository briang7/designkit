import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface ContactCenteredProps {
  headline?: string;
  subheadline?: string;
  bg?: BgVariant;
  className?: string;
  onSubmit?: (values: Record<string, string>) => void;
}

export function ContactCentered({
  headline,
  subheadline,
  bg,
  className,
  onSubmit,
}: ContactCenteredProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values: Record<string, string> = {};
    data.forEach((v, k) => { values[k] = v as string; });
    onSubmit?.(values);
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
        className="mx-auto max-w-[var(--dk-section-max-width,1280px)]"
      >
        <div
          data-part="card"
          className={cn(
            'max-w-[600px] mx-auto',
            'bg-[var(--dk-color-surface,#ffffff)]',
            'border border-[var(--dk-color-border,#e5e7eb)]',
            'rounded-xl p-[var(--dk-space-10,2.5rem)]',
          )}
        >
          {headline && (
            <h2
              data-part="headline"
              className="font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-dk-text text-center mb-4"
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p
              data-part="subheadline"
              className="font-sans text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-dk-text-muted text-center mb-[var(--dk-space-8,2rem)]"
            >
              {subheadline}
            </p>
          )}
          <form data-part="form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-dk-text">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  data-part="input"
                  className={cn(
                    'w-full px-3.5 py-2.5 rounded-lg border border-[var(--dk-color-border,#e5e7eb)]',
                    'bg-[var(--dk-color-surface,#ffffff)] text-dk-text font-sans text-sm',
                    'outline-none transition-[border-color,box-shadow] duration-200',
                    'focus:border-[var(--dk-color-primary,#3b82f6)] focus:ring-2 focus:ring-[var(--dk-color-primary,#3b82f6)]/20',
                    'placeholder:text-[var(--dk-color-text-muted,#6b7280)]',
                  )}
                />
              </label>
              <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-dk-text">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  data-part="input"
                  className={cn(
                    'w-full px-3.5 py-2.5 rounded-lg border border-[var(--dk-color-border,#e5e7eb)]',
                    'bg-[var(--dk-color-surface,#ffffff)] text-dk-text font-sans text-sm',
                    'outline-none transition-[border-color,box-shadow] duration-200',
                    'focus:border-[var(--dk-color-primary,#3b82f6)] focus:ring-2 focus:ring-[var(--dk-color-primary,#3b82f6)]/20',
                    'placeholder:text-[var(--dk-color-text-muted,#6b7280)]',
                  )}
                />
              </label>
            </div>
            <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-dk-text">
              Subject
              <input
                type="text"
                name="subject"
                placeholder="How can we help?"
                data-part="input"
                className={cn(
                  'w-full px-3.5 py-2.5 rounded-lg border border-[var(--dk-color-border,#e5e7eb)]',
                  'bg-[var(--dk-color-surface,#ffffff)] text-dk-text font-sans text-sm',
                  'outline-none transition-[border-color,box-shadow] duration-200',
                  'focus:border-[var(--dk-color-primary,#3b82f6)] focus:ring-2 focus:ring-[var(--dk-color-primary,#3b82f6)]/20',
                  'placeholder:text-[var(--dk-color-text-muted,#6b7280)]',
                )}
              />
            </label>
            <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-dk-text">
              Message
              <textarea
                name="message"
                placeholder="Tell us more..."
                required
                data-part="textarea"
                className={cn(
                  'w-full px-3.5 py-2.5 rounded-lg border border-[var(--dk-color-border,#e5e7eb)]',
                  'bg-[var(--dk-color-surface,#ffffff)] text-dk-text font-sans text-sm',
                  'outline-none transition-[border-color,box-shadow] duration-200 min-h-[120px] resize-y',
                  'focus:border-[var(--dk-color-primary,#3b82f6)] focus:ring-2 focus:ring-[var(--dk-color-primary,#3b82f6)]/20',
                  'placeholder:text-[var(--dk-color-text-muted,#6b7280)]',
                )}
              />
            </label>
            <button
              type="submit"
              data-part="button"
              className={cn(
                'w-full py-3 px-6 rounded-lg font-sans text-sm font-semibold',
                'bg-[var(--dk-color-primary,#3b82f6)] text-white',
                'hover:brightness-110 transition-[filter] duration-200 cursor-pointer border-none',
              )}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
