import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface FooterCenteredProps {
  brand?: string;
  copyright?: string;
  logo?: React.ReactNode;
  links?: React.ReactNode;
  social?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function FooterCentered({
  brand = '',
  copyright = `\u00A9 ${new Date().getFullYear()}`,
  logo,
  links,
  social,
  bg,
  className,
}: FooterCenteredProps) {
  return (
    <footer
      data-part="footer"
      className={cn(
        'py-[var(--dk-section-padding-y,5rem)] px-[var(--dk-section-padding-x,1.5rem)] border-t border-[var(--dk-color-border,#e5e7eb)]',
        bgVariant(bg),
        className,
      )}
    >
      <div
        data-part="container"
        className="mx-auto max-w-[var(--dk-section-max-width,1200px)] flex flex-col items-center text-center gap-[var(--dk-space-6,1.5rem)]"
      >
        {logo || (
          <p
            data-part="brand-name"
            className="font-[var(--dk-font-display,var(--dk-font-sans,system-ui,sans-serif))] text-[length:var(--dk-text-xl,1.25rem)] font-bold text-dk-text tracking-tight m-0"
          >
            {brand}
          </p>
        )}

        <div
          data-part="links"
          className="flex items-center justify-center flex-wrap gap-[var(--dk-space-1,0.25rem)]"
        >
          {links}
        </div>

        <div
          data-part="social-row"
          className="flex gap-[var(--dk-space-3,0.75rem)] items-center justify-center"
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
    </footer>
  );
}
