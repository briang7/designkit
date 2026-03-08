import { LitElement, html, css, nothing } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';

export interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
}

const styles = css`
  :host {
    display: contents;
  }

  /* Lightbox backdrop */
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.92);
    animation: lb-backdrop-in 0.3s ease both;
    -webkit-tap-highlight-color: transparent;
  }

  .lightbox.closing {
    animation: lb-backdrop-out 0.25s ease forwards;
  }

  @keyframes lb-backdrop-in {
    from { background: rgba(0, 0, 0, 0); }
    to { background: rgba(0, 0, 0, 0.92); }
  }

  @keyframes lb-backdrop-out {
    from { background: rgba(0, 0, 0, 0.92); }
    to { background: rgba(0, 0, 0, 0); }
  }

  /* Close button */
  .lightbox-close {
    position: absolute;
    top: var(--dk-space-4, 1rem);
    right: var(--dk-space-4, 1rem);
    background: none;
    border: none;
    color: #ffffff;
    font-size: 2rem;
    cursor: pointer;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    opacity: 0;
    animation: lb-fade-in 0.3s 0.15s ease forwards;
    transition: transform 0.15s ease;
  }

  .lightbox-close:hover {
    transform: scale(1.15);
  }

  /* Image stage */
  .lightbox-stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lightbox-img {
    max-width: calc(100vw - 8rem);
    max-height: calc(100vh - 8rem);
    border-radius: var(--dk-radius-lg, 0.75rem);
    user-select: none;
    -webkit-user-drag: none;
    touch-action: none;
  }

  .lightbox-img-next {
    position: absolute;
    max-width: calc(100vw - 8rem);
    max-height: calc(100vh - 8rem);
    border-radius: var(--dk-radius-lg, 0.75rem);
    user-select: none;
    pointer-events: none;
    opacity: 0;
  }

  .lightbox.closing .lightbox-img {
    animation: lb-img-out 0.25s ease forwards;
  }

  @keyframes lb-img-out {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.95); }
  }

  /* Caption */
  .lightbox-caption {
    position: absolute;
    bottom: var(--dk-space-6, 1.5rem);
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    text-align: center;
    max-width: 600px;
    transition: opacity 0.2s ease;
  }

  /* Counter */
  .lightbox-counter {
    position: absolute;
    top: var(--dk-space-4, 1rem);
    left: var(--dk-space-4, 1rem);
    color: rgba(255, 255, 255, 0.6);
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-text-sm, 0.875rem);
    opacity: 0;
    animation: lb-fade-in 0.3s 0.15s ease forwards;
  }

  @keyframes lb-fade-in {
    to { opacity: 1; }
  }

  /* Nav buttons */
  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    font-size: 1.5rem;
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: var(--dk-radius-full, 9999px);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, transform 0.2s ease;
    opacity: 0;
    animation: lb-fade-in 0.3s 0.2s ease forwards;
  }

  .lightbox-nav:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-50%) scale(1.08);
  }

  .lightbox-nav:active {
    transform: translateY(-50%) scale(0.95);
  }

  .lightbox-prev { left: var(--dk-space-4, 1rem); }
  .lightbox-next { right: var(--dk-space-4, 1rem); }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .lightbox,
    .lightbox-img,
    .lightbox-close,
    .lightbox-caption,
    .lightbox-counter,
    .lightbox-nav {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

@customElement('dk-lightbox')
export class DkLightbox extends LitElement {
  static override styles = [styles];

  @state() private _open = false;
  @state() private _index = 0;
  @state() private _closing = false;

  @query('.lightbox-img') private _imgEl!: HTMLElement;

  private _images: LightboxImage[] = [];
  private _transitioning = false;

  // --- Public API ---

  open(images: LightboxImage[], startIndex = 0) {
    this._images = images;
    this._index = startIndex;
    this._open = true;
    this._closing = false;
    document.body.style.overflow = 'hidden';
    this._addGlobalListeners();

    this.updateComplete.then(() => {
      this._animateImgIn();
    });
  }

  close() {
    this._closeLightbox();
  }

  get isOpen() {
    return this._open;
  }

  // --- Lifecycle ---

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._removeGlobalListeners();
  }

  // --- Keyboard ---

  private _addGlobalListeners() {
    document.addEventListener('keydown', this._handleKeydown);
  }

  private _removeGlobalListeners() {
    document.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (!this._open || this._closing) return;
    if (e.key === 'Escape') this._closeLightbox();
    if (e.key === 'ArrowRight') this._next();
    if (e.key === 'ArrowLeft') this._prev();
  };

  // --- Close ---

  private _handleBackdropClick = () => {
    if (this._pointerSwiping) {
      this._pointerSwiping = false;
      return;
    }
    this._closeLightbox();
  };

  private _closeLightbox() {
    this._closing = true;
    this._removeGlobalListeners();
    setTimeout(() => {
      this._open = false;
      this._closing = false;
      document.body.style.overflow = '';
      this.dispatchEvent(new CustomEvent('dk-lightbox-close', { bubbles: true, composed: true }));
    }, 250);
  }

  // --- Image scaling ---

  private _handleImgLoad = (e: Event) => {
    this._scaleImg(e.target as HTMLImageElement);
  };

  private _scaleImg(img: HTMLImageElement) {
    const maxW = window.innerWidth - 128;
    const maxH = window.innerHeight - 128;
    const natW = img.naturalWidth;
    const natH = img.naturalHeight;
    if (!natW || !natH) return;
    const scale = Math.min(maxW / natW, maxH / natH);
    img.style.width = `${Math.round(natW * scale)}px`;
    img.style.height = `${Math.round(natH * scale)}px`;
  }

  // --- Animations ---

  private _animateImgIn() {
    const img = this._imgEl;
    if (!img) return;
    img.animate(
      [
        { opacity: 0, transform: 'scale(0.92)' },
        { opacity: 1, transform: 'scale(1)' },
      ],
      { duration: 300, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' }
    );
  }

  private _crossfadeTo(newIndex: number) {
    if (this._images.length <= 1 || this._transitioning) return;
    this._transitioning = true;

    const currentImg = this.shadowRoot?.querySelector('.lightbox-img') as HTMLElement;
    const nextImg = this.shadowRoot?.querySelector('.lightbox-img-next') as HTMLElement;

    if (!currentImg || !nextImg) {
      this._index = newIndex;
      this._transitioning = false;
      return;
    }

    const target = this._images[newIndex];
    const nextImgEl = nextImg as HTMLImageElement;
    nextImgEl.src = target.src;
    nextImgEl.alt = target.alt;

    if (nextImgEl.naturalWidth) {
      this._scaleImg(nextImgEl);
    } else {
      nextImgEl.onload = () => this._scaleImg(nextImgEl);
    }

    currentImg.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 300, easing: 'ease', fill: 'forwards' }
    );

    const fadeIn = nextImg.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 300, easing: 'ease', fill: 'forwards' }
    );

    fadeIn.onfinish = () => {
      const curImgEl = currentImg as HTMLImageElement;
      curImgEl.src = target.src;
      curImgEl.alt = target.alt;
      this._scaleImg(curImgEl);
      currentImg.getAnimations().forEach(a => a.cancel());
      currentImg.style.opacity = '1';
      nextImg.getAnimations().forEach(a => a.cancel());
      nextImg.style.opacity = '0';

      this._index = newIndex;
      this._transitioning = false;
    };
  }

  // --- Navigation ---

  private _prev() {
    const newIndex = (this._index - 1 + this._images.length) % this._images.length;
    this._crossfadeTo(newIndex);
  }

  private _next() {
    const newIndex = (this._index + 1) % this._images.length;
    this._crossfadeTo(newIndex);
  }

  // --- Pointer (swipe/drag) ---

  private _pointerStartX = 0;
  private _pointerStartY = 0;
  private _pointerSwiping = false;
  private _pointerDown = false;

  private _handlePointerDown = (e: PointerEvent) => {
    this._pointerStartX = e.clientX;
    this._pointerStartY = e.clientY;
    this._pointerSwiping = false;
    this._pointerDown = true;
  };

  private _handlePointerMove = (e: PointerEvent) => {
    if (!this._pointerDown) return;
    const dx = e.clientX - this._pointerStartX;
    const dy = e.clientY - this._pointerStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      this._pointerSwiping = true;
    }
  };

  private _handlePointerUp = (e: PointerEvent) => {
    if (!this._pointerDown) return;
    this._pointerDown = false;
    if (!this._pointerSwiping) return;
    const dx = e.clientX - this._pointerStartX;
    const threshold = 50;
    if (dx < -threshold) {
      this._next();
    } else if (dx > threshold) {
      this._prev();
    }
    this._pointerSwiping = false;
  };

  // --- Wheel ---

  private _wheelDebounce?: number;

  private _handleLightboxWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 10) return;

    if (this._wheelDebounce) return;
    this._wheelDebounce = window.setTimeout(() => {
      this._wheelDebounce = undefined;
    }, 400);

    if (delta > 0) {
      this._next();
    } else {
      this._prev();
    }
  };

  // --- Render ---

  override render() {
    if (!this._open || this._images.length === 0) return nothing;
    const img = this._images[this._index];
    return html`
      <div
        class="lightbox ${this._closing ? 'closing' : ''}"
        part="lightbox"
        @click=${this._handleBackdropClick}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @wheel=${this._handleLightboxWheel}
      >
        <button class="lightbox-close" @click=${() => this._closeLightbox()} aria-label="Close">&times;</button>

        ${this._images.length > 1
          ? html`<div class="lightbox-counter">${this._index + 1} / ${this._images.length}</div>`
          : nothing}

        ${this._images.length > 1
          ? html`
              <button class="lightbox-nav lightbox-prev" @click=${(e: Event) => { e.stopPropagation(); this._prev(); }} aria-label="Previous">&#8249;</button>
              <button class="lightbox-nav lightbox-next" @click=${(e: Event) => { e.stopPropagation(); this._next(); }} aria-label="Next">&#8250;</button>
            `
          : nothing}

        <div class="lightbox-stage" @click=${(e: Event) => e.stopPropagation()}>
          <img class="lightbox-img-next" alt="" />
          <img class="lightbox-img" src=${img.src} alt=${img.alt} @load=${this._handleImgLoad} />
        </div>

        ${img.caption ? html`<div class="lightbox-caption">${img.caption}</div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-lightbox': DkLightbox;
  }
}
