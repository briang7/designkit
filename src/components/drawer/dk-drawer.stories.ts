import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-drawer.js';
import '../button/dk-button.js';

const meta: Meta = {
  title: 'Components/Drawer',
  component: 'dk-drawer',
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['start', 'end', 'top', 'bottom'] },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <dk-button @click=${(e: Event) => {
      ((e.target as HTMLElement).nextElementSibling as any).show();
    }}>Open Drawer</dk-button>
    <dk-drawer label="Navigation">
      <p>Drawer content goes here.</p>
    </dk-drawer>
  `,
};

export const Placements: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px;">
      ${(['start', 'end', 'top', 'bottom'] as const).map(p => html`
        <dk-button variant="secondary" @click=${(e: Event) => {
          ((e.target as HTMLElement).nextElementSibling as any).show();
        }}>${p}</dk-button>
        <dk-drawer label="${p} Drawer" placement=${p}>
          <p>This drawer slides from the ${p}.</p>
        </dk-drawer>
      `)}
    </div>
  `,
};

export const WithForm: Story = {
  render: () => html`
    <dk-button @click=${(e: Event) => {
      ((e.target as HTMLElement).nextElementSibling as any).show();
    }}>Edit Settings</dk-button>
    <dk-drawer label="Settings" size="480px">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <dk-input label="Name" placeholder="Your name"></dk-input>
        <dk-input label="Email" type="email" placeholder="you@example.com"></dk-input>
      </div>
      <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
        <dk-button variant="ghost" size="sm" @click=${(e: Event) => {
          ((e.target as HTMLElement).closest('dk-drawer') as any).hide();
        }}>Cancel</dk-button>
        <dk-button size="sm">Save</dk-button>
      </div>
    </dk-drawer>
  `,
};
