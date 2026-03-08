import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { footerBaseStyles } from './dk-section-footer.styles.js';
import './dk-footer-helpers.js';

const columnsStyles = css`
  .top {
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 2rem;
  }

  /* If a wrapper div is slotted, it spans all columns and becomes its own grid */
  ::slotted(div) {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
    gap: 2rem !important;
    grid-column: 1 / -1;
  }

  @media (max-width: 768px) {
    .top {
      flex-direction: column;
    }

    .brand-col {
      flex: none;
    }
  }

  @media (max-width: 480px) {
    .columns {
      grid-template-columns: repeat(2, 1fr);
    }

    ::slotted(div) {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
`;

@customElement('dk-section-footer-columns')
export class DkSectionFooterColumns extends DkSectionElement {
  static override styles = [footerBaseStyles, columnsStyles];

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
          <div class="top" part="top">
            <div class="brand-col" part="brand-col">
              <slot name="logo">
                <p class="brand-name" part="brand-name">${this.brand}</p>
              </slot>
              ${this.description
                ? html`<p class="description" part="description">${this.description}</p>`
                : ''}
            </div>
            <div class="columns">
              <slot name="columns"></slot>
            </div>
          </div>

          <div class="bottom" part="bottom">
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
    'dk-section-footer-columns': DkSectionFooterColumns;
  }
}
