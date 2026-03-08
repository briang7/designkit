import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { logoCloudBaseStyles } from './dk-section-logo-cloud.styles.js';

const simpleStyles = css`
  .container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    font-size: var(--dk-font-size-subheadline, clamp(1.125rem, 2vw, 1.375rem));
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text-muted, #6b7280);
    letter-spacing: 0;
    text-transform: uppercase;
    font-size: var(--dk-logo-cloud-headline-size, 0.875rem);
    letter-spacing: var(--dk-logo-cloud-headline-tracking, 0.1em);
    margin-bottom: var(--dk-space-8, 2rem);
  }

  .logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: var(--dk-logo-cloud-gap, 3rem);
    width: 100%;
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
    .logos {
      gap: var(--dk-logo-cloud-gap-mobile, 2rem);
    }
  }
`;

@customElement('dk-section-logo-cloud-simple')
export class DkSectionLogoCloudSimple extends DkSectionElement {
  static override styles = [logoCloudBaseStyles, simpleStyles];

  @property() headline = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('h2'),
      this.shadowRoot?.querySelector('.logos'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline
            ? html`<h2 class="animate-target" part="headline">${this.headline}</h2>`
            : nothing}
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
    'dk-section-logo-cloud-simple': DkSectionLogoCloudSimple;
  }
}
