import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { dropdownItemStyles } from './dk-dropdown-item.styles.js';

@customElement('dk-dropdown-item')
export class DkDropdownItem extends DkElement {
  static override styles = dropdownItemStyles;

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) variant: 'default' | 'danger' = 'default';

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'menuitem');
    if (!this.disabled) {
      this.setAttribute('tabindex', '-1');
    }
  }

  private handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.emitEvent('dk-dropdown-select', { item: this });
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.emitEvent('dk-dropdown-select', { item: this });
    }
  }

  override render() {
    return html`
      <div
        part="item"
        class=${classMap({
          item: true,
          disabled: this.disabled,
          danger: this.variant === 'danger',
        })}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-dropdown-item': DkDropdownItem;
  }
}
