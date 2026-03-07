import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { galleryBaseStyles } from './dk-section-gallery.styles.js';
import './dk-gallery-item.js';

const gridStyles = css`
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--dk-space-4, 1rem);
  }

  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.9);
  }

  .lightbox-close {
    position: absolute;
    top: var(--dk-space-4, 1rem);
    right: var(--dk-space-4, 1rem);
    background: none;
    border: none;
    color: #ffffff;
    font-size: 2rem;
    cursor: pointer;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .lightbox-img {
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    border-radius: var(--dk-radius-lg, 0.75rem);
  }

  .lightbox-caption {
    position: absolute;
    bottom: var(--dk-space-6, 1.5rem);
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    text-align: center;
    max-width: 600px;
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: #ffffff;
    font-size: 1.5rem;
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: var(--dk-radius-full, 9999px);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease;
  }

  .lightbox-nav:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .lightbox-prev { left: var(--dk-space-4, 1rem); }
  .lightbox-next { right: var(--dk-space-4, 1rem); }
`;

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

@customElement('dk-section-gallery-grid')
export class DkSectionGalleryGrid extends DkSectionElement {
  static override styles = [galleryBaseStyles, gridStyles];

  @property() headline = '';
  @property({ type: Number }) columns = 3;

  @state() private _lightboxOpen = false;
  @state() private _lightboxIndex = 0;

  private _images: GalleryImage[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('dk-gallery-select', this._handleSelect as EventListener);
    this.addEventListener('keydown', this._handleKeydown as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dk-gallery-select', this._handleSelect as EventListener);
    this.removeEventListener('keydown', this._handleKeydown as EventListener);
  }

  private _getImages(): GalleryImage[] {
    const items = Array.from(this.querySelectorAll('dk-gallery-item'));
    return items.map(item => ({ src: item.src, alt: item.alt, caption: item.caption }));
  }

  private _handleSelect = (e: CustomEvent<GalleryImage>) => {
    this._images = this._getImages();
    const idx = this._images.findIndex(img => img.src === e.detail.src);
    this._lightboxIndex = idx >= 0 ? idx : 0;
    this._lightboxOpen = true;
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (!this._lightboxOpen) return;
    if (e.key === 'Escape') this._closeLightbox();
    if (e.key === 'ArrowRight') this._next();
    if (e.key === 'ArrowLeft') this._prev();
  };

  private _closeLightbox() { this._lightboxOpen = false; }
  private _prev() { this._lightboxIndex = (this._lightboxIndex - 1 + this._images.length) % this._images.length; }
  private _next() { this._lightboxIndex = (this._lightboxIndex + 1) % this._images.length; }

  protected override onEnterViewport() {
    const items = Array.from(this.querySelectorAll('dk-gallery-item'));
    this.animateEntrance(items);
  }

  private _renderLightbox() {
    if (!this._lightboxOpen || this._images.length === 0) return nothing;
    const img = this._images[this._lightboxIndex];
    return html`
      <div class="lightbox" part="lightbox" @click=${this._closeLightbox}>
        <button class="lightbox-close" @click=${this._closeLightbox} aria-label="Close">&times;</button>
        ${this._images.length > 1
          ? html`
              <button class="lightbox-nav lightbox-prev" @click=${(e: Event) => { e.stopPropagation(); this._prev(); }} aria-label="Previous">&#8249;</button>
              <button class="lightbox-nav lightbox-next" @click=${(e: Event) => { e.stopPropagation(); this._next(); }} aria-label="Next">&#8250;</button>
            `
          : nothing}
        <img class="lightbox-img" src=${img.src} alt=${img.alt} @click=${(e: Event) => e.stopPropagation()} />
        ${img.caption ? html`<div class="lightbox-caption">${img.caption}</div>` : nothing}
      </div>
    `;
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline
            ? html`<div class="section-header"><h2 part="headline">${this.headline}</h2></div>`
            : nothing}
          <div class="grid" part="grid" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))">
            <slot></slot>
          </div>
        </div>
      </section>
      ${this._renderLightbox()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-gallery-grid': DkSectionGalleryGrid;
  }
}
