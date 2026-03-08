import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { blogBaseStyles } from './dk-section-blog.styles.js';

const gridStyles = css`
  .header {
    text-align: center;
    margin-bottom: var(--dk-space-12, 3rem);
  }

  .header .description {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--dk-space-8, 2rem);
  }

  @media (min-width: 640px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .grid ::slotted(*) {
    height: 100%;
  }
`;

@customElement('dk-section-blog-grid')
export class DkSectionBlogGrid extends DkSectionElement {
  static override styles = [blogBaseStyles, gridStyles];

  @property() headline = '';
  @property() subheadline = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('h2'),
      this.shadowRoot?.querySelector('.description'),
      this.shadowRoot?.querySelector('.grid'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline || this.subheadline
            ? html`<div class="header animate-target" part="header">
                ${this.headline
                  ? html`<h2 part="headline">${this.headline}</h2>`
                  : nothing}
                ${this.subheadline
                  ? html`<p class="description" part="subheadline">${this.subheadline}</p>`
                  : nothing}
              </div>`
            : nothing}
          <div class="grid animate-target" part="grid">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-blog-grid': DkSectionBlogGrid;
  }
}
