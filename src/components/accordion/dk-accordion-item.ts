import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';
import { dkAnimate } from '../../core/motion.js';

const styles = css`
  :host {
    display: block;
    border-bottom: 1px solid var(--dk-color-border, #e5e7eb);
  }

  :host(:first-of-type) {
    border-top: 1px solid var(--dk-color-border, #e5e7eb);
  }

  .trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--dk-space-4, 1rem) var(--dk-space-2, 0.5rem);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-base, 1rem);
    font-weight: var(--dk-font-medium, 500);
    color: var(--dk-color-text, #111827);
    line-height: var(--dk-leading-normal, 1.5);
    gap: var(--dk-space-3, 0.75rem);
    transition: color 0.15s ease;
  }

  .trigger:hover:not(:disabled) {
    color: var(--dk-color-primary, #3b82f6);
  }

  .trigger:focus-visible {
    outline: 2px solid var(--dk-color-primary, #3b82f6);
    outline-offset: -2px;
    border-radius: var(--dk-radius-sm, 0.25rem);
  }

  .trigger:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    transition: transform 0.25s ease;
    color: var(--dk-color-text-muted, #6b7280);
  }

  :host([open]) .icon {
    transform: rotate(180deg);
  }

  .content {
    overflow: hidden;
    height: 0;
  }

  .content-inner {
    padding: 0 var(--dk-space-2, 0.5rem) var(--dk-space-4, 1rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
    line-height: var(--dk-leading-relaxed, 1.6);
  }
`;

@customElement('dk-accordion-item')
export class DkAccordionItem extends DkElement {
  static override styles = styles;

  @property() label = '';
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _contentHeight = '0px';

  private _triggerId = `dk-accordion-trigger-${Math.random().toString(36).slice(2, 8)}`;
  private _regionId = `dk-accordion-region-${Math.random().toString(36).slice(2, 8)}`;

  override firstUpdated() {
    if (this.open) {
      // Set initial height if open by default
      requestAnimationFrame(() => {
        const inner = this.shadowRoot?.querySelector('.content-inner') as HTMLElement | null;
        if (inner) {
          this._contentHeight = inner.offsetHeight + 'px';
        }
      });
    }
  }

  async toggle() {
    if (this.disabled) return;

    this.open = !this.open;
    this.emitEvent('dk-accordion-toggle', { open: this.open, label: this.label });

    await this.updateComplete;
    const content = this.shadowRoot?.querySelector('.content') as HTMLElement | null;
    if (!content) return;

    if (this.open) {
      const inner = content.querySelector('.content-inner') as HTMLElement;
      const fullHeight = inner ? inner.offsetHeight : 0;
      dkAnimate(content, { height: ['0px', fullHeight + 'px'] }, { duration: 0.25 });
      this._contentHeight = fullHeight + 'px';
    } else {
      const currentHeight = content.scrollHeight + 'px';
      dkAnimate(content, { height: [currentHeight, '0px'] }, { duration: 0.25 });
      this._contentHeight = '0px';
    }
  }

  /** Programmatic close (used by dk-accordion for single-open mode) */
  async close() {
    if (!this.open) return;
    this.open = false;

    await this.updateComplete;
    const content = this.shadowRoot?.querySelector('.content') as HTMLElement | null;
    if (!content) return;

    const currentHeight = content.scrollHeight + 'px';
    dkAnimate(content, { height: [currentHeight, '0px'] }, { duration: 0.25 });
    this._contentHeight = '0px';
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle();
    }
  }

  override render() {
    return html`
      <button
        class="trigger"
        part="trigger"
        id=${this._triggerId}
        @click=${this.toggle}
        @keydown=${this._handleKeyDown}
        aria-expanded=${this.open}
        aria-controls=${this._regionId}
        ?disabled=${this.disabled}
      >
        <span>${this.label}</span>
        <svg class="icon" part="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="content" part="content" role="region" id=${this._regionId} aria-labelledby=${this._triggerId} style="height: ${this._contentHeight}">
        <div class="content-inner">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-accordion-item': DkAccordionItem;
  }
}
