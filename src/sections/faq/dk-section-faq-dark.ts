import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { faqBaseStyles } from './dk-section-faq.styles.js';
import './dk-faq-item.js';

const darkStyles = css`
  :host {
    --dk-color-text: #f9fafb;
    --dk-color-text-muted: #d1d5db;
    --dk-color-border: rgba(255, 255, 255, 0.12);
    background: var(--dk-color-dark-bg, #111827);
  }

  h2 {
    color: #f9fafb;
  }

  .subheadline {
    color: #d1d5db;
  }

  .faq-list {
    max-width: 768px;
    margin: 0 auto;
  }

  ::slotted(dk-faq-item) {
    --dk-color-text: #f9fafb;
    --dk-color-text-muted: #d1d5db;
    --dk-color-border: rgba(255, 255, 255, 0.12);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
`;

@customElement('dk-section-faq-dark')
export class DkSectionFaqDark extends DkSectionElement {
  static override styles = [faqBaseStyles, darkStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property({ type: Boolean }) multiple = false;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('dk-faq-toggle', this._handleToggle as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dk-faq-toggle', this._handleToggle as EventListener);
  }

  private _handleToggle = (e: CustomEvent<{ open: boolean }>) => {
    if (this.multiple || !e.detail.open) return;
    const items = Array.from(this.querySelectorAll('dk-faq-item'));
    const target = e.composedPath()[0] as HTMLElement;
    items.forEach(item => {
      if (item !== target && item.open) {
        item.toggle();
      }
    });
  };

  protected override onEnterViewport() {
    const items = Array.from(this.querySelectorAll('dk-faq-item'));
    this.animateEntrance(items);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline || this.subheadline
            ? html`<div class="section-header animate-target" part="header">
                ${this.headline ? html`<h2 part="headline">${this.headline}</h2>` : nothing}
                ${this.subheadline ? html`<p class="subheadline" part="subheadline">${this.subheadline}</p>` : nothing}
              </div>`
            : nothing}
          <div class="faq-list" part="faq-list">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-faq-dark': DkSectionFaqDark;
  }
}
