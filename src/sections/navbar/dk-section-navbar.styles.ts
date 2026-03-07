import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';
import { dkLinkReset } from '../../core/dk-element.js';

export const navbarBaseStyles = css`
  :host {
    display: block;
    height: var(--dk-navbar-height, 64px);
    z-index: var(--dk-z-sticky, 100);
  }

  :host([sticky]) {
    position: sticky;
    top: 0;
  }

  nav {
    display: flex;
    align-items: center;
    height: var(--dk-navbar-height, 64px);
    padding: 0 var(--dk-section-padding-x, 1.5rem);
    background: var(--dk-navbar-bg, var(--dk-color-surface, #fff));
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--dk-color-border, #e5e7eb);
  }

  :host([transparent]) nav {
    background: transparent;
    border-bottom-color: transparent;
  }

  .container {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: var(--dk-section-max-width, 1200px);
    margin: 0 auto;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: var(--dk-space-2, 0.5rem);
    font-size: var(--dk-text-lg, 1.125rem);
    font-weight: var(--dk-font-bold, 700);
    color: var(--dk-color-text, #111827);
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .links {
    display: flex;
    align-items: center;
    gap: var(--dk-space-2, 0.5rem);
    flex: 1;
    justify-content: center;
  }

  .links ::slotted(a) {
    padding: var(--dk-space-2, 0.5rem) var(--dk-space-3, 0.75rem);
    font-size: var(--dk-text-sm, 0.875rem);
    font-weight: var(--dk-font-medium, 500);
    color: var(--dk-color-text-muted, #6b7280);
    text-decoration: none;
    border-radius: var(--dk-radius-md, 0.375rem);
    transition: color var(--dk-transition-fast, 150ms),
                background var(--dk-transition-fast, 150ms);
  }

  .links ::slotted(a:hover) {
    color: var(--dk-color-text, #111827);
    background: var(--dk-color-surface-hover, #f3f4f6);
  }

  .cta {
    display: flex;
    align-items: center;
    gap: var(--dk-space-2, 0.5rem);
    flex-shrink: 0;
  }

  /* Hamburger button */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    gap: 5px;
    margin-left: auto;
    border-radius: var(--dk-radius-md, 0.375rem);
  }

  .hamburger:focus-visible {
    outline: none;
    box-shadow: var(--dk-focus-ring, 0 0 0 2px #3b82f6);
  }

  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--dk-color-text, #111827);
    border-radius: 1px;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform-origin: center;
  }

  .hamburger.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* Mobile menu */
  .mobile-menu {
    display: none;
    position: absolute;
    top: var(--dk-navbar-height, 64px);
    left: 0;
    right: 0;
    background: var(--dk-navbar-bg, var(--dk-color-surface, #fff));
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--dk-color-border, #e5e7eb);
    padding: var(--dk-space-4, 1rem) var(--dk-section-padding-x, 1.5rem);
    flex-direction: column;
    gap: var(--dk-space-2, 0.5rem);
    z-index: var(--dk-z-sticky, 100);
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease, padding 0.3s ease;
    padding-top: 0;
    padding-bottom: 0;
  }

  .mobile-menu.open {
    max-height: 500px;
    padding-top: var(--dk-space-4, 1rem);
    padding-bottom: var(--dk-space-4, 1rem);
  }

  .mobile-menu ::slotted(a) {
    display: block;
    padding: var(--dk-space-3, 0.75rem) var(--dk-space-4, 1rem);
    font-size: var(--dk-text-md, 1rem);
    color: var(--dk-color-text, #111827);
    text-decoration: none;
    border-radius: var(--dk-radius-md, 0.375rem);
  }

  .mobile-menu ::slotted(a:hover) {
    background: var(--dk-color-surface-hover, #f3f4f6);
  }

  .mobile-cta {
    margin-top: var(--dk-space-2, 0.5rem);
    padding-top: var(--dk-space-2, 0.5rem);
    border-top: 1px solid var(--dk-color-border, #e5e7eb);
  }

  @media (max-width: 768px) {
    .links,
    .cta {
      display: none;
    }

    .hamburger {
      display: flex;
    }

    .mobile-menu {
      display: flex;
    }
  }

  ${reducedMotion}
  ${dkLinkReset}
`;
