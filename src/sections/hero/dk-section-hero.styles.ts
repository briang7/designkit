import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const heroBaseStyles = css`
  :host {
    display: block;
    padding: var(--dk-section-padding-y, 5rem) var(--dk-section-padding-x, 1.5rem);
  }

  .container {
    max-width: var(--dk-section-max-width, 1200px);
    margin: 0 auto;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: var(--dk-space-1, 0.25rem) var(--dk-space-3, 0.75rem);
    font-size: var(--dk-text-xs, 0.75rem);
    font-weight: var(--dk-font-semibold, 600);
    color: var(--dk-color-primary, #3b82f6);
    background: var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1));
    border-radius: var(--dk-radius-full, 9999px);
    border: 1px solid var(--dk-color-primary-border, rgba(59, 130, 246, 0.2));
    margin-bottom: var(--dk-space-4, 1rem);
    letter-spacing: 0.02em;
  }

  h1 {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-display, clamp(2.5rem, 5vw, 4rem));
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
    margin: 0 0 var(--dk-space-8, 2rem);
  }

  .cta-group {
    display: flex;
    gap: var(--dk-space-3, 0.75rem);
    flex-wrap: wrap;
  }

  .animate-target {
    opacity: 0;
  }

  ${reducedMotion}
`;
