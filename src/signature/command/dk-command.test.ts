import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import './dk-command.js';
import type { DkCommand } from './dk-command.js';

describe('dk-command', () => {
  it('renders closed by default', async () => {
    const el = await fixture<DkCommand>(html`
      <dk-command>
        <dk-command-item value="test">Test</dk-command-item>
      </dk-command>
    `);
    expect(el.open).to.be.false;
    expect(el.shadowRoot!.querySelector('.panel')).to.be.null;
  });

  it('opens on show()', async () => {
    const el = await fixture<DkCommand>(html`
      <dk-command>
        <dk-command-item value="test">Test</dk-command-item>
      </dk-command>
    `);
    el.show();
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(el.shadowRoot!.querySelector('.panel')).to.exist;
  });

  it('filters items by query', async () => {
    const el = await fixture<DkCommand>(html`
      <dk-command>
        <dk-command-item value="apple">Apple</dk-command-item>
        <dk-command-item value="banana">Banana</dk-command-item>
      </dk-command>
    `);
    el.show();
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector('.search-input') as HTMLInputElement;
    input.value = 'app';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;

    const items = el.querySelectorAll('dk-command-item');
    const visible = [...items].filter(i => !i.hidden);
    expect(visible.length).to.equal(1);
    expect(visible[0].value).to.equal('apple');
  });

  it('emits dk-select on Enter', async () => {
    const el = await fixture<DkCommand>(html`
      <dk-command>
        <dk-command-item value="test">Test</dk-command-item>
      </dk-command>
    `);
    el.show();
    await el.updateComplete;

    const panel = el.shadowRoot!.querySelector('.panel')!;
    setTimeout(() => {
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    });
    const { detail } = await oneEvent(el, 'dk-select');
    expect(detail.value).to.equal('test');
  });

  it('closes on Escape', async () => {
    const el = await fixture<DkCommand>(html`
      <dk-command>
        <dk-command-item value="test">Test</dk-command-item>
      </dk-command>
    `);
    el.show();
    await el.updateComplete;

    const panel = el.shadowRoot!.querySelector('.panel')!;
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('shows empty state when no matches', async () => {
    const el = await fixture<DkCommand>(html`
      <dk-command>
        <dk-command-item value="apple">Apple</dk-command-item>
      </dk-command>
    `);
    el.show();
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector('.search-input') as HTMLInputElement;
    input.value = 'xyz';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;

    const empty = el.shadowRoot!.querySelector('.empty-state');
    expect(empty).to.exist;
  });
});
