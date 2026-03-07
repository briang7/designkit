import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const contactBaseStyles = css`
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

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-4, 1rem);
    margin-bottom: var(--dk-space-6, 1.5rem);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dk-space-4, 1rem);
  }

  @media (max-width: 768px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }

  label {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    font-weight: var(--dk-font-medium, 500);
    color: var(--dk-color-text, #111827);
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-1, 0.25rem);
  }

  input,
  textarea {
    padding: var(--dk-space-3, 0.75rem) var(--dk-space-4, 1rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-lg, 0.75rem);
    background: var(--dk-color-surface, #ffffff);
    color: var(--dk-color-text, #111827);
    outline: none;
    transition: border-color 0.15s ease;
    resize: vertical;
  }

  input:focus,
  textarea:focus {
    border-color: var(--dk-color-primary, #3b82f6);
    box-shadow: 0 0 0 3px var(--dk-color-primary-subtle, rgba(59, 130, 246, 0.1));
  }

  textarea {
    min-height: 120px;
  }

  .submit-btn {
    padding: var(--dk-space-3, 0.75rem) var(--dk-space-8, 2rem);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    font-weight: var(--dk-font-semibold, 600);
    background: var(--dk-color-primary, #3b82f6);
    color: #ffffff;
    border: none;
    border-radius: var(--dk-radius-lg, 0.75rem);
    cursor: pointer;
    transition: background 0.15s ease;
    align-self: flex-start;
  }

  .submit-btn:hover {
    background: var(--dk-color-primary-hover, #2563eb);
  }

  .animate-target {
    opacity: 0;
  }

  ${reducedMotion}
`;
