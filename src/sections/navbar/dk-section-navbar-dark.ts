import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { navbarBaseStyles } from './dk-section-navbar.styles.js';

const darkNavStyles = css`
  nav {
    background: var(--dk-navbar-dark-bg, #111827);
    border-bottom-color: var(--dk-navbar-dark-border, rgba(255, 255, 255, 0.1));
  }

  .brand {
    color: #ffffff;
  }

  .links ::slotted(a) {
    color: rgba(255, 255, 255, 0.7) !important;
  }

  .links ::slotted(a:hover) {
    color: #ffffff !important;
    background: rgba(255, 255, 255, 0.08) !important;
  }

  .hamburger span {
    background: #ffffff;
  }

  .mobile-menu {
    background: var(--dk-navbar-dark-bg, #111827);
    border-bottom-color: var(--dk-navbar-dark-border, rgba(255, 255, 255, 0.1));
  }

  .mobile-menu ::slotted(a) {
    color: rgba(255, 255, 255, 0.85);
  }

  .mobile-menu ::slotted(a:hover) {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }

  .mobile-cta {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  /* Brand accent on hover */
  .links ::slotted(a:hover),
  .mobile-menu ::slotted(a:hover) {
    color: var(--dk-color-brand, #3b82f6);
  }
`;

@customElement('dk-section-navbar-dark')
export class DkSectionNavbarDark extends DkSectionElement {
  static override styles = [navbarBaseStyles, darkNavStyles];

  @property() brand = '';
  @property({ type: Boolean, reflect: true }) sticky = false;

  @state() private _mobileOpen = false;

  private _toggleMobile() {
    this._mobileOpen = !this._mobileOpen;
  }

  override render() {
    return html`
      <nav part="nav" role="navigation" aria-label="Main navigation">
        <div class="container" part="container">
          <div class="brand" part="brand">
            <slot name="logo">${this.brand}</slot>
          </div>

          <div class="links" part="links">
            <slot name="links"></slot>
          </div>

          <div class="cta" part="cta">
            <slot name="cta"></slot>
          </div>

          <button
            class=${classMap({ hamburger: true, open: this._mobileOpen })}
            part="hamburger"
            aria-label="Toggle menu"
            aria-expanded=${this._mobileOpen ? 'true' : 'false'}
            @click=${this._toggleMobile}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div class=${classMap({ 'mobile-menu': true, open: this._mobileOpen })} part="mobile-menu">
        <slot name="links"></slot>
        <div class="mobile-cta">
          <slot name="cta"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-navbar-dark': DkSectionNavbarDark;
  }
}
