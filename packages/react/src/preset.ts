const designkitPreset = {
  theme: {
    extend: {
      colors: {
        dk: {
          primary: 'var(--dk-color-primary, #2563eb)',
          'primary-hover': 'var(--dk-color-primary-hover, #1d4ed8)',
          'primary-light': 'var(--dk-color-primary-light, #eff6ff)',
          'primary-text': 'var(--dk-color-primary-text, #ffffff)',
          surface: 'var(--dk-color-surface, #f9fafb)',
          'surface-raised': 'var(--dk-color-surface-raised, #ffffff)',
          bg: 'var(--dk-color-bg, #ffffff)',
          text: 'var(--dk-color-text, #111827)',
          'text-muted': 'var(--dk-color-text-muted, #6b7280)',
          'text-inverse': 'var(--dk-color-text-inverse, #ffffff)',
          border: 'var(--dk-color-border, #e5e7eb)',
          'border-hover': 'var(--dk-color-border-hover, #d1d5db)',
          danger: 'var(--dk-color-danger, #dc2626)',
          'danger-light': 'var(--dk-color-danger-light, #fef2f2)',
          success: 'var(--dk-color-success, #16a34a)',
          'success-light': 'var(--dk-color-success-light, #f0fdf4)',
          warning: 'var(--dk-color-warning, #ca8a04)',
          'warning-light': 'var(--dk-color-warning-light, #fefce8)',
          overlay: 'var(--dk-color-overlay, rgb(0 0 0 / 0.5))',
        },
      },
      fontFamily: {
        'dk-sans': 'var(--dk-font-sans, system-ui, sans-serif)',
        'dk-display': 'var(--dk-font-display, var(--dk-font-sans, system-ui, sans-serif))',
        'dk-mono': 'var(--dk-font-mono, ui-monospace, monospace)',
      },
      maxWidth: {
        'dk-section': 'var(--dk-section-max-width, 1280px)',
      },
      zIndex: {
        'dk-sticky': '1100',
        'dk-overlay': '1300',
        'dk-modal': '1400',
        'dk-toast': '1500',
      },
    },
  },
};

export default designkitPreset;
export { designkitPreset };
