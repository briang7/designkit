import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { logoCloudBaseStyles } from './dk-section-logo-cloud.styles.js';

const gridStyles = css`
  .container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    margin-bottom: var(--dk-space-10, 2.5rem);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--dk-logo-cloud-columns, 4), 1fr);
    gap: var(--dk-logo-cloud-grid-gap, 1px);
    width: 100%;
    border: 1px solid var(--dk-logo-cloud-border-color, rgba(0, 0, 0, 0.08));
    border-radius: var(--dk-radius-lg, 0.75rem);
    overflow: hidden;
    background: var(--dk-logo-cloud-border-color, rgba(0, 0, 0, 0.08));
  }

  :host([bg="dark"]) .grid,
  :host([bg="brand"]) .grid {
    border-color: var(--dk-logo-cloud-border-color-on-dark, rgba(255, 255, 255, 0.12));
    background: var(--dk-logo-cloud-border-color-on-dark, rgba(255, 255, 255, 0.12));
  }

  .grid ::slotted(*) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--dk-logo-cloud-grid-padding, 2rem 1.5rem);
    background: var(--dk-logo-cloud-grid-item-bg, #ffffff);
    transition: background var(--dk-logo-cloud-transition, 0.3s ease);
  }

  :host([bg="dark"]) .grid ::slotted(*) {
    background: var(--dk-logo-cloud-grid-item-bg-dark, #111827);
  }

  :host([bg="brand"]) .grid ::slotted(*) {
    background: var(--dk-logo-cloud-grid-item-bg-brand, #3b82f6);
  }

  .grid ::slotted(*:hover) {
    background: var(--dk-logo-cloud-grid-item-bg-hover, #f9fafb);
  }

  :host([bg="dark"]) .grid ::slotted(*:hover) {
    background: var(--dk-logo-cloud-grid-item-bg-hover-dark, #1f2937);
  }

  :host([bg="brand"]) .grid ::slotted(*:hover) {
    background: var(--dk-logo-cloud-grid-item-bg-hover-brand, #2563eb);
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

@customElement('dk-section-logo-cloud-grid')
export class DkSectionLogoCloudGrid extends DkSectionElement {
  static override styles = [logoCloudBaseStyles, gridStyles];

  @property() headline = '';
  @property({ type: Number }) columns = 4;

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('h2'),
      this.shadowRoot?.querySelector('.grid'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline
            ? html`<h2 class="animate-target" part="headline">${this.headline}</h2>`
            : nothing}
          <div
            class="grid animate-target"
            part="grid"
            style="--dk-logo-cloud-columns: ${this.columns}"
          >
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-logo-cloud-grid': DkSectionLogoCloudGrid;
  }
}
