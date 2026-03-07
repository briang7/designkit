import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

const styles = css`
  :host {
    display: block;
  }

  .item {
    position: relative;
    overflow: hidden;
    border-radius: var(--dk-radius-lg, 0.75rem);
    cursor: pointer;
    aspect-ratio: 4/3;
  }

  .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    display: block;
  }

  .item:hover img {
    transform: scale(1.05);
  }

  .caption-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--dk-space-4, 1rem);
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    color: #ffffff;
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .item:hover .caption-overlay {
    transform: translateY(0);
  }
`;

@customElement('dk-gallery-item')
export class DkGalleryItem extends DkElement {
  static override styles = styles;

  @property() src = '';
  @property() alt = '';
  @property() caption = '';

  private _handleClick() {
    this.emitEvent('dk-gallery-select', { src: this.src, alt: this.alt, caption: this.caption });
  }

  override render() {
    return html`
      <div class="item" part="item" @click=${this._handleClick}>
        <img src=${this.src} alt=${this.alt} loading="lazy" part="image" />
        ${this.caption
          ? html`<div class="caption-overlay" part="caption">${this.caption}</div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-gallery-item': DkGalleryItem;
  }
}
