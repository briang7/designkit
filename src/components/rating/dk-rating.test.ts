import { html, fixture, expect } from '@open-wc/testing';
import './dk-rating.js';
import type { DkRating } from './dk-rating.js';

describe('dk-rating', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkRating>(html`<dk-rating></dk-rating>`);
    expect(el).to.exist;
    expect(el.value).to.equal(0);
    expect(el.max).to.equal(5);
    expect(el.readonly).to.be.false;
  });

  it('renders correct number of stars', async () => {
    const el = await fixture<DkRating>(html`<dk-rating></dk-rating>`);
    const stars = el.shadowRoot!.querySelectorAll('.star');
    expect(stars.length).to.equal(5);
  });

  it('highlights filled stars based on value', async () => {
    const el = await fixture<DkRating>(html`<dk-rating value="3"></dk-rating>`);
    const filled = el.shadowRoot!.querySelectorAll('.star-filled');
    expect(filled.length).to.equal(3);
  });

  it('respects custom max', async () => {
    const el = await fixture<DkRating>(html`<dk-rating max="10"></dk-rating>`);
    const stars = el.shadowRoot!.querySelectorAll('.star');
    expect(stars.length).to.equal(10);
  });

  it('fires dk-rating-change on star click', async () => {
    const el = await fixture<DkRating>(html`<dk-rating></dk-rating>`);
    let detail: any;
    el.addEventListener('dk-rating-change', (e: Event) => { detail = (e as CustomEvent).detail; });
    const stars = el.shadowRoot!.querySelectorAll<HTMLElement>('.star');
    stars[3].click();
    expect(detail).to.deep.equal({ value: 4 });
    expect(el.value).to.equal(4);
  });

  it('does not change value when readonly', async () => {
    const el = await fixture<DkRating>(html`<dk-rating value="2" readonly></dk-rating>`);
    let fired = false;
    el.addEventListener('dk-rating-change', () => { fired = true; });
    const stars = el.shadowRoot!.querySelectorAll<HTMLElement>('.star');
    stars[4].click();
    expect(el.value).to.equal(2);
    expect(fired).to.be.false;
  });
});
