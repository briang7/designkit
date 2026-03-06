import { html, fixture, expect } from '@open-wc/testing';
import './dk-input.js';
import type { DkInput } from './dk-input.js';

describe('dk-input', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkInput>(html`<dk-input></dk-input>`);
    expect(el.type).to.equal('text');
    expect(el.value).to.equal('');
    expect(el.size).to.equal('md');
  });

  it('renders label', async () => {
    const el = await fixture<DkInput>(html`<dk-input label="Email"></dk-input>`);
    const label = el.shadowRoot!.querySelector('.label');
    expect(label).to.exist;
    expect(label!.textContent!.trim()).to.equal('Email');
  });

  it('shows required indicator', async () => {
    const el = await fixture<DkInput>(html`<dk-input label="Name" required></dk-input>`);
    const required = el.shadowRoot!.querySelector('.required');
    expect(required).to.exist;
  });

  it('shows error text', async () => {
    const el = await fixture<DkInput>(html`<dk-input error-text="Invalid email"></dk-input>`);
    const help = el.shadowRoot!.querySelector('.help-text.error');
    expect(help).to.exist;
    expect(help!.textContent).to.equal('Invalid email');
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-invalid')).to.equal('true');
  });

  it('shows help text', async () => {
    const el = await fixture<DkInput>(html`<dk-input help-text="Enter your name"></dk-input>`);
    const help = el.shadowRoot!.querySelector('.help-text');
    expect(help).to.exist;
    expect(help!.textContent).to.equal('Enter your name');
  });

  it('handles clearable', async () => {
    const el = await fixture<DkInput>(html`<dk-input clearable value="hello"></dk-input>`);
    const clearBtn = el.shadowRoot!.querySelector('.clear');
    expect(clearBtn).to.exist;
  });

  it('disables the input', async () => {
    const el = await fixture<DkInput>(html`<dk-input disabled></dk-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).to.be.true;
  });

  it('renders prefix and suffix slots', async () => {
    const el = await fixture<DkInput>(html`
      <dk-input>
        <span slot="prefix">$</span>
        <span slot="suffix">.00</span>
      </dk-input>
    `);
    const prefixSlot = el.shadowRoot!.querySelector('slot[name="prefix"]');
    const suffixSlot = el.shadowRoot!.querySelector('slot[name="suffix"]');
    expect(prefixSlot).to.exist;
    expect(suffixSlot).to.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<DkInput>(html`<dk-input label="Username"></dk-input>`);
    await expect(el).to.be.accessible();
  });
});
