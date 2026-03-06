import { html, fixture, expect } from '@open-wc/testing';
import './dk-select.js';
import type { DkSelect } from './dk-select.js';

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('dk-select', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkSelect>(html`<dk-select .options=${sampleOptions}></dk-select>`);
    expect(el.value).to.equal('');
    expect(el.size).to.equal('md');
  });

  it('shows placeholder when no value selected', async () => {
    const el = await fixture<DkSelect>(html`<dk-select .options=${sampleOptions} placeholder="Pick fruit"></dk-select>`);
    const trigger = el.shadowRoot!.querySelector('.trigger-text')!;
    expect(trigger.textContent).to.equal('Pick fruit');
  });

  it('shows selected value label', async () => {
    const el = await fixture<DkSelect>(html`<dk-select .options=${sampleOptions} value="banana"></dk-select>`);
    const trigger = el.shadowRoot!.querySelector('.trigger-text')!;
    expect(trigger.textContent).to.equal('Banana');
  });

  it('opens dropdown on click', async () => {
    const el = await fixture<DkSelect>(html`<dk-select .options=${sampleOptions}></dk-select>`);
    el.shadowRoot!.querySelector<HTMLElement>('.trigger')!.click();
    await el.updateComplete;
    const dropdown = el.shadowRoot!.querySelector('.dropdown');
    expect(dropdown).to.exist;
  });

  it('selects option on click', async () => {
    const el = await fixture<DkSelect>(html`<dk-select .options=${sampleOptions}></dk-select>`);
    let detail: any;
    el.addEventListener('dk-change', (e: Event) => { detail = (e as CustomEvent).detail; });
    el.shadowRoot!.querySelector<HTMLElement>('.trigger')!.click();
    await el.updateComplete;
    const options = el.shadowRoot!.querySelectorAll('.option');
    (options[1] as HTMLElement).click();
    expect(detail).to.deep.equal({ value: 'banana', label: 'Banana' });
  });

  it('closes on Escape', async () => {
    const el = await fixture<DkSelect>(html`<dk-select .options=${sampleOptions}></dk-select>`);
    el.shadowRoot!.querySelector<HTMLElement>('.trigger')!.click();
    await el.updateComplete;
    const wrapper = el.shadowRoot!.querySelector<HTMLElement>('.select-wrapper')!;
    wrapper.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    const dropdown = el.shadowRoot!.querySelector('.dropdown');
    expect(dropdown).to.not.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<DkSelect>(html`<dk-select label="Fruit" .options=${sampleOptions}></dk-select>`);
    await expect(el).to.be.accessible();
  });
});
