import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { testimonialsBaseStyles } from './dk-section-testimonials.styles.js';
import './dk-testimonial-card.js';

const localStyles = css`
  .masonry {
    column-count: 3;
    column-gap: var(--dk-space-8, 2rem);
  }

  ::slotted(*) {
    display: inline-block;
    width: 100%;
    break-inside: avoid;
    margin-bottom: var(--dk-space-8, 2rem);
    box-sizing: border-box;
  }

  @media (max-width: 1024px) {
    .masonry {
      column-count: 2;
    }
  }

  @media (max-width: 768px) {
    .masonry {
      column-count: 1;
    }
  }
`;

@customElement('dk-section-testimonials-masonry')
export class DkSectionTestimonialsMasonry extends DkSectionElement {
  static override styles = [testimonialsBaseStyles, localStyles];

  @property() headline = '';
  @property() subheadline = '';

  protected override onEnterViewport() {
    const cards = Array.from(
      this.querySelectorAll('dk-testimonial-card')
    );
    this.animateEntrance(cards);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline || this.subheadline
            ? html`<div class="section-header animate-target" part="header">
                ${this.headline ? html`<h2 part="headline">${this.headline}</h2>` : nothing}
                ${this.subheadline ? html`<p class="subheadline" part="subheadline">${this.subheadline}</p>` : nothing}
              </div>`
            : nothing}
          <div class="masonry" part="masonry">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-testimonials-masonry': DkSectionTestimonialsMasonry;
  }
}
