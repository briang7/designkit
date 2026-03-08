import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { bannerBaseStyles } from './dk-section-banner.styles.js';

const barStyles = css`
  :host {
    padding: var(--dk-space-3, 0.75rem) var(--dk-section-padding-x, 1.5rem);
    transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
    max-height: 200px;
    overflow: hidden;
  }

  :host(.dismissed) {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--dk-space-4, 1rem);
  }

  .content {
    display: flex;
    align-items: center;
    gap: var(--dk-space-3, 0.75rem);
    flex: 1;
    min-width: 0;
  }

  .link {
    font-size: var(--dk-font-size-sm, 0.875rem);
    font-weight: var(--dk-font-semibold, 600);
    text-decoration: underline;
    text-underline-offset: 2px;
    color: inherit;
    white-space: nowrap;
    transition: opacity 0.2s ease;
  }

  .link:hover {
    opacity: 0.8;
  }

  @media (max-width: 640px) {
    .content {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--dk-space-1, 0.25rem);
    }
  }
`;

@customElement('dk-section-banner-bar')
export class DkSectionBannerBar extends DkSectionElement {
  static override styles = [bannerBaseStyles, barStyles];

  @property() message = '';
  @property({ type: Boolean }) dismissable = true;
  @property() href = '';
  @property({ attribute: 'link-text' }) linkText = '';

  @state() private _dismissed = false;

  override connectedCallback() {
    super.connectedCallback();
    // Default bg for bar banners is brand
    if (!this.hasAttribute('bg')) {
      this.bg = 'brand';
    }
  }

  private _dismiss() {
    this._dismissed = true;
    this.classList.add('dismissed');
    this.emitEvent('dk-banner-dismiss');
  }

  override render() {
    if (this._dismissed) return nothing;

    return html`
      <div class="banner" part="banner" role="status">
        <div class="container" part="container" style="display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;">
          <div class="content">
            <p class="message" part="message">${this.message}</p>
            ${this.href && this.linkText
              ? html`<a class="link" href=${this.href} part="link">${this.linkText}</a>`
              : nothing}
          </div>
          ${this.dismissable
            ? html`
                <button
                  class="dismiss-btn"
                  part="dismiss-btn"
                  @click=${this._dismiss}
                  aria-label="Dismiss banner"
                >
                  <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-banner-bar': DkSectionBannerBar;
  }
}
