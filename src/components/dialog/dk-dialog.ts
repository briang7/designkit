import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';
import { FocusTrap } from '../../core/focus-trap.js';
import { dialogStyles } from './dk-dialog.styles.js';

@customElement('dk-dialog')
export class DkDialog extends DkElement {
  static override styles = dialogStyles;

  @property({ type: Boolean, reflect: true }) open = false;
  @property() label = '';
  @property({ type: Boolean, attribute: 'no-close-button' }) noCloseButton = false;

  private focusTrap?: FocusTrap;

  public show() {
    this.open = true;
    this.emitEvent('dk-show');
    this.updateComplete.then(() => {
      const panel = this.shadowRoot!.querySelector('.panel') as HTMLElement;
      if (panel) {
        this.focusTrap = new FocusTrap(panel);
        this.focusTrap.activate();
      }
    });
  }

  public hide() {
    const event = this.emitEvent('dk-close');
    if (event.defaultPrevented) return;
    this.open = false;
    this.focusTrap?.deactivate();
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.hide();
    }
  }

  private handleBackdropClick() {
    this.hide();
  }

  override render() {
    if (!this.open) return nothing;
    return html`
      <div class="overlay" @click=${this.handleBackdropClick} @keydown=${this.handleKeyDown}>
        <div part="panel" class="panel" role="dialog" aria-modal="true" aria-label=${this.label || nothing} @click=${(e: Event) => e.stopPropagation()}>
          <header part="header" class="header">
            <span class="title">${this.label}</span>
            <slot name="header"></slot>
            ${!this.noCloseButton ? html`<button class="close" aria-label="Close dialog" @click=${this.hide}>
              <svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>` : nothing}
          </header>
          <div part="body" class="body"><slot></slot></div>
          <footer part="footer" class="footer"><slot name="footer"></slot></footer>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-dialog': DkDialog;
  }
}
