import { html, fixture, expect } from '@open-wc/testing';
import './dk-sidebar-item.js';
import './dk-sidebar-group.js';
import './dk-section-sidebar-nav.js';
import type { DkSidebarItem } from './dk-sidebar-item.js';
import type { DkSectionSidebarNav } from './dk-section-sidebar-nav.js';
import type { DkSidebarGroup } from './dk-sidebar-group.js';

describe('dk-sidebar-item', () => {
  it('renders label and badge', async () => {
    const el = await fixture<DkSidebarItem>(html`
      <dk-sidebar-item label="Dashboard" badge="3" active></dk-sidebar-item>
    `);
    const label = el.shadowRoot!.querySelector('.label')!;
    expect(label.textContent).to.equal('Dashboard');
    const badge = el.shadowRoot!.querySelector('.badge')!;
    expect(badge.textContent).to.equal('3');
    expect(el.active).to.be.true;
  });
});

describe('dk-sidebar-group', () => {
  it('renders heading and toggles when collapsible', async () => {
    const el = await fixture<DkSidebarGroup>(html`
      <dk-sidebar-group label="Settings" collapsible open>
        <dk-sidebar-item label="Profile"></dk-sidebar-item>
      </dk-sidebar-group>
    `);
    const heading = el.shadowRoot!.querySelector('.heading')!;
    expect(heading.textContent).to.contain('Settings');
    expect(el.open).to.be.true;
    (heading as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.open).to.be.false;
  });
});

describe('dk-section-sidebar-nav', () => {
  it('renders sidebar with slot', async () => {
    const el = await fixture<DkSectionSidebarNav>(html`
      <dk-section-sidebar-nav no-animate>
        <dk-sidebar-item label="Home"></dk-sidebar-item>
      </dk-section-sidebar-nav>
    `);
    const sidebar = el.shadowRoot!.querySelector('.sidebar')!;
    expect(sidebar).to.exist;
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(1);
  });
});
