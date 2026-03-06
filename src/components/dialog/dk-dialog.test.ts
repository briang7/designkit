import { html, fixture, expect } from '@open-wc/testing';
import './dk-dialog.js';
import type { DkDialog } from './dk-dialog.js';

describe('dk-dialog', () => {
  it('is hidden by default', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test">Content</dk-dialog>`);
    const overlay = el.shadowRoot!.querySelector('.overlay');
    expect(overlay).to.not.exist;
  });

  it('shows when open is set', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test" open>Content</dk-dialog>`);
    const overlay = el.shadowRoot!.querySelector('.overlay');
    expect(overlay).to.exist;
  });

  it('shows via show() method', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test">Content</dk-dialog>`);
    el.show();
    await el.updateComplete;
    const overlay = el.shadowRoot!.querySelector('.overlay');
    expect(overlay).to.exist;
  });

  it('hides via hide() method', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test" open>Content</dk-dialog>`);
    el.hide();
    await el.updateComplete;
    const overlay = el.shadowRoot!.querySelector('.overlay');
    expect(overlay).to.not.exist;
  });

  it('closes on Escape', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test" open>Content</dk-dialog>`);
    const overlay = el.shadowRoot!.querySelector('.overlay')!;
    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('closes on backdrop click', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test" open>Content</dk-dialog>`);
    el.shadowRoot!.querySelector<HTMLElement>('.overlay')!.click();
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('does not close when panel is clicked', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test" open>Content</dk-dialog>`);
    el.shadowRoot!.querySelector<HTMLElement>('.panel')!.click();
    await el.updateComplete;
    expect(el.open).to.be.true;
  });

  it('has aria-modal and role=dialog', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test" open>Content</dk-dialog>`);
    const panel = el.shadowRoot!.querySelector('.panel')!;
    expect(panel.getAttribute('role')).to.equal('dialog');
    expect(panel.getAttribute('aria-modal')).to.equal('true');
  });

  it('renders close button by default', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test" open>Content</dk-dialog>`);
    const close = el.shadowRoot!.querySelector('.close');
    expect(close).to.exist;
  });

  it('hides close button with no-close-button', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test" open no-close-button>Content</dk-dialog>`);
    const close = el.shadowRoot!.querySelector('.close');
    expect(close).to.not.exist;
  });

  it('emits dk-close event', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test" open>Content</dk-dialog>`);
    let fired = false;
    el.addEventListener('dk-close', () => { fired = true; });
    el.hide();
    expect(fired).to.be.true;
  });

  it('is accessible when open', async () => {
    const el = await fixture<DkDialog>(html`<dk-dialog label="Test Dialog" open>Content</dk-dialog>`);
    await expect(el).to.be.accessible();
  });
});
