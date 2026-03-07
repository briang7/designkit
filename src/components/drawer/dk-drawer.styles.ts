import { css } from 'lit';
import { fadeIn, reducedMotion } from '../../core/animations.js';

export const drawerStyles = css`
  :host {
    display: contents;
  }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: var(--dk-z-modal);
    background: var(--dk-color-overlay);
    animation: dk-fade-in 200ms ease;
  }

  .panel {
    position: fixed;
    background: var(--dk-color-surface-raised);
    box-shadow: var(--dk-shadow-xl);
    display: flex;
    flex-direction: column;
    font-family: var(--dk-font-sans);
    color: var(--dk-color-text);
    overflow-y: auto;
  }

  .panel.end {
    top: 0;
    right: 0;
    bottom: 0;
    /* slide animation handled by Motion One */
  }

  .panel.start {
    top: 0;
    left: 0;
    bottom: 0;
    /* slide animation handled by Motion One */
  }

  .panel.top {
    top: 0;
    left: 0;
    right: 0;
    /* slide animation handled by Motion One */
  }

  .panel.bottom {
    bottom: 0;
    left: 0;
    right: 0;
    /* slide animation handled by Motion One */
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--dk-space-4) var(--dk-space-5);
    border-bottom: 1px solid var(--dk-color-border);
    flex-shrink: 0;
  }

  .title {
    font-size: var(--dk-text-lg);
    font-weight: var(--dk-font-semibold);
  }

  .close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    color: var(--dk-color-text-muted);
    cursor: pointer;
    border-radius: var(--dk-radius-sm);
    transition: all var(--dk-transition-fast);
  }

  .close:hover {
    background: var(--dk-color-surface);
    color: var(--dk-color-text);
  }

  .close:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring);
  }

  .body {
    flex: 1;
    padding: var(--dk-space-5);
    overflow-y: auto;
  }

  .footer {
    padding: 0 var(--dk-space-5) var(--dk-space-5);
    flex-shrink: 0;
  }

  .footer:empty {
    display: none;
  }

  ${fadeIn}
  ${reducedMotion}
`;
