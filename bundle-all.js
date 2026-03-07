// Bundle all components + sections for CDN/script tag usage
// Shim process.env for libraries (e.g. motion) that check it at runtime in IIFE bundles
if (typeof globalThis.process === 'undefined') {
  globalThis.process = { env: { NODE_ENV: 'production' } };
}
export * from './dist/index.js';
export * from './dist/sections/hero/dk-section-hero-background.js';
export * from './dist/sections/hero/dk-section-hero-split.js';
export * from './dist/sections/hero/dk-section-hero-centered.js';
export * from './dist/sections/navbar/dk-section-navbar-simple.js';
export * from './dist/sections/navbar/dk-section-navbar-mega.js';
export * from './dist/sections/navbar/dk-section-navbar-with-search.js';
export * from './dist/sections/features/dk-section-features-grid.js';
export * from './dist/sections/features/dk-section-features-centered.js';
export * from './dist/sections/features/dk-section-features-alternating.js';
export * from './dist/sections/features/dk-feature-card.js';
export * from './dist/sections/features/dk-feature-row.js';
export * from './dist/sections/pricing/dk-section-pricing-tiers.js';
export * from './dist/sections/pricing/dk-section-pricing-comparison.js';
export * from './dist/sections/pricing/dk-section-pricing-simple.js';
export * from './dist/sections/pricing/dk-pricing-tier.js';
export * from './dist/sections/testimonials/dk-section-testimonials-grid.js';
export * from './dist/sections/testimonials/dk-section-testimonials-carousel.js';
export * from './dist/sections/testimonials/dk-testimonial-card.js';
export * from './dist/sections/faq/dk-section-faq-accordion.js';
export * from './dist/sections/faq/dk-section-faq-two-column.js';
export * from './dist/sections/faq/dk-faq-item.js';
export * from './dist/sections/cta/dk-section-cta-centered.js';
export * from './dist/sections/cta/dk-section-cta-split.js';
export * from './dist/sections/stats/dk-section-stats-bar.js';
export * from './dist/sections/stats/dk-section-stats-cards.js';
export * from './dist/sections/stats/dk-stat.js';
export * from './dist/sections/newsletter/dk-section-newsletter-inline.js';
export * from './dist/sections/newsletter/dk-section-newsletter-card.js';
export * from './dist/sections/footer/dk-section-footer-columns.js';
export * from './dist/sections/footer/dk-section-footer-simple.js';
export * from './dist/sections/footer/dk-footer-helpers.js';
export * from './dist/sections/contact/dk-section-contact-split.js';
export * from './dist/sections/contact/dk-section-contact-centered.js';
export * from './dist/sections/team/dk-section-team-grid.js';
export * from './dist/sections/team/dk-section-team-list.js';
export * from './dist/sections/team/dk-team-member.js';
export * from './dist/sections/gallery/dk-section-gallery-grid.js';
export * from './dist/sections/gallery/dk-section-gallery-carousel.js';
export * from './dist/sections/gallery/dk-gallery-item.js';
export * from './dist/sections/sidebar/dk-section-sidebar-brand.js';
export * from './dist/sections/sidebar/dk-section-sidebar-nav.js';
export * from './dist/sections/sidebar/dk-sidebar-item.js';
export * from './dist/sections/sidebar/dk-sidebar-group.js';
