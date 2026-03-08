import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { errorBaseStyles } from './dk-section-error.styles.js';

const simpleStyles = css`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: calc(100vh - 200px);
  }

  h1 {
    letter-spacing: -0.05em;
    margin-bottom: var(--dk-space-4, 1rem);
  }

  .description {
    max-width: 480px;
  }

  .cta-group {
    justify-content: center;
  }
`;

@customElement('dk-section-error-simple')
export class DkSectionErrorSimple extends DkSectionElement {
  static override styles = [errorBaseStyles, simpleStyles];

  @property() code = '404';
  @property() headline = 'Page not found';
  @property() description = "Sorry, we couldn't find the page you're looking for.";

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('h1'),
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
          <h1 class="animate-target" part="code">${this.code}</h1>
          <h2 class="animate-target" part="headline">${this.headline}</h2>
          <p class="description animate-target" part="description">${this.description}</p>
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
    'dk-section-error-simple': DkSectionErrorSimple;
  }
}
