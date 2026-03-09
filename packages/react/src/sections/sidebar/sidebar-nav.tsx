'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../../utils/cn.js';

export interface SidebarNavProps {
  width?: string;
  className?: string;
  children?: ReactNode;
}

export function SidebarNav({
  width = '260px',
  className,
  children,
}: SidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[999] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <nav
        data-part="sidebar"
        className={cn(
          'h-full bg-dk-surface border-r border-dk-border',
          'p-[var(--dk-space-4,1rem)] flex flex-col gap-[var(--dk-space-1,0.25rem)] overflow-y-auto',
          'max-md:fixed max-md:top-0 max-md:left-0 max-md:h-screen max-md:z-[1000]',
          'max-md:transition-transform max-md:duration-300 max-md:ease-out',
          mobileOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
          className,
        )}
        style={{ width }}
      >
        {children}
      </nav>
      <button
        className={cn(
          'hidden max-md:flex',
          'fixed bottom-[var(--dk-space-4,1rem)] left-[var(--dk-space-4,1rem)] z-[1001]',
          'w-12 h-12 rounded-full bg-dk-primary text-white',
          'border-none cursor-pointer text-2xl items-center justify-center',
          'shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
        )}
        data-part="menu-toggle"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle navigation"
        type="button"
      >
        {mobileOpen ? '\u2715' : '\u2630'}
      </button>
    </>
  );
}
