import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { categoriesBaseStyles } from './dk-section-categories.styles.js';
import './dk-category-card.js';

const scrollStyles = css`
  .track {
    display: flex;
    gap: var(--dk-space-4, 1rem);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: var(--dk-space-2, 0.5rem);
  }

  .track::-webkit-scrollbar {
    display: none;
  }

  ::slotted(dk-category-card) {
    flex: 0 0 var(--dk-category-scroll-card-width, 280px);
    scroll-snap-align: start;
    min-height: var(--dk-category-scroll-card-height, 320px);
  }

  @media (max-width: 768px) {
    ::slotted(dk-category-card) {
      flex: 0 0 240px;
    }
  }
`;

@customElement('dk-section-categories-scroll')
export class DkSectionCategoriesScroll extends DkSectionElement {
  static override styles = [categoriesBaseStyles, scrollStyles];

  @property() headline = '';
  @property() subheadline = '';

  protected override onEnterViewport() {
    const cards = Array.from(this.querySelectorAll('dk-category-card'));
    this.animateEntrance(cards);
  }

  private _snapTimer?: number;

  private _onWheel(e: WheelEvent) {
    const track = this.shadowRoot?.querySelector('.track') as HTMLElement;
    if (!track) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 5) return;
    e.preventDefault();
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
    track.scrollLeft += delta;
    clearTimeout(this._snapTimer);
    this._snapTimer = window.setTimeout(() => {
      track.style.scrollBehavior = 'smooth';
      track.style.scrollSnapType = 'x mandatory';
    }, 200);
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
          <div class="track" part="track" @wheel=${this._onWheel}>
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-categories-scroll': DkSectionCategoriesScroll;
  }
}
