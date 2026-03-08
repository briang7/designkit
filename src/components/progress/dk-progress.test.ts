import { html, fixture, expect } from '@open-wc/testing';
import './dk-progress.js';
import type { DkProgress } from './dk-progress.js';

describe('dk-progress', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkProgress>(html`<dk-progress></dk-progress>`);
    expect(el).to.exist;
    expect(el.value).to.equal(0);
    expect(el.max).to.equal(100);
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.striped).to.be.false;
  });

  it('sets bar width based on value', async () => {
    const el = await fixture<DkProgress>(html`<dk-progress value="60"></dk-progress>`);
    const bar = el.shadowRoot!.querySelector<HTMLElement>('.bar')!;
    expect(bar.style.width).to.equal('60%');
  });

  it('displays the label', async () => {
    const el = await fixture<DkProgress>(html`<dk-progress label="Uploading..."></dk-progress>`);
    const label = el.shadowRoot!.querySelector('.label')!;
    expect(label).to.exist;
    expect(label.textContent).to.equal('Uploading...');
  });

  it('applies striped class', async () => {
    const el = await fixture<DkProgress>(html`<dk-progress value="50" striped></dk-progress>`);
    const bar = el.shadowRoot!.querySelector('.bar')!;
    expect(bar.classList.contains('striped')).to.be.true;
  });

  it('applies animated class', async () => {
    const el = await fixture<DkProgress>(html`<dk-progress value="50" animated></dk-progress>`);
    const bar = el.shadowRoot!.querySelector('.bar')!;
    expect(bar.classList.contains('animated')).to.be.true;
    expect(bar.classList.contains('striped')).to.be.true;
  });

  it('has progressbar role and is accessible', async () => {
    const el = await fixture<DkProgress>(html`<dk-progress value="40" label="Loading"></dk-progress>`);
    const base = el.shadowRoot!.querySelector('.base')!;
    expect(base.getAttribute('role')).to.equal('progressbar');
    expect(base.getAttribute('aria-valuenow')).to.equal('40');
    expect(base.getAttribute('aria-valuemax')).to.equal('100');
    await expect(el).to.be.accessible();
  });
});
