import { html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { reducedMotion } from '../../core/animations.js';

export type SearchInputSize = 'sm' | 'md' | 'lg';

const styles = css`
  :host {
    display: block;
  }

  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--dk-space-2);
    border: 1px solid var(--dk-color-input-border);
    border-radius: 9999px;
    background: var(--dk-color-input-bg);
    transition: all var(--dk-transition-fast);
    overflow: hidden;
  }

  .wrapper:hover:not(.disabled) {
    border-color: var(--dk-color-input-border-hover);
  }

  .wrapper:focus-within:not(.disabled) {
    border-color: var(--dk-color-input-border-focus);
    box-shadow: var(--dk-focus-ring);
  }

  .wrapper.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .wrapper.sm {
    height: 32px;
    padding: 0 var(--dk-space-2);
  }

  .wrapper.md {
    height: 40px;
    padding: 0 var(--dk-space-3);
  }

  .wrapper.lg {
    height: 48px;
    padding: 0 var(--dk-space-4);
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--dk-color-text-muted);
    transition: color var(--dk-transition-fast);
  }

  .wrapper:focus-within .icon {
    color: var(--dk-color-input-border-focus);
  }

  .icon svg {
    width: 16px;
    height: 16px;
  }

  .wrapper.lg .icon svg {
    width: 20px;
    height: 20px;
  }

  .wrapper.sm .icon svg {
    width: 14px;
    height: 14px;
  }

  input {
    flex: 1;
    border: none;
    background: none;
    outline: none;
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    color: var(--dk-color-text);
    min-width: 0;
  }

  .wrapper.lg input {
    font-size: var(--dk-text-md);
  }

  input::placeholder {
    color: var(--dk-color-input-placeholder);
  }

  input:disabled {
    cursor: not-allowed;
  }

  .clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
    background: var(--dk-color-surface);
    color: var(--dk-color-text-muted);
    cursor: pointer;
    padding: 0;
    border-radius: 50%;
    font-size: 14px;
    line-height: 1;
    transition: all var(--dk-transition-fast);
    flex-shrink: 0;
  }

  .clear:hover {
    background: var(--dk-color-border);
    color: var(--dk-color-text);
  }

  .spinner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--dk-color-text-muted);
    animation: dk-spin 0.8s linear infinite;
  }

  .spinner svg {
    width: 16px;
    height: 16px;
  }

  .wrapper.lg .spinner svg {
    width: 20px;
    height: 20px;
  }

  .wrapper.sm .spinner svg {
    width: 14px;
    height: 14px;
  }

  @keyframes dk-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  ${reducedMotion}
`;

@customElement('dk-search-input')
export class DkSearchInput extends DkElement {
  static override styles = styles;

  @property() placeholder = 'Search...';
  @property() value = '';
  @property({ type: Number }) debounce = 300;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) clearable = true;
  @property({ reflect: true }) size: SearchInputSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;

  @query('input') private inputEl!: HTMLInputElement;

  private _debounceTimer: ReturnType<typeof setTimeout> | null = null;

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
      this._debounceTimer = null;
    }
  }

  private handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;

    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }

    this._debounceTimer = setTimeout(() => {
      this.emitEvent('dk-search', { value: this.value });
      this._debounceTimer = null;
    }, this.debounce);
  }

  private handleClear() {
    this.value = '';
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
      this._debounceTimer = null;
    }
    this.emitEvent('dk-search-clear');
    this.emitEvent('dk-search', { value: '' });
    this.inputEl?.focus();
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.value) {
      e.preventDefault();
      this.handleClear();
    }
  }

  public focus() { this.inputEl?.focus(); }
  public blur() { this.inputEl?.blur(); }

  override render() {
    const hasValue = !!this.value;

    return html`
      <div
        part="wrapper"
        class=${classMap({
          wrapper: true,
          [this.size]: true,
          disabled: this.disabled,
        })}
      >
        <span part="icon" class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          part="input"
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          aria-label=${this.placeholder}
          @input=${this.handleInput}
          @keydown=${this.handleKeydown}
        />
        ${this.loading
          ? html`
            <span class="spinner" aria-label="Loading">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
            </span>
          `
          : this.clearable && hasValue
            ? html`
              <button part="clear" class="clear" type="button" aria-label="Clear search" @click=${this.handleClear}>&times;</button>
            `
            : nothing
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-search-input': DkSearchInput;
  }
}
