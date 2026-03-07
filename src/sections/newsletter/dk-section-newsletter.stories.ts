import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-newsletter-inline.js';
import './dk-section-newsletter-card.js';

const meta: Meta = {
  title: 'Sections/Newsletter',
  component: 'dk-section-newsletter-inline',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    description: { control: 'text' },
    buttonText: { control: 'text' },
    placeholder: { control: 'text' },
  },
  args: {
    headline: 'Stay in the Loop',
    description: 'Get the latest updates on new components, features, and best practices delivered to your inbox.',
    buttonText: 'Subscribe',
    placeholder: 'Enter your email',
  },
};

export default meta;
type Story = StoryObj;

export const Inline: Story = {
  render: (args) => html`
    <dk-section-newsletter-inline
      headline=${args.headline}
      description=${args.description}
      buttonText=${args.buttonText}
      placeholder=${args.placeholder}
    ></dk-section-newsletter-inline>
  `,
};

export const Card: Story = {
  render: () => html`
    <dk-section-newsletter-card
      headline="Join 10,000+ Developers"
      description="Weekly tips on web components, design systems, and frontend architecture. No spam, unsubscribe anytime."
      buttonText="Join Newsletter"
      placeholder="you@example.com"
    ></dk-section-newsletter-card>
  `,
};
