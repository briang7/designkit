import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';
import { dkLinkReset } from '../../core/dk-element.js';

export const logoCloudBaseStyles = css`
  :host {
    display: block;
    padding: var(--dk-section-padding-y, 5rem) var(--dk-section-padding-x, 1.5rem) !important;
  }

  :host([bg="brand"]) {
    background: var(--dk-section-bg-brand, #3b82f6);
    color: var(--dk-section-text-on-brand, #ffffff);
  }

  :host([bg="dark"]) {
    background: var(--dk-section-bg-dark, #111827);
    color: var(--dk-section-text-on-dark, #ffffff);
  }

  :host([bg="brand"]) h2,
  :host([bg="dark"]) h2 {
    color: var(--dk-section-text-on-brand, #ffffff);
  }

  :host([bg="brand"]) .description,
  :host([bg="dark"]) .description {
    color: rgba(255, 255, 255, 0.9);
  }

  .container {
    max-width: var(--dk-section-max-width, 1200px);
    margin: 0 auto;
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

  .description {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-subheadline, clamp(1.125rem, 2vw, 1.375rem));
    line-height: var(--dk-leading-relaxed, 1.6);
    color: var(--dk-color-text-muted, #6b7280);
    margin: 0 0 var(--dk-space-8, 2rem);
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
