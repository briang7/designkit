'use client';

import { useState } from 'react';
import { cn } from '../../utils/cn.js';
import { type BgVariant } from '../../utils/bg.js';

export interface BannerFloatingProps {
  message: string;
  dismissable?: boolean;
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
  bg?: BgVariant;
  className?: string;
  cta?: React.ReactNode;
  onDismiss?: () => void;
}

const positionMap: Record<string, string> = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
  'bottom-left': 'bottom-6 left-6',
};

const bgMap: Record<string, string> = {
  dark: 'bg-[var(--dk-section-bg-dark,#111827)] text-[var(--dk-section-text-on-dark,#fff)]',
  brand: 'bg-[var(--dk-section-bg-brand,#3b82f6)] text-[var(--dk-section-text-on-brand,#fff)]',
  primary:
    'bg-[var(--dk-section-bg-primary,#fff)] text-dk-text border border-[var(--dk-color-border,#e5e7eb)]',
  alt: 'bg-[var(--dk-section-bg-alt,#f9fafb)] text-dk-text border border-[var(--dk-color-border,#e5e7eb)]',
};

export function BannerFloating({
  message,
  dismissable = true,
  position = 'bottom-right',
  bg = 'dark',
  className,
  cta,
  onDismiss,
}: BannerFloatingProps) {
  const [dismissed, setDismissed] = useState(false);
  const [dismissing, setDismissing] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(() => {
      setDismissed(true);
      setDismissing(false);
      onDismiss?.();
    }, 300);
  };

  return (
    <div
      data-part="section"
      className={cn(
        'fixed z-[1000] p-0 pointer-events-none font-[var(--dk-font-sans,system-ui,sans-serif)]',
        positionMap[position] || positionMap['bottom-right'],
        className,
      )}
    >
      <style>{`
        @keyframes dk-slide-in-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes dk-fade-out {
          to { opacity: 0; transform: translateY(10px); }
        }
      `}</style>
      <div
        data-part="banner"
        className={cn(
          'pointer-events-auto rounded-xl',
          'shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]',
          'py-4 px-5 max-w-[400px] min-w-[280px]',
          'animate-[dk-slide-in-up_0.4s_ease-out]',
          bgMap[bg] || bgMap.dark,
          dismissing && 'animate-[dk-fade-out_0.3s_ease-out_forwards]',
        )}
        role="status"
      >
        <div data-part="container" className="flex items-start justify-between gap-3">
          <p data-part="message" className="text-sm flex-1 m-0">
            {message}
          </p>
          {dismissable && (
            <button
              data-part="dismiss-btn"
              className={cn(
                'bg-transparent border-none cursor-pointer text-inherit opacity-70',
                'p-1 inline-flex items-center justify-center rounded-sm shrink-0',
                'transition-opacity duration-200 hover:opacity-100',
                'focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2',
              )}
              onClick={handleDismiss}
              aria-label="Dismiss notification"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        {cta && (
          <div data-part="cta" className="mt-3">
            {cta}
          </div>
        )}
      </div>
    </div>
  );
}
