import { html, fixture, expect } from '@open-wc/testing';
import './dk-section-hero-centered.js';
import './dk-section-hero-split.js';
import './dk-section-hero-background.js';
import type { DkSectionHeroCentered } from './dk-section-hero-centered.js';
import type { DkSectionHeroSplit } from './dk-section-hero-split.js';
import type { DkSectionHeroBackground } from './dk-section-hero-background.js';

describe('dk-section-hero-centered', () => {
  it('renders headline and subheadline', async () => {
    const el = await fixture<DkSectionHeroCentered>(html`
      <dk-section-hero-centered
        headline="Build faster"
        subheadline="A component library"
        no-animate
      ></dk-section-hero-centered>
    `);
    const h1 = el.shadowRoot!.querySelector('h1')!;
    expect(h1.textContent).to.equal('Build faster');
    const sub = el.shadowRoot!.querySelector('.subheadline')!;
    expect(sub.textContent).to.equal('A component library');
  });

  it('uses h1 for the headline', async () => {
    const el = await fixture<DkSectionHeroCentered>(html`
      <dk-section-hero-centered headline="Important" no-animate></dk-section-hero-centered>
    `);
    const h1 = el.shadowRoot!.querySelector('h1');
    expect(h1).to.exist;
  });
});

describe('dk-section-hero-split', () => {
  it('renders media slot', async () => {
    const el = await fixture<DkSectionHeroSplit>(html`
      <dk-section-hero-split headline="Split" no-animate>
        <img slot="media" src="test.jpg" alt="Test" />
      </dk-section-hero-split>
    `);
    const mediaSlot = el.shadowRoot!.querySelector('slot[name="media"]') as HTMLSlotElement;
    expect(mediaSlot).to.exist;
    expect(mediaSlot.assignedElements().length).to.equal(1);
  });
});

describe('dk-section-hero-background', () => {
  it('renders background image div', async () => {
    const el = await fixture<DkSectionHeroBackground>(html`
      <dk-section-hero-background
        headline="Hero"
        image="https://example.com/bg.jpg"
        no-animate
      ></dk-section-hero-background>
    `);
    const bgDiv = el.shadowRoot!.querySelector('.bg-image') as HTMLElement;
    expect(bgDiv).to.exist;
    expect(bgDiv.style.backgroundImage).to.contain('bg.jpg');
  });
});
