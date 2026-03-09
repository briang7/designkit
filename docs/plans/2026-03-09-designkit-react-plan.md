# DesignKit React Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create `@briang7/designkit-react`, a React Server Component library that converts all 95 DesignKit Lit web component sections to React + Tailwind CSS.

**Architecture:** Each Lit section converts to a React component using Tailwind utility classes instead of Shadow DOM CSS. Server Components by default (~80 sections), `'use client'` only for stateful sections (~15). Shared Tailwind preset maps `--dk-*` CSS custom properties to `dk-*` utility classes. Animations handled by an opt-in `<AnimateOnScroll>` client wrapper.

**Tech Stack:** React 18+, TypeScript, Tailwind CSS 4, motion (optional), clsx + tailwind-merge

**Design doc:** `docs/plans/2026-03-09-designkit-react-design.md`

**Source reference:** All Lit source is in `src/sections/` — each component file shows the exact props, slots, CSS, and state needed.

---

## Conversion Rules

Every agent converting a section MUST follow these rules:

1. **Read the Lit source file first** — it's the source of truth for props, structure, and behavior
2. **`@property()` → typed prop.** Boolean props default to `false`. String props are optional with `?`.
3. **`<slot name="X">` → `X?: React.ReactNode` prop.** Default `<slot>` → `children?: React.ReactNode`.
4. **Shadow DOM CSS → Tailwind classes.** Use `dk-*` theme colors from the preset (e.g., `text-dk-text`, `bg-dk-primary`). Use arbitrary values for non-standard spacing: `py-[var(--dk-section-padding-y,5rem)]`
5. **`:host` styles → applied to the outermost element** (usually `<section>`)
6. **`@state()` → `useState()`.** Add `'use client'` directive at top of file.
7. **`@click=${handler}` → `onClick={handler}`**
8. **Remove all animation code** — no `onEnterViewport`, no `animateEntrance`, no scroll observers. Animations are external via `<AnimateOnScroll>`.
9. **Every component accepts `className?: string`** merged via `cn()` on the outermost element.
10. **Every component accepts `bg?: 'primary' | 'alt' | 'brand' | 'dark'`** using the shared `bgVariant()` helper.
11. **Sub-components** (e.g., `dk-feature-card`, `dk-faq-item`) become React components in the same directory. If the parent uses `children` to render them, type it as `React.ReactNode`.
12. **Lit `nothing` → early return or conditional `{x && <div>...</div>}`**
13. **`part="X"` → `data-part="X"`** on the element, so consumers can still target with `[data-part="X"]` selectors if needed.

---

### Task 1: Package scaffolding and utilities

**Files:**
- Create: `packages/react/package.json`
- Create: `packages/react/tsconfig.json`
- Create: `packages/react/src/index.ts`
- Create: `packages/react/src/preset.ts`
- Create: `packages/react/src/utils/cn.ts`
- Create: `packages/react/src/utils/bg.ts`
- Create: `packages/react/src/components/animate-on-scroll.tsx`
- Create: `packages/react/themes/` (symlinks or copies of `src/themes/*.css`)

**Step 1: Create `packages/react/package.json`**

```json
{
  "name": "@briang7/designkit-react",
  "version": "0.1.0",
  "description": "React Server Component sections from DesignKit",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./preset": {
      "types": "./dist/preset.d.ts",
      "import": "./dist/preset.js"
    },
    "./themes/*": "./themes/*"
  },
  "files": ["dist", "themes"],
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": ">=18",
    "tailwindcss": ">=4"
  },
  "dependencies": {
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "optionalDependencies": {
    "motion": "^12.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "react": "^18.2.0",
    "typescript": "^5.3.0"
  }
}
```

**Step 2: Create `packages/react/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2021", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

**Step 3: Create `packages/react/src/utils/cn.ts`**

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 4: Create `packages/react/src/utils/bg.ts`**

```ts
export type BgVariant = 'primary' | 'alt' | 'brand' | 'dark';

const bgClasses: Record<BgVariant, string> = {
  primary: 'bg-[var(--dk-section-bg-primary,var(--dk-color-surface,#f9fafb))]',
  alt: 'bg-[var(--dk-section-bg-alt,#f3f4f6)]',
  brand: 'bg-[var(--dk-section-bg-brand,var(--dk-color-primary,#2563eb))] text-white',
  dark: 'bg-[var(--dk-section-bg-dark,#111827)] text-white',
};

export function bgVariant(bg: BgVariant = 'primary'): string {
  return bgClasses[bg] || bgClasses.primary;
}
```

**Step 5: Create `packages/react/src/preset.ts`**

```ts
const designkitPreset = {
  theme: {
    extend: {
      colors: {
        dk: {
          primary: 'var(--dk-color-primary, #2563eb)',
          'primary-hover': 'var(--dk-color-primary-hover, #1d4ed8)',
          'primary-light': 'var(--dk-color-primary-light, #eff6ff)',
          'primary-text': 'var(--dk-color-primary-text, #ffffff)',
          surface: 'var(--dk-color-surface, #f9fafb)',
          'surface-raised': 'var(--dk-color-surface-raised, #ffffff)',
          bg: 'var(--dk-color-bg, #ffffff)',
          text: 'var(--dk-color-text, #111827)',
          'text-muted': 'var(--dk-color-text-muted, #6b7280)',
          'text-inverse': 'var(--dk-color-text-inverse, #ffffff)',
          border: 'var(--dk-color-border, #e5e7eb)',
          'border-hover': 'var(--dk-color-border-hover, #d1d5db)',
          danger: 'var(--dk-color-danger, #dc2626)',
          'danger-light': 'var(--dk-color-danger-light, #fef2f2)',
          success: 'var(--dk-color-success, #16a34a)',
          'success-light': 'var(--dk-color-success-light, #f0fdf4)',
          warning: 'var(--dk-color-warning, #ca8a04)',
          'warning-light': 'var(--dk-color-warning-light, #fefce8)',
          overlay: 'var(--dk-color-overlay, rgb(0 0 0 / 0.5))',
        },
      },
      fontFamily: {
        'dk-sans': 'var(--dk-font-sans, system-ui, sans-serif)',
        'dk-display': 'var(--dk-font-display, var(--dk-font-sans, system-ui, sans-serif))',
        'dk-mono': 'var(--dk-font-mono, ui-monospace, monospace)',
      },
      maxWidth: {
        'dk-section': 'var(--dk-section-max-width, 1280px)',
      },
      zIndex: {
        'dk-sticky': '1100',
        'dk-overlay': '1300',
        'dk-modal': '1400',
        'dk-toast': '1500',
      },
    },
  },
};

export default designkitPreset;
export { designkitPreset };
```

**Step 6: Create `packages/react/src/components/animate-on-scroll.tsx`**

```tsx
'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  /** CSS selector for elements to animate (default: direct children) */
  selector?: string;
  /** Stagger delay between elements in ms */
  stagger?: number;
  /** Disable animations */
  disabled?: boolean;
}

export function AnimateOnScroll({
  children,
  selector,
  stagger = 50,
  disabled = false,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const targets = selector
      ? Array.from(ref.current.querySelectorAll(selector))
      : Array.from(ref.current.children);

    // Set initial state
    targets.forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(20px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          targets.forEach((el, i) => {
            const htmlEl = el as HTMLElement;
            setTimeout(() => {
              htmlEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              htmlEl.style.opacity = '1';
              htmlEl.style.transform = 'translateY(0)';
            }, i * stagger);
          });
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [disabled, selector, stagger]);

  return <div ref={ref}>{children}</div>;
}
```

**Step 7: Copy theme CSS files**

```bash
mkdir -p packages/react/themes
cp src/themes/tokens.css packages/react/themes/
cp src/themes/light.css packages/react/themes/
cp src/themes/dark.css packages/react/themes/
cp src/themes/auto.css packages/react/themes/
```

**Step 8: Create initial `packages/react/src/index.ts`** (will grow with each task)

```ts
// @briang7/designkit-react — React Server Component sections
export { AnimateOnScroll } from './components/animate-on-scroll.js';
export { cn } from './utils/cn.js';
export { bgVariant } from './utils/bg.js';
export type { BgVariant } from './utils/bg.js';
```

**Step 9: Install deps, verify build, commit**

```bash
cd packages/react && npm install && npm run build
git add packages/react/
git commit -m "feat(react): scaffold @briang7/designkit-react package"
```

---

### Task 2: Hero sections (7 components — Server Components)

**Lit source:** `src/sections/hero/` — 7 section variants + shared styles in `dk-section-hero.styles.ts`
**Create dir:** `packages/react/src/sections/hero/`

**Components to convert:**
1. `dk-section-hero-centered.ts` → `hero-centered.tsx`
2. `dk-section-hero-split.ts` → `hero-split.tsx`
3. `dk-section-hero-background.ts` → `hero-background.tsx`
4. `dk-section-hero-gradient.ts` → `hero-gradient.tsx`
5. `dk-section-hero-minimal.ts` → `hero-minimal.tsx`
6. `dk-section-hero-video.ts` → `hero-video.tsx`
7. `dk-section-hero-image-tiles.ts` → `hero-image-tiles.tsx`

**All are Server Components** — no state, just props → HTML.

**Shared pattern across all hero variants:**
- Props: `headline`, `subheadline`, `bg`, `className`, `ctaPrimary`, `ctaSecondary`
- Some variants add: `image`, `video`, `overlay`, `align`
- Section padding: `py-[var(--dk-section-padding-y,5rem)] px-[var(--dk-section-padding-x,1.5rem)]`
- Container: `mx-auto max-w-[var(--dk-section-max-width,1280px)]`
- Headline: `font-[var(--dk-font-display,var(--dk-font-sans))] text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-tight tracking-tight text-balance text-dk-text mb-5`
- Subheadline: `text-dk-text-muted text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-balance mb-10`
- CTA group: `flex gap-3 flex-wrap`

**Step 1:** Read each Lit source, create the React component using Tailwind classes. Each file should be self-contained with its own interface.

**Step 2:** Create `packages/react/src/sections/hero/index.ts` barrel export:
```ts
export { HeroCentered } from './hero-centered.js';
export { HeroSplit } from './hero-split.js';
export { HeroBackground } from './hero-background.js';
export { HeroGradient } from './hero-gradient.js';
export { HeroMinimal } from './hero-minimal.js';
export { HeroVideo } from './hero-video.js';
export { HeroImageTiles } from './hero-image-tiles.js';
```

**Step 3:** Add to `packages/react/src/index.ts`:
```ts
export * from './sections/hero/index.js';
```

**Step 4:** Build and commit:
```bash
cd packages/react && npm run build
git add packages/react/src/sections/hero/
git commit -m "feat(react): hero sections — 7 Server Components"
```

---

### Task 3: Navbar sections (5 components — Client Components)

**Lit source:** `src/sections/navbar/` — all need `'use client'` due to mobile menu toggle state
**Create dir:** `packages/react/src/sections/navbar/`

**Components:**
1. `dk-section-navbar-simple.ts` → `navbar-simple.tsx`
2. `dk-section-navbar-dark.ts` → `navbar-dark.tsx`
3. `dk-section-navbar-mega.ts` → `navbar-mega.tsx`
4. `dk-section-navbar-centered.ts` → `navbar-centered.tsx`
5. `dk-section-navbar-with-search.ts` → `navbar-with-search.tsx`

**All need `'use client'`** — `useState` for `mobileOpen` toggle.

**Shared pattern:**
- Props: `brand`, `logo`, `links`, `cta`, `sticky`, `transparent`, `bg`, `className`
- Mobile hamburger with animated spans (3 spans that rotate into X)
- Links hidden on mobile (`hidden md:flex`), shown in mobile menu dropdown
- Sticky: `sticky top-0 z-dk-sticky`

**Step 1-4:** Same as Task 2. Read Lit source, convert, barrel export, build, commit.

---

### Task 4: Features sections (8 components — Server Components)

**Lit source:** `src/sections/features/`
**Create dir:** `packages/react/src/sections/features/`

**Components:**
1. `dk-section-features-grid.ts` → `features-grid.tsx`
2. `dk-section-features-centered.ts` → `features-centered.tsx`
3. `dk-section-features-alternating.ts` → `features-alternating.tsx`
4. `dk-section-features-icon-grid.ts` → `features-icon-grid.tsx`
5. `dk-section-features-tabs.ts` → `features-tabs.tsx` (needs `'use client'` for tab state)
6. `dk-section-features-with-image.ts` → `features-with-image.tsx`
7. `dk-feature-card.ts` → `feature-card.tsx` (sub-component)
8. `dk-feature-row.ts` → `feature-row.tsx` (sub-component)

**Note:** `features-tabs.tsx` needs `'use client'` for tab switching state. The rest are Server Components.

**Sub-components pattern:** In Lit, `dk-feature-card` is a child web component used inside `dk-section-features-grid`. In React, it becomes a prop — the grid accepts `children` of `<FeatureCard>` elements, or a `features` array prop (check the Lit source for which pattern fits).

---

### Task 5: Footer sections (6 components — Server Components)

**Lit source:** `src/sections/footer/`
**Create dir:** `packages/react/src/sections/footer/`

**Components:**
1. `dk-section-footer-simple.ts` → `footer-simple.tsx`
2. `dk-section-footer-columns.ts` → `footer-columns.tsx`
3. `dk-section-footer-dark.ts` → `footer-dark.tsx`
4. `dk-section-footer-centered.ts` → `footer-centered.tsx`
5. `dk-section-footer-with-newsletter.ts` → `footer-with-newsletter.tsx`
6. `dk-footer-helpers.ts` → `footer-column.tsx` + `footer-link.tsx` (sub-components)

**All Server Components.**

---

### Task 6: CTA sections (5 components — Server Components)

**Lit source:** `src/sections/cta/`
**Create dir:** `packages/react/src/sections/cta/`

**Components:**
1. `dk-section-cta-centered.ts` → `cta-centered.tsx`
2. `dk-section-cta-split.ts` → `cta-split.tsx`
3. `dk-section-cta-brand.ts` → `cta-brand.tsx`
4. `dk-section-cta-dark.ts` → `cta-dark.tsx`
5. `dk-section-cta-with-image.ts` → `cta-with-image.tsx`

**All Server Components.**

---

### Task 7: Stats sections (5 components — Server Components)

**Lit source:** `src/sections/stats/`
**Create dir:** `packages/react/src/sections/stats/`

**Components:**
1. `dk-section-stats-bar.ts` → `stats-bar.tsx`
2. `dk-section-stats-cards.ts` → `stats-cards.tsx`
3. `dk-section-stats-dark.ts` → `stats-dark.tsx`
4. `dk-section-stats-with-image.ts` → `stats-with-image.tsx`
5. `dk-stat.ts` → `stat.tsx` (sub-component)

**All Server Components.**

---

### Task 8: Testimonials sections (6 components — mixed)

**Lit source:** `src/sections/testimonials/`
**Create dir:** `packages/react/src/sections/testimonials/`

**Components:**
1. `dk-section-testimonials-grid.ts` → `testimonials-grid.tsx` (Server)
2. `dk-section-testimonials-masonry.ts` → `testimonials-masonry.tsx` (Server)
3. `dk-section-testimonials-featured.ts` → `testimonials-featured.tsx` (Server)
4. `dk-section-testimonials-carousel.ts` → `testimonials-carousel.tsx` (**Client** — carousel state, autoplay timer)
5. `dk-section-testimonials-dark.ts` → `testimonials-dark.tsx` (Server)
6. `dk-testimonial-card.ts` → `testimonial-card.tsx` (sub-component, Server)

**Carousel conversion notes:** Read the Lit source carefully — it has `_currentIndex`, `_slideCount`, autoplay timer, wheel handler, responsive visible count. Convert to `useState` + `useEffect` + `useCallback`. The track uses CSS `transform: translateX(-N%)` for sliding.

---

### Task 9: Pricing sections (6 components — mixed)

**Lit source:** `src/sections/pricing/`
**Create dir:** `packages/react/src/sections/pricing/`

**Components:**
1. `dk-section-pricing-tiers.ts` → `pricing-tiers.tsx` (Server)
2. `dk-section-pricing-comparison.ts` → `pricing-comparison.tsx` (Server)
3. `dk-section-pricing-simple.ts` → `pricing-simple.tsx` (Server)
4. `dk-section-pricing-dark.ts` → `pricing-dark.tsx` (Server)
5. `dk-section-pricing-with-toggle.ts` → `pricing-with-toggle.tsx` (**Client** — monthly/annual toggle)
6. `dk-pricing-tier.ts` → `pricing-tier.tsx` (sub-component, Server)

---

### Task 10: FAQ sections (5 components — Client Components)

**Lit source:** `src/sections/faq/`
**Create dir:** `packages/react/src/sections/faq/`

**Components:**
1. `dk-section-faq-accordion.ts` → `faq-accordion.tsx` (**Client** — manages which items are open, `multiple` prop)
2. `dk-section-faq-two-column.ts` → `faq-two-column.tsx` (**Client** — same accordion logic)
3. `dk-section-faq-centered.ts` → `faq-centered.tsx` (**Client**)
4. `dk-section-faq-dark.ts` → `faq-dark.tsx` (**Client**)
5. `dk-faq-item.ts` → `faq-item.tsx` (sub-component, **Client** — open/close toggle with animation)

**FAQ conversion notes:** In Lit, `dk-faq-item` dispatches a `dk-faq-toggle` event and the parent accordion listens. In React, the parent manages the open state array and passes `isOpen` + `onToggle` props to each item. The `multiple` prop controls whether multiple items can be open simultaneously.

---

### Task 11: Newsletter sections (4 components — Server Components)

**Lit source:** `src/sections/newsletter/`
**Create dir:** `packages/react/src/sections/newsletter/`

**Components:**
1. `dk-section-newsletter-inline.ts` → `newsletter-inline.tsx`
2. `dk-section-newsletter-card.ts` → `newsletter-card.tsx`
3. `dk-section-newsletter-dark.ts` → `newsletter-dark.tsx`
4. `dk-section-newsletter-with-image.ts` → `newsletter-with-image.tsx`

**All Server Components.** Form submission is the consumer's responsibility (pass `onSubmit` or use form actions).

---

### Task 12: Gallery sections (4 components — mixed)

**Lit source:** `src/sections/gallery/`
**Create dir:** `packages/react/src/sections/gallery/`

**Components:**
1. `dk-section-gallery-grid.ts` → `gallery-grid.tsx` (Server)
2. `dk-section-gallery-masonry.ts` → `gallery-masonry.tsx` (Server)
3. `dk-section-gallery-carousel.ts` → `gallery-carousel.tsx` (**Client** — carousel state)
4. `dk-gallery-item.ts` → `gallery-item.tsx` (sub-component, Server)

---

### Task 13: Team sections (5 components — Server Components)

**Lit source:** `src/sections/team/`
**Create dir:** `packages/react/src/sections/team/`

**Components:**
1. `dk-section-team-grid.ts` → `team-grid.tsx`
2. `dk-section-team-cards.ts` → `team-cards.tsx`
3. `dk-section-team-list.ts` → `team-list.tsx`
4. `dk-section-team-compact.ts` → `team-compact.tsx`
5. `dk-team-member.ts` → `team-member.tsx` (sub-component)

**All Server Components.**

---

### Task 14: Contact sections (4 components — Server Components)

**Lit source:** `src/sections/contact/`
**Create dir:** `packages/react/src/sections/contact/`

**Components:**
1. `dk-section-contact-centered.ts` → `contact-centered.tsx`
2. `dk-section-contact-split.ts` → `contact-split.tsx`
3. `dk-section-contact-dark.ts` → `contact-dark.tsx`
4. `dk-section-contact-with-map.ts` → `contact-with-map.tsx`

**All Server Components.**

---

### Task 15: Banner sections (3 components — Client Components)

**Lit source:** `src/sections/banner/`
**Create dir:** `packages/react/src/sections/banner/`

**Components:**
1. `dk-section-banner-bar.ts` → `banner-bar.tsx` (**Client** — dismiss state)
2. `dk-section-banner-cookie.ts` → `banner-cookie.tsx` (**Client** — accept/dismiss)
3. `dk-section-banner-floating.ts` → `banner-floating.tsx` (**Client** — dismiss state)

**All need `'use client'`** — dismiss/accept state with transition.

---

### Task 16: Sidebar sections (4 components — Server Components)

**Lit source:** `src/sections/sidebar/`
**Create dir:** `packages/react/src/sections/sidebar/`

**Components:**
1. `dk-section-sidebar-brand.ts` → `sidebar-brand.tsx`
2. `dk-section-sidebar-nav.ts` → `sidebar-nav.tsx`
3. `dk-sidebar-group.ts` → `sidebar-group.tsx` (sub-component)
4. `dk-sidebar-item.ts` → `sidebar-item.tsx` (sub-component)

**All Server Components.**

---

### Task 17: Remaining sections (6 categories, 18 components — mostly Server)

**Create dirs and convert:**

**Logo Cloud** (`src/sections/logo-cloud/` → `packages/react/src/sections/logo-cloud/`):
1. `logo-cloud-simple.tsx` (Server)
2. `logo-cloud-grid.tsx` (Server)
3. `logo-cloud-split.tsx` (Server)

**Blog** (`src/sections/blog/` → `packages/react/src/sections/blog/`):
1. `blog-grid.tsx` (Server)
2. `blog-featured.tsx` (Server)
3. `blog-card.tsx` (sub-component, Server)

**Timeline** (`src/sections/timeline/` → `packages/react/src/sections/timeline/`):
1. `timeline-alternating.tsx` (Server)
2. `timeline-vertical.tsx` (Server)
3. `timeline-step.tsx` (sub-component, Server)

**Products** (`src/sections/products/` → `packages/react/src/sections/products/`):
1. `products-grid.tsx` (Server)
2. `products-carousel.tsx` (**Client** — carousel state)
3. `product-card.tsx` (sub-component, Server)

**Categories** (`src/sections/categories/` → `packages/react/src/sections/categories/`):
1. `categories-grid.tsx` (Server)
2. `categories-scroll.tsx` (Server)
3. `category-card.tsx` (sub-component, Server)

**Error** (`src/sections/error/` → `packages/react/src/sections/error/`):
1. `error-simple.tsx` (Server)
2. `error-split.tsx` (Server)
3. `error-with-links.tsx` (Server)

---

### Task 18: Final barrel exports, build, and publish

**Step 1:** Update `packages/react/src/index.ts` with ALL section exports:

```ts
// @briang7/designkit-react
export { AnimateOnScroll } from './components/animate-on-scroll.js';
export { cn } from './utils/cn.js';
export { bgVariant } from './utils/bg.js';
export type { BgVariant } from './utils/bg.js';

// Sections
export * from './sections/hero/index.js';
export * from './sections/navbar/index.js';
export * from './sections/features/index.js';
export * from './sections/footer/index.js';
export * from './sections/cta/index.js';
export * from './sections/stats/index.js';
export * from './sections/testimonials/index.js';
export * from './sections/pricing/index.js';
export * from './sections/faq/index.js';
export * from './sections/newsletter/index.js';
export * from './sections/gallery/index.js';
export * from './sections/team/index.js';
export * from './sections/contact/index.js';
export * from './sections/banner/index.js';
export * from './sections/sidebar/index.js';
export * from './sections/logo-cloud/index.js';
export * from './sections/blog/index.js';
export * from './sections/timeline/index.js';
export * from './sections/products/index.js';
export * from './sections/categories/index.js';
export * from './sections/error/index.js';
```

**Step 2:** Build and verify no TypeScript errors:
```bash
cd packages/react && npm run build
```

**Step 3:** Publish:
```bash
cd packages/react && npm publish --access public
```

**Step 4:** Test in the wild-goose-jack project:
```bash
cd /c/inetpub/wwwroot/next/wild-goose-jack
npm install @briang7/designkit-react
```

Convert the page to use React imports instead of Lit web component tags and verify it works with SSR.

**Step 5:** Final commit:
```bash
git add packages/react/
git commit -m "feat(react): complete @briang7/designkit-react — 95 section components"
```

---

## Task Summary

| Task | Category | Components | Type | Parallelizable |
|------|----------|-----------|------|----------------|
| 1 | Scaffolding | utilities, preset, AnimateOnScroll | Setup | No (must be first) |
| 2 | Hero | 7 | Server | Yes (after Task 1) |
| 3 | Navbar | 5 | Client | Yes (after Task 1) |
| 4 | Features | 8 | Mixed | Yes (after Task 1) |
| 5 | Footer | 6 | Server | Yes (after Task 1) |
| 6 | CTA | 5 | Server | Yes (after Task 1) |
| 7 | Stats | 5 | Server | Yes (after Task 1) |
| 8 | Testimonials | 6 | Mixed | Yes (after Task 1) |
| 9 | Pricing | 6 | Mixed | Yes (after Task 1) |
| 10 | FAQ | 5 | Client | Yes (after Task 1) |
| 11 | Newsletter | 4 | Server | Yes (after Task 1) |
| 12 | Gallery | 4 | Mixed | Yes (after Task 1) |
| 13 | Team | 5 | Server | Yes (after Task 1) |
| 14 | Contact | 4 | Server | Yes (after Task 1) |
| 15 | Banner | 3 | Client | Yes (after Task 1) |
| 16 | Sidebar | 4 | Server | Yes (after Task 1) |
| 17 | Remaining | 18 | Mixed | Yes (after Task 1) |
| 18 | Final build | exports, publish | Finalize | No (must be last) |

**Total: 95 components across 18 tasks. Tasks 2-17 are fully parallelizable.**
