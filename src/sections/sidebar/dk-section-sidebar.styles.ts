import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';
import { dkLinkReset } from '../../core/dk-element.js';

export const sidebarBaseStyles = css`
  :host {
    display: block;
  }

  ${reducedMotion}
  ${dkLinkReset}
`;
