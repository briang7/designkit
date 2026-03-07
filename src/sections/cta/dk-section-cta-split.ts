import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { ctaBaseStyles } from './dk-section-cta.styles.js';

const splitStyles = css`
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dk-space-12, 3rem);
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .media {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .media ::slotted(*) {
    max-width: 100%;
    height: auto;
    border-radius: var(--dk-radius-lg, 0.75rem);
  }

  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
      gap: var(--dk-space-8, 2rem);
    }

    .content {
      text-align: center;
    }

    .cta-group {
      justify-content: center;
    }

    .media {
      order: -1;
    }
  }
`;

@customElement('dk-section-cta-split')
export class DkSectionCtaSplit extends DkSectionElement {
  static override styles = [ctaBaseStyles, splitStyles];

  @property() headline = '';
  @property() description = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('h2'),
      this.shadowRoot?.querySelector('.description'),
      this.shadowRoot?.querySelector('.cta-group'),
      this.shadowRoot?.querySelector('.media'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          <div class="content" part="content">
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
          <div class="media animate-target" part="media">
            <slot name="media"></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-cta-split': DkSectionCtaSplit;
  }
}
