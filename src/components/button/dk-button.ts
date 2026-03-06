import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { buttonStyles } from './dk-button.styles.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@customElement('dk-button')
export class DkButton extends DkElement {
  static override styles = buttonStyles;

  @property({ reflect: true }) variant: ButtonVariant = 'primary';
  @property({ reflect: true }) size: ButtonSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;

  override render() {
    const classes = {
      [this.variant]: true,
      [this.size]: true,
    };

    return html`
      <button
        part="base"
        class=${classMap(classes)}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading ? 'true' : nothing}
      >
        ${this.loading ? html`
          <span class="loading-overlay">
            <span class="spinner" aria-hidden="true"></span>
          </span>
          <span class="label-hidden">
            <slot name="prefix"></slot>
            <slot></slot>
            <slot name="suffix"></slot>
          </span>
        ` : html`
          <slot name="prefix"></slot>
          <slot></slot>
          <slot name="suffix"></slot>
        `}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-button': DkButton;
  }
}
