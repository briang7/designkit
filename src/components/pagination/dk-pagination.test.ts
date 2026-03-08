import { html, fixture, expect } from '@open-wc/testing';
import './dk-pagination.js';
import type { DkPagination } from './dk-pagination.js';

describe('dk-pagination', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkPagination>(html`<dk-pagination total="50"></dk-pagination>`);
    expect(el).to.exist;
    expect(el.total).to.equal(50);
    expect(el.page).to.equal(1);
    expect(el.pageSize).to.equal(10);
    const nav = el.shadowRoot!.querySelector('nav');
    expect(nav).to.exist;
    expect(nav!.getAttribute('aria-label')).to.equal('Pagination');
  });

  it('renders correct number of page buttons', async () => {
    const el = await fixture<DkPagination>(html`<dk-pagination total="30" page-size="10"></dk-pagination>`);
    await el.updateComplete;
    // 3 pages + prev + next = 5 buttons
    const buttons = el.shadowRoot!.querySelectorAll('button');
    expect(buttons.length).to.equal(5);
  });

  it('highlights current page', async () => {
    const el = await fixture<DkPagination>(html`<dk-pagination total="50" page="3"></dk-pagination>`);
    await el.updateComplete;
    const activeBtn = el.shadowRoot!.querySelector('button.active');
    expect(activeBtn).to.exist;
    expect(activeBtn!.textContent!.trim()).to.equal('3');
    expect(activeBtn!.getAttribute('aria-current')).to.equal('page');
  });

  it('disables prev button on first page', async () => {
    const el = await fixture<DkPagination>(html`<dk-pagination total="50" page="1"></dk-pagination>`);
    await el.updateComplete;
    const prevBtn = el.shadowRoot!.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
    expect(prevBtn.disabled).to.be.true;
    const nextBtn = el.shadowRoot!.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
    expect(nextBtn.disabled).to.be.false;
  });

  it('disables next button on last page', async () => {
    const el = await fixture<DkPagination>(html`<dk-pagination total="50" page="5" page-size="10"></dk-pagination>`);
    await el.updateComplete;
    const nextBtn = el.shadowRoot!.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
    expect(nextBtn.disabled).to.be.true;
    const prevBtn = el.shadowRoot!.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
    expect(prevBtn.disabled).to.be.false;
  });

  it('fires dk-page-change event on page click', async () => {
    const el = await fixture<DkPagination>(html`<dk-pagination total="50" page="1"></dk-pagination>`);
    await el.updateComplete;
    let detail: any;
    el.addEventListener('dk-page-change', (e: Event) => {
      detail = (e as CustomEvent).detail;
    });
    // Click page 3 button
    const buttons = el.shadowRoot!.querySelectorAll('button:not(.nav-btn)');
    const page3Btn = Array.from(buttons).find(b => b.textContent!.trim() === '3') as HTMLButtonElement;
    expect(page3Btn).to.exist;
    page3Btn.click();
    expect(detail).to.deep.equal({ page: 3 });
    expect(el.page).to.equal(3);
  });

  it('renders nothing when total pages is 1 or less', async () => {
    const el = await fixture<DkPagination>(html`<dk-pagination total="5" page-size="10"></dk-pagination>`);
    await el.updateComplete;
    const nav = el.shadowRoot!.querySelector('nav');
    expect(nav).to.not.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<DkPagination>(html`<dk-pagination total="50" page="1"></dk-pagination>`);
    await expect(el).to.be.accessible();
  });
});
