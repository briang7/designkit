import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { ctaBaseStyles } from './dk-section-cta.styles.js';

const imageStyles = css`
  :host {
    position: relative;
    overflow: hidden;

    /* Override button tokens so slotted buttons are visible on dark overlay */
    --dk-color-text: #ffffff;
    --dk-color-surface: rgba(255, 255, 255, 0.9);
    --dk-color-ghost-hover-text: #111827;
    --dk-color-border: rgba(255, 255, 255, 0.25);
    --dk-color-border-hover: rgba(255, 255, 255, 0.4);
  }

  .bg-image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    color: #ffffff;
  }

  .description {
    color: rgba(255, 255, 255, 0.85);
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-group {
    justify-content: center;
  }
`;

@customElement('dk-section-cta-with-image')
export class DkSectionCtaWithImage extends DkSectionElement {
  static override styles = [ctaBaseStyles, imageStyles];

  @property() headline = '';
  @property() description = '';
  @property() image = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('h2'),
      this.shadowRoot?.querySelector('.description'),
      this.shadowRoot?.querySelector('.cta-group'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div
          class="bg-image"
          part="bg-image"
          style="background-image: url('${this.image}')"
        ></div>
        <div class="overlay" part="overlay"></div>
        <div class="container" part="container">
          ${this.headline
            ? html`<h2 class="animate-target" part="headline">${this.headline}</h2>`
            : nothing}
          ${this.description
            ? html`<p class="description animate-target" part="description">${this.description}</p>`
            : nothing}
          <div class="cta-group animate-target" part="cta-group">
            <slot name="cta"></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-cta-with-image': DkSectionCtaWithImage;
  }
}
