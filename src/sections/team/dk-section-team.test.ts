import { html, fixture, expect } from '@open-wc/testing';
import './dk-team-member.js';
import './dk-section-team-grid.js';
import './dk-section-team-list.js';
import type { DkTeamMember } from './dk-team-member.js';
import type { DkSectionTeamGrid } from './dk-section-team-grid.js';
import type { DkSectionTeamList } from './dk-section-team-list.js';

describe('dk-team-member', () => {
  it('renders name, role, and bio', async () => {
    const el = await fixture<DkTeamMember>(html`
      <dk-team-member name="Jane Doe" role="CEO" bio="Leads the team"></dk-team-member>
    `);
    const name = el.shadowRoot!.querySelector('.name')!;
    expect(name.textContent).to.equal('Jane Doe');
    const role = el.shadowRoot!.querySelector('.role')!;
    expect(role.textContent).to.equal('CEO');
    const bio = el.shadowRoot!.querySelector('.bio')!;
    expect(bio.textContent).to.equal('Leads the team');
  });
});

describe('dk-section-team-grid', () => {
  it('renders headline and slots members', async () => {
    const el = await fixture<DkSectionTeamGrid>(html`
      <dk-section-team-grid headline="Our Team" no-animate>
        <dk-team-member name="Alice" role="Dev"></dk-team-member>
        <dk-team-member name="Bob" role="Design"></dk-team-member>
      </dk-section-team-grid>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Our Team');
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(2);
  });
});

describe('dk-section-team-list', () => {
  it('renders list layout', async () => {
    const el = await fixture<DkSectionTeamList>(html`
      <dk-section-team-list headline="Meet Us" no-animate>
        <dk-team-member name="Charlie" role="PM"></dk-team-member>
      </dk-section-team-list>
    `);
    const list = el.shadowRoot!.querySelector('.list')!;
    expect(list).to.exist;
  });
});
