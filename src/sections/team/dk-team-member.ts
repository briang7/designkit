import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

const styles = css`
  :host {
    display: block;
  }

  .card {
    position: relative;
    overflow: hidden;
    border-radius: var(--dk-radius-xl, 1rem);
    background: var(--dk-color-surface, #ffffff);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    text-align: center;
    display: flex;
    flex-direction: var(--dk-team-card-direction, column);
  }

  .image-wrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: var(--dk-team-image-aspect, 1);
    max-height: var(--dk-team-image-max-height, none);
    width: var(--dk-team-image-width, auto);
    flex-shrink: 0;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    transition: transform 0.3s ease;
  }

  .card:hover .image-wrapper img {
    transform: scale(1.05);
  }

  .social-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--dk-space-4, 1rem);
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
    display: flex;
    justify-content: center;
    gap: var(--dk-space-3, 0.75rem);
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .card:hover .social-overlay {
    transform: translateY(0);
  }

  .image-placeholder {
    aspect-ratio: 1;
    background: var(--dk-color-neutral-100, #f3f4f6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: var(--dk-color-text-muted, #6b7280);
  }

  .info {
    padding: var(--dk-space-5, 1.25rem);
  }

  .name {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-base, 1rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
    margin: 0 0 var(--dk-space-1, 0.25rem);
  }

  .role {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-primary, #3b82f6);
    margin: 0 0 var(--dk-space-2, 0.5rem);
  }

  .bio {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-xs, 0.75rem);
    color: var(--dk-color-text-muted, #6b7280);
    line-height: var(--dk-leading-relaxed, 1.6);
    margin: 0;
  }
`;

@customElement('dk-team-member')
export class DkTeamMember extends DkElement {
  static override styles = styles;

  @property() name = '';
  @property() role = '';
  @property() image = '';
  @property() bio = '';

  private _getInitials(): string {
    return this.name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  override render() {
    return html`
      <div class="card" part="card">
        <div class="image-wrapper" part="image-wrapper">
          ${this.image
            ? html`<img src=${this.image} alt=${this.name} loading="lazy" part="image" />`
            : html`<div class="image-placeholder">${this._getInitials()}</div>`}
          <div class="social-overlay" part="social-overlay">
            <slot name="social"></slot>
          </div>
        </div>
        <div class="info" part="info">
          <h3 class="name" part="name">${this.name}</h3>
          ${this.role ? html`<p class="role" part="role">${this.role}</p>` : nothing}
          ${this.bio ? html`<p class="bio" part="bio">${this.bio}</p>` : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-team-member': DkTeamMember;
  }
}
