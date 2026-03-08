import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { dkAnimate } from '../../core/motion.js';
import { navbarBaseStyles } from './dk-section-navbar.styles.js';
import { reducedMotion } from '../../core/animations.js';

const megaStyles = css`
  .mega-links {
    display: flex;
    align-items: center;
    gap: var(--dk-navbar-link-gap, var(--dk-space-2, 0.5rem));
    flex: 1;
    justify-content: center;
  }

  .mega-links ::slotted(a) {
    padding: var(--dk-space-2, 0.5rem) var(--dk-space-4, 1rem);
    font-size: var(--dk-text-sm, 0.875rem);
    font-weight: var(--dk-font-medium, 500);
    color: var(--dk-color-text-muted, #6b7280);
    text-decoration: none;
    border-radius: var(--dk-radius-md, 0.375rem);
    transition: color 200ms ease, background 200ms ease;
    letter-spacing: 0.01em;
  }

  .mega-links ::slotted(a:hover) {
    color: var(--dk-color-text, #111827);
    background: var(--dk-color-surface-hover, rgba(0, 0, 0, 0.04));
  }

  .mega-trigger {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: var(--dk-space-2, 0.5rem) var(--dk-space-4, 1rem);
    font-size: var(--dk-text-sm, 0.875rem);
    font-weight: var(--dk-font-medium, 500);
    color: var(--dk-color-text-muted, #6b7280);
    background: transparent;
    border: none;
    border-radius: var(--dk-radius-md, 0.375rem);
    cursor: pointer;
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    transition: color var(--dk-transition-fast, 150ms),
                background var(--dk-transition-fast, 150ms);
  }

  .mega-trigger:hover,
  .mega-trigger[aria-expanded="true"] {
    color: var(--dk-color-text, #111827);
    background: var(--dk-color-surface-hover, #f3f4f6);
  }

  .mega-trigger:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring, 0 0 0 2px #3b82f6);
  }

  .chevron {
    width: 12px;
    height: 12px;
    transition: transform 0.2s ease;
  }

  .mega-trigger[aria-expanded="true"] .chevron {
    transform: rotate(180deg);
  }

  .mega-panel {
    position: absolute;
    top: var(--dk-navbar-height, 64px);
    left: 0;
    right: 0;
    background: var(--dk-navbar-bg, var(--dk-color-surface, #fff));
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--dk-color-border, #e5e7eb);
    box-shadow: var(--dk-shadow-lg, 0 10px 25px rgba(0,0,0,0.1));
    z-index: var(--dk-z-sticky, 100);
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
  }

  .mega-panel.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .mega-panel-inner {
    max-width: var(--dk-section-max-width, 1200px);
    margin: 0 auto;
    padding: var(--dk-space-6, 1.5rem) var(--dk-section-padding-x, 1.5rem);
  }

  .mega-panel ::slotted(*) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--dk-space-4, 1rem);
  }

  @media (max-width: 768px) {
    .mega-links {
      display: none;
    }

    .mega-panel {
      display: none;
    }
  }

  ${reducedMotion}
`;

@customElement('dk-section-navbar-mega')
export class DkSectionNavbarMega extends DkSectionElement {
  static override styles = [navbarBaseStyles, megaStyles];

  @property() brand = '';
  @property({ type: Boolean, reflect: true }) sticky = false;
  @property({ type: Boolean, reflect: true }) transparent = false;
  @property({ type: Array }) menus: Array<{ label: string; slot: string }> = [];

  @state() private _mobileOpen = false;
  @state() private _activeMenu: string | null = null;
  private _closeTimeout?: ReturnType<typeof setTimeout>;

  private _toggleMobile() {
    this._mobileOpen = !this._mobileOpen;
  }

  private _openMenu(slot: string) {
    if (this._closeTimeout) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = undefined;
    }
    if (this._activeMenu !== slot) {
      this._activeMenu = slot;
      this.updateComplete.then(() => {
        const panel = this.shadowRoot?.querySelector(`.mega-panel[data-menu="${slot}"]`);
        if (panel) {
          dkAnimate(panel as HTMLElement, { opacity: [0, 1], transform: ['translateY(-8px)', 'translateY(0)'] }, { duration: 0.2 });
        }
      });
    }
  }

  private _scheduleClose() {
    this._closeTimeout = setTimeout(() => {
      this._activeMenu = null;
    }, 150);
  }

  private _cancelClose() {
    if (this._closeTimeout) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = undefined;
    }
  }

  override render() {
    return html`
      <nav part="nav" role="navigation" aria-label="Main navigation">
        <div class="container" part="container">
          <div class="brand" part="brand">
            <slot name="logo">${this.brand}</slot>
          </div>

          <div class="mega-links" part="links">
            <slot name="links"></slot>
            ${this.menus.map(
              (menu) => html`
                <button
                  class="mega-trigger"
                  part="mega-trigger"
                  aria-expanded=${this._activeMenu === menu.slot ? 'true' : 'false'}
                  @mouseenter=${() => this._openMenu(menu.slot)}
                  @mouseleave=${this._scheduleClose}
                  @focus=${() => this._openMenu(menu.slot)}
                  @blur=${this._scheduleClose}
                >
                  ${menu.label}
                  <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
              `
            )}
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

      ${this.menus.map(
        (menu) => html`
          <div
            class=${classMap({ 'mega-panel': true, visible: this._activeMenu === menu.slot })}
            data-menu=${menu.slot}
            part="mega-panel"
            @mouseenter=${this._cancelClose}
            @mouseleave=${this._scheduleClose}
          >
            <div class="mega-panel-inner">
              <slot name=${menu.slot}></slot>
            </div>
          </div>
        `
      )}

      <div class=${classMap({ 'mobile-menu': true, open: this._mobileOpen })} part="mobile-menu">
        <slot name="links"></slot>
        ${this.menus.map(
          (menu) => html`<slot name=${menu.slot}></slot>`
        )}
        <div class="mobile-cta">
          <slot name="cta"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-navbar-mega': DkSectionNavbarMega;
  }
}
