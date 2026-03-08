import { html, fixture, expect } from '@open-wc/testing';
import './dk-section-banner-bar.js';
import './dk-section-banner-floating.js';
import './dk-section-banner-cookie.js';
import type { DkSectionBannerBar } from './dk-section-banner-bar.js';
import type { DkSectionBannerFloating } from './dk-section-banner-floating.js';
import type { DkSectionBannerCookie } from './dk-section-banner-cookie.js';

describe('dk-section-banner-bar', () => {
  it('renders message text', async () => {
    const el = await fixture<DkSectionBannerBar>(html`
      <dk-section-banner-bar message="Free shipping on orders over $50" no-animate></dk-section-banner-bar>
    `);
    const message = el.shadowRoot!.querySelector('.message')!;
    expect(message.textContent).to.equal('Free shipping on orders over $50');
  });

  it('renders dismiss button when dismissable', async () => {
    const el = await fixture<DkSectionBannerBar>(html`
      <dk-section-banner-bar message="Hello" no-animate></dk-section-banner-bar>
    `);
    const dismissBtn = el.shadowRoot!.querySelector('.dismiss-btn')!;
    expect(dismissBtn).to.exist;
  });

  it('fires dk-banner-dismiss event on dismiss', async () => {
    const el = await fixture<DkSectionBannerBar>(html`
      <dk-section-banner-bar message="Dismissable" no-animate></dk-section-banner-bar>
    `);
    let fired = false;
    el.addEventListener('dk-banner-dismiss', () => { fired = true; });
    const dismissBtn = el.shadowRoot!.querySelector('.dismiss-btn') as HTMLButtonElement;
    dismissBtn.click();
    expect(fired).to.be.true;
  });

  it('renders link when href and link-text are set', async () => {
    const el = await fixture<DkSectionBannerBar>(html`
      <dk-section-banner-bar
        message="Sale now on"
        href="/sale"
        link-text="Shop now"
        no-animate
      ></dk-section-banner-bar>
    `);
    const link = el.shadowRoot!.querySelector('.link')!;
    expect(link.textContent).to.equal('Shop now');
    expect(link.getAttribute('href')).to.equal('/sale');
  });
});

describe('dk-section-banner-floating', () => {
  it('renders message text', async () => {
    const el = await fixture<DkSectionBannerFloating>(html`
      <dk-section-banner-floating message="New feature available!" no-animate></dk-section-banner-floating>
    `);
    const message = el.shadowRoot!.querySelector('.message')!;
    expect(message.textContent).to.equal('New feature available!');
  });

  it('renders dismiss button when dismissable', async () => {
    const el = await fixture<DkSectionBannerFloating>(html`
      <dk-section-banner-floating message="Notice" no-animate></dk-section-banner-floating>
    `);
    const dismissBtn = el.shadowRoot!.querySelector('.dismiss-btn')!;
    expect(dismissBtn).to.exist;
  });

  it('defaults to bottom-right position', async () => {
    const el = await fixture<DkSectionBannerFloating>(html`
      <dk-section-banner-floating message="Positioned" no-animate></dk-section-banner-floating>
    `);
    expect(el.getAttribute('position')).to.equal('bottom-right');
  });
});

describe('dk-section-banner-cookie', () => {
  it('renders default cookie message with accept and decline buttons', async () => {
    const el = await fixture<DkSectionBannerCookie>(html`
      <dk-section-banner-cookie no-animate></dk-section-banner-cookie>
    `);
    const message = el.shadowRoot!.querySelector('.message')!;
    expect(message.textContent).to.contain('cookies');
    const acceptBtn = el.shadowRoot!.querySelector('.accept-btn')!;
    expect(acceptBtn.textContent).to.equal('Accept');
    const declineBtn = el.shadowRoot!.querySelector('.decline-btn')!;
    expect(declineBtn.textContent).to.equal('Decline');
  });

  it('renders custom button text', async () => {
    const el = await fixture<DkSectionBannerCookie>(html`
      <dk-section-banner-cookie
        accept-text="Allow All"
        decline-text="Reject All"
        no-animate
      ></dk-section-banner-cookie>
    `);
    const acceptBtn = el.shadowRoot!.querySelector('.accept-btn')!;
    expect(acceptBtn.textContent).to.equal('Allow All');
    const declineBtn = el.shadowRoot!.querySelector('.decline-btn')!;
    expect(declineBtn.textContent).to.equal('Reject All');
  });

  it('fires dk-cookie-accept event on accept click', async () => {
    const el = await fixture<DkSectionBannerCookie>(html`
      <dk-section-banner-cookie no-animate></dk-section-banner-cookie>
    `);
    let fired = false;
    el.addEventListener('dk-cookie-accept', () => { fired = true; });
    const acceptBtn = el.shadowRoot!.querySelector('.accept-btn') as HTMLButtonElement;
    acceptBtn.click();
    // Event fires after 300ms animation timeout
    await new Promise(resolve => setTimeout(resolve, 350));
    expect(fired).to.be.true;
  });

  it('fires dk-cookie-decline event on decline click', async () => {
    const el = await fixture<DkSectionBannerCookie>(html`
      <dk-section-banner-cookie no-animate></dk-section-banner-cookie>
    `);
    let fired = false;
    el.addEventListener('dk-cookie-decline', () => { fired = true; });
    const declineBtn = el.shadowRoot!.querySelector('.decline-btn') as HTMLButtonElement;
    declineBtn.click();
    await new Promise(resolve => setTimeout(resolve, 350));
    expect(fired).to.be.true;
  });
});
