import { css } from 'lit';
import { fadeIn, reducedMotion } from '../../core/animations.js';

export const tooltipStyles = css`
  :host {
    display: inline-block;
  }

  .trigger-wrapper {
    position: relative;
    display: inline-block;
  }

  .tooltip {
    position: absolute;
    z-index: var(--dk-z-tooltip);
    background: var(--dk-gray-800);
    color: var(--dk-white);
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-xs);
    font-weight: var(--dk-font-medium);
    padding: var(--dk-space-1) var(--dk-space-2);
    border-radius: var(--dk-radius-sm);
    white-space: nowrap;
    pointer-events: none;
    /* animation handled by Motion One */
  }

  .arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--dk-gray-800);
    transform: rotate(45deg);
  }

  /* Top placement */
  .tooltip.top {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }
  .tooltip.top .arrow {
    bottom: -4px;
    left: 50%;
    margin-left: -4px;
  }

  /* Bottom placement */
  .tooltip.bottom {
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }
  .tooltip.bottom .arrow {
    top: -4px;
    left: 50%;
    margin-left: -4px;
  }

  /* Left placement */
  .tooltip.left {
    right: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }
  .tooltip.left .arrow {
    right: -4px;
    top: 50%;
    margin-top: -4px;
  }

  /* Right placement */
  .tooltip.right {
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }
  .tooltip.right .arrow {
    left: -4px;
    top: 50%;
    margin-top: -4px;
  }

  ${fadeIn}
  ${reducedMotion}
`;
