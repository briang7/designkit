import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { cardStyles } from './dk-card.styles.js';
import '../../signature/skeleton/dk-skeleton.js';

export type CardVariant = 'elevated' | 'outlined';

@customElement('dk-card')
export class DkCard extends DkElement {
  static override styles = cardStyles;

  @property({ reflect: true }) variant: CardVariant = 'elevated';
  @property({ type: Boolean, reflect: true }) loading = false;

  override render() {
    const classes = { card: true, [this.variant]: true };

    if (this.loading) {
      return html`
        <div part="base" class=${classMap(classes)}>
          <div class="body">
            <dk-skeleton variant="rect" height="120px" style="margin-bottom: 12px"></dk-skeleton>
            <dk-skeleton variant="text" lines="3"></dk-skeleton>
          </div>
        </div>
      `;
    }

    return html`
      <div part="base" class=${classMap(classes)}>
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
