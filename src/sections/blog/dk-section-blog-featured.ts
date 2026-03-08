import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { blogBaseStyles } from './dk-section-blog.styles.js';

const featuredStyles = css`
  .header {
    text-align: center;
    margin-bottom: var(--dk-space-12, 3rem);
  }

  .header .description {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--dk-space-8, 2rem);
  }

  @media (min-width: 768px) {
    .layout {
      grid-template-columns: 3fr 2fr;
    }
  }

  .featured ::slotted(*) {
    height: 100%;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-6, 1.5rem);
  }

  .sidebar ::slotted(*) {
    flex: 1;
  }
`;

@customElement('dk-section-blog-featured')
export class DkSectionBlogFeatured extends DkSectionElement {
  static override styles = [blogBaseStyles, featuredStyles];

  @property() headline = '';
  @property() subheadline = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('h2'),
      this.shadowRoot?.querySelector('.description'),
      this.shadowRoot?.querySelector('.featured'),
      this.shadowRoot?.querySelector('.sidebar'),
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
          <div class="layout" part="layout">
            <div class="featured animate-target" part="featured">
              <slot name="featured"></slot>
            </div>
            <div class="sidebar animate-target" part="sidebar">
              <slot></slot>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-blog-featured': DkSectionBlogFeatured;
  }
}
