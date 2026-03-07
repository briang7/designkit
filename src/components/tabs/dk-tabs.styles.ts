import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

const tabStyle = css`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    gap: var(--dk-space-2);
    padding: var(--dk-space-2) var(--dk-space-4);
    border: none;
    background: none;
    font-family: var(--dk-font-sans);
    font-size: var(--dk-text-sm);
    font-weight: var(--dk-font-medium);
    color: var(--dk-color-text-muted);
    cursor: pointer;
    transition: color var(--dk-transition-fast);
    white-space: nowrap;
    position: relative;
  }

  .tab:hover:not(.disabled) {
    color: var(--dk-color-text);
  }

  .tab.active {
    color: var(--dk-color-primary);
  }

  .tab::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--dk-color-primary);
    border-radius: 1px;
    transform: scaleX(0);
    transition: transform var(--dk-transition-normal);
  }

  .tab.active::after {
    transform: scaleX(1);
  }

  .tab.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring);
    border-radius: var(--dk-radius-sm);
  }

  ${reducedMotion}
`;

const panelStyle = css`
  :host {
    display: block;
  }

  .panel {
    padding: var(--dk-space-4) 0;
  }
`;

const tabsStyle = css`
  :host {
    display: block;
    font-family: var(--dk-font-sans);
  }

  .tab-list {
    display: flex;
    border-bottom: 1px solid var(--dk-color-border);
    overflow-x: auto;
  }

  .panels {
    color: var(--dk-color-text);
  }
`;

export const tabsStyles = {
  tab: tabStyle,
  panel: panelStyle,
  tabs: tabsStyle,
};
