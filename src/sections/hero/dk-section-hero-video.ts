import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { heroBaseStyles } from './dk-section-hero.styles.js';
import { applyContrastTokens } from '../../core/contrast.js';

const videoStyles = css`
  :host {
    position: relative;
    min-height: var(--dk-hero-video-min-height, 100vh);
    display: flex !important;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 !important;

  }

  .video-wrapper {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: var(--dk-hero-video-overlay, rgba(0, 0, 0, 0.55));
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--dk-section-padding-x, 1.5rem);
  }

  h1 {
    color: var(--dk-hero-video-text-color, #ffffff);
  }

  .subheadline {
    color: var(--dk-hero-video-subtext-color, rgba(255, 255, 255, 0.85));
    max-width: 640px;
  }

  .badge {
    color: var(--dk-hero-video-badge-color, #ffffff);
    background: var(--dk-hero-video-badge-bg, rgba(255, 255, 255, 0.15));
    border-color: var(--dk-hero-video-badge-border, rgba(255, 255, 255, 0.25));
  }

  .cta-group {
    justify-content: center;
  }
`;

@customElement('dk-section-hero-video')
export class DkSectionHeroVideo extends DkSectionElement {
  static override styles = [heroBaseStyles, videoStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property() badge = '';
  @property({ attribute: 'video-src' }) videoSrc = '';

  override async firstUpdated() {
    await applyContrastTokens(this);
  }

  protected override onEnterViewport() {
    const els = [
      this.shadowRoot?.querySelector('.badge'),
      this.shadowRoot?.querySelector('h1'),
      this.shadowRoot?.querySelector('.subheadline'),
      this.shadowRoot?.querySelector('.cta-group'),
    ].filter(Boolean) as Element[];
    this.animateEntrance(els);
  }

  override render() {
    return html`
      <section part="section">
        <div class="video-wrapper">
          <video
            part="video"
            autoplay
            muted
            loop
            playsinline
            .src=${this.videoSrc}
          ></video>
        </div>
        <div class="overlay" part="overlay"></div>
        <div class="container">
          ${this.badge
            ? html`<span class="badge animate-target" part="badge">${this.badge}</span>`
            : nothing}
          <h1 class="animate-target" part="headline">${this.headline}</h1>
          ${this.subheadline
            ? html`<p class="subheadline animate-target" part="subheadline">${this.subheadline}</p>`
            : nothing}
          <div class="cta-group animate-target" part="cta-group">
            <slot name="cta-primary"></slot>
            <slot name="cta-secondary"></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-hero-video': DkSectionHeroVideo;
  }
}
