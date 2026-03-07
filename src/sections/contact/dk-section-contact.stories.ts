import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-contact-split.js';
import './dk-section-contact-centered.js';

const meta: Meta = {
  title: 'Sections/Contact',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Split: Story = {
  render: () => html`
    <dk-section-contact-split
      headline="Get in Touch"
      subheadline="Have a question? We'd love to hear from you."
      email="hello@designkit.dev"
      phone="+1 (555) 123-4567"
      address="123 Component Lane, San Francisco, CA 94105"
    ></dk-section-contact-split>
  `,
};

export const Centered: Story = {
  render: () => html`
    <dk-section-contact-centered
      headline="Contact Us"
      subheadline="Fill out the form and we'll get back to you within 24 hours."
    ></dk-section-contact-centered>
  `,
};
