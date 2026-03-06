import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-toast.js';
import '../button/dk-button.js';
import type { DkToastContainer } from './dk-toast.js';

const meta: Meta = {
  title: 'Components/Toast',
  component: 'dk-toast',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <dk-toast variant="info" message="This is an informational message."></dk-toast>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <dk-toast variant="info" message="Information: Your settings have been saved."></dk-toast>
      <dk-toast variant="success" message="Success: File uploaded successfully."></dk-toast>
      <dk-toast variant="warning" message="Warning: Your session will expire soon."></dk-toast>
      <dk-toast variant="danger" message="Error: Failed to save changes."></dk-toast>
    </div>
  `,
};

export const WithAction: Story = {
  render: () => html`
    <dk-toast variant="danger" message="Failed to send message." action-label="Retry"></dk-toast>
  `,
};

export const Interactive: Story = {
  render: () => {
    const push = (variant: string) => {
      const container = document.querySelector('dk-toast-container') as DkToastContainer;
      container?.push({ message: `This is a ${variant} toast!`, variant: variant as any, duration: 3000 });
    };
    return html`
      <div style="display: flex; gap: 8px;">
        <dk-button variant="secondary" @click=${() => push('info')}>Info</dk-button>
        <dk-button variant="secondary" @click=${() => push('success')}>Success</dk-button>
        <dk-button variant="secondary" @click=${() => push('warning')}>Warning</dk-button>
        <dk-button variant="secondary" @click=${() => push('danger')}>Danger</dk-button>
      </div>
      <dk-toast-container placement="bottom-right"></dk-toast-container>
    `;
  },
};
