import { html, fixture, expect } from '@open-wc/testing';
import './dk-skeleton.js';
import type { DkSkeleton } from './dk-skeleton.js';

describe('dk-skeleton', () => {
  it('renders text variant by default', async () => {
    const el = await fixture<DkSkeleton>(html`<dk-skeleton></dk-skeleton>`);
    const skeletons = el.shadowRoot!.querySelectorAll('.skeleton--text');
    expect(skeletons.length).to.equal(1);
  });

  it('renders multiple text lines', async () => {
    const el = await fixture<DkSkeleton>(html`<dk-skeleton lines="3"></dk-skeleton>`);
    const skeletons = el.shadowRoot!.querySelectorAll('.skeleton--text');
    expect(skeletons.length).to.equal(3);
  });

  it('renders circle variant', async () => {
    const el = await fixture<DkSkeleton>(html`<dk-skeleton variant="circle"></dk-skeleton>`);
    const skeleton = el.shadowRoot!.querySelector('.skeleton--circle');
    expect(skeleton).to.exist;
  });

  it('renders rect variant', async () => {
    const el = await fixture<DkSkeleton>(html`<dk-skeleton variant="rect"></dk-skeleton>`);
    const skeleton = el.shadowRoot!.querySelector('.skeleton--rect');
    expect(skeleton).to.exist;
  });

  it('respects width property', async () => {
    const el = await fixture<DkSkeleton>(html`<dk-skeleton width="50%"></dk-skeleton>`);
    const skeleton = el.shadowRoot!.querySelector('.skeleton') as HTMLElement;
    expect(skeleton.style.width).to.equal('50%');
  });

  it('respects height for circle', async () => {
    const el = await fixture<DkSkeleton>(html`<dk-skeleton variant="circle" height="64px"></dk-skeleton>`);
    const skeleton = el.shadowRoot!.querySelector('.skeleton--circle') as HTMLElement;
    expect(skeleton.style.height).to.equal('64px');
  });
});
