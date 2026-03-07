import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { newsletterBaseStyles } from './dk-section-newsletter.styles.js';

const cardStyles = css`
  :host {
    background: var(--dk-color-surface-alt, #f9fafb);
  }

  .card {
    max-width: 560px;
    margin: 0 auto;
    background: var(--dk-color-surface, #ffffff);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-xl, 1rem);
    padding: var(--dk-space-10, 2.5rem);
    text-align: center;
  }

  .card h2 {
    margin-bottom: var(--dk-space-3, 0.75rem);
  }

  .card .description {
    margin-bottom: var(--dk-space-8, 2rem);
  }

  .form {
    justify-content: center;
  }
`;

@customElement('dk-section-newsletter-card')
export class DkSectionNewsletterCard extends DkSectionElement {
  static override styles = [newsletterBaseStyles, cardStyles];

  @property() headline = '';
  @property() description = '';
  @property({ attribute: 'button-text' }) buttonText = 'Subscribe';
  @property() placeholder = 'Enter your email';

  protected override onEnterViewport() {
    const card = this.shadowRoot?.querySelector('.card');
    if (card) this.animateEntrance([card]);
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
          <div class="card animate-target" part="card">
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
    'dk-section-newsletter-card': DkSectionNewsletterCard;
  }
}
