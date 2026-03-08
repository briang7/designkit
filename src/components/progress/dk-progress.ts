import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { DkElement } from '../../core/dk-element.js';
import { reducedMotion } from '../../core/animations.js';

export type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger';
export type ProgressSize = 'sm' | 'md' | 'lg';

@customElement('dk-progress')
export class DkProgress extends DkElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: var(--dk-font-sans);
    }

    .label {
      display: block;
      margin-bottom: var(--dk-space-1);
      font-size: var(--dk-text-sm);
      font-weight: var(--dk-font-medium);
      color: var(--dk-color-text);
    }

    .base {
      width: 100%;
      background: var(--dk-color-surface, #e5e7eb);
      border-radius: var(--dk-radius-full);
      overflow: hidden;
    }

    .base.sm { height: 4px; }
    .base.md { height: 8px; }
    .base.lg { height: 16px; }

    .bar {
      height: 100%;
      border-radius: var(--dk-radius-full);
      transition: width 0.4s ease;
      min-width: 0;
    }

    /* Variants */
    .bar.primary { background: var(--dk-color-primary); }
    .bar.success { background: var(--dk-color-success); }
    .bar.warning { background: var(--dk-color-warning); }
    .bar.danger  { background: var(--dk-color-danger); }

    /* Striped */
    .bar.striped {
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
    }

    /* Animated stripes */
    .bar.animated {
      animation: dk-progress-stripes 1s linear infinite;
    }

    @keyframes dk-progress-stripes {
      from { background-position: 1rem 0; }
      to   { background-position: 0 0; }
    }

    ${reducedMotion}
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: String }) label = '';
  @property({ reflect: true }) variant: ProgressVariant = 'primary';
  @property({ reflect: true }) size: ProgressSize = 'md';
  @property({ type: Boolean }) striped = false;
  @property({ type: Boolean }) animated = false;

  private get percentage(): number {
    const clamped = Math.max(0, Math.min(this.value, this.max));
    return this.max > 0 ? (clamped / this.max) * 100 : 0;
  }

  override render() {
    const barClasses = {
      bar: true,
      [this.variant]: true,
      striped: this.striped || this.animated,
      animated: this.animated,
    };

    const barStyles = {
      width: `${this.percentage}%`,
    };

    return html`
      ${this.label ? html`<span part="label" class="label">${this.label}</span>` : ''}
      <div
        part="base"
        class=${classMap({ base: true, [this.size]: true })}
        role="progressbar"
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        aria-label=${this.label || 'Progress'}
      >
        <div part="bar" class=${classMap(barClasses)} style=${styleMap(barStyles)}></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-progress': DkProgress;
  }
}
