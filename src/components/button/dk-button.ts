import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { buttonStyles } from './dk-button.styles.js';
import { dkAnimate, dkSpring } from '../../core/motion.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@customElement('dk-button')
export class DkButton extends DkElement {
  static override styles = buttonStyles;

  @property({ reflect: true }) variant: ButtonVariant = 'primary';
  @property({ reflect: true }) size: ButtonSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;

  private handleClick(e: MouseEvent) {
    const button = this.shadowRoot?.querySelector('button');
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    button.appendChild(ripple);

    const anim = dkAnimate(ripple, { scale: [0, 4], opacity: [0.3, 0] }, { duration: 0.6 });
    if (anim && 'finished' in anim) {
      (anim as any).finished.then(() => ripple.remove()).catch(() => ripple.remove());
    } else {
      setTimeout(() => ripple.remove(), 600);
    }
  }

  private handlePointerDown() {
    const button = this.shadowRoot?.querySelector('button');
    if (button && !this.disabled && !this.loading) {
      dkSpring(button, { scale: [1, 0.97] });
    }
  }

  private handlePointerUp() {
    const button = this.shadowRoot?.querySelector('button');
    if (button) {
      dkSpring(button, { scale: [0.97, 1] });
    }
  }

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
        @click=${this.handleClick}
        @pointerdown=${this.handlePointerDown}
        @pointerup=${this.handlePointerUp}
        @pointerleave=${this.handlePointerUp}
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
