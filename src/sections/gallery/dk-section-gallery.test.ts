import { html, fixture, expect } from '@open-wc/testing';
import './dk-gallery-item.js';
import './dk-section-gallery-grid.js';
import './dk-section-gallery-carousel.js';
import type { DkGalleryItem } from './dk-gallery-item.js';
import type { DkSectionGalleryGrid } from './dk-section-gallery-grid.js';
import type { DkSectionGalleryCarousel } from './dk-section-gallery-carousel.js';

describe('dk-gallery-item', () => {
  it('renders image and caption', async () => {
    const el = await fixture<DkGalleryItem>(html`
      <dk-gallery-item src="photo.jpg" alt="Photo" caption="A nice photo"></dk-gallery-item>
    `);
    const img = el.shadowRoot!.querySelector('img')!;
    expect(img.getAttribute('src')).to.equal('photo.jpg');
    expect(img.getAttribute('alt')).to.equal('Photo');
    const caption = el.shadowRoot!.querySelector('.caption-overlay')!;
    expect(caption.textContent).to.equal('A nice photo');
  });
});

describe('dk-section-gallery-grid', () => {
  it('renders headline and grid with lightbox support', async () => {
    const el = await fixture<DkSectionGalleryGrid>(html`
      <dk-section-gallery-grid headline="Gallery" no-animate>
        <dk-gallery-item src="a.jpg" alt="A"></dk-gallery-item>
        <dk-gallery-item src="b.jpg" alt="B"></dk-gallery-item>
      </dk-section-gallery-grid>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Gallery');
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(2);
  });
});

describe('dk-section-gallery-carousel', () => {
  it('renders scrollable track', async () => {
    const el = await fixture<DkSectionGalleryCarousel>(html`
      <dk-section-gallery-carousel headline="Photos" no-animate>
        <dk-gallery-item src="a.jpg" alt="A"></dk-gallery-item>
      </dk-section-gallery-carousel>
    `);
    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track).to.exist;
  });
});
