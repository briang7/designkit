import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { featuresBaseStyles } from './dk-section-features.styles.js';

interface TabItem {
  label: string;
  image: string;
  title: string;
  description: string;
}

const tabsStyles = css`
  .tab-bar {
    display: flex;
    justify-content: center;
    gap: var(--dk-space-3, 0.75rem);
    margin-bottom: var(--dk-space-10, 2.5rem);
    flex-wrap: wrap;
  }

  .tab-button {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    font-weight: var(--dk-font-semibold, 600);
    padding: var(--dk-space-2, 0.5rem) var(--dk-space-5, 1.25rem);
    border-radius: var(--dk-radius-full, 9999px);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    background: var(--dk-color-surface, #ffffff);
    color: var(--dk-color-text-muted, #6b7280);
    cursor: pointer;
    transition: all 0.2s ease;
    line-height: 1.5;
  }

  .tab-button:hover {
    border-color: var(--dk-color-primary, #3b82f6);
    color: var(--dk-color-primary, #3b82f6);
  }

  .tab-button[aria-selected='true'] {
    background: var(--dk-color-primary, #3b82f6);
    border-color: var(--dk-color-primary, #3b82f6);
    color: var(--dk-color-on-primary, #ffffff);
  }

  .tab-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dk-space-10, 2.5rem);
    align-items: center;
    animation: dk-fade-in 0.35s ease;
  }

  @keyframes dk-fade-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .tab-image {
    width: 100%;
    height: auto;
    border-radius: var(--dk-radius-xl, 1rem);
    box-shadow: var(--dk-shadow-md, 0 4px 12px -2px rgba(0, 0, 0, 0.1));
    object-fit: cover;
  }

  .tab-body {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-4, 1rem);
  }

  .tab-title {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-h3, clamp(1.5rem, 3vw, 1.875rem));
    font-weight: var(--dk-font-bold, 700);
    color: var(--dk-color-text, #111827);
    margin: 0;
    line-height: var(--dk-leading-tight, 1.15);
    letter-spacing: -0.02em;
  }

  .tab-description {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-body, 1rem);
    line-height: var(--dk-leading-relaxed, 1.6);
    color: var(--dk-color-text-muted, #6b7280);
    margin: 0;
  }

  @media (max-width: 768px) {
    .tab-content {
      grid-template-columns: 1fr;
    }

    .tab-image {
      order: -1;
    }
  }
`;

@customElement('dk-section-features-tabs')
export class DkSectionFeaturesTabs extends DkSectionElement {
  static override styles = [featuresBaseStyles, tabsStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property({ type: Array }) tabs: TabItem[] = [];

  @state() private _activeTab = 0;

  private get _parsedTabs(): TabItem[] {
    if (typeof this.tabs === 'string') {
      try {
        return JSON.parse(this.tabs as string);
      } catch {
        return [];
      }
    }
    return this.tabs;
  }

  private _selectTab(index: number) {
    this._activeTab = index;
  }

  protected override onEnterViewport() {
    const targets = Array.from(
      this.renderRoot.querySelectorAll('.animate-target')
    );
    this.animateEntrance(targets);
  }

  override render() {
    const items = this._parsedTabs;
    const active = items[this._activeTab];

    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline || this.subheadline
            ? html`<div class="section-header animate-target" part="header">
                ${this.headline ? html`<h2 part="headline">${this.headline}</h2>` : nothing}
                ${this.subheadline ? html`<p class="subheadline" part="subheadline">${this.subheadline}</p>` : nothing}
              </div>`
            : nothing}
          ${items.length > 0
            ? html`
                <div class="tab-bar animate-target" part="tab-bar" role="tablist">
                  ${items.map(
                    (tab, i) => html`
                      <button
                        class="tab-button"
                        part="tab-button"
                        role="tab"
                        aria-selected=${i === this._activeTab ? 'true' : 'false'}
                        @click=${() => this._selectTab(i)}
                      >
                        ${tab.label}
                      </button>
                    `
                  )}
                </div>
                ${active
                  ? html`
                      <div class="tab-content" part="tab-content" .key=${this._activeTab}>
                        ${active.image
                          ? html`<img
                              class="tab-image"
                              part="tab-image"
                              src=${active.image}
                              alt=${active.title || ''}
                              loading="lazy"
                            />`
                          : nothing}
                        <div class="tab-body">
                          ${active.title
                            ? html`<h3 class="tab-title" part="tab-title">${active.title}</h3>`
                            : nothing}
                          ${active.description
                            ? html`<p class="tab-description" part="tab-description">${active.description}</p>`
                            : nothing}
                        </div>
                      </div>
                    `
                  : nothing}
              `
            : nothing}
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-features-tabs': DkSectionFeaturesTabs;
  }
}
