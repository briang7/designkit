import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';
import { dkLinkReset } from '../../core/dk-element.js';

export const newsletterBaseStyles = css`
  :host {
    display: block;
    padding: var(--dk-section-padding-y, 5rem) var(--dk-section-padding-x, 1.5rem) !important;
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
    font-size: var(--dk-font-size-base, 1rem);
    line-height: var(--dk-leading-relaxed, 1.6);
    color: var(--dk-color-text-muted, #6b7280);
    margin: 0;
  }

  :host([bg="brand"]) h2,
  :host([bg="dark"]) h2 {
    color: #ffffff;
  }

  :host([bg="brand"]) .description,
  :host([bg="dark"]) .description {
    color: rgba(255, 255, 255, 0.9);
  }

  .form {
    display: flex;
    gap: var(--dk-space-3, 0.75rem);
  }

  .email-input {
    flex: 1;
    padding: var(--dk-space-3, 0.75rem) var(--dk-space-4, 1rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-lg, 0.75rem);
    background: var(--dk-color-surface, #ffffff);
    color: var(--dk-color-text, #111827);
    outline: none;
    transition: border-color 0.15s ease;
    min-width: 0;
  }

  .email-input:focus {
    border-color: var(--dk-color-primary, #3b82f6);
    box-shadow: 0 0 0 3px var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1));
  }

  .submit-btn {
    padding: var(--dk-space-3, 0.75rem) var(--dk-space-6, 1.5rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    font-weight: var(--dk-font-semibold, 600);
    background: var(--dk-color-primary, #3b82f6);
    color: #ffffff;
    border: none;
    border-radius: var(--dk-radius-lg, 0.75rem);
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease;
  }

  .submit-btn:hover {
    background: var(--dk-color-primary-hover, #2563eb);
  }

  .animate-target {
    opacity: 0;
    animation: dk-reveal 0.01s 1s forwards;
  }

  @keyframes dk-reveal {
    to { opacity: 1; }
  }

  @media (max-width: 768px) {
    .form {
      flex-direction: column;
    }
  }

  ${reducedMotion}
  ${dkLinkReset}
`;
