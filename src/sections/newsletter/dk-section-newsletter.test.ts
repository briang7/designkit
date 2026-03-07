import { html, fixture, expect } from '@open-wc/testing';
import './dk-section-newsletter-inline.js';
import './dk-section-newsletter-card.js';
import type { DkSectionNewsletterInline } from './dk-section-newsletter-inline.js';
import type { DkSectionNewsletterCard } from './dk-section-newsletter-card.js';

describe('dk-section-newsletter-inline', () => {
  it('renders headline, input, and button', async () => {
    const el = await fixture<DkSectionNewsletterInline>(html`
      <dk-section-newsletter-inline
        headline="Stay Updated"
        description="Get the latest news"
        button-text="Sign Up"
        no-animate
      ></dk-section-newsletter-inline>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Stay Updated');
    const input = el.shadowRoot!.querySelector('input[type="email"]')!;
    expect(input).to.exist;
    const btn = el.shadowRoot!.querySelector('.submit-btn')!;
    expect(btn.textContent).to.equal('Sign Up');
  });

  it('emits dk-subscribe event on submit', async () => {
    const el = await fixture<DkSectionNewsletterInline>(html`
      <dk-section-newsletter-inline no-animate></dk-section-newsletter-inline>
    `);
    const input = el.shadowRoot!.querySelector('input[type="email"]') as HTMLInputElement;
    input.value = 'test@example.com';
    let detail: any;
    el.addEventListener('dk-subscribe', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const form = el.shadowRoot!.querySelector('form')!;
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    expect(detail).to.deep.equal({ email: 'test@example.com' });
  });
});

describe('dk-section-newsletter-card', () => {
  it('renders card with form', async () => {
    const el = await fixture<DkSectionNewsletterCard>(html`
      <dk-section-newsletter-card
        headline="Subscribe"
        description="Join our newsletter"
        no-animate
      ></dk-section-newsletter-card>
    `);
    const card = el.shadowRoot!.querySelector('.card')!;
    expect(card).to.exist;
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Subscribe');
  });
});
