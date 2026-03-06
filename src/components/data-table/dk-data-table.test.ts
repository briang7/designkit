import { html, fixture, expect } from '@open-wc/testing';
import './dk-data-table.js';
import type { DkDataTable, DkColumn } from './dk-data-table.js';

const columns: DkColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
];

const data = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
  { name: 'Charlie', email: 'charlie@example.com', role: 'Editor' },
  { name: 'Diana', email: 'diana@example.com', role: 'User' },
  { name: 'Eve', email: 'eve@example.com', role: 'Admin' },
];

describe('dk-data-table', () => {
  it('renders columns and rows', async () => {
    const el = await fixture<DkDataTable>(html`<dk-data-table .columns=${columns} .data=${data}></dk-data-table>`);
    const headers = el.shadowRoot!.querySelectorAll('th');
    expect(headers.length).to.equal(3);
    const rows = el.shadowRoot!.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(5);
  });

  it('sorts data when sortable column clicked', async () => {
    const el = await fixture<DkDataTable>(html`<dk-data-table .columns=${columns} .data=${data}></dk-data-table>`);
    const nameHeader = el.shadowRoot!.querySelector('th.sortable') as HTMLElement;
    nameHeader.click();
    await el.updateComplete;
    const firstCell = el.shadowRoot!.querySelector('tbody tr td')!;
    expect(firstCell.textContent!.trim()).to.equal('Alice');
    // Click again for desc
    nameHeader.click();
    await el.updateComplete;
    const firstCellDesc = el.shadowRoot!.querySelector('tbody tr td')!;
    expect(firstCellDesc.textContent!.trim()).to.equal('Eve');
  });

  it('emits dk-sort event', async () => {
    const el = await fixture<DkDataTable>(html`<dk-data-table .columns=${columns} .data=${data}></dk-data-table>`);
    let detail: any;
    el.addEventListener('dk-sort', (e: Event) => { detail = (e as CustomEvent).detail; });
    (el.shadowRoot!.querySelector('th.sortable') as HTMLElement).click();
    expect(detail).to.deep.equal({ key: 'name', direction: 'asc' });
  });

  it('paginates data', async () => {
    const el = await fixture<DkDataTable>(html`<dk-data-table .columns=${columns} .data=${data} paginated page-size="2"></dk-data-table>`);
    const rows = el.shadowRoot!.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(2);
    const pageInfo = el.shadowRoot!.querySelector('.page-info')!;
    expect(pageInfo.textContent).to.contain('Page 1 of 3');
  });

  it('navigates pages', async () => {
    const el = await fixture<DkDataTable>(html`<dk-data-table .columns=${columns} .data=${data} paginated page-size="2"></dk-data-table>`);
    const nextBtn = el.shadowRoot!.querySelectorAll('.page-btn')[1] as HTMLButtonElement;
    nextBtn.click();
    await el.updateComplete;
    const pageInfo = el.shadowRoot!.querySelector('.page-info')!;
    expect(pageInfo.textContent).to.contain('Page 2 of 3');
  });

  it('selects rows', async () => {
    const el = await fixture<DkDataTable>(html`<dk-data-table .columns=${columns} .data=${data} selectable></dk-data-table>`);
    let detail: any;
    el.addEventListener('dk-select', (e: Event) => { detail = (e as CustomEvent).detail; });
    const checkboxes = el.shadowRoot!.querySelectorAll('tbody input[type="checkbox"]');
    (checkboxes[0] as HTMLInputElement).click();
    await el.updateComplete;
    expect(detail.selected).to.include(0);
  });

  it('selects all rows', async () => {
    const el = await fixture<DkDataTable>(html`<dk-data-table .columns=${columns} .data=${data} selectable></dk-data-table>`);
    const selectAll = el.shadowRoot!.querySelector('thead input[type="checkbox"]') as HTMLInputElement;
    selectAll.click();
    await el.updateComplete;
    let detail: any;
    el.addEventListener('dk-select', (e: Event) => { detail = (e as CustomEvent).detail; });
    selectAll.click();
    expect(detail.selected.length).to.equal(0);
  });

  it('shows empty state', async () => {
    const el = await fixture<DkDataTable>(html`<dk-data-table .columns=${columns} .data=${[]}></dk-data-table>`);
    const empty = el.shadowRoot!.querySelector('.empty');
    expect(empty).to.exist;
    expect(empty!.textContent).to.contain('No data');
  });

  it('is accessible', async () => {
    const el = await fixture<DkDataTable>(html`<dk-data-table .columns=${columns} .data=${data}></dk-data-table>`);
    await expect(el).to.be.accessible();
  });
});
