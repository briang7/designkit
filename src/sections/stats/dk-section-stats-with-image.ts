import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { statsBaseStyles } from './dk-section-stats.styles.js';
import './dk-stat.js';

const withImageStyles = css`
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dk-space-12, 3rem);
    align-items: center;
  }

  .media {
    position: relative;
    border-radius: var(--dk-radius-xl, 1rem);
    overflow: hidden;
    min-height: 360px;
  }

  .image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--dk-radius-xl, 1rem);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--dk-space-6, 1.5rem);
  }

  .section-header {
    text-align: left;
    margin-bottom: var(--dk-space-8, 2rem);
  }

  @media (max-width: 768px) {
    .layout {
      grid-template-columns: 1fr;
    }

    .media {
      min-height: 240px;
    }

    .stats {
      grid-template-columns: 1fr;
    }
  }
`;

@customElement('dk-section-stats-with-image')
export class DkSectionStatsWithImage extends DkSectionElement {
  static override styles = [statsBaseStyles, withImageStyles];

  @property() headline = '';
  @property() image = '';

  protected override onEnterViewport() {
    const stats = Array.from(this.querySelectorAll('dk-stat'));
    this.animateEntrance(stats);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          <div class="layout" part="layout">
            <div class="media" part="media">
              ${this.image
                ? html`<img class="image" src=${this.image} alt="" part="image" />`
                : nothing}
            </div>
            <div>
              ${this.headline
                ? html`<div class="section-header" part="header">
                    <h2 part="headline">${this.headline}</h2>
                  </div>`
                : nothing}
              <div class="stats" part="stats">
                <slot></slot>
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
    'dk-section-stats-with-image': DkSectionStatsWithImage;
  }
}
