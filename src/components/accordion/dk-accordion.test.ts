import { html, fixture, expect } from '@open-wc/testing';
import './dk-accordion.js';
import './dk-accordion-item.js';
import type { DkAccordion } from './dk-accordion.js';
import type { DkAccordionItem } from './dk-accordion-item.js';

describe('dk-accordion', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkAccordion>(html`
      <dk-accordion>
        <dk-accordion-item label="Section 1">Content 1</dk-accordion-item>
        <dk-accordion-item label="Section 2">Content 2</dk-accordion-item>
      </dk-accordion>
    `);
    expect(el).to.exist;
    expect(el.multiple).to.be.false;
    const items = el.querySelectorAll('dk-accordion-item');
    expect(items.length).to.equal(2);
  });

  it('renders accordion items with labels', async () => {
    const el = await fixture<DkAccordion>(html`
      <dk-accordion>
        <dk-accordion-item label="First">Content 1</dk-accordion-item>
        <dk-accordion-item label="Second">Content 2</dk-accordion-item>
      </dk-accordion>
    `);
    await el.updateComplete;
    const items = el.querySelectorAll('dk-accordion-item');
    expect(items[0].label).to.equal('First');
    expect(items[1].label).to.equal('Second');
    const trigger = items[0].shadowRoot!.querySelector('.trigger')!;
    expect(trigger).to.exist;
    expect(trigger.getAttribute('aria-expanded')).to.equal('false');
  });

  it('opens an item on click', async () => {
    const el = await fixture<DkAccordion>(html`
      <dk-accordion>
        <dk-accordion-item label="Section 1">Content 1</dk-accordion-item>
        <dk-accordion-item label="Section 2">Content 2</dk-accordion-item>
      </dk-accordion>
    `);
    await el.updateComplete;
    const items = el.querySelectorAll('dk-accordion-item');
    const trigger = items[0].shadowRoot!.querySelector('.trigger') as HTMLButtonElement;
    trigger.click();
    await items[0].updateComplete;
    expect(items[0].open).to.be.true;
    expect(items[0].shadowRoot!.querySelector('.trigger')!.getAttribute('aria-expanded')).to.equal('true');
  });

  it('closes other items in single-open mode', async () => {
    const el = await fixture<DkAccordion>(html`
      <dk-accordion>
        <dk-accordion-item label="Section 1" open>Content 1</dk-accordion-item>
        <dk-accordion-item label="Section 2">Content 2</dk-accordion-item>
      </dk-accordion>
    `);
    await el.updateComplete;
    const items = el.querySelectorAll('dk-accordion-item');
    expect(items[0].open).to.be.true;

    // Open second item — first should close
    const trigger2 = items[1].shadowRoot!.querySelector('.trigger') as HTMLButtonElement;
    trigger2.click();
    await items[1].updateComplete;
    await el.updateComplete;
    expect(items[1].open).to.be.true;
    expect(items[0].open).to.be.false;
  });

  it('allows multiple items open in multiple mode', async () => {
    const el = await fixture<DkAccordion>(html`
      <dk-accordion multiple>
        <dk-accordion-item label="Section 1">Content 1</dk-accordion-item>
        <dk-accordion-item label="Section 2">Content 2</dk-accordion-item>
      </dk-accordion>
    `);
    await el.updateComplete;
    const items = el.querySelectorAll('dk-accordion-item');

    // Open first
    (items[0].shadowRoot!.querySelector('.trigger') as HTMLButtonElement).click();
    await items[0].updateComplete;

    // Open second
    (items[1].shadowRoot!.querySelector('.trigger') as HTMLButtonElement).click();
    await items[1].updateComplete;

    expect(items[0].open).to.be.true;
    expect(items[1].open).to.be.true;
  });

  it('fires dk-accordion-toggle event', async () => {
    const el = await fixture<DkAccordion>(html`
      <dk-accordion>
        <dk-accordion-item label="Section 1">Content 1</dk-accordion-item>
      </dk-accordion>
    `);
    await el.updateComplete;
    let detail: any;
    el.addEventListener('dk-accordion-toggle', (e: Event) => {
      detail = (e as CustomEvent).detail;
    });
    const item = el.querySelector('dk-accordion-item')!;
    (item.shadowRoot!.querySelector('.trigger') as HTMLButtonElement).click();
    await item.updateComplete;
    expect(detail).to.deep.equal({ open: true, label: 'Section 1' });
  });

  it('is accessible', async () => {
    const el = await fixture<DkAccordion>(html`
      <dk-accordion>
        <dk-accordion-item label="Section 1">Content 1</dk-accordion-item>
        <dk-accordion-item label="Section 2">Content 2</dk-accordion-item>
      </dk-accordion>
    `);
    await expect(el).to.be.accessible();
  });
});
