import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const inputStyles = css`
  :host {
    display: block;
  }

  .label {
    position: absolute;
    left: var(--dk-space-3);
    top: 50%;
    transform: translateY(-50%);
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    font-weight: var(--dk-font-medium);
    color: var(--dk-color-text-muted);
    pointer-events: none;
    transition: transform var(--dk-transition-normal), font-size var(--dk-transition-normal), color var(--dk-transition-normal), left var(--dk-transition-normal);
    transform-origin: left center;
    z-index: 1;
  }

  .required {
    color: var(--dk-color-danger);
  }

  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--dk-space-2);
    border: 1px solid var(--dk-color-input-border);
    border-radius: var(--dk-radius-md);
    background: var(--dk-color-input-bg);
    transition: all var(--dk-transition-fast);
    overflow: hidden;
  }

  .wrapper.has-label {
    padding-top: var(--dk-space-2);
  }

  .wrapper.has-prefix .label {
    left: calc(var(--dk-space-3) + var(--dk-input-prefix-offset, 1.5em) + var(--dk-space-2));
  }

  .wrapper:focus-within .label,
  .wrapper.has-value .label {
    transform: translateY(-140%) scale(0.85);
    color: var(--dk-color-input-border-focus);
    left: var(--dk-space-3);
  }

  .wrapper:hover:not(.disabled) {
    border-color: var(--dk-color-input-border-hover);
  }

  .wrapper:focus-within:not(.disabled) {
    border-color: var(--dk-color-input-border-focus);
    box-shadow: var(--dk-focus-ring);
  }

  .wrapper.error {
    border-color: var(--dk-color-danger);
  }

  .wrapper.error:focus-within {
    box-shadow: 0 0 0 2px var(--dk-color-bg), 0 0 0 4px var(--dk-color-danger);
  }

  .wrapper.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .wrapper.sm {
    height: 32px;
    padding: 0 var(--dk-space-2);
  }

  .wrapper.md {
    height: 40px;
    padding: 0 var(--dk-space-3);
  }

  .wrapper.lg {
    height: 48px;
    padding: 0 var(--dk-space-4);
  }

  input {
    flex: 1;
    border: none;
    background: none;
    outline: none;
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    color: var(--dk-color-text);
    min-width: 0;
  }

  .wrapper.lg input {
    font-size: var(--dk-text-md);
  }

  input::placeholder {
    color: var(--dk-color-input-placeholder);
  }

  input:disabled {
    cursor: not-allowed;
  }

  .clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
    background: var(--dk-color-surface);
    color: var(--dk-color-text-muted);
    cursor: pointer;
    padding: 0;
    border-radius: 50%;
    font-size: 14px;
    line-height: 1;
    transition: all var(--dk-transition-fast);
    flex-shrink: 0;
  }

  .clear:hover {
    background: var(--dk-color-border);
    color: var(--dk-color-text);
  }

  .help-text {
    display: block;
    margin-top: var(--dk-space-1);
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-xs);
    color: var(--dk-color-text-muted);
  }

  .help-text.error {
    color: var(--dk-color-danger);
  }

  ${reducedMotion}
`;
