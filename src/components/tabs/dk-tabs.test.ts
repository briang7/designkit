import { html, fixture, expect } from '@open-wc/testing';
import './dk-tabs.js';
import type { DkTabs } from './dk-tabs.js';

describe('dk-tabs', () => {
  it('renders tabs and panels', async () => {
    const el = await fixture<DkTabs>(html`
      <dk-tabs>
        <dk-tab slot="tab" panel="one">Tab 1</dk-tab>
        <dk-tab slot="tab" panel="two">Tab 2</dk-tab>
        <dk-tab-panel name="one">Content 1</dk-tab-panel>
        <dk-tab-panel name="two">Content 2</dk-tab-panel>
      </dk-tabs>
    `);
    expect(el).to.exist;
    const tabList = el.shadowRoot!.querySelector('[role="tablist"]');
    expect(tabList).to.exist;
  });

  it('activates first tab by default', async () => {
    const el = await fixture<DkTabs>(html`
      <dk-tabs>
        <dk-tab slot="tab" panel="one">Tab 1</dk-tab>
        <dk-tab slot="tab" panel="two">Tab 2</dk-tab>
        <dk-tab-panel name="one">Content 1</dk-tab-panel>
        <dk-tab-panel name="two">Content 2</dk-tab-panel>
      </dk-tabs>
    `);
    await el.updateComplete;
    const tabs = el.querySelectorAll('dk-tab');
    expect(tabs[0].active).to.be.true;
    expect(tabs[1].active).to.be.false;
  });

  it('switches tabs on click', async () => {
    const el = await fixture<DkTabs>(html`
      <dk-tabs>
        <dk-tab slot="tab" panel="one">Tab 1</dk-tab>
        <dk-tab slot="tab" panel="two">Tab 2</dk-tab>
        <dk-tab-panel name="one">Content 1</dk-tab-panel>
        <dk-tab-panel name="two">Content 2</dk-tab-panel>
      </dk-tabs>
    `);
    await el.updateComplete;
    const tabs = el.querySelectorAll('dk-tab');
    tabs[1].click();
    await el.updateComplete;
    expect(tabs[1].active).to.be.true;
    expect(el.value).to.equal('two');
  });

  it('emits dk-tab-change event', async () => {
    const el = await fixture<DkTabs>(html`
      <dk-tabs>
        <dk-tab slot="tab" panel="one">Tab 1</dk-tab>
        <dk-tab slot="tab" panel="two">Tab 2</dk-tab>
        <dk-tab-panel name="one">Content 1</dk-tab-panel>
        <dk-tab-panel name="two">Content 2</dk-tab-panel>
      </dk-tabs>
    `);
    await el.updateComplete;
    let detail: any;
    el.addEventListener('dk-tab-change', (e: Event) => { detail = (e as CustomEvent).detail; });
    const tabs = el.querySelectorAll('dk-tab');
    tabs[1].click();
    expect(detail).to.deep.equal({ panel: 'two' });
  });

  it('skips disabled tabs', async () => {
    const el = await fixture<DkTabs>(html`
      <dk-tabs>
        <dk-tab slot="tab" panel="one">Tab 1</dk-tab>
        <dk-tab slot="tab" panel="two" disabled>Tab 2</dk-tab>
        <dk-tab slot="tab" panel="three">Tab 3</dk-tab>
        <dk-tab-panel name="one">Content 1</dk-tab-panel>
        <dk-tab-panel name="two">Content 2</dk-tab-panel>
        <dk-tab-panel name="three">Content 3</dk-tab-panel>
      </dk-tabs>
    `);
    await el.updateComplete;
    const tabs = el.querySelectorAll('dk-tab');
    tabs[1].click();
    expect(el.value).to.equal('one'); // should not change
  });

  it('is accessible', async () => {
    const el = await fixture<DkTabs>(html`
      <dk-tabs>
        <dk-tab slot="tab" panel="one">Tab 1</dk-tab>
        <dk-tab slot="tab" panel="two">Tab 2</dk-tab>
        <dk-tab-panel name="one">Content 1</dk-tab-panel>
        <dk-tab-panel name="two">Content 2</dk-tab-panel>
      </dk-tabs>
    `);
    await expect(el).to.be.accessible();
  });
});
