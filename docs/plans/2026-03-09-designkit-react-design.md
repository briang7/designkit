# DesignKit React — Design Document

## Overview

`@briang7/designkit-react` is a React Server Component library that mirrors the DesignKit Lit web component sections. It converts 95 section components from Lit/Shadow DOM to React/Tailwind CSS, enabling instant SSR rendering with zero client JS for presentational sections.

## Package

- **Name:** `@briang7/designkit-react`
- **Location:** `packages/react/` inside the existing `lit/designkit` monorepo
- **Peer deps:** `react >= 18`, `tailwindcss >= 4`
- **Dev deps:** `typescript`, `clsx`, `tailwind-merge`
- **Optional dep:** `motion` (only needed if using `AnimateOnScroll`)

## Architecture Decisions

### Server Components by default

~85% of sections are pure presentation — props in, HTML out. No state, no event handlers. These are Server Components (no `'use client'` directive), meaning zero JavaScript shipped to the client.

Only ~15% need `'use client'`:
- **Navbars** — mobile menu toggle state
- **Carousels** (testimonials, products, gallery) — slide index, autoplay timer
- **Accordions/FAQ** — open/close state
- **Dialogs/Drawers** — open state, focus trap
- **Banners** — dismiss state
- **Pricing with toggle** — monthly/annual toggle

### Tailwind CSS for styling

All Shadow DOM CSS converted to Tailwind utility classes. DesignKit's `--dk-*` CSS custom properties are mapped to Tailwind via a preset so you get semantic classes like `bg-dk-primary`, `text-dk-text-muted`, `border-dk-border`.

Consumers add the preset to their Tailwind config:
```ts
// tailwind.config.ts or CSS @config
import { designkitPreset } from '@briang7/designkit-react/preset';
```

Theme CSS (`tokens.css`, `light.css`/`dark.css`) still loaded via CSS `@import` — same theming system as the Lit version.

### Named props for slots

Lit slots map to named React props:
- `<slot name="cta-primary">` → `ctaPrimary?: React.ReactNode`
- `<slot name="logo">` → `logo?: React.ReactNode`
- `<slot>` (default) → `children?: React.ReactNode`

### Animations are opt-in and external

Sections don't manage their own scroll animations. Instead, a `<AnimateOnScroll>` client component wrapper handles IntersectionObserver + motion stagger. This keeps sections as Server Components.

```tsx
<AnimateOnScroll>
  <HeroCentered headline="Welcome" />
</AnimateOnScroll>
```

Without the wrapper, sections render instantly with no animation — perfect for SSR.

### Background variants

The Lit `bg` attribute maps to a `bg` prop that applies Tailwind classes:
- `bg="primary"` → `bg-dk-surface` (default)
- `bg="alt"` → `bg-dk-surface-alt`
- `bg="brand"` → `bg-dk-primary text-white`
- `bg="dark"` → `bg-gray-900 text-white`

## Component Pattern

### Server Component (stateless)

```tsx
import { cn } from '../utils/cn';
import { bgVariant } from '../utils/bg';

interface HeroCenteredProps {
  headline: string;
  subheadline?: string;
  bg?: 'primary' | 'alt' | 'brand' | 'dark';
  ctaPrimary?: React.ReactNode;
  ctaSecondary?: React.ReactNode;
  className?: string;
}

export function HeroCentered({
  headline, subheadline, bg = 'primary',
  ctaPrimary, ctaSecondary, className,
}: HeroCenteredProps) {
  return (
    <section className={cn('py-20 px-6', bgVariant(bg), className)}>
      <div className="mx-auto max-w-screen-xl text-center flex flex-col items-center">
        <h1 className="font-extrabold text-dk-text tracking-tight text-balance text-[clamp(2.75rem,6vw,4.5rem)] leading-tight mb-5">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-dk-text-muted text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed max-w-[640px] mb-10 text-balance">
            {subheadline}
          </p>
        )}
        <div className="flex gap-3 flex-wrap justify-center">
          {ctaPrimary}
          {ctaSecondary}
        </div>
      </div>
    </section>
  );
}
```

### Client Component (stateful)

```tsx
'use client';
import { useState } from 'react';
import { cn } from '../utils/cn';

interface NavbarSimpleProps {
  brand?: string;
  logo?: React.ReactNode;
  links?: React.ReactNode;
  cta?: React.ReactNode;
  sticky?: boolean;
  transparent?: boolean;
  className?: string;
}

export function NavbarSimple({
  brand, logo, links, cta, sticky, transparent, className,
}: NavbarSimpleProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav role="navigation" aria-label="Main navigation"
        className={cn(
          'px-6 h-16 flex items-center',
          sticky && 'sticky top-0 z-50',
          transparent ? 'bg-transparent' : 'bg-dk-surface',
          className,
        )}
      >
        <div className="mx-auto max-w-screen-xl w-full flex items-center justify-between">
          <div className="font-bold text-lg text-dk-text">{logo || brand}</div>
          <div className="hidden md:flex items-center gap-6">{links}</div>
          <div className="hidden md:flex items-center gap-3">{cta}</div>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={cn('w-6 h-0.5 bg-dk-text transition-transform', mobileOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('w-6 h-0.5 bg-dk-text transition-opacity', mobileOpen && 'opacity-0')} />
            <span className={cn('w-6 h-0.5 bg-dk-text transition-transform', mobileOpen && '-rotate-45 -translate-y-2')} />
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-dk-surface border-t border-dk-border p-6 flex flex-col gap-4">
          {links}
          <div className="flex flex-col gap-3 pt-4 border-t border-dk-border">{cta}</div>
        </div>
      )}
    </>
  );
}
```

## Tailwind Preset

```ts
// packages/react/src/preset.ts
export default {
  theme: {
    extend: {
      colors: {
        dk: {
          primary: 'var(--dk-color-primary)',
          'primary-hover': 'var(--dk-color-primary-hover)',
          'primary-light': 'var(--dk-color-primary-light)',
          'primary-text': 'var(--dk-color-primary-text)',
          surface: 'var(--dk-color-surface)',
          'surface-raised': 'var(--dk-color-surface-raised)',
          bg: 'var(--dk-color-bg)',
          text: 'var(--dk-color-text)',
          'text-muted': 'var(--dk-color-text-muted)',
          'text-inverse': 'var(--dk-color-text-inverse)',
          border: 'var(--dk-color-border)',
          'border-hover': 'var(--dk-color-border-hover)',
          danger: 'var(--dk-color-danger)',
          success: 'var(--dk-color-success)',
          warning: 'var(--dk-color-warning)',
          overlay: 'var(--dk-color-overlay)',
        },
      },
      fontFamily: {
        'dk-sans': 'var(--dk-font-sans)',
        'dk-display': 'var(--dk-font-display, var(--dk-font-sans))',
        'dk-mono': 'var(--dk-font-mono)',
      },
      spacing: {
        'dk-section-y': 'var(--dk-section-padding-y, 5rem)',
        'dk-section-x': 'var(--dk-section-padding-x, 1.5rem)',
      },
      maxWidth: {
        'dk-section': 'var(--dk-section-max-width, 1280px)',
      },
      zIndex: {
        'dk-sticky': 'var(--dk-z-sticky, 1100)',
        'dk-overlay': 'var(--dk-z-overlay, 1300)',
        'dk-modal': 'var(--dk-z-modal, 1400)',
        'dk-toast': 'var(--dk-z-toast, 1500)',
      },
    },
  },
};
```

## File Structure

```
packages/react/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                    # Main barrel export
│   ├── preset.ts                   # Tailwind preset
│   ├── utils/
│   │   ├── cn.ts                   # clsx + tailwind-merge
│   │   └── bg.ts                   # bgVariant() helper
│   ├── components/
│   │   ├── animate-on-scroll.tsx   # 'use client' scroll animation wrapper
│   │   └── button.tsx              # dk-button React equivalent
│   └── sections/
│       ├── hero/
│       │   ├── index.ts
│       │   ├── hero-centered.tsx
│       │   ├── hero-split.tsx
│       │   ├── hero-background.tsx
│       │   ├── hero-gradient.tsx
│       │   ├── hero-minimal.tsx
│       │   ├── hero-video.tsx
│       │   └── hero-image-tiles.tsx
│       ├── navbar/                  # 'use client' — mobile toggle
│       │   ├── index.ts
│       │   ├── navbar-simple.tsx
│       │   ├── navbar-dark.tsx
│       │   ├── navbar-mega.tsx
│       │   ├── navbar-centered.tsx
│       │   └── navbar-with-search.tsx
│       ├── features/
│       ├── footer/
│       ├── testimonials/            # carousel variants are 'use client'
│       ├── pricing/                 # toggle variant is 'use client'
│       ├── faq/                     # accordion variants are 'use client'
│       ├── cta/
│       ├── stats/
│       ├── newsletter/
│       ├── gallery/                 # carousel variant is 'use client'
│       ├── sidebar/
│       ├── team/
│       ├── contact/
│       ├── logo-cloud/
│       ├── blog/
│       ├── timeline/
│       ├── products/                # carousel variant is 'use client'
│       ├── categories/
│       ├── banner/                  # 'use client' — dismiss state
│       └── error/
```

## Conversion Rules for Agents

Each Lit section converts to React following these rules:

1. **Read the Lit source** — note `@property()` decorators, `@state()` fields, slots, and CSS
2. **Props** — each `@property()` becomes a typed prop. Boolean props default to `false`. String props default to `''` or are optional.
3. **Slots** — `<slot name="X">` becomes `X?: React.ReactNode` prop. Default `<slot>` becomes `children`.
4. **CSS** — Convert Shadow DOM CSS to Tailwind utility classes. Use `--dk-*` custom properties via the preset's `dk-*` color/spacing classes.
5. **State** — `@state()` becomes `useState()`. Add `'use client'` directive.
6. **Events** — `@click=${handler}` becomes `onClick={handler}`.
7. **Animations** — Remove `onEnterViewport()` and `animateEntrance()`. Animations are handled externally by `<AnimateOnScroll>`.
8. **Background** — Add `bg` prop, use `bgVariant()` helper for class mapping.
9. **className** — Every component accepts `className` prop for consumer overrides, merged via `cn()`.

## Section Inventory (95 components)

### Server Components (~80)
hero (7), features (8), footer (6), cta (5), stats (5), team (5), contact (4), newsletter (4), logo-cloud (3), blog (3), timeline (3), error (3), categories (3), sidebar (4), gallery-grid (1), gallery-masonry (1), pricing-simple (1), pricing-comparison (1), testimonials-grid (1), testimonials-masonry (1), testimonials-featured (1)

### Client Components (~15)
navbar (5), faq-accordion (3), banner (3), testimonials-carousel (1), testimonials-dark (1), gallery-carousel (1), products-carousel (1), pricing-tiers (1), pricing-dark (1), pricing-with-toggle (1)

## Consumer Usage

```tsx
// app/page.tsx — Server Component, zero client JS
import { HeroBackground, FeaturesGrid, FooterColumns } from '@briang7/designkit-react';
import { NavbarSimple } from '@briang7/designkit-react'; // this one is 'use client' internally

export default function Home() {
  return (
    <>
      <NavbarSimple brand="Acme" links={<>...</>} sticky />
      <HeroBackground
        headline="Build faster"
        subheadline="Ship beautiful sites in minutes"
        image="/hero.jpg"
        ctaPrimary={<a className="btn-primary" href="/start">Get Started</a>}
      />
      <FeaturesGrid
        headline="Why Acme?"
        features={[
          { icon: 'zap', title: 'Fast', description: 'Built for speed' },
          { icon: 'shield', title: 'Secure', description: 'Enterprise-grade security' },
        ]}
      />
      <FooterColumns brand="Acme" copyright="2026 Acme Inc." columns={[...]} />
    </>
  );
}
```

```css
/* globals.css */
@import "tailwindcss";
@import "@briang7/designkit-react/themes/tokens.css";
@import "@briang7/designkit-react/themes/light.css";

:root {
  --dk-color-primary: #d4a04a;  /* override any token */
}
```

```ts
// tailwind.config.ts
import { designkitPreset } from '@briang7/designkit-react/preset';
export default { presets: [designkitPreset] };
```
