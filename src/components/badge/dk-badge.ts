import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { badgeStyles } from './dk-badge.styles.js';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning';
export type BadgeSize = 'sm' | 'md' | 'lg';

@customElement('dk-badge')
export class DkBadge extends DkElement {
  static override styles = badgeStyles;

  @property({ reflect: true }) variant: BadgeVariant = 'default';
  @property({ reflect: true }) size: BadgeSize = 'md';
  @property({ type: Boolean }) dot = false;
  @property({ type: Boolean }) removable = false;

  private handleRemove() {
    this.emitEvent('dk-remove');
  }

  override render() {
    return html`
      <span part="base" class=${classMap({ badge: true, [this.variant]: true, [this.size]: true })}>
        ${this.dot ? html`<span class="dot" aria-hidden="true"></span>` : nothing}
        <slot></slot>
        ${this.removable ? html`
          <button class="remove" aria-label="Remove" @click=${this.handleRemove}>×</button>
        ` : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-badge': DkBadge;
  }
}
