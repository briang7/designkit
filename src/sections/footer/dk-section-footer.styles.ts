import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const footerBaseStyles = css`
  :host {
    display: block;
    padding: var(--dk-section-padding-y, 3rem) var(--dk-section-padding-x, 1.5rem);
    background: var(--dk-footer-bg, var(--dk-color-surface-alt, #f9fafb));
    border-top: 1px solid var(--dk-color-border, #e5e7eb);
  }

  .container {
    max-width: var(--dk-section-max-width, 1200px);
    margin: 0 auto;
  }

  .brand-name {
    font-size: var(--dk-text-lg, 1.125rem);
    font-weight: var(--dk-font-bold, 700);
    color: var(--dk-color-text, #111827);
    margin: 0 0 var(--dk-space-2, 0.5rem);
  }

  .description {
    font-size: var(--dk-text-sm, 0.875rem);
    color: var(--dk-color-text-muted, #6b7280);
    line-height: var(--dk-leading-relaxed, 1.6);
    margin: 0;
    max-width: 320px;
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: var(--dk-space-6, 1.5rem);
    margin-top: var(--dk-space-6, 1.5rem);
    border-top: 1px solid var(--dk-color-border, #e5e7eb);
    flex-wrap: wrap;
    gap: var(--dk-space-4, 1rem);
  }

  .social-row {
    display: flex;
    gap: var(--dk-space-3, 0.75rem);
    align-items: center;
  }

  .copyright {
    font-size: var(--dk-text-xs, 0.75rem);
    color: var(--dk-color-text-muted, #9ca3af);
    margin: 0;
  }

  ${reducedMotion}
`;
