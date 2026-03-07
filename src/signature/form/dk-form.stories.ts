import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-form.js';
import '../../components/input/dk-input.js';
import '../../components/button/dk-button.js';

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
