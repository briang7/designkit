import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { newsletterBaseStyles } from './dk-section-newsletter.styles.js';

const withImageStyles = css`
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dk-space-12, 3rem);
    align-items: center;
  }

  .media {
    position: relative;
    border-radius: var(--dk-radius-xl, 1rem);
    overflow: hidden;
    min-height: 320px;
  }

  .image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--dk-radius-xl, 1rem);
  }

  .content h2 {
    margin-bottom: var(--dk-space-3, 0.75rem);
  }

  .content .description {
    margin-bottom: var(--dk-space-8, 2rem);
  }

  @media (max-width: 768px) {
    .layout {
      grid-template-columns: 1fr;
    }

    .media {
      min-height: 220px;
    }
  }
`;

@customElement('dk-section-newsletter-with-image')
export class DkSectionNewsletterWithImage extends DkSectionElement {
  static override styles = [newsletterBaseStyles, withImageStyles];

  @property() headline = '';
  @property() description = '';
  @property({ attribute: 'button-text' }) buttonText = 'Subscribe';
  @property() placeholder = 'Enter your email';
  @property() image = '';

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
          <div class="layout" part="layout">
            <div class="media" part="media">
              ${this.image
                ? html`<img class="image" src=${this.image} alt="" part="image" />`
                : nothing}
            </div>
            <div class="content" part="content">
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
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-newsletter-with-image': DkSectionNewsletterWithImage;
  }
}
