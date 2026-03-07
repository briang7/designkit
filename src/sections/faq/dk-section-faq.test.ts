import { html, fixture, expect } from '@open-wc/testing';
import './dk-faq-item.js';
import './dk-section-faq-accordion.js';
import './dk-section-faq-two-column.js';
import type { DkFaqItem } from './dk-faq-item.js';
import type { DkSectionFaqAccordion } from './dk-section-faq-accordion.js';
import type { DkSectionFaqTwoColumn } from './dk-section-faq-two-column.js';

describe('dk-faq-item', () => {
  it('renders question and toggles open', async () => {
    const el = await fixture<DkFaqItem>(html`
      <dk-faq-item question="What is this?">
        <p>An answer.</p>
      </dk-faq-item>
    `);
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    expect(trigger.textContent).to.contain('What is this?');
    expect(el.open).to.be.false;
    (trigger as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.open).to.be.true;
  });
});

describe('dk-section-faq-accordion', () => {
  it('renders headline and slots items', async () => {
    const el = await fixture<DkSectionFaqAccordion>(html`
      <dk-section-faq-accordion headline="FAQ" no-animate>
        <dk-faq-item question="Q1"><p>A1</p></dk-faq-item>
        <dk-faq-item question="Q2"><p>A2</p></dk-faq-item>
      </dk-section-faq-accordion>
    `);
    const h2 = el.shadowRoot!.querySelector('h2')!;
    expect(h2.textContent).to.equal('FAQ');
    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements().length).to.equal(2);
  });
});

describe('dk-section-faq-two-column', () => {
  it('renders questions and selects answer', async () => {
    const el = await fixture<DkSectionFaqTwoColumn>(html`
      <dk-section-faq-two-column
        headline="FAQ"
        .items=${[
          { question: 'Q1', answer: 'A1' },
          { question: 'Q2', answer: 'A2' },
        ]}
        no-animate
      ></dk-section-faq-two-column>
    `);
    const buttons = el.shadowRoot!.querySelectorAll('.question-btn');
    expect(buttons.length).to.equal(2);
    (buttons[0] as HTMLButtonElement).click();
    await el.updateComplete;
    const panel = el.shadowRoot!.querySelector('.answer-panel p')!;
    expect(panel.textContent).to.equal('A1');
  });
});
