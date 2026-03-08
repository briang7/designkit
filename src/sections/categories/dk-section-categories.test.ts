import { html, fixture, expect } from '@open-wc/testing';
import './dk-category-card.js';
import './dk-section-categories-grid.js';
import './dk-section-categories-scroll.js';
import type { DkCategoryCard } from './dk-category-card.js';
import type { DkSectionCategoriesGrid } from './dk-section-categories-grid.js';
import type { DkSectionCategoriesScroll } from './dk-section-categories-scroll.js';

describe('dk-category-card', () => {
  it('renders name and image', async () => {
    const el = await fixture<DkCategoryCard>(html`
      <dk-category-card
        name="Electronics"
        image="https://example.com/electronics.jpg"
      ></dk-category-card>
    `);
    const name = el.shadowRoot!.querySelector('.name')!;
    expect(name.textContent).to.equal('Electronics');
    const imageDiv = el.shadowRoot!.querySelector('.image') as HTMLElement;
    expect(imageDiv.style.backgroundImage).to.contain('electronics.jpg');
  });

  it('renders description and item count', async () => {
    const el = await fixture<DkCategoryCard>(html`
      <dk-category-card
        name="Books"
        description="Browse our collection"
        count="42"
      ></dk-category-card>
    `);
    const desc = el.shadowRoot!.querySelector('.description')!;
    expect(desc.textContent).to.equal('Browse our collection');
    const count = el.shadowRoot!.querySelector('.count')!;
    expect(count.textContent).to.contain('42 items');
  });

  it('wraps in link when href is set', async () => {
    const el = await fixture<DkCategoryCard>(html`
      <dk-category-card name="Shoes" href="/categories/shoes"></dk-category-card>
    `);
    const link = el.shadowRoot!.querySelector('a')!;
    expect(link).to.exist;
    expect(link.getAttribute('href')).to.equal('/categories/shoes');
  });
});

describe('dk-section-categories-grid', () => {
  it('renders headline and subheadline', async () => {
    const el = await fixture<DkSectionCategoriesGrid>(html`
      <dk-section-categories-grid headline="Shop by Category" subheadline="Find what you need" no-animate>
        <dk-category-card name="Clothing"></dk-category-card>
      </dk-section-categories-grid>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Shop by Category');
    const sub = el.shadowRoot!.querySelector('.subheadline')!;
    expect(sub.textContent).to.equal('Find what you need');
  });

  it('slots category cards into grid', async () => {
    const el = await fixture<DkSectionCategoriesGrid>(html`
      <dk-section-categories-grid headline="Categories" no-animate>
        <dk-category-card name="A"></dk-category-card>
        <dk-category-card name="B"></dk-category-card>
        <dk-category-card name="C"></dk-category-card>
      </dk-section-categories-grid>
    `);
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(3);
  });
});

describe('dk-section-categories-scroll', () => {
  it('renders headline and scroll track', async () => {
    const el = await fixture<DkSectionCategoriesScroll>(html`
      <dk-section-categories-scroll headline="Browse Categories" no-animate>
        <dk-category-card name="Sports"></dk-category-card>
        <dk-category-card name="Music"></dk-category-card>
      </dk-section-categories-scroll>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Browse Categories');
    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track).to.exist;
  });

  it('slots cards into the scroll track', async () => {
    const el = await fixture<DkSectionCategoriesScroll>(html`
      <dk-section-categories-scroll no-animate>
        <dk-category-card name="Art"></dk-category-card>
      </dk-section-categories-scroll>
    `);
    const slot = el.shadowRoot!.querySelector('.track slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(1);
  });
});
