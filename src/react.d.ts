/**
 * React JSX IntrinsicElements augmentation for DesignKit web components.
 *
 * Usage — add to your tsconfig.json compilerOptions.types:
 *   "types": ["@briang7/designkit/react"]
 *
 * Or add a triple-slash reference in any .d.ts:
 *   /// <reference types="@briang7/designkit/react" />
 */

type DkProps = import('react').DetailedHTMLProps<
  import('react').HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  /** Allow any attribute — web components accept arbitrary properties */
  [key: string]: unknown;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // ── Base Components ──────────────────────────────────────
      'dk-accordion': DkProps;
      'dk-accordion-item': DkProps;
      'dk-alert': DkProps;
      'dk-avatar': DkProps;
      'dk-badge': DkProps;
      'dk-breadcrumb': DkProps;
      'dk-breadcrumbs': DkProps;
      'dk-button': DkProps;
      'dk-card': DkProps;
      'dk-checkbox': DkProps;
      'dk-data-table': DkProps;
      'dk-dialog': DkProps;
      'dk-divider': DkProps;
      'dk-drawer': DkProps;
      'dk-dropdown': DkProps;
      'dk-dropdown-divider': DkProps;
      'dk-dropdown-item': DkProps;
      'dk-input': DkProps;
      'dk-lightbox': DkProps;
      'dk-pagination': DkProps;
      'dk-progress': DkProps;
      'dk-rating': DkProps;
      'dk-search-input': DkProps;
      'dk-select': DkProps;
      'dk-skeleton': DkProps;
      'dk-switch': DkProps;
      'dk-tab': DkProps;
      'dk-tab-panel': DkProps;
      'dk-tabs': DkProps;
      'dk-toast': DkProps;
      'dk-toast-container': DkProps;
      'dk-tooltip': DkProps;

      // ── Signature Components ─────────────────────────────────
      'dk-command': DkProps;
      'dk-command-group': DkProps;
      'dk-command-item': DkProps;
      'dk-form': DkProps;

      // ── Sections: Navbar ─────────────────────────────────────
      'dk-section-navbar-centered': DkProps;
      'dk-section-navbar-dark': DkProps;
      'dk-section-navbar-mega': DkProps;
      'dk-section-navbar-simple': DkProps;
      'dk-section-navbar-with-search': DkProps;

      // ── Sections: Hero ───────────────────────────────────────
      'dk-section-hero-background': DkProps;
      'dk-section-hero-centered': DkProps;
      'dk-section-hero-gradient': DkProps;
      'dk-section-hero-image-tiles': DkProps;
      'dk-section-hero-minimal': DkProps;
      'dk-section-hero-split': DkProps;
      'dk-section-hero-video': DkProps;

      // ── Sections: Features ───────────────────────────────────
      'dk-feature-card': DkProps;
      'dk-feature-row': DkProps;
      'dk-section-features-alternating': DkProps;
      'dk-section-features-centered': DkProps;
      'dk-section-features-grid': DkProps;
      'dk-section-features-icon-grid': DkProps;
      'dk-section-features-tabs': DkProps;
      'dk-section-features-with-image': DkProps;

      // ── Sections: CTA ────────────────────────────────────────
      'dk-section-cta-brand': DkProps;
      'dk-section-cta-centered': DkProps;
      'dk-section-cta-dark': DkProps;
      'dk-section-cta-split': DkProps;
      'dk-section-cta-with-image': DkProps;

      // ── Sections: Pricing ────────────────────────────────────
      'dk-pricing-tier': DkProps;
      'dk-section-pricing-comparison': DkProps;
      'dk-section-pricing-dark': DkProps;
      'dk-section-pricing-simple': DkProps;
      'dk-section-pricing-tiers': DkProps;
      'dk-section-pricing-with-toggle': DkProps;

      // ── Sections: FAQ ────────────────────────────────────────
      'dk-faq-item': DkProps;
      'dk-section-faq-accordion': DkProps;
      'dk-section-faq-centered': DkProps;
      'dk-section-faq-dark': DkProps;
      'dk-section-faq-two-column': DkProps;

      // ── Sections: Testimonials ───────────────────────────────
      'dk-testimonial-card': DkProps;
      'dk-section-testimonials-carousel': DkProps;
      'dk-section-testimonials-dark': DkProps;
      'dk-section-testimonials-featured': DkProps;
      'dk-section-testimonials-grid': DkProps;
      'dk-section-testimonials-masonry': DkProps;

      // ── Sections: Team ───────────────────────────────────────
      'dk-team-member': DkProps;
      'dk-section-team-cards': DkProps;
      'dk-section-team-compact': DkProps;
      'dk-section-team-grid': DkProps;
      'dk-section-team-list': DkProps;

      // ── Sections: Gallery ────────────────────────────────────
      'dk-gallery-item': DkProps;
      'dk-section-gallery-carousel': DkProps;
      'dk-section-gallery-grid': DkProps;
      'dk-section-gallery-masonry': DkProps;

      // ── Sections: Footer ─────────────────────────────────────
      'dk-footer-column': DkProps;
      'dk-footer-link': DkProps;
      'dk-section-footer-centered': DkProps;
      'dk-section-footer-columns': DkProps;
      'dk-section-footer-dark': DkProps;
      'dk-section-footer-simple': DkProps;
      'dk-section-footer-with-newsletter': DkProps;

      // ── Sections: Sidebar ────────────────────────────────────
      'dk-sidebar-group': DkProps;
      'dk-sidebar-item': DkProps;
      'dk-section-sidebar-brand': DkProps;
      'dk-section-sidebar-nav': DkProps;

      // ── Sections: Stats ──────────────────────────────────────
      'dk-stat': DkProps;
      'dk-section-stats-bar': DkProps;
      'dk-section-stats-cards': DkProps;
      'dk-section-stats-dark': DkProps;
      'dk-section-stats-with-image': DkProps;

      // ── Sections: Contact ────────────────────────────────────
      'dk-section-contact-centered': DkProps;
      'dk-section-contact-dark': DkProps;
      'dk-section-contact-split': DkProps;
      'dk-section-contact-with-map': DkProps;

      // ── Sections: Newsletter ─────────────────────────────────
      'dk-section-newsletter-card': DkProps;
      'dk-section-newsletter-dark': DkProps;
      'dk-section-newsletter-inline': DkProps;
      'dk-section-newsletter-with-image': DkProps;

      // ── Sections: Banner ─────────────────────────────────────
      'dk-section-banner-bar': DkProps;
      'dk-section-banner-cookie': DkProps;
      'dk-section-banner-floating': DkProps;

      // ── Sections: Blog ───────────────────────────────────────
      'dk-blog-card': DkProps;
      'dk-section-blog-featured': DkProps;
      'dk-section-blog-grid': DkProps;

      // ── Sections: Products ───────────────────────────────────
      'dk-product-card': DkProps;
      'dk-section-products-carousel': DkProps;
      'dk-section-products-grid': DkProps;

      // ── Sections: Categories ─────────────────────────────────
      'dk-category-card': DkProps;
      'dk-section-categories-grid': DkProps;
      'dk-section-categories-scroll': DkProps;

      // ── Sections: Logo Cloud ─────────────────────────────────
      'dk-section-logo-cloud-grid': DkProps;
      'dk-section-logo-cloud-simple': DkProps;
      'dk-section-logo-cloud-split': DkProps;

      // ── Sections: Timeline ───────────────────────────────────
      'dk-timeline-step': DkProps;
      'dk-section-timeline-alternating': DkProps;
      'dk-section-timeline-vertical': DkProps;

      // ── Sections: Error ──────────────────────────────────────
      'dk-section-error-simple': DkProps;
      'dk-section-error-split': DkProps;
      'dk-section-error-with-links': DkProps;
    }
  }
}
