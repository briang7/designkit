import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-dialog.js';
import '../button/dk-button.js';

const meta: Meta = {
  title: 'Components/Dialog',
  component: 'dk-dialog',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <dk-button @click=${(e: Event) => {
      const dialog = (e.target as HTMLElement).nextElementSibling as any;
      dialog.show();
    }}>Open Dialog</dk-button>
    <dk-dialog label="Confirmation">
      <p>Are you sure you want to proceed?</p>
      <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
        <dk-button variant="ghost" size="sm" @click=${(e: Event) => {
          ((e.target as HTMLElement).closest('dk-dialog') as any).hide();
        }}>Cancel</dk-button>
        <dk-button size="sm" @click=${(e: Event) => {
          ((e.target as HTMLElement).closest('dk-dialog') as any).hide();
        }}>Confirm</dk-button>
      </div>
    </dk-dialog>
  `,
};

export const WithForm: Story = {
  render: () => html`
    <dk-button @click=${(e: Event) => {
      ((e.target as HTMLElement).nextElementSibling as any).show();
    }}>Edit Profile</dk-button>
    <dk-dialog label="Edit Profile">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <dk-input label="Name" placeholder="Your name"></dk-input>
        <dk-input label="Email" type="email" placeholder="you@example.com"></dk-input>
      </div>
      <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
        <dk-button variant="ghost" size="sm" @click=${(e: Event) => {
          ((e.target as HTMLElement).closest('dk-dialog') as any).hide();
        }}>Cancel</dk-button>
        <dk-button size="sm">Save</dk-button>
      </div>
    </dk-dialog>
  `,
};

export const NoCloseButton: Story = {
  render: () => html`
    <dk-button @click=${(e: Event) => {
      ((e.target as HTMLElement).nextElementSibling as any).show();
    }}>Open</dk-button>
    <dk-dialog label="Important Notice" no-close-button>
      <p>You must accept the terms to continue.</p>
      <div slot="footer" style="display: flex; justify-content: flex-end;">
        <dk-button size="sm" @click=${(e: Event) => {
          ((e.target as HTMLElement).closest('dk-dialog') as any).hide();
        }}>I Accept</dk-button>
      </div>
    </dk-dialog>
  `,
};
