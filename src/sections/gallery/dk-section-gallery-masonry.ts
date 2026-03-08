import { html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { galleryBaseStyles } from './dk-section-gallery.styles.js';
import './dk-gallery-item.js';
import '../../components/lightbox/dk-lightbox.js';
import type { DkLightbox, LightboxImage } from '../../components/lightbox/dk-lightbox.js';

const masonryStyles = css`
  .masonry {
    column-count: var(--dk-masonry-columns, 3);
    column-gap: var(--dk-space-6, 1.5rem);
  }

  .masonry ::slotted(*) {
    break-inside: avoid;
    margin-bottom: var(--dk-space-6, 1.5rem);
    display: block;
    --dk-gallery-item-ratio: auto;
  }

  @media (max-width: 1024px) {
    .masonry {
      column-count: 2;
    }
  }

  @media (max-width: 768px) {
    .masonry {
      column-count: 1;
    }
  }
`;

@customElement('dk-section-gallery-masonry')
export class DkSectionGalleryMasonry extends DkSectionElement {
  static override styles = [galleryBaseStyles, masonryStyles];

  @property() headline = '';
  @property({ type: Number }) columns = 3;

  @query('dk-lightbox') private _lightbox!: DkLightbox;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('dk-gallery-select', this._handleSelect as EventListener);
    requestAnimationFrame(() => this._adjustColumns());
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dk-gallery-select', this._handleSelect as EventListener);
  }

  private _adjustColumns() {
    const items = this.querySelectorAll('dk-gallery-item');
    const count = items.length;
    // Use user-specified columns, but auto-reduce if too few items
    let cols = this.columns;
    if (count < 5 && cols >= 3) cols = 2;
    if (count < 3) cols = 1;
    this.style.setProperty('--dk-masonry-columns', String(cols));
  }

  override updated(changed: Map<PropertyKey, unknown>) {
    super.updated(changed);
    if (changed.has('columns')) {
      this._adjustColumns();
    }
  }

  private _getImages(): LightboxImage[] {
    const items = Array.from(this.querySelectorAll('dk-gallery-item'));
    return items.map(item => ({ src: item.src, alt: item.alt, caption: item.caption }));
  }

  private _handleSelect = (e: CustomEvent<LightboxImage>) => {
    const images = this._getImages();
    const idx = images.findIndex(img => img.src === e.detail.src);
    this.style.zIndex = '99999';
    this.style.position = 'relative';
    this._lightbox.open(images, idx >= 0 ? idx : 0);
  };

  private _handleLightboxClose = () => {
    this.style.zIndex = '';
    this.style.position = '';
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
          <div class="masonry" part="masonry">
            <slot @slotchange=${this._adjustColumns}></slot>
          </div>
        </div>
      </section>
      <dk-lightbox @dk-lightbox-close=${this._handleLightboxClose}></dk-lightbox>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-gallery-masonry': DkSectionGalleryMasonry;
  }
}
