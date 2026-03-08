import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { testimonialsBaseStyles } from './dk-section-testimonials.styles.js';
import './dk-testimonial-card.js';

const localStyles = css`
  :host {
    --dk-color-text: #f9fafb;
    --dk-color-text-muted: #9ca3af;
    --dk-color-surface: rgba(255, 255, 255, 0.06);
    --dk-color-border: rgba(255, 255, 255, 0.1);
    background: var(--dk-color-dark-bg, #0f172a);
    color: var(--dk-color-text);
  }

  h2 {
    color: #f9fafb;
  }

  .subheadline {
    color: #9ca3af;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--dk-space-8, 2rem);
  }

  ::slotted(*) {
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    --dk-color-text: #f9fafb;
    --dk-color-text-muted: #9ca3af;
    --dk-color-surface: rgba(255, 255, 255, 0.06);
    --dk-color-border: rgba(255, 255, 255, 0.1);
    --dk-color-primary-subtle: rgba(96, 165, 250, 0.15);
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;

@customElement('dk-section-testimonials-dark')
export class DkSectionTestimonialsDark extends DkSectionElement {
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
          <div class="grid" part="grid">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-testimonials-dark': DkSectionTestimonialsDark;
  }
}
