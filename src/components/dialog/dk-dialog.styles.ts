import { css } from 'lit';
import { scaleIn, fadeIn, reducedMotion } from '../../core/animations.js';

export const dialogStyles = css`
  :host {
    display: contents;
  }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: var(--dk-z-modal);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--dk-color-overlay);
    animation: dk-fade-in 200ms ease;
  }

  .panel {
    background: var(--dk-color-surface-raised);
    border-radius: var(--dk-radius-lg);
    box-shadow: var(--dk-shadow-xl);
    max-width: 500px;
    width: calc(100% - 32px);
    max-height: calc(100vh - 64px);
    overflow-y: auto;
    animation: dk-scale-in 200ms ease;
    font-family: var(--dk-font-sans);
    color: var(--dk-color-text);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--dk-space-4) var(--dk-space-5);
    border-bottom: 1px solid var(--dk-color-border);
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
    margin-left: auto;
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
    padding: var(--dk-space-5);
  }

  .footer {
    padding: 0 var(--dk-space-5) var(--dk-space-5);
  }

  .footer:empty {
    display: none;
  }

  ${scaleIn}
  ${fadeIn}
  ${reducedMotion}
`;
