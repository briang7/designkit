import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

@customElement('dk-command-item')
export class DkCommandItem extends DkElement {
  static override styles = css`
    :host {
      display: block;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: var(--dk-radius-sm, 4px);
      font-family: var(--dk-font-sans, sans-serif);
      font-size: var(--dk-text-sm, 0.875rem);
      color: var(--dk-color-text, #1a1a1a);
      transition: background 0.1s ease;
    }

    :host(:hover) {
      background: var(--dk-color-primary-light, #e0e7ff);
    }

    :host([active]) {
      background: var(--dk-color-primary-light, #e0e7ff);
    }

    :host([hidden]) {
      display: none;
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: String }) keywords = '';
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean, reflect: true }) override hidden = false;

  get searchText(): string {
    return `${this.textContent ?? ''} ${this.keywords}`.toLowerCase();
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-command-item': DkCommandItem;
  }
}
