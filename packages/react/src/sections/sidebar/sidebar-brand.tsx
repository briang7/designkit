import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';

export interface SidebarBrandProps {
  width?: string;
  logo?: ReactNode;
  user?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function SidebarBrand({
  width = '260px',
  logo,
  user,
  className,
  children,
}: SidebarBrandProps) {
  return (
    <aside
      data-part="sidebar"
      className={cn(
        'h-full bg-[var(--dk-color-neutral-900,#111827)] text-white',
        'flex flex-col overflow-y-auto',
        className,
      )}
      style={{ width }}
    >
      <div
        data-part="logo"
        className="px-[var(--dk-space-4,1rem)] py-[var(--dk-space-6,1.5rem)] border-b border-white/10"
      >
        {logo}
      </div>
      <div
        data-part="nav"
        className={cn(
          'flex-1 p-[var(--dk-space-4,1rem)] flex flex-col gap-[var(--dk-space-1,0.25rem)]',
          '[&_a]:text-white/60 [&_a]:hover:text-white [&_a]:hover:bg-white/[0.08]',
          '[&_[data-part=heading]]:text-white/50',
          '[&_[data-part=item][class*=bg-]]:bg-[rgba(99,164,255,0.15)]',
        )}
      >
        {children}
      </div>
      {user && (
        <div
          data-part="user"
          className="p-[var(--dk-space-4,1rem)] border-t border-white/10"
        >
          {user}
        </div>
      )}
    </aside>
  );
}
