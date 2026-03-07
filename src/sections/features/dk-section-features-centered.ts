import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { featuresBaseStyles } from './dk-section-features.styles.js';
import './dk-feature-card.js';

const centeredStyles = css`
  .layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--dk-space-12, 3rem);
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  .image-wrapper ::slotted(*) {
    max-width: 100%;
    height: auto;
    border-radius: var(--dk-radius-xl, 1rem);
    box-shadow: var(--dk-shadow-xl, 0 20px 25px -5px rgba(0,0,0,.1));
  }

  .features-ring {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--dk-space-8, 2rem);
    width: 100%;
  }

  @media (max-width: 1024px) {
    .features-ring {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .features-ring {
      grid-template-columns: 1fr;
    }
  }
`;

@customElement('dk-section-features-centered')
export class DkSectionFeaturesCentered extends DkSectionElement {
  static override styles = [featuresBaseStyles, centeredStyles];

  @property() headline = '';
  @property() subheadline = '';

  protected override onEnterViewport() {
    const cards = Array.from(
      this.querySelectorAll('dk-feature-card')
    );
    this.animateEntrance(cards);
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
            <div class="image-wrapper" part="image-wrapper">
              <slot name="image"></slot>
            </div>
            <div class="features-ring" part="features-ring">
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
    'dk-section-features-centered': DkSectionFeaturesCentered;
  }
}
