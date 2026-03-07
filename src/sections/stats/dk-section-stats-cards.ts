import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { statsBaseStyles } from './dk-section-stats.styles.js';
import './dk-stat.js';

const cardsStyles = css`
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--dk-space-6, 1.5rem);
  }

  ::slotted(dk-stat) {
    padding: var(--dk-space-6, 1.5rem);
    background: var(--dk-color-surface, #ffffff);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-xl, 1rem);
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

@customElement('dk-section-stats-cards')
export class DkSectionStatsCards extends DkSectionElement {
  static override styles = [statsBaseStyles, cardsStyles];

  @property() headline = '';

  protected override onEnterViewport() {
    const stats = Array.from(this.querySelectorAll('dk-stat'));
    this.animateEntrance(stats);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline
            ? html`<div class="section-header" part="header">
                <h2 part="headline">${this.headline}</h2>
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
    'dk-section-stats-cards': DkSectionStatsCards;
  }
}
