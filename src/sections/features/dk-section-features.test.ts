import { html, fixture, expect } from '@open-wc/testing';
import './dk-feature-card.js';
import './dk-section-features-grid.js';
import './dk-section-features-alternating.js';
import './dk-section-features-centered.js';
import type { DkFeatureCard } from './dk-feature-card.js';
import type { DkSectionFeaturesGrid } from './dk-section-features-grid.js';
import type { DkSectionFeaturesAlternating } from './dk-section-features-alternating.js';
import type { DkSectionFeaturesCentered } from './dk-section-features-centered.js';

describe('dk-feature-card', () => {
  it('renders icon, title, and description', async () => {
    const el = await fixture<DkFeatureCard>(html`
      <dk-feature-card icon="lightning" title="Fast" description="Blazing performance"></dk-feature-card>
    `);
    const h3 = el.shadowRoot!.querySelector('h3')!;
    expect(h3.textContent).to.equal('Fast');
    const p = el.shadowRoot!.querySelector('p')!;
    expect(p.textContent).to.equal('Blazing performance');
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg).to.exist;
  });

  it('renders without icon when not provided', async () => {
    const el = await fixture<DkFeatureCard>(html`
      <dk-feature-card title="Test" description="Desc"></dk-feature-card>
    `);
    const iconContainer = el.shadowRoot!.querySelector('.icon-container');
    expect(iconContainer).to.not.exist;
  });
});

describe('dk-section-features-grid', () => {
  it('renders headline and subheadline', async () => {
    const el = await fixture<DkSectionFeaturesGrid>(html`
      <dk-section-features-grid headline="Features" subheadline="Built for devs" no-animate>
        <dk-feature-card icon="lightning" title="Fast" description="Quick"></dk-feature-card>
      </dk-section-features-grid>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Features');
    const sub = el.shadowRoot!.querySelector('.subheadline')!;
    expect(sub.textContent).to.equal('Built for devs');
  });

  it('slots feature cards', async () => {
    const el = await fixture<DkSectionFeaturesGrid>(html`
      <dk-section-features-grid headline="Test" no-animate>
        <dk-feature-card icon="shield" title="Secure" description="Safe"></dk-feature-card>
        <dk-feature-card icon="code" title="Clean" description="Tidy"></dk-feature-card>
      </dk-section-features-grid>
    `);
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(2);
  });
});

describe('dk-section-features-alternating', () => {
  it('sets reverse attribute on even rows', async () => {
    const el = await fixture<DkSectionFeaturesAlternating>(html`
      <dk-section-features-alternating headline="Alternating" no-animate>
        <dk-feature-row image="a.jpg" title="First" description="Row 1"></dk-feature-row>
        <dk-feature-row image="b.jpg" title="Second" description="Row 2"></dk-feature-row>
        <dk-feature-row image="c.jpg" title="Third" description="Row 3"></dk-feature-row>
      </dk-section-features-alternating>
    `);
    const rows = el.querySelectorAll('dk-feature-row');
    expect(rows[0].hasAttribute('reverse')).to.be.false;
    expect(rows[1].hasAttribute('reverse')).to.be.true;
    expect(rows[2].hasAttribute('reverse')).to.be.false;
  });
});

describe('dk-section-features-centered', () => {
  it('renders image slot and feature cards', async () => {
    const el = await fixture<DkSectionFeaturesCentered>(html`
      <dk-section-features-centered headline="Centered" no-animate>
        <img slot="image" src="screenshot.png" alt="Screenshot" />
        <dk-feature-card icon="star" title="Great" description="Awesome"></dk-feature-card>
      </dk-section-features-centered>
    `);
    const imageSlot = el.shadowRoot!.querySelector('slot[name="image"]') as HTMLSlotElement;
    expect(imageSlot).to.exist;
    expect(imageSlot.assignedElements().length).to.equal(1);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Centered');
  });
});
