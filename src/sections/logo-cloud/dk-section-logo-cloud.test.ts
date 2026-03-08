import { html, fixture, expect } from '@open-wc/testing';
import './dk-section-logo-cloud-simple.js';
import './dk-section-logo-cloud-grid.js';
import './dk-section-logo-cloud-split.js';
import type { DkSectionLogoCloudSimple } from './dk-section-logo-cloud-simple.js';
import type { DkSectionLogoCloudGrid } from './dk-section-logo-cloud-grid.js';
import type { DkSectionLogoCloudSplit } from './dk-section-logo-cloud-split.js';

describe('dk-section-logo-cloud-simple', () => {
  it('renders headline', async () => {
    const el = await fixture<DkSectionLogoCloudSimple>(html`
      <dk-section-logo-cloud-simple headline="Trusted by" no-animate>
      </dk-section-logo-cloud-simple>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Trusted by');
  });

  it('accepts slotted content', async () => {
    const el = await fixture<DkSectionLogoCloudSimple>(html`
      <dk-section-logo-cloud-simple headline="Partners" no-animate>
        <img src="logo1.png" alt="Logo 1" />
        <img src="logo2.png" alt="Logo 2" />
      </dk-section-logo-cloud-simple>
    `);
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(2);
  });

  it('hides headline when empty', async () => {
    const el = await fixture<DkSectionLogoCloudSimple>(html`
      <dk-section-logo-cloud-simple no-animate></dk-section-logo-cloud-simple>
    `);
    const h2 = el.shadowRoot!.querySelector('h2');
    expect(h2).to.not.exist;
  });
});

describe('dk-section-logo-cloud-grid', () => {
  it('renders headline and grid', async () => {
    const el = await fixture<DkSectionLogoCloudGrid>(html`
      <dk-section-logo-cloud-grid headline="Our partners" no-animate>
        <div>Logo A</div>
      </dk-section-logo-cloud-grid>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Our partners');
    const grid = el.shadowRoot!.querySelector('.grid');
    expect(grid).to.exist;
  });

  it('applies bg attribute', async () => {
    const el = await fixture<DkSectionLogoCloudGrid>(html`
      <dk-section-logo-cloud-grid headline="Dark grid" bg="dark" no-animate>
      </dk-section-logo-cloud-grid>
    `);
    expect(el.getAttribute('bg')).to.equal('dark');
  });

  it('accepts columns property', async () => {
    const el = await fixture<DkSectionLogoCloudGrid>(html`
      <dk-section-logo-cloud-grid columns="3" no-animate></dk-section-logo-cloud-grid>
    `);
    expect(el.columns).to.equal(3);
  });
});

describe('dk-section-logo-cloud-split', () => {
  it('renders headline and description', async () => {
    const el = await fixture<DkSectionLogoCloudSplit>(html`
      <dk-section-logo-cloud-split
        headline="Integrations"
        description="Works with your stack"
        no-animate
      ></dk-section-logo-cloud-split>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Integrations');
    const desc = el.shadowRoot!.querySelector('.description')!;
    expect(desc.textContent).to.equal('Works with your stack');
  });

  it('accepts slotted logos and CTA', async () => {
    const el = await fixture<DkSectionLogoCloudSplit>(html`
      <dk-section-logo-cloud-split headline="Partners" no-animate>
        <img src="logo.png" alt="Logo" />
        <a slot="cta" href="#">Learn more</a>
      </dk-section-logo-cloud-split>
    `);
    const defaultSlot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(defaultSlot.assignedElements().length).to.equal(1);
    const ctaSlot = el.shadowRoot!.querySelector('slot[name="cta"]') as HTMLSlotElement;
    expect(ctaSlot.assignedElements().length).to.equal(1);
  });

  it('applies bg attribute', async () => {
    const el = await fixture<DkSectionLogoCloudSplit>(html`
      <dk-section-logo-cloud-split bg="brand" no-animate></dk-section-logo-cloud-split>
    `);
    expect(el.getAttribute('bg')).to.equal('brand');
  });
});
