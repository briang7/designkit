import { cn } from '../../utils/cn.js';

export interface ContactDarkProps {
  headline?: string;
  subheadline?: string;
  className?: string;
  onSubmit?: (values: Record<string, string>) => void;
}

const inputClasses = cn(
  'w-full px-3.5 py-2.5 rounded-lg border border-[var(--dk-color-dark-border,#374151)]',
  'bg-[var(--dk-color-dark-surface,#1f2937)] text-white font-sans text-sm',
  'outline-none transition-[border-color,box-shadow] duration-200',
  'focus:border-[var(--dk-color-primary,#3b82f6)] focus:ring-2 focus:ring-[rgba(59,130,246,0.2)]',
  'placeholder:text-[var(--dk-color-dark-text-muted,#9ca3af)]',
);

export function ContactDark({
  headline,
  subheadline,
  className,
  onSubmit,
}: ContactDarkProps) {
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
        'bg-[var(--dk-color-dark-bg,#111827)]',
        className,
      )}
    >
      <div
        data-part="container"
        className="mx-auto max-w-[var(--dk-section-max-width,1280px)]"
      >
        {(headline || subheadline) && (
          <div className="text-center mb-12" data-part="header">
            {headline && (
              <h2
                data-part="headline"
                className="font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-white mb-4"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                data-part="subheadline"
                className="font-sans text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-[var(--dk-color-dark-text-muted,#9ca3af)] max-w-[640px] mx-auto"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div className="max-w-[600px] mx-auto">
          <form data-part="form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-[var(--dk-color-dark-text,#f3f4f6)]">
              Name
              <input type="text" name="name" placeholder="Your name" required data-part="input" className={inputClasses} />
            </label>
            <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-[var(--dk-color-dark-text,#f3f4f6)]">
              Email
              <input type="email" name="email" placeholder="you@example.com" required data-part="input" className={inputClasses} />
            </label>
            <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-[var(--dk-color-dark-text,#f3f4f6)]">
              Subject
              <input type="text" name="subject" placeholder="How can we help?" data-part="input" className={inputClasses} />
            </label>
            <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-[var(--dk-color-dark-text,#f3f4f6)]">
              Message
              <textarea name="message" placeholder="Tell us more..." required data-part="textarea" className={cn(inputClasses, 'min-h-[120px] resize-y')} />
            </label>
            <button
              type="submit"
              data-part="button"
              className="w-full py-3 px-6 rounded-lg font-sans text-sm font-semibold bg-[var(--dk-color-primary,#3b82f6)] text-white hover:brightness-110 transition-[filter] duration-200 cursor-pointer border-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
