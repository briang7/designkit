import { html, fixture, expect } from '@open-wc/testing';
import './dk-footer-helpers.js';
import './dk-section-footer-columns.js';
import './dk-section-footer-simple.js';
import type { DkSectionFooterColumns } from './dk-section-footer-columns.js';
import type { DkSectionFooterSimple } from './dk-section-footer-simple.js';
import type { DkFooterColumn } from './dk-footer-helpers.js';

describe('dk-section-footer-columns', () => {
  it('renders brand and description', async () => {
    const el = await fixture<DkSectionFooterColumns>(html`
      <dk-section-footer-columns
        brand="DesignKit"
        description="A component library"
        no-animate
      ></dk-section-footer-columns>
    `);
    const brandName = el.shadowRoot!.querySelector('.brand-name')!;
    expect(brandName.textContent).to.equal('DesignKit');
    const desc = el.shadowRoot!.querySelector('.description')!;
    expect(desc.textContent).to.equal('A component library');
  });

  it('renders copyright text', async () => {
    const el = await fixture<DkSectionFooterColumns>(html`
      <dk-section-footer-columns brand="Test" copyright="2025 Test Inc" no-animate></dk-section-footer-columns>
    `);
    const copy = el.shadowRoot!.querySelector('.copyright')!;
    expect(copy.textContent).to.equal('2025 Test Inc');
  });

  it('projects column slots', async () => {
    const el = await fixture<DkSectionFooterColumns>(html`
      <dk-section-footer-columns brand="Test" no-animate>
        <dk-footer-column slot="columns" label="Product">
          <dk-footer-link href="/features">Features</dk-footer-link>
        </dk-footer-column>
      </dk-section-footer-columns>
    `);
    const colSlot = el.shadowRoot!.querySelector('slot[name="columns"]') as HTMLSlotElement;
    expect(colSlot).to.exist;
    expect(colSlot.assignedElements().length).to.equal(1);
  });

  it('uses footer element', async () => {
    const el = await fixture<DkSectionFooterColumns>(html`
      <dk-section-footer-columns brand="Test" no-animate></dk-section-footer-columns>
    `);
    const footer = el.shadowRoot!.querySelector('footer');
    expect(footer).to.exist;
  });
});

describe('dk-footer-column', () => {
  it('renders label', async () => {
    const el = await fixture<DkFooterColumn>(html`
      <dk-footer-column label="Product">
        <dk-footer-link href="#">Link</dk-footer-link>
      </dk-footer-column>
    `);
    const label = el.shadowRoot!.querySelector('.label')!;
    expect(label.textContent).to.equal('Product');
  });
});

describe('dk-section-footer-simple', () => {
  it('renders brand text', async () => {
    const el = await fixture<DkSectionFooterSimple>(html`
      <dk-section-footer-simple brand="DesignKit" no-animate></dk-section-footer-simple>
    `);
    const brand = el.shadowRoot!.querySelector('.brand-name')!;
    expect(brand.textContent).to.equal('DesignKit');
  });
});
