import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-avatar.js';

const meta: Meta = {
  title: 'Components/Avatar',
  component: 'dk-avatar',
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    status: { control: 'select', options: ['', 'online', 'offline', 'away'] },
    initials: { control: 'text' },
    src: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { initials: 'BG' },
  render: (args) => html`<dk-avatar initials=${args.initials} size=${args.size} status=${args.status}></dk-avatar>`,
};

export const WithImage: Story = {
  render: () => html`<dk-avatar src="https://i.pravatar.cc/150?img=3" alt="User Photo"></dk-avatar>`,
};

export const Initials: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px;">
      <dk-avatar initials="AB"></dk-avatar>
      <dk-avatar initials="CD"></dk-avatar>
      <dk-avatar initials="EF"></dk-avatar>
    </div>
  `,
};

export const StatusDot: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px;">
      <dk-avatar initials="ON" status="online"></dk-avatar>
      <dk-avatar initials="OF" status="offline"></dk-avatar>
      <dk-avatar initials="AW" status="away"></dk-avatar>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <dk-avatar initials="SM" size="sm"></dk-avatar>
      <dk-avatar initials="MD" size="md"></dk-avatar>
      <dk-avatar initials="LG" size="lg"></dk-avatar>
    </div>
  `,
};
