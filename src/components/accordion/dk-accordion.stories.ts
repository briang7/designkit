import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-accordion.js';
import './dk-accordion-item.js';

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'dk-accordion',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <dk-accordion>
      <dk-accordion-item label="What is DesignKit?">
        DesignKit is a framework-agnostic UI component library built with Lit Web Components.
        It provides a set of reusable, accessible components that work with any framework.
      </dk-accordion-item>
      <dk-accordion-item label="How do I install it?">
        Install via npm with <code>npm install @briang7/designkit</code>. Then import the
        components you need in your project.
      </dk-accordion-item>
      <dk-accordion-item label="Does it support theming?">
        Yes! DesignKit uses CSS custom properties for theming. You can override any design
        token to match your brand.
      </dk-accordion-item>
    </dk-accordion>
  `,
};

export const MultipleOpen: Story = {
  name: 'Multiple Open',
  render: () => html`
    <dk-accordion multiple>
      <dk-accordion-item label="Section One" open>
        This panel starts open. Other panels can also be opened without closing this one.
      </dk-accordion-item>
      <dk-accordion-item label="Section Two">
        Click to open this section. The first section will stay open because
        the <code>multiple</code> attribute is set.
      </dk-accordion-item>
      <dk-accordion-item label="Section Three">
        All three sections can be open at the same time when using multiple mode.
      </dk-accordion-item>
    </dk-accordion>
  `,
};

export const DisabledItems: Story = {
  name: 'Disabled Items',
  render: () => html`
    <dk-accordion>
      <dk-accordion-item label="Available Section">
        This section can be toggled normally.
      </dk-accordion-item>
      <dk-accordion-item label="Disabled Section" disabled>
        You should not be able to see this content by clicking the trigger.
      </dk-accordion-item>
      <dk-accordion-item label="Another Available Section">
        This section also works normally.
      </dk-accordion-item>
    </dk-accordion>
  `,
};
