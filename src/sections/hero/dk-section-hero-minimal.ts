import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { heroBaseStyles } from './dk-section-hero.styles.js';

const minimalStyles = css`
  :host {
    min-height: var(--dk-hero-minimal-min-height, 100vh);
    display: flex !important;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-family: var(--dk-font-serif, Georgia, serif);
    font-size: var(--dk-hero-minimal-headline-size, clamp(3rem, 8vw, 6rem));
    font-weight: var(--dk-hero-minimal-headline-weight, 400);
    letter-spacing: var(--dk-hero-minimal-headline-tracking, -0.03em);
    line-height: var(--dk-hero-minimal-headline-leading, 1.1);
    max-width: var(--dk-hero-minimal-headline-max-width, 900px);
  }

  .subheadline {
    max-width: 560px;
    font-size: var(--dk-hero-minimal-sub-size, clamp(1rem, 1.5vw, 1.25rem));
  }

  .cta-group {
    justify-content: center;
  }

  .scroll-indicator {
    position: absolute;
    bottom: var(--dk-hero-minimal-scroll-bottom, 2rem);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--dk-space-2, 0.5rem);
    color: var(--dk-color-text-muted, #6b7280);
    animation: dk-bounce 2s ease infinite;
  }

  .scroll-indicator svg {
    width: var(--dk-hero-minimal-chevron-size, 1.5rem);
    height: var(--dk-hero-minimal-chevron-size, 1.5rem);
  }

  @keyframes dk-bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
`;

@customElement('dk-section-hero-minimal')
export class DkSectionHeroMinimal extends DkSectionElement {
  static override styles = [heroBaseStyles, minimalStyles];

  @property() headline = '';
  @property() subheadline = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('h1'),
      this.shadowRoot?.querySelector('.subheadline'),
      this.shadowRoot?.querySelector('.cta-group'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container">
          <h1 class="animate-target" part="headline">${this.headline}</h1>
          ${this.subheadline
            ? html`<p class="subheadline animate-target" part="subheadline">${this.subheadline}</p>`
            : nothing}
          <div class="cta-group animate-target" part="cta-group">
            <slot name="cta-primary"></slot>
          </div>
        </div>
        <div class="scroll-indicator" part="scroll-indicator">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-hero-minimal': DkSectionHeroMinimal;
  }
}
