import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { dkAnimate } from '../../core/motion.js';
import { avatarStyles } from './dk-avatar.styles.js';

export type AvatarSize = 'sm' | 'md' | 'lg';

@customElement('dk-avatar')
export class DkAvatar extends DkElement {
  static override styles = avatarStyles;

  @property() src = '';
  @property() alt = '';
  @property() initials = '';
  @property({ reflect: true }) size: AvatarSize = 'md';
  @property({ reflect: true }) status: 'online' | 'offline' | 'away' | '' = '';

  @state() private hasImageError = false;

  private handleError() {
    this.hasImageError = true;
  }

  private handleImageLoad(e: Event) {
    const img = e.target as HTMLElement;
    dkAnimate(img, { opacity: [0, 1] }, { duration: 0.3 });
  }

  override render() {
    const showImage = this.src && !this.hasImageError;
    return html`
      <span part="base" class=${classMap({ avatar: true, [this.size]: true })} role="img" aria-label=${this.alt || this.initials || 'avatar'}>
        ${showImage
          ? html`<img src=${this.src} alt=${this.alt} @error=${this.handleError} @load=${this.handleImageLoad} />`
          : html`<span class="initials">${this.initials || '?'}</span>`
        }
        ${this.status ? html`<span class="status ${this.status}" aria-label=${this.status}></span>` : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-avatar': DkAvatar;
  }
}
