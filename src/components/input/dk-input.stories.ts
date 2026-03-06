import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-input.js';

const meta: Meta = {
  title: 'Components/Input',
  component: 'dk-input',
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    clearable: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helpText: { control: 'text' },
    errorText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { label: 'Email', placeholder: 'you@example.com' },
  render: (args) => html`
    <dk-input label=${args.label} placeholder=${args.placeholder} size=${args.size} ?disabled=${args.disabled} ?required=${args.required} ?clearable=${args.clearable}></dk-input>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
      <dk-input label="Full Name" placeholder="John Doe"></dk-input>
      <dk-input label="Email" type="email" placeholder="john@example.com" required></dk-input>
      <dk-input label="Password" type="password" placeholder="••••••••"></dk-input>
    </div>
  `,
};

export const Validation: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
      <dk-input label="Email" error-text="Please enter a valid email" value="invalid"></dk-input>
      <dk-input label="Username" help-text="Must be 3-20 characters"></dk-input>
    </div>
  `,
};

export const Clearable: Story = {
  render: () => html`
    <dk-input label="Search" placeholder="Type to search..." clearable value="hello" style="max-width: 320px;"></dk-input>
  `,
};

export const WithPrefixSuffix: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
      <dk-input label="Price" placeholder="0.00">
        <span slot="prefix">$</span>
      </dk-input>
      <dk-input label="Website" placeholder="example.com">
        <span slot="prefix">https://</span>
      </dk-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
      <dk-input size="sm" placeholder="Small"></dk-input>
      <dk-input size="md" placeholder="Medium"></dk-input>
      <dk-input size="lg" placeholder="Large"></dk-input>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <dk-input label="Disabled Input" value="Cannot edit" disabled style="max-width: 320px;"></dk-input>
  `,
};
