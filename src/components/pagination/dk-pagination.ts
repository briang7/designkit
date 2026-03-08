import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { reducedMotion } from '../../core/animations.js';

@customElement('dk-pagination')
export class DkPagination extends DkElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--dk-font-sans);
    }

    .base {
      display: flex;
      align-items: center;
      gap: var(--dk-space-1);
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      padding: 0 var(--dk-space-2);
      border: 1px solid var(--dk-color-border);
      border-radius: var(--dk-radius-md);
      background: transparent;
      color: var(--dk-color-text);
      font-family: var(--dk-font-sans);
      font-size: var(--dk-text-sm);
      font-weight: var(--dk-font-medium);
      cursor: pointer;
      transition: all var(--dk-transition-fast);
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    button:hover:not(:disabled):not(.active) {
      background: var(--dk-color-surface);
      border-color: var(--dk-color-border-hover);
    }

    button:focus-visible {
      outline: none;
      box-shadow: var(--dk-focus-ring);
    }

    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    button.active {
      background: var(--dk-color-primary);
      color: var(--dk-color-primary-text);
      border-color: var(--dk-color-primary);
    }

    .ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      font-size: var(--dk-text-sm);
      color: var(--dk-color-text-muted, var(--dk-color-text));
      opacity: 0.6;
      user-select: none;
    }

    .nav-btn svg {
      width: 16px;
      height: 16px;
    }

    ${reducedMotion}
  `;

  @property({ type: Number }) total = 0;
  @property({ type: Number }) page = 1;
  @property({ type: Number, attribute: 'page-size' }) pageSize = 10;
  @property({ type: Number, attribute: 'max-visible' }) maxVisible = 7;

  private get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  private getVisiblePages(): (number | 'ellipsis')[] {
    const total = this.totalPages;
    const current = this.page;
    const max = this.maxVisible;

    // If total pages fit within max visible, show all
    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    // Reserve 2 slots for first and last, so we have max - 2 slots for middle + ellipses
    const sideCount = Math.floor((max - 4) / 2); // slots on each side of current (minus first, last, 2 ellipses)

    const rangeStart = Math.max(2, current - sideCount);
    const rangeEnd = Math.min(total - 1, current + sideCount);

    // Adjust if near the beginning
    let adjustedStart = rangeStart;
    let adjustedEnd = rangeEnd;

    if (current <= sideCount + 2) {
      // Near the start: show more pages at the beginning
      adjustedStart = 2;
      adjustedEnd = Math.min(total - 1, max - 2);
    } else if (current >= total - sideCount - 1) {
      // Near the end: show more pages at the end
      adjustedEnd = total - 1;
      adjustedStart = Math.max(2, total - max + 3);
    }

    // Add left ellipsis if needed
    if (adjustedStart > 2) {
      pages.push('ellipsis');
    }

    // Add middle pages
    for (let i = adjustedStart; i <= adjustedEnd; i++) {
      pages.push(i);
    }

    // Add right ellipsis if needed
    if (adjustedEnd < total - 1) {
      pages.push('ellipsis');
    }

    // Always show last page
    pages.push(total);

    return pages;
  }

  private handlePageClick(page: number) {
    if (page < 1 || page > this.totalPages || page === this.page) return;
    this.page = page;
    this.emitEvent('dk-page-change', { page });
  }

  override render() {
    if (this.totalPages <= 1) return nothing;

    const pages = this.getVisiblePages();
    const isFirst = this.page <= 1;
    const isLast = this.page >= this.totalPages;

    return html`
      <nav class="base" part="base" aria-label="Pagination">
        <button
          part="button prev"
          class="nav-btn"
          ?disabled=${isFirst}
          @click=${() => this.handlePageClick(this.page - 1)}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 4l-4 4 4 4"/>
          </svg>
        </button>

        ${pages.map(p =>
          p === 'ellipsis'
            ? html`<span class="ellipsis" aria-hidden="true">&hellip;</span>`
            : html`
              <button
                part="button ${p === this.page ? 'active' : ''}"
                class=${classMap({ active: p === this.page })}
                @click=${() => this.handlePageClick(p)}
                aria-label="Page ${p}"
                aria-current=${p === this.page ? 'page' : nothing}
              >
                ${p}
              </button>
            `
        )}

        <button
          part="button next"
          class="nav-btn"
          ?disabled=${isLast}
          @click=${() => this.handlePageClick(this.page + 1)}
          aria-label="Next page"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 4l4 4-4 4"/>
          </svg>
        </button>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-pagination': DkPagination;
  }
}
