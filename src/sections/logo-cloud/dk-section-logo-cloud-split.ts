import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { logoCloudBaseStyles } from './dk-section-logo-cloud.styles.js';

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

  .cta-group {
    display: flex;
    gap: var(--dk-space-3, 0.75rem);
    flex-wrap: wrap;
    margin-top: var(--dk-space-6, 1.5rem);
  }

  .logos {
    display: grid;
    grid-template-columns: repeat(var(--dk-logo-cloud-split-columns, 3), 1fr);
    gap: var(--dk-logo-cloud-split-gap, 2rem);
    align-items: center;
    justify-items: center;
  }

  .logos ::slotted(*) {
    filter: grayscale(var(--dk-logo-cloud-grayscale, 100%));
    opacity: var(--dk-logo-cloud-opacity, 0.6);
    transition: filter var(--dk-logo-cloud-transition, 0.3s ease),
                opacity var(--dk-logo-cloud-transition, 0.3s ease);
    max-height: var(--dk-logo-cloud-logo-height, 40px);
    width: auto;
  }

  .logos ::slotted(*:hover) {
    filter: grayscale(0%);
    opacity: 1;
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

    .logos {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

@customElement('dk-section-logo-cloud-split')
export class DkSectionLogoCloudSplit extends DkSectionElement {
  static override styles = [logoCloudBaseStyles, splitStyles];

  @property() headline = '';
  @property() description = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('.content'),
      this.shadowRoot?.querySelector('.logos'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          <div class="content animate-target" part="content">
            ${this.headline
              ? html`<h2 part="headline">${this.headline}</h2>`
              : nothing}
            ${this.description
              ? html`<p class="description" part="description">${this.description}</p>`
              : nothing}
            <div class="cta-group" part="cta-group">
              <slot name="cta"></slot>
            </div>
          </div>
          <div class="logos animate-target" part="logos">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-logo-cloud-split': DkSectionLogoCloudSplit;
  }
}
