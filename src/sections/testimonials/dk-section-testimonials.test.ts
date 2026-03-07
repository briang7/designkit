import { html, fixture, expect } from '@open-wc/testing';
import './dk-testimonial-card.js';
import './dk-section-testimonials-grid.js';
import './dk-section-testimonials-carousel.js';
import type { DkTestimonialCard } from './dk-testimonial-card.js';
import type { DkSectionTestimonialsGrid } from './dk-section-testimonials-grid.js';
import type { DkSectionTestimonialsCarousel } from './dk-section-testimonials-carousel.js';

describe('dk-testimonial-card', () => {
  it('renders quote, author, and role', async () => {
    const el = await fixture<DkTestimonialCard>(html`
      <dk-testimonial-card
        quote="Amazing product!"
        author="Jane Doe"
        role="CEO at Acme"
      ></dk-testimonial-card>
    `);
    const quote = el.shadowRoot!.querySelector('.quote')!;
    expect(quote.textContent).to.contain('Amazing product!');
    const name = el.shadowRoot!.querySelector('.author-name')!;
    expect(name.textContent).to.equal('Jane Doe');
    const role = el.shadowRoot!.querySelector('.author-role')!;
    expect(role.textContent).to.equal('CEO at Acme');
  });

  it('renders star rating', async () => {
    const el = await fixture<DkTestimonialCard>(html`
      <dk-testimonial-card quote="Great" author="Bob" rating="4"></dk-testimonial-card>
    `);
    const stars = el.shadowRoot!.querySelectorAll('.star');
    expect(stars.length).to.equal(5);
    const filledStars = el.shadowRoot!.querySelectorAll('.star polygon[fill="currentColor"]');
    expect(filledStars.length).to.equal(4);
  });

  it('shows avatar placeholder initials when no avatar', async () => {
    const el = await fixture<DkTestimonialCard>(html`
      <dk-testimonial-card quote="Nice" author="John Smith"></dk-testimonial-card>
    `);
    const placeholder = el.shadowRoot!.querySelector('.avatar-placeholder')!;
    expect(placeholder.textContent).to.equal('JS');
  });
});

describe('dk-section-testimonials-grid', () => {
  it('renders headline and slots cards', async () => {
    const el = await fixture<DkSectionTestimonialsGrid>(html`
      <dk-section-testimonials-grid headline="What people say" no-animate>
        <dk-testimonial-card quote="Love it" author="Alice"></dk-testimonial-card>
      </dk-section-testimonials-grid>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('What people say');
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(1);
  });
});

describe('dk-section-testimonials-carousel', () => {
  it('renders navigation controls', async () => {
    const el = await fixture<DkSectionTestimonialsCarousel>(html`
      <dk-section-testimonials-carousel headline="Reviews" no-animate>
        <dk-testimonial-card quote="A" author="One"></dk-testimonial-card>
        <dk-testimonial-card quote="B" author="Two"></dk-testimonial-card>
      </dk-section-testimonials-carousel>
    `);
    const prevBtn = el.shadowRoot!.querySelector('[part="arrow-prev"]');
    expect(prevBtn).to.exist;
    const nextBtn = el.shadowRoot!.querySelector('[part="arrow-next"]');
    expect(nextBtn).to.exist;
    const dots = el.shadowRoot!.querySelectorAll('.dot');
    expect(dots.length).to.equal(2);
  });
});
