import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { featuresBaseStyles } from './dk-section-features.styles.js';
import './dk-feature-row.js';

const alternatingStyles = css`
  .rows {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-16, 4rem);
  }

  ::slotted(dk-feature-row:nth-child(even)) {
    --_reverse: 1;
  }
`;

@customElement('dk-section-features-alternating')
export class DkSectionFeaturesAlternating extends DkSectionElement {
  static override styles = [featuresBaseStyles, alternatingStyles];

  @property() headline = '';
  @property() subheadline = '';

  override connectedCallback() {
    super.connectedCallback();
    this._applyAlternating();
  }

  private _applyAlternating() {
    const rows = this.querySelectorAll('dk-feature-row');
    rows.forEach((row, i) => {
      if (i % 2 === 1) {
        row.setAttribute('reverse', '');
      } else {
        row.removeAttribute('reverse');
      }
    });
  }

  protected override onEnterViewport() {
    const rows = Array.from(this.querySelectorAll('dk-feature-row'));
    this.animateEntrance(rows);
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
          <div class="rows" part="rows">
            <slot @slotchange=${this._applyAlternating}></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-features-alternating': DkSectionFeaturesAlternating;
  }
}
