import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { bannerBaseStyles } from './dk-section-banner.styles.js';

const cookieStyles = css`
  :host {
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 0;
  }

  :host([position="bottom"]) {
    bottom: 0;
  }

  :host([position="top"]) {
    top: 0;
  }

  .banner {
    background: var(--dk-section-bg-dark, #111827);
    color: var(--dk-section-text-on-dark, #ffffff);
    padding: var(--dk-space-4, 1rem) var(--dk-section-padding-x, 1.5rem);
    animation: dk-slide-in-up 0.4s ease-out;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  :host([position="top"]) .banner {
    animation: dk-slide-in-down 0.4s ease-out;
    border-top: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  @keyframes dk-slide-in-down {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }

  :host([bg="brand"]) .banner {
    background: var(--dk-section-bg-brand, #3b82f6);
    color: var(--dk-section-text-on-brand, #ffffff);
  }

  :host([bg="primary"]) .banner {
    background: var(--dk-section-bg-primary, #ffffff);
    color: var(--dk-color-text, #111827);
    border-top-color: var(--dk-color-border, #e5e7eb);
  }

  :host([bg="alt"]) .banner {
    background: var(--dk-section-bg-alt, #f9fafb);
    color: var(--dk-color-text, #111827);
    border-top-color: var(--dk-color-border, #e5e7eb);
  }

  .banner.dismissing {
    animation: dk-fade-out 0.3s ease-out forwards;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--dk-space-6, 1.5rem);
  }

  .message {
    flex: 1;
    min-width: 0;
  }

  .actions {
    display: flex;
    gap: var(--dk-space-3, 0.75rem);
    flex-shrink: 0;
  }

  .btn {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    font-weight: var(--dk-font-semibold, 600);
    padding: var(--dk-space-2, 0.5rem) var(--dk-space-4, 1rem);
    border-radius: var(--dk-radius-md, 0.5rem);
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease, transform 0.15s ease;
    white-space: nowrap;
  }

  .btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .btn:active {
    transform: translateY(0);
  }

  .btn:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  .accept-btn {
    background: var(--dk-color-primary, #3b82f6);
    color: #ffffff;
  }

  :host([bg="brand"]) .accept-btn {
    background: #ffffff;
    color: var(--dk-section-bg-brand, #3b82f6);
  }

  .decline-btn {
    background: transparent;
    color: inherit;
    border: 1px solid currentColor;
    opacity: 0.7;
  }

  .decline-btn:hover {
    opacity: 1;
  }

  @media (max-width: 640px) {
    .container {
      flex-direction: column;
      text-align: center;
    }

    .actions {
      width: 100%;
      justify-content: center;
    }
  }
`;

@customElement('dk-section-banner-cookie')
export class DkSectionBannerCookie extends DkSectionElement {
  static override styles = [bannerBaseStyles, cookieStyles];

  @property() message = 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.';
  @property({ attribute: 'accept-text' }) acceptText = 'Accept';
  @property({ attribute: 'decline-text' }) declineText = 'Decline';
  @property({ reflect: true }) position: 'bottom' | 'top' = 'bottom';

  @state() private _dismissed = false;
  @state() private _dismissing = false;

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('bg')) {
      this.bg = 'dark';
    }
  }

  private _accept() {
    this._animateOut(() => {
      this.emitEvent('dk-cookie-accept');
    });
  }

  private _decline() {
    this._animateOut(() => {
      this.emitEvent('dk-cookie-decline');
    });
  }

  private _animateOut(callback: () => void) {
    this._dismissing = true;
    setTimeout(() => {
      this._dismissed = true;
      this._dismissing = false;
      callback();
    }, 300);
  }

  override render() {
    if (this._dismissed) return nothing;

    return html`
      <div class="banner ${this._dismissing ? 'dismissing' : ''}" part="banner" role="alert">
        <div class="container" part="container">
          <p class="message" part="message">${this.message}</p>
          <div class="actions" part="actions">
            <button
              class="btn decline-btn"
              part="decline-btn"
              @click=${this._decline}
            >${this.declineText}</button>
            <button
              class="btn accept-btn"
              part="accept-btn"
              @click=${this._accept}
            >${this.acceptText}</button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-banner-cookie': DkSectionBannerCookie;
  }
}
