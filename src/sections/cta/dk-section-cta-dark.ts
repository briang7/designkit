import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { ctaBaseStyles } from './dk-section-cta.styles.js';

const darkStyles = css`
  :host {
    background: var(--dk-section-bg-dark, #111827);
    color: #ffffff;
    position: relative;
    overflow: hidden;

    /* Override button tokens so slotted buttons are visible on dark bg */
    --dk-color-text: #ffffff;
    --dk-color-surface: rgba(255, 255, 255, 0.9);
    --dk-color-ghost-hover-text: #111827;
    --dk-color-border: rgba(255, 255, 255, 0.25);
    --dk-color-border-hover: rgba(255, 255, 255, 0.4);
  }

  .container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15), transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  h2 {
    color: #ffffff;
  }

  .description {
    color: rgba(255, 255, 255, 0.75);
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-group {
    justify-content: center;
  }
`;

@customElement('dk-section-cta-dark')
export class DkSectionCtaDark extends DkSectionElement {
  static override styles = [ctaBaseStyles, darkStyles];

  @property() headline = '';
  @property() description = '';

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('h2'),
      this.shadowRoot?.querySelector('.description'),
      this.shadowRoot?.querySelector('.cta-group'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div class="glow" part="glow"></div>
        <div class="container" part="container">
          ${this.headline
            ? html`<h2 class="animate-target" part="headline">${this.headline}</h2>`
            : nothing}
          ${this.description
            ? html`<p class="description animate-target" part="description">${this.description}</p>`
            : nothing}
          <div class="cta-group animate-target" part="cta-group">
            <slot name="cta"></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-cta-dark': DkSectionCtaDark;
  }
}
