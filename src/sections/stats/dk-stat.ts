import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';
import { ScrollObserver } from '../../core/scroll-observer.js';

const styles = css`
  :host {
    display: block;
    text-align: center;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--dk-space-2, 0.5rem);
  }

  .value {
    font-family: var(--dk-font-display, var(--dk-font-sans, system-ui, sans-serif));
    font-size: var(--dk-font-size-display, clamp(2.5rem, 5vw, 3.5rem));
    font-weight: var(--dk-font-extrabold, 800);
    line-height: 1;
    color: var(--dk-color-primary, #3b82f6);
    letter-spacing: -0.04em;
    font-variant-numeric: tabular-nums;
  }

  .label {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    font-weight: var(--dk-font-medium, 500);
    color: var(--dk-color-text-muted, #6b7280);
    line-height: var(--dk-leading-relaxed, 1.6);
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: var(--dk-radius-lg, 0.75rem);
    background: var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1));
    color: var(--dk-color-primary, #3b82f6);
    margin-bottom: var(--dk-space-2, 0.5rem);
  }

  .icon-container ::slotted(svg) {
    width: 24px;
    height: 24px;
  }
`;

@customElement('dk-stat')
export class DkStat extends DkElement {
  static override styles = styles;

  @property({ type: Number }) value = 0;
  @property() label = '';
  @property() prefix = '';
  @property() suffix = '';

  @state() private _displayValue = 0;
  @state() private _animated = false;
  private _scrollObserver?: ScrollObserver;

  override connectedCallback() {
    super.connectedCallback();
    this._scrollObserver = new ScrollObserver();
    this._scrollObserver.observe(this, () => this._animateCount());
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._scrollObserver?.disconnect();
  }

  private _animateCount() {
    if (this._animated) return;
    this._animated = true;

    // Guard against NaN/non-numeric values
    const target = Number.isFinite(this.value) ? this.value : 0;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      this._displayValue = target;
      return;
    }

    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      this._displayValue = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  override render() {
    return html`
      <div class="stat" part="stat">
        <slot name="icon"></slot>
        <span class="value" part="value">${this.prefix}${this._displayValue}${this.suffix}</span>
        <span class="label" part="label">${this.label}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-stat': DkStat;
  }
}
