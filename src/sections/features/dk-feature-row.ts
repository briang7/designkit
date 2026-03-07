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
  @property() title = '';
  @property() description = '';

  override render() {
    return html`
      <div class="row" part="row">
        <div class="media" part="media">
          ${this.image
            ? html`<img src=${this.image} alt=${this.title} loading="lazy" />`
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
