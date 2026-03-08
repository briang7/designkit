import { html, css, svg, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';

const STAR_SIZE: Record<string, number> = { sm: 16, md: 24, lg: 32 };

@customElement('dk-rating')
export class DkRating extends DkElement {
  static override styles = css`
    :host {
      display: inline-block;
    }

    .rating {
      display: inline-flex;
      align-items: center;
      gap: var(--dk-space-1, 2px);
      font-family: var(--dk-font-sans, sans-serif);
      user-select: none;
    }

    .rating:focus-visible {
      outline: none;
      border-radius: var(--dk-radius-sm, 4px);
      box-shadow: var(--dk-focus-ring, 0 0 0 3px rgba(59, 130, 246, 0.5));
    }

    .rating.interactive {
      cursor: pointer;
    }

    .star {
      position: relative;
      flex-shrink: 0;
      transition: transform 0.15s ease;
    }

    .rating.interactive .star:hover {
      transform: scale(1.2);
    }

    .star svg {
      display: block;
    }

    .star-empty {
      color: var(--dk-color-border, #d1d5db);
    }

    .star-filled {
      color: var(--dk-rating-color, var(--dk-color-warning, #f59e0b));
    }

    .star-half {
      position: relative;
    }

    .star-half .half-bg {
      color: var(--dk-color-border, #d1d5db);
    }

    .star-half .half-fg {
      position: absolute;
      top: 0;
      left: 0;
      clip-path: inset(0 50% 0 0);
      color: var(--dk-rating-color, var(--dk-color-warning, #f59e0b));
    }

    @media (prefers-reduced-motion: reduce) {
      .star {
        transition: none;
      }
    }
  `;

  @property({ type: Number, reflect: true }) value = 0;
  @property({ type: Number, reflect: true }) max = 5;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  @state() private _hoverValue = -1;

  private get _displayValue(): number {
    return this._hoverValue >= 0 ? this._hoverValue : this.value;
  }

  private get _starSize(): number {
    return STAR_SIZE[this.size] ?? STAR_SIZE.md;
  }

  private _starPath() {
    return svg`<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>`;
  }

  private _renderStar(index: number) {
    const display = this._displayValue;
    const s = this._starSize;
    const filled = index + 1 <= display;
    const half = !filled && index + 0.5 <= display && index + 1 > display;

    if (half) {
      return html`
        <span
          part="star"
          class="star star-half"
          @mouseenter=${() => this._onStarHover(index + 1)}
          @click=${() => this._onStarClick(index + 1)}
        >
          <svg class="half-bg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor">
            ${this._starPath()}
          </svg>
          <svg class="half-fg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor">
            ${this._starPath()}
          </svg>
        </span>
      `;
    }

    return html`
      <span
        part="star"
        class=${classMap({ star: true, 'star-filled': filled, 'star-empty': !filled })}
        @mouseenter=${() => this._onStarHover(index + 1)}
        @click=${() => this._onStarClick(index + 1)}
      >
        <svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor">
          ${this._starPath()}
        </svg>
      </span>
    `;
  }

  private _onStarHover(val: number) {
    if (this.readonly) return;
    this._hoverValue = val;
  }

  private _onMouseLeave() {
    this._hoverValue = -1;
  }

  private _onStarClick(val: number) {
    if (this.readonly) return;
    this.value = val;
    this.emitEvent('dk-rating-change', { value: this.value });
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.readonly) return;

    let newValue = this.value;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = Math.min(this.value + 0.5, this.max);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = Math.max(this.value - 0.5, 0);
        break;
      case 'Home':
        e.preventDefault();
        newValue = 0;
        break;
      case 'End':
        e.preventDefault();
        newValue = this.max;
        break;
      default:
        return;
    }

    if (newValue !== this.value) {
      this.value = newValue;
      this.emitEvent('dk-rating-change', { value: this.value });
    }
  }

  override render() {
    const interactive = !this.readonly;
    const stars = [];
    for (let i = 0; i < this.max; i++) {
      stars.push(this._renderStar(i));
    }

    return html`
      <div
        part="base"
        class=${classMap({ rating: true, interactive })}
        role="slider"
        tabindex=${this.readonly ? -1 : 0}
        aria-label="Rating"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.value}
        aria-readonly=${this.readonly ? 'true' : nothing}
        @mouseleave=${this._onMouseLeave}
        @keydown=${this._handleKeyDown}
      >
        ${stars}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-rating': DkRating;
  }
}
