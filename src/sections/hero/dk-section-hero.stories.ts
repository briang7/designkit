import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-hero-centered.js';
import './dk-section-hero-split.js';
import './dk-section-hero-background.js';
import '../../components/button/dk-button.js';

const meta: Meta = {
  title: 'Sections/Hero',
  component: 'dk-section-hero-centered',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
    badge: { control: 'text' },
  },
  args: {
    headline: 'Build Beautiful Interfaces Faster',
    subheadline: 'A modern design system built with Lit web components. Ship polished UIs in record time.',
    badge: 'New Release',
  },
};

export default meta;
type Story = StoryObj;

export const Centered: Story = {
  render: (args) => html`
    <dk-section-hero-centered
      headline=${args.headline}
      subheadline=${args.subheadline}
      badge=${args.badge}
    >
      <dk-button slot="cta-primary" variant="primary" size="lg">Get Started</dk-button>
      <dk-button slot="cta-secondary" variant="secondary" size="lg">View Docs</dk-button>
    </dk-section-hero-centered>
  `,
};

export const Split: Story = {
  render: () => html`
    <dk-section-hero-split
      headline="Design Systems Made Simple"
      subheadline="Drag, drop, and customize. Create stunning websites without writing a single line of CSS."
    >
      <dk-button slot="cta-primary" variant="primary" size="lg">Start Free Trial</dk-button>
      <dk-button slot="cta-secondary" variant="ghost" size="lg">Watch Demo</dk-button>
      <img
        slot="media"
        src="https://picsum.photos/seed/hero-split/600/400"
        alt="Hero illustration"
        style="width: 100%; border-radius: 12px;"
      />
    </dk-section-hero-split>
  `,
};

export const Background: Story = {
  render: () => html`
    <dk-section-hero-background
      headline="Launch Your Next Big Idea"
      subheadline="Everything you need to go from concept to production. Trusted by 10,000+ developers worldwide."
      image="https://placehold.co/1920x800/1e1b4b/ffffff?text=Background"
    >
      <dk-button slot="cta-primary" variant="primary" size="lg">Join Waitlist</dk-button>
      <dk-button slot="cta-secondary" variant="ghost" size="lg">Learn More</dk-button>
    </dk-section-hero-background>
  `,
};
