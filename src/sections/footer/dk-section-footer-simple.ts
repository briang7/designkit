import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { footerBaseStyles } from './dk-section-footer.styles.js';
import './dk-footer-helpers.js';

const simpleStyles = css`
  :host {
    padding: var(--dk-space-6, 1.5rem) var(--dk-section-padding-x, 1.5rem);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--dk-space-4, 1rem);
  }

  .left {
    display: flex;
    align-items: center;
    gap: var(--dk-space-6, 1.5rem);
    flex-wrap: wrap;
  }

  .inline-links {
    display: flex;
    align-items: center;
    gap: var(--dk-space-1, 0.25rem);
  }

  .inline-links ::slotted(dk-footer-link) {
    display: inline-block;
  }

  .inline-links ::slotted(a) {
    font-size: var(--dk-text-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
    text-decoration: none;
  }

  .right {
    display: flex;
    align-items: center;
    gap: var(--dk-space-4, 1rem);
  }

  @media (max-width: 640px) {
    .row {
      flex-direction: column;
      text-align: center;
    }

    .left,
    .right {
      justify-content: center;
    }
  }
`;

@customElement('dk-section-footer-simple')
export class DkSectionFooterSimple extends DkSectionElement {
  static override styles = [footerBaseStyles, simpleStyles];

  @property() brand = '';
  @property() copyright = `\u00A9 ${new Date().getFullYear()}`;

  protected override onEnterViewport() {
    const row = this.shadowRoot?.querySelector('.row');
    if (row) this.animateEntrance([row]);
  }

  override render() {
    return html`
      <footer part="footer">
        <div class="container" part="container">
          <div class="row" part="row">
            <div class="left" part="left">
              <slot name="logo">
                <span class="brand-name" part="brand-name">${this.brand}</span>
              </slot>
              <div class="inline-links" part="inline-links">
                <slot name="links"></slot>
              </div>
            </div>
            <div class="right" part="right">
              <div class="social-row" part="social-row">
                <slot name="social"></slot>
              </div>
              <p class="copyright" part="copyright">${this.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-footer-simple': DkSectionFooterSimple;
  }
}
