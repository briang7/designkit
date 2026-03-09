import { cn } from '../../utils/cn.js';
import { type BgVariant } from '../../utils/bg.js';

export interface FooterDarkProps {
  brand?: string;
  description?: string;
  copyright?: string;
  logo?: React.ReactNode;
  columns?: React.ReactNode;
  social?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function FooterDark({
  brand = '',
  description,
  copyright = `\u00A9 ${new Date().getFullYear()}`,
  logo,
  columns,
  social,
  bg: _bg,
  className,
}: FooterDarkProps) {
  return (
    <footer
      data-part="footer"
      className={cn(
        'py-[var(--dk-section-padding-y,5rem)] px-[var(--dk-section-padding-x,1.5rem)] bg-[var(--dk-footer-dark-bg,#111827)] border-t border-[var(--dk-footer-dark-border,#1f2937)]',
        className,
      )}
    >
      <div
        data-part="container"
        className="mx-auto max-w-[var(--dk-section-max-width,1200px)]"
      >
        <div
          data-part="top-section"
          className="flex gap-[var(--dk-space-12,3rem)] max-md:flex-col"
        >
          <div
            data-part="brand-col"
            className="flex flex-col gap-[var(--dk-space-4,1rem)] shrink-0 basis-[280px] max-md:basis-auto"
          >
            {logo || (
              <p
                data-part="brand-name"
                className="font-[var(--dk-font-display,var(--dk-font-sans,system-ui,sans-serif))] text-[length:var(--dk-text-xl,1.25rem)] font-bold text-[var(--dk-footer-dark-text,#f9fafb)] mb-[var(--dk-space-3,0.75rem)] tracking-tight m-0"
              >
                {brand}
              </p>
            )}
            {description && (
              <p
                data-part="description"
                className="text-[length:var(--dk-text-sm,0.875rem)] text-[var(--dk-footer-dark-muted,#9ca3af)] leading-[var(--dk-leading-relaxed,1.6)] m-0 max-w-[320px]"
              >
                {description}
              </p>
            )}
          </div>
          <div
            data-part="columns"
            className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-8 max-[480px]:grid-cols-2 [--dk-color-text:var(--dk-footer-dark-text,#f9fafb)] [--dk-color-text-muted:var(--dk-footer-dark-muted,#9ca3af)]"
          >
            {columns}
          </div>
        </div>

        <div
          data-part="bottom-bar"
          className="flex items-center justify-between pt-[var(--dk-space-6,1.5rem)] mt-[var(--dk-space-6,1.5rem)] border-t border-[var(--dk-footer-dark-border,#1f2937)] flex-wrap gap-4"
        >
          <p
            data-part="copyright"
            className="text-[length:var(--dk-text-xs,0.75rem)] text-[var(--dk-footer-dark-muted,#6b7280)] m-0"
          >
            {copyright}
          </p>
          <div
            data-part="social-row"
            className="flex gap-[var(--dk-space-3,0.75rem)] items-center [--dk-color-text-muted:var(--dk-footer-dark-muted,#9ca3af)] [--dk-color-text:var(--dk-footer-dark-text,#f9fafb)] [--dk-color-surface-hover:rgba(255,255,255,0.08)]"
          >
            {social}
          </div>
        </div>
      </div>
    </footer>
  );
}
