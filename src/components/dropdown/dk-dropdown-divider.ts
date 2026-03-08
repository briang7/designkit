import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';
import { css } from 'lit';

@customElement('dk-dropdown-divider')
export class DkDropdownDivider extends DkElement {
  static override styles = css`
    :host {
      display: block;
    }

    .divider {
      height: 1px;
      margin: var(--dk-space-1) 0;
      background: var(--dk-color-border);
    }
  `;

  override render() {
    return html`<div part="divider" class="divider" role="separator"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-dropdown-divider': DkDropdownDivider;
  }
}
