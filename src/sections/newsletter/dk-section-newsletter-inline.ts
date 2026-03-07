import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { newsletterBaseStyles } from './dk-section-newsletter.styles.js';

const inlineStyles = css`
  .inline-layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--dk-space-10, 2.5rem);
  }

  .text-col {
    flex: 1;
  }

  .form-col {
    flex: 1;
    max-width: 480px;
  }

  @media (max-width: 768px) {
    .inline-layout {
      flex-direction: column;
      text-align: center;
    }

    .form-col {
      max-width: 100%;
      width: 100%;
    }
  }
`;

@customElement('dk-section-newsletter-inline')
export class DkSectionNewsletterInline extends DkSectionElement {
  static override styles = [newsletterBaseStyles, inlineStyles];

  @property() headline = '';
  @property() description = '';
  @property({ attribute: 'button-text' }) buttonText = 'Subscribe';
  @property() placeholder = 'Enter your email';

  protected override onEnterViewport() {
    const layout = this.shadowRoot?.querySelector('.inline-layout');
    if (layout) this.animateEntrance([layout]);
  }

  private _handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    if (input.value) {
      this.emitEvent('dk-subscribe', { email: input.value });
    }
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          <div class="inline-layout animate-target" part="layout">
            <div class="text-col" part="text-col">
              ${this.headline ? html`<h2 part="headline">${this.headline}</h2>` : nothing}
              ${this.description ? html`<p class="description" part="description">${this.description}</p>` : nothing}
            </div>
            <div class="form-col" part="form-col">
              <form class="form" @submit=${this._handleSubmit} part="form">
                <input
                  class="email-input"
                  type="email"
                  placeholder=${this.placeholder}
                  required
                  part="input"
                  aria-label="Email address"
                />
                <button class="submit-btn" type="submit" part="button">${this.buttonText}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-newsletter-inline': DkSectionNewsletterInline;
  }
}
