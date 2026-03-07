import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { dkSpring } from '../../core/motion.js';
import { testimonialsBaseStyles } from './dk-section-testimonials.styles.js';
import './dk-testimonial-card.js';

const carouselStyles = css`
  .carousel {
    position: relative;
    overflow: hidden;
  }

  .track {
    display: flex;
    transition: transform 0.5s ease;
  }

  ::slotted(dk-testimonial-card) {
    flex: 0 0 100%;
    min-width: 0;
    padding: var(--dk-space-2, 0.5rem);
    box-sizing: border-box;
  }

  @media (min-width: 1024px) {
    ::slotted(dk-testimonial-card) {
      flex: 0 0 33.333%;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    ::slotted(dk-testimonial-card) {
      flex: 0 0 50%;
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
    width: 40px;
    height: 40px;
    border-radius: var(--dk-radius-full, 9999px);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    background: var(--dk-color-surface, #ffffff);
    color: var(--dk-color-text, #111827);
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }

  .arrow:hover {
    background: var(--dk-color-neutral-50, #f9fafb);
    border-color: var(--dk-color-primary, #3b82f6);
  }

  .arrow svg {
    width: 20px;
    height: 20px;
  }

  .dots {
    display: flex;
    gap: var(--dk-space-2, 0.5rem);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: var(--dk-radius-full, 9999px);
    background: var(--dk-color-neutral-200, #e5e7eb);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: background 0.15s, transform 0.15s;
  }

  .dot[aria-current="true"] {
    background: var(--dk-color-primary, #3b82f6);
    transform: scale(1.25);
  }
`;

@customElement('dk-section-testimonials-carousel')
export class DkSectionTestimonialsCarousel extends DkSectionElement {
  static override styles = [testimonialsBaseStyles, carouselStyles];

  @property() headline = '';
  @property({ type: Boolean }) autoplay = false;
  @property({ type: Number }) interval = 5000;

  @state() private _currentIndex = 0;
  @state() private _slideCount = 0;
  private _autoplayTimer?: number;
  private _wheelDebounce = false;

  override connectedCallback() {
    super.connectedCallback();
    this._startAutoplay();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAutoplay();
  }

  private _startAutoplay() {
    if (!this.autoplay || this.interval <= 0) return;
    this._autoplayTimer = window.setInterval(() => {
      this._next();
    }, this.interval);
  }

  private _stopAutoplay() {
    if (this._autoplayTimer) {
      clearInterval(this._autoplayTimer);
      this._autoplayTimer = undefined;
    }
  }

  private _getVisibleCount(): number {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  }

  private _getMaxIndex(): number {
    const visible = this._getVisibleCount();
    return Math.max(0, this._slideCount - visible);
  }

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const elements = slot.assignedElements();
    this._slideCount = elements.length;
    if (this._currentIndex > this._getMaxIndex()) {
      this._currentIndex = 0;
    }
    this._updateTrackHeight(elements);
  }

  private _updateTrackHeight(elements: Element[]) {
    const measure = () => {
      let maxHeight = 0;
      for (const el of elements) {
        // Measure the inner .card from the testimonial-card's shadow DOM
        const card = (el as HTMLElement).shadowRoot?.querySelector('.card') as HTMLElement;
        const h = card ? card.offsetHeight : (el as HTMLElement).offsetHeight;
        if (h > maxHeight) maxHeight = h;
      }
      if (maxHeight > 0) {
        const track = this.shadowRoot?.querySelector('.track') as HTMLElement;
        if (track) {
          // Add slotted padding (top + bottom)
          const slottedPadding = parseFloat(getComputedStyle(elements[0] as HTMLElement).paddingTop) +
            parseFloat(getComputedStyle(elements[0] as HTMLElement).paddingBottom);
          track.style.minHeight = `${maxHeight + slottedPadding}px`;
        }
      }
    };
    requestAnimationFrame(() => requestAnimationFrame(measure));
  }

  private _next() {
    if (this._slideCount === 0) return;
    const max = this._getMaxIndex();
    if (this._currentIndex < max) {
      this._currentIndex++;
    } else {
      this._currentIndex = 0;
    }
    this._animateSlide();
  }

  private _prev() {
    if (this._slideCount === 0) return;
    if (this._currentIndex > 0) {
      this._currentIndex--;
    } else {
      this._currentIndex = this._getMaxIndex();
    }
    this._animateSlide();
  }

  private _goTo(index: number) {
    this._currentIndex = Math.min(index, this._getMaxIndex());
    this._animateSlide();
  }

  private _animateSlide() {
    const track = this.shadowRoot?.querySelector('.track') as HTMLElement;
    if (track) {
      const pct = this._currentIndex * (100 / this._getVisibleCount());
      dkSpring(track, {
        transform: `translateX(-${pct}%)`,
      });
    }
  }

  private _getTrackTransform(): string {
    const pct = this._currentIndex * (100 / this._getVisibleCount());
    return `translateX(-${pct}%)`;
  }

  private _onWheel(e: WheelEvent) {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 10) return;
    e.preventDefault();
    if (this._wheelDebounce) return;
    this._wheelDebounce = true;
    if (delta > 0) {
      this._next();
    } else {
      this._prev();
    }
    setTimeout(() => { this._wheelDebounce = false; }, 400);
  }


  override render() {
    const dots = [];
    const maxIdx = this._getMaxIndex();
    for (let i = 0; i <= maxIdx; i++) {
      dots.push(html`
        <button
          class="dot"
          aria-current=${i === this._currentIndex ? 'true' : 'false'}
          aria-label="Go to slide ${i + 1}"
          @click=${() => this._goTo(i)}
        ></button>
      `);
    }

    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline
            ? html`<div class="section-header" part="header">
                <h2 part="headline">${this.headline}</h2>
              </div>`
            : nothing}
          <div class="carousel" part="carousel"
            @wheel=${this._onWheel}
          >
            <div class="track" part="track" style="transform: ${this._getTrackTransform()}">
              <slot @slotchange=${this._onSlotChange}></slot>
            </div>
          </div>
          ${this._slideCount > 1
            ? html`<div class="controls" part="controls">
                <button class="arrow" part="arrow-prev" aria-label="Previous slide" @click=${this._prev}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <div class="dots" part="dots">${dots}</div>
                <button class="arrow" part="arrow-next" aria-label="Next slide" @click=${this._next}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 6 15 12 9 18"></polyline>
                  </svg>
                </button>
              </div>`
            : nothing}
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-testimonials-carousel': DkSectionTestimonialsCarousel;
  }
}
