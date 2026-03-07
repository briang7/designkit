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

  protected override onEnterViewport() {
    const items = Array.from(this.querySelectorAll('dk-gallery-item'));
    this.animateEntrance(items);
  }

  private _onWheel(e: WheelEvent) {
    const track = this.shadowRoot?.querySelector('.track') as HTMLElement;
    if (!track) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 5) return;
    e.preventDefault();
    // Disable snap and smooth scroll during gesture so they don't fight the input
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
    track.scrollLeft += delta;
    // Re-enable after gesture settles
    clearTimeout(this._snapTimer);
    this._snapTimer = window.setTimeout(() => {
      track.style.scrollBehavior = 'smooth';
      track.style.scrollSnapType = 'x mandatory';
    }, 200);
  }

  private _snapTimer?: number;

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline
            ? html`<div class="section-header"><h2 part="headline">${this.headline}</h2></div>`
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
    'dk-section-gallery-carousel': DkSectionGalleryCarousel;
  }
}
