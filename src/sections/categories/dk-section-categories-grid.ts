import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { categoriesBaseStyles } from './dk-section-categories.styles.js';
import './dk-category-card.js';

const gridStyles = css`
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--dk-categories-columns, 3), 1fr);
    grid-auto-rows: minmax(200px, 1fr);
    gap: var(--dk-space-6, 1.5rem);
  }

  /* First card spans 2 rows for visual hierarchy — only when enough items */
  :host([data-has-rows]) ::slotted(dk-category-card:first-child) {
    grid-row: span 2;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
    }

    :host([data-has-rows]) ::slotted(dk-category-card:first-child) {
      grid-row: span 1;
    }
  }
`;

@customElement('dk-section-categories-grid')
export class DkSectionCategoriesGrid extends DkSectionElement {
  static override styles = [categoriesBaseStyles, gridStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property({ type: Number }) columns = 3;

  private _adjustLayout() {
    const cards = this.querySelectorAll('dk-category-card');
    const count = cards.length;
    const cols = this.columns;
    // Only enable first-child span 2 rows if there are enough items
    // to fill at least 2 rows in the remaining columns
    // e.g., 3 cols: first takes 2 rows, need at least cols*2 - 1 = 5 items
    const minForSpan = cols * 2 - 1;
    if (count >= minForSpan) {
      this.setAttribute('data-has-rows', '');
    } else {
      this.removeAttribute('data-has-rows');
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    requestAnimationFrame(() => this._adjustLayout());
  }

  protected override onEnterViewport() {
    const cards = Array.from(this.querySelectorAll('dk-category-card'));
    this.animateEntrance(cards);
  }

  override updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has('columns')) {
      this.style.setProperty('--dk-categories-columns', String(this.columns));
      this._adjustLayout();
    }
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
            <slot @slotchange=${this._adjustLayout}></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-categories-grid': DkSectionCategoriesGrid;
  }
}
