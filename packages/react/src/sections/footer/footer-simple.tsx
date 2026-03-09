import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface FooterSimpleProps {
  brand?: string;
  copyright?: string;
  logo?: React.ReactNode;
  links?: React.ReactNode;
  social?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function FooterSimple({
  brand = '',
  copyright = `\u00A9 ${new Date().getFullYear()}`,
  logo,
  links,
  social,
  bg,
  className,
}: FooterSimpleProps) {
  return (
    <footer
      data-part="footer"
      className={cn(
        'py-6 px-[var(--dk-section-padding-x,1.5rem)] border-t border-[var(--dk-color-border,#e5e7eb)]',
        bgVariant(bg),
        className,
      )}
    >
      <div
        data-part="container"
        className="mx-auto max-w-[var(--dk-section-max-width,1200px)]"
      >
        <div
          data-part="row"
          className="flex items-center justify-between flex-wrap gap-4 max-sm:flex-col max-sm:text-center"
        >
          <div
            data-part="left"
            className="flex items-center gap-6 flex-wrap max-sm:justify-center"
          >
            {logo || (
              <span
                data-part="brand-name"
                className="font-[var(--dk-font-display,var(--dk-font-sans,system-ui,sans-serif))] text-[length:var(--dk-text-xl,1.25rem)] font-bold text-dk-text tracking-tight"
              >
                {brand}
              </span>
            )}
            <div
              data-part="inline-links"
              className="flex items-center gap-[var(--dk-space-1,0.25rem)]"
            >
              {links}
            </div>
          </div>
          <div
            data-part="right"
            className="flex items-center gap-4 max-sm:justify-center"
          >
            <div
              data-part="social-row"
              className="flex gap-[var(--dk-space-3,0.75rem)] items-center"
            >
              {social}
            </div>
            <p
              data-part="copyright"
              className="text-[length:var(--dk-text-xs,0.75rem)] text-dk-text-muted m-0"
            >
              {copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
