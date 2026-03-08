import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-form.js';
import '../../components/input/dk-input.js';
import '../../components/button/dk-button.js';
import '../../components/checkbox/dk-checkbox.js';
import '../../components/switch/dk-switch.js';
import '../../components/select/dk-select.js';

const meta: Meta = {
  title: 'Signature/Form',
  component: 'dk-form',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <dk-form @dk-submit=${(e: CustomEvent) => console.log('Form submitted:', e.detail)}>
      <dk-input label="Full Name" name="name" type="text"></dk-input>
      <dk-input label="Email Address" name="email" type="email"></dk-input>
      <dk-input label="Password" name="password" type="password"></dk-input>
      <dk-input label="Message" name="message" type="text"></dk-input>
      <dk-button type="submit" variant="primary">Create Account</dk-button>
    </dk-form>
  `,
};

export const WithValidation: Story = {
  render: () => html`
    <dk-form @dk-submit=${(e: CustomEvent) => console.log('Form submitted:', e.detail)}>
      <dk-input
        label="Username"
        name="username"
        type="text"
        required
        minlength=${3}
        maxlength=${20}
        pattern="^[a-zA-Z0-9_]+$"
      ></dk-input>
      <dk-input
        label="Email"
        name="email"
        type="email"
        required
      ></dk-input>
      <dk-input
        label="Password"
        name="password"
        type="password"
        required
        minlength=${8}
        maxlength=${64}
      ></dk-input>
      <dk-input
        label="Phone Number"
        name="phone"
        type="text"
        pattern="^[0-9+\\-\\s()]+$"
      ></dk-input>
      <dk-button type="submit" variant="primary">Sign Up</dk-button>
    </dk-form>
  `,
};

export const MixedFieldTypes: Story = {
  render: () => html`
    <dk-form @dk-submit=${(e: CustomEvent) => console.log('Form submitted:', e.detail)}>
      <dk-input label="Display Name" name="displayName" type="text" required></dk-input>
      <dk-input label="Email" name="email" type="email" required></dk-input>
      <dk-select label="Role" name="role">
        <option value="">Select a role...</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
      </dk-select>
      <dk-checkbox name="terms" label="I agree to the Terms of Service"></dk-checkbox>
      <dk-switch name="newsletter" label="Subscribe to newsletter"></dk-switch>
      <dk-button type="submit" variant="primary">Complete Profile</dk-button>
    </dk-form>
  `,
};

export const WithResetButton: Story = {
  render: () => html`
    <dk-form
      id="reset-demo-form"
      @dk-submit=${(e: CustomEvent) => {
        const output = document.getElementById('reset-form-output');
        if (output) output.textContent = e.detail.valid
          ? 'Submitted: ' + JSON.stringify(e.detail.values)
          : 'Validation failed — check fields above';
      }}
    >
      <dk-input label="First Name" name="firstName" type="text" required></dk-input>
      <dk-input label="Last Name" name="lastName" type="text" required></dk-input>
      <dk-input label="Email" name="email" type="email" required></dk-input>
      <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
        <dk-button type="submit" variant="primary">Submit</dk-button>
        <dk-button
          variant="outline"
          @click=${() => {
            const form = document.getElementById('reset-demo-form') as any;
            form?.reset();
            const output = document.getElementById('reset-form-output');
            if (output) output.textContent = 'Form has been reset';
          }}
        >Reset</dk-button>
      </div>
    </dk-form>
    <div id="reset-form-output" style="margin-top: 1rem; padding: 12px; border: 1px dashed var(--dk-color-border); border-radius: 8px; font-size: 14px; color: var(--dk-color-text-muted); min-height: 20px;">
      Fill out the form and submit, or click Reset to clear
    </div>
  `,
};

export const ValidationErrors: Story = {
  render: () => html`
    <p style="margin-bottom: 1rem; font-size: 14px; color: var(--dk-color-text-muted);">
      Click "Submit" with empty fields to trigger validation errors. Fix the errors and resubmit.
    </p>
    <dk-form
      id="errors-demo-form"
      @dk-submit=${(e: CustomEvent) => {
        const output = document.getElementById('errors-form-output');
        if (output) {
          if (e.detail.valid) {
            output.style.color = 'var(--dk-color-success)';
            output.textContent = 'All fields valid! Values: ' + JSON.stringify(e.detail.values);
          } else {
            const form = document.getElementById('errors-demo-form') as any;
            const errors = form?.getErrors() ?? {};
            output.style.color = 'var(--dk-color-danger)';
            output.textContent = 'Errors: ' + JSON.stringify(errors);
          }
        }
      }}
    >
      <dk-input label="Username" name="username" type="text" required minlength=${3}></dk-input>
      <dk-input label="Email" name="email" type="email" required></dk-input>
      <dk-input label="Password" name="password" type="password" required minlength=${8}></dk-input>
      <dk-input label="Website" name="website" type="text" pattern="^https?://.*"></dk-input>
      <dk-button type="submit" variant="primary">Submit</dk-button>
    </dk-form>
    <div id="errors-form-output" style="margin-top: 1rem; padding: 12px; border: 1px dashed var(--dk-color-border); border-radius: 8px; font-size: 14px; min-height: 20px;">
      Submit the form to see validation results
    </div>
  `,
};

export const GetValuesDemo: Story = {
  render: () => html`
    <dk-form id="getvalues-demo-form">
      <dk-input label="Name" name="name" type="text" value="Jane Doe"></dk-input>
      <dk-input label="Email" name="email" type="email" value="jane@example.com"></dk-input>
      <dk-checkbox name="premium" label="Premium account"></dk-checkbox>
      <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
        <dk-button
          variant="primary"
          @click=${() => {
            const form = document.getElementById('getvalues-demo-form') as any;
            const output = document.getElementById('getvalues-output');
            if (form && output) {
              output.textContent = 'getValues(): ' + JSON.stringify(form.getValues(), null, 2);
            }
          }}
        >Call getValues()</dk-button>
        <dk-button
          variant="outline"
          @click=${() => {
            const form = document.getElementById('getvalues-demo-form') as any;
            const output = document.getElementById('getvalues-output');
            if (form && output) {
              output.textContent = 'getErrors(): ' + JSON.stringify(form.getErrors(), null, 2);
            }
          }}
        >Call getErrors()</dk-button>
      </div>
    </dk-form>
    <pre id="getvalues-output" style="margin-top: 1rem; padding: 12px; border: 1px dashed var(--dk-color-border); border-radius: 8px; font-size: 13px; color: var(--dk-color-text-muted); min-height: 20px; white-space: pre-wrap;">
Click a button to inspect form state
    </pre>
  `,
};
