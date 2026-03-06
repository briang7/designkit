import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  .card {
    border-radius: var(--dk-radius-lg);
    background: var(--dk-color-surface-raised);
    overflow: hidden;
    font-family: var(--dk-font-sans);
    color: var(--dk-color-text);
  }

  .card.elevated {
    box-shadow: var(--dk-shadow-md);
  }

  .card.outlined {
    border: 1px solid var(--dk-color-border);
  }

  .body {
    padding: var(--dk-space-4);
  }

  ::slotted([slot="header"]) {
    padding: var(--dk-space-4) var(--dk-space-4) 0;
    font-weight: var(--dk-font-semibold);
    font-size: var(--dk-text-lg);
  }

  ::slotted([slot="media"]) {
    width: 100%;
    display: block;
  }

  ::slotted([slot="footer"]) {
    padding: 0 var(--dk-space-4) var(--dk-space-4);
    border-top: 1px solid var(--dk-color-border);
    padding-top: var(--dk-space-3);
    margin-top: 0;
  }
`;
