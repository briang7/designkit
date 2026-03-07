import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';
import { dkAnimate } from '../../core/motion.js';

const styles = css`
  :host {
    display: block;
    margin-bottom: var(--dk-space-2, 0.5rem);
  }

  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--dk-space-2, 0.5rem) var(--dk-space-3, 0.75rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-xs, 0.75rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text-muted, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: default;
  }

  :host([collapsible]) .heading {
    cursor: pointer;
    border-radius: var(--dk-radius-md, 0.5rem);
    transition: background 0.15s ease;
  }

  :host([collapsible]) .heading:hover {
    background: var(--dk-color-surface-alt, #f9fafb);
  }

  .chevron {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  :host([collapsible]:not([open])) .chevron {
    transform: rotate(-90deg);
  }

  .content {
    overflow: hidden;
  }

  .content-inner {
    padding: var(--dk-space-1, 0.25rem) 0;
  }
`;

@customElement('dk-sidebar-group')
export class DkSidebarGroup extends DkElement {
  static override styles = styles;

  @property() label = '';
  @property({ type: Boolean, reflect: true }) collapsible = false;
  @property({ type: Boolean, reflect: true }) open = true;

  private async _toggle() {
    if (!this.collapsible) return;
    this.open = !this.open;

    await this.updateComplete;
    const content = this.shadowRoot?.querySelector('.content') as HTMLElement | null;
    if (!content) return;

    if (this.open) {
      const inner = content.querySelector('.content-inner') as HTMLElement;
      const h = inner ? inner.offsetHeight : 0;
      dkAnimate(content, { height: ['0px', h + 'px'] }, { duration: 0.25 });
    } else {
      const h = content.scrollHeight + 'px';
      dkAnimate(content, { height: [h, '0px'] }, { duration: 0.25 });
    }
  }

  override render() {
    return html`
      <div part="group">
        <button class="heading" part="heading" @click=${this._toggle}>
          <span>${this.label}</span>
          ${this.collapsible
            ? html`<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`
            : ''}
        </button>
        <div class="content" style="height: ${this.open ? 'auto' : '0px'}">
          <div class="content-inner">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-sidebar-group': DkSidebarGroup;
  }
}
