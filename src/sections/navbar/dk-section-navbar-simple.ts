import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { navbarBaseStyles } from './dk-section-navbar.styles.js';

@customElement('dk-section-navbar-simple')
export class DkSectionNavbarSimple extends DkSectionElement {
  static override styles = navbarBaseStyles;

  @property() brand = '';
  @property({ type: Boolean, reflect: true }) sticky = false;
  @property({ type: Boolean, reflect: true }) transparent = false;

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
    'dk-section-navbar-simple': DkSectionNavbarSimple;
  }
}
