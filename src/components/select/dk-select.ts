import { html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { selectStyles } from './dk-select.styles.js';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@customElement('dk-select')
export class DkSelect extends DkElement {
  static override styles = selectStyles;

  @property() value = '';
  @property() placeholder = 'Select...';
  @property() label = '';
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) searchable = false;

  @state() private open = false;
  @state() private highlightedIndex = -1;
  @state() private searchQuery = '';

  @query('.search-input') private searchInput?: HTMLInputElement;

  private get selectedOption(): SelectOption | undefined {
    return this.options.find(o => o.value === this.value);
  }

  private get filteredOptions(): SelectOption[] {
    if (!this.searchQuery) return this.options;
    const q = this.searchQuery.toLowerCase();
    return this.options.filter(o => o.label.toLowerCase().includes(q));
  }

  private handleTriggerClick() {
    if (this.disabled) return;
    this.open = !this.open;
    if (this.open) {
      this.highlightedIndex = this.filteredOptions.findIndex(o => o.value === this.value);
      requestAnimationFrame(() => this.searchInput?.focus());
    }
  }

  private handleSelect(option: SelectOption) {
    if (option.disabled) return;
    this.value = option.value;
    this.open = false;
    this.searchQuery = '';
    this.emitEvent('dk-change', { value: option.value, label: option.label });
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this.open = true;
      this.highlightedIndex = Math.max(0, this.filteredOptions.findIndex(o => o.value === this.value));
      return;
    }

    if (!this.open) return;

    const opts = this.filteredOptions;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, opts.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (this.highlightedIndex >= 0 && opts[this.highlightedIndex]) {
          this.handleSelect(opts[this.highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        this.open = false;
        this.searchQuery = '';
        break;
    }
  }

  private handleSearchInput(e: Event) {
    this.searchQuery = (e.target as HTMLInputElement).value;
    this.highlightedIndex = 0;
  }

  private handleClickOutside = (e: MouseEvent) => {
    if (!this.open) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.open = false;
      this.searchQuery = '';
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleClickOutside);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
  }

  override render() {
    const displayText = this.selectedOption?.label || this.placeholder;
    const opts = this.filteredOptions;

    return html`
      ${this.label ? html`<span class="field-label">${this.label}</span>` : nothing}
      <div class="select-wrapper" @keydown=${this.handleKeyDown}>
        <button
          part="trigger"
          class=${classMap({ trigger: true, [this.size]: true, open: this.open, placeholder: !this.selectedOption })}
          ?disabled=${this.disabled}
          aria-haspopup="listbox"
          aria-expanded=${this.open ? 'true' : 'false'}
          @click=${this.handleTriggerClick}
        >
          <span class="trigger-text">${displayText}</span>
          <svg class="chevron" viewBox="0 0 16 16" width="16" height="16">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        ${this.open ? html`
          <div class="dropdown" role="listbox" part="dropdown">
            ${this.searchable ? html`
              <div class="search-wrapper">
                <input class="search-input" type="text" placeholder="Search..." .value=${this.searchQuery} @input=${this.handleSearchInput} />
              </div>
            ` : nothing}
            ${opts.length === 0 ? html`
              <div class="no-results">No results found</div>
            ` : opts.map((opt, i) => html`
              <div
                class=${classMap({ option: true, selected: opt.value === this.value, highlighted: i === this.highlightedIndex, disabled: !!opt.disabled })}
                role="option"
                aria-selected=${opt.value === this.value ? 'true' : 'false'}
                @click=${() => this.handleSelect(opt)}
                @mouseenter=${() => { this.highlightedIndex = i; }}
              >
                <span class="option-text">${opt.label}</span>
                ${opt.value === this.value ? html`<svg class="check" viewBox="0 0 16 16" width="16" height="16"><polyline points="3.5 8 6.5 11 12.5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : nothing}
              </div>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-select': DkSelect;
  }
}
