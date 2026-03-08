import { html, fixture, expect } from '@open-wc/testing';
import './dk-product-card.js';
import './dk-section-products-grid.js';
import './dk-section-products-carousel.js';
import type { DkProductCard } from './dk-product-card.js';
import type { DkSectionProductsGrid } from './dk-section-products-grid.js';
import type { DkSectionProductsCarousel } from './dk-section-products-carousel.js';

describe('dk-product-card', () => {
  it('renders with name, price, and image', async () => {
    const el = await fixture<DkProductCard>(html`
      <dk-product-card
        name="Wireless Headphones"
        price="$49.99"
        image="https://example.com/headphones.jpg"
      ></dk-product-card>
    `);
    const name = el.shadowRoot!.querySelector('.name')!;
    expect(name.textContent).to.equal('Wireless Headphones');
    const price = el.shadowRoot!.querySelector('.price')!;
    expect(price.textContent).to.equal('$49.99');
    const img = el.shadowRoot!.querySelector('img')!;
    expect(img.getAttribute('src')).to.equal('https://example.com/headphones.jpg');
  });

  it('renders badge and original price', async () => {
    const el = await fixture<DkProductCard>(html`
      <dk-product-card
        name="Sale Item"
        price="$29.99"
        original-price="$59.99"
        badge="Sale"
        image="product.jpg"
      ></dk-product-card>
    `);
    const badge = el.shadowRoot!.querySelector('.badge')!;
    expect(badge.textContent).to.equal('Sale');
    const originalPrice = el.shadowRoot!.querySelector('.original-price')!;
    expect(originalPrice.textContent).to.equal('$59.99');
  });

  it('renders star rating', async () => {
    const el = await fixture<DkProductCard>(html`
      <dk-product-card name="Rated Item" price="$10" rating="4"></dk-product-card>
    `);
    const rating = el.shadowRoot!.querySelector('.rating')!;
    expect(rating).to.exist;
    const filledStars = el.shadowRoot!.querySelectorAll('.star-filled');
    expect(filledStars.length).to.equal(4);
  });

  it('wraps in link when href is set', async () => {
    const el = await fixture<DkProductCard>(html`
      <dk-product-card name="Linked" price="$5" href="/product/1"></dk-product-card>
    `);
    const link = el.shadowRoot!.querySelector('a.card-link')!;
    expect(link).to.exist;
    expect(link.getAttribute('href')).to.equal('/product/1');
  });
});

describe('dk-section-products-grid', () => {
  it('renders headline and subheadline', async () => {
    const el = await fixture<DkSectionProductsGrid>(html`
      <dk-section-products-grid headline="Featured Products" subheadline="Our best picks" no-animate>
        <dk-product-card name="Item 1" price="$10"></dk-product-card>
      </dk-section-products-grid>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Featured Products');
    const sub = el.shadowRoot!.querySelector('.subheadline')!;
    expect(sub.textContent).to.equal('Our best picks');
  });

  it('slots product cards into grid', async () => {
    const el = await fixture<DkSectionProductsGrid>(html`
      <dk-section-products-grid headline="Products" no-animate>
        <dk-product-card name="A" price="$1"></dk-product-card>
        <dk-product-card name="B" price="$2"></dk-product-card>
      </dk-section-products-grid>
    `);
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(2);
  });
});

describe('dk-section-products-carousel', () => {
  it('renders headline and navigation controls', async () => {
    const el = await fixture<DkSectionProductsCarousel>(html`
      <dk-section-products-carousel headline="New Arrivals" no-animate>
        <dk-product-card name="X" price="$5"></dk-product-card>
        <dk-product-card name="Y" price="$6"></dk-product-card>
      </dk-section-products-carousel>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('New Arrivals');
    const prevBtn = el.shadowRoot!.querySelector('[part="prev-btn"]');
    expect(prevBtn).to.exist;
    const nextBtn = el.shadowRoot!.querySelector('[part="next-btn"]');
    expect(nextBtn).to.exist;
  });

  it('renders track with slotted cards', async () => {
    const el = await fixture<DkSectionProductsCarousel>(html`
      <dk-section-products-carousel no-animate>
        <dk-product-card name="A" price="$1"></dk-product-card>
      </dk-section-products-carousel>
    `);
    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track).to.exist;
    const slot = track.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(1);
  });
});
