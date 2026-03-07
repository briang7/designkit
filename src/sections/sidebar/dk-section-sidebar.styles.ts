import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const sidebarBaseStyles = css`
  :host {
    display: block;
  }

  ${reducedMotion}
`;
