import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';
import { dkAnimate } from '../../core/motion.js';

const styles = css`
  :host {
    display: block;
    border-bottom: 1px solid var(--dk-color-border, #e5e7eb);
  }

  .trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--dk-space-5, 1.25rem) var(--dk-space-3, 0.75rem);
    margin: 0 calc(var(--dk-space-3, 0.75rem) * -1);
    background: none;
    border: none;
    border-radius: var(--dk-radius-md, 0.375rem);
    cursor: pointer;
    text-align: left;
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-base, 1rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
    line-height: var(--dk-leading-relaxed, 1.6);
    gap: var(--dk-space-4, 1rem);
    transition: color 200ms ease, background 200ms ease;
  }

  .trigger:hover {
    color: var(--dk-color-primary, #3b82f6);
    background: var(--dk-color-surface-hover, rgba(0, 0, 0, 0.02));
  }

  .icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 200ms ease;
    color: var(--dk-color-text-muted, #6b7280);
  }

  .trigger:hover .icon {
    color: var(--dk-color-primary, #3b82f6);
  }

  :host([open]) .icon {
    transform: rotate(45deg);
    color: var(--dk-color-primary, #3b82f6);
  }

  .answer {
    overflow: hidden;
    height: 0;
  }

  .answer-inner {
    padding: 0 0 var(--dk-space-5, 1.25rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
    line-height: var(--dk-leading-relaxed, 1.6);
  }
`;

@customElement('dk-faq-item')
export class DkFaqItem extends DkElement {
  static override styles = styles;

  @property() question = '';
  @property({ type: Boolean, reflect: true }) open = false;

  @state() private _contentHeight = '0px';

  async toggle() {
    this.open = !this.open;
    this.emitEvent('dk-faq-toggle', { open: this.open, question: this.question });

    await this.updateComplete;
    const content = this.shadowRoot?.querySelector('.answer') as HTMLElement | null;
    if (!content) return;

    if (this.open) {
      const inner = content.querySelector('.answer-inner') as HTMLElement;
      const fullHeight = inner ? inner.offsetHeight : 0;
      dkAnimate(content, { height: ['0px', fullHeight + 'px'] }, { duration: 0.3 });
      this._contentHeight = fullHeight + 'px';
    } else {
      const currentHeight = content.scrollHeight + 'px';
      dkAnimate(content, { height: [currentHeight, '0px'] }, { duration: 0.3 });
      this._contentHeight = '0px';
    }
  }

  override render() {
    return html`
      <button class="trigger" part="trigger" @click=${this.toggle} aria-expanded=${this.open}>
        <span part="question">${this.question}</span>
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      <div class="answer" part="answer" style="height: ${this._contentHeight}">
        <div class="answer-inner">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-faq-item': DkFaqItem;
  }
}
