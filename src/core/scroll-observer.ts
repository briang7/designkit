export class ScrollObserver {
  private observer: IntersectionObserver;
  private callbacks = new Map<Element, () => void>();

  constructor(options: IntersectionObserverInit = {}) {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = this.callbacks.get(entry.target);
            if (cb) {
              cb();
              this.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1, ...options }
    );
  }

  observe(el: Element, callback: () => void) {
    this.callbacks.set(el, callback);
    this.observer.observe(el);
  }

  unobserve(el: Element) {
    this.callbacks.delete(el);
    this.observer.unobserve(el);
  }

  disconnect() {
    this.observer.disconnect();
    this.callbacks.clear();
  }
}
