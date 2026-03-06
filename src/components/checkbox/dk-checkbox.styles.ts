import { css } from 'lit';
import { reducedMotion, checkmark } from '../../core/animations.js';

export const checkboxStyles = css`
  :host {
    display: inline-block;
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    gap: var(--dk-space-2);
    cursor: pointer;
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    color: var(--dk-color-text);
    user-select: none;
  }

  .checkbox.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 2px solid var(--dk-color-input-border);
    border-radius: var(--dk-radius-sm);
    background: var(--dk-color-input-bg);
    transition: all var(--dk-transition-fast);
    flex-shrink: 0;
  }

  .control:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring);
  }

  .checkbox.checked .control,
  .checkbox.indeterminate .control {
    background: var(--dk-color-primary);
    border-color: var(--dk-color-primary);
  }

  .checkbox:not(.disabled):hover .control {
    border-color: var(--dk-color-primary);
  }

  .icon {
    width: 14px;
    height: 14px;
    color: var(--dk-color-primary-text);
  }

  .checkbox.checked .icon polyline {
    stroke-dasharray: 20;
    stroke-dashoffset: 0;
    animation: dk-checkmark 200ms ease-out;
  }

  .label:empty {
    display: none;
  }

  ${checkmark}
  ${reducedMotion}
`;
