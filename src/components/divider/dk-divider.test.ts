import { html, fixture, expect } from '@open-wc/testing';
import './dk-divider.js';
import type { DkDivider } from './dk-divider.js';

describe('dk-divider', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkDivider>(html`<dk-divider></dk-divider>`);
    expect(el).to.exist;
    expect(el.vertical).to.be.false;
    expect(el.align).to.equal('center');
    expect(el.label).to.be.undefined;
  });

  it('renders horizontal by default with separator role', async () => {
    const el = await fixture<DkDivider>(html`<dk-divider></dk-divider>`);
    const base = el.shadowRoot!.querySelector('.divider')!;
    expect(base.getAttribute('role')).to.equal('separator');
    expect(base.getAttribute('aria-orientation')).to.equal('horizontal');
    expect(base.classList.contains('vertical')).to.be.false;
  });

  it('renders with a label', async () => {
    const el = await fixture<DkDivider>(html`<dk-divider label="OR"></dk-divider>`);
    const label = el.shadowRoot!.querySelector('.label')!;
    expect(label).to.exist;
    expect(label.textContent).to.contain('OR');
    const base = el.shadowRoot!.querySelector('.divider')!;
    expect(base.classList.contains('has-content')).to.be.true;
  });

  it('renders in vertical mode', async () => {
    const el = await fixture<DkDivider>(html`<dk-divider vertical></dk-divider>`);
    const base = el.shadowRoot!.querySelector('.divider')!;
    expect(base.classList.contains('vertical')).to.be.true;
    expect(base.getAttribute('aria-orientation')).to.equal('vertical');
  });

  it('applies alignment class', async () => {
    const el = await fixture<DkDivider>(html`<dk-divider label="Section" align="left"></dk-divider>`);
    const base = el.shadowRoot!.querySelector('.divider')!;
    expect(base.classList.contains('left')).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<DkDivider>(html`<dk-divider label="Divider"></dk-divider>`);
    await expect(el).to.be.accessible();
  });
});
