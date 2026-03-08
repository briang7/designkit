import { css } from 'lit';
import { reducedMotion, fadeIn, fadeOut, slideInUp } from '../../core/animations.js';
import { dkLinkReset } from '../../core/dk-element.js';

export const bannerBaseStyles = css`
  :host {
    display: block;
    font-family: var(--dk-font-sans, system-ui, sans-serif);
  }

  :host([bg="brand"]) {
    background: var(--dk-section-bg-brand, #3b82f6);
    color: var(--dk-section-text-on-brand, #ffffff);
  }

  :host([bg="dark"]) {
    background: var(--dk-section-bg-dark, #111827);
    color: var(--dk-section-text-on-dark, #ffffff);
  }

  :host([bg="alt"]) {
    background: var(--dk-section-bg-alt, #f9fafb);
    color: var(--dk-color-text, #111827);
  }

  :host([bg="primary"]) {
    background: var(--dk-section-bg-primary, #ffffff);
    color: var(--dk-color-text, #111827);
  }

  .container {
    max-width: var(--dk-section-max-width, 1200px);
    margin: 0 auto;
  }

  .message {
    font-size: var(--dk-font-size-sm, 0.875rem);
    line-height: var(--dk-leading-normal, 1.5);
    margin: 0;
  }

  .dismiss-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    opacity: 0.7;
    padding: var(--dk-space-1, 0.25rem);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--dk-radius-sm, 0.25rem);
    transition: opacity 0.2s ease;
    flex-shrink: 0;
  }

  .dismiss-btn:hover {
    opacity: 1;
  }

  .dismiss-btn:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  .dismiss-btn svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  ${fadeIn}
  ${fadeOut}
  ${slideInUp}
  ${reducedMotion}
  ${dkLinkReset}
`;
