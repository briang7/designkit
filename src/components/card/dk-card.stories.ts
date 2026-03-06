import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-card.js';

const meta: Meta = {
  title: 'Components/Card',
  component: 'dk-card',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['elevated', 'outlined'] },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <dk-card variant=${args.variant} style="max-width: 360px;">
      <div slot="header">Card Title</div>
      <p>This is the card body content. It can contain any HTML.</p>
      <div slot="footer">
        <dk-button size="sm">Action</dk-button>
      </div>
    </dk-card>
  `,
};

export const Elevated: Story = {
  render: () => html`
    <dk-card style="max-width: 360px;">
      <div slot="header">Elevated Card</div>
      <p>This card has a shadow for depth.</p>
    </dk-card>
  `,
};

export const Outlined: Story = {
  render: () => html`
    <dk-card variant="outlined" style="max-width: 360px;">
      <div slot="header">Outlined Card</div>
      <p>This card has a border instead of a shadow.</p>
    </dk-card>
  `,
};

export const WithMedia: Story = {
  render: () => html`
    <dk-card style="max-width: 360px;">
      <img slot="media" src="https://picsum.photos/360/200" alt="Random" style="width: 100%; height: 200px; object-fit: cover;">
      <div slot="header">Photo Card</div>
      <p>A card with an image at the top.</p>
    </dk-card>
  `,
};

export const WithHeaderFooter: Story = {
  render: () => html`
    <dk-card variant="outlined" style="max-width: 360px;">
      <div slot="header">Settings</div>
      <p>Configure your preferences here.</p>
      <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
        <dk-button variant="ghost" size="sm">Cancel</dk-button>
        <dk-button size="sm">Save</dk-button>
      </div>
    </dk-card>
  `,
};
