import { css } from 'lit';

export const skeletonStyles = css`
  :host {
    display: block;
  }

  .skeleton {
    background: var(--dk-skeleton-base);
    background-image: linear-gradient(
      90deg,
      var(--dk-skeleton-base) 0%,
      var(--dk-skeleton-shine) 50%,
      var(--dk-skeleton-base) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite ease-in-out;
    border-radius: var(--dk-radius-md);
  }

  .skeleton--text {
    height: 1em;
    margin-bottom: 0.5em;
    border-radius: var(--dk-radius-sm);
  }

  .skeleton--text:last-child {
    width: 70%;
  }

  .skeleton--circle {
    border-radius: 50%;
  }

  .skeleton--rect {
    border-radius: var(--dk-radius-md);
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton {
      animation: none;
    }
  }
`;
