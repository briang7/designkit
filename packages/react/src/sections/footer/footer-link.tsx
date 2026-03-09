import { cn } from '../../utils/cn.js';

export interface FooterLinkProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

export function FooterLink({
  href = '#',
  children,
  className,
}: FooterLinkProps) {
  return (
    <a
      href={href}
      data-part="link"
      className={cn(
        'text-[length:var(--dk-text-sm,0.875rem)] text-dk-text-muted no-underline leading-[var(--dk-leading-normal,1.5)] transition-colors duration-[var(--dk-transition-fast,150ms)] hover:text-dk-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dk-color-primary,#3b82f6)] rounded-sm',
        className,
      )}
    >
      {children}
    </a>
  );
}
