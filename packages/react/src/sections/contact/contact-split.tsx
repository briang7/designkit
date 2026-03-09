import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface ContactSplitProps {
  headline?: string;
  subheadline?: string;
  email?: string;
  phone?: string;
  address?: string;
  map?: ReactNode;
  bg?: BgVariant;
  className?: string;
  onSubmit?: (values: Record<string, string>) => void;
}

const inputClasses = cn(
  'w-full px-3.5 py-2.5 rounded-lg border border-[var(--dk-color-border,#e5e7eb)]',
  'bg-[var(--dk-color-surface,#ffffff)] text-dk-text font-sans text-sm',
  'outline-none transition-[border-color,box-shadow] duration-200',
  'focus:border-[var(--dk-color-primary,#3b82f6)] focus:ring-2 focus:ring-[var(--dk-color-primary,#3b82f6)]/20',
  'placeholder:text-[var(--dk-color-text-muted,#6b7280)]',
);

export function ContactSplit({
  headline,
  subheadline,
  email,
  phone,
  address,
  map,
  bg,
  className,
  onSubmit,
}: ContactSplitProps) {
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
        {(headline || subheadline) && (
          <div className="text-center mb-12" data-part="header">
            {headline && (
              <h2
                data-part="headline"
                className="font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-dk-text mb-4"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                data-part="subheadline"
                className="font-sans text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-dk-text-muted max-w-[640px] mx-auto"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div
          data-part="split"
          className="grid grid-cols-1 md:grid-cols-2 gap-[var(--dk-space-16,4rem)] max-md:gap-[var(--dk-space-10,2.5rem)] items-start"
        >
          <form data-part="form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-dk-text">
                Name
                <input type="text" name="name" placeholder="Your name" required data-part="input" className={inputClasses} />
              </label>
              <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-dk-text">
                Email
                <input type="email" name="email" placeholder="you@example.com" required data-part="input" className={inputClasses} />
              </label>
            </div>
            <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-dk-text">
              Subject
              <input type="text" name="subject" placeholder="How can we help?" data-part="input" className={inputClasses} />
            </label>
            <label data-part="label" className="flex flex-col gap-1.5 font-sans text-sm font-medium text-dk-text">
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

          <div data-part="contact-info" className="flex flex-col gap-[var(--dk-space-6,1.5rem)]">
            {email && (
              <div className="flex items-start gap-[var(--dk-space-3,0.75rem)]">
                <svg className="shrink-0 w-6 h-6 text-[var(--dk-color-primary,#3b82f6)] mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="22,4 12,13 2,4" />
                </svg>
                <div>
                  <p className="font-sans text-xs font-semibold text-[var(--dk-color-text-muted,#6b7280)] uppercase tracking-wider m-0 mb-[var(--dk-space-1,0.25rem)]">Email</p>
                  <p className="font-sans text-sm text-dk-text leading-relaxed m-0">{email}</p>
                </div>
              </div>
            )}
            {phone && (
              <div className="flex items-start gap-[var(--dk-space-3,0.75rem)]">
                <svg className="shrink-0 w-6 h-6 text-[var(--dk-color-primary,#3b82f6)] mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <div>
                  <p className="font-sans text-xs font-semibold text-[var(--dk-color-text-muted,#6b7280)] uppercase tracking-wider m-0 mb-[var(--dk-space-1,0.25rem)]">Phone</p>
                  <p className="font-sans text-sm text-dk-text leading-relaxed m-0">{phone}</p>
                </div>
              </div>
            )}
            {address && (
              <div className="flex items-start gap-[var(--dk-space-3,0.75rem)]">
                <svg className="shrink-0 w-6 h-6 text-[var(--dk-color-primary,#3b82f6)] mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p className="font-sans text-xs font-semibold text-[var(--dk-color-text-muted,#6b7280)] uppercase tracking-wider m-0 mb-[var(--dk-space-1,0.25rem)]">Address</p>
                  <p className="font-sans text-sm text-dk-text leading-relaxed m-0">{address}</p>
                </div>
              </div>
            )}
            {map && (
              <div data-part="map" className="mt-[var(--dk-space-6,1.5rem)] rounded-[var(--dk-radius-lg,0.75rem)] overflow-hidden">
                {map}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
