import { html, fixture, expect } from '@open-wc/testing';
import './dk-drawer.js';
import type { DkDrawer } from './dk-drawer.js';

describe('dk-drawer', () => {
  it('is hidden by default', async () => {
    const el = await fixture<DkDrawer>(html`<dk-drawer label="Menu">Content</dk-drawer>`);
    const overlay = el.shadowRoot!.querySelector('.overlay');
    expect(overlay).to.not.exist;
  });

  it('shows when open is set', async () => {
    const el = await fixture<DkDrawer>(html`<dk-drawer label="Menu" open>Content</dk-drawer>`);
    const overlay = el.shadowRoot!.querySelector('.overlay');
    expect(overlay).to.exist;
  });

  it('shows via show() method', async () => {
    const el = await fixture<DkDrawer>(html`<dk-drawer label="Menu">Content</dk-drawer>`);
    el.show();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.overlay')).to.exist;
  });

  it('hides via hide() method', async () => {
    const el = await fixture<DkDrawer>(html`<dk-drawer label="Menu" open>Content</dk-drawer>`);
    el.hide();
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('closes on Escape', async () => {
    const el = await fixture<DkDrawer>(html`<dk-drawer label="Menu" open>Content</dk-drawer>`);
    el.shadowRoot!.querySelector('.overlay')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('closes on backdrop click', async () => {
    const el = await fixture<DkDrawer>(html`<dk-drawer label="Menu" open>Content</dk-drawer>`);
    el.shadowRoot!.querySelector<HTMLElement>('.overlay')!.click();
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('renders correct placement class', async () => {
    const el = await fixture<DkDrawer>(html`<dk-drawer label="Menu" open placement="start">Content</dk-drawer>`);
    const panel = el.shadowRoot!.querySelector('.panel')!;
    expect(panel.classList.contains('start')).to.be.true;
  });

  it('has aria-modal and role=dialog', async () => {
    const el = await fixture<DkDrawer>(html`<dk-drawer label="Menu" open>Content</dk-drawer>`);
    const panel = el.shadowRoot!.querySelector('.panel')!;
    expect(panel.getAttribute('role')).to.equal('dialog');
    expect(panel.getAttribute('aria-modal')).to.equal('true');
  });

  it('emits dk-close event', async () => {
    const el = await fixture<DkDrawer>(html`<dk-drawer label="Menu" open>Content</dk-drawer>`);
    let fired = false;
    el.addEventListener('dk-close', () => { fired = true; });
    el.hide();
    expect(fired).to.be.true;
  });

  it('is accessible when open', async () => {
    const el = await fixture<DkDrawer>(html`<dk-drawer label="Navigation Menu" open>Content</dk-drawer>`);
    await expect(el).to.be.accessible();
  });
});
