import { animate } from 'motion';
import type { AnimationOptions } from 'motion';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function applyFinalValues(el: Element, keyframes: Record<string, any>) {
  Object.entries(keyframes).forEach(([prop, value]) => {
    const finalValue = Array.isArray(value) ? value[value.length - 1] : value;
    (el as HTMLElement).style.setProperty(prop, String(finalValue));
  });
}

export function dkAnimate(
  el: Element,
  keyframes: Record<string, any>,
  options: AnimationOptions = {}
) {
  if (prefersReducedMotion()) {
    applyFinalValues(el, keyframes);
    return;
  }
  try {
    return animate(el, keyframes, {
      duration: 0.25,
      ...options,
    });
  } catch {
    applyFinalValues(el, keyframes);
  }
}

export function dkSpring(
  el: Element,
  keyframes: Record<string, any>,
  options: Partial<{ stiffness: number; damping: number; mass: number }> = {}
) {
  if (prefersReducedMotion()) {
    applyFinalValues(el, keyframes);
    return;
  }
  try {
    return animate(el, keyframes, {
      type: 'spring',
      stiffness: options.stiffness ?? 300,
      damping: options.damping ?? 24,
      mass: options.mass ?? 1,
    });
  } catch {
    applyFinalValues(el, keyframes);
  }
}

export function dkStagger(
  els: Element[],
  keyframes: Record<string, any>,
  options: AnimationOptions & { staggerDelay?: number } = {}
) {
  const { staggerDelay = 0.05, ...animOptions } = options;
  if (prefersReducedMotion()) return;
  try {
    return els.map((el, i) =>
      animate(el, keyframes, {
        duration: 0.4,
        delay: i * staggerDelay,
        ...animOptions,
      })
    );
  } catch {
    // graceful degradation in environments without full DOM animation support
  }
}
