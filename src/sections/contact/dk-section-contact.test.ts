import { html, fixture, expect } from '@open-wc/testing';
import './dk-section-contact-split.js';
import './dk-section-contact-centered.js';
import type { DkSectionContactSplit } from './dk-section-contact-split.js';
import type { DkSectionContactCentered } from './dk-section-contact-centered.js';

describe('dk-section-contact-split', () => {
  it('renders form and contact info', async () => {
    const el = await fixture<DkSectionContactSplit>(html`
      <dk-section-contact-split
        headline="Contact Us"
        email="hello@example.com"
        phone="555-0123"
        address="123 Main St"
        no-animate
      ></dk-section-contact-split>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Contact Us');
    const form = el.shadowRoot!.querySelector('form')!;
    expect(form).to.exist;
    const inputs = form.querySelectorAll('input');
    expect(inputs.length).to.be.greaterThan(0);
    const emailInfo = el.shadowRoot!.querySelector('.info-value')!;
    expect(emailInfo.textContent).to.equal('hello@example.com');
  });

  it('emits dk-contact-submit on form submit', async () => {
    const el = await fixture<DkSectionContactSplit>(html`
      <dk-section-contact-split no-animate></dk-section-contact-split>
    `);
    const form = el.shadowRoot!.querySelector('form')!;
    const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
    const messageTA = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    nameInput.value = 'John';
    emailInput.value = 'john@test.com';
    messageTA.value = 'Hello';
    let detail: any;
    el.addEventListener('dk-contact-submit', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    expect(detail).to.have.property('name', 'John');
    expect(detail).to.have.property('email', 'john@test.com');
  });
});

describe('dk-section-contact-centered', () => {
  it('renders centered card with form', async () => {
    const el = await fixture<DkSectionContactCentered>(html`
      <dk-section-contact-centered
        headline="Get in Touch"
        no-animate
      ></dk-section-contact-centered>
    `);
    const card = el.shadowRoot!.querySelector('.card')!;
    expect(card).to.exist;
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Get in Touch');
  });
});
