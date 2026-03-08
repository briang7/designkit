import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { contactBaseStyles } from './dk-section-contact.styles.js';

const darkStyles = css`
  :host {
    background: var(--dk-color-dark-bg, #111827);
  }

  h2 {
    color: #ffffff;
  }

  .subheadline {
    color: var(--dk-color-dark-text-muted, #9ca3af);
  }

  .dark-form {
    max-width: 600px;
    margin: 0 auto;
  }

  label {
    color: var(--dk-color-dark-text, #f3f4f6);
  }

  input,
  textarea {
    background: var(--dk-color-dark-surface, #1f2937);
    border-color: var(--dk-color-dark-border, #374151);
    color: #ffffff;
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--dk-color-dark-text-muted, #9ca3af);
  }

  input:focus,
  textarea:focus {
    border-color: var(--dk-color-primary, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

@customElement('dk-section-contact-dark')
export class DkSectionContactDark extends DkSectionElement {
  static override styles = [contactBaseStyles, darkStyles];

  @property() headline = '';
  @property() subheadline = '';

  protected override onEnterViewport() {
    const form = this.shadowRoot?.querySelector('.dark-form');
    if (form) this.animateEntrance([form]);
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
          <div class="dark-form animate-target">
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
                Subject
                <input type="text" name="subject" placeholder="How can we help?" part="input" />
              </label>
              <label part="label">
                Message
                <textarea name="message" placeholder="Tell us more..." required part="textarea"></textarea>
              </label>
              <button class="submit-btn" type="submit" part="button">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-contact-dark': DkSectionContactDark;
  }
}
