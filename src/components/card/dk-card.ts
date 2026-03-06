import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { cardStyles } from './dk-card.styles.js';

export type CardVariant = 'elevated' | 'outlined';

@customElement('dk-card')
export class DkCard extends DkElement {
  static override styles = cardStyles;

  @property({ reflect: true }) variant: CardVariant = 'elevated';

  override render() {
    return html`
      <div part="base" class=${classMap({ card: true, [this.variant]: true })}>
        <slot name="header"></slot>
        <slot name="media"></slot>
        <div part="body" class="body"><slot></slot></div>
        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-card': DkCard;
  }
}
