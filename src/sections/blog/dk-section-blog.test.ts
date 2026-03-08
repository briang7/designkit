import { html, fixture, expect } from '@open-wc/testing';
import './dk-blog-card.js';
import './dk-section-blog-grid.js';
import './dk-section-blog-featured.js';
import type { DkBlogCard } from './dk-blog-card.js';
import type { DkSectionBlogGrid } from './dk-section-blog-grid.js';
import type { DkSectionBlogFeatured } from './dk-section-blog-featured.js';

describe('dk-blog-card', () => {
  it('renders with title and description', async () => {
    const el = await fixture<DkBlogCard>(html`
      <dk-blog-card
        title="My Post"
        description="A brief excerpt"
      ></dk-blog-card>
    `);
    const title = el.shadowRoot!.querySelector('.title')!;
    expect(title.textContent).to.equal('My Post');
    const desc = el.shadowRoot!.querySelector('.description')!;
    expect(desc.textContent).to.equal('A brief excerpt');
  });

  it('renders image with category badge', async () => {
    const el = await fixture<DkBlogCard>(html`
      <dk-blog-card
        title="Post"
        image="photo.jpg"
        category="Tech"
      ></dk-blog-card>
    `);
    const img = el.shadowRoot!.querySelector('.image') as HTMLImageElement;
    expect(img).to.exist;
    expect(img.src).to.contain('photo.jpg');
    const badge = el.shadowRoot!.querySelector('.category-badge')!;
    expect(badge.textContent).to.equal('Tech');
  });

  it('renders author and date in meta', async () => {
    const el = await fixture<DkBlogCard>(html`
      <dk-blog-card
        title="Post"
        author="Jane Doe"
        date="March 1, 2026"
      ></dk-blog-card>
    `);
    const author = el.shadowRoot!.querySelector('.author')!;
    expect(author.textContent).to.equal('Jane Doe');
    const date = el.shadowRoot!.querySelector('.date')!;
    expect(date.textContent).to.equal('March 1, 2026');
  });

  it('renders as link when href is set', async () => {
    const el = await fixture<DkBlogCard>(html`
      <dk-blog-card title="Post" href="/blog/post"></dk-blog-card>
    `);
    const link = el.shadowRoot!.querySelector('a.card') as HTMLAnchorElement;
    expect(link).to.exist;
    expect(link.getAttribute('href')).to.equal('/blog/post');
  });

  it('renders as div when no href', async () => {
    const el = await fixture<DkBlogCard>(html`
      <dk-blog-card title="Post"></dk-blog-card>
    `);
    const div = el.shadowRoot!.querySelector('div.card');
    expect(div).to.exist;
    const link = el.shadowRoot!.querySelector('a.card');
    expect(link).to.not.exist;
  });
});

describe('dk-section-blog-grid', () => {
  it('renders headline and slots cards', async () => {
    const el = await fixture<DkSectionBlogGrid>(html`
      <dk-section-blog-grid headline="Latest Posts" no-animate>
        <dk-blog-card title="Post 1"></dk-blog-card>
      </dk-section-blog-grid>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Latest Posts');
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(1);
  });

  it('renders subheadline', async () => {
    const el = await fixture<DkSectionBlogGrid>(html`
      <dk-section-blog-grid headline="Blog" subheadline="Read our stories" no-animate>
      </dk-section-blog-grid>
    `);
    const desc = el.shadowRoot!.querySelector('.description')!;
    expect(desc.textContent).to.equal('Read our stories');
  });

  it('applies bg attribute', async () => {
    const el = await fixture<DkSectionBlogGrid>(html`
      <dk-section-blog-grid bg="dark" no-animate></dk-section-blog-grid>
    `);
    expect(el.getAttribute('bg')).to.equal('dark');
  });
});

describe('dk-section-blog-featured', () => {
  it('renders headline and layout slots', async () => {
    const el = await fixture<DkSectionBlogFeatured>(html`
      <dk-section-blog-featured headline="Featured" no-animate>
        <dk-blog-card slot="featured" title="Main Post"></dk-blog-card>
        <dk-blog-card title="Side Post"></dk-blog-card>
      </dk-section-blog-featured>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Featured');
    const featuredSlot = el.shadowRoot!.querySelector('slot[name="featured"]') as HTMLSlotElement;
    expect(featuredSlot.assignedElements().length).to.equal(1);
    const defaultSlot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(defaultSlot.assignedElements().length).to.equal(1);
  });

  it('renders subheadline', async () => {
    const el = await fixture<DkSectionBlogFeatured>(html`
      <dk-section-blog-featured headline="Blog" subheadline="Top picks" no-animate>
      </dk-section-blog-featured>
    `);
    const desc = el.shadowRoot!.querySelector('.description')!;
    expect(desc.textContent).to.equal('Top picks');
  });

  it('applies bg attribute', async () => {
    const el = await fixture<DkSectionBlogFeatured>(html`
      <dk-section-blog-featured bg="brand" no-animate></dk-section-blog-featured>
    `);
    expect(el.getAttribute('bg')).to.equal('brand');
  });
});
