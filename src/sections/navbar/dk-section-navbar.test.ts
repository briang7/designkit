import { html, fixture, expect } from '@open-wc/testing';
import './dk-section-navbar-simple.js';
import './dk-section-navbar-with-search.js';
import './dk-section-navbar-mega.js';
import type { DkSectionNavbarSimple } from './dk-section-navbar-simple.js';
import type { DkSectionNavbarWithSearch } from './dk-section-navbar-with-search.js';
import type { DkSectionNavbarMega } from './dk-section-navbar-mega.js';

describe('dk-section-navbar-simple', () => {
  it('renders brand text', async () => {
    const el = await fixture<DkSectionNavbarSimple>(
      html`<dk-section-navbar-simple brand="TestBrand" no-animate></dk-section-navbar-simple>`
    );
    const brand = el.shadowRoot!.querySelector('.brand')!;
    expect(brand.textContent).to.contain('TestBrand');
  });

  it('projects link slots correctly', async () => {
    const el = await fixture<DkSectionNavbarSimple>(html`
      <dk-section-navbar-simple brand="Test" no-animate>
        <a slot="links" href="/">Home</a>
        <a slot="links" href="/about">About</a>
      </dk-section-navbar-simple>
    `);
    const linkSlot = el.shadowRoot!.querySelector('.links slot[name="links"]') as HTMLSlotElement;
    expect(linkSlot).to.exist;
    expect(linkSlot.assignedElements().length).to.equal(2);
  });

  it('toggles hamburger menu on click', async () => {
    const el = await fixture<DkSectionNavbarSimple>(
      html`<dk-section-navbar-simple brand="Test" no-animate></dk-section-navbar-simple>`
    );
    const hamburger = el.shadowRoot!.querySelector('.hamburger') as HTMLButtonElement;
    expect(hamburger.getAttribute('aria-expanded')).to.equal('false');
    hamburger.click();
    await el.updateComplete;
    expect(hamburger.getAttribute('aria-expanded')).to.equal('true');
    expect(hamburger.classList.contains('open')).to.be.true;
  });

  it('applies sticky positioning', async () => {
    const el = await fixture<DkSectionNavbarSimple>(
      html`<dk-section-navbar-simple brand="Test" sticky no-animate></dk-section-navbar-simple>`
    );
    expect(el.sticky).to.be.true;
    expect(el.hasAttribute('sticky')).to.be.true;
  });

  it('uses nav element for accessible landmark', async () => {
    const el = await fixture<DkSectionNavbarSimple>(
      html`<dk-section-navbar-simple brand="Test" no-animate></dk-section-navbar-simple>`
    );
    const nav = el.shadowRoot!.querySelector('nav');
    expect(nav).to.exist;
    expect(nav!.getAttribute('role')).to.equal('navigation');
    expect(nav!.getAttribute('aria-label')).to.equal('Main navigation');
  });
});

describe('dk-section-navbar-with-search', () => {
  it('renders search input', async () => {
    const el = await fixture<DkSectionNavbarWithSearch>(
      html`<dk-section-navbar-with-search brand="Test" no-animate></dk-section-navbar-with-search>`
    );
    const input = el.shadowRoot!.querySelector('input[type="search"]');
    expect(input).to.exist;
  });
});

describe('dk-section-navbar-mega', () => {
  it('renders mega menu triggers', async () => {
    const el = await fixture<DkSectionNavbarMega>(
      html`<dk-section-navbar-mega
        brand="Test"
        no-animate
        .menus=${[{ label: 'Products', slot: 'products' }]}
      ></dk-section-navbar-mega>`
    );
    const trigger = el.shadowRoot!.querySelector('.mega-trigger');
    expect(trigger).to.exist;
    expect(trigger!.textContent).to.contain('Products');
  });
});
