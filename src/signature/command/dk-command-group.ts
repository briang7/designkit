import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

@customElement('dk-command-group')
export class DkCommandGroup extends DkElement {
  static override styles = css`
    :host {
      display: block;
    }

    .group-label {
      padding: 8px 12px 4px;
      font-size: var(--dk-text-xs, 0.75rem);
      font-weight: var(--dk-font-semibold, 600);
      color: var(--dk-color-text-muted, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-family: var(--dk-font-sans, sans-serif);
    }
  `;

  @property({ type: String }) label = '';
  @state() private allHidden = false;

  /** Called by parent dk-command after filtering */
  updateVisibility() {
    const items = this.querySelectorAll('dk-command-item');
    this.allHidden = items.length > 0 && [...items].every(item => item.hidden);
  }

  override render() {
    if (this.allHidden) return nothing;
    return html`
      ${this.label ? html`<div class="group-label">${this.label}</div>` : nothing}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-command-group': DkCommandGroup;
  }
}
