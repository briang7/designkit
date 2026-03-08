import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { timelineBaseStyles } from './dk-section-timeline.styles.js';
import './dk-timeline-step.js';

const alternatingStyles = css`
  .steps {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--dk-space-4, 1rem);
    padding-top: var(--dk-space-8, 2rem);
  }

  /* Horizontal connecting line */
  .steps::before {
    content: '';
    position: absolute;
    top: calc(var(--dk-space-8, 2rem) + 1.25rem);
    left: 0;
    right: 0;
    height: 2px;
    background: var(--dk-timeline-line-color, #e5e7eb);
  }

  ::slotted(dk-timeline-step) {
    flex: 1;
    text-align: center;
    position: relative;
    --dk-timeline-connector-height: 0;
  }

  /* Alternate content above and below the line */
  ::slotted(dk-timeline-step:nth-child(even)) {
    margin-top: var(--dk-space-16, 4rem);
  }

  ::slotted(dk-timeline-step:nth-child(odd)) {
    margin-top: 0;
  }

  /* Responsive: stack vertically on mobile */
  @media (max-width: 768px) {
    .steps {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding-top: 0;
    }

    .steps::before {
      top: 0;
      bottom: 0;
      left: 1.25rem;
      right: auto;
      width: 2px;
      height: auto;
    }

    ::slotted(dk-timeline-step) {
      text-align: left;
      margin-top: 0 !important;
      margin-bottom: var(--dk-space-6, 1.5rem);
      padding-left: var(--dk-space-12, 3rem);
    }

    ::slotted(dk-timeline-step:last-child) {
      margin-bottom: 0;
    }
  }
`;

@customElement('dk-section-timeline-alternating')
export class DkSectionTimelineAlternating extends DkSectionElement {
  static override styles = [timelineBaseStyles, alternatingStyles];

  @property() headline = '';
  @property() subheadline = '';

  protected override onEnterViewport() {
    const steps = Array.from(
      this.querySelectorAll('dk-timeline-step')
    );
    this.animateEntrance(steps);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline || this.subheadline
            ? html`<div class="section-header animate-target" part="header">
                ${this.headline ? html`<h2 part="headline">${this.headline}</h2>` : nothing}
                ${this.subheadline ? html`<p class="subheadline" part="subheadline">${this.subheadline}</p>` : nothing}
              </div>`
            : nothing}
          <div class="steps" part="steps">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-timeline-alternating': DkSectionTimelineAlternating;
  }
}
