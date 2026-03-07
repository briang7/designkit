import { html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';
import { FocusTrap } from '../../core/focus-trap.js';
import { dkAnimate, dkSpring, dkStagger } from '../../core/motion.js';
import { commandStyles } from './dk-command.styles.js';
import type { DkCommandItem } from './dk-command-item.js';
import './dk-command-item.js';
import './dk-command-group.js';

@customElement('dk-command')
export class DkCommand extends DkElement {
  static override styles = commandStyles;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placeholder = 'Search...';

  @state() private _query = '';
  @state() private activeIndex = 0;

  @query('.search-input') private searchInput?: HTMLInputElement;
  @query('.panel') private panel?: HTMLElement;
  @query('.backdrop') private backdrop?: HTMLElement;

  private focusTrap?: FocusTrap;
  private keyHandler = this.handleGlobalKeyDown.bind(this);

  private get items(): DkCommandItem[] {
    return [...this.querySelectorAll('dk-command-item')] as DkCommandItem[];
  }

  private get visibleItems(): DkCommandItem[] {
    return this.items.filter(item => !item.hidden);
  }

  show() {
    this.open = true;
    this._query = '';
    this.activeIndex = 0;
    this.filterItems();
    this.updateComplete.then(() => {
      this.searchInput?.focus();
      this.animateEntrance();
      if (this.panel) {
        this.focusTrap = new FocusTrap(this.panel);
        this.focusTrap.activate();
      }
    });
  }

  hide() {
    this.open = false;
    this._query = '';
    this.focusTrap?.deactivate();
  }

  private animateEntrance() {
    if (this.panel) {
      dkSpring(this.panel, { opacity: [0, 1], scale: [0.95, 1] });
    }
    if (this.backdrop) {
      dkAnimate(this.backdrop, { opacity: [0, 1] }, { duration: 0.2 });
    }
    const visible = this.visibleItems;
    if (visible.length) {
      dkStagger(
        visible,
        { opacity: [0, 1], transform: ['translateY(-4px)', 'translateY(0)'] },
        { duration: 0.15, staggerDelay: 0.02 }
      );
    }
  }

  private filterItems() {
    const q = this._query.toLowerCase();
    this.items.forEach(item => {
      item.hidden = q ? !item.searchText.includes(q) : false;
    });
    // Update group visibility
    this.querySelectorAll('dk-command-group').forEach((group: Element) => {
      (group as import('./dk-command-group.js').DkCommandGroup).updateVisibility?.();
    });
    // Reset active index
    const visible = this.visibleItems;
    this.activeIndex = visible.length > 0 ? 0 : -1;
    this.updateActiveStates();
  }

  private updateActiveStates() {
    const visible = this.visibleItems;
    visible.forEach((item, i) => {
      item.active = i === this.activeIndex;
    });
    // Ensure non-visible items are not active
    this.items.forEach(item => {
      if (item.hidden) item.active = false;
    });
  }

  private handleSearchInput(e: Event) {
    this._query = (e.target as HTMLInputElement).value;
    this.filterItems();
  }

  private handleKeyDown(e: KeyboardEvent) {
    const visible = this.visibleItems;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.activeIndex = Math.min(this.activeIndex + 1, visible.length - 1);
        this.updateActiveStates();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
        this.updateActiveStates();
        break;
      case 'Enter':
        e.preventDefault();
        if (this.activeIndex >= 0 && visible[this.activeIndex]) {
          this.selectItem(visible[this.activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        this.hide();
        break;
    }
  }

  private selectItem(item: DkCommandItem) {
    this.emitEvent('dk-select', { value: item.value });
    this.hide();
  }

  private handleItemClick(e: Event) {
    const item = (e.target as HTMLElement).closest('dk-command-item') as DkCommandItem | null;
    if (item) this.selectItem(item);
  }

  private handleBackdropClick() {
    this.hide();
  }

  private handleGlobalKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.open ? this.hide() : this.show();
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.keyHandler);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.keyHandler);
    this.focusTrap?.deactivate();
  }

  override render() {
    if (!this.open) return nothing;

    return html`
      <div class="backdrop" @click=${this.handleBackdropClick}></div>
      <div class="panel" role="dialog" aria-label="Command palette" @keydown=${this.handleKeyDown}>
        <div class="search-wrapper">
          <svg class="search-icon" viewBox="0 0 16 16" width="16" height="16">
            <circle cx="6.5" cy="6.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <line x1="10.5" y1="10.5" x2="15" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input
            class="search-input"
            type="text"
            .value=${this._query}
            placeholder=${this.placeholder}
            @input=${this.handleSearchInput}
            autocomplete="off"
          />
        </div>
        <div class="results" @click=${this.handleItemClick}>
          ${this.visibleItems.length === 0 ? html`
            <div class="empty-state">
              <slot name="empty">No results found</slot>
            </div>
          ` : nothing}
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-command': DkCommand;
  }
}
