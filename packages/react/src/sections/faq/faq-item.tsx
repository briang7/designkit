'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn.js';

export interface FaqItemProps {
  question: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function FaqItem({
  question,
  children,
  isOpen = false,
  onToggle,
  className,
}: FaqItemProps) {
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>(isOpen ? 'auto' : '0px');

  useEffect(() => {
    if (!answerRef.current) return;
    if (isOpen) {
      const inner = answerRef.current.querySelector('[data-part="answer-inner"]') as HTMLElement | null;
      setHeight(inner ? `${inner.offsetHeight}px` : 'auto');
    } else {
      setHeight('0px');
    }
  }, [isOpen]);

  const handleTransitionEnd = useCallback(() => {
    if (isOpen) setHeight('auto');
  }, [isOpen]);

  return (
    <div
      data-part="item"
      className={cn('border-b border-[var(--dk-color-border,#e5e7eb)]', className)}
    >
      <button
        data-part="trigger"
        className={cn(
          'flex w-full items-center justify-between gap-4 bg-transparent border-none rounded-md',
          'py-5 px-3 -mx-3 text-left cursor-pointer',
          'font-[var(--dk-font-sans,system-ui,sans-serif)] text-base font-semibold leading-relaxed',
          'text-dk-text transition-colors duration-200',
          'hover:text-dk-primary hover:bg-[var(--dk-color-surface-hover,rgba(0,0,0,0.02))]',
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span data-part="question">{question}</span>
        <svg
          className={cn(
            'shrink-0 w-5 h-5 text-dk-text-muted transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
            isOpen && 'rotate-45 text-dk-primary',
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div
        ref={answerRef}
        data-part="answer"
        className="overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ height }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div
          data-part="answer-inner"
          className="pb-5 font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm text-dk-text-muted leading-relaxed"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
