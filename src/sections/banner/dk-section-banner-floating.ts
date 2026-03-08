import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { bannerBaseStyles } from './dk-section-banner.styles.js';

const floatingStyles = css`
  :host {
    display: block;
    position: fixed;
    z-index: 1000;
    padding: 0;
    pointer-events: none;
  }

  :host([position="bottom-right"]) {
    bottom: var(--dk-space-6, 1.5rem);
    right: var(--dk-space-6, 1.5rem);
  }

  :host([position="bottom-center"]) {
    bottom: var(--dk-space-6, 1.5rem);
    left: 50%;
    transform: translateX(-50%);
  }

  :host([position="bottom-left"]) {
    bottom: var(--dk-space-6, 1.5rem);
    left: var(--dk-space-6, 1.5rem);
  }

  .banner {
    pointer-events: auto;
    background: var(--dk-section-bg-dark, #111827);
    color: var(--dk-section-text-on-dark, #ffffff);
    border-radius: var(--dk-radius-xl, 1rem);
    box-shadow: var(--dk-shadow-xl, 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04));
    padding: var(--dk-space-4, 1rem) var(--dk-space-5, 1.25rem);
    max-width: 400px;
    min-width: 280px;
    animation: dk-slide-in-up 0.4s ease-out;
  }

  :host([bg="brand"]) .banner {
    background: var(--dk-section-bg-brand, #3b82f6);
    color: var(--dk-section-text-on-brand, #ffffff);
  }

  :host([bg="primary"]) .banner {
    background: var(--dk-section-bg-primary, #ffffff);
    color: var(--dk-color-text, #111827);
    border: 1px solid var(--dk-color-border, #e5e7eb);
  }

  :host([bg="alt"]) .banner {
    background: var(--dk-section-bg-alt, #f9fafb);
    color: var(--dk-color-text, #111827);
    border: 1px solid var(--dk-color-border, #e5e7eb);
  }

  .banner.dismissing {
    animation: dk-fade-out 0.3s ease-out forwards;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--dk-space-3, 0.75rem);
  }

  .message {
    font-size: var(--dk-font-size-sm, 0.875rem);
    flex: 1;
  }

  .cta-area {
    margin-top: var(--dk-space-3, 0.75rem);
  }

  ::slotted(*) {
    display: inline-flex;
  }
`;

@customElement('dk-section-banner-floating')
export class DkSectionBannerFloating extends DkSectionElement {
  static override styles = [bannerBaseStyles, floatingStyles];

  @property() message = '';
  @property({ type: Boolean }) dismissable = true;
  @property({ reflect: true }) position: 'bottom-right' | 'bottom-center' | 'bottom-left' = 'bottom-right';

  @state() private _dismissed = false;
  @state() private _dismissing = false;

  private _dismiss() {
    this._dismissing = true;
    setTimeout(() => {
      this._dismissed = true;
      this._dismissing = false;
      this.emitEvent('dk-banner-dismiss');
    }, 300);
  }

  override render() {
    if (this._dismissed) return nothing;

    return html`
      <div class="banner ${this._dismissing ? 'dismissing' : ''}" part="banner" role="status">
        <div class="header" part="container">
          <p class="message" part="message">${this.message}</p>
          ${this.dismissable
            ? html`
                <button
                  class="dismiss-btn"
                  part="dismiss-btn"
                  @click=${this._dismiss}
                  aria-label="Dismiss notification"
                >
                  <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              `
            : nothing}
        </div>
        <div class="cta-area" part="cta">
          <slot name="cta"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-banner-floating': DkSectionBannerFloating;
  }
}
