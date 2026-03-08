import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const dropdownStyles = css`
  :host {
    display: inline-block;
    position: relative;
  }

  .dropdown-wrapper {
    position: relative;
  }

  .trigger {
    display: inline-flex;
    cursor: pointer;
    outline: none;
  }

  .trigger:focus-visible {
    border-radius: var(--dk-radius-sm);
    box-shadow: var(--dk-focus-ring);
  }

  .menu {
    position: absolute;
    z-index: var(--dk-z-dropdown);
    min-width: 180px;
    background: var(--dk-color-surface-raised);
    border: 1px solid var(--dk-color-border);
    border-radius: var(--dk-radius-md);
    box-shadow: var(--dk-shadow-lg);
    padding: var(--dk-space-1) 0;
    /* animation handled by Motion One */
  }

  /* Placement: bottom-start (default) */
  .menu.bottom-start {
    top: calc(100% + 4px);
    left: 0;
  }

  .menu.bottom-end {
    top: calc(100% + 4px);
    right: 0;
  }

  .menu.top-start {
    bottom: calc(100% + 4px);
    left: 0;
  }

  .menu.top-end {
    bottom: calc(100% + 4px);
    right: 0;
  }

  ${reducedMotion}
`;
