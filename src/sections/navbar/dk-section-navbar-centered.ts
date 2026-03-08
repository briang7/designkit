import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { navbarBaseStyles } from './dk-section-navbar.styles.js';

const centeredNavStyles = css`
  .container {
    justify-content: center;
  }

  .links-left,
  .links-right {
    display: flex;
    align-items: center;
    gap: var(--dk-space-2, 0.5rem);
    flex: 1;
  }

  .links-left {
    justify-content: flex-end;
  }

  .links-right {
    justify-content: flex-start;
  }

  .links-left ::slotted(a),
  .links-right ::slotted(a) {
    padding: var(--dk-space-2, 0.5rem) var(--dk-space-3, 0.75rem);
    font-size: var(--dk-text-sm, 0.875rem);
    font-weight: var(--dk-font-medium, 500);
    color: var(--dk-color-text-muted, #6b7280);
    text-decoration: none;
    border-radius: var(--dk-radius-md, 0.375rem);
    transition: color var(--dk-transition-fast, 150ms),
                background var(--dk-transition-fast, 150ms);
  }

  .links-left ::slotted(a:hover),
  .links-right ::slotted(a:hover) {
    color: var(--dk-color-text, #111827);
    background: var(--dk-color-surface-hover, #f3f4f6);
  }

  .brand {
    order: 0;
    margin: 0 var(--dk-space-6, 1.5rem);
    font-size: var(--dk-text-xl, 1.25rem);
  }

  @media (max-width: 768px) {
    .links-left,
    .links-right {
      display: none;
    }

    .hamburger {
      display: flex;
    }

    .mobile-menu {
      display: flex;
    }

    .brand {
      margin-left: 0;
      margin-right: auto;
    }
  }
`;

@customElement('dk-section-navbar-centered')
export class DkSectionNavbarCentered extends DkSectionElement {
  static override styles = [navbarBaseStyles, centeredNavStyles];

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
          <div class="links-left" part="links-left">
            <slot name="links-left"></slot>
          </div>

          <div class="brand" part="brand">
            <slot name="logo">${this.brand}</slot>
          </div>

          <div class="links-right" part="links-right">
            <slot name="links-right"></slot>
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
        <slot name="links-left"></slot>
        <slot name="links-right"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-navbar-centered': DkSectionNavbarCentered;
  }
}
