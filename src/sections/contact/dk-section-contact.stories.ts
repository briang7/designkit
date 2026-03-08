import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-contact-split.js';
import './dk-section-contact-centered.js';
import './dk-section-contact-dark.js';
import './dk-section-contact-with-map.js';

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

export const Dark: Story = {
  render: () => html`
    <dk-section-contact-dark
      headline="Let's Build Something Great"
      subheadline="Drop us a message and our team will respond within one business day."
    ></dk-section-contact-dark>
  `,
};

export const WithMap: Story = {
  render: () => html`
    <dk-section-contact-with-map
      headline="Visit Our Office"
      subheadline="Come say hello at our headquarters or reach out online."
      email="support@designkit.dev"
      phone="+1 (555) 987-6543"
      address="456 Innovation Blvd, Suite 200, Austin, TX 78701"
    >
      <iframe
        slot="map"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-97.75%2C30.26%2C-97.73%2C30.28&layer=mapnik"
        style="border:0; width:100%; min-height:260px;"
        loading="lazy"
        title="Office location map"
      ></iframe>
    </dk-section-contact-with-map>
  `,
};
