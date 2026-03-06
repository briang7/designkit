import { html, fixture, expect } from '@open-wc/testing';
import './dk-button.js';
import type { DkButton } from './dk-button.js';

describe('dk-button', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkButton>(html`<dk-button>Click me</dk-button>`);
    expect(el).to.exist;
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.disabled).to.equal(false);
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<DkButton>(html`<dk-button variant="danger">Delete</dk-button>`);
    expect(el.variant).to.equal('danger');
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.classList.contains('danger')).to.be.true;
  });

  it('reflects size attribute', async () => {
    const el = await fixture<DkButton>(html`<dk-button size="lg">Large</dk-button>`);
    expect(el.size).to.equal('lg');
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.classList.contains('lg')).to.be.true;
  });

  it('disables the button', async () => {
    const el = await fixture<DkButton>(html`<dk-button disabled>Disabled</dk-button>`);
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.disabled).to.be.true;
  });

  it('shows loading state', async () => {
    const el = await fixture<DkButton>(html`<dk-button loading>Loading</dk-button>`);
    const spinner = el.shadowRoot!.querySelector('.spinner');
    expect(spinner).to.exist;
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.getAttribute('aria-busy')).to.equal('true');
  });

  it('fires click event when not disabled', async () => {
    const el = await fixture<DkButton>(html`<dk-button>Click</dk-button>`);
    let clicked = false;
    el.addEventListener('click', () => { clicked = true; });
    el.shadowRoot!.querySelector('button')!.click();
    expect(clicked).to.be.true;
  });

  it('does not fire click when disabled', async () => {
    const el = await fixture<DkButton>(html`<dk-button disabled>Click</dk-button>`);
    let clicked = false;
    el.addEventListener('click', () => { clicked = true; });
    el.shadowRoot!.querySelector('button')!.click();
    expect(clicked).to.be.false;
  });

  it('renders icon slots', async () => {
    const el = await fixture<DkButton>(html`
      <dk-button>
        <span slot="prefix">←</span>
        Label
        <span slot="suffix">→</span>
      </dk-button>
    `);
    const prefixSlot = el.shadowRoot!.querySelector('slot[name="prefix"]') as HTMLSlotElement;
    const suffixSlot = el.shadowRoot!.querySelector('slot[name="suffix"]') as HTMLSlotElement;
    expect(prefixSlot).to.exist;
    expect(suffixSlot).to.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<DkButton>(html`<dk-button>Accessible</dk-button>`);
    await expect(el).to.be.accessible();
  });
});
