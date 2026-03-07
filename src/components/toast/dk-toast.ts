import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { dkSpring } from '../../core/motion.js';
import { toastStyles } from './dk-toast.styles.js';

export type ToastVariant = 'info' | 'success' | 'danger' | 'warning';
export type ToastPlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastData extends ToastOptions {
  id: string;
}

@customElement('dk-toast')
export class DkToast extends DkElement {
  static override styles = toastStyles.toast;

  @property() variant: ToastVariant = 'info';
  @property() message = '';
  @property({ attribute: 'action-label' }) actionLabel = '';

  override firstUpdated() {
    dkSpring(this, { transform: ['translateX(100%)', 'translateX(0)'], opacity: [0, 1] });
  }

  private handleClose() {
    this.emitEvent('dk-close');
  }

  private handleAction() {
    this.emitEvent('dk-action');
  }

  private get icon() {
    switch (this.variant) {
      case 'success': return html`<svg viewBox="0 0 16 16" width="16" height="16"><polyline points="3.5 8 6.5 11 12.5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'danger': return html`<svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2"/><line x1="8" y1="5" x2="8" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="8" cy="11.5" r="0.5" fill="currentColor"/></svg>`;
      case 'warning': return html`<svg viewBox="0 0 16 16" width="16" height="16"><path d="M8 2L1 14h14L8 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="8" y1="6" x2="8" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="12" r="0.5" fill="currentColor"/></svg>`;
      default: return html`<svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2"/><line x1="8" y1="7" x2="8" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="8" cy="5" r="0.5" fill="currentColor"/></svg>`;
    }
  }

  override render() {
    return html`
      <div part="base" class=${classMap({ toast: true, [this.variant]: true })} role="alert">
        <span class="icon">${this.icon}</span>
        <span class="message">${this.message}</span>
        ${this.actionLabel ? html`
          <button class="action" @click=${this.handleAction}>${this.actionLabel}</button>
        ` : nothing}
        <button class="close" aria-label="Dismiss" @click=${this.handleClose}>
          <svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
    `;
  }
}

@customElement('dk-toast-container')
export class DkToastContainer extends DkElement {
  static override styles = toastStyles.container;

  @property({ reflect: true }) placement: ToastPlacement = 'bottom-right';
  @state() private toasts: ToastData[] = [];

  public push(options: ToastOptions): string {
    const id = Math.random().toString(36).substring(2, 9);
    this.toasts = [...this.toasts, { id, variant: 'info', duration: 5000, ...options }];

    const duration = options.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
    return id;
  }

  public dismiss(id: string) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  override render() {
    return html`
      <div class=${classMap({ container: true, [this.placement]: true })}>
        ${this.toasts.map(t => html`
          <dk-toast
            variant=${t.variant || 'info'}
            message=${t.message}
            action-label=${t.actionLabel || ''}
            @dk-close=${() => this.dismiss(t.id)}
            @dk-action=${() => { t.onAction?.(); this.dismiss(t.id); }}
          ></dk-toast>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-toast': DkToast;
    'dk-toast-container': DkToastContainer;
  }
}
