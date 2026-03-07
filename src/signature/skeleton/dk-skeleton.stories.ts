import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-skeleton.js';

const meta: Meta = {
  title: 'Signature/Skeleton',
  component: 'dk-skeleton',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circle', 'rect'],
    },
    lines: { control: 'number' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
  args: {
    variant: 'text',
    lines: 1,
    width: '100%',
    height: '16px',
  },
};

export default meta;
type Story = StoryObj;

export const Text: Story = {
  render: (args) => html`
    <dk-skeleton variant=${args.variant} lines=${args.lines} width=${args.width} height=${args.height}></dk-skeleton>
  `,
};

export const Circle: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <dk-skeleton variant="circle" width="40px" height="40px"></dk-skeleton>
      <dk-skeleton variant="circle" width="56px" height="56px"></dk-skeleton>
      <dk-skeleton variant="circle" width="72px" height="72px"></dk-skeleton>
    </div>
  `,
};

export const Rect: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <dk-skeleton variant="rect" width="200px" height="120px"></dk-skeleton>
      <dk-skeleton variant="rect" width="200px" height="120px"></dk-skeleton>
      <dk-skeleton variant="rect" width="200px" height="120px"></dk-skeleton>
    </div>
  `,
};

export const MultiLine: Story = {
  render: () => html`
    <div style="max-width: 480px;">
      <dk-skeleton variant="text" lines=${4} width="100%"></dk-skeleton>
    </div>
  `,
};

export const CardLoading: Story = {
  render: () => html`
    <div style="max-width: 320px; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; display: flex; flex-direction: column; gap: 16px;">
      <dk-skeleton variant="rect" width="100%" height="180px"></dk-skeleton>
      <div style="display: flex; align-items: center; gap: 12px;">
        <dk-skeleton variant="circle" width="40px" height="40px"></dk-skeleton>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
          <dk-skeleton variant="text" width="60%"></dk-skeleton>
          <dk-skeleton variant="text" width="40%" height="12px"></dk-skeleton>
        </div>
      </div>
      <dk-skeleton variant="text" lines=${3} width="100%"></dk-skeleton>
      <dk-skeleton variant="rect" width="100%" height="36px"></dk-skeleton>
    </div>
  `,
};
