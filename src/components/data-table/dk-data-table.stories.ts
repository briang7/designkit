import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-data-table.js';
import type { DkColumn } from './dk-data-table.js';

const columns: DkColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

const data = Array.from({ length: 25 }, (_, i) => ({
  name: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace'][i % 7],
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Editor'][i % 3],
  status: ['Active', 'Inactive'][i % 2],
}));

const meta: Meta = {
  title: 'Components/DataTable',
  component: 'dk-data-table',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<dk-data-table .columns=${columns} .data=${data.slice(0, 5)}></dk-data-table>`,
};

export const Sortable: Story = {
  render: () => html`<dk-data-table .columns=${columns} .data=${data.slice(0, 10)}></dk-data-table>`,
};

export const Paginated: Story = {
  render: () => html`<dk-data-table .columns=${columns} .data=${data} paginated page-size="5"></dk-data-table>`,
};

export const Selectable: Story = {
  render: () => html`<dk-data-table .columns=${columns} .data=${data.slice(0, 5)} selectable></dk-data-table>`,
};

export const StickyHeader: Story = {
  render: () => html`
    <div style="height: 300px; overflow: auto;">
      <dk-data-table .columns=${columns} .data=${data} sticky-header></dk-data-table>
    </div>
  `,
};

export const Empty: Story = {
  render: () => html`<dk-data-table .columns=${columns} .data=${[]}></dk-data-table>`,
};
