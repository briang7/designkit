import { css } from 'lit';

export const commandStyles = css`
  :host {
    display: contents;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background: var(--dk-color-overlay, rgba(0, 0, 0, 0.5));
    z-index: var(--dk-z-modal, 1000);
  }

  .panel {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 640px;
    max-height: 60vh;
    background: var(--dk-color-surface-raised, #fff);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-lg, 12px);
    box-shadow: var(--dk-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
    z-index: calc(var(--dk-z-modal, 1000) + 1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .search-wrapper {
    display: flex;
    align-items: center;
    gap: var(--dk-space-3, 12px);
    padding: var(--dk-space-3, 12px) var(--dk-space-4, 16px);
    border-bottom: 1px solid var(--dk-color-border, #e5e7eb);
  }

  .search-icon {
    flex-shrink: 0;
    color: var(--dk-color-text-muted, #6b7280);
  }

  .search-input {
    flex: 1;
    border: none;
    background: none;
    outline: none;
    font-family: var(--dk-font-sans, sans-serif);
    font-size: var(--dk-text-md, 1rem);
    color: var(--dk-color-text, #1a1a1a);
    min-width: 0;
  }

  .search-input::placeholder {
    color: var(--dk-color-input-placeholder, #9ca3af);
  }

  .results {
    overflow-y: auto;
    padding: var(--dk-space-2, 8px) 0;
  }

  .empty-state {
    padding: var(--dk-space-8, 32px);
    text-align: center;
    font-family: var(--dk-font-sans, sans-serif);
    font-size: var(--dk-text-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
  }
`;
