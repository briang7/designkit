import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-command.js';
import './dk-command-item.js';
import './dk-command-group.js';

const meta: Meta = {
  title: 'Signature/Command',
  component: 'dk-command',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    open: true,
    placeholder: 'Type a command or search...',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <dk-command ?open=${args.open} placeholder=${args.placeholder}>
      <dk-command-item value="new-project">New Project</dk-command-item>
      <dk-command-item value="open-file">Open File</dk-command-item>
      <dk-command-item value="save">Save</dk-command-item>
      <dk-command-item value="settings">Settings</dk-command-item>
      <dk-command-item value="help">Help</dk-command-item>
    </dk-command>
  `,
};

export const WithGroups: Story = {
  render: () => html`
    <dk-command open placeholder="Search actions...">
      <dk-command-group heading="File">
        <dk-command-item value="new-file">New File</dk-command-item>
        <dk-command-item value="open-file">Open File</dk-command-item>
        <dk-command-item value="save-file">Save File</dk-command-item>
        <dk-command-item value="export">Export as PDF</dk-command-item>
      </dk-command-group>
      <dk-command-group heading="Edit">
        <dk-command-item value="undo">Undo</dk-command-item>
        <dk-command-item value="redo">Redo</dk-command-item>
        <dk-command-item value="find">Find and Replace</dk-command-item>
        <dk-command-item value="format">Format Document</dk-command-item>
      </dk-command-group>
      <dk-command-group heading="View">
        <dk-command-item value="toggle-sidebar">Toggle Sidebar</dk-command-item>
        <dk-command-item value="zoom-in">Zoom In</dk-command-item>
        <dk-command-item value="zoom-out">Zoom Out</dk-command-item>
        <dk-command-item value="fullscreen">Toggle Fullscreen</dk-command-item>
      </dk-command-group>
    </dk-command>
  `,
};

export const WithToggleButton: Story = {
  render: () => html`
    <div>
      <p style="margin-bottom: 1rem; font-size: 14px; color: var(--dk-color-text-muted);">
        Click the button or press <kbd style="padding: 2px 6px; border: 1px solid var(--dk-color-border); border-radius: 4px; font-size: 12px;">Ctrl+K</kbd> / <kbd style="padding: 2px 6px; border: 1px solid var(--dk-color-border); border-radius: 4px; font-size: 12px;">Cmd+K</kbd> to toggle
      </p>
      <button
        style="padding: 8px 16px; border: 1px solid var(--dk-color-border); border-radius: 8px; background: var(--dk-color-surface); color: var(--dk-color-text); cursor: pointer; font-size: 14px;"
        @click=${(e: Event) => {
          const cmd = (e.target as HTMLElement).parentElement!.querySelector('dk-command') as any;
          cmd?.show();
        }}
      >Open Command Palette</button>
      <dk-command placeholder="Type a command...">
        <dk-command-item value="dashboard">Go to Dashboard</dk-command-item>
        <dk-command-item value="profile">View Profile</dk-command-item>
        <dk-command-item value="settings">Open Settings</dk-command-item>
        <dk-command-item value="logout">Sign Out</dk-command-item>
      </dk-command>
    </div>
  `,
};

export const CustomEmptyState: Story = {
  render: () => html`
    <dk-command open placeholder="Search for something that doesn't exist...">
      <span slot="empty" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px;">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity: 0.4;">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span style="font-weight: 500;">Nothing found</span>
        <span style="font-size: 13px; opacity: 0.6;">Try a different search term</span>
      </span>
    </dk-command>
  `,
};

export const WithSelectEvent: Story = {
  render: () => html`
    <div>
      <div id="command-output" style="margin-bottom: 1rem; padding: 12px; border: 1px dashed var(--dk-color-border); border-radius: 8px; font-size: 14px; color: var(--dk-color-text-muted); min-height: 20px;">
        Select an item to see its value here
      </div>
      <dk-command
        open
        placeholder="Pick a color..."
        @dk-select=${(e: CustomEvent) => {
          const output = document.getElementById('command-output');
          if (output) output.textContent = `Selected: ${e.detail.value}`;
        }}
      >
        <dk-command-item value="red">Red</dk-command-item>
        <dk-command-item value="blue">Blue</dk-command-item>
        <dk-command-item value="green">Green</dk-command-item>
        <dk-command-item value="purple">Purple</dk-command-item>
        <dk-command-item value="orange">Orange</dk-command-item>
      </dk-command>
    </div>
  `,
};
