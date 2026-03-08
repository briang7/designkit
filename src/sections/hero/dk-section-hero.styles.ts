import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';
import { dkLinkReset } from '../../core/dk-element.js';

export const heroBaseStyles = css`
  :host {
    display: block;
    padding: var(--dk-section-padding-y, 5rem) var(--dk-section-padding-x, 1.5rem) !important;
  }

  .container {
    max-width: var(--dk-section-max-width, 1200px);
    margin: 0 auto;
  }

  h1 {
    font-family: var(--dk-font-display, var(--dk-font-sans, system-ui, sans-serif));
    font-size: var(--dk-font-size-display, clamp(2.75rem, 6vw, 4.5rem));
    font-weight: var(--dk-font-extrabold, 800);
    line-height: var(--dk-leading-tight, 1.1);
    color: var(--dk-color-text, #111827);
    margin: 0 0 var(--dk-space-5, 1.25rem);
    letter-spacing: -0.035em;
    text-wrap: balance;
  }

  .subheadline {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-subheadline, clamp(1.125rem, 2vw, 1.375rem));
    line-height: var(--dk-leading-relaxed, 1.65);
    color: var(--dk-color-text-muted, #6b7280);
    margin: 0 0 var(--dk-space-10, 2.5rem);
    text-wrap: balance;
  }

  :host([bg="brand"]) h1,
  :host([bg="dark"]) h1 {
    color: #ffffff;
  }

  :host([bg="brand"]) .subheadline,
  :host([bg="dark"]) .subheadline {
    color: rgba(255, 255, 255, 0.9);
  }

  .cta-group {
    display: flex;
    gap: var(--dk-space-3, 0.75rem);
    flex-wrap: wrap;
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
