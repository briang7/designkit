import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { teamBaseStyles } from './dk-section-team.styles.js';
import './dk-team-member.js';

const cardsStyles = css`
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--dk-space-8, 2rem);
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
      max-width: 400px;
      margin-inline: auto;
    }
  }

  ::slotted(dk-team-member) {
    background: var(--dk-color-surface, #ffffff);
    border-radius: var(--dk-radius-xl, 1rem);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }

  ::slotted(dk-team-member:hover) {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

@customElement('dk-section-team-cards')
export class DkSectionTeamCards extends DkSectionElement {
  static override styles = [teamBaseStyles, cardsStyles];

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
          <div class="grid" part="grid">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-team-cards': DkSectionTeamCards;
  }
}
