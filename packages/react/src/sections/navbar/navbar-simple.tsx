'use client';

import { useState } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface NavbarSimpleProps {
  brand?: string;
  sticky?: boolean;
  transparent?: boolean;
  logo?: React.ReactNode;
  links?: React.ReactNode;
  cta?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function NavbarSimple({
  brand,
  sticky = false,
  transparent = false,
  logo,
  links,
  cta,
  bg,
  className,
}: NavbarSimpleProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className={cn(
        'block h-[var(--dk-navbar-height,64px)] z-[1100]',
        sticky && 'sticky top-0 z-[1100]',
        className,
      )}
    >
      <nav
        data-part="nav"
        role="navigation"
        aria-label="Main navigation"
        className={cn(
          'flex items-center h-[var(--dk-navbar-height,64px)] px-[var(--dk-section-padding-x,1.5rem)] backdrop-blur-[8px] border-b border-[var(--dk-color-border,#e5e7eb)]',
          transparent
            ? 'bg-transparent border-transparent'
            : bgVariant(bg),
        )}
      >
        <div
          data-part="container"
          className="flex items-center w-full max-w-[var(--dk-section-max-width,1200px)] mx-auto"
        >
          <div
            data-part="brand"
            className="flex items-center gap-2 text-lg font-bold text-dk-text whitespace-nowrap shrink-0"
          >
            {logo || brand}
          </div>

          <div
            data-part="links"
            className="hidden md:flex items-center gap-[var(--dk-navbar-link-gap,0.5rem)] flex-1 justify-center"
          >
            {links}
          </div>

          <div
            data-part="cta"
            className="hidden md:flex items-center gap-2 shrink-0"
          >
            {cta}
          </div>

          <button
            data-part="hamburger"
            className="flex md:hidden flex-col justify-center items-center w-10 h-10 p-0 border-none bg-transparent cursor-pointer gap-[5px] ml-auto rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dk-color-primary,#3b82f6)]"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span
              className={cn(
                'block w-[22px] h-[2px] bg-dk-text rounded-[1px] transition-all duration-300 origin-center',
                mobileOpen && 'translate-y-[7px] rotate-45',
              )}
            />
            <span
              className={cn(
                'block w-[22px] h-[2px] bg-dk-text rounded-[1px] transition-all duration-300 origin-center',
                mobileOpen && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'block w-[22px] h-[2px] bg-dk-text rounded-[1px] transition-all duration-300 origin-center',
                mobileOpen && '-translate-y-[7px] -rotate-45',
              )}
            />
          </button>
        </div>
      </nav>

      <div
        data-part="mobile-menu"
        className={cn(
          'flex md:hidden absolute left-0 right-0 bg-[var(--dk-navbar-bg,var(--dk-color-surface,#fff))] backdrop-blur-[8px] border-b border-[var(--dk-color-border,#e5e7eb)] px-[var(--dk-section-padding-x,1.5rem)] flex-col gap-2 z-[1100] overflow-hidden transition-all duration-300',
          mobileOpen
            ? 'max-h-[500px] py-4'
            : 'max-h-0 py-0',
        )}
      >
        {links}
        <div
          className="mt-2 pt-2 border-t border-[var(--dk-color-border,#e5e7eb)]"
        >
          {cta}
        </div>
      </div>
    </div>
  );
}
