import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface PricingSimpleProps {
  headline?: string;
  subheadline?: string;
  name?: string;
  price: string;
  period?: string;
  description?: string;
  features?: string[];
  bg?: BgVariant;
  className?: string;
  cta?: ReactNode;
}

function CheckIcon() {
  return (
    <svg
      className="shrink-0 w-5 h-5 text-[var(--dk-color-success,#10b981)] mt-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function PricingSimple({
  headline,
  subheadline,
  name,
  price,
  period,
  description,
  features = [],
  bg = 'primary',
  className,
  cta,
}: PricingSimpleProps) {
  const isDark = bg === 'brand' || bg === 'dark';

  return (
    <section
      className={cn('block py-20 px-6', bgVariant(bg), className)}
      data-part="section"
    >
      <div className="max-w-[1200px] mx-auto" data-part="container">
        {(headline || subheadline) && (
          <div className="text-center mb-12" data-part="header">
            {headline && (
              <h2
                className={cn(
                  'font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight mb-4',
                  isDark ? 'text-white' : 'text-[var(--dk-color-text,#111827)]',
                )}
                data-part="headline"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className={cn(
                  'font-sans text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed max-w-[640px] mx-auto',
                  isDark ? 'text-white/90' : 'text-[var(--dk-color-text-muted,#6b7280)]',
                )}
                data-part="subheadline"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}

        <div
          className={cn(
            'max-w-[480px] mx-auto text-center',
            'bg-[var(--dk-color-surface,#ffffff)]',
            'border border-[var(--dk-color-border,#e5e7eb)]',
            'rounded-xl p-10',
          )}
          data-part="card"
        >
          {name && (
            <h2
              className="font-sans text-lg font-semibold text-[var(--dk-color-text,#111827)] mb-4"
              data-part="name"
            >
              {name}
            </h2>
          )}

          <div className="flex items-baseline justify-center gap-1 mb-2" data-part="price-row">
            <span
              className="font-sans text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold text-[var(--dk-color-text,#111827)] leading-none"
              data-part="price"
            >
              {price}
            </span>
            {period && (
              <span
                className="font-sans text-base text-[var(--dk-color-text-muted,#6b7280)]"
                data-part="period"
              >
                {period}
              </span>
            )}
          </div>

          {description && (
            <p
              className="font-sans text-base text-[var(--dk-color-text-muted,#6b7280)] leading-relaxed mb-8"
              data-part="description"
            >
              {description}
            </p>
          )}

          <hr className="border-0 border-t border-[var(--dk-color-border,#e5e7eb)] mb-6" />

          {features.length > 0 && (
            <ul className="list-none m-0 mb-8 p-0 flex flex-col gap-3 text-left" data-part="features">
              {features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 font-sans text-sm text-[var(--dk-color-text,#111827)] leading-relaxed"
                >
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          {cta}
        </div>
      </div>
    </section>
  );
}
