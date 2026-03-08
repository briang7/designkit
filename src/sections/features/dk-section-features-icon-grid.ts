import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { featuresBaseStyles } from './dk-section-features.styles.js';
import './dk-feature-card.js';

const iconGridStyles = css`
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--dk-space-10, 2.5rem) var(--dk-space-8, 2rem);
  }

  ::slotted(dk-feature-card) {
    --dk-feature-card-shadow: none;
    --dk-feature-card-border: none;
    --dk-feature-card-bg: transparent;
    --dk-feature-card-padding: var(--dk-space-4, 1rem);
    --dk-feature-card-radius: 0;
    --dk-feature-card-text-align: center;
    --dk-feature-card-align: center;
    text-align: center;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
      max-width: 400px;
      margin-inline: auto;
    }
  }
`;

@customElement('dk-section-features-icon-grid')
export class DkSectionFeaturesIconGrid extends DkSectionElement {
  static override styles = [featuresBaseStyles, iconGridStyles];

  @property() headline = '';
  @property() subheadline = '';

  protected override onEnterViewport() {
    const cards = Array.from(
      this.querySelectorAll('dk-feature-card')
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
    'dk-section-features-icon-grid': DkSectionFeaturesIconGrid;
  }
}
