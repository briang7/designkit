import { html, fixture, expect } from '@open-wc/testing';
import './dk-breadcrumbs.js';
import type { DkBreadcrumbs, DkBreadcrumb } from './dk-breadcrumbs.js';

describe('dk-breadcrumbs', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkBreadcrumbs>(html`
      <dk-breadcrumbs>
        <dk-breadcrumb href="/">Home</dk-breadcrumb>
        <dk-breadcrumb>Current</dk-breadcrumb>
      </dk-breadcrumbs>
    `);
    expect(el).to.exist;
    expect(el.separator).to.equal('chevron');
    const nav = el.shadowRoot!.querySelector('nav');
    expect(nav).to.exist;
    expect(nav!.getAttribute('aria-label')).to.equal('Breadcrumb');
  });

  it('renders breadcrumb links and current page', async () => {
    const el = await fixture<DkBreadcrumbs>(html`
      <dk-breadcrumbs>
        <dk-breadcrumb href="/">Home</dk-breadcrumb>
        <dk-breadcrumb>Current Page</dk-breadcrumb>
      </dk-breadcrumbs>
    `);
    const items = el.querySelectorAll('dk-breadcrumb');
    expect(items.length).to.equal(2);

    const link = items[0].shadowRoot!.querySelector('a');
    expect(link).to.exist;
    expect(link!.getAttribute('href')).to.equal('/');

    const current = items[1].shadowRoot!.querySelector('.current');
    expect(current).to.exist;
    expect(current!.getAttribute('aria-current')).to.equal('page');
  });

  it('renders separators between items', async () => {
    const el = await fixture<DkBreadcrumbs>(html`
      <dk-breadcrumbs>
        <dk-breadcrumb href="/">Home</dk-breadcrumb>
        <dk-breadcrumb href="/about">About</dk-breadcrumb>
        <dk-breadcrumb>Contact</dk-breadcrumb>
      </dk-breadcrumbs>
    `);
    await el.updateComplete;
    const items = el.querySelectorAll('dk-breadcrumb') as NodeListOf<DkBreadcrumb>;
    // First item should not have separator
    expect(items[0].shadowRoot!.querySelector('.sep')).to.not.exist;
    // Second and third should have separator
    const sep = items[1].shadowRoot!.querySelector('.sep');
    expect(sep).to.exist;
    expect(sep!.textContent).to.equal('\u203A');
  });

  it('supports custom separator', async () => {
    const el = await fixture<DkBreadcrumbs>(html`
      <dk-breadcrumbs separator="slash">
        <dk-breadcrumb href="/">Home</dk-breadcrumb>
        <dk-breadcrumb>Page</dk-breadcrumb>
      </dk-breadcrumbs>
    `);
    await el.updateComplete;
    const items = el.querySelectorAll('dk-breadcrumb') as NodeListOf<DkBreadcrumb>;
    const sep = items[1].shadowRoot!.querySelector('.sep');
    expect(sep).to.exist;
    expect(sep!.textContent).to.equal('/');
  });
});
