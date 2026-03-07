import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';
import { dkLinkReset } from '../../core/dk-element.js';

export const galleryBaseStyles = css`
  :host {
    display: block;
    padding: var(--dk-section-padding-y, 5rem) var(--dk-section-padding-x, 1.5rem) !important;
  }

  .container {
    max-width: var(--dk-section-max-width, 1200px);
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: var(--dk-space-12, 3rem);
  }

  h2 {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-h2, clamp(1.875rem, 4vw, 2.5rem));
    font-weight: var(--dk-font-extrabold, 800);
    line-height: var(--dk-leading-tight, 1.15);
    color: var(--dk-color-text, #111827);
    margin: 0;
    letter-spacing: -0.025em;
  }

  .animate-target {
    opacity: 0;
    animation: dk-reveal 0.01s 1s forwards;
  }

  @keyframes dk-reveal {
    to { opacity: 1; }
  }

  ${reducedMotion}
  ${dkLinkReset}
`;
