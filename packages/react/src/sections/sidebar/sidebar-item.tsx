import { cn } from '../../utils/cn.js';

export interface SidebarItemProps {
  icon?: string;
  label: string;
  href?: string;
  active?: boolean;
  badge?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function SidebarItem({
  icon,
  label,
  href,
  active = false,
  badge,
  className,
  onClick,
}: SidebarItemProps) {
  return (
    <a
      className={cn(
        'flex items-center gap-[var(--dk-space-3,0.75rem)]',
        'py-[var(--dk-space-2,0.5rem)] px-[var(--dk-space-3,0.75rem)]',
        'rounded-[var(--dk-radius-md,0.5rem)]',
        'font-sans text-sm no-underline cursor-pointer',
        'transition-[background,color] duration-150 ease-out',
        active
          ? 'bg-[var(--dk-color-primary-subtle,rgba(59,130,246,0.08))] text-[var(--dk-color-primary,#3b82f6)] font-semibold'
          : 'text-[var(--dk-color-text-muted,#6b7280)] hover:bg-[var(--dk-color-surface-alt,#f9fafb)] hover:text-[var(--dk-color-text,#111827)]',
        className,
      )}
      data-part="item"
      href={href || undefined}
      onClick={onClick}
    >
      {icon && (
        <span
          className="flex items-center justify-center w-5 h-5 shrink-0 text-lg"
          data-part="icon"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap" data-part="label">
        {label}
      </span>
      {badge && (
        <span
          className="text-xs font-semibold bg-[var(--dk-color-primary,#3b82f6)] text-white px-2 py-0.5 rounded-full leading-snug"
          data-part="badge"
        >
          {badge}
        </span>
      )}
    </a>
  );
}
