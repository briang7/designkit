import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { teamBaseStyles } from './dk-section-team.styles.js';
import './dk-team-member.js';

const compactStyles = css`
  .team-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--dk-space-8, 2rem);
  }

  ::slotted(dk-team-member) {
    text-align: center;
    flex: 0 0 auto;
    width: 120px;
    --dk-team-member-avatar-size: 80px;
    --dk-team-member-layout: column;
  }
`;

@customElement('dk-section-team-compact')
export class DkSectionTeamCompact extends DkSectionElement {
  static override styles = [teamBaseStyles, compactStyles];

  @property() headline = '';
  @property() subheadline = '';

  protected override onEnterViewport() {
    const members = Array.from(this.querySelectorAll('dk-team-member'));
    this.animateEntrance(members);
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
          <div class="team-row" part="team-row">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-team-compact': DkSectionTeamCompact;
  }
}
