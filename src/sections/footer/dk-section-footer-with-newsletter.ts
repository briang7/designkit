import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { footerBaseStyles } from './dk-section-footer.styles.js';
import './dk-footer-helpers.js';

const newsletterStyles = css`
  .top {
    display: flex;
    gap: var(--dk-space-12, 3rem);
  }

  .brand-col {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-4, 1rem);
    flex: 0 0 300px;
  }

  .columns {
    flex: 1;
  }

  ::slotted(div) {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 2rem !important;
  }

  .newsletter-form {
    display: flex;
    gap: var(--dk-space-2, 0.5rem);
    margin-top: var(--dk-space-2, 0.5rem);
  }

  .newsletter-form input {
    flex: 1;
    min-width: 0;
    padding: var(--dk-space-2, 0.5rem) var(--dk-space-3, 0.75rem);
    border: 1px solid var(--dk-color-border, #d1d5db);
    border-radius: var(--dk-radius-md, 0.375rem);
    font-size: var(--dk-text-sm, 0.875rem);
    color: var(--dk-color-text, #111827);
    background: var(--dk-color-surface, #fff);
    outline: none;
    transition: border-color var(--dk-transition-fast, 150ms),
                box-shadow var(--dk-transition-fast, 150ms);
  }

  .newsletter-form input::placeholder {
    color: var(--dk-color-text-muted, #9ca3af);
  }

  .newsletter-form input:focus {
    border-color: var(--dk-color-primary, #3b82f6);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
  }

  .newsletter-form button {
    padding: var(--dk-space-2, 0.5rem) var(--dk-space-4, 1rem);
    border: none;
    border-radius: var(--dk-radius-md, 0.375rem);
    font-size: var(--dk-text-sm, 0.875rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-on-primary, #fff);
    background: var(--dk-color-primary, #3b82f6);
    cursor: pointer;
    white-space: nowrap;
    transition: background var(--dk-transition-fast, 150ms);
  }

  .newsletter-form button:hover {
    background: var(--dk-color-primary-hover, #2563eb);
  }

  .newsletter-form button:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring, 0 0 0 2px #3b82f6);
  }

  @media (max-width: 768px) {
    .top {
      flex-direction: column;
    }

    .brand-col {
      flex: none;
    }

    ::slotted(div) {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (max-width: 480px) {
    ::slotted(div) {
      grid-template-columns: 1fr !important;
    }

    .newsletter-form {
      flex-direction: column;
    }
  }
`;

@customElement('dk-section-footer-with-newsletter')
export class DkSectionFooterWithNewsletter extends DkSectionElement {
  static override styles = [footerBaseStyles, newsletterStyles];

  @property() brand = '';
  @property() description = '';
  @property() copyright = `\u00A9 ${new Date().getFullYear()}`;
  @property() placeholder = 'Enter your email';
  @property({ attribute: 'button-text' }) buttonText = 'Subscribe';

  protected override onEnterViewport() {
    const els = Array.from(
      this.shadowRoot?.querySelectorAll('.brand-col, .columns, .bottom') ?? []
    );
    this.animateEntrance(els);
  }

  private _onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    const email = input?.value?.trim();
    if (!email) return;

    this.dispatchEvent(
      new CustomEvent('dk-newsletter-submit', {
        detail: { email },
        bubbles: true,
        composed: true,
      })
    );
    input.value = '';
  }

  override render() {
    return html`
      <footer part="footer">
        <div class="container" part="container">
          <div class="top">
            <div class="brand-col" part="brand-col">
              <slot name="logo">
                <p class="brand-name" part="brand-name">${this.brand}</p>
              </slot>
              ${this.description
                ? html`<p class="description" part="description">${this.description}</p>`
                : ''}
              <form
                class="newsletter-form"
                part="newsletter-form"
                @submit=${this._onSubmit}
              >
                <input
                  type="email"
                  part="input"
                  placeholder=${this.placeholder}
                  required
                  aria-label="Email address"
                />
                <button type="submit" part="button">${this.buttonText}</button>
              </form>
            </div>
            <div class="columns" part="columns">
              <slot name="columns"></slot>
            </div>
          </div>

          <div class="bottom" part="bottom-bar">
            <p class="copyright" part="copyright">${this.copyright}</p>
            <div class="social-row" part="social-row">
              <slot name="social"></slot>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-footer-with-newsletter': DkSectionFooterWithNewsletter;
  }
}
