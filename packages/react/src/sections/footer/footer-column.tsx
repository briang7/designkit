import { cn } from '../../utils/cn.js';

export interface FooterColumnProps {
  label: string;
  children?: React.ReactNode;
  className?: string;
}

export function FooterColumn({ label, children, className }: FooterColumnProps) {
  return (
    <div data-part="column" className={cn('block', className)}>
      <p
        data-part="label"
        className="text-[length:var(--dk-text-sm,0.875rem)] font-[var(--dk-font-semibold,600)] text-dk-text mb-[var(--dk-space-3,0.75rem)] tracking-[0.02em]"
      >
        {label}
      </p>
      <div
        data-part="links"
        className="flex flex-col gap-[var(--dk-space-2,0.5rem)]"
      >
        {children}
      </div>
    </div>
  );
}
