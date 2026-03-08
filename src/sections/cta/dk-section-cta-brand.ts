import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { ctaBaseStyles } from './dk-section-cta.styles.js';

const brandStyles = css`
  :host {
    background: var(--dk-section-bg-brand, #3b82f6);
    color: #ffffff;

    /* Override button tokens so slotted buttons are visible on brand bg */
    --dk-color-text: #ffffff;
    --dk-color-surface: rgba(255, 255, 255, 0.9);
    --dk-color-ghost-hover-text: #3b82f6;
    --dk-color-border: rgba(255, 255, 255, 0.25);
    --dk-color-border-hover: rgba(255, 255, 255, 0.4);
    --dk-color-primary: #ffffff;
    --dk-color-primary-text: #3b82f6;
    --dk-color-primary-hover: #2563eb;
    --dk-color-primary-hover-text: #ffffff;
  }

  .container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .panel {
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--dk-radius-xl, 1rem);
    padding: var(--dk-space-12, 3rem) var(--dk-space-10, 2.5rem);
    max-width: 720px;
    width: 100%;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  h2 {
    color: #ffffff;
  }

  .description {
    color: rgba(255, 255, 255, 0.85);
    max-width: 560px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-group {
    justify-content: center;
  }
`;

@customElement('dk-section-cta-brand')
export class DkSectionCtaBrand extends DkSectionElement {
  static override styles = [ctaBaseStyles, brandStyles];

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
        <div class="container" part="container">
          <div class="panel animate-target" part="panel">
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
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-cta-brand': DkSectionCtaBrand;
  }
}
