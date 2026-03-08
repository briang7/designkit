import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { errorBaseStyles } from './dk-section-error.styles.js';

const withLinksStyles = css`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-height: calc(100vh - 200px);
    justify-content: center;
  }

  h1 {
    letter-spacing: -0.05em;
    margin-bottom: var(--dk-space-2, 0.5rem);
  }

  .description {
    max-width: 480px;
  }

  .cta-group {
    justify-content: center;
    margin-bottom: var(--dk-space-12, 3rem);
  }

  .links-section {
    width: 100%;
    max-width: 800px;
    border-top: 1px solid var(--dk-color-border, #e5e7eb);
    padding-top: var(--dk-space-8, 2rem);
  }

  :host([bg="brand"]) .links-section,
  :host([bg="dark"]) .links-section {
    border-top-color: rgba(255, 255, 255, 0.15);
  }

  :host([bg="dark"]) .links-grid ::slotted(*) {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.12);
    color: #ffffff;
  }

  :host([bg="dark"]) .links-grid ::slotted(*:hover) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  :host([bg="brand"]) .links-grid ::slotted(*) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }

  :host([bg="brand"]) .links-grid ::slotted(*:hover) {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .links-title {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-lg, 1.125rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
    margin: 0 0 var(--dk-space-6, 1.5rem);
  }

  :host([bg="brand"]) .links-title,
  :host([bg="dark"]) .links-title {
    color: var(--dk-section-text-on-dark, #ffffff);
  }

  .links-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--dk-space-4, 1rem);
    text-align: left;
  }

  .links-grid ::slotted(*) {
    display: flex;
    flex-direction: column;
    padding: var(--dk-space-4, 1rem) var(--dk-space-5, 1.25rem);
    border-radius: var(--dk-radius-lg, 0.75rem);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    background: var(--dk-color-surface, #ffffff);
    text-decoration: none;
    color: var(--dk-color-text, #111827);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .links-grid ::slotted(*:hover) {
    border-color: var(--dk-color-primary, #3b82f6);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 768px) {
    .links-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 480px) {
    .links-grid {
      grid-template-columns: 1fr;
    }
  }
`;

@customElement('dk-section-error-with-links')
export class DkSectionErrorWithLinks extends DkSectionElement {
  static override styles = [errorBaseStyles, withLinksStyles];

  @property() code = '404';
  @property() headline = 'Page not found';
  @property() description = "Sorry, we couldn't find the page you're looking for.";

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('h1'),
      this.shadowRoot?.querySelector('h2'),
      this.shadowRoot?.querySelector('.description'),
      this.shadowRoot?.querySelector('.cta-group'),
      this.shadowRoot?.querySelector('.links-section'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          <h1 class="animate-target" part="code">${this.code}</h1>
          <h2 class="animate-target" part="headline">${this.headline}</h2>
          <p class="description animate-target" part="description">${this.description}</p>
          <div class="cta-group animate-target" part="cta-group">
            <slot name="cta"></slot>
          </div>
          <div class="links-section animate-target" part="links-section">
            <h3 class="links-title" part="links-title">Popular pages</h3>
            <div class="links-grid" part="links-grid">
              <slot name="links"></slot>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-error-with-links': DkSectionErrorWithLinks;
  }
}
