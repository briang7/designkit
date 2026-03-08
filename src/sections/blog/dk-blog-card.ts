import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--dk-color-surface, #ffffff);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-xl, 1rem);
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-sizing: border-box;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  a.card {
    color: inherit;
    text-decoration: none;
  }

  .image-wrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 9;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  .card:hover .image {
    transform: scale(1.03);
  }

  .category-badge {
    position: absolute;
    top: var(--dk-space-3, 0.75rem);
    left: var(--dk-space-3, 0.75rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-xs, 0.75rem);
    font-weight: var(--dk-font-semibold, 600);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.625rem;
    border-radius: var(--dk-radius-full, 9999px);
    background: var(--dk-color-primary, #3b82f6);
    color: #ffffff;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: var(--dk-space-5, 1.25rem);
    gap: var(--dk-space-3, 0.75rem);
  }

  .title {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-lg, 1.125rem);
    font-weight: var(--dk-font-bold, 700);
    line-height: var(--dk-leading-tight, 1.3);
    color: var(--dk-color-text, #111827);
    margin: 0;
  }

  .description {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    line-height: var(--dk-leading-relaxed, 1.6);
    color: var(--dk-color-text-muted, #6b7280);
    margin: 0;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-xs, 0.75rem);
    color: var(--dk-color-text-muted, #6b7280);
    padding-top: var(--dk-space-3, 0.75rem);
    border-top: 1px solid var(--dk-color-border, #e5e7eb);
    margin-top: auto;
  }

  .author {
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
  }

  .date {
    color: var(--dk-color-text-muted, #6b7280);
  }
`;

@customElement('dk-blog-card')
export class DkBlogCard extends DkElement {
  static override styles = styles;

  @property() image = '';
  @property() title = '';
  @property() description = '';
  @property() author = '';
  @property() date = '';
  @property() category = '';
  @property() href = '';

  override render() {
    const inner = html`
      ${this.image
        ? html`<div class="image-wrapper" part="image">
            ${this.category
              ? html`<span class="category-badge" part="category-badge">${this.category}</span>`
              : nothing}
            <img class="image" src=${this.image} alt=${this.title} loading="lazy" />
          </div>`
        : nothing}
      <div class="content" part="content">
        <h3 class="title" part="title">${this.title}</h3>
        ${this.description
          ? html`<p class="description" part="description">${this.description}</p>`
          : nothing}
        ${this.author || this.date
          ? html`<div class="meta" part="meta">
              ${this.author ? html`<span class="author" part="author">${this.author}</span>` : nothing}
              ${this.date ? html`<time class="date" part="date">${this.date}</time>` : nothing}
            </div>`
          : nothing}
      </div>
    `;

    return this.href
      ? html`<a class="card" part="card" href=${this.href}>${inner}</a>`
      : html`<div class="card" part="card">${inner}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-blog-card': DkBlogCard;
  }
}
