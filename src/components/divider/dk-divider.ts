import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

export type DividerAlign = 'center' | 'left' | 'right';

@customElement('dk-divider')
export class DkDivider extends DkElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([vertical]) {
      display: inline-block;
      align-self: stretch;
    }

    /* ── Horizontal ── */

    .divider {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--dk-color-border);
    }

    /* No label – single unbroken line */
    .divider:not(.has-content)::after {
      display: none;
    }

    /* Label alignment */
    .divider.left::before {
      flex: 0 0 var(--dk-space-4, 1rem);
    }

    .divider.right::after {
      flex: 0 0 var(--dk-space-4, 1rem);
    }

    /* ── Vertical ── */

    .divider.vertical {
      flex-direction: column;
      width: auto;
      height: 100%;
      min-height: 1.5em;
    }

    .divider.vertical::before,
    .divider.vertical::after {
      height: auto;
      width: 1px;
      flex: 1;
    }

    .divider.vertical:not(.has-content)::after {
      display: none;
    }

    /* ── Label ── */

    .label {
      padding: 0 var(--dk-space-3, 0.75rem);
      color: var(--dk-color-text-muted);
      font-family: var(--dk-font-sans);
      font-size: var(--dk-font-size-sm, 0.875rem);
      line-height: 1;
      white-space: nowrap;
      user-select: none;
    }

    .divider.vertical .label {
      padding: var(--dk-space-2, 0.5rem) 0;
    }
  `;

  /** Optional text label displayed on the divider line. */
  @property({ reflect: true }) label?: string;

  /** Alignment of the label along the line. */
  @property({ reflect: true }) align: DividerAlign = 'center';

  /** Render as a vertical divider. */
  @property({ type: Boolean, reflect: true }) vertical = false;

  override render() {
    const hasLabel = !!this.label;
    const classes = [
      'divider',
      this.vertical ? 'vertical' : '',
      this.align !== 'center' ? this.align : '',
      hasLabel ? 'has-content' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        part="base"
        class=${classes}
        role="separator"
        aria-orientation=${this.vertical ? 'vertical' : 'horizontal'}
      >
        ${hasLabel
          ? html`<span part="label" class="label"><slot>${this.label}</slot></span>`
          : html`<slot @slotchange=${this._onSlotChange}></slot>`}
      </div>
    `;
  }

  private _hasSlottedContent = false;

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this._hasSlottedContent = nodes.some(
      (n) => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()),
    );
    const base = this.shadowRoot?.querySelector('.divider');
    if (base) {
      base.classList.toggle('has-content', this._hasSlottedContent);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-divider': DkDivider;
  }
}
