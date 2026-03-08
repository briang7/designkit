import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { productsBaseStyles } from './dk-section-products.styles.js';
import './dk-product-card.js';

const carouselStyles = css`
  .carousel {
    position: relative;
    overflow: hidden;
  }

  .track {
    display: flex;
    gap: var(--dk-space-6, 1.5rem);
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

  ::slotted(dk-product-card) {
    flex: 0 0 calc(25% - var(--dk-space-6, 1.5rem) * 3 / 4);
    min-width: 240px;
    scroll-snap-align: start;
  }

  @media (max-width: 1024px) {
    ::slotted(dk-product-card) {
      flex: 0 0 calc(50% - var(--dk-space-6, 1.5rem) / 2);
    }
  }

  @media (max-width: 640px) {
    ::slotted(dk-product-card) {
      flex: 0 0 85%;
    }
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--dk-space-4, 1rem);
    margin-top: var(--dk-space-8, 2rem);
  }

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: var(--dk-radius-full, 9999px);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    background: var(--dk-color-surface, #ffffff);
    color: var(--dk-color-text, #111827);
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
  }

  .arrow:hover {
    background: var(--dk-color-neutral-50, #f9fafb);
    border-color: var(--dk-color-primary, #3b82f6);
    box-shadow: var(--dk-shadow-sm, 0 1px 3px rgba(0,0,0,0.08));
  }

  .arrow:active {
    transform: scale(0.95);
  }

  .arrow:disabled {
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
  }

  .arrow svg {
    width: 20px;
    height: 20px;
  }

  :host([bg="brand"]) .arrow,
  :host([bg="dark"]) .arrow {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.25);
    color: #ffffff;
  }

  :host([bg="brand"]) .arrow:hover,
  :host([bg="dark"]) .arrow:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

@customElement('dk-section-products-carousel')
export class DkSectionProductsCarousel extends DkSectionElement {
  static override styles = [productsBaseStyles, carouselStyles];

  @property() headline = '';
  @property() subheadline = '';

  @state() private _canScrollLeft = false;
  @state() private _canScrollRight = true;

  private _track: HTMLElement | null = null;
  private _snapTimer?: number;

  protected override onEnterViewport() {
    const cards = Array.from(
      this.querySelectorAll('dk-product-card')
    );
    this.animateEntrance(cards);
  }

  override firstUpdated() {
    this._track = this.shadowRoot?.querySelector('.track') as HTMLElement;
    if (this._track) {
      this._track.addEventListener('scroll', this._onScroll.bind(this), { passive: true });
      requestAnimationFrame(() => this._updateScrollButtons());
    }
  }

  private _onScroll() {
    this._updateScrollButtons();
  }

  private _onWheel(e: WheelEvent) {
    if (!this._track) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 5) return;
    e.preventDefault();
    this._track.style.scrollSnapType = 'none';
    this._track.style.scrollBehavior = 'auto';
    this._track.scrollLeft += delta;
    clearTimeout(this._snapTimer);
    this._snapTimer = window.setTimeout(() => {
      if (!this._track) return;
      this._track.style.scrollBehavior = 'smooth';
      this._track.style.scrollSnapType = 'x mandatory';
    }, 200);
  }

  private _updateScrollButtons() {
    if (!this._track) return;
    const { scrollLeft, scrollWidth, clientWidth } = this._track;
    this._canScrollLeft = scrollLeft > 2;
    this._canScrollRight = scrollLeft + clientWidth < scrollWidth - 2;
  }

  private _scrollPrev() {
    if (!this._track) return;
    const scrollAmount = this._track.clientWidth * 0.8;
    this._track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }

  private _scrollNext() {
    if (!this._track) return;
    const scrollAmount = this._track.clientWidth * 0.8;
    this._track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  private _onSlotChange() {
    requestAnimationFrame(() => this._updateScrollButtons());
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
          <div class="carousel" part="carousel">
            <div class="track" part="track" @wheel=${this._onWheel}>
              <slot @slotchange=${this._onSlotChange}></slot>
            </div>
          </div>
          <div class="controls" part="controls">
            <button
              class="arrow"
              part="prev-btn"
              aria-label="Previous products"
              ?disabled=${!this._canScrollLeft}
              @click=${this._scrollPrev}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              class="arrow"
              part="next-btn"
              aria-label="Next products"
              ?disabled=${!this._canScrollRight}
              @click=${this._scrollNext}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 6 15 12 9 18"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-products-carousel': DkSectionProductsCarousel;
  }
}
