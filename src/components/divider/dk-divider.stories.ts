import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-divider.js';

const meta: Meta = {
  title: 'Components/Divider',
  component: 'dk-divider',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    align: { control: 'select', options: ['center', 'left', 'right'] },
    vertical: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Plain: Story = {
  render: () => html`
    <dk-divider></dk-divider>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <dk-divider label="OR"></dk-divider>
  `,
};

export const LeftAligned: Story = {
  render: () => html`
    <dk-divider label="Section" align="left"></dk-divider>
  `,
};

export const RightAligned: Story = {
  render: () => html`
    <dk-divider label="End" align="right"></dk-divider>
  `,
};

export const Vertical: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px; height: 80px;">
      <span>Left</span>
      <dk-divider vertical></dk-divider>
      <span>Right</span>
    </div>
  `,
};

export const WithCustomContent: Story = {
  render: () => html`
    <dk-divider>
      <span style="color: var(--dk-color-primary); font-weight: 600;">Custom Slot Content</span>
    </dk-divider>
  `,
};
