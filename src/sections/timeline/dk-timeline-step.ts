import { html, css, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

const icons: Record<string, ReturnType<typeof svg>> = {
  lightning: svg`<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  shield: svg`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" fill="none"/>`,
  users: svg`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" fill="none"/>`,
  chart: svg`<line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  globe: svg`<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" stroke-width="2" fill="none"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>`,
  code: svg`<polyline points="16 18 22 12 16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><polyline points="8 6 2 12 8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  heart: svg`<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" fill="none"/>`,
  star: svg`<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" stroke="currentColor" stroke-width="2" fill="none"/>`,
  check: svg`<polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  clock: svg`<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
};

const styles = css`
  :host {
    display: block;
    position: relative;
  }

  .step {
    display: flex;
    align-items: flex-start;
    gap: var(--dk-space-4, 1rem);
    position: relative;
  }

  .connector {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    position: relative;
  }

  .connector::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: var(--dk-timeline-connector-height, 2rem);
    background: var(--dk-timeline-line-color, #e5e7eb);
  }

  :host(:last-child) .connector::after {
    display: none;
  }

  .dot {
    width: var(--dk-timeline-dot-size, 1rem);
    height: var(--dk-timeline-dot-size, 1rem);
    border-radius: 50%;
    background: var(--dk-timeline-dot-color, #e5e7eb);
    border: 2px solid var(--dk-timeline-dot-border, #ffffff);
    flex-shrink: 0;
    z-index: 1;
    box-shadow: 0 0 0 3px var(--dk-timeline-dot-ring, #e5e7eb);
  }

  :host([active]) .dot {
    background: var(--dk-color-primary, #3b82f6);
    box-shadow: 0 0 0 3px var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.2));
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--dk-timeline-icon-size, 2.5rem);
    height: var(--dk-timeline-icon-size, 2.5rem);
    border-radius: 50%;
    background: var(--dk-timeline-icon-bg, #f3f4f6);
    color: var(--dk-color-text-muted, #6b7280);
    flex-shrink: 0;
    z-index: 1;
  }

  :host([active]) .icon-container {
    background: var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1));
    color: var(--dk-color-primary, #3b82f6);
  }

  .icon-container svg {
    width: 18px;
    height: 18px;
  }

  .content {
    padding-bottom: var(--dk-space-6, 1.5rem);
    min-width: 0;
  }

  h3 {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-lg, 1.125rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-text, #111827);
    margin: 0 0 var(--dk-space-1, 0.25rem);
    line-height: var(--dk-leading-tight, 1.3);
  }

  .date {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-primary, #3b82f6);
    font-weight: var(--dk-font-medium, 500);
    margin: 0 0 var(--dk-space-2, 0.5rem);
  }

  p {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-base, 1rem);
    line-height: var(--dk-leading-relaxed, 1.6);
    color: var(--dk-color-text-muted, #6b7280);
    margin: 0;
  }
`;

@customElement('dk-timeline-step')
export class DkTimelineStep extends DkElement {
  static override styles = styles;

  @property() title = '';
  @property() description = '';
  @property() icon = '';
  @property() date = '';
  @property({ type: Boolean, reflect: true }) active = false;

  override render() {
    const iconSvg = icons[this.icon];
    return html`
      <div class="step" part="step">
        <div class="connector" part="connector">
          ${iconSvg
            ? html`<div class="icon-container" part="icon-container">
                <svg viewBox="0 0 24 24" aria-hidden="true">${iconSvg}</svg>
              </div>`
            : html`<div class="dot" part="dot"></div>`}
        </div>
        <div class="content" part="content">
          ${this.date ? html`<p class="date" part="date">${this.date}</p>` : nothing}
          <h3 part="title">${this.title}</h3>
          ${this.description ? html`<p part="description">${this.description}</p>` : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-timeline-step': DkTimelineStep;
  }
}
