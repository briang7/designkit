import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { timelineBaseStyles } from './dk-section-timeline.styles.js';
import './dk-timeline-step.js';

const verticalStyles = css`
  .timeline {
    position: relative;
    padding: var(--dk-space-4, 1rem) 0;
  }

  /* Center vertical line */
  .timeline::before {
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
    width: 45%;
    --dk-timeline-connector-height: 0;
  }

  /* Alternate left and right */
  ::slotted(dk-timeline-step:nth-child(odd)) {
    margin-left: 0;
    margin-right: auto;
    text-align: right;
  }

  ::slotted(dk-timeline-step:nth-child(even)) {
    margin-left: auto;
    margin-right: 0;
    text-align: left;
  }

  ::slotted(dk-timeline-step) {
    position: relative;
    margin-bottom: var(--dk-space-8, 2rem);
  }

  ::slotted(dk-timeline-step:last-child) {
    margin-bottom: 0;
  }

  /* Mobile: all on right side */
  @media (max-width: 768px) {
    .timeline::before {
      left: 1.25rem;
      transform: none;
    }

    ::slotted(dk-timeline-step) {
      width: auto;
      margin-left: var(--dk-space-12, 3rem) !important;
      margin-right: 0 !important;
      text-align: left !important;
    }
  }
`;

@customElement('dk-section-timeline-vertical')
export class DkSectionTimelineVertical extends DkSectionElement {
  static override styles = [timelineBaseStyles, verticalStyles];

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
          <div class="timeline" part="timeline">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-timeline-vertical': DkSectionTimelineVertical;
  }
}
