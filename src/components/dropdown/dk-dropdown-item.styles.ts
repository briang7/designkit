import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const dropdownItemStyles = css`
  :host {
    display: block;
    outline: none;
  }

  :host(:focus) .item:not(.disabled) {
    background: var(--dk-color-surface);
  }

  .item {
    display: flex;
    align-items: center;
    gap: var(--dk-space-2);
    padding: var(--dk-space-2) var(--dk-space-3);
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    color: var(--dk-color-text);
    cursor: pointer;
    transition: background var(--dk-transition-fast), color var(--dk-transition-fast);
    white-space: nowrap;
    user-select: none;
  }

  .item:hover:not(.disabled) {
    background: var(--dk-color-surface);
  }

  .item.danger {
    color: var(--dk-color-danger);
  }

  .item.danger:hover:not(.disabled) {
    background: color-mix(in srgb, var(--dk-color-danger) 8%, transparent);
  }

  .item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${reducedMotion}
`;
