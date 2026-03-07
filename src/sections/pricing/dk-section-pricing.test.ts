import { html, fixture, expect } from '@open-wc/testing';
import './dk-pricing-tier.js';
import './dk-section-pricing-tiers.js';
import './dk-section-pricing-comparison.js';
import './dk-section-pricing-simple.js';
import type { DkPricingTier } from './dk-pricing-tier.js';
import type { DkSectionPricingTiers } from './dk-section-pricing-tiers.js';
import type { DkSectionPricingSimple } from './dk-section-pricing-simple.js';

describe('dk-pricing-tier', () => {
  it('renders name, price, and features', async () => {
    const el = await fixture<DkPricingTier>(html`
      <dk-pricing-tier
        name="Pro"
        price="$29"
        period="/mo"
        .features=${['Feature A', 'Feature B']}
      ></dk-pricing-tier>
    `);
    const name = el.shadowRoot!.querySelector('.name')!;
    expect(name.textContent).to.equal('Pro');
    const price = el.shadowRoot!.querySelector('.price')!;
    expect(price.textContent).to.equal('$29');
    const items = el.shadowRoot!.querySelectorAll('.feature-item');
    expect(items.length).to.equal(2);
  });

  it('shows Most Popular badge when featured', async () => {
    const el = await fixture<DkPricingTier>(html`
      <dk-pricing-tier name="Pro" price="$29" featured></dk-pricing-tier>
    `);
    const badge = el.shadowRoot!.querySelector('.badge')!;
    expect(badge).to.exist;
    expect(badge.textContent).to.equal('Most Popular');
  });
});

describe('dk-section-pricing-tiers', () => {
  it('renders headline and toggle', async () => {
    const el = await fixture<DkSectionPricingTiers>(html`
      <dk-section-pricing-tiers headline="Pricing" no-animate>
        <dk-pricing-tier name="Basic" price="$9"></dk-pricing-tier>
      </dk-section-pricing-tiers>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Pricing');
    const toggle = el.shadowRoot!.querySelector('[part="toggle"]');
    expect(toggle).to.exist;
  });
});

describe('dk-section-pricing-simple', () => {
  it('renders single plan card', async () => {
    const el = await fixture<DkSectionPricingSimple>(html`
      <dk-section-pricing-simple
        name="Starter"
        price="$0"
        period="/mo"
        description="Free forever"
        .features=${['Basic support']}
        no-animate
      ></dk-section-pricing-simple>
    `);
    const price = el.shadowRoot!.querySelector('.price')!;
    expect(price.textContent).to.equal('$0');
    const features = el.shadowRoot!.querySelectorAll('.feature-item');
    expect(features.length).to.equal(1);
  });
});
