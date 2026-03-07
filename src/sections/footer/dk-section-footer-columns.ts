import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { footerBaseStyles } from './dk-section-footer.styles.js';
import './dk-footer-helpers.js';

const columnsStyles = css`
  .grid {
    display: grid;
    grid-template-columns: 2fr repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--dk-space-8, 2rem);
  }

  .brand-col {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-4, 1rem);
  }

  .columns {
    display: contents;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }

    .brand-col {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 480px) {
    .grid {
      grid-template-columns: 1fr;
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
          <div class="grid" part="grid">
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
