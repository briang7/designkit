import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-alert.js';

const meta: Meta = {
  title: 'Components/Alert',
  component: 'dk-alert',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    dismissable: { control: 'boolean' },
    icon: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  render: () => html`
    <dk-alert variant="info">
      This is an informational alert with helpful details.
    </dk-alert>
  `,
};

export const Success: Story = {
  render: () => html`
    <dk-alert variant="success">
      Your changes have been saved successfully.
    </dk-alert>
  `,
};

export const Warning: Story = {
  render: () => html`
    <dk-alert variant="warning">
      Your session will expire in 5 minutes. Please save your work.
    </dk-alert>
  `,
};

export const Error: Story = {
  render: () => html`
    <dk-alert variant="error">
      Failed to submit the form. Please check the required fields and try again.
    </dk-alert>
  `,
};

export const Dismissable: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <dk-alert variant="info" dismissable>
        You can dismiss this alert by clicking the close button.
      </dk-alert>
      <dk-alert variant="success" dismissable>
        Operation complete. Dismiss when ready.
      </dk-alert>
      <dk-alert variant="warning" dismissable>
        This warning can be dismissed.
      </dk-alert>
      <dk-alert variant="error" dismissable>
        This error can be dismissed.
      </dk-alert>
    </div>
  `,
};

export const WithTitle: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <dk-alert variant="info" dismissable>
        <span slot="title">Information</span>
        A new version of the application is available. Refresh to update.
      </dk-alert>
      <dk-alert variant="success">
        <span slot="title">Deployment Successful</span>
        Your application has been deployed to production.
      </dk-alert>
      <dk-alert variant="warning">
        <span slot="title">Disk Space Low</span>
        You are using 90% of your available storage. Consider upgrading your plan.
      </dk-alert>
      <dk-alert variant="error">
        <span slot="title">Connection Lost</span>
        Unable to reach the server. Please check your network connection.
      </dk-alert>
    </div>
  `,
};
