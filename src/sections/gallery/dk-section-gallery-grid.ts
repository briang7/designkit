import { html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { galleryBaseStyles } from './dk-section-gallery.styles.js';
import './dk-gallery-item.js';
import '../../components/lightbox/dk-lightbox.js';
import type { DkLightbox, LightboxImage } from '../../components/lightbox/dk-lightbox.js';

const gridStyles = css`
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--dk-gallery-columns, 3), 1fr);
    gap: var(--dk-space-4, 1rem);
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;

@customElement('dk-section-gallery-grid')
export class DkSectionGalleryGrid extends DkSectionElement {
  static override styles = [galleryBaseStyles, gridStyles];

  @property() headline = '';
  @property({ type: Number }) columns = 3;

  @query('dk-lightbox') private _lightbox!: DkLightbox;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('dk-gallery-select', this._handleSelect as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dk-gallery-select', this._handleSelect as EventListener);
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
          <div class="grid" part="grid" style="--dk-gallery-columns: ${this.columns}">
            <slot></slot>
          </div>
        </div>
      </section>
      <dk-lightbox @dk-lightbox-close=${this._handleLightboxClose}></dk-lightbox>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-gallery-grid': DkSectionGalleryGrid;
  }
}
