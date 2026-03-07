import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { pricingBaseStyles } from './dk-section-pricing.styles.js';

const simpleStyles = css`
  .card {
    max-width: 480px;
    margin: 0 auto;
    background: var(--dk-color-surface, #ffffff);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-xl, 1rem);
    padding: var(--dk-space-10, 2.5rem);
    text-align: center;
  }

  .name {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-lg, 1.125rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
    margin: 0 0 var(--dk-space-4, 1rem);
  }

  .price-row {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.25rem;
    margin-bottom: var(--dk-space-2, 0.5rem);
  }

  .price {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-h1, clamp(2.5rem, 5vw, 3.5rem));
    font-weight: var(--dk-font-extrabold, 800);
    color: var(--dk-color-text, #111827);
    line-height: 1;
  }

  .period {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-base, 1rem);
    color: var(--dk-color-text-muted, #6b7280);
  }

  .description {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-base, 1rem);
    color: var(--dk-color-text-muted, #6b7280);
    line-height: var(--dk-leading-relaxed, 1.6);
    margin: 0 0 var(--dk-space-8, 2rem);
  }

  .divider {
    border: 0;
    border-top: 1px solid var(--dk-color-border, #e5e7eb);
    margin: 0 0 var(--dk-space-6, 1.5rem);
  }

  .features {
    list-style: none;
    margin: 0 0 var(--dk-space-8, 2rem);
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-3, 0.75rem);
    text-align: left;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: var(--dk-space-2, 0.5rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text, #111827);
    line-height: var(--dk-leading-relaxed, 1.6);
  }

  .check {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: var(--dk-color-success, #10b981);
    margin-top: 2px;
  }
`;

@customElement('dk-section-pricing-simple')
export class DkSectionPricingSimple extends DkSectionElement {
  static override styles = [pricingBaseStyles, simpleStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property() name = '';
  @property() price = '';
  @property() period = '';
  @property() description = '';
  @property({ type: Array }) features: string[] = [];

  protected override onEnterViewport() {
    const card = this.shadowRoot?.querySelector('.card');
    if (card) this.animateEntrance([card]);
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
          <div class="card animate-target" part="card">
            ${this.name ? html`<h2 class="name" part="name">${this.name}</h2>` : nothing}
            <div class="price-row" part="price-row">
              <span class="price" part="price">${this.price}</span>
              ${this.period ? html`<span class="period" part="period">${this.period}</span>` : nothing}
            </div>
            ${this.description ? html`<p class="description" part="description">${this.description}</p>` : nothing}
            <hr class="divider" />
            ${this.features.length
              ? html`
                  <ul class="features" part="features">
                    ${this.features.map(
                      f => html`
                        <li class="feature-item">
                          <svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>${f}</span>
                        </li>
                      `
                    )}
                  </ul>
                `
              : nothing}
            <slot name="cta"></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-pricing-simple': DkSectionPricingSimple;
  }
}
