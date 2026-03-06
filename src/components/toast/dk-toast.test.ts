import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import './dk-toast.js';
import type { DkToast, DkToastContainer } from './dk-toast.js';

describe('dk-toast', () => {
  it('renders with message and variant', async () => {
    const el = await fixture<DkToast>(html`<dk-toast variant="success" message="Done!"></dk-toast>`);
    expect(el.message).to.equal('Done!');
    expect(el.variant).to.equal('success');
    const toast = el.shadowRoot!.querySelector('.toast')!;
    expect(toast.classList.contains('success')).to.be.true;
  });

  it('shows action button when action-label set', async () => {
    const el = await fixture<DkToast>(html`<dk-toast message="Error" action-label="Retry"></dk-toast>`);
    const action = el.shadowRoot!.querySelector('.action');
    expect(action).to.exist;
    expect(action!.textContent).to.equal('Retry');
  });

  it('fires dk-close on close button click', async () => {
    const el = await fixture<DkToast>(html`<dk-toast message="Hello"></dk-toast>`);
    let closed = false;
    el.addEventListener('dk-close', () => { closed = true; });
    el.shadowRoot!.querySelector<HTMLElement>('.close')!.click();
    expect(closed).to.be.true;
  });

  it('fires dk-action on action button click', async () => {
    const el = await fixture<DkToast>(html`<dk-toast message="Error" action-label="Retry"></dk-toast>`);
    let fired = false;
    el.addEventListener('dk-action', () => { fired = true; });
    el.shadowRoot!.querySelector<HTMLElement>('.action')!.click();
    expect(fired).to.be.true;
  });

  it('has role=alert', async () => {
    const el = await fixture<DkToast>(html`<dk-toast message="Alert"></dk-toast>`);
    const toast = el.shadowRoot!.querySelector('.toast')!;
    expect(toast.getAttribute('role')).to.equal('alert');
  });

  it('is accessible', async () => {
    const el = await fixture<DkToast>(html`<dk-toast message="Notification"></dk-toast>`);
    await expect(el).to.be.accessible();
  });
});

describe('dk-toast-container', () => {
  it('renders empty by default', async () => {
    const el = await fixture<DkToastContainer>(html`<dk-toast-container></dk-toast-container>`);
    const toasts = el.shadowRoot!.querySelectorAll('dk-toast');
    expect(toasts.length).to.equal(0);
  });

  it('adds toast via push()', async () => {
    const el = await fixture<DkToastContainer>(html`<dk-toast-container></dk-toast-container>`);
    el.push({ message: 'Hello', duration: 0 });
    await el.updateComplete;
    const toasts = el.shadowRoot!.querySelectorAll('dk-toast');
    expect(toasts.length).to.equal(1);
  });

  it('removes toast via dismiss()', async () => {
    const el = await fixture<DkToastContainer>(html`<dk-toast-container></dk-toast-container>`);
    const id = el.push({ message: 'Hello', duration: 0 });
    await el.updateComplete;
    el.dismiss(id);
    await el.updateComplete;
    const toasts = el.shadowRoot!.querySelectorAll('dk-toast');
    expect(toasts.length).to.equal(0);
  });

  it('auto-dismisses after duration', async () => {
    const el = await fixture<DkToastContainer>(html`<dk-toast-container></dk-toast-container>`);
    el.push({ message: 'Brief', duration: 100 });
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('dk-toast').length).to.equal(1);
    await aTimeout(200);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('dk-toast').length).to.equal(0);
  });

  it('renders with placement class', async () => {
    const el = await fixture<DkToastContainer>(html`<dk-toast-container placement="top-center"></dk-toast-container>`);
    const container = el.shadowRoot!.querySelector('.container')!;
    expect(container.classList.contains('top-center')).to.be.true;
  });
});
