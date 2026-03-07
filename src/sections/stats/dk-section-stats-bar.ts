import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { statsBaseStyles } from './dk-section-stats.styles.js';
import './dk-stat.js';

const barStyles = css`
  .stats-row {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: var(--dk-space-8, 2rem);
  }

  ::slotted(dk-stat) {
    flex: 1 1 150px;
    min-width: 120px;
  }
`;

@customElement('dk-section-stats-bar')
export class DkSectionStatsBar extends DkSectionElement {
  static override styles = [statsBaseStyles, barStyles];

  @property() headline = '';

  protected override onEnterViewport() {
    // dk-stat handles its own count-up animation via ScrollObserver
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
          <div class="stats-row" part="stats-row">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-stats-bar': DkSectionStatsBar;
  }
}
