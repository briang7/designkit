import { css } from 'lit';
import { reducedMotion, spin } from '../../core/animations.js';

export const buttonStyles = css`
  :host {
    display: inline-block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--dk-space-2);
    border: 1px solid transparent;
    border-radius: var(--dk-radius-md);
    font-family: var(--dk-font-sans);
    font-weight: var(--dk-font-medium);
    line-height: var(--dk-leading-tight);
    cursor: pointer;
    transition: all var(--dk-transition-fast);
    position: relative;
    white-space: nowrap;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  button:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring);
  }

  /* Sizes */
  button.sm {
    height: 32px;
    padding: 0 var(--dk-space-3);
    font-size: var(--dk-text-sm);
  }

  button.md {
    height: 40px;
    padding: 0 var(--dk-space-4);
    font-size: var(--dk-text-sm);
  }

  button.lg {
    height: 48px;
    padding: 0 var(--dk-space-6);
    font-size: var(--dk-text-md);
  }

  /* Primary variant */
  button.primary {
    background: var(--dk-color-primary);
    color: var(--dk-color-primary-text);
  }

  button.primary:hover {
    background: var(--dk-color-primary-hover);
  }

  button.primary:active {
    transform: scale(0.98);
  }

  /* Secondary variant */
  button.secondary {
    background: transparent;
    color: var(--dk-color-text);
    border-color: var(--dk-color-border);
  }

  button.secondary:hover {
    background: var(--dk-color-surface);
    border-color: var(--dk-color-border-hover);
  }

  button.secondary:active {
    transform: scale(0.98);
  }

  /* Ghost variant */
  button.ghost {
    background: transparent;
    color: var(--dk-color-text);
  }

  button.ghost:hover {
    background: var(--dk-color-surface);
  }

  button.ghost:active {
    transform: scale(0.98);
  }

  /* Danger variant */
  button.danger {
    background: var(--dk-color-danger);
    color: var(--dk-white);
  }

  button.danger:hover {
    background: var(--dk-color-danger-hover);
  }

  button.danger:active {
    transform: scale(0.98);
  }

  /* Disabled */
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Loading */
  .spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: dk-spin 600ms linear infinite;
  }

  .label-hidden {
    visibility: hidden;
  }

  .loading-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${spin}
  ${reducedMotion}
`;
