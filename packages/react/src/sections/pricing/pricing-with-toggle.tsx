'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface PricingWithToggleProps {
  headline?: string;
  subheadline?: string;
  monthlyLabel?: string;
  annualLabel?: string;
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

export function PricingWithToggle({
  headline,
  subheadline,
  monthlyLabel = 'Monthly',
  annualLabel = 'Annual',
  bg = 'primary',
  className,
  children,
}: PricingWithToggleProps) {
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
              'font-sans text-sm cursor-pointer select-none transition-[color,font-weight] duration-200',
              !annual
                ? 'text-[var(--dk-color-text,#111827)] font-semibold'
                : 'text-[var(--dk-color-text-muted,#6b7280)]',
            )}
            onClick={() => setAnnual(false)}
            data-part="toggle-label"
          >
            {monthlyLabel}
          </span>
          <button
            className={cn(
              'w-[52px] h-7 rounded-full relative cursor-pointer transition-colors duration-200 border-0 p-0',
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
                'block w-[22px] h-[22px] bg-white rounded-full absolute top-[3px] left-[3px]',
                'shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform duration-200',
                annual && 'translate-x-6',
              )}
            />
          </button>
          <span
            className={cn(
              'font-sans text-sm cursor-pointer select-none transition-[color,font-weight] duration-200',
              annual
                ? 'text-[var(--dk-color-text,#111827)] font-semibold'
                : 'text-[var(--dk-color-text-muted,#6b7280)]',
            )}
            onClick={() => setAnnual(true)}
            data-part="toggle-label"
          >
            {annualLabel}
          </span>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-md:max-w-[400px] max-md:mx-auto"
          data-part="grid"
        >
          {enhancedChildren}
        </div>
      </div>
    </section>
  );
}
