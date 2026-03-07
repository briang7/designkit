import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { pricingBaseStyles } from './dk-section-pricing.styles.js';
import './dk-pricing-tier.js';

interface ComparisonFeature {
  feature: string;
  tiers: boolean[];
}

const comparisonStyles = css`
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
    align-items: start;
    margin-bottom: var(--dk-space-12, 3rem);
  }

  @media (max-width: 1024px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .grid { grid-template-columns: 1fr; max-width: 400px; margin-inline: auto; }
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--dk-font-sans, system-ui, sans-serif);
  }

  .comparison-table th,
  .comparison-table td {
    padding: var(--dk-space-3, 0.75rem) var(--dk-space-4, 1rem);
    text-align: center;
    border-bottom: 1px solid var(--dk-color-border, #e5e7eb);
  }

  .comparison-table th {
    font-size: var(--dk-font-size-sm, 0.875rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
    background: var(--dk-color-surface-alt, #f9fafb);
  }

  .comparison-table td:first-child {
    text-align: left;
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text, #111827);
  }

  .check-icon {
    width: 20px;
    height: 20px;
    color: var(--dk-color-success, #10b981);
    display: inline-block;
  }

  .cross-icon {
    width: 20px;
    height: 20px;
    color: var(--dk-color-text-muted, #6b7280);
    opacity: 0.4;
    display: inline-block;
  }

  @media (max-width: 768px) {
    .comparison-table { font-size: 0.8rem; }
    .comparison-table th, .comparison-table td { padding: var(--dk-space-2, 0.5rem); }
  }
`;

@customElement('dk-section-pricing-comparison')
export class DkSectionPricingComparison extends DkSectionElement {
  static override styles = [pricingBaseStyles, comparisonStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property({ attribute: 'monthly-label' }) monthlyLabel = 'Monthly';
  @property({ attribute: 'annual-label' }) annualLabel = 'Annual';
  @property({ attribute: 'comparison-features', type: Array }) comparisonFeatures: ComparisonFeature[] = [];
  @property({ type: Array, attribute: 'tier-names' }) tierNames: string[] = [];

  @state() private _annual = false;

  private _toggleBilling() {
    this._annual = !this._annual;
    this.emitEvent('dk-billing-toggle', { annual: this._annual });
  }

  protected override onEnterViewport() {
    const cards = Array.from(this.querySelectorAll('dk-pricing-tier'));
    this.animateEntrance(cards);
  }

  private _renderTable() {
    if (this.comparisonFeatures.length === 0) return nothing;
    return html`
      <table class="comparison-table" part="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            ${this.tierNames.map(name => html`<th>${name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.comparisonFeatures.map(
            row => html`
              <tr>
                <td>${row.feature}</td>
                ${row.tiers.map(
                  has =>
                    has
                      ? html`<td><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-label="Included"><polyline points="20 6 9 17 4 12"></polyline></svg></td>`
                      : html`<td><svg class="cross-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-label="Not included"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></td>`
                )}
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
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
            <span class="toggle-label" ?data-active=${!this._annual}
              @click=${() => { this._annual = false; this.emitEvent('dk-billing-toggle', { annual: false }); }}
            >${this.monthlyLabel}</span>
            <button class="toggle-track" ?data-active=${this._annual}
              @click=${this._toggleBilling} aria-label="Toggle billing period" part="toggle">
              <span class="toggle-thumb"></span>
            </button>
            <span class="toggle-label" ?data-active=${this._annual}
              @click=${() => { this._annual = true; this.emitEvent('dk-billing-toggle', { annual: true }); }}
            >${this.annualLabel}</span>
          </div>
          <div class="grid" part="grid">
            <slot></slot>
          </div>
          ${this._renderTable()}
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-pricing-comparison': DkSectionPricingComparison;
  }
}
