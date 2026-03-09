'use client';

import { useState, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface NavbarWithSearchProps {
  brand?: string;
  sticky?: boolean;
  transparent?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  logo?: React.ReactNode;
  links?: React.ReactNode;
  cta?: React.ReactNode;
  bg?: BgVariant;
  className?: string;
}

function SearchInput({
  placeholder,
  onSearch,
  mobile = false,
}: {
  placeholder: string;
  onSearch?: (query: string) => void;
  mobile?: boolean;
}) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.((e.target as HTMLInputElement).value);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center relative shrink-0',
        mobile ? 'mb-2 [&_input]:w-full' : 'mx-3 hidden md:flex',
      )}
    >
      <svg
        className="absolute left-[10px] w-4 h-4 text-[var(--dk-color-text-muted,#9ca3af)] pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        data-part="search-input"
        placeholder={placeholder}
        aria-label="Search"
        onKeyDown={handleKeyDown}
        className={cn(
          'h-9 pl-[34px] pr-3 border border-[var(--dk-color-border,#e5e7eb)] rounded-full bg-[var(--dk-color-surface,#f9fafb)] text-sm text-dk-text outline-none transition-all duration-200',
          'placeholder:text-[var(--dk-color-text-muted,#9ca3af)]',
          'focus:border-[var(--dk-color-primary,#3b82f6)] focus:ring-2 focus:ring-[rgba(59,130,246,0.3)]',
          mobile ? 'w-full' : 'w-40 focus:w-60',
        )}
      />
    </div>
  );
}

export function NavbarWithSearch({
  brand,
  sticky = false,
  transparent = false,
  searchPlaceholder = 'Search...',
  onSearch,
  logo,
  links,
  cta,
  bg,
  className,
}: NavbarWithSearchProps) {
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

          <SearchInput
            placeholder={searchPlaceholder}
            onSearch={onSearch}
          />

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
        <SearchInput
          placeholder={searchPlaceholder}
          onSearch={onSearch}
          mobile
        />
        {links}
        <div className="mt-2 pt-2 border-t border-[var(--dk-color-border,#e5e7eb)]">
          {cta}
        </div>
      </div>
    </div>
  );
}
