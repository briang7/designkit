import { html, fixture, expect } from '@open-wc/testing';
import './dk-alert.js';
import type { DkAlert } from './dk-alert.js';

describe('dk-alert', () => {
  it('renders with default properties', async () => {
    const el = await fixture<DkAlert>(html`<dk-alert>Default alert</dk-alert>`);
    expect(el).to.exist;
    expect(el.variant).to.equal('info');
    expect(el.dismissable).to.be.false;
    expect(el.icon).to.be.true;
  });

  it('renders the correct variant class', async () => {
    const el = await fixture<DkAlert>(html`<dk-alert variant="success">Success!</dk-alert>`);
    const alertDiv = el.shadowRoot!.querySelector('.alert')!;
    expect(alertDiv.classList.contains('success')).to.be.true;
  });

  it('renders all variant types', async () => {
    for (const variant of ['info', 'success', 'warning', 'error'] as const) {
      const el = await fixture<DkAlert>(html`<dk-alert variant=${variant}>Alert</dk-alert>`);
      const alertDiv = el.shadowRoot!.querySelector('.alert')!;
      expect(alertDiv.classList.contains(variant)).to.be.true;
    }
  });

  it('shows icon by default and hides when icon=false', async () => {
    const withIcon = await fixture<DkAlert>(html`<dk-alert>With icon</dk-alert>`);
    expect(withIcon.shadowRoot!.querySelector('.icon')).to.exist;

    const noIcon = await fixture<DkAlert>(html`<dk-alert .icon=${false}>No icon</dk-alert>`);
    expect(noIcon.shadowRoot!.querySelector('.icon')).to.not.exist;
  });

  it('shows close button when dismissable', async () => {
    const el = await fixture<DkAlert>(html`<dk-alert dismissable>Closable</dk-alert>`);
    const closeBtn = el.shadowRoot!.querySelector('.close') as HTMLButtonElement;
    expect(closeBtn).to.exist;
    expect(closeBtn.getAttribute('aria-label')).to.equal('Dismiss');
  });

  it('fires dk-alert-dismiss event on close', async () => {
    const el = await fixture<DkAlert>(html`<dk-alert dismissable>Closable</dk-alert>`);
    let dismissed = false;
    el.addEventListener('dk-alert-dismiss', () => { dismissed = true; });
    const closeBtn = el.shadowRoot!.querySelector('.close') as HTMLButtonElement;
    closeBtn.click();

    // Wait for the 200ms dismiss animation timeout
    await new Promise(resolve => setTimeout(resolve, 250));
    expect(dismissed).to.be.true;
    expect(el.hidden).to.be.true;
  });

  it('is accessible', async () => {
    const el = await fixture<DkAlert>(html`<dk-alert variant="warning">Warning alert</dk-alert>`);
    await expect(el).to.be.accessible();
  });
});
