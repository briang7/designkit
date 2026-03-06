import { html, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { dataTableStyles } from './dk-data-table.styles.js';

export interface DkColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'start' | 'center' | 'end';
  render?: (value: unknown, row: Record<string, unknown>) => TemplateResult;
}

@customElement('dk-data-table')
export class DkDataTable extends DkElement {
  static override styles = dataTableStyles;

  @property({ type: Array }) columns: DkColumn[] = [];
  @property({ type: Array }) data: Record<string, unknown>[] = [];
  @property({ type: Boolean }) selectable = false;
  @property({ type: Boolean }) paginated = false;
  @property({ type: Number, attribute: 'page-size' }) pageSize = 10;
  @property({ type: Boolean, attribute: 'sticky-header' }) stickyHeader = false;

  @state() private sortKey = '';
  @state() private sortDirection: 'asc' | 'desc' = 'asc';
  @state() private selectedRows: Set<number> = new Set();
  @state() private currentPage = 0;

  private get sortedData() {
    if (!this.sortKey) return this.data;
    return [...this.data].sort((a, b) => {
      const av = a[this.sortKey];
      const bv = b[this.sortKey];
      const cmp = String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true });
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  private get paginatedData() {
    if (!this.paginated) return this.sortedData;
    const start = this.currentPage * this.pageSize;
    return this.sortedData.slice(start, start + this.pageSize);
  }

  private get totalPages() {
    return Math.ceil(this.sortedData.length / this.pageSize);
  }

  private handleSort(key: string) {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.emitEvent('dk-sort', { key: this.sortKey, direction: this.sortDirection });
  }

  private handleRowSelect(index: number) {
    const realIndex = this.paginated ? this.currentPage * this.pageSize + index : index;
    if (this.selectedRows.has(realIndex)) {
      this.selectedRows.delete(realIndex);
    } else {
      this.selectedRows.add(realIndex);
    }
    this.selectedRows = new Set(this.selectedRows);
    this.emitEvent('dk-select', { selected: [...this.selectedRows] });
  }

  private handleSelectAll() {
    if (this.selectedRows.size === this.data.length) {
      this.selectedRows = new Set();
    } else {
      this.selectedRows = new Set(this.data.map((_, i) => i));
    }
    this.emitEvent('dk-select', { selected: [...this.selectedRows] });
  }

  private handlePageChange(page: number) {
    this.currentPage = Math.max(0, Math.min(page, this.totalPages - 1));
    this.emitEvent('dk-page-change', { page: this.currentPage });
  }

  override render() {
    const rows = this.paginatedData;

    return html`
      <div class="table-wrapper" part="wrapper">
        <table class=${classMap({ table: true, 'sticky-header': this.stickyHeader })}>
          <thead>
            <tr>
              ${this.selectable ? html`
                <th class="checkbox-cell">
                  <input
                    type="checkbox"
                    .checked=${this.selectedRows.size === this.data.length && this.data.length > 0}
                    .indeterminate=${this.selectedRows.size > 0 && this.selectedRows.size < this.data.length}
                    @change=${this.handleSelectAll}
                    aria-label="Select all"
                  />
                </th>
              ` : nothing}
              ${this.columns.map(col => html`
                <th
                  class=${classMap({ sortable: !!col.sortable, sorted: this.sortKey === col.key })}
                  style=${col.width ? `width: ${col.width}` : ''}
                  @click=${col.sortable ? () => this.handleSort(col.key) : nothing}
                >
                  <span class="th-content" style=${col.align ? `justify-content: ${col.align === 'end' ? 'flex-end' : col.align}` : ''}>
                    ${col.label}
                    ${col.sortable ? html`
                      <span class="sort-icon">
                        ${this.sortKey === col.key
                          ? this.sortDirection === 'asc'
                            ? html`<svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 4l4 5H4l4-5z" fill="currentColor"/></svg>`
                            : html`<svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 12l4-5H4l4 5z" fill="currentColor"/></svg>`
                          : html`<svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 4l3 4H5l3-4zM8 12l3-4H5l3 4z" fill="currentColor" opacity="0.3"/></svg>`
                        }
                      </span>
                    ` : nothing}
                  </span>
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${rows.length === 0 ? html`
              <tr><td colspan=${this.columns.length + (this.selectable ? 1 : 0)} class="empty">No data</td></tr>
            ` : rows.map((row, i) => {
              const realIndex = this.paginated ? this.currentPage * this.pageSize + i : i;
              return html`
                <tr class=${classMap({ selected: this.selectedRows.has(realIndex) })}>
                  ${this.selectable ? html`
                    <td class="checkbox-cell">
                      <input
                        type="checkbox"
                        .checked=${this.selectedRows.has(realIndex)}
                        @change=${() => this.handleRowSelect(i)}
                        aria-label="Select row"
                      />
                    </td>
                  ` : nothing}
                  ${this.columns.map(col => html`
                    <td style=${col.align ? `text-align: ${col.align}` : ''}>
                      ${col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  `)}
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
      ${this.paginated && this.totalPages > 1 ? html`
        <div class="pagination" part="pagination">
          <span class="page-info">Page ${this.currentPage + 1} of ${this.totalPages}</span>
          <div class="page-buttons">
            <button class="page-btn" ?disabled=${this.currentPage === 0} @click=${() => this.handlePageChange(this.currentPage - 1)} aria-label="Previous page">
              <svg viewBox="0 0 16 16" width="16" height="16"><path d="M10 4l-4 4 4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="page-btn" ?disabled=${this.currentPage >= this.totalPages - 1} @click=${() => this.handlePageChange(this.currentPage + 1)} aria-label="Next page">
              <svg viewBox="0 0 16 16" width="16" height="16"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-data-table': DkDataTable;
  }
}
