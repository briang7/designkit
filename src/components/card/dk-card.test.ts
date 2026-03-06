import { html, fixture, expect } from '@open-wc/testing';
import './dk-card.js';
import type { DkCard } from './dk-card.js';

describe('dk-card', () => {
  it('renders with default variant', async () => {
    const el = await fixture<DkCard>(html`<dk-card>Content</dk-card>`);
    expect(el.variant).to.equal('elevated');
    const card = el.shadowRoot!.querySelector('.card')!;
    expect(card.classList.contains('elevated')).to.be.true;
  });

  it('renders outlined variant', async () => {
    const el = await fixture<DkCard>(html`<dk-card variant="outlined">Content</dk-card>`);
    const card = el.shadowRoot!.querySelector('.card')!;
    expect(card.classList.contains('outlined')).to.be.true;
  });

  it('renders header slot', async () => {
    const el = await fixture<DkCard>(html`
      <dk-card><div slot="header">Title</div>Body</dk-card>
    `);
    const headerSlot = el.shadowRoot!.querySelector('slot[name="header"]') as HTMLSlotElement;
    expect(headerSlot).to.exist;
    expect(headerSlot.assignedElements().length).to.equal(1);
  });

  it('renders footer slot', async () => {
    const el = await fixture<DkCard>(html`
      <dk-card>Body<div slot="footer">Footer</div></dk-card>
    `);
    const footerSlot = el.shadowRoot!.querySelector('slot[name="footer"]') as HTMLSlotElement;
    expect(footerSlot).to.exist;
    expect(footerSlot.assignedElements().length).to.equal(1);
  });

  it('renders media slot', async () => {
    const el = await fixture<DkCard>(html`
      <dk-card><img slot="media" src="test.jpg" alt="Test">Body</dk-card>
    `);
    const mediaSlot = el.shadowRoot!.querySelector('slot[name="media"]') as HTMLSlotElement;
    expect(mediaSlot).to.exist;
  });

  it('renders default slot for body', async () => {
    const el = await fixture<DkCard>(html`<dk-card>Body content</dk-card>`);
    const body = el.shadowRoot!.querySelector('.body');
    expect(body).to.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<DkCard>(html`<dk-card>Content</dk-card>`);
    await expect(el).to.be.accessible();
  });
});
