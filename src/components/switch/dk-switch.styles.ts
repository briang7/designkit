import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const switchStyles = css`
  :host {
    display: inline-block;
  }

  .switch {
    display: inline-flex;
    align-items: center;
    gap: var(--dk-space-2);
    cursor: pointer;
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    color: var(--dk-color-text);
    user-select: none;
  }

  .switch.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .track {
    position: relative;
    display: inline-flex;
    align-items: center;
    border-radius: var(--dk-radius-full);
    background: var(--dk-color-border);
    transition: background var(--dk-transition-fast);
    flex-shrink: 0;
  }

  .track:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring);
  }

  .switch.checked .track {
    background: var(--dk-color-primary);
  }

  .thumb {
    position: absolute;
    border-radius: 50%;
    background: white;
    box-shadow: var(--dk-shadow-sm);
  }

  /* Sizes */
  .switch.sm .track {
    width: 36px;
    height: 20px;
  }
  .switch.sm .thumb {
    width: 16px;
    height: 16px;
    left: 2px;
  }
  /* thumb position handled by spring animation */

  .switch.md .track {
    width: 44px;
    height: 24px;
  }
  .switch.md .thumb {
    width: 20px;
    height: 20px;
    left: 2px;
  }
  /* thumb position handled by spring animation */

  .switch.lg .track {
    width: 52px;
    height: 28px;
  }
  .switch.lg .thumb {
    width: 24px;
    height: 24px;
    left: 2px;
  }
  /* thumb position handled by spring animation */

  .label:empty {
    display: none;
  }

  ${reducedMotion}
`;
