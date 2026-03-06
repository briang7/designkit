import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-switch.js';

const meta: Meta = {
  title: 'Components/Switch',
  component: 'dk-switch',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`<dk-switch ?checked=${args.checked} ?disabled=${args.disabled} size=${args.size}>Dark mode</dk-switch>`,
};

export const Checked: Story = {
  render: () => html`<dk-switch checked>Enabled</dk-switch>`,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <dk-switch size="sm">Small</dk-switch>
      <dk-switch size="md">Medium</dk-switch>
      <dk-switch size="lg">Large</dk-switch>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <dk-switch disabled>Off disabled</dk-switch>
      <dk-switch checked disabled>On disabled</dk-switch>
    </div>
  `,
};
