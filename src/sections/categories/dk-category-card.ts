import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

const styles = css`
  :host {
    display: block;
  }

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: var(--dk-radius-xl, 1rem);
    overflow: hidden;
    min-height: var(--dk-category-card-min-height, 240px);
    height: 100%;
    cursor: pointer;
  }

  .card:focus-within {
    outline: 2px solid var(--dk-color-primary, #3b82f6);
    outline-offset: 2px;
  }

  .image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .card:hover .image {
    transform: scale(1.08);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.75) 0%,
      rgba(0, 0, 0, 0.35) 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
    transition: background 0.35s ease;
  }

  .card:hover .overlay {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0.25) 50%,
      rgba(0, 0, 0, 0.05) 100%
    );
  }

  .content {
    position: relative;
    z-index: 1;
    padding: var(--dk-space-6, 1.5rem);
    color: #ffffff;
  }

  .name {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-lg, 1.125rem);
    font-weight: var(--dk-font-bold, 700);
    margin: 0 0 var(--dk-space-1, 0.25rem);
    line-height: var(--dk-leading-tight, 1.3);
  }

  .description {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    line-height: var(--dk-leading-relaxed, 1.6);
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }

  .count {
    display: inline-flex;
    align-items: center;
    gap: var(--dk-space-1, 0.25rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-xs, 0.75rem);
    font-weight: var(--dk-font-medium, 500);
    color: rgba(255, 255, 255, 0.7);
    margin-top: var(--dk-space-2, 0.5rem);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a::after {
    content: '';
    position: absolute;
    inset: 0;
  }
`;

@customElement('dk-category-card')
export class DkCategoryCard extends DkElement {
  static override styles = styles;

  @property() image = '';
  @property() name = '';
  @property() description = '';
  @property() href = '';
  @property({ type: Number }) count: number | undefined;

  override render() {
    const inner = html`
      <div class="image" part="image" style="background-image: url('${this.image}')"></div>
      <div class="overlay" part="overlay"></div>
      <div class="content" part="content">
        <p class="name" part="name">${this.name}</p>
        ${this.description ? html`<p class="description" part="description">${this.description}</p>` : nothing}
        ${this.count != null ? html`<span class="count" part="count">${this.count} items</span>` : nothing}
      </div>
    `;

    return html`
      <div class="card" part="card">
        ${this.href
          ? html`<a href="${this.href}" aria-label="${this.name}">${inner}</a>`
          : inner}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-category-card': DkCategoryCard;
  }
}
