import { test, expect } from '@playwright/test';

const components = [
  // Primitives
  { name: 'Button', story: 'components-button--variants' },
  { name: 'Badge', story: 'components-badge--variants' },
  { name: 'Avatar', story: 'components-avatar--default' },
  { name: 'Input', story: 'components-input--default' },
  { name: 'Checkbox', story: 'components-checkbox--default' },
  { name: 'Switch', story: 'components-switch--default' },
  { name: 'Select', story: 'components-select--default' },
  { name: 'Card', story: 'components-card--default' },
  { name: 'Tooltip', story: 'components-tooltip--default' },
  { name: 'Tabs', story: 'components-tabs--default' },
  { name: 'Dialog', story: 'components-dialog--default' },
  { name: 'DataTable', story: 'components-datatable--default' },

  // Signature components
  { name: 'Skeleton', story: 'signature-skeleton--default' },
  { name: 'Command', story: 'signature-command--default' },
  { name: 'Form', story: 'signature-form--default' },

  // Sections (representative variants)
  { name: 'SectionNavbarSimple', story: 'sections-navbar--simple' },
  { name: 'SectionHeroCentered', story: 'sections-hero--centered' },
  { name: 'SectionHeroSplit', story: 'sections-hero--split' },
  { name: 'SectionFeaturesGrid', story: 'sections-features--grid' },
  { name: 'SectionTestimonialsGrid', story: 'sections-testimonials--grid' },
  { name: 'SectionCtaCentered', story: 'sections-cta--centered' },
  { name: 'SectionStatsCards', story: 'sections-stats--cards' },
  { name: 'SectionPricingTiers', story: 'sections-pricing--tiers' },
  { name: 'SectionFaqAccordion', story: 'sections-faq--accordion' },
  { name: 'SectionNewsletterInline', story: 'sections-newsletter--inline' },
  { name: 'SectionGalleryGrid', story: 'sections-gallery--grid' },
  { name: 'SectionSidebarNav', story: 'sections-sidebar--nav' },
  { name: 'SectionTeamGrid', story: 'sections-team--grid' },
  { name: 'SectionContactSplit', story: 'sections-contact--split' },
  { name: 'SectionFooterColumns', story: 'sections-footer--columns' },
];

for (const { name, story } of components) {
  test(`${name} visual regression`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story}&viewMode=story`);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#storybook-root')).toHaveScreenshot(`${name}.png`);
  });
}
