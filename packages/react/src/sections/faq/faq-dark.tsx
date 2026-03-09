'use client';

import { useState, useCallback } from 'react';
import { cn } from '../../utils/cn.js';
import { FaqItem } from './faq-item.js';

export interface FaqEntry {
  question: string;
  answer: React.ReactNode;
}

export interface FaqDarkProps {
  headline?: string;
  subheadline?: string;
  multiple?: boolean;
  items: FaqEntry[];
  className?: string;
}

export function FaqDark({
  headline,
  subheadline,
  multiple = false,
  items,
  className,
}: FaqDarkProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const handleToggle = useCallback(
    (index: number) => {
      setOpenSet((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (!multiple) next.clear();
          next.add(index);
        }
        return next;
      });
    },
    [multiple],
  );

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
        className="mx-auto max-w-[var(--dk-section-max-width,1200px)]"
      >
        {(headline || subheadline) && (
          <div data-part="header" className="text-center mb-12">
            {headline && (
              <h2
                data-part="headline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-[#f9fafb] mb-4"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                data-part="subheadline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-[#d1d5db] max-w-[640px] mx-auto m-0"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div
          data-part="faq-list"
          className={cn(
            'max-w-3xl mx-auto',
            '[--dk-color-text:#f9fafb] [--dk-color-text-muted:#d1d5db] [--dk-color-border:rgba(255,255,255,0.12)]',
          )}
        >
          {items.map((item, i) => (
            <FaqItem
              key={i}
              question={item.question}
              isOpen={openSet.has(i)}
              onToggle={() => handleToggle(i)}
              className="border-b-[rgba(255,255,255,0.12)]"
            >
              {item.answer}
            </FaqItem>
          ))}
        </div>
      </div>
    </section>
  );
}
