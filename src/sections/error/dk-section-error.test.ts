import { html, fixture, expect } from '@open-wc/testing';
import './dk-section-error-simple.js';
import './dk-section-error-split.js';
import './dk-section-error-with-links.js';
import type { DkSectionErrorSimple } from './dk-section-error-simple.js';
import type { DkSectionErrorSplit } from './dk-section-error-split.js';
import type { DkSectionErrorWithLinks } from './dk-section-error-with-links.js';

describe('dk-section-error-simple', () => {
  it('renders default 404 code, headline, and description', async () => {
    const el = await fixture<DkSectionErrorSimple>(html`
      <dk-section-error-simple no-animate></dk-section-error-simple>
    `);
    const code = el.shadowRoot!.querySelector('h1')!;
    expect(code.textContent).to.equal('404');
    const headline = el.shadowRoot!.querySelector('h2')!;
    expect(headline.textContent).to.equal('Page not found');
    const desc = el.shadowRoot!.querySelector('.description')!;
    expect(desc.textContent).to.contain("couldn't find the page");
  });

  it('renders custom code, headline, and description', async () => {
    const el = await fixture<DkSectionErrorSimple>(html`
      <dk-section-error-simple
        code="500"
        headline="Server Error"
        description="Something went wrong on our end."
        no-animate
      ></dk-section-error-simple>
    `);
    const code = el.shadowRoot!.querySelector('h1')!;
    expect(code.textContent).to.equal('500');
    const headline = el.shadowRoot!.querySelector('h2')!;
    expect(headline.textContent).to.equal('Server Error');
    const desc = el.shadowRoot!.querySelector('.description')!;
    expect(desc.textContent).to.equal('Something went wrong on our end.');
  });

  it('provides a cta slot', async () => {
    const el = await fixture<DkSectionErrorSimple>(html`
      <dk-section-error-simple no-animate>
        <a slot="cta" href="/">Go Home</a>
      </dk-section-error-simple>
    `);
    const slot = el.shadowRoot!.querySelector('slot[name="cta"]') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(1);
  });
});

describe('dk-section-error-split', () => {
  it('renders code and headline with media slot', async () => {
    const el = await fixture<DkSectionErrorSplit>(html`
      <dk-section-error-split no-animate>
        <img slot="media" src="https://example.com/error.svg" alt="Error" />
      </dk-section-error-split>
    `);
    const code = el.shadowRoot!.querySelector('h1')!;
    expect(code.textContent).to.equal('404');
    const headline = el.shadowRoot!.querySelector('h2')!;
    expect(headline.textContent).to.equal('Page not found');
    const mediaSlot = el.shadowRoot!.querySelector('slot[name="media"]') as HTMLSlotElement;
    expect(mediaSlot.assignedElements().length).to.equal(1);
  });

  it('renders fallback SVG when no image or media slot', async () => {
    const el = await fixture<DkSectionErrorSplit>(html`
      <dk-section-error-split no-animate></dk-section-error-split>
    `);
    const fallbackSvg = el.shadowRoot!.querySelector('.fallback-svg')!;
    expect(fallbackSvg).to.exist;
  });

  it('renders image when image prop is set', async () => {
    const el = await fixture<DkSectionErrorSplit>(html`
      <dk-section-error-split image="https://example.com/broken.png" no-animate></dk-section-error-split>
    `);
    const img = el.shadowRoot!.querySelector('img[part="image"]')!;
    expect(img).to.exist;
    expect(img.getAttribute('src')).to.equal('https://example.com/broken.png');
  });
});

describe('dk-section-error-with-links', () => {
  it('renders code, headline, and links section', async () => {
    const el = await fixture<DkSectionErrorWithLinks>(html`
      <dk-section-error-with-links no-animate></dk-section-error-with-links>
    `);
    const code = el.shadowRoot!.querySelector('h1')!;
    expect(code.textContent).to.equal('404');
    const headline = el.shadowRoot!.querySelector('h2')!;
    expect(headline.textContent).to.equal('Page not found');
    const linksTitle = el.shadowRoot!.querySelector('.links-title')!;
    expect(linksTitle.textContent).to.equal('Popular pages');
  });

  it('renders suggested links via slot', async () => {
    const el = await fixture<DkSectionErrorWithLinks>(html`
      <dk-section-error-with-links no-animate>
        <a slot="links" href="/docs">Documentation</a>
        <a slot="links" href="/blog">Blog</a>
        <a slot="links" href="/support">Support</a>
      </dk-section-error-with-links>
    `);
    const linksSlot = el.shadowRoot!.querySelector('slot[name="links"]') as HTMLSlotElement;
    expect(linksSlot.assignedElements().length).to.equal(3);
  });

  it('renders custom code and description', async () => {
    const el = await fixture<DkSectionErrorWithLinks>(html`
      <dk-section-error-with-links
        code="403"
        headline="Access Denied"
        description="You do not have permission."
        no-animate
      ></dk-section-error-with-links>
    `);
    const code = el.shadowRoot!.querySelector('h1')!;
    expect(code.textContent).to.equal('403');
    const headline = el.shadowRoot!.querySelector('h2')!;
    expect(headline.textContent).to.equal('Access Denied');
    const desc = el.shadowRoot!.querySelector('.description')!;
    expect(desc.textContent).to.equal('You do not have permission.');
  });
});
