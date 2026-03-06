import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-button.js';

const meta: Meta = {
  title: 'Components/Button',
  component: 'dk-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <dk-button variant=${args.variant} size=${args.size} ?disabled=${args.disabled} ?loading=${args.loading}>
      Button
    </dk-button>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <dk-button variant="primary">Primary</dk-button>
      <dk-button variant="secondary">Secondary</dk-button>
      <dk-button variant="ghost">Ghost</dk-button>
      <dk-button variant="danger">Danger</dk-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <dk-button size="sm">Small</dk-button>
      <dk-button size="md">Medium</dk-button>
      <dk-button size="lg">Large</dk-button>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <dk-button>
        <span slot="prefix">+</span>
        Add Item
      </dk-button>
      <dk-button variant="secondary">
        Next
        <span slot="suffix">&rarr;</span>
      </dk-button>
    </div>
  `,
};

export const Loading: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <dk-button loading>Saving...</dk-button>
      <dk-button variant="secondary" loading>Loading</dk-button>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <dk-button disabled>Primary</dk-button>
      <dk-button variant="secondary" disabled>Secondary</dk-button>
      <dk-button variant="ghost" disabled>Ghost</dk-button>
      <dk-button variant="danger" disabled>Danger</dk-button>
    </div>
  `,
};
