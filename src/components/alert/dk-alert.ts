import { html, nothing, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { fadeOut, reducedMotion } from '../../core/animations.js';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

@customElement('dk-alert')
export class DkAlert extends DkElement {
  static override styles = [
    fadeOut,
    css`
      :host {
        display: block;
        font-family: var(--dk-font-sans);
      }

      :host([hidden]) {
        display: none;
      }

      .alert {
        display: flex;
        align-items: flex-start;
        gap: var(--dk-space-3);
        padding: var(--dk-space-3) var(--dk-space-4);
        border-radius: var(--dk-radius-md);
        border-left: 4px solid;
        transition: all var(--dk-transition-fast);
      }

      .alert.dismissing {
        animation: dk-fade-out 200ms ease-out forwards;
      }

      /* Variant styles */
      .alert.info {
        background: var(--dk-color-primary-light, #eff6ff);
        border-left-color: var(--dk-color-primary, #3b82f6);
        color: var(--dk-color-primary, #3b82f6);
      }

      .alert.success {
        background: var(--dk-color-success-light, #f0fdf4);
        border-left-color: var(--dk-color-success, #22c55e);
        color: var(--dk-color-success, #22c55e);
      }

      .alert.warning {
        background: var(--dk-color-warning-light, #fffbeb);
        border-left-color: var(--dk-color-warning, #f59e0b);
        color: var(--dk-color-warning, #f59e0b);
      }

      .alert.error {
        background: var(--dk-color-danger-light, #fef2f2);
        border-left-color: var(--dk-color-danger, #ef4444);
        color: var(--dk-color-danger, #ef4444);
      }

      .icon {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        margin-top: 1px;
      }

      .icon svg {
        width: 18px;
        height: 18px;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .content ::slotted([slot="title"]) {
        display: block;
        font-weight: var(--dk-font-semibold, 600);
        margin-bottom: var(--dk-space-1);
      }

      ::slotted(*),
      .content {
        color: var(--dk-color-text, #1e293b);
        font-size: var(--dk-text-sm, 0.875rem);
        line-height: 1.5;
      }

      .close {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        background: none;
        color: currentColor;
        cursor: pointer;
        padding: 0;
        border-radius: var(--dk-radius-sm, 4px);
        opacity: 0.6;
        transition: opacity var(--dk-transition-fast);
      }

      .close:hover {
        opacity: 1;
        background: rgb(0 0 0 / 0.08);
      }

      .close:focus-visible {
        outline: none;
        box-shadow: var(--dk-focus-ring);
      }

      ${reducedMotion}
    `,
  ];

  @property({ reflect: true }) variant: AlertVariant = 'info';
  @property({ type: Boolean }) dismissable = false;
  @property({ type: Boolean }) icon = true;

  @state() private _dismissing = false;

  private get _icon() {
    switch (this.variant) {
      case 'success':
        return html`<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="7"/><polyline points="6 9 8.5 11.5 12.5 6.5"/></svg>`;
      case 'warning':
        return html`<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2L1.5 16h15L9 2z"/><line x1="9" y1="7" x2="9" y2="11"/><circle cx="9" cy="13.5" r="0.5" fill="currentColor" stroke="none"/></svg>`;
      case 'error':
        return html`<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="7"/><line x1="6.5" y1="6.5" x2="11.5" y2="11.5"/><line x1="11.5" y1="6.5" x2="6.5" y2="11.5"/></svg>`;
      default: // info
        return html`<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="7"/><line x1="9" y1="8" x2="9" y2="12"/><circle cx="9" cy="5.5" r="0.5" fill="currentColor" stroke="none"/></svg>`;
    }
  }

  private handleDismiss() {
    this._dismissing = true;
    setTimeout(() => {
      this.emitEvent('dk-alert-dismiss');
      this.hidden = true;
    }, 200);
  }

  override render() {
    return html`
      <div
        part="base"
        class=${classMap({ alert: true, [this.variant]: true, dismissing: this._dismissing })}
        role="alert"
      >
        ${this.icon ? html`<span part="icon" class="icon" aria-hidden="true">${this._icon}</span>` : nothing}
        <div part="content" class="content">
          <slot name="title"></slot>
          <slot></slot>
        </div>
        ${this.dismissable ? html`
          <button part="close" class="close" aria-label="Dismiss" @click=${this.handleDismiss}>
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-alert': DkAlert;
  }
}
