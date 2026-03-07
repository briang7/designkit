import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const badgeStyles = css`
  :host {
    display: inline-block;
    transition: transform var(--dk-transition-fast);
  }

  :host(:hover) {
    transform: scale(1.05);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--dk-space-1);
    border-radius: var(--dk-radius-full);
    font-family: var(--dk-font-sans);
    font-weight: var(--dk-font-medium);
    white-space: nowrap;
    transition: all var(--dk-transition-fast);
  }

  .badge.sm {
    height: 20px;
    padding: 0 var(--dk-space-2);
    font-size: 11px;
  }

  .badge.md {
    height: 24px;
    padding: 0 var(--dk-space-3);
    font-size: var(--dk-text-xs);
  }

  .badge.lg {
    height: 28px;
    padding: 0 var(--dk-space-3);
    font-size: var(--dk-text-sm);
  }

  .badge.default {
    background: var(--dk-color-surface);
    color: var(--dk-color-text);
    border: 1px solid var(--dk-color-border);
  }

  .badge.primary {
    background: var(--dk-color-primary-light);
    color: var(--dk-color-primary);
  }

  .badge.success {
    background: var(--dk-color-success-light);
    color: var(--dk-color-success);
  }

  .badge.danger {
    background: var(--dk-color-danger-light);
    color: var(--dk-color-danger);
  }

  .badge.warning {
    background: var(--dk-color-warning-light);
    color: var(--dk-color-warning);
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }

  .remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: none;
    background: none;
    color: currentColor;
    cursor: pointer;
    padding: 0;
    border-radius: 50%;
    opacity: 0.7;
    transition: opacity var(--dk-transition-fast);
    font-size: 14px;
    line-height: 1;
  }

  .remove:hover {
    opacity: 1;
    background: rgb(0 0 0 / 0.1);
  }

  .remove:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring);
  }

  ${reducedMotion}
`;
