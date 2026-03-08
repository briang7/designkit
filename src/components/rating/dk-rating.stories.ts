import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-rating.js';

const meta: Meta = {
  title: 'Components/Rating',
  component: 'dk-rating',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    max: { control: { type: 'number', min: 1, max: 10 } },
    readonly: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj;

export const Readonly: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <dk-rating value="4" readonly></dk-rating>
      <dk-rating value="2" readonly></dk-rating>
      <dk-rating value="5" readonly></dk-rating>
    </div>
  `,
};

export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <dk-rating value="3"></dk-rating>
      <p style="font-size: 14px; color: #666;">Click a star or use arrow keys to change the rating.</p>
    </div>
  `,
};

export const HalfStars: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <dk-rating value="3.5" readonly></dk-rating>
      <dk-rating value="1.5" readonly></dk-rating>
      <dk-rating value="4.5" readonly></dk-rating>
    </div>
  `,
};

export const DifferentSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="width: 60px; font-size: 14px; color: #666;">Small</span>
        <dk-rating value="4" size="sm" readonly></dk-rating>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="width: 60px; font-size: 14px; color: #666;">Medium</span>
        <dk-rating value="4" size="md" readonly></dk-rating>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="width: 60px; font-size: 14px; color: #666;">Large</span>
        <dk-rating value="4" size="lg" readonly></dk-rating>
      </div>
    </div>
  `,
};
