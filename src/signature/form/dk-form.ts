import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';
import { formStyles } from './dk-form.styles.js';

@customElement('dk-form')
export class DkForm extends DkElement {
  static override styles = formStyles;

  @state() private values: Record<string, unknown> = {};
  @state() private errors: Record<string, string> = {};
  @property({ type: Boolean }) submitted = false;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('dk-change', this.handleFieldChange as EventListener);
    this.addEventListener('dk-input', this.handleFieldInput as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dk-change', this.handleFieldChange as EventListener);
    this.removeEventListener('dk-input', this.handleFieldInput as EventListener);
  }

  private handleFieldChange = (e: CustomEvent) => {
    const target = e.target as HTMLElement;
    const name = target.getAttribute('name');
    if (!name) return;
    this.values = { ...this.values, [name]: e.detail.value ?? e.detail.checked };
    if (this.submitted) {
      this.validateField(name, target);
    }
  };

  private handleFieldInput = (e: CustomEvent) => {
    const target = e.target as HTMLElement;
    const name = target.getAttribute('name');
    if (!name) return;
    this.values = { ...this.values, [name]: e.detail.value };
  };

  private validateField(name: string, el: HTMLElement): boolean {
    const required = el.hasAttribute('required');
    const minlength = el.getAttribute('minlength');
    const maxlength = el.getAttribute('maxlength');
    const pattern = el.getAttribute('pattern');
    const type = el.getAttribute('type');
    const value = String(this.values[name] ?? '');
    const errors = { ...this.errors };

    if (required && !value) {
      errors[name] = 'This field is required';
    } else if (minlength && value.length < Number(minlength)) {
      errors[name] = `Minimum ${minlength} characters`;
    } else if (maxlength && value.length > Number(maxlength)) {
      errors[name] = `Maximum ${maxlength} characters`;
    } else if (pattern && !new RegExp(pattern).test(value)) {
      errors[name] = 'Invalid format';
    } else if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[name] = 'Invalid email address';
    } else {
      delete errors[name];
    }

    this.errors = errors;
    return !errors[name];
  }

  validate(): boolean {
    const fields = this.querySelectorAll('[name]');
    let valid = true;
    fields.forEach((field) => {
      const name = field.getAttribute('name')!;
      if (!this.validateField(name, field as HTMLElement)) valid = false;
    });
    return valid;
  }

  reset() {
    this.values = {};
    this.errors = {};
    this.submitted = false;
    this.querySelectorAll('[name]').forEach((field) => {
      (field as any).value = '';
      (field as any).checked = false;
    });
  }

  getValues(): Record<string, unknown> {
    return { ...this.values };
  }

  getErrors(): Record<string, string> {
    return { ...this.errors };
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault();
    this.submitted = true;
    const valid = this.validate();
    this.emitEvent('dk-submit', { values: { ...this.values }, valid });
  };

  override render() {
    return html`
      <form @submit=${this.handleSubmit} novalidate part="form">
        <slot></slot>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-form': DkForm;
  }
}
