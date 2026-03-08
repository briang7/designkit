import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { footerBaseStyles } from './dk-section-footer.styles.js';
import './dk-footer-helpers.js';

const darkStyles = css`
  :host {
    background: var(--dk-footer-dark-bg, #111827) !important;
    border-top-color: var(--dk-footer-dark-border, #1f2937) !important;
  }

  .brand-name {
    color: var(--dk-footer-dark-text, #f9fafb);
  }

  .description {
    color: var(--dk-footer-dark-muted, #9ca3af);
  }

  .copyright {
    color: var(--dk-footer-dark-muted, #6b7280);
  }

  .bottom {
    border-top-color: var(--dk-footer-dark-border, #1f2937);
  }

  .top-section {
    display: flex;
    gap: var(--dk-space-12, 3rem);
  }

  .brand-col {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-4, 1rem);
    flex: 0 0 280px;
  }

  .columns {
    flex: 1;
  }

  ::slotted(div) {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 2rem !important;
  }

  /* Override helper text colors in dark context */
  ::slotted(dk-footer-column) {
    --dk-color-text: var(--dk-footer-dark-text, #f9fafb);
    --dk-color-text-muted: var(--dk-footer-dark-muted, #9ca3af);
    --dk-color-surface-hover: rgba(255, 255, 255, 0.08);
  }

  ::slotted(dk-footer-link) {
    --dk-color-text-muted: var(--dk-footer-dark-muted, #9ca3af);
    --dk-color-text: var(--dk-footer-dark-text, #f9fafb);
  }

  ::slotted(dk-footer-social) {
    --dk-color-text-muted: var(--dk-footer-dark-muted, #9ca3af);
    --dk-color-text: var(--dk-footer-dark-text, #f9fafb);
    --dk-color-surface-hover: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 768px) {
    .top-section {
      flex-direction: column;
    }

    .brand-col {
      flex: none;
    }

    ::slotted(div) {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (max-width: 480px) {
    ::slotted(div) {
      grid-template-columns: 1fr !important;
    }
  }
`;

@customElement('dk-section-footer-dark')
export class DkSectionFooterDark extends DkSectionElement {
  static override styles = [footerBaseStyles, darkStyles];

  @property() brand = '';
  @property() description = '';
  @property() copyright = `\u00A9 ${new Date().getFullYear()}`;

  protected override onEnterViewport() {
    const els = Array.from(
      this.shadowRoot?.querySelectorAll('.brand-col, .columns, .bottom') ?? []
    );
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <footer part="footer">
        <div class="container" part="container">
          <div class="top-section" part="top-section">
            <div class="brand-col" part="brand-col">
              <slot name="logo">
                <p class="brand-name" part="brand-name">${this.brand}</p>
              </slot>
              ${this.description
                ? html`<p class="description" part="description">${this.description}</p>`
                : ''}
            </div>
            <div class="columns" part="columns">
              <slot name="columns"></slot>
            </div>
          </div>

          <div class="bottom" part="bottom-bar">
            <p class="copyright" part="copyright">${this.copyright}</p>
            <div class="social-row" part="social-row">
              <slot name="social"></slot>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-footer-dark': DkSectionFooterDark;
  }
}
