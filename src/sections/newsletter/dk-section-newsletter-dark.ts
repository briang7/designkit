import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { newsletterBaseStyles } from './dk-section-newsletter.styles.js';

const darkStyles = css`
  :host {
    --dk-color-text: #f9fafb;
    --dk-color-text-muted: #d1d5db;
    background: var(--dk-color-dark-bg, #111827);
  }

  h2 {
    color: #f9fafb;
  }

  .description {
    color: #d1d5db;
  }

  .content {
    max-width: 560px;
    margin: 0 auto;
    text-align: center;
  }

  .content h2 {
    margin-bottom: var(--dk-space-3, 0.75rem);
  }

  .content .description {
    margin-bottom: var(--dk-space-8, 2rem);
  }

  .form {
    justify-content: center;
  }

  .email-input {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    color: #f9fafb;
  }

  .email-input::placeholder {
    color: #9ca3af;
  }

  .email-input:focus {
    border-color: var(--dk-color-primary, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

@customElement('dk-section-newsletter-dark')
export class DkSectionNewsletterDark extends DkSectionElement {
  static override styles = [newsletterBaseStyles, darkStyles];

  @property() headline = '';
  @property() description = '';
  @property({ attribute: 'button-text' }) buttonText = 'Subscribe';
  @property() placeholder = 'Enter your email';

  protected override onEnterViewport() {
    const content = this.shadowRoot?.querySelector('.content');
    if (content) this.animateEntrance([content]);
  }

  private _handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    if (input.value) {
      this.emitEvent('dk-newsletter-submit', { email: input.value });
    }
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          <div class="content animate-target" part="content">
            ${this.headline ? html`<h2 part="headline">${this.headline}</h2>` : nothing}
            ${this.description ? html`<p class="description" part="description">${this.description}</p>` : nothing}
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
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-newsletter-dark': DkSectionNewsletterDark;
  }
}
