'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface ComparisonFeature {
  feature: string;
  tiers: boolean[];
}

export interface PricingComparisonProps {
  headline?: string;
  subheadline?: string;
  monthlyLabel?: string;
  annualLabel?: string;
  comparisonFeatures?: ComparisonFeature[];
  tierNames?: string[];
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

function CheckIcon() {
  return (
    <svg
      className="inline-block w-5 h-5 text-[var(--dk-color-success,#10b981)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-label="Included"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="inline-block w-5 h-5 text-[var(--dk-color-text-muted,#6b7280)] opacity-40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-label="Not included"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function PricingComparison({
  headline,
  subheadline,
  monthlyLabel = 'Monthly',
  annualLabel = 'Annual',
  comparisonFeatures = [],
  tierNames = [],
  bg = 'primary',
  className,
  children,
}: PricingComparisonProps) {
  const [annual, setAnnual] = useState(false);
  const isDark = bg === 'brand' || bg === 'dark';

  // Clone children to inject annual prop
  const enhancedChildren = Array.isArray(children)
    ? children.filter(Boolean).map((child, i) => {
        if (child && typeof child === 'object' && 'props' in child) {
          const { ...props } = child.props;
          return { ...child, props: { ...props, annual }, key: i };
        }
        return child;
      })
    : children;

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
          className="flex items-center justify-center gap-3 mb-10"
          data-part="toggle-row"
        >
          <span
            className={cn(
              'font-sans text-sm cursor-pointer select-none',
              !annual
                ? 'text-[var(--dk-color-text,#111827)] font-semibold'
                : 'text-[var(--dk-color-text-muted,#6b7280)]',
            )}
            onClick={() => setAnnual(false)}
          >
            {monthlyLabel}
          </span>
          <button
            className={cn(
              'w-12 h-[26px] rounded-full relative cursor-pointer transition-colors duration-200 border-0 p-0',
              annual
                ? 'bg-[var(--dk-color-primary,#3b82f6)]'
                : 'bg-[var(--dk-color-neutral-200,#e5e7eb)]',
            )}
            onClick={() => setAnnual(prev => !prev)}
            aria-label="Toggle billing period"
            data-part="toggle"
          >
            <span
              className={cn(
                'block w-5 h-5 bg-white rounded-full absolute top-[3px] left-[3px]',
                'shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform duration-200',
                annual && 'translate-x-[22px]',
              )}
            />
          </button>
          <span
            className={cn(
              'font-sans text-sm cursor-pointer select-none',
              annual
                ? 'text-[var(--dk-color-text,#111827)] font-semibold'
                : 'text-[var(--dk-color-text-muted,#6b7280)]',
            )}
            onClick={() => setAnnual(true)}
          >
            {annualLabel}
          </span>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-12 max-md:max-w-[400px] max-md:mx-auto"
          data-part="grid"
        >
          {enhancedChildren}
        </div>

        {comparisonFeatures.length > 0 && (
          <table
            className="w-full border-collapse font-sans max-md:text-[0.8rem]"
            data-part="comparison-table"
          >
            <thead>
              <tr>
                <th className="p-3 px-4 text-center border-b border-[var(--dk-color-border,#e5e7eb)] text-sm font-semibold text-[var(--dk-color-text,#111827)] bg-[var(--dk-color-surface-alt,#f9fafb)] text-left">
                  Feature
                </th>
                {tierNames.map((tn, i) => (
                  <th
                    key={i}
                    className="p-3 px-4 text-center border-b border-[var(--dk-color-border,#e5e7eb)] text-sm font-semibold text-[var(--dk-color-text,#111827)] bg-[var(--dk-color-surface-alt,#f9fafb)]"
                  >
                    {tn}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, ri) => (
                <tr key={ri}>
                  <td className="p-3 px-4 text-left border-b border-[var(--dk-color-border,#e5e7eb)] text-sm text-[var(--dk-color-text,#111827)]">
                    {row.feature}
                  </td>
                  {row.tiers.map((has, ti) => (
                    <td
                      key={ti}
                      className="p-3 px-4 text-center border-b border-[var(--dk-color-border,#e5e7eb)]"
                    >
                      {has ? <CheckIcon /> : <CrossIcon />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
