import { css } from 'lit';
import { reducedMotion } from '../../core/animations.js';

export const avatarStyles = css`
  :host {
    display: inline-block;
  }

  .avatar {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--dk-color-primary-light);
    color: var(--dk-color-primary);
    font-family: var(--dk-font-sans);
    font-weight: var(--dk-font-semibold);
    overflow: hidden;
    flex-shrink: 0;
  }

  .avatar.sm {
    width: 32px;
    height: 32px;
    font-size: var(--dk-text-xs);
  }

  .avatar.md {
    width: 40px;
    height: 40px;
    font-size: var(--dk-text-sm);
  }

  .avatar.lg {
    width: 56px;
    height: 56px;
    font-size: var(--dk-text-lg);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .initials {
    text-transform: uppercase;
    user-select: none;
  }

  .status {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--dk-color-bg, #fff);
  }

  .avatar.sm .status {
    width: 8px;
    height: 8px;
  }

  .avatar.lg .status {
    width: 14px;
    height: 14px;
    border-width: 3px;
  }

  .status.online {
    background: var(--dk-color-success);
  }

  .status.offline {
    background: var(--dk-gray-400);
  }

  .status.away {
    background: var(--dk-color-warning);
  }

  ${reducedMotion}
`;
