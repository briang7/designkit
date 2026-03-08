import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';
import type { DkAccordionItem } from './dk-accordion-item.js';

const styles = css`
  :host {
    display: block;
  }
`;

@customElement('dk-accordion')
export class DkAccordion extends DkElement {
  static override styles = styles;

  /** Allow multiple panels to be open simultaneously */
  @property({ type: Boolean }) multiple = false;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('dk-accordion-toggle', this._handleToggle as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dk-accordion-toggle', this._handleToggle as EventListener);
  }

  private _handleToggle = (e: CustomEvent<{ open: boolean; label: string }>) => {
    if (this.multiple || !e.detail.open) return;

    // Close all other items when one opens (single-open mode)
    const source = e.composedPath()[0] as DkAccordionItem;
    const items = this.querySelectorAll('dk-accordion-item') as NodeListOf<DkAccordionItem>;
    items.forEach((item) => {
      if (item !== source) {
        item.close();
      }
    });
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-accordion': DkAccordion;
  }
}
