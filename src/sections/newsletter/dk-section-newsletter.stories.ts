import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-newsletter-inline.js';
import './dk-section-newsletter-card.js';
import './dk-section-newsletter-dark.js';
import './dk-section-newsletter-with-image.js';

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

export const Dark: Story = {
  render: () => html`
    <dk-section-newsletter-dark
      headline="Get Early Access"
      description="Be the first to know about new releases, breaking changes, and exclusive beta features. Delivered monthly."
      button-text="Sign Up"
      placeholder="your@email.com"
    ></dk-section-newsletter-dark>
  `,
};

export const WithImage: Story = {
  render: () => html`
    <dk-section-newsletter-with-image
      headline="Level Up Your Workflow"
      description="Tutorials, case studies, and architecture deep-dives from the DesignKit team. Join 5,000+ subscribers."
      button-text="Subscribe Now"
      placeholder="name@company.com"
      image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
    ></dk-section-newsletter-with-image>
  `,
};
