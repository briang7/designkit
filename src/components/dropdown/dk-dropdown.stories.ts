import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-dropdown.js';
import './dk-dropdown-item.js';
import './dk-dropdown-divider.js';

const meta: Meta = {
  title: 'Components/Dropdown',
  component: 'dk-dropdown',
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <dk-dropdown>
      <button slot="trigger" style="padding: 8px 16px; border-radius: 6px; border: 1px solid #ccc; cursor: pointer; background: white;">
        Actions
      </button>
      <dk-dropdown-item>Edit</dk-dropdown-item>
      <dk-dropdown-item>Duplicate</dk-dropdown-item>
      <dk-dropdown-item>Archive</dk-dropdown-item>
      <dk-dropdown-divider></dk-dropdown-divider>
      <dk-dropdown-item>Share</dk-dropdown-item>
    </dk-dropdown>
  `,
};

export const WithDangerItem: Story = {
  render: () => html`
    <dk-dropdown>
      <button slot="trigger" style="padding: 8px 16px; border-radius: 6px; border: 1px solid #ccc; cursor: pointer; background: white;">
        More Options
      </button>
      <dk-dropdown-item>Rename</dk-dropdown-item>
      <dk-dropdown-item>Move to...</dk-dropdown-item>
      <dk-dropdown-item disabled>Transfer Ownership</dk-dropdown-item>
      <dk-dropdown-divider></dk-dropdown-divider>
      <dk-dropdown-item variant="danger">Delete</dk-dropdown-item>
    </dk-dropdown>
  `,
};

export const PlacementVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 48px; padding: 120px 48px; flex-wrap: wrap; justify-content: center;">
      <dk-dropdown placement="bottom-start">
        <button slot="trigger" style="padding: 8px 16px; border-radius: 6px; border: 1px solid #ccc; cursor: pointer; background: white;">
          Bottom Start
        </button>
        <dk-dropdown-item>Option A</dk-dropdown-item>
        <dk-dropdown-item>Option B</dk-dropdown-item>
        <dk-dropdown-item>Option C</dk-dropdown-item>
      </dk-dropdown>

      <dk-dropdown placement="bottom-end">
        <button slot="trigger" style="padding: 8px 16px; border-radius: 6px; border: 1px solid #ccc; cursor: pointer; background: white;">
          Bottom End
        </button>
        <dk-dropdown-item>Option A</dk-dropdown-item>
        <dk-dropdown-item>Option B</dk-dropdown-item>
        <dk-dropdown-item>Option C</dk-dropdown-item>
      </dk-dropdown>

      <dk-dropdown placement="top-start">
        <button slot="trigger" style="padding: 8px 16px; border-radius: 6px; border: 1px solid #ccc; cursor: pointer; background: white;">
          Top Start
        </button>
        <dk-dropdown-item>Option A</dk-dropdown-item>
        <dk-dropdown-item>Option B</dk-dropdown-item>
        <dk-dropdown-item>Option C</dk-dropdown-item>
      </dk-dropdown>

      <dk-dropdown placement="top-end">
        <button slot="trigger" style="padding: 8px 16px; border-radius: 6px; border: 1px solid #ccc; cursor: pointer; background: white;">
          Top End
        </button>
        <dk-dropdown-item>Option A</dk-dropdown-item>
        <dk-dropdown-item>Option B</dk-dropdown-item>
        <dk-dropdown-item>Option C</dk-dropdown-item>
      </dk-dropdown>
    </div>
  `,
};
