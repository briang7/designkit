import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { galleryBaseStyles } from './dk-section-gallery.styles.js';
import './dk-gallery-item.js';

const carouselStyles = css`
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

  ::slotted(dk-gallery-item) {
    flex: 0 0 300px;
    scroll-snap-align: start;
  }

  @media (max-width: 768px) {
    ::slotted(dk-gallery-item) {
      flex: 0 0 260px;
    }
  }
`;

@customElement('dk-section-gallery-carousel')
export class DkSectionGalleryCarousel extends DkSectionElement {
  static override styles = [galleryBaseStyles, carouselStyles];

  @property() headline = '';

  private _isDragging = false;
  private _startX = 0;
  private _scrollLeft = 0;

  private get _track(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.track') as HTMLElement | null;
  }

  private _onPointerDown = (e: PointerEvent) => {
    const track = this._track;
    if (!track) return;
    this._isDragging = true;
    this._startX = e.pageX - track.offsetLeft;
    this._scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
    track.setPointerCapture(e.pointerId);
  };

  private _onPointerMove = (e: PointerEvent) => {
    if (!this._isDragging) return;
    const track = this._track;
    if (!track) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - this._startX) * 1.5;
    track.scrollLeft = this._scrollLeft - walk;
  };

  private _onPointerUp = () => {
    this._isDragging = false;
    const track = this._track;
    if (track) track.style.cursor = 'grab';
  };

  protected override onEnterViewport() {
    const items = Array.from(this.querySelectorAll('dk-gallery-item'));
    this.animateEntrance(items);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline
            ? html`<div class="section-header"><h2 part="headline">${this.headline}</h2></div>`
            : nothing}
          <div
            class="track"
            part="track"
            style="cursor: grab"
            @pointerdown=${this._onPointerDown}
            @pointermove=${this._onPointerMove}
            @pointerup=${this._onPointerUp}
            @pointerleave=${this._onPointerUp}
          >
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-gallery-carousel': DkSectionGalleryCarousel;
  }
}
