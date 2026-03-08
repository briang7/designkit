import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { footerBaseStyles } from './dk-section-footer.styles.js';
import './dk-footer-helpers.js';

const centeredStyles = css`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--dk-space-6, 1.5rem);
  }

  .brand-name {
    margin: 0;
  }

  .links {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--dk-space-1, 0.25rem);
  }

  .links ::slotted(dk-footer-link) {
    display: inline-block;
  }

  .links ::slotted(a) {
    font-size: var(--dk-text-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
    text-decoration: none;
  }

  .social-row {
    justify-content: center;
  }

  .copyright {
    margin: 0;
  }
`;

@customElement('dk-section-footer-centered')
export class DkSectionFooterCentered extends DkSectionElement {
  static override styles = [footerBaseStyles, centeredStyles];

  @property() brand = '';
  @property() copyright = `\u00A9 ${new Date().getFullYear()}`;

  protected override onEnterViewport() {
    const container = this.shadowRoot?.querySelector('.container');
    if (container) this.animateEntrance([container]);
  }

  override render() {
    return html`
      <footer part="footer">
        <div class="container" part="container">
          <slot name="logo">
            <p class="brand-name" part="brand-name">${this.brand}</p>
          </slot>

          <div class="links" part="links">
            <slot name="links"></slot>
          </div>

          <div class="social-row" part="social-row">
            <slot name="social"></slot>
          </div>

          <p class="copyright" part="copyright">${this.copyright}</p>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-footer-centered': DkSectionFooterCentered;
  }
}
