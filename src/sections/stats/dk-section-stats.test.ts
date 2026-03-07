import { html, fixture, expect } from '@open-wc/testing';
import './dk-stat.js';
import './dk-section-stats-bar.js';
import './dk-section-stats-cards.js';
import type { DkStat } from './dk-stat.js';
import type { DkSectionStatsBar } from './dk-section-stats-bar.js';
import type { DkSectionStatsCards } from './dk-section-stats-cards.js';

describe('dk-stat', () => {
  it('renders value with prefix and suffix', async () => {
    const el = await fixture<DkStat>(html`
      <dk-stat value="99" prefix="$" suffix="+" label="Revenue"></dk-stat>
    `);
    const valueEl = el.shadowRoot!.querySelector('.value')!;
    // Initially displayValue is 0 before animation triggers
    expect(valueEl.textContent).to.contain('$');
    expect(valueEl.textContent).to.contain('+');
    const label = el.shadowRoot!.querySelector('.label')!;
    expect(label.textContent).to.equal('Revenue');
  });

  it('renders label text', async () => {
    const el = await fixture<DkStat>(html`
      <dk-stat value="500" label="Users"></dk-stat>
    `);
    const label = el.shadowRoot!.querySelector('.label')!;
    expect(label.textContent).to.equal('Users');
  });
});

describe('dk-section-stats-bar', () => {
  it('renders headline and slots stat elements', async () => {
    const el = await fixture<DkSectionStatsBar>(html`
      <dk-section-stats-bar headline="By the numbers" no-animate>
        <dk-stat value="100" label="Customers"></dk-stat>
        <dk-stat value="50" label="Countries"></dk-stat>
      </dk-section-stats-bar>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('By the numbers');
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(2);
  });
});

describe('dk-section-stats-cards', () => {
  it('renders stats in a grid', async () => {
    const el = await fixture<DkSectionStatsCards>(html`
      <dk-section-stats-cards headline="Stats" no-animate>
        <dk-stat value="1000" suffix="+" label="Downloads"></dk-stat>
      </dk-section-stats-cards>
    `);
    const grid = el.shadowRoot!.querySelector('.grid');
    expect(grid).to.exist;
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Stats');
  });
});
