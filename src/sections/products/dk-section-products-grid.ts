import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { productsBaseStyles } from './dk-section-products.styles.js';
import './dk-product-card.js';

const gridStyles = css`
  .grid {
    display: grid;
    gap: var(--dk-space-6, 1.5rem);
  }

  :host([columns="2"]) .grid { grid-template-columns: repeat(2, 1fr); }
  :host([columns="3"]) .grid { grid-template-columns: repeat(3, 1fr); }
  :host(:not([columns])) .grid,
  :host([columns="4"]) .grid { grid-template-columns: repeat(4, 1fr); }
  :host([columns="5"]) .grid { grid-template-columns: repeat(5, 1fr); }
  :host([columns="6"]) .grid { grid-template-columns: repeat(6, 1fr); }

  @media (max-width: 1024px) {
    :host([columns="4"]) .grid,
    :host([columns="5"]) .grid,
    :host([columns="6"]) .grid,
    :host(:not([columns])) .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

@customElement('dk-section-products-grid')
export class DkSectionProductsGrid extends DkSectionElement {
  static override styles = [productsBaseStyles, gridStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property({ type: Number, reflect: true }) columns = 4;

  protected override onEnterViewport() {
    const cards = Array.from(
      this.querySelectorAll('dk-product-card')
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
    'dk-section-products-grid': DkSectionProductsGrid;
  }
}
