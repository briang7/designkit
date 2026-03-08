import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { testimonialsBaseStyles } from './dk-section-testimonials.styles.js';

const localStyles = css`
  .featured {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }

  .quote-mark {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(6rem, 12vw, 10rem);
    line-height: 0.8;
    color: var(--dk-color-primary, #3b82f6);
    opacity: 0.15;
    user-select: none;
    margin-bottom: var(--dk-space-2, 0.5rem);
  }

  .quote {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-xl, clamp(1.25rem, 3vw, 1.75rem));
    line-height: var(--dk-leading-relaxed, 1.6);
    color: var(--dk-color-text, #111827);
    font-style: italic;
    margin: 0 0 var(--dk-space-8, 2rem);
    max-width: 720px;
  }

  .stars {
    display: flex;
    gap: 4px;
    justify-content: center;
    color: var(--dk-color-warning, #f59e0b);
    margin-bottom: var(--dk-space-6, 1.5rem);
  }

  .star {
    width: 24px;
    height: 24px;
  }

  .author-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--dk-space-3, 0.75rem);
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: var(--dk-radius-full, 9999px);
    object-fit: cover;
    background: var(--dk-color-neutral-100, #f3f4f6);
    border: 3px solid var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.15));
  }

  .avatar-placeholder {
    width: 80px;
    height: 80px;
    border-radius: var(--dk-radius-full, 9999px);
    background: var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1));
    color: var(--dk-color-primary, #3b82f6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--dk-font-bold, 700);
    font-size: var(--dk-font-size-xl, 1.25rem);
  }

  .author-name {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-lg, 1.125rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
  }

  .author-role {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
  }
`;

@customElement('dk-section-testimonials-featured')
export class DkSectionTestimonialsFeatured extends DkSectionElement {
  static override styles = [testimonialsBaseStyles, localStyles];

  @property() headline = '';
  @property() quote = '';
  @property() author = '';
  @property() role = '';
  @property() avatar = '';
  @property({ type: Number }) rating = 0;

  protected override onEnterViewport() {
    const targets = this.shadowRoot!.querySelectorAll('.animate-target');
    this.animateEntrance(Array.from(targets));
  }

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
    return html`<div class="stars animate-target" part="stars" aria-label="${this.rating} out of 5 stars">${stars}</div>`;
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
      <section part="section">
        <div class="container" part="container">
          ${this.headline
            ? html`<div class="section-header animate-target">
                <h2 part="headline">${this.headline}</h2>
              </div>`
            : nothing}
          <div class="featured">
            <div class="quote-mark animate-target" part="quote-mark" aria-hidden="true">\u201C</div>
            <p class="quote animate-target" part="quote">${this.quote}</p>
            ${this._renderStars()}
            <div class="author-section animate-target" part="author-section">
              ${this.avatar
                ? html`<img class="avatar" part="avatar" src=${this.avatar} alt=${this.author} loading="lazy" />`
                : html`<div class="avatar-placeholder" part="avatar">${this._getInitials()}</div>`}
              <span class="author-name" part="author-name">${this.author}</span>
              ${this.role ? html`<span class="author-role" part="author-role">${this.role}</span>` : nothing}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-testimonials-featured': DkSectionTestimonialsFeatured;
  }
}
