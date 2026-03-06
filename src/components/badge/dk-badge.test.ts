import { html, fixture, expect } from '@open-wc/testing';
import './dk-badge.js';
import type { DkBadge } from './dk-badge.js';

describe('dk-badge', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkBadge>(html`<dk-badge>New</dk-badge>`);
    expect(el.variant).to.equal('default');
    expect(el.size).to.equal('md');
  });

  it('renders different variants', async () => {
    const el = await fixture<DkBadge>(html`<dk-badge variant="success">Active</dk-badge>`);
    const badge = el.shadowRoot!.querySelector('span')!;
    expect(badge.classList.contains('success')).to.be.true;
  });

  it('renders dot indicator', async () => {
    const el = await fixture<DkBadge>(html`<dk-badge dot>Status</dk-badge>`);
    const dot = el.shadowRoot!.querySelector('.dot');
    expect(dot).to.exist;
  });

  it('renders removable badge', async () => {
    const el = await fixture<DkBadge>(html`<dk-badge removable>Tag</dk-badge>`);
    const removeBtn = el.shadowRoot!.querySelector('.remove');
    expect(removeBtn).to.exist;
  });

  it('fires dk-remove event when remove clicked', async () => {
    const el = await fixture<DkBadge>(html`<dk-badge removable>Tag</dk-badge>`);
    let removed = false;
    el.addEventListener('dk-remove', () => { removed = true; });
    el.shadowRoot!.querySelector<HTMLButtonElement>('.remove')!.click();
    expect(removed).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<DkBadge>(html`<dk-badge>Badge</dk-badge>`);
    await expect(el).to.be.accessible();
  });
});
