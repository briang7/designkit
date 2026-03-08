import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

const styles = css`
  :host {
    display: block;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dk-space-12, 3rem);
    align-items: center;
  }

  /* When no image/media, go full width content */
  :host([data-no-media]) .row {
    grid-template-columns: 1fr;
  }

  :host([data-no-media]) .media {
    display: none;
  }

  :host([reverse]) .row {
    direction: rtl;
  }

  :host([reverse]) .row > * {
    direction: ltr;
  }

  .media img,
  .media ::slotted(*) {
    max-width: 100%;
    height: auto;
    border-radius: var(--dk-radius-lg, 0.75rem);
  }

  .media img {
    display: block;
    width: 100%;
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-4, 1rem);
  }

  h3 {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-xl, 1.5rem);
    font-weight: var(--dk-font-bold, 700);
    color: var(--dk-color-text, #111827);
    margin: 0;
    line-height: var(--dk-leading-tight, 1.3);
  }

  p {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-base, 1rem);
    line-height: var(--dk-leading-relaxed, 1.6);
    color: var(--dk-color-text-muted, #6b7280);
    margin: 0;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: var(--dk-radius-xl, 1rem);
    background: var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1));
    color: var(--dk-color-primary, #3b82f6);
  }

  .icon-container svg {
    width: 32px;
    height: 32px;
  }

  .cta-wrapper {
    display: flex;
    gap: var(--dk-space-3, 0.75rem);
  }

  @media (max-width: 768px) {
    .row {
      grid-template-columns: 1fr;
      gap: var(--dk-space-6, 1.5rem);
    }

    :host([reverse]) .row {
      direction: ltr;
    }
  }
`;

@customElement('dk-feature-row')
export class DkFeatureRow extends DkElement {
  static override styles = styles;

  @property() image = '';
  @property() icon = '';
  @property() title = '';
  @property() description = '';

  override connectedCallback() {
    super.connectedCallback();
    this._checkMedia();
  }

  override updated() {
    this._checkMedia();
  }

  private _checkMedia() {
    const hasMedia = !!this.image || !!this.icon;
    if (hasMedia) {
      this.removeAttribute('data-no-media');
    } else {
      // Check if media slot has content
      const mediaSlot = this.querySelector('[slot="media"]');
      if (mediaSlot) {
        this.removeAttribute('data-no-media');
      } else {
        this.setAttribute('data-no-media', '');
      }
    }
  }

  override render() {
    return html`
      <div class="row" part="row">
        <div class="media" part="media">
          ${this.image
            ? html`<img src=${this.image} alt=${this.title} loading="lazy" />`
            : this.icon
              ? html`<div class="icon-container" part="icon-container">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                  </svg>
                </div>`
              : html`<slot name="media"></slot>`}
        </div>
        <div class="content" part="content">
          <h3 part="title">${this.title}</h3>
          ${this.description
            ? html`<p part="description">${this.description}</p>`
            : nothing}
          <div class="cta-wrapper" part="cta">
            <slot name="cta"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-feature-row': DkFeatureRow;
  }
}
