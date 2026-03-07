import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { ctaBaseStyles } from './dk-section-cta.styles.js';

const centeredStyles = css`
  .container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .description {
    max-width: 640px;
  }

  .cta-group {
    justify-content: center;
  }
`;

@customElement('dk-section-cta-centered')
export class DkSectionCtaCentered extends DkSectionElement {
  static override styles = [ctaBaseStyles, centeredStyles];

  @property() headline = '';
  @property() description = '';

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
    'dk-section-cta-centered': DkSectionCtaCentered;
  }
}
