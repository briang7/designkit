import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { sidebarBaseStyles } from './dk-section-sidebar.styles.js';
import './dk-sidebar-item.js';
import './dk-sidebar-group.js';

const navStyles = css`
  .sidebar {
    width: var(--dk-sidebar-width, 260px);
    height: 100%;
    background: var(--dk-color-surface, #ffffff);
    border-right: 1px solid var(--dk-color-border, #e5e7eb);
    padding: var(--dk-space-4, 1rem);
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-1, 0.25rem);
    overflow-y: auto;
  }

  .drawer-backdrop {
    display: none;
  }

  .menu-toggle {
    display: none;
    position: fixed;
    bottom: var(--dk-space-4, 1rem);
    left: var(--dk-space-4, 1rem);
    z-index: 1001;
    width: 48px;
    height: 48px;
    border-radius: var(--dk-radius-full, 9999px);
    background: var(--dk-color-primary, #3b82f6);
    color: #ffffff;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      z-index: 1000;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }

    .sidebar[data-open] {
      transform: translateX(0);
    }

    .drawer-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 999;
    }

    .drawer-backdrop[data-open] {
      display: block;
    }

    .menu-toggle {
      display: flex;
    }
  }
`;

@customElement('dk-section-sidebar-nav')
export class DkSectionSidebarNav extends DkSectionElement {
  static override styles = [sidebarBaseStyles, navStyles];

  @property() width = '260px';
  @state() private _mobileOpen = false;

  private _toggleMobile() {
    this._mobileOpen = !this._mobileOpen;
  }

  override render() {
    return html`
      <div class="drawer-backdrop" ?data-open=${this._mobileOpen} @click=${() => { this._mobileOpen = false; }}></div>
      <nav
        class="sidebar"
        part="sidebar"
        style="--dk-sidebar-width: ${this.width}"
        ?data-open=${this._mobileOpen}
      >
        <slot></slot>
      </nav>
      <button class="menu-toggle" @click=${this._toggleMobile} aria-label="Toggle navigation" part="menu-toggle">
        ${this._mobileOpen ? '\u2715' : '\u2630'}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-sidebar-nav': DkSectionSidebarNav;
  }
}
