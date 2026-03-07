import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-stats-bar.js';
import './dk-section-stats-cards.js';
import './dk-stat.js';

const meta: Meta = {
  title: 'Sections/Stats',
  component: 'dk-section-stats-bar',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
  },
  args: {
    headline: 'Trusted by Teams Worldwide',
  },
};

export default meta;
type Story = StoryObj;

export const Bar: Story = {
  render: (args) => html`
    <dk-section-stats-bar headline=${args.headline}>
      <dk-stat value=${10000} label="Developers" suffix="+"></dk-stat>
      <dk-stat value=${99.9} label="Uptime" suffix="%"></dk-stat>
      <dk-stat value=${500} label="Components" suffix="+"></dk-stat>
      <dk-stat value=${4.9} label="Avg Rating" prefix="" suffix="/5"></dk-stat>
    </dk-section-stats-bar>
  `,
};

export const Cards: Story = {
  render: () => html`
    <dk-section-stats-cards headline="By the Numbers">
      <dk-stat value=${2500000} label="API Requests" suffix="/day"></dk-stat>
      <dk-stat value=${185} label="Countries Served"></dk-stat>
      <dk-stat value=${50} label="Enterprise Clients" suffix="+"></dk-stat>
      <dk-stat value=${15} label="Average Response Time" suffix="ms"></dk-stat>
      <dk-stat value=${99.99} label="SLA Guarantee" suffix="%"></dk-stat>
      <dk-stat value=${24} label="Support Availability" suffix="/7"></dk-stat>
    </dk-section-stats-cards>
  `,
};
