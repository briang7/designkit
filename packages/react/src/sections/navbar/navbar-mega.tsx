'use client';

import { useState, useRef, useCallback } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface NavbarMegaMenu {
  label: string;
  slot: string;
}

export interface NavbarMegaProps {
  brand?: string;
  sticky?: boolean;
  transparent?: boolean;
  menus?: NavbarMegaMenu[];
  logo?: React.ReactNode;
  links?: React.ReactNode;
  cta?: React.ReactNode;
  /** Mega panel content keyed by menu slot name */
  panels?: Record<string, React.ReactNode>;
  bg?: BgVariant;
  className?: string;
}

export function NavbarMega({
  brand,
  sticky = false,
  transparent = false,
  menus = [],
  logo,
  links,
  cta,
  panels = {},
  bg,
  className,
}: NavbarMegaProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const openMenu = useCallback((slot: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = undefined;
    }
    setActiveMenu(slot);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = undefined;
    }
  }, []);

  return (
    <div
      className={cn(
        'block h-[var(--dk-navbar-height,64px)] z-[1100] relative',
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
            {menus.map((menu) => (
              <button
                key={menu.slot}
                data-part="mega-trigger"
                className={cn(
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium text-[var(--dk-color-text-muted,#6b7280)] bg-transparent border-none rounded-md cursor-pointer font-[var(--dk-font-sans,system-ui,sans-serif)] transition-colors duration-150',
                  'hover:text-dk-text hover:bg-[var(--dk-color-surface-hover,#f3f4f6)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dk-color-primary,#3b82f6)]',
                  activeMenu === menu.slot && 'text-dk-text bg-[var(--dk-color-surface-hover,#f3f4f6)]',
                )}
                aria-expanded={activeMenu === menu.slot}
                onMouseEnter={() => openMenu(menu.slot)}
                onMouseLeave={scheduleClose}
                onFocus={() => openMenu(menu.slot)}
                onBlur={scheduleClose}
              >
                {menu.label}
                <svg
                  className={cn(
                    'w-3 h-3 transition-transform duration-200',
                    activeMenu === menu.slot && 'rotate-180',
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            ))}
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

      {/* Mega panels */}
      {menus.map((menu) => (
        <div
          key={menu.slot}
          data-part="mega-panel"
          data-menu={menu.slot}
          className={cn(
            'hidden md:block absolute top-[var(--dk-navbar-height,64px)] left-0 right-0 bg-[var(--dk-navbar-bg,var(--dk-color-surface,#fff))] backdrop-blur-[8px] border-b border-[var(--dk-color-border,#e5e7eb)] shadow-lg z-[100] transition-all duration-200',
            activeMenu === menu.slot
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none',
          )}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="max-w-[var(--dk-section-max-width,1200px)] mx-auto py-6 px-[var(--dk-section-padding-x,1.5rem)]">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              {panels[menu.slot]}
            </div>
          </div>
        </div>
      ))}

      {/* Mobile menu */}
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
        {menus.map((menu) => (
          <div key={menu.slot}>{panels[menu.slot]}</div>
        ))}
        <div className="mt-2 pt-2 border-t border-[var(--dk-color-border,#e5e7eb)]">
          {cta}
        </div>
      </div>
    </div>
  );
}
