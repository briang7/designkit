'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../../utils/cn.js';

export interface SidebarGroupProps {
  label: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
  children?: ReactNode;
}

export function SidebarGroup({
  label,
  collapsible = false,
  defaultOpen = true,
  className,
  children,
}: SidebarGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    if (collapsible) setOpen(prev => !prev);
  };

  return (
    <div data-part="group" className={cn('mb-[var(--dk-space-2,0.5rem)]', className)}>
      <button
        className={cn(
          'flex items-center justify-between w-full',
          'py-[var(--dk-space-2,0.5rem)] px-[var(--dk-space-3,0.75rem)]',
          'font-sans text-xs font-semibold',
          'text-[var(--dk-color-text-muted,#6b7280)]',
          'uppercase tracking-wider',
          'border-none bg-transparent text-left',
          collapsible
            ? 'cursor-pointer rounded-[var(--dk-radius-md,0.5rem)] transition-colors duration-150 hover:bg-[var(--dk-color-surface-alt,#f9fafb)]'
            : 'cursor-default',
        )}
        data-part="heading"
        onClick={toggle}
        type="button"
      >
        <span>{label}</span>
        {collapsible && (
          <svg
            className={cn(
              'w-4 h-4 transition-transform duration-200',
              !open && '-rotate-90',
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>
      <div className="overflow-hidden" style={{ height: open ? 'auto' : 0 }}>
        <div className="py-[var(--dk-space-1,0.25rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}
