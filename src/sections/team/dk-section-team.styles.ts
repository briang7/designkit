import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const teamBaseStyles = css`
  :host {
    display: block;
    padding: var(--dk-section-padding-y, 5rem) var(--dk-section-padding-x, 1.5rem);
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
    margin: 0 0 var(--dk-space-4, 1rem);
    letter-spacing: -0.025em;
  }

  .subheadline {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-subheadline, clamp(1.125rem, 2vw, 1.375rem));
    line-height: var(--dk-leading-relaxed, 1.6);
    color: var(--dk-color-text-muted, #6b7280);
    margin: 0;
    max-width: 640px;
    margin-inline: auto;
  }

  .animate-target {
    opacity: 0;
  }

  ${reducedMotion}
`;
