import { html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { inputStyles } from './dk-input.styles.js';
import '../../signature/skeleton/dk-skeleton.js';

export type InputSize = 'sm' | 'md' | 'lg';

@customElement('dk-input')
export class DkInput extends DkElement {
  static override styles = inputStyles;

  @property() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @property() value = '';
  @property() placeholder = '';
  @property() label = '';
  @property({ attribute: 'help-text' }) helpText = '';
  @property({ attribute: 'error-text' }) errorText = '';
  @property({ reflect: true }) size: InputSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean, reflect: true }) loading = false;

  @query('input') private inputEl!: HTMLInputElement;
  @state() private _hasPrefix = false;

  private _handlePrefixSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this._hasPrefix = nodes.length > 0;
    if (this._hasPrefix) {
      requestAnimationFrame(() => {
        const slotEl = slot.parentElement ?? slot;
        let totalWidth = 0;
        for (const node of nodes) {
          if (node instanceof HTMLElement) {
            totalWidth += node.offsetWidth;
          } else if (node.textContent?.trim()) {
            totalWidth += slotEl.offsetWidth || 16;
          }
        }
        if (totalWidth > 0) {
          this.style.setProperty('--dk-input-prefix-offset', `${totalWidth}px`);
        }
      });
    } else {
      this.style.removeProperty('--dk-input-prefix-offset');
    }
  }

  private handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.emitEvent('dk-input', { value: this.value });
  }

  private handleChange() {
    this.emitEvent('dk-change', { value: this.value });
  }

  private handleClear() {
    this.value = '';
    this.emitEvent('dk-input', { value: '' });
    this.emitEvent('dk-change', { value: '' });
    this.inputEl?.focus();
  }

  public focus() { this.inputEl?.focus(); }
  public blur() { this.inputEl?.blur(); }

  override render() {
    if (this.loading) {
      return html`
        <div part="wrapper" class="wrapper ${this.size}">
          ${this.label ? html`<dk-skeleton variant="text" width="30%" style="margin-bottom: 4px"></dk-skeleton>` : nothing}
          <dk-skeleton variant="rect" height="${this.size === 'sm' ? '32px' : this.size === 'lg' ? '48px' : '40px'}"></dk-skeleton>
        </div>
      `;
    }

    const hasError = !!this.errorText;
    const hasValue = !!this.value;
    return html`
      <div part="wrapper" class=${classMap({ wrapper: true, [this.size]: true, error: hasError, disabled: this.disabled, 'has-value': hasValue, 'has-label': !!this.label, 'has-prefix': this._hasPrefix })}>
        ${this.label ? html`<label part="label" class="label">${this.label}${this.required ? html`<span class="required"> *</span>` : nothing}</label>` : nothing}
        <slot name="prefix" @slotchange=${this._handlePrefixSlotChange}></slot>
        <input
          part="input"
          type=${this.type}
          .value=${this.value}
          placeholder=${this.label ? nothing : (this.placeholder || nothing)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-label=${this.label || nothing}
          aria-invalid=${hasError ? 'true' : nothing}
          aria-describedby=${this.helpText || this.errorText ? 'help' : nothing}
          @input=${this.handleInput}
          @change=${this.handleChange}
        />
        ${this.clearable && this.value ? html`
          <button class="clear" type="button" aria-label="Clear" @click=${this.handleClear}>&times;</button>
        ` : nothing}
        <slot name="suffix"></slot>
      </div>
      ${this.errorText ? html`<span id="help" class="help-text error">${this.errorText}</span>`
        : this.helpText ? html`<span id="help" class="help-text">${this.helpText}</span>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-input': DkInput;
  }
}
