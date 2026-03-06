import { property } from 'lit/decorators.js';
import { DkElement } from './dk-element.js';
import { ScrollObserver } from './scroll-observer.js';
import { dkStagger } from './motion.js';

export class DkSectionElement extends DkElement {
  @property({ type: Boolean, attribute: 'no-animate' }) noAnimate = false;
  @property({ type: String, attribute: 'bg' }) bg: 'primary' | 'alt' | 'brand' | 'dark' = 'primary';

  private scrollObserver?: ScrollObserver;

  protected animateEntrance(els: Element[]) {
    if (this.noAnimate) return;
    dkStagger(
      els,
      { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
      { duration: 0.6, staggerDelay: 0.05 }
    );
  }

  override connectedCallback() {
    super.connectedCallback();
    if (!this.noAnimate) {
      this.scrollObserver = new ScrollObserver();
      this.scrollObserver.observe(this, () => this.onEnterViewport());
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.scrollObserver?.disconnect();
  }

  protected onEnterViewport() {
    // Override in subclasses to trigger entrance animations
  }
}
