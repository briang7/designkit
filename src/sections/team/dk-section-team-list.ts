import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { teamBaseStyles } from './dk-section-team.styles.js';
import './dk-team-member.js';

const listStyles = css`
  .list {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-6, 1.5rem);
  }

  ::slotted(dk-team-member) {
    --dk-team-card-direction: row;
    --dk-team-image-aspect: 3/4;
    --dk-team-image-max-height: none;
    --dk-team-image-width: 200px;
  }

  /* Override member card for list layout via slotted */
  .list-card {
    display: flex;
    gap: var(--dk-space-6, 1.5rem);
    background: var(--dk-color-surface, #ffffff);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-xl, 1rem);
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .list-card {
      flex-direction: column;
    }
  }
`;

@customElement('dk-section-team-list')
export class DkSectionTeamList extends DkSectionElement {
  static override styles = [teamBaseStyles, listStyles];

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
          <div class="list" part="list">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-team-list': DkSectionTeamList;
  }
}
