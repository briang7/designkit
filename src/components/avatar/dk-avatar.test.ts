import { html, fixture, expect } from '@open-wc/testing';
import './dk-avatar.js';
import type { DkAvatar } from './dk-avatar.js';

describe('dk-avatar', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkAvatar>(html`<dk-avatar></dk-avatar>`);
    expect(el.size).to.equal('md');
    expect(el.status).to.equal('');
  });

  it('renders initials when no src', async () => {
    const el = await fixture<DkAvatar>(html`<dk-avatar initials="BG"></dk-avatar>`);
    const initials = el.shadowRoot!.querySelector('.initials');
    expect(initials).to.exist;
    expect(initials!.textContent).to.equal('BG');
  });

  it('renders image when src provided', async () => {
    const el = await fixture<DkAvatar>(html`<dk-avatar src="https://example.com/photo.jpg" alt="User"></dk-avatar>`);
    const img = el.shadowRoot!.querySelector('img');
    expect(img).to.exist;
  });

  it('renders status dot', async () => {
    const el = await fixture<DkAvatar>(html`<dk-avatar initials="BG" status="online"></dk-avatar>`);
    const status = el.shadowRoot!.querySelector('.status.online');
    expect(status).to.exist;
  });

  it('renders different sizes', async () => {
    const el = await fixture<DkAvatar>(html`<dk-avatar initials="BG" size="lg"></dk-avatar>`);
    const avatar = el.shadowRoot!.querySelector('.avatar');
    expect(avatar!.classList.contains('lg')).to.be.true;
  });

  it('shows fallback when no src or initials', async () => {
    const el = await fixture<DkAvatar>(html`<dk-avatar></dk-avatar>`);
    const initials = el.shadowRoot!.querySelector('.initials');
    expect(initials!.textContent).to.equal('?');
  });

  it('is accessible', async () => {
    const el = await fixture<DkAvatar>(html`<dk-avatar initials="BG" alt="Brian G"></dk-avatar>`);
    await expect(el).to.be.accessible();
  });
});
