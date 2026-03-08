const CONTRAST_TOKENS = [
  '--dk-color-text',
  '--dk-color-surface',
  '--dk-color-ghost-hover-text',
  '--dk-color-border',
  '--dk-color-border-hover',
] as const;

/**
 * Samples the effective background color of an element and sets
 * button design tokens for proper contrast on dark or light surfaces.
 *
 * Skips any token the user has explicitly set via an inline style
 * attribute on the host element, so manual overrides always win.
 *
 * Returns a promise that resolves after tokens are applied.
 */
export async function applyContrastTokens(host: HTMLElement): Promise<void> {
  // Wait for next frame so computed styles are available
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  // Check which tokens the user has already set via stylesheets
  const userSet = new Set<string>();
  for (const token of CONTRAST_TOKENS) {
    if (hasUserOverride(host, token)) {
      userSet.add(token);
    }
  }

  const bg = getEffectiveBackground(host);
  if (!bg) return;

  const dark = isDark(bg);
  const darkTokens: Record<string, string> = {
    '--dk-color-text': '#ffffff',
    '--dk-color-surface': 'rgba(255, 255, 255, 0.9)',
    '--dk-color-ghost-hover-text': '#111827',
    '--dk-color-border': 'rgba(255, 255, 255, 0.25)',
    '--dk-color-border-hover': 'rgba(255, 255, 255, 0.4)',
  };

  for (const token of CONTRAST_TOKENS) {
    // Never overwrite user-set values
    if (userSet.has(token)) continue;

    if (dark) {
      host.style.setProperty(token, darkTokens[token]);
    } else {
      host.style.removeProperty(token);
    }
  }
}

/**
 * Check if a CSS custom property is explicitly set on the host by the user
 * via an inline style attribute. Theme-level tokens inherited from :root
 * are NOT considered user overrides — only direct inline styles count.
 */
function hasUserOverride(host: HTMLElement, token: string): boolean {
  const attr = host.getAttribute('style') || '';
  return attr.includes(token);
}

/**
 * Walk up the DOM to find the first non-transparent background color.
 * Also checks the element's own shadow root children for overlay divs.
 */
function getEffectiveBackground(el: HTMLElement): [number, number, number] | null {
  const shadow = el.shadowRoot;
  if (shadow) {
    const overlays = shadow.querySelectorAll('.overlay, .gradient-bg, .bg-image') as NodeListOf<HTMLElement>;
    for (const overlay of overlays) {
      const bg = parseBackground(getComputedStyle(overlay).backgroundColor);
      if (bg) return bg;
      const bgImage = getComputedStyle(overlay).backgroundImage;
      if (bgImage && bgImage !== 'none') {
        const colors = extractGradientColors(bgImage);
        if (colors.length > 0) {
          return averageColors(colors);
        }
      }
    }
  }

  let current: HTMLElement | null = el;
  while (current) {
    const style = getComputedStyle(current);
    const bg = parseBackground(style.backgroundColor);
    if (bg) return bg;
    current = current.parentElement;
  }
  return null;
}

function parseBackground(bg: string): [number, number, number] | null {
  if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') return null;
  const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  const alphaMatch = bg.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/);
  if (alphaMatch && parseFloat(alphaMatch[1]) < 0.3) return null;
  return [r, g, b];
}

function extractGradientColors(gradient: string): [number, number, number][] {
  const colors: [number, number, number][] = [];
  const re = /rgb(a?)\((\d+),\s*(\d+),\s*(\d+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(gradient)) !== null) {
    colors.push([Number(m[2]), Number(m[3]), Number(m[4])]);
  }
  return colors;
}

function averageColors(colors: [number, number, number][]): [number, number, number] {
  const sum = colors.reduce(
    (acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]] as [number, number, number],
    [0, 0, 0] as [number, number, number]
  );
  return [
    Math.round(sum[0] / colors.length),
    Math.round(sum[1] / colors.length),
    Math.round(sum[2] / colors.length),
  ];
}

/**
 * Relative luminance check per WCAG 2.0.
 * Returns true if the color is "dark" (needs light text).
 */
function isDark([r, g, b]: [number, number, number]): boolean {
  const lin = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
  return luminance < 0.4;
}
