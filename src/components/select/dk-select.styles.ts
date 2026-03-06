import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const selectStyles = css`
  :host {
    display: block;
  }

  .field-label {
    display: block;
    margin-bottom: var(--dk-space-1);
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    font-weight: var(--dk-font-medium);
    color: var(--dk-color-text);
  }

  .select-wrapper {
    position: relative;
  }

  .trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid var(--dk-color-input-border);
    border-radius: var(--dk-radius-md);
    background: var(--dk-color-input-bg);
    font-family: var(--dk-font-sans);
    color: var(--dk-color-text);
    cursor: pointer;
    transition: all var(--dk-transition-fast);
    text-align: left;
  }

  .trigger:hover:not(:disabled) {
    border-color: var(--dk-color-input-border-hover);
  }

  .trigger:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring);
  }

  .trigger.open {
    border-color: var(--dk-color-input-border-focus);
    box-shadow: var(--dk-focus-ring);
  }

  .trigger:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .trigger.placeholder .trigger-text {
    color: var(--dk-color-input-placeholder);
  }

  .trigger.sm {
    height: 32px;
    padding: 0 var(--dk-space-2);
    font-size: var(--dk-text-sm);
  }

  .trigger.md {
    height: 40px;
    padding: 0 var(--dk-space-3);
    font-size: var(--dk-text-sm);
  }

  .trigger.lg {
    height: 48px;
    padding: 0 var(--dk-space-4);
    font-size: var(--dk-text-md);
  }

  .trigger-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chevron {
    flex-shrink: 0;
    transition: transform var(--dk-transition-fast);
    color: var(--dk-color-text-muted);
  }

  .trigger.open .chevron {
    transform: rotate(180deg);
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: var(--dk-z-dropdown);
    background: var(--dk-color-surface-raised);
    border: 1px solid var(--dk-color-border);
    border-radius: var(--dk-radius-md);
    box-shadow: var(--dk-shadow-lg);
    max-height: 256px;
    overflow-y: auto;
    /* animation handled by Motion One */
  }

  .search-wrapper {
    padding: var(--dk-space-2);
    border-bottom: 1px solid var(--dk-color-border);
  }

  .search-input {
    width: 100%;
    border: 1px solid var(--dk-color-input-border);
    border-radius: var(--dk-radius-sm);
    padding: var(--dk-space-1) var(--dk-space-2);
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    background: var(--dk-color-input-bg);
    color: var(--dk-color-text);
    outline: none;
    box-sizing: border-box;
  }

  .search-input:focus {
    border-color: var(--dk-color-input-border-focus);
  }

  .option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--dk-space-2) var(--dk-space-3);
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    color: var(--dk-color-text);
    cursor: pointer;
    transition: background var(--dk-transition-fast);
  }

  .option.highlighted {
    background: var(--dk-color-surface);
  }

  .option.selected {
    color: var(--dk-color-primary);
    font-weight: var(--dk-font-medium);
  }

  .option.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .check {
    flex-shrink: 0;
    color: var(--dk-color-primary);
  }

  .no-results {
    padding: var(--dk-space-4);
    text-align: center;
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    color: var(--dk-color-text-muted);
  }

  ${reducedMotion}
`;
