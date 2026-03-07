import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { faqBaseStyles } from './dk-section-faq.styles.js';

interface FaqEntry {
  question: string;
  answer: string;
}

const twoColStyles = css`
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dk-space-12, 3rem);
    max-width: 960px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .two-col {
      grid-template-columns: 1fr;
    }
  }

  .questions {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .question-btn {
    display: block;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    border-bottom: 1px solid var(--dk-color-border, #e5e7eb);
    padding: var(--dk-space-4, 1rem) var(--dk-space-3, 0.75rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    font-weight: var(--dk-font-medium, 500);
    color: var(--dk-color-text, #111827);
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;
    border-radius: var(--dk-radius-md, 0.5rem);
  }

  .question-btn:hover {
    color: var(--dk-color-primary, #3b82f6);
    background: var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.05));
  }

  .question-btn[data-active] {
    color: var(--dk-color-primary, #3b82f6);
    font-weight: var(--dk-font-semibold, 600);
    background: var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.08));
  }

  .answer-panel {
    padding: var(--dk-space-6, 1.5rem);
    background: var(--dk-color-surface-alt, #f9fafb);
    border-radius: var(--dk-radius-xl, 1rem);
    min-height: 200px;
  }

  .answer-panel h3 {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-lg, 1.125rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
    margin: 0 0 var(--dk-space-4, 1rem);
  }

  .answer-panel p {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
    line-height: var(--dk-leading-relaxed, 1.6);
    margin: 0;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
  }
`;

@customElement('dk-section-faq-two-column')
export class DkSectionFaqTwoColumn extends DkSectionElement {
  static override styles = [faqBaseStyles, twoColStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property({ type: Array }) items: FaqEntry[] = [];

  @state() private _selectedIndex = -1;

  protected override onEnterViewport() {
    const btns = Array.from(this.shadowRoot?.querySelectorAll('.question-btn') ?? []);
    this.animateEntrance(btns);
  }

  override render() {
    const selected = this._selectedIndex >= 0 ? this.items[this._selectedIndex] : null;
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline || this.subheadline
            ? html`<div class="section-header animate-target" part="header">
                ${this.headline ? html`<h2 part="headline">${this.headline}</h2>` : nothing}
                ${this.subheadline ? html`<p class="subheadline" part="subheadline">${this.subheadline}</p>` : nothing}
              </div>`
            : nothing}
          <div class="two-col" part="two-col">
            <div class="questions" part="questions">
              ${this.items.map(
                (item, i) => html`
                  <button
                    class="question-btn"
                    ?data-active=${i === this._selectedIndex}
                    @click=${() => { this._selectedIndex = i; }}
                    part="question-btn"
                  >${item.question}</button>
                `
              )}
            </div>
            <div class="answer-panel" part="answer-panel">
              ${selected
                ? html`
                    <h3>${selected.question}</h3>
                    <p>${selected.answer}</p>
                  `
                : html`<div class="empty-state">Select a question to see the answer</div>`}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-faq-two-column': DkSectionFaqTwoColumn;
  }
}
