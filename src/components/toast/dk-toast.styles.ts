import { css } from 'lit';
import { slideInDown, fadeIn, reducedMotion } from '../../core/animations.js';

const toastStyle = css`
  :host {
    display: block;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: var(--dk-space-3);
    padding: var(--dk-space-3) var(--dk-space-4);
    border-radius: var(--dk-radius-md);
    background: var(--dk-color-surface-raised);
    border: 1px solid var(--dk-color-border);
    box-shadow: var(--dk-shadow-lg);
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    color: var(--dk-color-text);
    animation: dk-slide-in-down 200ms ease;
    min-width: 300px;
    max-width: 420px;
  }

  .icon {
    flex-shrink: 0;
    display: flex;
  }

  .toast.info .icon { color: var(--dk-color-primary); }
  .toast.success .icon { color: var(--dk-color-success); }
  .toast.danger .icon { color: var(--dk-color-danger); }
  .toast.warning .icon { color: var(--dk-color-warning); }

  .message {
    flex: 1;
    line-height: var(--dk-leading-normal);
  }

  .action {
    border: none;
    background: none;
    color: var(--dk-color-primary);
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    font-weight: var(--dk-font-medium);
    cursor: pointer;
    padding: var(--dk-space-1) var(--dk-space-2);
    border-radius: var(--dk-radius-sm);
    white-space: nowrap;
    transition: background var(--dk-transition-fast);
  }

  .action:hover {
    background: var(--dk-color-primary-light);
  }

  .action:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring);
  }

  .close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    color: var(--dk-color-text-muted);
    cursor: pointer;
    border-radius: var(--dk-radius-sm);
    flex-shrink: 0;
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

  ${slideInDown}
  ${reducedMotion}
`;

const containerStyle = css`
  :host {
    display: block;
  }

  .container {
    position: fixed;
    z-index: var(--dk-z-toast);
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-2);
    padding: var(--dk-space-4);
    pointer-events: none;
    max-height: 100vh;
    overflow: hidden;
  }

  .container > * {
    pointer-events: auto;
  }

  .container.top-right { top: 0; right: 0; }
  .container.top-left { top: 0; left: 0; }
  .container.bottom-right { bottom: 0; right: 0; }
  .container.bottom-left { bottom: 0; left: 0; }
  .container.top-center { top: 0; left: 50%; transform: translateX(-50%); }
  .container.bottom-center { bottom: 0; left: 50%; transform: translateX(-50%); }

  ${fadeIn}
`;

export const toastStyles = {
  toast: toastStyle,
  container: containerStyle,
};
