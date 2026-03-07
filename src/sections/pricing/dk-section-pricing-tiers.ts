import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { pricingBaseStyles } from './dk-section-pricing.styles.js';
import './dk-pricing-tier.js';

const tiersStyles = css`
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--dk-space-3, 0.75rem);
    margin-bottom: var(--dk-space-10, 2.5rem);
  }

  .toggle-label {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
    cursor: pointer;
    user-select: none;
  }

  .toggle-label[data-active] {
    color: var(--dk-color-text, #111827);
    font-weight: var(--dk-font-semibold, 600);
  }

  .toggle-track {
    width: 48px;
    height: 26px;
    background: var(--dk-color-neutral-200, #e5e7eb);
    border-radius: var(--dk-radius-full, 9999px);
    position: relative;
    cursor: pointer;
    transition: background 0.2s ease;
    border: none;
    padding: 0;
  }

  .toggle-track[data-active] {
    background: var(--dk-color-primary, #3b82f6);
  }

  .toggle-thumb {
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: var(--dk-radius-full, 9999px);
    position: absolute;
    top: 3px;
    left: 3px;
    transition: transform 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }

  .toggle-track[data-active] .toggle-thumb {
    transform: translateX(22px);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--dk-space-8, 2rem);
    align-items: stretch;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
      max-width: 400px;
      margin-inline: auto;
    }
  }
`;

@customElement('dk-section-pricing-tiers')
export class DkSectionPricingTiers extends DkSectionElement {
  static override styles = [pricingBaseStyles, tiersStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property({ attribute: 'monthly-label' }) monthlyLabel = 'Monthly';
  @property({ attribute: 'annual-label' }) annualLabel = 'Annual';

  @state() private _annual = false;

  private _toggleBilling() {
    this._annual = !this._annual;
    this._updateTiers();
    this.emitEvent('dk-billing-toggle', { annual: this._annual });
  }

  private _updateTiers() {
    const tiers = this.querySelectorAll('dk-pricing-tier');
    tiers.forEach(tier => {
      (tier as any).annual = this._annual;
    });
  }

  protected override onEnterViewport() {
    const cards = Array.from(this.querySelectorAll('dk-pricing-tier'));
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
          <div class="toggle-row" part="toggle-row">
            <span
              class="toggle-label"
              ?data-active=${!this._annual}
              @click=${() => { this._annual = false; this._updateTiers(); this.emitEvent('dk-billing-toggle', { annual: false }); }}
            >${this.monthlyLabel}</span>
            <button
              class="toggle-track"
              ?data-active=${this._annual}
              @click=${this._toggleBilling}
              aria-label="Toggle billing period"
              part="toggle"
            >
              <span class="toggle-thumb"></span>
            </button>
            <span
              class="toggle-label"
              ?data-active=${this._annual}
              @click=${() => { this._annual = true; this._updateTiers(); this.emitEvent('dk-billing-toggle', { annual: true }); }}
            >${this.annualLabel}</span>
          </div>
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
    'dk-section-pricing-tiers': DkSectionPricingTiers;
  }
}
