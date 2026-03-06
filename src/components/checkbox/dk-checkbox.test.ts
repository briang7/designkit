import { html, fixture, expect } from '@open-wc/testing';
import './dk-checkbox.js';
import type { DkCheckbox } from './dk-checkbox.js';

describe('dk-checkbox', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkCheckbox>(html`<dk-checkbox>Accept terms</dk-checkbox>`);
    expect(el.checked).to.be.false;
    expect(el.indeterminate).to.be.false;
    expect(el.disabled).to.be.false;
  });

  it('toggles on click', async () => {
    const el = await fixture<DkCheckbox>(html`<dk-checkbox>Check</dk-checkbox>`);
    el.shadowRoot!.querySelector<HTMLElement>('.control')!.click();
    expect(el.checked).to.be.true;
  });

  it('toggles on Space key', async () => {
    const el = await fixture<DkCheckbox>(html`<dk-checkbox>Check</dk-checkbox>`);
    const control = el.shadowRoot!.querySelector<HTMLElement>('.control')!;
    control.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(el.checked).to.be.true;
  });

  it('shows indeterminate state', async () => {
    const el = await fixture<DkCheckbox>(html`<dk-checkbox indeterminate>Select all</dk-checkbox>`);
    const control = el.shadowRoot!.querySelector('.control')!;
    expect(control.getAttribute('aria-checked')).to.equal('mixed');
  });

  it('clears indeterminate on click', async () => {
    const el = await fixture<DkCheckbox>(html`<dk-checkbox indeterminate>Select all</dk-checkbox>`);
    el.shadowRoot!.querySelector<HTMLElement>('.control')!.click();
    expect(el.indeterminate).to.be.false;
    expect(el.checked).to.be.true;
  });

  it('does not toggle when disabled', async () => {
    const el = await fixture<DkCheckbox>(html`<dk-checkbox disabled>Disabled</dk-checkbox>`);
    el.shadowRoot!.querySelector<HTMLElement>('.control')!.click();
    expect(el.checked).to.be.false;
  });

  it('emits dk-change event', async () => {
    const el = await fixture<DkCheckbox>(html`<dk-checkbox>Check</dk-checkbox>`);
    let detail: any;
    el.addEventListener('dk-change', (e: Event) => { detail = (e as CustomEvent).detail; });
    el.shadowRoot!.querySelector<HTMLElement>('.control')!.click();
    expect(detail).to.deep.equal({ checked: true });
  });

  it('is accessible', async () => {
    const el = await fixture<DkCheckbox>(html`<dk-checkbox>Accept terms</dk-checkbox>`);
    await expect(el).to.be.accessible();
  });
});
