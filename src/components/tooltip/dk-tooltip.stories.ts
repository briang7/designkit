import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-tooltip.js';
import '../button/dk-button.js';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'dk-tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    delay: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { content: 'This is a tooltip', placement: 'top' },
  render: (args) => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <dk-tooltip content=${args.content} placement=${args.placement} delay=${args.delay}>
        <dk-button>Hover me</dk-button>
      </dk-tooltip>
    </div>
  `,
};

export const Placements: Story = {
  render: () => html`
    <div style="padding: 80px; display: flex; gap: 24px; justify-content: center; align-items: center;">
      <dk-tooltip content="Top tooltip" placement="top">
        <dk-button variant="secondary">Top</dk-button>
      </dk-tooltip>
      <dk-tooltip content="Bottom tooltip" placement="bottom">
        <dk-button variant="secondary">Bottom</dk-button>
      </dk-tooltip>
      <dk-tooltip content="Left tooltip" placement="left">
        <dk-button variant="secondary">Left</dk-button>
      </dk-tooltip>
      <dk-tooltip content="Right tooltip" placement="right">
        <dk-button variant="secondary">Right</dk-button>
      </dk-tooltip>
    </div>
  `,
};

export const WithDelay: Story = {
  render: () => html`
    <div style="padding: 60px; display: flex; gap: 24px; justify-content: center;">
      <dk-tooltip content="Instant" delay="0">
        <dk-button variant="secondary">0ms</dk-button>
      </dk-tooltip>
      <dk-tooltip content="Default" delay="200">
        <dk-button variant="secondary">200ms</dk-button>
      </dk-tooltip>
      <dk-tooltip content="Slow" delay="500">
        <dk-button variant="secondary">500ms</dk-button>
      </dk-tooltip>
    </div>
  `,
};
