import { html, fixture, expect } from '@open-wc/testing';
import './dk-search-input.js';
import type { DkSearchInput } from './dk-search-input.js';

describe('dk-search-input', () => {
  it('renders with default placeholder', async () => {
    const el = await fixture<DkSearchInput>(html`
      <dk-search-input></dk-search-input>
    `);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.placeholder).to.equal('Search...');
    expect(input.disabled).to.be.false;
  });

  it('renders with custom placeholder', async () => {
    const el = await fixture<DkSearchInput>(html`
      <dk-search-input placeholder="Find items..."></dk-search-input>
    `);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.placeholder).to.equal('Find items...');
    expect(input.getAttribute('aria-label')).to.equal('Find items...');
  });

  it('fires dk-search event on input after debounce', async () => {
    const el = await fixture<DkSearchInput>(html`
      <dk-search-input debounce="50"></dk-search-input>
    `);
    const input = el.shadowRoot!.querySelector('input')!;

    let searchValue = '';
    el.addEventListener('dk-search', ((e: CustomEvent) => {
      searchValue = e.detail.value;
    }) as EventListener);

    input.value = 'hello';
    input.dispatchEvent(new Event('input'));

    await new Promise(r => setTimeout(r, 100));
    expect(searchValue).to.equal('hello');
  });

  it('shows clear button when clearable and has value', async () => {
    const el = await fixture<DkSearchInput>(html`
      <dk-search-input value="test" clearable></dk-search-input>
    `);
    const clearBtn = el.shadowRoot!.querySelector('.clear');
    expect(clearBtn).to.exist;
    expect(clearBtn!.getAttribute('aria-label')).to.equal('Clear search');
  });

  it('shows spinner when loading', async () => {
    const el = await fixture<DkSearchInput>(html`
      <dk-search-input loading></dk-search-input>
    `);
    const spinner = el.shadowRoot!.querySelector('.spinner');
    expect(spinner).to.exist;
    expect(spinner!.getAttribute('aria-label')).to.equal('Loading');
    // Clear button should not show when loading
    const clearBtn = el.shadowRoot!.querySelector('.clear');
    expect(clearBtn).to.not.exist;
  });
});
