import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

const styles = css`
  :host {
    display: block;
  }

  .card {
    display: flex;
    flex-direction: column;
    border-radius: var(--dk-radius-xl, 1rem);
    background: var(--dk-color-surface, #ffffff);
    border: none;
    overflow: hidden;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  .card:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  .image-wrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: var(--dk-color-neutral-100, #f3f4f6);
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .card:hover .image-wrapper img {
    transform: scale(1.08);
  }

  .badge {
    position: absolute;
    top: var(--dk-space-3, 0.75rem);
    left: var(--dk-space-3, 0.75rem);
    display: inline-flex;
    align-items: center;
    padding: var(--dk-space-1, 0.25rem) var(--dk-space-2, 0.5rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-xs, 0.75rem);
    font-weight: var(--dk-font-semibold, 600);
    line-height: 1;
    color: var(--dk-color-badge-text, #ffffff);
    background: var(--dk-color-primary, #3b82f6);
    border-radius: var(--dk-radius-md, 0.375rem);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    z-index: 1;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-2, 0.5rem);
    padding: var(--dk-space-4, 1rem) var(--dk-space-4, 1rem) var(--dk-space-5, 1.25rem);
  }

  .name {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-lg, 1.125rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
    margin: 0;
    line-height: var(--dk-leading-tight, 1.3);
  }

  .price-row {
    display: flex;
    align-items: baseline;
    gap: var(--dk-space-2, 0.5rem);
  }

  .price {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-xl, 1.25rem);
    font-weight: var(--dk-font-bold, 700);
    color: var(--dk-color-text, #111827);
    margin: 0;
    line-height: 1;
  }

  .original-price {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
    text-decoration: line-through;
    line-height: 1;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .rating svg {
    width: 16px;
    height: 16px;
  }

  .star-filled {
    color: var(--dk-color-rating, #f59e0b);
  }

  .star-empty {
    color: var(--dk-color-neutral-300, #d1d5db);
  }

  .description {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    line-height: var(--dk-leading-relaxed, 1.6);
    color: var(--dk-color-text-muted, #6b7280);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cta {
    margin-top: var(--dk-space-2, 0.5rem);
  }

  a.card-link {
    text-decoration: none;
    color: inherit;
    display: contents;
  }
`;

@customElement('dk-product-card')
export class DkProductCard extends DkElement {
  static override styles = styles;

  @property() image = '';
  @property() name = '';
  @property() price = '';
  @property({ attribute: 'original-price' }) originalPrice = '';
  @property() description = '';
  @property() badge = '';
  @property({ type: Number }) rating = 0;
  @property() href = '';

  private _renderStars() {
    if (!this.rating) return nothing;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(this.rating)) {
        stars.push(html`
          <svg class="star-filled" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>
          </svg>
        `);
      } else if (i - this.rating < 1) {
        // Half star
        stars.push(html`
          <svg class="star-filled" viewBox="0 0 24 24" aria-hidden="true">
            <defs><clipPath id="half${i}"><rect x="0" y="0" width="12" height="24"/></clipPath></defs>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" fill="currentColor" clip-path="url(#half${i})"/>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" fill="none" stroke="currentColor" stroke-width="1"/>
          </svg>
        `);
      } else {
        stars.push(html`
          <svg class="star-empty" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>
          </svg>
        `);
      }
    }
    return html`<div class="rating" part="rating" aria-label="${this.rating} out of 5 stars">${stars}</div>`;
  }

  override render() {
    const cardContent = html`
      <div class="card" part="card">
        ${this.image
          ? html`<div class="image-wrapper" part="image-wrapper">
              <img part="image" src="${this.image}" alt="${this.name}" loading="lazy" />
              ${this.badge
                ? html`<span class="badge" part="badge">${this.badge}</span>`
                : nothing}
            </div>`
          : nothing}
        <div class="content" part="content">
          <h3 class="name" part="name">${this.name}</h3>
          <div class="price-row">
            <span class="price" part="price">${this.price}</span>
            ${this.originalPrice
              ? html`<span class="original-price" part="original-price">${this.originalPrice}</span>`
              : nothing}
          </div>
          ${this._renderStars()}
          ${this.description
            ? html`<p class="description" part="description">${this.description}</p>`
            : nothing}
          <div class="cta" part="cta">
            <slot name="cta"></slot>
          </div>
        </div>
      </div>
    `;

    return this.href
      ? html`<a class="card-link" href="${this.href}">${cardContent}</a>`
      : cardContent;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-product-card': DkProductCard;
  }
}
