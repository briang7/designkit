import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-progress.js';

const meta: Meta = {
  title: 'Components/Progress',
  component: 'dk-progress',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
    label: { control: 'text' },
    variant: { control: 'select', options: ['primary', 'success', 'warning', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    striped: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    label: '',
    variant: 'primary',
    size: 'md',
    striped: false,
    animated: false,
  },
  render: (args) => html`
    <dk-progress
      value=${args.value}
      max=${args.max}
      label=${args.label}
      variant=${args.variant}
      size=${args.size}
      ?striped=${args.striped}
      ?animated=${args.animated}
    ></dk-progress>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px;">
      <dk-progress value="60" variant="primary" label="Primary"></dk-progress>
      <dk-progress value="75" variant="success" label="Success"></dk-progress>
      <dk-progress value="45" variant="warning" label="Warning"></dk-progress>
      <dk-progress value="30" variant="danger" label="Danger"></dk-progress>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px;">
      <dk-progress value="50" size="sm" label="Small"></dk-progress>
      <dk-progress value="50" size="md" label="Medium"></dk-progress>
      <dk-progress value="50" size="lg" label="Large"></dk-progress>
    </div>
  `,
};

export const Striped: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px;">
      <dk-progress value="70" variant="primary" striped label="Striped Primary"></dk-progress>
      <dk-progress value="55" variant="success" striped label="Striped Success"></dk-progress>
      <dk-progress value="40" variant="warning" striped label="Striped Warning"></dk-progress>
      <dk-progress value="85" variant="danger" striped label="Striped Danger"></dk-progress>
    </div>
  `,
};

export const Animated: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px;">
      <dk-progress value="65" variant="primary" animated label="Animated Primary"></dk-progress>
      <dk-progress value="80" variant="success" animated label="Animated Success"></dk-progress>
      <dk-progress value="50" variant="warning" animated label="Animated Warning"></dk-progress>
      <dk-progress value="35" variant="danger" animated label="Animated Danger"></dk-progress>
    </div>
  `,
};
