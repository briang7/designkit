import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { timelineBaseStyles } from './dk-section-timeline.styles.js';
import './dk-timeline-step.js';

const alternatingStyles = css`
  .steps {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-8, 2rem);
    padding: var(--dk-space-8, 2rem) 0;
  }

  /* Center vertical line */
  .steps::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: var(--dk-timeline-line-color, #e5e7eb);
  }

  ::slotted(dk-timeline-step) {
    position: relative;
    width: calc(50% - var(--dk-space-8, 2rem));
    --dk-timeline-connector-height: 0;
  }

  /* Odd items: align left */
  ::slotted(dk-timeline-step:nth-child(odd)) {
    align-self: flex-start;
    text-align: right;
  }

  /* Even items: align right */
  ::slotted(dk-timeline-step:nth-child(even)) {
    align-self: flex-end;
    text-align: left;
  }

  /* Responsive: stack vertically with left line on mobile */
  @media (max-width: 768px) {
    .steps::before {
      left: 1.25rem;
      transform: none;
    }

    ::slotted(dk-timeline-step) {
      width: auto;
      text-align: left !important;
      align-self: stretch !important;
      padding-left: var(--dk-space-12, 3rem);
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
