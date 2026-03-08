# DesignKit Comprehensive Expansion Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Expand DesignKit from 14 components + 28 section elements to 23 components + 75+ section elements, making it comprehensive enough that website-builder-generated sites have maximum visual diversity.

**Architecture:** Each new component/section follows existing patterns: Lit 3 custom element, CSS custom properties for theming, `::part()` for styling, Storybook story, export from barrel file. New sections extend `DkSectionElement` base class for scroll-triggered entrance animations. New components are standalone.

**Tech Stack:** Lit 3, TypeScript, CSS custom properties, Web Animations API, Storybook 8, @open-wc/testing

---

## Phase 1: New Base Components (9 components)

These are primitive building blocks needed by sections in later phases.

### Task 1: dk-accordion

Standalone accordion (not tied to FAQ). Supports single or multiple open panels.

**Files:**
- Create: `src/components/accordion/dk-accordion.ts`
- Create: `src/components/accordion/dk-accordion-item.ts`
- Create: `src/components/accordion/index.ts`
- Create: `src/components/accordion/dk-accordion.stories.ts`
- Modify: `src/index.ts` (add export)
- Modify: `package.json` (add export map entry)

**API:**
```html
<dk-accordion multiple>
  <dk-accordion-item label="Section 1" open>Content here</dk-accordion-item>
  <dk-accordion-item label="Section 2">More content</dk-accordion-item>
</dk-accordion>
```

**Props:**
- `dk-accordion`: `multiple` (boolean)
- `dk-accordion-item`: `label` (string), `open` (boolean), `disabled` (boolean)

**Parts:** `trigger`, `content`, `icon`

---

### Task 2: dk-alert

Notification banners with variants and dismiss capability.

**Files:**
- Create: `src/components/alert/dk-alert.ts`
- Create: `src/components/alert/index.ts`
- Create: `src/components/alert/dk-alert.stories.ts`
- Modify: `src/index.ts`
- Modify: `package.json`

**API:**
```html
<dk-alert variant="warning" dismissable>
  <span slot="title">Warning</span>
  Check your input before proceeding.
</dk-alert>
```

**Props:** `variant` (info|success|warning|error), `dismissable` (boolean), `icon` (boolean, default true)
**Parts:** `base`, `icon`, `content`, `close`
**Events:** `dk-alert-dismiss`

---

### Task 3: dk-breadcrumbs

Navigation breadcrumb trail.

**Files:**
- Create: `src/components/breadcrumbs/dk-breadcrumbs.ts`
- Create: `src/components/breadcrumbs/dk-breadcrumb.ts`
- Create: `src/components/breadcrumbs/index.ts`
- Create: `src/components/breadcrumbs/dk-breadcrumbs.stories.ts`
- Modify: `src/index.ts`
- Modify: `package.json`

**API:**
```html
<dk-breadcrumbs separator="chevron">
  <dk-breadcrumb href="/">Home</dk-breadcrumb>
  <dk-breadcrumb href="/products">Products</dk-breadcrumb>
  <dk-breadcrumb>Current Page</dk-breadcrumb>
</dk-breadcrumbs>
```

**Props:**
- `dk-breadcrumbs`: `separator` (slash|chevron|dot)
- `dk-breadcrumb`: `href` (string, optional - last item has none)

---

### Task 4: dk-pagination

Page navigation for lists, tables, product grids.

**Files:**
- Create: `src/components/pagination/dk-pagination.ts`
- Create: `src/components/pagination/index.ts`
- Create: `src/components/pagination/dk-pagination.stories.ts`
- Modify: `src/index.ts`
- Modify: `package.json`

**API:**
```html
<dk-pagination total="100" page="3" page-size="10"></dk-pagination>
```

**Props:** `total` (number), `page` (number), `page-size` (number), `max-visible` (number, default 7)
**Parts:** `base`, `button`, `active`, `prev`, `next`
**Events:** `dk-page-change` (detail: { page: number })

---

### Task 5: dk-dropdown

Click-triggered dropdown menu (different from dk-select which is form input).

**Files:**
- Create: `src/components/dropdown/dk-dropdown.ts`
- Create: `src/components/dropdown/dk-dropdown-item.ts`
- Create: `src/components/dropdown/dk-dropdown-divider.ts`
- Create: `src/components/dropdown/index.ts`
- Create: `src/components/dropdown/dk-dropdown.stories.ts`
- Modify: `src/index.ts`
- Modify: `package.json`

**API:**
```html
<dk-dropdown>
  <dk-button slot="trigger">Actions</dk-button>
  <dk-dropdown-item>Edit</dk-dropdown-item>
  <dk-dropdown-item>Duplicate</dk-dropdown-item>
  <dk-dropdown-divider></dk-dropdown-divider>
  <dk-dropdown-item variant="danger">Delete</dk-dropdown-item>
</dk-dropdown>
```

**Props:**
- `dk-dropdown`: `placement` (bottom-start|bottom-end|top-start|top-end)
- `dk-dropdown-item`: `disabled` (boolean), `variant` (default|danger)

**Parts:** `menu`
**Events:** `dk-dropdown-select`

---

### Task 6: dk-progress

Progress bar for loading states, steps, completion.

**Files:**
- Create: `src/components/progress/dk-progress.ts`
- Create: `src/components/progress/index.ts`
- Create: `src/components/progress/dk-progress.stories.ts`
- Modify: `src/index.ts`
- Modify: `package.json`

**API:**
```html
<dk-progress value="65" max="100" label="Uploading..." variant="primary"></dk-progress>
```

**Props:** `value` (number), `max` (number, default 100), `label` (string), `variant` (primary|success|warning|danger), `size` (sm|md|lg), `striped` (boolean), `animated` (boolean)
**Parts:** `base`, `bar`, `label`

---

### Task 7: dk-rating

Star rating display and input.

**Files:**
- Create: `src/components/rating/dk-rating.ts`
- Create: `src/components/rating/index.ts`
- Create: `src/components/rating/dk-rating.stories.ts`
- Modify: `src/index.ts`
- Modify: `package.json`

**API:**
```html
<dk-rating value="3.5" max="5" readonly></dk-rating>
<dk-rating value="0" max="5"></dk-rating> <!-- interactive -->
```

**Props:** `value` (number), `max` (number, default 5), `readonly` (boolean), `size` (sm|md|lg)
**Parts:** `base`, `star`, `star-filled`
**Events:** `dk-rating-change` (detail: { value: number })

---

### Task 8: dk-divider

Section separator with optional label, icon, or content.

**Files:**
- Create: `src/components/divider/dk-divider.ts`
- Create: `src/components/divider/index.ts`
- Create: `src/components/divider/dk-divider.stories.ts`
- Modify: `src/index.ts`
- Modify: `package.json`

**API:**
```html
<dk-divider></dk-divider>
<dk-divider label="OR"></dk-divider>
<dk-divider align="left">Section Title</dk-divider>
```

**Props:** `label` (string), `align` (center|left|right), `vertical` (boolean)
**Parts:** `base`, `label`

---

### Task 9: dk-search-input

Search input with debounced events and optional suggestions.

**Files:**
- Create: `src/components/search-input/dk-search-input.ts`
- Create: `src/components/search-input/index.ts`
- Create: `src/components/search-input/dk-search-input.stories.ts`
- Modify: `src/index.ts`
- Modify: `package.json`

**API:**
```html
<dk-search-input placeholder="Search..." debounce="300"></dk-search-input>
```

**Props:** `placeholder` (string), `value` (string), `debounce` (number, default 300), `loading` (boolean), `clearable` (boolean, default true), `size` (sm|md|lg)
**Parts:** `wrapper`, `input`, `icon`, `clear`
**Events:** `dk-search` (detail: { value: string }), `dk-search-clear`

---

## Phase 2: New Section Categories (7 categories, ~18 elements)

### Task 10: Logo Cloud sections

**Files:**
- Create: `src/sections/logo-cloud/dk-section-logo-cloud-simple.ts`
- Create: `src/sections/logo-cloud/dk-section-logo-cloud-grid.ts`
- Create: `src/sections/logo-cloud/dk-section-logo-cloud-split.ts`
- Create: `src/sections/logo-cloud/dk-section-logo-cloud.styles.ts`
- Create: `src/sections/logo-cloud/index.ts`
- Create: `src/sections/logo-cloud/dk-section-logo-cloud.stories.ts`
- Modify: `src/sections.ts`
- Modify: `package.json`

**Variants:**
- `dk-section-logo-cloud-simple`: Horizontal row of logos with heading
- `dk-section-logo-cloud-grid`: Logos in bordered grid cells
- `dk-section-logo-cloud-split`: Text/heading on left, logos on right

**API:**
```html
<dk-section-logo-cloud-simple headline="Trusted by" bg="alt">
  <img src="logo1.svg" alt="Company 1" />
  <img src="logo2.svg" alt="Company 2" />
</dk-section-logo-cloud-simple>
```

---

### Task 11: Blog / Content sections

**Files:**
- Create: `src/sections/blog/dk-section-blog-grid.ts`
- Create: `src/sections/blog/dk-section-blog-featured.ts`
- Create: `src/sections/blog/dk-blog-card.ts`
- Create: `src/sections/blog/dk-section-blog.styles.ts`
- Create: `src/sections/blog/index.ts`
- Create: `src/sections/blog/dk-section-blog.stories.ts`
- Modify: `src/sections.ts`
- Modify: `package.json`

**Variants:**
- `dk-section-blog-grid`: 3-column blog card grid
- `dk-section-blog-featured`: Large featured post + smaller posts sidebar

**dk-blog-card API:**
```html
<dk-blog-card
  image="photo.jpg"
  title="Post Title"
  description="Excerpt..."
  author="Jane Doe"
  date="2026-03-01"
  category="Design"
  href="/blog/post"
></dk-blog-card>
```

---

### Task 12: Timeline / Process / Steps sections

**Files:**
- Create: `src/sections/timeline/dk-section-timeline-vertical.ts`
- Create: `src/sections/timeline/dk-section-timeline-alternating.ts`
- Create: `src/sections/timeline/dk-timeline-step.ts`
- Create: `src/sections/timeline/dk-section-timeline.styles.ts`
- Create: `src/sections/timeline/index.ts`
- Create: `src/sections/timeline/dk-section-timeline.stories.ts`
- Modify: `src/sections.ts`
- Modify: `package.json`

**Variants:**
- `dk-section-timeline-vertical`: Steps with connecting vertical line (all on one side)
- `dk-section-timeline-alternating`: Steps alternate left/right with connecting line

**dk-timeline-step API:**
```html
<dk-timeline-step number="1" title="Discovery" icon="search">
  We learn about your business and goals.
</dk-timeline-step>
```

**Props:** `number` (string), `title` (string), `icon` (string, optional), `image` (string, optional)

---

### Task 13: Product Card sections

**Files:**
- Create: `src/sections/products/dk-section-product-grid.ts`
- Create: `src/sections/products/dk-section-product-carousel.ts`
- Create: `src/sections/products/dk-product-card.ts`
- Create: `src/sections/products/dk-section-products.styles.ts`
- Create: `src/sections/products/index.ts`
- Create: `src/sections/products/dk-section-products.stories.ts`
- Modify: `src/sections.ts`
- Modify: `package.json`

**dk-product-card API:**
```html
<dk-product-card
  image="product.jpg"
  name="Leather Bag"
  price="$129"
  original-price="$169"
  badge="Sale"
  category="Accessories"
  href="/products/bag"
></dk-product-card>
```

**Features:** Hover zoom on image, quick-view overlay, badge positioning, price with strikethrough

---

### Task 14: Category Preview sections

**Files:**
- Create: `src/sections/categories/dk-section-categories-grid.ts`
- Create: `src/sections/categories/dk-section-categories-scroll.ts`
- Create: `src/sections/categories/dk-category-card.ts`
- Create: `src/sections/categories/dk-section-categories.styles.ts`
- Create: `src/sections/categories/index.ts`
- Create: `src/sections/categories/dk-section-categories.stories.ts`
- Modify: `src/sections.ts`
- Modify: `package.json`

**Variants:**
- `dk-section-categories-grid`: Image-background category cards in grid
- `dk-section-categories-scroll`: Horizontal scrolling category cards

**dk-category-card API:**
```html
<dk-category-card image="kitchen.jpg" title="Kitchen" count="42" href="/kitchen"></dk-category-card>
```

---

### Task 15: Banner / Announcement sections

**Files:**
- Create: `src/sections/banner/dk-section-banner-bar.ts`
- Create: `src/sections/banner/dk-section-banner-floating.ts`
- Create: `src/sections/banner/dk-section-banner.styles.ts`
- Create: `src/sections/banner/index.ts`
- Create: `src/sections/banner/dk-section-banner.stories.ts`
- Modify: `src/sections.ts`
- Modify: `package.json`

**Variants:**
- `dk-section-banner-bar`: Top/bottom bar with message + CTA button + dismiss
- `dk-section-banner-floating`: Fixed-position floating banner at bottom of viewport

**API:**
```html
<dk-section-banner-bar variant="brand" dismissable>
  New feature released!
  <dk-button slot="cta" variant="secondary" size="sm">Learn More</dk-button>
</dk-section-banner-bar>
```

---

### Task 16: 404 / Error sections

**Files:**
- Create: `src/sections/error/dk-section-error-simple.ts`
- Create: `src/sections/error/dk-section-error-split.ts`
- Create: `src/sections/error/dk-section-error.styles.ts`
- Create: `src/sections/error/index.ts`
- Create: `src/sections/error/dk-section-error.stories.ts`
- Modify: `src/sections.ts`
- Modify: `package.json`

**Variants:**
- `dk-section-error-simple`: Centered error code + message + CTA
- `dk-section-error-split`: Error content on left, illustration/image on right

**API:**
```html
<dk-section-error-simple code="404" headline="Page not found" description="Sorry, we couldn't find that page.">
  <dk-button slot="cta" variant="primary">Go Home</dk-button>
  <dk-button slot="cta" variant="ghost">Contact Support</dk-button>
</dk-section-error-simple>
```

---

## Phase 3: Variant Expansion (existing sections get more options)

Each existing section category goes from 2-3 variants to 5-8 variants.

### Task 17: Hero variant expansion (+4 variants)

**New elements:**
- `dk-section-hero-video`: Background video hero with overlay
- `dk-section-hero-gradient`: Animated gradient background with centered text
- `dk-section-hero-image-tiles`: Asymmetric image grid beside text content
- `dk-section-hero-minimal`: Clean, minimal hero with large serif text and scroll indicator

**Files:**
- Create: `src/sections/hero/dk-section-hero-video.ts`
- Create: `src/sections/hero/dk-section-hero-gradient.ts`
- Create: `src/sections/hero/dk-section-hero-image-tiles.ts`
- Create: `src/sections/hero/dk-section-hero-minimal.ts`
- Modify: `src/sections/hero/index.ts`
- Update stories

---

### Task 18: Features variant expansion (+3 variants)

**New elements:**
- `dk-section-features-with-image`: Large product screenshot with feature list beside it
- `dk-section-features-icon-grid`: 2x3 grid of icons with descriptions (no cards, flat layout)
- `dk-section-features-tabs`: Tabbed feature showcase with image that changes per tab

**Files:**
- Create: `src/sections/features/dk-section-features-with-image.ts`
- Create: `src/sections/features/dk-section-features-icon-grid.ts`
- Create: `src/sections/features/dk-section-features-tabs.ts`
- Modify: `src/sections/features/index.ts`
- Update stories

---

### Task 19: Testimonials variant expansion (+3 variants)

**New elements:**
- `dk-section-testimonials-featured`: Single large testimonial with big avatar
- `dk-section-testimonials-masonry`: Masonry-style multi-column layout
- `dk-section-testimonials-dark`: Grid on dark background with star ratings

**Files:**
- Create: `src/sections/testimonials/dk-section-testimonials-featured.ts`
- Create: `src/sections/testimonials/dk-section-testimonials-masonry.ts`
- Create: `src/sections/testimonials/dk-section-testimonials-dark.ts`
- Modify: `src/sections/testimonials/index.ts`
- Update stories

---

### Task 20: Footer variant expansion (+3 variants)

**New elements:**
- `dk-section-footer-with-newsletter`: 4-column footer with integrated newsletter form
- `dk-section-footer-centered`: Centered layout with stacked links and social icons
- `dk-section-footer-dark`: Dark themed footer with brand mission statement

**Files:**
- Create: `src/sections/footer/dk-section-footer-with-newsletter.ts`
- Create: `src/sections/footer/dk-section-footer-centered.ts`
- Create: `src/sections/footer/dk-section-footer-dark.ts`
- Modify: `src/sections/footer/index.ts`
- Update stories

---

### Task 21: Navbar variant expansion (+2 variants)

**New elements:**
- `dk-section-navbar-centered`: Centered logo with links on both sides
- `dk-section-navbar-dark`: Dark themed navbar with brand color accents

**Files:**
- Create: `src/sections/navbar/dk-section-navbar-centered.ts`
- Create: `src/sections/navbar/dk-section-navbar-dark.ts`
- Modify: `src/sections/navbar/index.ts`
- Update stories

---

### Task 22: CTA variant expansion (+3 variants)

**New elements:**
- `dk-section-cta-brand`: Full-width brand-colored CTA panel
- `dk-section-cta-dark`: CTA on dark panel with glow effects
- `dk-section-cta-with-image`: CTA with background image and overlay

**Files:**
- Create: `src/sections/cta/dk-section-cta-brand.ts`
- Create: `src/sections/cta/dk-section-cta-dark.ts`
- Create: `src/sections/cta/dk-section-cta-with-image.ts`
- Modify: `src/sections/cta/index.ts`
- Update stories

---

### Task 23: Stats variant expansion (+2 variants)

**New elements:**
- `dk-section-stats-with-image`: Stats alongside a background image
- `dk-section-stats-dark`: Stats on dark background with glowing accents

**Files:**
- Create: `src/sections/stats/dk-section-stats-with-image.ts`
- Create: `src/sections/stats/dk-section-stats-dark.ts`
- Modify: `src/sections/stats/index.ts`
- Update stories

---

### Task 24: FAQ variant expansion (+2 variants)

**New elements:**
- `dk-section-faq-centered`: Centered FAQ with accordion, no side-by-side
- `dk-section-faq-dark`: FAQ accordion on dark background

**Files:**
- Create: `src/sections/faq/dk-section-faq-centered.ts`
- Create: `src/sections/faq/dk-section-faq-dark.ts`
- Modify: `src/sections/faq/index.ts`
- Update stories

---

### Task 25: Newsletter variant expansion (+2 variants)

**New elements:**
- `dk-section-newsletter-dark`: Newsletter form on dark card/background
- `dk-section-newsletter-with-image`: Newsletter with side image

**Files:**
- Create: `src/sections/newsletter/dk-section-newsletter-dark.ts`
- Create: `src/sections/newsletter/dk-section-newsletter-with-image.ts`
- Modify: `src/sections/newsletter/index.ts`
- Update stories

---

### Task 26: Contact variant expansion (+2 variants)

**New elements:**
- `dk-section-contact-with-map`: Contact form with map placeholder slot
- `dk-section-contact-dark`: Contact form on dark background

**Files:**
- Create: `src/sections/contact/dk-section-contact-with-map.ts`
- Create: `src/sections/contact/dk-section-contact-dark.ts`
- Modify: `src/sections/contact/index.ts`
- Update stories

---

### Task 27: Team variant expansion (+2 variants)

**New elements:**
- `dk-section-team-cards`: Team members as full cards with bio and social links
- `dk-section-team-compact`: Compact horizontal list with small avatars

**Files:**
- Create: `src/sections/team/dk-section-team-cards.ts`
- Create: `src/sections/team/dk-section-team-compact.ts`
- Modify: `src/sections/team/index.ts`
- Update stories

---

### Task 28: Pricing variant expansion (+2 variants)

**New elements:**
- `dk-section-pricing-with-toggle`: Pricing tiers with monthly/annual toggle built into the section
- `dk-section-pricing-dark`: Pricing tiers on dark background

**Files:**
- Create: `src/sections/pricing/dk-section-pricing-with-toggle.ts`
- Create: `src/sections/pricing/dk-section-pricing-dark.ts`
- Modify: `src/sections/pricing/index.ts`
- Update stories

---

### Task 29: Gallery variant expansion (+1 variant)

**New elements:**
- `dk-section-gallery-masonry`: Masonry layout with varying image sizes

**Files:**
- Create: `src/sections/gallery/dk-section-gallery-masonry.ts`
- Modify: `src/sections/gallery/index.ts`
- Update stories

---

## Phase 4: Integration & Polish

### Task 30: Update all barrel exports and package.json

- Ensure every new component/section has proper export in package.json `exports` map
- Ensure `src/index.ts` exports all new components
- Ensure `src/sections.ts` exports all new sections
- Run full build and fix any TypeScript errors

### Task 31: Update DesignKit skill file

- Update `C:\Users\brian\.claude\skills\designkit\SKILL.md` with all new components and sections
- Document all new props, parts, slots, events
- Add to the complete page example

### Task 32: Build, test, and publish

- Run `npm run build`
- Run `npm run test`
- Run Storybook and verify all stories render
- Create changeset and publish to npm

---

## Summary

| Phase | Items | New Elements |
|-------|-------|-------------|
| Phase 1: Components | 9 tasks | 9 new components |
| Phase 2: Sections | 7 tasks | ~18 new section elements |
| Phase 3: Variants | 13 tasks | ~29 new section variants |
| Phase 4: Polish | 3 tasks | - |
| **Total** | **32 tasks** | **~56 new elements** |

**Final count:** 23 components + 75+ section elements across 21 section categories.
