import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface LogoCloudSimpleProps {
  headline?: string;
  bg?: BgVariant;
  className?: string;
  children?: ReactNode;
}

export function LogoCloudSimple({
  headline,
  bg,
  className,
  children,
}: LogoCloudSimpleProps) {
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
        className="mx-auto max-w-[var(--dk-section-max-width,1280px)] text-center flex flex-col items-center"
      >
        {headline && (
          <h2
            data-part="headline"
            className={cn(
              'font-sans font-semibold uppercase',
              'text-[var(--dk-logo-cloud-headline-size,0.875rem)]',
              'tracking-[var(--dk-logo-cloud-headline-tracking,0.1em)]',
              'text-[var(--dk-color-text-muted,#6b7280)]',
              'mb-[var(--dk-space-8,2rem)]',
            )}
          >
            {headline}
          </h2>
        )}
        <div
          data-part="logos"
          className={cn(
            'flex flex-wrap justify-center items-center w-full',
            'gap-[var(--dk-logo-cloud-gap,3rem)] max-md:gap-[var(--dk-logo-cloud-gap-mobile,2rem)]',
            '[&>*]:grayscale [&>*]:opacity-60',
            '[&>*]:transition-[filter,opacity] [&>*]:duration-300 [&>*]:ease-out',
            '[&>*]:max-h-[var(--dk-logo-cloud-logo-height,40px)] [&>*]:w-auto',
            'hover:[&>*]:grayscale-0 hover:[&>*]:opacity-100',
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
