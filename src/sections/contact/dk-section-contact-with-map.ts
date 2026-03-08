import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { contactBaseStyles } from './dk-section-contact.styles.js';

const withMapStyles = css`
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dk-space-16, 4rem);
    align-items: start;
  }

  @media (max-width: 768px) {
    .layout {
      grid-template-columns: 1fr;
      gap: var(--dk-space-10, 2.5rem);
    }
  }

  .map-wrapper {
    border-radius: var(--dk-radius-lg, 0.75rem);
    overflow: hidden;
    min-height: 260px;
    background: var(--dk-color-neutral-100, #f3f4f6);
  }

  .map-wrapper ::slotted(*) {
    width: 100%;
    min-height: 260px;
    display: block;
  }

  .contact-details {
    display: flex;
    flex-direction: column;
    gap: var(--dk-space-4, 1rem);
    margin-top: var(--dk-space-6, 1.5rem);
  }

  .detail-item {
    display: flex;
    align-items: flex-start;
    gap: var(--dk-space-3, 0.75rem);
  }

  .detail-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: var(--dk-color-primary, #3b82f6);
    margin-top: 2px;
  }

  .detail-text {
    font-family: var(--dk-font-sans, system-ui, sans-serif);
    font-size: var(--dk-font-size-sm, 0.875rem);
    color: var(--dk-color-text, #111827);
    line-height: var(--dk-leading-relaxed, 1.6);
    margin: 0;
  }
`;

@customElement('dk-section-contact-with-map')
export class DkSectionContactWithMap extends DkSectionElement {
  static override styles = [contactBaseStyles, withMapStyles];

  @property() headline = '';
  @property() subheadline = '';
  @property() email = '';
  @property() phone = '';
  @property() address = '';

  protected override onEnterViewport() {
    const layout = this.shadowRoot?.querySelector('.layout');
    if (layout) this.animateEntrance([layout]);
  }

  private _handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const values: Record<string, string> = {};
    data.forEach((v, k) => { values[k] = v as string; });
    this.emitEvent('dk-contact-submit', values);
  }

  override render() {
    return html`
      <section part="section">
        <div class="container" part="container">
          ${this.headline || this.subheadline
            ? html`<div class="section-header animate-target" part="header">
                ${this.headline ? html`<h2 part="headline">${this.headline}</h2>` : nothing}
                ${this.subheadline ? html`<p class="subheadline" part="subheadline">${this.subheadline}</p>` : nothing}
              </div>`
            : nothing}
          <div class="layout animate-target" part="layout">
            <div class="form-col" part="form-col">
              <form class="form-group" @submit=${this._handleSubmit} part="form">
                <label part="label">
                  Name
                  <input type="text" name="name" placeholder="Your name" required part="input" />
                </label>
                <label part="label">
                  Email
                  <input type="email" name="email" placeholder="you@example.com" required part="input" />
                </label>
                <label part="label">
                  Message
                  <textarea name="message" placeholder="Tell us more..." required part="textarea"></textarea>
                </label>
                <button class="submit-btn" type="submit" part="button">Send Message</button>
              </form>
            </div>
            <div class="info-col" part="info-col">
              <div class="map-wrapper" part="map">
                <slot name="map"></slot>
              </div>
              <div class="contact-details" part="contact-details">
                ${this.email
                  ? html`<div class="detail-item">
                      <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <polyline points="22,4 12,13 2,4"></polyline>
                      </svg>
                      <p class="detail-text">${this.email}</p>
                    </div>`
                  : nothing}
                ${this.phone
                  ? html`<div class="detail-item">
                      <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path>
                      </svg>
                      <p class="detail-text">${this.phone}</p>
                    </div>`
                  : nothing}
                ${this.address
                  ? html`<div class="detail-item">
                      <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <p class="detail-text">${this.address}</p>
                    </div>`
                  : nothing}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-contact-with-map': DkSectionContactWithMap;
  }
}
