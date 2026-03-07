import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { heroBaseStyles } from './dk-section-hero.styles.js';

const centeredStyles = css`
  .container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .subheadline {
    max-width: 640px;
  }

  .cta-group {
    justify-content: center;
  }
`;

@customElement('dk-section-hero-centered')
export class DkSectionHeroCentered extends DkSectionElement {
  static override styles = [heroBaseStyles, centeredStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property() badge = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('.badge'),
      this.shadowRoot?.querySelector('h1'),
      this.shadowRoot?.querySelector('.subheadline'),
      this.shadowRoot?.querySelector('.cta-group'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.badge
            ? html`<span class="badge animate-target" part="badge">${this.badge}</span>`
            : nothing}
          <h1 class="animate-target" part="headline">${this.headline}</h1>
          ${this.subheadline
            ? html`<p class="subheadline animate-target" part="subheadline">${this.subheadline}</p>`
            : nothing}
          <div class="cta-group animate-target" part="cta-group">
            <slot name="cta-primary"></slot>
            <slot name="cta-secondary"></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-hero-centered': DkSectionHeroCentered;
  }
}
