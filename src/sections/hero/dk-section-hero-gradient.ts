import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { heroBaseStyles } from './dk-section-hero.styles.js';
import { applyContrastTokens } from '../../core/contrast.js';

const gradientStyles = css`
  :host {
    position: relative;
    min-height: var(--dk-hero-gradient-min-height, 100vh);
    display: flex !important;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 !important;

  }

  .gradient-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(
      -45deg,
      var(--dk-hero-gradient-color-1, #ee7752),
      var(--dk-hero-gradient-color-2, #e73c7e),
      var(--dk-hero-gradient-color-3, #23a6d5),
      var(--dk-hero-gradient-color-4, #23d5ab)
    );
    background-size: 400% 400%;
    animation: dk-gradient 15s ease infinite;
  }

  @keyframes dk-gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .container {
    position: relative;
    z-index: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--dk-section-padding-x, 1.5rem);
  }

  h1 {
    color: var(--dk-hero-gradient-text-color, #ffffff);
  }

  .subheadline {
    color: var(--dk-hero-gradient-subtext-color, rgba(255, 255, 255, 0.9));
    max-width: 640px;
  }

  .badge {
    color: var(--dk-hero-gradient-badge-color, #ffffff);
    background: var(--dk-hero-gradient-badge-bg, rgba(255, 255, 255, 0.2));
    border-color: var(--dk-hero-gradient-badge-border, rgba(255, 255, 255, 0.3));
  }

  .cta-group {
    justify-content: center;
  }
`;

@customElement('dk-section-hero-gradient')
export class DkSectionHeroGradient extends DkSectionElement {
  static override styles = [heroBaseStyles, gradientStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property() badge = '';

  override async firstUpdated() {
    await applyContrastTokens(this);
  }

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
        <div class="gradient-bg" part="gradient"></div>
        <div class="container">
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
    'dk-section-hero-gradient': DkSectionHeroGradient;
  }
}
