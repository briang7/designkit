import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { dkAnimate, dkStagger } from '../../core/motion.js';
import { dropdownStyles } from './dk-dropdown.styles.js';

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

@customElement('dk-dropdown')
export class DkDropdown extends DkElement {
  static override styles = dropdownStyles;

  @property({ reflect: true }) placement: DropdownPlacement = 'bottom-start';

  @state() open = false;

  private get items(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    if (!slot) return [];
    return slot
      .assignedElements({ flatten: true })
      .filter(
        (el): el is HTMLElement =>
          el.tagName === 'DK-DROPDOWN-ITEM' && !el.hasAttribute('disabled')
      );
  }

  private toggleMenu() {
    this.open = !this.open;
    if (this.open) {
      this.updateComplete.then(() => this.animateOpen());
    }
  }

  private closeMenu() {
    this.open = false;
  }

  private animateOpen() {
    const menu = this.shadowRoot?.querySelector('.menu') as HTMLElement | null;
    if (!menu) return;

    const isTop = this.placement.startsWith('top');
    const slideFrom = isTop ? 'translateY(8px)' : 'translateY(-8px)';

    dkAnimate(
      menu,
      { opacity: [0, 1], transform: [slideFrom, 'translateY(0)'] },
      { duration: 0.2 }
    );

    const slot = menu.querySelector('slot:not([name])') as HTMLSlotElement | null;
    if (slot) {
      const assigned = slot.assignedElements({ flatten: true }).filter(
        el => el.tagName === 'DK-DROPDOWN-ITEM'
      );
      if (assigned.length) {
        dkStagger(
          assigned as Element[],
          { opacity: [0, 1], transform: ['translateY(-4px)', 'translateY(0)'] },
          { duration: 0.15, staggerDelay: 0.02 }
        );
      }
    }
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) {
      e.preventDefault();
      this.closeMenu();
      // Return focus to trigger
      const trigger = this.shadowRoot?.querySelector('[part="trigger-wrapper"]') as HTMLElement;
      trigger?.focus();
      return;
    }

    if (!this.open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this.open = true;
      this.updateComplete.then(() => {
        this.animateOpen();
        this.focusItem(0);
      });
      return;
    }

    if (!this.open) return;

    const items = this.items;
    if (!items.length) return;

    const currentIndex = items.findIndex(item => item === document.activeElement || item === this.shadowRoot?.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusItem(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusItem(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
        break;
      case 'Home':
        e.preventDefault();
        this.focusItem(0);
        break;
      case 'End':
        e.preventDefault();
        this.focusItem(items.length - 1);
        break;
      case 'Tab':
        this.closeMenu();
        break;
    }
  };

  private focusItem(index: number) {
    const items = this.items;
    if (items[index]) {
      items[index].focus();
    }
  }

  private handleClickOutside = (e: MouseEvent) => {
    if (!this.open) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.closeMenu();
    }
  };

  private handleItemSelect = () => {
    this.closeMenu();
  };

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleClickOutside);
    this.addEventListener('dk-dropdown-select', this.handleItemSelect);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
    this.removeEventListener('dk-dropdown-select', this.handleItemSelect);
  }

  override render() {
    return html`
      <div class="dropdown-wrapper" @keydown=${this.handleKeyDown}>
        <div
          part="trigger-wrapper"
          class="trigger"
          tabindex="0"
          aria-haspopup="menu"
          aria-expanded=${this.open ? 'true' : 'false'}
          @click=${this.toggleMenu}
        >
          <slot name="trigger"></slot>
        </div>

        ${this.open ? html`
          <div
            part="menu"
            class=${classMap({ menu: true, [this.placement]: true })}
            role="menu"
          >
            <slot></slot>
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-dropdown': DkDropdown;
  }
}
