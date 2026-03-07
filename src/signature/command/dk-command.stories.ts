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
