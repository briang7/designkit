import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-search-input.js';

const meta: Meta = {
  title: 'Components/Search Input',
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    debounce: { control: 'number' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { placeholder: 'Search...', size: 'md', debounce: 300 },
  render: (args) => html`
    <dk-search-input
      placeholder=${args.placeholder}
      size=${args.size}
      .debounce=${args.debounce}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @dk-search=${(e: CustomEvent) => console.log('Search:', e.detail.value)}
    ></dk-search-input>
  `,
};

export const Loading: Story = {
  render: () => html`<dk-search-input loading placeholder="Searching..."></dk-search-input>`,
};

export const WithValue: Story = {
  render: () => html`<dk-search-input value="design system"></dk-search-input>`,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <dk-search-input size="sm" placeholder="Small"></dk-search-input>
      <dk-search-input size="md" placeholder="Medium"></dk-search-input>
      <dk-search-input size="lg" placeholder="Large"></dk-search-input>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`<dk-search-input disabled placeholder="Disabled"></dk-search-input>`,
};

export const NotClearable: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <dk-search-input
        value="Cannot clear this"
        .clearable=${false}
        placeholder="No clear button"
        @dk-search=${(e: CustomEvent) => console.log('Search:', e.detail.value)}
      ></dk-search-input>
    </div>
  `,
};

export const CustomDebounce: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <label style="font-size: 14px; color: var(--dk-color-text-muted);">Instant (0ms debounce)</label>
      <dk-search-input
        .debounce=${0}
        placeholder="Type to search instantly..."
        @dk-search=${(e: CustomEvent) => console.log('Instant:', e.detail.value)}
      ></dk-search-input>
      <label style="font-size: 14px; color: var(--dk-color-text-muted);">Slow (1000ms debounce)</label>
      <dk-search-input
        .debounce=${1000}
        placeholder="Fires 1s after you stop typing..."
        @dk-search=${(e: CustomEvent) => console.log('Slow:', e.detail.value)}
      ></dk-search-input>
    </div>
  `,
};
