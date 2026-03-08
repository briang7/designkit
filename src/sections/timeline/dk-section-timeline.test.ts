import { html, fixture, expect } from '@open-wc/testing';
import './dk-timeline-step.js';
import './dk-section-timeline-vertical.js';
import './dk-section-timeline-alternating.js';
import type { DkTimelineStep } from './dk-timeline-step.js';
import type { DkSectionTimelineVertical } from './dk-section-timeline-vertical.js';
import type { DkSectionTimelineAlternating } from './dk-section-timeline-alternating.js';

describe('dk-timeline-step', () => {
  it('renders title and description', async () => {
    const el = await fixture<DkTimelineStep>(html`
      <dk-timeline-step
        title="Step One"
        description="First step details"
      ></dk-timeline-step>
    `);
    const title = el.shadowRoot!.querySelector('h3')!;
    expect(title.textContent).to.equal('Step One');
    const desc = el.shadowRoot!.querySelector('[part="description"]')!;
    expect(desc.textContent).to.equal('First step details');
  });

  it('renders date when provided', async () => {
    const el = await fixture<DkTimelineStep>(html`
      <dk-timeline-step title="Launch" date="Jan 2026"></dk-timeline-step>
    `);
    const date = el.shadowRoot!.querySelector('.date')!;
    expect(date.textContent).to.equal('Jan 2026');
  });

  it('renders icon when valid icon name is given', async () => {
    const el = await fixture<DkTimelineStep>(html`
      <dk-timeline-step title="Secure" icon="shield"></dk-timeline-step>
    `);
    const iconContainer = el.shadowRoot!.querySelector('.icon-container');
    expect(iconContainer).to.exist;
    const dot = el.shadowRoot!.querySelector('.dot');
    expect(dot).to.not.exist;
  });

  it('renders dot when no icon is given', async () => {
    const el = await fixture<DkTimelineStep>(html`
      <dk-timeline-step title="Plain"></dk-timeline-step>
    `);
    const dot = el.shadowRoot!.querySelector('.dot');
    expect(dot).to.exist;
    const iconContainer = el.shadowRoot!.querySelector('.icon-container');
    expect(iconContainer).to.not.exist;
  });

  it('reflects active attribute', async () => {
    const el = await fixture<DkTimelineStep>(html`
      <dk-timeline-step title="Active Step" active></dk-timeline-step>
    `);
    expect(el.active).to.be.true;
    expect(el.hasAttribute('active')).to.be.true;
  });
});

describe('dk-section-timeline-vertical', () => {
  it('renders headline and subheadline', async () => {
    const el = await fixture<DkSectionTimelineVertical>(html`
      <dk-section-timeline-vertical
        headline="Our Journey"
        subheadline="Key milestones"
        no-animate
      ></dk-section-timeline-vertical>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Our Journey');
    const sub = el.shadowRoot!.querySelector('.subheadline')!;
    expect(sub.textContent).to.equal('Key milestones');
  });

  it('accepts slotted timeline steps', async () => {
    const el = await fixture<DkSectionTimelineVertical>(html`
      <dk-section-timeline-vertical headline="History" no-animate>
        <dk-timeline-step title="Founded" date="2020"></dk-timeline-step>
        <dk-timeline-step title="Growth" date="2022"></dk-timeline-step>
      </dk-section-timeline-vertical>
    `);
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(2);
  });

  it('applies bg attribute', async () => {
    const el = await fixture<DkSectionTimelineVertical>(html`
      <dk-section-timeline-vertical bg="dark" no-animate></dk-section-timeline-vertical>
    `);
    expect(el.getAttribute('bg')).to.equal('dark');
  });
});

describe('dk-section-timeline-alternating', () => {
  it('renders headline and subheadline', async () => {
    const el = await fixture<DkSectionTimelineAlternating>(html`
      <dk-section-timeline-alternating
        headline="Roadmap"
        subheadline="Upcoming features"
        no-animate
      ></dk-section-timeline-alternating>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('Roadmap');
    const sub = el.shadowRoot!.querySelector('.subheadline')!;
    expect(sub.textContent).to.equal('Upcoming features');
  });

  it('accepts slotted timeline steps', async () => {
    const el = await fixture<DkSectionTimelineAlternating>(html`
      <dk-section-timeline-alternating headline="Process" no-animate>
        <dk-timeline-step title="Design" date="Q1"></dk-timeline-step>
        <dk-timeline-step title="Build" date="Q2"></dk-timeline-step>
        <dk-timeline-step title="Launch" date="Q3"></dk-timeline-step>
      </dk-section-timeline-alternating>
    `);
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(3);
  });

  it('applies bg attribute', async () => {
    const el = await fixture<DkSectionTimelineAlternating>(html`
      <dk-section-timeline-alternating bg="brand" no-animate></dk-section-timeline-alternating>
    `);
    expect(el.getAttribute('bg')).to.equal('brand');
  });
});
