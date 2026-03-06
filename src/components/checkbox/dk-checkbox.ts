import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { checkboxStyles } from './dk-checkbox.styles.js';
import { dkSpring } from '../../core/motion.js';

@customElement('dk-checkbox')
export class DkCheckbox extends DkElement {
  static override styles = checkboxStyles;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private handleClick() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.indeterminate = false;
    this.emitEvent('dk-change', { checked: this.checked });

    const control = this.shadowRoot?.querySelector('.control');
    if (control && this.checked) {
      dkSpring(control, { scale: [0.85, 1] });
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ') {
      e.preventDefault();
      this.handleClick();
    }
  }

  override render() {
    return html`
      <label part="base" class=${classMap({ checkbox: true, checked: this.checked, indeterminate: this.indeterminate, disabled: this.disabled })}>
        <span
          class="control"
          role="checkbox"
          tabindex=${this.disabled ? -1 : 0}
          aria-checked=${this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false'}
          aria-disabled=${this.disabled ? 'true' : nothing}
          aria-labelledby="label"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        >
          ${this.checked ? html`
            <svg viewBox="0 0 16 16" class="icon"><polyline points="3.5 8 6.5 11 12.5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          ` : this.indeterminate ? html`
            <svg viewBox="0 0 16 16" class="icon"><line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          ` : nothing}
        </span>
        <span class="label" id="label"><slot></slot></span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-checkbox': DkCheckbox;
  }
}
