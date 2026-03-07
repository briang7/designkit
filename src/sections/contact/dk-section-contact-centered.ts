import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { contactBaseStyles } from './dk-section-contact.styles.js';

const centeredStyles = css`
  .card {
    max-width: 600px;
    margin: 0 auto;
    background: var(--dk-color-surface, #ffffff);
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-xl, 1rem);
    padding: var(--dk-space-10, 2.5rem);
  }

  .card h2 {
    text-align: center;
  }

  .card .subheadline {
    text-align: center;
    margin-bottom: var(--dk-space-8, 2rem);
  }
`;

@customElement('dk-section-contact-centered')
export class DkSectionContactCentered extends DkSectionElement {
  static override styles = [contactBaseStyles, centeredStyles];

  @property() headline = '';
  @property() subheadline = '';

  protected override onEnterViewport() {
    const card = this.shadowRoot?.querySelector('.card');
    if (card) this.animateEntrance([card]);
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
          <div class="card animate-target" part="card">
            ${this.headline ? html`<h2 part="headline">${this.headline}</h2>` : nothing}
            ${this.subheadline ? html`<p class="subheadline" part="subheadline">${this.subheadline}</p>` : nothing}
            <form class="form-group" @submit=${this._handleSubmit} part="form">
              <div class="form-row">
                <label part="label">
                  Name
                  <input type="text" name="name" placeholder="Your name" required part="input" />
                </label>
                <label part="label">
                  Email
                  <input type="email" name="email" placeholder="you@example.com" required part="input" />
                </label>
              </div>
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
    'dk-section-contact-centered': DkSectionContactCentered;
  }
}
