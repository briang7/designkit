import { css } from 'lit';

export const fadeIn = css`
  @keyframes dk-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const fadeOut = css`
  @keyframes dk-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

export const slideInRight = css`
  @keyframes dk-slide-in-right {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

export const slideInLeft = css`
  @keyframes dk-slide-in-left {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
`;

export const slideInUp = css`
  @keyframes dk-slide-in-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
`;

export const slideInDown = css`
  @keyframes dk-slide-in-down {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const scaleIn = css`
  @keyframes dk-scale-in {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

export const checkmark = css`
  @keyframes dk-checkmark {
    0% { stroke-dashoffset: 20; }
    100% { stroke-dashoffset: 0; }
  }
`;

export const spin = css`
  @keyframes dk-spin {
    to { transform: rotate(360deg); }
  }
`;

export const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
