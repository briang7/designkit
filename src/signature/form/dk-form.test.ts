import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import './dk-form.js';
import '../../components/input/dk-input.js';
import type { DkForm } from './dk-form.js';

describe('dk-form', () => {
  it('renders a form with slot', async () => {
    const el = await fixture<DkForm>(html`<dk-form></dk-form>`);
    const form = el.shadowRoot!.querySelector('form');
    expect(form).to.exist;
  });

  it('collects values from dk-input changes', async () => {
    const el = await fixture<DkForm>(html`
      <dk-form>
        <dk-input name="email" type="email"></dk-input>
      </dk-form>
    `);

    const input = el.querySelector('dk-input')!;
    input.value = 'test@example.com';
    input.dispatchEvent(new CustomEvent('dk-change', {
      detail: { value: 'test@example.com' },
      bubbles: true, composed: true
    }));
    await el.updateComplete;

    expect(el.getValues()).to.deep.include({ email: 'test@example.com' });
  });

  it('validates required fields', async () => {
    const el = await fixture<DkForm>(html`
      <dk-form>
        <dk-input name="name" required></dk-input>
      </dk-form>
    `);

    const valid = el.validate();
    expect(valid).to.be.false;
    expect(el.getErrors()).to.have.property('name');
  });

  it('validates email type', async () => {
    const el = await fixture<DkForm>(html`
      <dk-form>
        <dk-input name="email" type="email"></dk-input>
      </dk-form>
    `);

    // Set an invalid email
    const input = el.querySelector('dk-input')!;
    input.value = 'not-an-email';
    input.dispatchEvent(new CustomEvent('dk-change', {
      detail: { value: 'not-an-email' },
      bubbles: true, composed: true
    }));

    el.submitted = true;
    const valid = el.validate();
    expect(valid).to.be.false;
  });

  it('emits dk-submit with values and valid flag', async () => {
    const el = await fixture<DkForm>(html`
      <dk-form>
        <dk-input name="name" value="John"></dk-input>
      </dk-form>
    `);

    // Trigger dk-change to register the value
    const input = el.querySelector('dk-input')!;
    input.dispatchEvent(new CustomEvent('dk-change', {
      detail: { value: 'John' },
      bubbles: true, composed: true
    }));

    const form = el.shadowRoot!.querySelector('form')!;
    setTimeout(() => form.dispatchEvent(new Event('submit', { cancelable: true })));
    const { detail } = await oneEvent(el, 'dk-submit');
    expect(detail.valid).to.be.true;
    expect(detail.values).to.deep.include({ name: 'John' });
  });

  it('resets values and errors', async () => {
    const el = await fixture<DkForm>(html`
      <dk-form>
        <dk-input name="name" required></dk-input>
      </dk-form>
    `);

    el.validate(); // creates errors
    el.reset();
    expect(el.getErrors()).to.deep.equal({});
    expect(el.getValues()).to.deep.equal({});
  });
});
