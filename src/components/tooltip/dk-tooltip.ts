import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { dkAnimate } from '../../core/motion.js';
import { tooltipStyles } from './dk-tooltip.styles.js';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@customElement('dk-tooltip')
export class DkTooltip extends DkElement {
  static override styles = tooltipStyles;

  @property() content = '';
  @property({ reflect: true }) placement: TooltipPlacement = 'top';
  @property({ type: Number }) delay = 200;

  @state() private visible = false;
  private showTimeout?: ReturnType<typeof setTimeout>;

  private show() {
    this.showTimeout = setTimeout(() => {
      this.visible = true;
      this.updateComplete.then(() => {
        const tooltipEl = this.shadowRoot?.querySelector('.tooltip') as HTMLElement;
        if (tooltipEl) {
          dkAnimate(tooltipEl, { opacity: [0, 1], scale: [0.9, 1] }, { duration: 0.15 });
        }
      });
    }, this.delay);
  }

  private hide() {
    clearTimeout(this.showTimeout);
    this.visible = false;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.visible) {
      this.hide();
    }
  }

  override render() {
    return html`
      <div
        class="trigger-wrapper"
        @mouseenter=${this.show}
        @mouseleave=${this.hide}
        @focusin=${this.show}
        @focusout=${this.hide}
        @keydown=${this.handleKeyDown}
      >
        <slot></slot>
        ${this.visible ? html`
          <div part="tooltip" class=${classMap({ tooltip: true, [this.placement]: true })} role="tooltip">
            <span class="arrow"></span>
            ${this.content}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-tooltip': DkTooltip;
  }
}
