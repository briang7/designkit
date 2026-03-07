import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const dataTableStyles = css`
  :host {
    display: block;
    font-family: var(--dk-font-sans);
    color: var(--dk-color-text);
  }

  .table-wrapper {
    overflow-x: auto;
    border: 1px solid var(--dk-color-border);
    border-radius: var(--dk-radius-md);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--dk-text-sm);
  }

  thead {
    background: var(--dk-color-surface);
  }

  .sticky-header thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  th {
    padding: var(--dk-space-3) var(--dk-space-4);
    text-align: left;
    font-weight: var(--dk-font-semibold);
    font-size: var(--dk-text-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--dk-color-text-muted);
    border-bottom: 1px solid var(--dk-color-border);
    white-space: nowrap;
  }

  th.sortable {
    cursor: pointer;
    user-select: none;
  }

  th.sortable:hover {
    color: var(--dk-color-text);
  }

  th.sorted {
    color: var(--dk-color-primary);
  }

  .th-content {
    display: inline-flex;
    align-items: center;
    gap: var(--dk-space-1);
  }

  .sort-icon {
    display: inline-flex;
    flex-shrink: 0;
    transition: transform var(--dk-transition-fast);
  }

  td {
    padding: var(--dk-space-3) var(--dk-space-4);
    border-bottom: 1px solid var(--dk-color-border);
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr {
    transition: background-color var(--dk-transition-fast);
  }

  tbody tr:hover {
    background: var(--dk-color-surface);
  }

  tbody tr.selected {
    background: var(--dk-color-primary-light);
  }

  .checkbox-cell {
    width: 40px;
    text-align: center;
  }

  .checkbox-cell input {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }

  .empty {
    text-align: center;
    padding: var(--dk-space-8) var(--dk-space-4);
    color: var(--dk-color-text-muted);
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--dk-space-3) var(--dk-space-4);
    border: 1px solid var(--dk-color-border);
    border-top: none;
    border-radius: 0 0 var(--dk-radius-md) var(--dk-radius-md);
    font-size: var(--dk-text-sm);
  }

  .page-info {
    color: var(--dk-color-text-muted);
  }

  .page-buttons {
    display: flex;
    gap: var(--dk-space-1);
  }

  .page-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--dk-color-border);
    border-radius: var(--dk-radius-sm);
    background: var(--dk-color-surface-raised);
    color: var(--dk-color-text);
    cursor: pointer;
    transition: all var(--dk-transition-fast);
  }

  .page-btn:hover:not(:disabled) {
    background: var(--dk-color-surface);
    border-color: var(--dk-color-border-hover);
  }

  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-btn:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring);
  }

  ${reducedMotion}
`;
