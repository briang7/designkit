import { html, fixture, expect } from '@open-wc/testing';
import './dk-dropdown.js';
import './dk-dropdown-item.js';
import type { DkDropdown } from './dk-dropdown.js';

describe('dk-dropdown', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkDropdown>(html`
      <dk-dropdown>
        <button slot="trigger">Menu</button>
        <dk-dropdown-item>Item 1</dk-dropdown-item>
      </dk-dropdown>
    `);
    expect(el).to.exist;
    expect(el.placement).to.equal('bottom-start');
    expect(el.open).to.be.false;
  });

  it('renders closed by default (no menu in DOM)', async () => {
    const el = await fixture<DkDropdown>(html`
      <dk-dropdown>
        <button slot="trigger">Menu</button>
        <dk-dropdown-item>Item 1</dk-dropdown-item>
      </dk-dropdown>
    `);
    const menu = el.shadowRoot!.querySelector('.menu');
    expect(menu).to.not.exist;
  });

  it('opens when trigger is clicked', async () => {
    const el = await fixture<DkDropdown>(html`
      <dk-dropdown>
        <button slot="trigger">Menu</button>
        <dk-dropdown-item>Item 1</dk-dropdown-item>
      </dk-dropdown>
    `);
    const trigger = el.shadowRoot!.querySelector<HTMLElement>('.trigger')!;
    trigger.click();
    await el.updateComplete;
    expect(el.open).to.be.true;
    const menu = el.shadowRoot!.querySelector('.menu');
    expect(menu).to.exist;
  });

  it('closes on item select event', async () => {
    const el = await fixture<DkDropdown>(html`
      <dk-dropdown>
        <button slot="trigger">Menu</button>
        <dk-dropdown-item>Item 1</dk-dropdown-item>
      </dk-dropdown>
    `);
    // Open the dropdown
    const trigger = el.shadowRoot!.querySelector<HTMLElement>('.trigger')!;
    trigger.click();
    await el.updateComplete;
    expect(el.open).to.be.true;

    // Simulate item selection
    el.dispatchEvent(new CustomEvent('dk-dropdown-select', { bubbles: true }));
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('reflects placement attribute', async () => {
    const el = await fixture<DkDropdown>(html`
      <dk-dropdown placement="top-end">
        <button slot="trigger">Menu</button>
        <dk-dropdown-item>Item 1</dk-dropdown-item>
      </dk-dropdown>
    `);
    expect(el.placement).to.equal('top-end');
    // Open to see placement class on menu
    el.shadowRoot!.querySelector<HTMLElement>('.trigger')!.click();
    await el.updateComplete;
    const menu = el.shadowRoot!.querySelector('.menu')!;
    expect(menu.classList.contains('top-end')).to.be.true;
  });

  it('sets aria-expanded on trigger', async () => {
    const el = await fixture<DkDropdown>(html`
      <dk-dropdown>
        <button slot="trigger">Menu</button>
        <dk-dropdown-item>Item 1</dk-dropdown-item>
      </dk-dropdown>
    `);
    const trigger = el.shadowRoot!.querySelector<HTMLElement>('.trigger')!;
    expect(trigger.getAttribute('aria-expanded')).to.equal('false');
    trigger.click();
    await el.updateComplete;
    expect(trigger.getAttribute('aria-expanded')).to.equal('true');
  });
});
