import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface LogoCloudGridProps {
  headline?: string;
  columns?: number;
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

export function LogoCloudGrid({
  headline,
  columns = 4,
  bg = 'primary',
  className,
  children,
}: LogoCloudGridProps) {
  const isDark = bg === 'dark' || bg === 'brand';

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
        className="max-w-dk-section mx-auto text-center flex flex-col items-center"
      >
        {headline && (
          <h2
            data-part="headline"
            className="mb-[var(--dk-space-10,2.5rem)]"
          >
            {headline}
          </h2>
        )}
        <div
          data-part="grid"
          className={cn(
            'grid w-full rounded-[var(--dk-radius-lg,0.75rem)] overflow-hidden',
            'border gap-px max-md:grid-cols-2',
            isDark
              ? 'border-white/[0.12] bg-white/[0.12]'
              : 'border-black/[0.08] bg-black/[0.08]',
            isDark
              ? '[&>*]:bg-[#111827] [&>*:hover]:bg-[#1f2937]'
              : '[&>*]:bg-white [&>*:hover]:bg-[#f9fafb]',
            '[&>*]:flex [&>*]:items-center [&>*]:justify-center',
            '[&>*]:p-[var(--dk-logo-cloud-grid-padding,2rem_1.5rem)]',
            '[&>*]:transition-colors [&>*]:duration-300',
          )}
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
