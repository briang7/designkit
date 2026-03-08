import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { featuresBaseStyles } from './dk-section-features.styles.js';
import './dk-feature-card.js';

const withImageStyles = css`
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dk-space-12, 3rem);
    align-items: center;
  }

  .media {
    position: relative;
  }

  .media img {
    width: 100%;
    height: auto;
    border-radius: var(--dk-radius-xl, 1rem);
    box-shadow: var(--dk-shadow-lg, 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1));
    object-fit: cover;
  }

  .features {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-6, 1.5rem);
  }

  ::slotted(dk-feature-card) {
    --dk-feature-card-shadow: none;
    --dk-feature-card-border: none;
    --dk-feature-card-padding: var(--dk-space-4, 1rem);
  }

  @media (max-width: 768px) {
    .layout {
      grid-template-columns: 1fr;
    }

    .media {
      order: -1;
    }
  }
`;

@customElement('dk-section-features-with-image')
export class DkSectionFeaturesWithImage extends DkSectionElement {
  static override styles = [featuresBaseStyles, withImageStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property() image = '';

  protected override onEnterViewport() {
    const targets = Array.from(
      this.renderRoot.querySelectorAll('.animate-target')
    );
    const cards = Array.from(
      this.querySelectorAll('dk-feature-card')
    );
    this.animateEntrance([...targets, ...cards]);
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
          <div class="layout" part="layout">
            <div class="media animate-target" part="media">
              <slot name="media">
                ${this.image
                  ? html`<img src=${this.image} alt="" part="image" loading="lazy" />`
                  : nothing}
              </slot>
            </div>
            <div class="features" part="features">
              <slot></slot>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-features-with-image': DkSectionFeaturesWithImage;
  }
}
