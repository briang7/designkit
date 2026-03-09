import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';

export interface PricingTierProps {
  name: string;
  price: string;
  period?: string;
  annualPrice?: string;
  annualPeriod?: string;
  description?: string;
  featured?: boolean;
  annual?: boolean;
  features?: string[];
  className?: string;
  children?: ReactNode;
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

export function PricingTier({
  name,
  price,
  period = '',
  annualPrice,
  annualPeriod,
  description,
  featured = false,
  annual = false,
  features = [],
  className,
  children,
  cta,
}: PricingTierProps) {
  const displayPrice = annual && annualPrice ? annualPrice : price;

  let displayPeriod = period;
  if (annual && annualPeriod) displayPeriod = annualPeriod;
  else if (annual && annualPrice) displayPeriod = '/year';

  return (
    <div className={cn('flex flex-col', className)} data-part="wrapper">
      <div
        className={cn(
          'flex flex-col p-8 h-full relative',
          'bg-[var(--dk-color-surface,#ffffff)]',
          'border rounded-xl',
          'transition-[transform,box-shadow,border-color] duration-300 ease-out',
          featured
            ? 'border-2 border-[var(--dk-color-primary,#3b82f6)] scale-105 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:scale-105 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)]'
            : 'border-[var(--dk-color-border,#e5e7eb)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]',
        )}
        data-part="card"
      >
        {featured && (
          <span
            className={cn(
              'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'bg-[var(--dk-color-primary,#3b82f6)] text-white',
              'font-sans text-xs font-semibold',
              'px-4 py-1 rounded-full whitespace-nowrap',
            )}
            data-part="badge"
          >
            Most Popular
          </span>
        )}

        <h3
          className="font-sans text-lg font-semibold text-[var(--dk-color-text,#111827)] mb-2"
          data-part="name"
        >
          {name}
        </h3>

        <div className="flex items-baseline gap-1 mb-2" data-part="price-row">
          <span
            className="font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold text-[var(--dk-color-text,#111827)] leading-none"
            data-part="price"
          >
            {displayPrice}
          </span>
          {displayPeriod && (
            <span
              className="font-sans text-sm text-[var(--dk-color-text-muted,#6b7280)]"
              data-part="period"
            >
              {displayPeriod}
            </span>
          )}
        </div>

        {description && (
          <p
            className="font-sans text-sm text-[var(--dk-color-text-muted,#6b7280)] leading-relaxed mb-6"
            data-part="description"
          >
            {description}
          </p>
        )}

        <hr className="border-0 border-t border-[var(--dk-color-border,#e5e7eb)] mb-6" />

        {features.length > 0 && (
          <ul className="list-none m-0 mb-6 p-0 flex flex-col gap-3 flex-1" data-part="features">
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

        {children}

        {cta && (
          <div className="mt-auto" data-part="cta">
            {cta}
          </div>
        )}
      </div>
    </div>
  );
}
