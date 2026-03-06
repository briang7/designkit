import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-select.js';

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const meta: Meta = {
  title: 'Components/Select',
  component: 'dk-select',
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`<dk-select label="Fruit" .options=${fruits} placeholder="Choose a fruit..." size=${args.size} ?disabled=${args.disabled} ?searchable=${args.searchable} style="max-width: 300px;"></dk-select>`,
};

export const WithValue: Story = {
  render: () => html`<dk-select label="Fruit" .options=${fruits} value="cherry" style="max-width: 300px;"></dk-select>`,
};

export const Searchable: Story = {
  render: () => html`<dk-select label="Fruit" .options=${fruits} searchable placeholder="Search fruits..." style="max-width: 300px;"></dk-select>`,
};

export const Disabled: Story = {
  render: () => html`<dk-select label="Fruit" .options=${fruits} disabled value="apple" style="max-width: 300px;"></dk-select>`,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <dk-select .options=${fruits} size="sm" placeholder="Small"></dk-select>
      <dk-select .options=${fruits} size="md" placeholder="Medium"></dk-select>
      <dk-select .options=${fruits} size="lg" placeholder="Large"></dk-select>
    </div>
  `,
};
