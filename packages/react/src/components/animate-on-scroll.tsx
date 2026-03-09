'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  selector?: string;
  stagger?: number;
  disabled?: boolean;
}

export function AnimateOnScroll({
  children,
  selector,
  stagger = 50,
  disabled = false,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const targets = selector
      ? Array.from(ref.current.querySelectorAll(selector))
      : Array.from(ref.current.children);

    targets.forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(20px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          targets.forEach((el, i) => {
            const htmlEl = el as HTMLElement;
            setTimeout(() => {
              htmlEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              htmlEl.style.opacity = '1';
              htmlEl.style.transform = 'translateY(0)';
            }, i * stagger);
          });
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [disabled, selector, stagger]);

  return <div ref={ref}>{children}</div>;
}
