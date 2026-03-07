import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-sidebar-nav.js';
import './dk-section-sidebar-brand.js';
import './dk-sidebar-item.js';
import './dk-sidebar-group.js';

const meta: Meta = {
  title: 'Sections/Sidebar',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Nav: Story = {
  render: () => html`
    <div style="display: flex; border: 1px solid #e5e7eb; border-radius: 1rem; overflow: hidden; height: 500px;">
      <dk-section-sidebar-nav>
        <dk-sidebar-group label="Main">
          <dk-sidebar-item label="Dashboard" active></dk-sidebar-item>
          <dk-sidebar-item label="Analytics" badge="3"></dk-sidebar-item>
          <dk-sidebar-item label="Projects"></dk-sidebar-item>
          <dk-sidebar-item label="Team"></dk-sidebar-item>
        </dk-sidebar-group>
        <dk-sidebar-group label="Settings" collapsible>
          <dk-sidebar-item label="General"></dk-sidebar-item>
          <dk-sidebar-item label="Security"></dk-sidebar-item>
          <dk-sidebar-item label="Notifications"></dk-sidebar-item>
        </dk-sidebar-group>
      </dk-section-sidebar-nav>
      <div style="flex: 1; padding: 2rem; display: flex; align-items: center; justify-content: center; color: #6b7280;">
        Main content area
      </div>
    </div>
  `,
};

export const Brand: Story = {
  render: () => html`
    <div style="display: flex; border: 1px solid #e5e7eb; border-radius: 1rem; overflow: hidden; height: 500px;">
      <dk-section-sidebar-brand>
        <dk-sidebar-group label="Navigation">
          <dk-sidebar-item label="Overview" active></dk-sidebar-item>
          <dk-sidebar-item label="Reports" badge="New"></dk-sidebar-item>
          <dk-sidebar-item label="Users"></dk-sidebar-item>
        </dk-sidebar-group>
      </dk-section-sidebar-brand>
      <div style="flex: 1; padding: 2rem; display: flex; align-items: center; justify-content: center; color: #6b7280;">
        Main content area
      </div>
    </div>
  `,
};
