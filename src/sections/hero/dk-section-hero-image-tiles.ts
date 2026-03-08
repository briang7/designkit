import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { heroBaseStyles } from './dk-section-hero.styles.js';

const tilesStyles = css`
  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dk-hero-tiles-gap, 3rem);
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .tiles {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, var(--dk-hero-tile-row-height, 140px));
    gap: var(--dk-hero-tiles-grid-gap, 0.75rem);
  }

  .tile {
    border-radius: var(--dk-hero-tile-radius, var(--dk-radius-lg, 0.75rem));
    overflow: hidden;
    background: var(--dk-hero-tile-bg, #e5e7eb);
  }

  .tile ::slotted(*) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .tile:nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }

  .tile:nth-child(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  .tile:nth-child(3) {
    grid-column: 2 / 3;
    grid-row: 2 / 4;
  }

  .tile:nth-child(4) {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
  }

  @media (max-width: 768px) {
    .split {
      grid-template-columns: 1fr;
    }

    .tiles {
      grid-template-rows: repeat(3, var(--dk-hero-tile-row-height-sm, 120px));
    }
  }
`;

@customElement('dk-section-hero-image-tiles')
export class DkSectionHeroImageTiles extends DkSectionElement {
  static override styles = [heroBaseStyles, tilesStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property() badge = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('.badge'),
      this.shadowRoot?.querySelector('h1'),
      this.shadowRoot?.querySelector('.subheadline'),
      this.shadowRoot?.querySelector('.cta-group'),
      ...Array.from(this.shadowRoot?.querySelectorAll('.tile') ?? []),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container">
          <div class="split">
            <div class="content" part="content">
              ${this.badge
                ? html`<span class="badge animate-target" part="badge">${this.badge}</span>`
                : nothing}
              <h1 class="animate-target" part="headline">${this.headline}</h1>
              ${this.subheadline
                ? html`<p class="subheadline animate-target" part="subheadline">${this.subheadline}</p>`
                : nothing}
              <div class="cta-group animate-target" part="cta-group">
                <slot name="cta-primary"></slot>
                <slot name="cta-secondary"></slot>
              </div>
            </div>
            <div class="tiles" part="tiles">
              <div class="tile animate-target" part="tile">
                <slot name="image-1"></slot>
              </div>
              <div class="tile animate-target" part="tile">
                <slot name="image-2"></slot>
              </div>
              <div class="tile animate-target" part="tile">
                <slot name="image-3"></slot>
              </div>
              <div class="tile animate-target" part="tile">
                <slot name="image-4"></slot>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-hero-image-tiles': DkSectionHeroImageTiles;
  }
}
