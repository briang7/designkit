import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { statsBaseStyles } from './dk-section-stats.styles.js';
import './dk-stat.js';

const darkStyles = css`
  :host {
    --dk-color-text: #f9fafb;
    --dk-color-text-muted: #d1d5db;
    background: var(--dk-color-dark-bg, #111827);
  }

  h2 {
    color: #f9fafb;
  }

  .stats-row {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 0;
  }

  ::slotted(dk-stat) {
    flex: 1 1 180px;
    min-width: 140px;
    padding: var(--dk-space-6, 1.5rem) var(--dk-space-8, 2rem);
    --dk-color-text: #f9fafb;
    --dk-color-text-muted: #d1d5db;
  }

  ::slotted(dk-stat:not(:last-child)) {
    border-right: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 1px 0 8px rgba(99, 102, 241, 0.15);
  }

  @media (max-width: 768px) {
    .stats-row {
      flex-direction: column;
      align-items: center;
    }

    ::slotted(dk-stat:not(:last-child)) {
      border-right: none;
      box-shadow: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    }
  }
`;

@customElement('dk-section-stats-dark')
export class DkSectionStatsDark extends DkSectionElement {
  static override styles = [statsBaseStyles, darkStyles];

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
    'dk-section-stats-dark': DkSectionStatsDark;
  }
}
