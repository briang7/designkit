'use client';

import { useState } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface BannerBarProps {
  message: string;
  dismissable?: boolean;
  href?: string;
  linkText?: string;
  bg?: BgVariant;
  className?: string;
  onDismiss?: () => void;
}

export function BannerBar({
  message,
  dismissable = true,
  href,
  linkText,
  bg = 'brand',
  className,
  onDismiss,
}: BannerBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      data-part="section"
      className={cn(
        'py-3 px-[var(--dk-section-padding-x,1.5rem)]',
        'font-[var(--dk-font-sans,system-ui,sans-serif)]',
        bgVariant(bg),
        className,
      )}
    >
      <div
        data-part="container"
        className="mx-auto max-w-[var(--dk-section-max-width,1200px)] flex items-center justify-between gap-4"
      >
        <div
          data-part="banner"
          className="flex items-center gap-3 flex-1 min-w-0 max-sm:flex-col max-sm:items-start max-sm:gap-1"
          role="status"
        >
          <p
            data-part="message"
            className="text-sm leading-normal m-0"
          >
            {message}
          </p>
          {href && linkText && (
            <a
              data-part="link"
              className="text-sm font-semibold underline underline-offset-2 text-inherit whitespace-nowrap transition-opacity duration-200 hover:opacity-80"
              href={href}
            >
              {linkText}
            </a>
          )}
        </div>
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
            aria-label="Dismiss banner"
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
    </div>
  );
}
