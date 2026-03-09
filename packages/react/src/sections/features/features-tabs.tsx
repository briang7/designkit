'use client';

import { useState } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface TabItem {
  label: string;
  image: string;
  title: string;
  description: string;
}

export interface FeaturesTabsProps {
  headline?: string;
  subheadline?: string;
  tabs?: TabItem[];
  bg?: BgVariant;
  className?: string;
}

export function FeaturesTabs({
  headline,
  subheadline,
  tabs = [],
  bg,
  className,
}: FeaturesTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const active = tabs[activeTab];

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
        className="mx-auto max-w-[var(--dk-section-max-width,1280px)]"
      >
        {(headline || subheadline) && (
          <div data-part="header" className="text-center mb-12">
            {headline && (
              <h2
                data-part="headline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-dk-text m-0 mb-4"
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                data-part="subheadline"
                className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-dk-text-muted m-0 max-w-[640px] mx-auto"
              >
                {subheadline}
              </p>
            )}
          </div>
        )}

        {tabs.length > 0 && (
          <>
            <div
              data-part="tab-bar"
              role="tablist"
              className="flex justify-center gap-3 mb-10 flex-wrap"
            >
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  data-part="tab-button"
                  role="tab"
                  aria-selected={i === activeTab}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    'font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm font-semibold py-2 px-5 rounded-full border cursor-pointer leading-normal',
                    i === activeTab
                      ? 'bg-dk-primary border-dk-primary text-[var(--dk-color-on-primary,#fff)]'
                      : 'bg-[var(--dk-color-surface,#fff)] border-[var(--dk-color-border,#e5e7eb)] text-dk-text-muted hover:border-dk-primary hover:text-dk-primary',
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {active && (
              <div
                key={activeTab}
                data-part="tab-content"
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
              >
                {active.image && (
                  <img
                    data-part="tab-image"
                    src={active.image}
                    alt={active.title || ''}
                    loading="lazy"
                    className="w-full h-auto rounded-[var(--dk-radius-xl,1rem)] shadow-md object-cover md:order-none order-first"
                  />
                )}
                <div className="flex flex-col gap-4">
                  {active.title && (
                    <h3
                      data-part="tab-title"
                      className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-[clamp(1.5rem,3vw,1.875rem)] font-bold text-dk-text leading-tight tracking-tight m-0"
                    >
                      {active.title}
                    </h3>
                  )}
                  {active.description && (
                    <p
                      data-part="tab-description"
                      className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-base leading-relaxed text-dk-text-muted m-0"
                    >
                      {active.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
