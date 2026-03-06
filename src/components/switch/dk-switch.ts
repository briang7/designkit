import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { switchStyles } from './dk-switch.styles.js';
import { dkSpring } from '../../core/motion.js';

@customElement('dk-switch')
export class DkSwitch extends DkElement {
  static override styles = switchStyles;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  private getThumbDistance(): number {
    switch (this.size) {
      case 'sm': return 16;
      case 'lg': return 24;
      default: return 20;
    }
  }

  private handleClick() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.emitEvent('dk-change', { checked: this.checked });

    const thumb = this.shadowRoot?.querySelector('.thumb') as HTMLElement | null;
    if (thumb) {
      const distance = this.getThumbDistance();
      const from = this.checked ? '0px' : `${distance}px`;
      const to = this.checked ? `${distance}px` : '0px';
      dkSpring(thumb, { transform: [`translateX(${from})`, `translateX(${to})`] });
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ') {
      e.preventDefault();
      this.handleClick();
    }
  }

  override render() {
    return html`
      <label part="base" class=${classMap({ switch: true, [this.size]: true, checked: this.checked, disabled: this.disabled })}>
        <span
          class="track"
          role="switch"
          tabindex=${this.disabled ? -1 : 0}
          aria-checked=${this.checked ? 'true' : 'false'}
          aria-disabled=${this.disabled ? 'true' : nothing}
          aria-labelledby="label"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        >
          <span class="thumb"></span>
        </span>
        <span class="label" id="label"><slot></slot></span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-switch': DkSwitch;
  }
}
