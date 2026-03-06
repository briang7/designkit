import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-badge.js';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'dk-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'danger', 'warning'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    dot: { control: 'boolean' },
    removable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <dk-badge variant=${args.variant} size=${args.size} ?dot=${args.dot} ?removable=${args.removable}>
      Badge
    </dk-badge>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <dk-badge variant="default">Default</dk-badge>
      <dk-badge variant="primary">Primary</dk-badge>
      <dk-badge variant="success">Success</dk-badge>
      <dk-badge variant="danger">Danger</dk-badge>
      <dk-badge variant="warning">Warning</dk-badge>
    </div>
  `,
};

export const WithDot: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <dk-badge variant="success" dot>Online</dk-badge>
      <dk-badge variant="danger" dot>Offline</dk-badge>
      <dk-badge variant="warning" dot>Away</dk-badge>
    </div>
  `,
};

export const Removable: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <dk-badge removable>JavaScript</dk-badge>
      <dk-badge variant="primary" removable>TypeScript</dk-badge>
      <dk-badge variant="success" removable>Lit</dk-badge>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <dk-badge size="sm">Small</dk-badge>
      <dk-badge size="md">Medium</dk-badge>
      <dk-badge size="lg">Large</dk-badge>
    </div>
  `,
};
