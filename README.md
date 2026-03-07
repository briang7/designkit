# DesignKit

A framework-agnostic UI component library built with [Lit](https://lit.dev/) Web Components. Works with React, Vue, Angular, Svelte, or plain HTML.

## Install

```bash
npm install @briang7/designkit
```

Import the theme and all components:

```js
import '@briang7/designkit/themes/tokens.css';
import '@briang7/designkit/themes/light.css';
import '@briang7/designkit';
```

### CDN

No build tools required:

```html
<link rel="stylesheet" href="https://unpkg.com/@briang7/designkit/dist/themes/tokens.css">
<link rel="stylesheet" href="https://unpkg.com/@briang7/designkit/dist/themes/light.css">
<script src="https://unpkg.com/@briang7/designkit/dist/designkit.umd.cjs"></script>
```

## Usage

```html
<dk-button variant="primary" size="md">Click Me</dk-button>
<dk-input label="Email" placeholder="you@example.com"></dk-input>
<dk-badge variant="success">Active</dk-badge>
```

### Tree-Shaking

Import only the components you need:

```js
import '@briang7/designkit/button';
import '@briang7/designkit/input';
```

## Components

### Primitives

| Component | Tag | Description |
|-----------|-----|-------------|
| Button | `<dk-button>` | Primary actions and links |
| Badge | `<dk-badge>` | Status indicators and counts |
| Avatar | `<dk-avatar>` | User profile images and initials |
| Input | `<dk-input>` | Text fields with labels and validation |
| Checkbox | `<dk-checkbox>` | Boolean toggle with label |
| Switch | `<dk-switch>` | On/off toggle control |
| Select | `<dk-select>` | Dropdown selection menu |
| Card | `<dk-card>` | Content container with variants |
| Tooltip | `<dk-tooltip>` | Contextual information on hover |
| Tabs | `<dk-tabs>` | Tabbed content navigation |
| Dialog | `<dk-dialog>` | Modal overlay with focus trap |
| Drawer | `<dk-drawer>` | Slide-out panel from any edge |
| Toast | `<dk-toast>` | Notification messages |
| Data Table | `<dk-data-table>` | Sortable, paginated data grid |

### Signature Components

| Component | Tag | Description |
|-----------|-----|-------------|
| Skeleton | `<dk-skeleton>` | Loading placeholder with shimmer animation |
| Command | `<dk-command>` | Command palette with fuzzy search (Cmd+K) |
| Form | `<dk-form>` | Declarative form with validation and layout |

## Sections

36 pre-built page sections across 14 types for composing full landing pages:

| Type | Variants | Import |
|------|----------|--------|
| Navbar | Simple, With Search, Mega | `./sections/navbar` |
| Hero | Centered, Split, Background | `./sections/hero` |
| Footer | Simple, Columns | `./sections/footer` |
| Features | Grid, Alternating, Centered | `./sections/features` |
| Testimonials | Grid, Carousel | `./sections/testimonials` |
| CTA | Centered, Split | `./sections/cta` |
| Stats | Bar, Cards | `./sections/stats` |
| Pricing | Tiers, Comparison, Simple | `./sections/pricing` |
| FAQ | Accordion, Two Column | `./sections/faq` |
| Newsletter | Inline, Card | `./sections/newsletter` |
| Gallery | Grid, Carousel | `./sections/gallery` |
| Sidebar | Nav, Brand | `./sections/sidebar` |
| Team | Grid, List | `./sections/team` |
| Contact | Split, Centered | `./sections/contact` |

Import individual section types or all at once:

```js
// Individual
import '@briang7/designkit/sections/hero';
import '@briang7/designkit/sections/features';

// All sections
import '@briang7/designkit/sections';
```

### Build a Landing Page

```html
<dk-section-navbar-simple brand="MyApp" sticky>
  <a slot="links" href="#features">Features</a>
  <a slot="links" href="#pricing">Pricing</a>
  <dk-button slot="cta" variant="primary">Get Started</dk-button>
</dk-section-navbar-simple>

<dk-section-hero-centered
  headline="Build faster"
  subheadline="Ship in days, not months."
>
  <dk-button slot="cta-primary" variant="primary" size="lg">Start Free</dk-button>
</dk-section-hero-centered>

<dk-section-features-grid headline="Everything you need">
  <dk-feature-card icon="lightning" title="Fast" description="Blazing performance"></dk-feature-card>
  <dk-feature-card icon="shield" title="Secure" description="Built-in security"></dk-feature-card>
  <dk-feature-card icon="puzzle" title="Modular" description="Use what you need"></dk-feature-card>
</dk-section-features-grid>

<dk-section-footer-simple brand="MyApp"></dk-section-footer-simple>
```

## Animations

DesignKit includes [Motion One](https://motion.dev/) for smooth, hardware-accelerated animations:

- **Micro-interactions**: Button press scale, switch spring toggle, dialog fade, toast slide
- **Section entrances**: Staggered fade-in when sections scroll into view via IntersectionObserver
- **Reduced motion**: Respects `prefers-reduced-motion: reduce` automatically
- **Per-section control**: Add `no-animate` attribute to disable entrance animations

## Theming

DesignKit uses CSS custom properties. Import a built-in theme or create your own.

```html
<!-- Light theme (default) -->
<link rel="stylesheet" href="@briang7/designkit/themes/light.css">

<!-- Dark theme -->
<body class="dk-dark">...</body>

<!-- Auto (follows OS preference) -->
<link rel="stylesheet" href="@briang7/designkit/themes/auto.css">
```

Override tokens for a custom look:

```css
:root {
  --dk-color-primary: #9333ea;
  --dk-color-primary-hover: #7e22ce;
  --dk-radius-md: 16px;
}
```

## Framework Guides

### React

```tsx
import '@briang7/designkit';
import '@briang7/designkit/themes/tokens.css';
import '@briang7/designkit/themes/light.css';

function App() {
  return <dk-button variant="primary">Click Me</dk-button>;
}
```

### Vue

Configure custom elements in `vite.config.ts`:

```ts
vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('dk-'),
    },
  },
})
```

### Angular

Add `CUSTOM_ELEMENTS_SCHEMA` to your component:

```ts
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
```

## Development

```bash
npm run dev            # Vite dev server
npm run build          # TypeScript + Vite production build
npm test               # Web Test Runner
npm run lint           # ESLint
npm run typecheck      # TypeScript type checking
npm run storybook      # Storybook dev server on :6006
npm run build-storybook # Static Storybook build
```

## License

MIT
