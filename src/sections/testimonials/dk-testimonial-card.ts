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
    gap: var(--dk-space-4, 1rem);
    padding: var(--dk-space-6, 1.5rem);
    background: var(--dk-color-surface, #ffffff);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-xl, 1rem);
    flex: 1;
    box-sizing: border-box;
  }

  .quote {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-lg, 1.125rem);
    line-height: var(--dk-leading-relaxed, 1.6);
    color: var(--dk-color-text, #111827);
    margin: 0;
    flex: 1;
  }

  .quote::before {
    content: '\\201C';
    font-size: 2em;
    line-height: 0;
    vertical-align: -0.3em;
    color: var(--dk-color-primary, #3b82f6);
    margin-right: 0.1em;
  }

  .stars {
    display: flex;
    gap: 2px;
    color: var(--dk-color-warning, #f59e0b);
  }

  .star {
    width: 18px;
    height: 18px;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: var(--dk-space-3, 0.75rem);
  }

  .avatar {
    width: 44px;
    height: 44px;
    border-radius: var(--dk-radius-full, 9999px);
    object-fit: cover;
    background: var(--dk-color-neutral-100, #f3f4f6);
  }

  .avatar-placeholder {
    width: 44px;
    height: 44px;
    border-radius: var(--dk-radius-full, 9999px);
    background: var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1));
    color: var(--dk-color-primary, #3b82f6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--dk-font-bold, 700);
    font-size: var(--dk-font-size-sm, 0.875rem);
  }

  .author-text {
    display: flex;
    flex-direction: column;
  }

  .author-name {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
  }

  .author-role {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-xs, 0.75rem);
    color: var(--dk-color-text-muted, #6b7280);
  }
`;

@customElement('dk-testimonial-card')
export class DkTestimonialCard extends DkElement {
  static override styles = styles;

  @property() quote = '';
  @property() author = '';
  @property() role = '';
  @property() avatar = '';
  @property({ type: Number }) rating = 0;

  private _renderStars() {
    if (this.rating <= 0) return nothing;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const filled = i < this.rating;
      stars.push(html`
        <svg class="star" viewBox="0 0 24 24" aria-hidden="true">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"
            fill=${filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
      `);
    }
    return html`<div class="stars" part="stars" aria-label="${this.rating} out of 5 stars">${stars}</div>`;
  }

  private _getInitials(): string {
    return this.author
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  override render() {
    return html`
      <div class="card" part="card">
        <p class="quote" part="quote">${this.quote}</p>
        ${this._renderStars()}
        <div class="author-info" part="author-info">
          ${this.avatar
            ? html`<img class="avatar" src=${this.avatar} alt=${this.author} loading="lazy" />`
            : html`<div class="avatar-placeholder">${this._getInitials()}</div>`}
          <div class="author-text">
            <span class="author-name" part="author-name">${this.author}</span>
            ${this.role ? html`<span class="author-role" part="author-role">${this.role}</span>` : nothing}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-testimonial-card': DkTestimonialCard;
  }
}
