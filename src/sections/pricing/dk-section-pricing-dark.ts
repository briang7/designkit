import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { pricingBaseStyles } from './dk-section-pricing.styles.js';
import './dk-pricing-tier.js';

const darkStyles = css`
  :host {
    background: var(--dk-color-dark-bg, #111827);
    --dk-color-text: #ffffff;
    --dk-color-text-muted: #9ca3af;
    --dk-color-surface: #1f2937;
    --dk-color-border: #374151;
  }

  h2 {
    color: #ffffff;
  }

  .subheadline {
    color: var(--dk-color-dark-text-muted, #9ca3af);
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

  ::slotted(dk-pricing-tier) {
    --dk-pricing-tier-bg: var(--dk-color-dark-surface, #1f2937);
    --dk-pricing-tier-border: var(--dk-color-dark-border, #374151);
    --dk-pricing-tier-text: #ffffff;
    --dk-pricing-tier-text-muted: #9ca3af;
  }
`;

@customElement('dk-section-pricing-dark')
export class DkSectionPricingDark extends DkSectionElement {
  static override styles = [pricingBaseStyles, darkStyles];

  @property() headline = '';
  @property() subheadline = '';

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
    'dk-section-pricing-dark': DkSectionPricingDark;
  }
}
