import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
  }

  .card {
    display: flex;
    flex-direction: column;
    padding: var(--dk-space-8, 2rem);
    background: var(--dk-color-surface, #ffffff);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-xl, 1rem);
    height: 100%;
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }

  :host([featured]) .card {
    border-color: var(--dk-color-primary, #3b82f6);
    border-width: 2px;
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  :host([featured]) .card:hover {
    transform: scale(1.05) translateY(-4px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
  }

  .badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--dk-color-primary, #3b82f6);
    color: #ffffff;
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-xs, 0.75rem);
    font-weight: var(--dk-font-semibold, 600);
    padding: 0.25rem 1rem;
    border-radius: var(--dk-radius-full, 9999px);
    white-space: nowrap;
  }

  .name {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-lg, 1.125rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
    margin: 0 0 var(--dk-space-2, 0.5rem);
  }

  .price-row {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
    margin-bottom: var(--dk-space-2, 0.5rem);
  }

  .price {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-h2, clamp(1.875rem, 4vw, 2.5rem));
    font-weight: var(--dk-font-extrabold, 800);
    color: var(--dk-color-text, #111827);
    line-height: 1;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .price.switching {
    opacity: 0;
    transform: translateY(-6px);
  }

  .period {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
  }

  .description {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
    line-height: var(--dk-leading-relaxed, 1.6);
    margin: 0 0 var(--dk-space-6, 1.5rem);
  }

  .divider {
    border: 0;
    border-top: 1px solid var(--dk-color-border, #e5e7eb);
    margin: 0 0 var(--dk-space-6, 1.5rem);
  }

  .features {
    list-style: none;
    margin: 0 0 var(--dk-space-6, 1.5rem);
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-3, 0.75rem);
    flex: 1;
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

  .cta {
    margin-top: auto;
  }
`;

@customElement('dk-pricing-tier')
export class DkPricingTier extends DkElement {
  static override styles = styles;

  @property() name = '';
  @property() price = '';
  @property() period = '';
  @property({ attribute: 'annual-price' }) annualPrice = '';
  @property({ attribute: 'annual-period' }) annualPeriod = '';
  @property() description = '';
  @property({ type: Boolean, reflect: true }) featured = false;
  @property({ type: Boolean, reflect: true }) annual = false;
  @property({ type: Array }) features: string[] = [];

  private get _currentPeriod(): string {
    if (this.annual && this.annualPeriod) return this.annualPeriod;
    if (this.annual && this.annualPrice) return '/year';
    return this.period;
  }

  private _renderFeatureList() {
    if (this.features.length === 0) return nothing;
    return html`
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
    `;
  }

  override render() {
    return html`
      <div class="card" part="card">
        ${this.featured ? html`<span class="badge" part="badge">Most Popular</span>` : nothing}
        <h3 class="name" part="name">${this.name}</h3>
        <div class="price-row" part="price-row">
          <span class="price" part="price">${this.annual && this.annualPrice ? this.annualPrice : this.price}</span>
          ${this._currentPeriod ? html`<span class="period" part="period">${this._currentPeriod}</span>` : nothing}
        </div>
        ${this.description ? html`<p class="description" part="description">${this.description}</p>` : nothing}
        <hr class="divider" />
        ${this._renderFeatureList()}
        <slot></slot>
        <div class="cta" part="cta">
          <slot name="cta"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-pricing-tier': DkPricingTier;
  }
}
