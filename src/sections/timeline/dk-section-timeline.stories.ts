import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-timeline-vertical.js';
import './dk-section-timeline-alternating.js';
import './dk-timeline-step.js';

const meta: Meta = {
  title: 'Sections/Timeline',
  component: 'dk-section-timeline-vertical',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
  },
  args: {
    headline: 'Our Journey',
    subheadline: 'Key milestones that shaped who we are today.',
  },
};

export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  render: (args) => html`
    <dk-section-timeline-vertical headline=${args.headline} subheadline=${args.subheadline}>
      <dk-timeline-step
        icon="lightning"
        date="January 2024"
        title="Company Founded"
        description="Started with a vision to simplify web development for teams of all sizes."
        active
      ></dk-timeline-step>
      <dk-timeline-step
        icon="code"
        date="April 2024"
        title="Beta Launch"
        description="Released the first public beta with core editing and collaboration features."
      ></dk-timeline-step>
      <dk-timeline-step
        icon="users"
        date="August 2024"
        title="1,000 Users"
        description="Crossed our first major user milestone and expanded the engineering team."
      ></dk-timeline-step>
      <dk-timeline-step
        icon="globe"
        date="December 2024"
        title="Global Expansion"
        description="Launched in 12 new markets with localized support and regional data centers."
      ></dk-timeline-step>
      <dk-timeline-step
        icon="star"
        date="March 2025"
        title="Series A Funding"
        description="Raised $15M to accelerate product development and grow the team to 50+."
      ></dk-timeline-step>
    </dk-section-timeline-vertical>
  `,
};

export const VerticalDark: Story = {
  name: 'Vertical (Dark)',
  render: () => html`
    <dk-section-timeline-vertical bg="dark" headline="Product Roadmap" subheadline="What we have planned for the year ahead.">
      <dk-timeline-step
        icon="check"
        date="Q1 2025"
        title="API v2 Release"
        description="Complete rewrite of the public API with GraphQL support and improved rate limits."
        active
      ></dk-timeline-step>
      <dk-timeline-step
        icon="shield"
        date="Q2 2025"
        title="SOC 2 Certification"
        description="Enterprise-grade security compliance for regulated industries."
      ></dk-timeline-step>
      <dk-timeline-step
        icon="chart"
        date="Q3 2025"
        title="Analytics Dashboard"
        description="Built-in analytics with real-time metrics, funnels, and custom reports."
      ></dk-timeline-step>
      <dk-timeline-step
        icon="heart"
        date="Q4 2025"
        title="Community Platform"
        description="Launch of forums, user groups, and a marketplace for community plugins."
      ></dk-timeline-step>
    </dk-section-timeline-vertical>
  `,
};

export const Alternating: Story = {
  render: (args) => html`
    <dk-section-timeline-alternating headline=${args.headline} subheadline=${args.subheadline}>
      <dk-timeline-step
        icon="clock"
        title="Discovery"
        description="We learn about your goals, audience, and brand to create a clear project brief."
        active
      ></dk-timeline-step>
      <dk-timeline-step
        icon="code"
        title="Design"
        description="Wireframes and high-fidelity mockups are crafted and refined with your feedback."
      ></dk-timeline-step>
      <dk-timeline-step
        icon="lightning"
        title="Development"
        description="Your site is built with modern tech, tested across devices, and optimized for speed."
      ></dk-timeline-step>
      <dk-timeline-step
        icon="check"
        title="Launch"
        description="Final QA, deployment to production, and handoff with documentation and training."
      ></dk-timeline-step>
    </dk-section-timeline-alternating>
  `,
  args: {
    headline: 'How We Work',
    subheadline: 'A proven four-step process from concept to launch.',
  },
};

export const AlternatingBrand: Story = {
  name: 'Alternating (Brand)',
  render: () => html`
    <dk-section-timeline-alternating bg="brand" headline="Getting Started" subheadline="Up and running in four simple steps.">
      <dk-timeline-step
        icon="users"
        title="Sign Up"
        description="Create your free account in under 30 seconds. No credit card required."
        active
      ></dk-timeline-step>
      <dk-timeline-step
        icon="star"
        title="Pick a Template"
        description="Choose from hundreds of professionally designed starting points."
      ></dk-timeline-step>
      <dk-timeline-step
        icon="globe"
        title="Customize"
        description="Drag, drop, and tweak every detail until it feels like yours."
      ></dk-timeline-step>
      <dk-timeline-step
        icon="chart"
        title="Publish"
        description="Go live on your custom domain with built-in SSL and CDN."
      ></dk-timeline-step>
    </dk-section-timeline-alternating>
  `,
};
