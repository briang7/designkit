import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

const styles = css`
  :host {
    display: block;
  }

  .item {
    display: flex;
    align-items: center;
    gap: var(--dk-space-3, 0.75rem);
    padding: var(--dk-space-2, 0.5rem) var(--dk-space-3, 0.75rem);
    border-radius: var(--dk-radius-md, 0.5rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
    text-decoration: none;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
    position: relative;
  }

  .item:hover {
    background: var(--dk-color-surface-alt, #f9fafb);
    color: var(--dk-color-text, #111827);
  }

  :host([active]) .item {
    background: var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.08));
    color: var(--dk-color-primary, #3b82f6);
    font-weight: var(--dk-font-semibold, 600);
  }

  .icon-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    font-size: 1.125rem;
  }

  .label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .badge {
    font-size: var(--dk-font-size-xs, 0.75rem);
    font-weight: var(--dk-font-semibold, 600);
    background: var(--dk-color-primary, #3b82f6);
    color: #ffffff;
    padding: 0.125rem 0.5rem;
    border-radius: var(--dk-radius-full, 9999px);
    line-height: 1.4;
  }
`;

@customElement('dk-sidebar-item')
export class DkSidebarItem extends DkElement {
  static override styles = styles;

  @property() icon = '';
  @property() label = '';
  @property() href = '';
  @property({ type: Boolean, reflect: true }) active = false;
  @property() badge = '';

  private _handleClick() {
    this.emitEvent('dk-sidebar-navigate', { href: this.href, label: this.label });
  }

  override render() {
    return html`
      <a
        class="item"
        part="item"
        href=${this.href || 'javascript:void(0)'}
        @click=${this._handleClick}
      >
        ${this.icon
          ? html`<span class="icon-slot" part="icon" aria-hidden="true">${this.icon}</span>`
          : nothing}
        <span class="label" part="label">${this.label}</span>
        ${this.badge
          ? html`<span class="badge" part="badge">${this.badge}</span>`
          : nothing}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-sidebar-item': DkSidebarItem;
  }
}
