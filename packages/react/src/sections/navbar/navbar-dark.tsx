'use client';

import { useState } from 'react';
import { cn } from '../../utils/cn.js';
import { type BgVariant } from '../../utils/bg.js';

export interface NavbarDarkProps {
  brand?: string;
  sticky?: boolean;
  logo?: React.ReactNode;
  links?: React.ReactNode;
  cta?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

export function NavbarDark({
  brand,
  sticky = false,
  logo,
  links,
  cta,
  className,
}: NavbarDarkProps) {
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
        className="flex items-center h-[var(--dk-navbar-height,64px)] px-[var(--dk-section-padding-x,1.5rem)] bg-[var(--dk-navbar-dark-bg,#111827)] backdrop-blur-[8px] border-b border-[var(--dk-navbar-dark-border,rgba(255,255,255,0.1))]"
      >
        <div
          data-part="container"
          className="flex items-center w-full max-w-[var(--dk-section-max-width,1200px)] mx-auto"
        >
          <div
            data-part="brand"
            className="flex items-center gap-2 text-lg font-bold text-white whitespace-nowrap shrink-0"
          >
            {logo || brand}
          </div>

          <div
            data-part="links"
            className="hidden md:flex items-center gap-[var(--dk-navbar-link-gap,0.5rem)] flex-1 justify-center [&_a]:px-4 [&_a]:py-2 [&_a]:text-sm [&_a]:font-medium [&_a]:text-white/70 [&_a]:no-underline [&_a]:rounded-md [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-[var(--dk-color-brand,#3b82f6)] [&_a:hover]:bg-white/[0.08]"
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
                'block w-[22px] h-[2px] bg-white rounded-[1px] transition-all duration-300 origin-center',
                mobileOpen && 'translate-y-[7px] rotate-45',
              )}
            />
            <span
              className={cn(
                'block w-[22px] h-[2px] bg-white rounded-[1px] transition-all duration-300 origin-center',
                mobileOpen && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'block w-[22px] h-[2px] bg-white rounded-[1px] transition-all duration-300 origin-center',
                mobileOpen && '-translate-y-[7px] -rotate-45',
              )}
            />
          </button>
        </div>
      </nav>

      <div
        data-part="mobile-menu"
        className={cn(
          'flex md:hidden absolute left-0 right-0 bg-[var(--dk-navbar-dark-bg,#111827)] backdrop-blur-[8px] border-b border-[var(--dk-navbar-dark-border,rgba(255,255,255,0.1))] px-[var(--dk-section-padding-x,1.5rem)] flex-col gap-2 z-[1100] overflow-hidden transition-all duration-300',
          '[&_a]:block [&_a]:px-4 [&_a]:py-3 [&_a]:text-base [&_a]:text-white/85 [&_a]:no-underline [&_a]:rounded-md [&_a:hover]:bg-white/[0.08] [&_a:hover]:text-[var(--dk-color-brand,#3b82f6)]',
          mobileOpen
            ? 'max-h-[500px] py-4'
            : 'max-h-0 py-0',
        )}
      >
        {links}
        <div
          className="mt-2 pt-2 border-t border-white/10"
        >
          {cta}
        </div>
      </div>
    </div>
  );
}
