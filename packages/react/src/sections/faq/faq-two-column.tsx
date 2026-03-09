'use client';

import { useState } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FaqTwoColumnProps {
  headline?: string;
  subheadline?: string;
  items: FaqEntry[];
  bg?: BgVariant;
  className?: string;
}

export function FaqTwoColumn({
  headline,
  subheadline,
  items,
  bg,
  className,
}: FaqTwoColumnProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = selectedIndex >= 0 ? items[selectedIndex] : null;

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
        className="mx-auto max-w-[var(--dk-section-max-width,1200px)]"
      >
        {(headline || subheadline) && (
          <div data-part="header" className="text-center mb-12">
            {headline && (
              <h2
                data-part="headline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-dk-text mb-4"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                data-part="subheadline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-dk-text-muted max-w-[640px] mx-auto m-0"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div
          data-part="two-col"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[960px] mx-auto"
        >
          <div data-part="questions" className="flex flex-col">
            {items.map((item, i) => (
              <button
                key={i}
                data-part="question-btn"
                data-active={i === selectedIndex || undefined}
                className={cn(
                  'block w-full text-left bg-transparent border-0 border-b border-[var(--dk-color-border,#e5e7eb)]',
                  'py-4 px-3 font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm font-medium',
                  'text-dk-text cursor-pointer rounded-md transition-colors duration-150',
                  'hover:text-dk-primary hover:bg-[var(--dk-color-primary-subtle,rgba(59,130,246,0.05))]',
                  i === selectedIndex &&
                    'text-dk-primary font-semibold bg-[var(--dk-color-primary-subtle,rgba(59,130,246,0.08))]',
                )}
                onClick={() => setSelectedIndex(i)}
              >
                {item.question}
              </button>
            ))}
          </div>
          <div
            data-part="answer-panel"
            className="p-6 bg-[var(--dk-color-surface-alt,#f9fafb)] rounded-xl min-h-[200px]"
          >
            {selected ? (
              <>
                <h3 className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-lg font-semibold text-dk-text mb-4 mt-0">
                  {selected.question}
                </h3>
                <p className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm text-dk-text-muted leading-relaxed m-0">
                  {selected.answer}
                </p>
              </>
            ) : (
              <div className="flex items-center justify-center h-full font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm text-dk-text-muted">
                Select a question to see the answer
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
