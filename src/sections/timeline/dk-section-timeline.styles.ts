import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';
import { dkLinkReset } from '../../core/dk-element.js';

export const timelineBaseStyles = css`
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

  :host([bg="brand"]) .subheadline,
  :host([bg="dark"]) .subheadline {
    color: rgba(255, 255, 255, 0.9);
  }

  :host([bg="brand"]),
  :host([bg="dark"]) {
    --dk-color-text: #ffffff;
    --dk-color-text-muted: rgba(255, 255, 255, 0.7);
    --dk-timeline-line-color: rgba(255, 255, 255, 0.2);
    --dk-timeline-dot-color: rgba(255, 255, 255, 0.3);
    --dk-timeline-dot-border: transparent;
    --dk-timeline-dot-ring: rgba(255, 255, 255, 0.15);
    --dk-timeline-icon-bg: rgba(255, 255, 255, 0.1);
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
    animation: dk-reveal 0.01s 1s forwards;
  }

  @keyframes dk-reveal {
    to { opacity: 1; }
  }

  ${reducedMotion}
  ${dkLinkReset}
`;
