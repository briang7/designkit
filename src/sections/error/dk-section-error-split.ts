import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { errorBaseStyles } from './dk-section-error.styles.js';

const splitStyles = css`
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dk-space-12, 3rem);
    align-items: center;
    min-height: calc(100vh - 200px);
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin-bottom: var(--dk-space-2, 0.5rem);
  }

  .media {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .media ::slotted(*) {
    max-width: 100%;
    height: auto;
  }

  .media img {
    max-width: 100%;
    height: auto;
    border-radius: var(--dk-radius-lg, 0.75rem);
  }

  .fallback-svg {
    width: 100%;
    max-width: 400px;
    height: auto;
  }

  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
      gap: var(--dk-space-8, 2rem);
      min-height: auto;
    }

    .content {
      text-align: center;
    }

    h1 {
      font-size: clamp(3rem, 8vw, 5rem);
    }

    .cta-group {
      justify-content: center;
    }

    .media {
      order: -1;
    }
  }
`;

@customElement('dk-section-error-split')
export class DkSectionErrorSplit extends DkSectionElement {
  static override styles = [errorBaseStyles, splitStyles];

  @property() code = '404';
  @property() headline = 'Page not found';
  @property() description = "Sorry, we couldn't find the page you're looking for.";
  @property() image = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('h1'),
      this.shadowRoot?.querySelector('h2'),
      this.shadowRoot?.querySelector('.description'),
      this.shadowRoot?.querySelector('.cta-group'),
      this.shadowRoot?.querySelector('.media'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  private renderFallbackSvg() {
    return html`
      <svg class="fallback-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Broken page illustration -->
        <rect x="100" y="30" width="200" height="240" rx="12" stroke="var(--dk-color-primary, #3b82f6)" stroke-width="2" stroke-dasharray="8 4" fill="none" opacity="0.3" />
        <circle cx="200" cy="120" r="40" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" stroke="var(--dk-color-primary, #3b82f6)" stroke-width="2" />
        <line x1="175" y1="105" x2="215" y2="135" stroke="var(--dk-color-primary, #3b82f6)" stroke-width="3" stroke-linecap="round" />
        <line x1="215" y1="105" x2="175" y2="135" stroke="var(--dk-color-primary, #3b82f6)" stroke-width="3" stroke-linecap="round" />
        <rect x="140" y="185" width="120" height="8" rx="4" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" />
        <rect x="160" y="205" width="80" height="8" rx="4" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" />
        <circle cx="80" cy="60" r="8" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" />
        <circle cx="320" cy="240" r="12" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" />
        <circle cx="340" cy="80" r="6" fill="var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1))" />
      </svg>
    `;
  }

  private renderMedia() {
    if (this.image) {
      return html`<img src=${this.image} alt="Error illustration" part="image" />`;
    }
    return this.renderFallbackSvg();
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          <div class="content" part="content">
            <h1 class="animate-target" part="code">${this.code}</h1>
            <h2 class="animate-target" part="headline">${this.headline}</h2>
            <p class="description animate-target" part="description">${this.description}</p>
            <div class="cta-group animate-target" part="cta-group">
              <slot name="cta"></slot>
            </div>
          </div>
          <div class="media animate-target" part="media">
            <slot name="media">${this.renderMedia()}</slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-error-split': DkSectionErrorSplit;
  }
}
