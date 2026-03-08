import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-pagination.js';

const meta: Meta = {
  title: 'Components/Pagination',
  component: 'dk-pagination',
  tags: ['autodocs'],
  argTypes: {
    total: { control: 'number' },
    page: { control: 'number' },
    pageSize: { control: 'number' },
    maxVisible: { control: 'number' },
  },
  args: {
    total: 100,
    page: 1,
    pageSize: 10,
    maxVisible: 7,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <dk-pagination
      total=${args.total}
      page=${args.page}
      page-size=${args.pageSize}
      max-visible=${args.maxVisible}
      @dk-page-change=${(e: CustomEvent) => console.log('Page changed:', e.detail)}
    ></dk-pagination>
  `,
};

export const ManyPages: Story = {
  render: () => html`
    <dk-pagination total="500" page="25" page-size="10" max-visible="7"></dk-pagination>
  `,
};

export const FirstPage: Story = {
  render: () => html`
    <dk-pagination total="200" page="1" page-size="10"></dk-pagination>
  `,
};

export const LastPage: Story = {
  render: () => html`
    <dk-pagination total="200" page="20" page-size="10"></dk-pagination>
  `,
};
