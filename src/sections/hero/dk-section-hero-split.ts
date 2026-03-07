import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { heroBaseStyles } from './dk-section-hero.styles.js';

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

@customElement('dk-section-hero-split')
export class DkSectionHeroSplit extends DkSectionElement {
  static override styles = [heroBaseStyles, splitStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property() badge = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('.badge'),
      this.shadowRoot?.querySelector('h1'),
      this.shadowRoot?.querySelector('.subheadline'),
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
    'dk-section-hero-split': DkSectionHeroSplit;
  }
}
