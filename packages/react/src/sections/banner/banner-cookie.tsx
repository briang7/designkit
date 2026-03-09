'use client';

import { useState } from 'react';
import { cn } from '../../utils/cn.js';
import { type BgVariant } from '../../utils/bg.js';

export interface BannerCookieProps {
  message?: string;
  acceptText?: string;
  declineText?: string;
  position?: 'bottom' | 'top';
  bg?: BgVariant;
  className?: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

const bgMap: Record<string, string> = {
  dark: 'bg-[var(--dk-section-bg-dark,#111827)] text-[var(--dk-section-text-on-dark,#fff)]',
  brand: 'bg-[var(--dk-section-bg-brand,#3b82f6)] text-[var(--dk-section-text-on-brand,#fff)]',
  primary:
    'bg-[var(--dk-section-bg-primary,#fff)] text-dk-text border-t border-[var(--dk-color-border,#e5e7eb)]',
  alt: 'bg-[var(--dk-section-bg-alt,#f9fafb)] text-dk-text border-t border-[var(--dk-color-border,#e5e7eb)]',
};

export function BannerCookie({
  message = 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.',
  acceptText = 'Accept',
  declineText = 'Decline',
  position = 'bottom',
  bg = 'dark',
  className,
  onAccept,
  onDecline,
}: BannerCookieProps) {
  const [dismissed, setDismissed] = useState(false);
  const [dismissing, setDismissing] = useState(false);

  if (dismissed) return null;

  const animateOut = (callback?: () => void) => {
    setDismissing(true);
    setTimeout(() => {
      setDismissed(true);
      setDismissing(false);
      callback?.();
    }, 300);
  };

  const positionCls =
    position === 'top'
      ? 'top-0 animate-[dk-slide-in-down_0.4s_ease-out]'
      : 'bottom-0 animate-[dk-slide-in-up_0.4s_ease-out]';

  return (
    <div
      data-part="section"
      className={cn(
        'fixed left-0 right-0 z-[1000] p-0 font-[var(--dk-font-sans,system-ui,sans-serif)]',
        positionCls,
        className,
      )}
      style={{
        // Inline keyframes via CSS custom property fallback
      }}
    >
      <style>{`
        @keyframes dk-slide-in-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes dk-slide-in-down {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes dk-fade-out {
          to { opacity: 0; transform: translateY(10px); }
        }
      `}</style>
      <div
        data-part="banner"
        className={cn(
          'py-4 px-[var(--dk-section-padding-x,1.5rem)]',
          bgMap[bg] || bgMap.dark,
          position === 'top'
            ? 'border-b border-[rgba(255,255,255,0.1)]'
            : 'border-t border-[rgba(255,255,255,0.1)]',
          dismissing && 'animate-[dk-fade-out_0.3s_ease-out_forwards]',
        )}
        role="alert"
      >
        <div
          data-part="container"
          className="mx-auto max-w-[var(--dk-section-max-width,1200px)] flex items-center justify-between gap-6 max-sm:flex-col max-sm:text-center"
        >
          <p data-part="message" className="text-sm leading-normal m-0 flex-1 min-w-0">
            {message}
          </p>
          <div data-part="actions" className="flex gap-3 shrink-0 max-sm:w-full max-sm:justify-center">
            <button
              data-part="decline-btn"
              className={cn(
                'py-2 px-4 whitespace-nowrap rounded-[var(--dk-radius-md,0.5rem)]',
                'font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm font-semibold',
                'bg-transparent text-inherit border border-current opacity-70',
                'cursor-pointer transition-[opacity,transform] duration-200',
                'hover:opacity-100 hover:-translate-y-px active:translate-y-0',
                'focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2',
              )}
              onClick={() => animateOut(onDecline)}
            >
              {declineText}
            </button>
            <button
              data-part="accept-btn"
              className={cn(
                'py-2 px-4 whitespace-nowrap rounded-[var(--dk-radius-md,0.5rem)]',
                'font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm font-semibold',
                'border-none cursor-pointer transition-[opacity,transform] duration-200',
                'hover:opacity-90 hover:-translate-y-px active:translate-y-0',
                'focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2',
                bg === 'brand'
                  ? 'bg-white text-[var(--dk-section-bg-brand,#3b82f6)]'
                  : 'bg-dk-primary text-white',
              )}
              onClick={() => animateOut(onAccept)}
            >
              {acceptText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
