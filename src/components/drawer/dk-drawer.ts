import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { FocusTrap } from '../../core/focus-trap.js';
import { drawerStyles } from './dk-drawer.styles.js';

export type DrawerPlacement = 'start' | 'end' | 'top' | 'bottom';

@customElement('dk-drawer')
export class DkDrawer extends DkElement {
  static override styles = drawerStyles;

  @property({ type: Boolean, reflect: true }) open = false;
  @property() label = '';
  @property({ reflect: true }) placement: DrawerPlacement = 'end';
  @property() size = '400px';

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

    const isHorizontal = this.placement === 'start' || this.placement === 'end';
    const panelStyle = isHorizontal
      ? `width: ${this.size}; height: 100%;`
      : `height: ${this.size}; width: 100%;`;

    return html`
      <div class="overlay" @click=${this.handleBackdropClick} @keydown=${this.handleKeyDown}>
        <div
          part="panel"
          class=${classMap({ panel: true, [this.placement]: true })}
          style=${panelStyle}
          role="dialog"
          aria-modal="true"
          aria-label=${this.label || nothing}
          @click=${(e: Event) => e.stopPropagation()}
        >
          <header part="header" class="header">
            <span class="title">${this.label}</span>
            <button class="close" aria-label="Close drawer" @click=${this.hide}>
              <svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
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
    'dk-drawer': DkDrawer;
  }
}
