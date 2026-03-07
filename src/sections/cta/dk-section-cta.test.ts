import { html, fixture, expect } from '@open-wc/testing';
import './dk-section-cta-centered.js';
import './dk-section-cta-split.js';
import type { DkSectionCtaCentered } from './dk-section-cta-centered.js';
import type { DkSectionCtaSplit } from './dk-section-cta-split.js';

describe('dk-section-cta-centered', () => {
  it('renders headline, description, and CTA slot', async () => {
    const el = await fixture<DkSectionCtaCentered>(html`
      <dk-section-cta-centered
        headline="Ready to start?"
        description="Start building today."
        no-animate
      >
        <button slot="cta">Get Started</button>
      </dk-section-cta-centered>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Ready to start?');
    const desc = el.shadowRoot!.querySelector('.description')!;
    expect(desc.textContent).to.equal('Start building today.');
    const ctaSlot = el.shadowRoot!.querySelector('slot[name="cta"]') as HTMLSlotElement;
    expect(ctaSlot.assignedElements().length).to.equal(1);
  });

  it('applies brand background via bg attribute', async () => {
    const el = await fixture<DkSectionCtaCentered>(html`
      <dk-section-cta-centered headline="Test" bg="brand" no-animate></dk-section-cta-centered>
    `);
    expect(el.getAttribute('bg')).to.equal('brand');
  });
});

describe('dk-section-cta-split', () => {
  it('renders content and media slot', async () => {
    const el = await fixture<DkSectionCtaSplit>(html`
      <dk-section-cta-split headline="Join us" description="Free forever." no-animate>
        <button slot="cta">Sign Up</button>
        <img slot="media" src="demo.png" alt="Demo" />
      </dk-section-cta-split>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Join us');
    const mediaSlot = el.shadowRoot!.querySelector('slot[name="media"]') as HTMLSlotElement;
    expect(mediaSlot).to.exist;
    expect(mediaSlot.assignedElements().length).to.equal(1);
  });
});
