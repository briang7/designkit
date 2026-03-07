import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { sidebarBaseStyles } from './dk-section-sidebar.styles.js';
import './dk-sidebar-item.js';
import './dk-sidebar-group.js';

const brandStyles = css`
  .sidebar {
    width: var(--dk-sidebar-width, 260px);
    height: 100%;
    background: var(--dk-color-neutral-900, #111827);
    color: #ffffff;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .logo-area {
    padding: var(--dk-space-6, 1.5rem) var(--dk-space-4, 1rem);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-area {
    flex: 1;
    padding: var(--dk-space-4, 1rem);
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-1, 0.25rem);
  }

  .user-area {
    padding: var(--dk-space-4, 1rem);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Override child item colors for dark bg */
  ::slotted(dk-sidebar-item) {
    --dk-color-text-muted: rgba(255, 255, 255, 0.6);
    --dk-color-text: #ffffff;
    --dk-color-surface-alt: rgba(255, 255, 255, 0.08);
    --dk-color-primary-subtle: rgba(99, 164, 255, 0.15);
  }

  ::slotted(dk-sidebar-group) {
    --dk-color-text-muted: rgba(255, 255, 255, 0.5);
    --dk-color-surface-alt: rgba(255, 255, 255, 0.05);
  }
`;

@customElement('dk-section-sidebar-brand')
export class DkSectionSidebarBrand extends DkSectionElement {
  static override styles = [sidebarBaseStyles, brandStyles];

  @property() width = '260px';

  override render() {
    return html`
      <aside class="sidebar" part="sidebar" style="--dk-sidebar-width: ${this.width}">
        <div class="logo-area" part="logo">
          <slot name="logo"></slot>
        </div>
        <div class="nav-area" part="nav">
          <slot></slot>
        </div>
        <div class="user-area" part="user">
          <slot name="user"></slot>
        </div>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-sidebar-brand': DkSectionSidebarBrand;
  }
}
