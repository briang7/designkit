import { html, fixture, expect } from '@open-wc/testing';
import './dk-switch.js';
import type { DkSwitch } from './dk-switch.js';

describe('dk-switch', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkSwitch>(html`<dk-switch>Dark mode</dk-switch>`);
    expect(el.checked).to.be.false;
    expect(el.disabled).to.be.false;
    expect(el.size).to.equal('md');
  });

  it('toggles on click', async () => {
    const el = await fixture<DkSwitch>(html`<dk-switch>Toggle</dk-switch>`);
    el.shadowRoot!.querySelector<HTMLElement>('.track')!.click();
    expect(el.checked).to.be.true;
  });

  it('toggles on Space key', async () => {
    const el = await fixture<DkSwitch>(html`<dk-switch>Toggle</dk-switch>`);
    const track = el.shadowRoot!.querySelector<HTMLElement>('.track')!;
    track.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(el.checked).to.be.true;
  });

  it('does not toggle when disabled', async () => {
    const el = await fixture<DkSwitch>(html`<dk-switch disabled>Disabled</dk-switch>`);
    el.shadowRoot!.querySelector<HTMLElement>('.track')!.click();
    expect(el.checked).to.be.false;
  });

  it('has role=switch', async () => {
    const el = await fixture<DkSwitch>(html`<dk-switch>Toggle</dk-switch>`);
    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track.getAttribute('role')).to.equal('switch');
  });

  it('reflects aria-checked', async () => {
    const el = await fixture<DkSwitch>(html`<dk-switch checked>On</dk-switch>`);
    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track.getAttribute('aria-checked')).to.equal('true');
  });

  it('emits dk-change event', async () => {
    const el = await fixture<DkSwitch>(html`<dk-switch>Toggle</dk-switch>`);
    let detail: any;
    el.addEventListener('dk-change', (e: Event) => { detail = (e as CustomEvent).detail; });
    el.shadowRoot!.querySelector<HTMLElement>('.track')!.click();
    expect(detail).to.deep.equal({ checked: true });
  });

  it('is accessible', async () => {
    const el = await fixture<DkSwitch>(html`<dk-switch>Dark mode</dk-switch>`);
    await expect(el).to.be.accessible();
  });
});
