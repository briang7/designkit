import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import './dk-tooltip.js';
import type { DkTooltip } from './dk-tooltip.js';

describe('dk-tooltip', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkTooltip>(html`<dk-tooltip content="Hello"><button>Hover me</button></dk-tooltip>`);
    expect(el.content).to.equal('Hello');
    expect(el.placement).to.equal('top');
    expect(el.delay).to.equal(200);
  });

  it('is hidden by default', async () => {
    const el = await fixture<DkTooltip>(html`<dk-tooltip content="Tip"><button>Hover</button></dk-tooltip>`);
    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    expect(tooltip).to.not.exist;
  });

  it('shows on mouseenter after delay', async () => {
    const el = await fixture<DkTooltip>(html`<dk-tooltip content="Tip" delay="0"><button>Hover</button></dk-tooltip>`);
    const wrapper = el.shadowRoot!.querySelector('.trigger-wrapper')!;
    wrapper.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(50);
    await el.updateComplete;
    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    expect(tooltip).to.exist;
  });

  it('hides on mouseleave', async () => {
    const el = await fixture<DkTooltip>(html`<dk-tooltip content="Tip" delay="0"><button>Hover</button></dk-tooltip>`);
    const wrapper = el.shadowRoot!.querySelector('.trigger-wrapper')!;
    wrapper.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(50);
    await el.updateComplete;
    wrapper.dispatchEvent(new MouseEvent('mouseleave'));
    await el.updateComplete;
    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    expect(tooltip).to.not.exist;
  });

  it('hides on Escape', async () => {
    const el = await fixture<DkTooltip>(html`<dk-tooltip content="Tip" delay="0"><button>Hover</button></dk-tooltip>`);
    const wrapper = el.shadowRoot!.querySelector('.trigger-wrapper')!;
    wrapper.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(50);
    await el.updateComplete;
    wrapper.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    expect(tooltip).to.not.exist;
  });

  it('renders with correct placement class', async () => {
    const el = await fixture<DkTooltip>(html`<dk-tooltip content="Tip" placement="bottom" delay="0"><button>Hover</button></dk-tooltip>`);
    const wrapper = el.shadowRoot!.querySelector('.trigger-wrapper')!;
    wrapper.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(50);
    await el.updateComplete;
    const tooltip = el.shadowRoot!.querySelector('.tooltip')!;
    expect(tooltip.classList.contains('bottom')).to.be.true;
  });

  it('has role=tooltip', async () => {
    const el = await fixture<DkTooltip>(html`<dk-tooltip content="Tip" delay="0"><button>Hover</button></dk-tooltip>`);
    const wrapper = el.shadowRoot!.querySelector('.trigger-wrapper')!;
    wrapper.dispatchEvent(new MouseEvent('mouseenter'));
    await aTimeout(50);
    await el.updateComplete;
    const tooltip = el.shadowRoot!.querySelector('.tooltip')!;
    expect(tooltip.getAttribute('role')).to.equal('tooltip');
  });

  it('is accessible', async () => {
    const el = await fixture<DkTooltip>(html`<dk-tooltip content="Helpful tip"><button>Info</button></dk-tooltip>`);
    await expect(el).to.be.accessible();
  });
});
