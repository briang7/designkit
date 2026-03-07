import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';
import { skeletonStyles } from './dk-skeleton.styles.js';

@customElement('dk-skeleton')
export class DkSkeleton extends DkElement {
  static override styles = skeletonStyles;

  @property({ type: String }) variant: 'text' | 'circle' | 'rect' = 'text';
  @property({ type: Number }) lines = 1;
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = '';

  override render() {
    if (this.variant === 'text') {
      return html`${Array.from({ length: this.lines }, () =>
        html`<div class="skeleton skeleton--text" style="width: ${this.width}"></div>`
      )}`;
    }

    const size = this.height || (this.variant === 'circle' ? '48px' : '200px');
    return html`
      <div
        class="skeleton skeleton--${this.variant}"
        style="width: ${this.variant === 'circle' ? size : this.width}; height: ${size}"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-skeleton': DkSkeleton;
  }
}
