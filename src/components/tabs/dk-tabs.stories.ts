import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-tabs.js';

const meta: Meta = {
  title: 'Components/Tabs',
  component: 'dk-tabs',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <dk-tabs>
      <dk-tab slot="tab" panel="overview">Overview</dk-tab>
      <dk-tab slot="tab" panel="features">Features</dk-tab>
      <dk-tab slot="tab" panel="pricing">Pricing</dk-tab>
      <dk-tab-panel name="overview">
        <p>This is the overview content.</p>
      </dk-tab-panel>
      <dk-tab-panel name="features">
        <p>Here are the features.</p>
      </dk-tab-panel>
      <dk-tab-panel name="pricing">
        <p>Pricing information goes here.</p>
      </dk-tab-panel>
    </dk-tabs>
  `,
};

export const WithDisabled: Story = {
  render: () => html`
    <dk-tabs>
      <dk-tab slot="tab" panel="active">Active</dk-tab>
      <dk-tab slot="tab" panel="disabled" disabled>Disabled</dk-tab>
      <dk-tab slot="tab" panel="another">Another</dk-tab>
      <dk-tab-panel name="active"><p>Active tab content.</p></dk-tab-panel>
      <dk-tab-panel name="disabled"><p>This won't show.</p></dk-tab-panel>
      <dk-tab-panel name="another"><p>Another tab content.</p></dk-tab-panel>
    </dk-tabs>
  `,
};

export const ManyTabs: Story = {
  render: () => html`
    <dk-tabs>
      ${['Dashboard', 'Users', 'Products', 'Orders', 'Analytics', 'Settings'].map(
        (name) => html`<dk-tab slot="tab" panel=${name.toLowerCase()}>${name}</dk-tab>`
      )}
      ${['Dashboard', 'Users', 'Products', 'Orders', 'Analytics', 'Settings'].map(
        (name) => html`<dk-tab-panel name=${name.toLowerCase()}><p>${name} content goes here.</p></dk-tab-panel>`
      )}
    </dk-tabs>
  `,
};
