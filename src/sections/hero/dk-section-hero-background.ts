import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { heroBaseStyles } from './dk-section-hero.styles.js';
import { applyContrastTokens } from '../../core/contrast.js';

const bgStyles = css`
  :host {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    overflow: hidden;

  }

  section {
    width: 100%;
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
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.55) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--dk-section-padding-y, 5rem) var(--dk-section-padding-x, 1.5rem);
    width: 100%;
    max-width: var(--dk-section-max-width, 1200px);
    margin: 0 auto;
  }

  h1 {
    color: #fff;
  }

  .subheadline {
    color: rgba(255, 255, 255, 0.85);
    max-width: 640px;
  }

  .badge {
    color: #fff;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.25);
  }

  .cta-group {
    justify-content: center;
  }
`;

@customElement('dk-section-hero-background')
export class DkSectionHeroBackground extends DkSectionElement {
  static override styles = [heroBaseStyles, bgStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property() badge = '';
  @property() image = '';

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
        ${this.image
          ? html`<div class="bg-image" part="bg-image" style="background-image: url('${this.image}')"></div>`
          : nothing}
        <div class="overlay" part="overlay"></div>
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
    'dk-section-hero-background': DkSectionHeroBackground;
  }
}
