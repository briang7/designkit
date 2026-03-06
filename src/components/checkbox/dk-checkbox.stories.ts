import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-checkbox.js';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'dk-checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`<dk-checkbox ?checked=${args.checked} ?indeterminate=${args.indeterminate} ?disabled=${args.disabled}>Accept terms</dk-checkbox>`,
};

export const Checked: Story = {
  render: () => html`<dk-checkbox checked>I agree</dk-checkbox>`,
};

export const Indeterminate: Story = {
  render: () => html`<dk-checkbox indeterminate>Select all</dk-checkbox>`,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <dk-checkbox disabled>Unchecked disabled</dk-checkbox>
      <dk-checkbox checked disabled>Checked disabled</dk-checkbox>
    </div>
  `,
};

export const Group: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <dk-checkbox checked>JavaScript</dk-checkbox>
      <dk-checkbox checked>TypeScript</dk-checkbox>
      <dk-checkbox>Rust</dk-checkbox>
      <dk-checkbox>Go</dk-checkbox>
    </div>
  `,
};
