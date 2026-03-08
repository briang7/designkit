import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-breadcrumbs.js';

const meta: Meta = {
  title: 'Components/Breadcrumbs',
  component: 'dk-breadcrumbs',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <dk-breadcrumbs>
      <dk-breadcrumb href="/">Home</dk-breadcrumb>
      <dk-breadcrumb href="/products">Products</dk-breadcrumb>
      <dk-breadcrumb href="/products/electronics">Electronics</dk-breadcrumb>
      <dk-breadcrumb>Headphones</dk-breadcrumb>
    </dk-breadcrumbs>
  `,
};

export const WithSlashSeparator: Story = {
  render: () => html`
    <dk-breadcrumbs separator="slash">
      <dk-breadcrumb href="/">Home</dk-breadcrumb>
      <dk-breadcrumb href="/docs">Documentation</dk-breadcrumb>
      <dk-breadcrumb href="/docs/guides">Guides</dk-breadcrumb>
      <dk-breadcrumb>Getting Started</dk-breadcrumb>
    </dk-breadcrumbs>
  `,
};

export const WithDotSeparator: Story = {
  render: () => html`
    <dk-breadcrumbs separator="dot">
      <dk-breadcrumb href="/">Home</dk-breadcrumb>
      <dk-breadcrumb href="/settings">Settings</dk-breadcrumb>
      <dk-breadcrumb>Profile</dk-breadcrumb>
    </dk-breadcrumbs>
  `,
};
