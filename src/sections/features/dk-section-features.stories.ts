import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-features-grid.js';
import './dk-section-features-alternating.js';
import './dk-section-features-centered.js';
import './dk-feature-card.js';

const meta: Meta = {
  title: 'Sections/Features',
  component: 'dk-section-features-grid',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
  },
  args: {
    headline: 'Everything You Need',
    subheadline: 'Powerful features to help you build, ship, and scale your applications.',
  },
};

export default meta;
type Story = StoryObj;

export const Grid: Story = {
  render: (args) => html`
    <dk-section-features-grid headline=${args.headline} subheadline=${args.subheadline}>
      <dk-feature-card
        icon="lightning"
        title="Lightning Fast"
        description="Optimized for performance with lazy loading and tree shaking built in."
      ></dk-feature-card>
      <dk-feature-card
        icon="shield"
        title="Enterprise Security"
        description="SOC 2 compliant with end-to-end encryption and role-based access control."
      ></dk-feature-card>
      <dk-feature-card
        icon="puzzle"
        title="Modular Design"
        description="Pick and choose components. Every piece works independently or together."
      ></dk-feature-card>
      <dk-feature-card
        icon="globe"
        title="Global CDN"
        description="Deployed to 200+ edge locations worldwide for sub-50ms response times."
      ></dk-feature-card>
      <dk-feature-card
        icon="code"
        title="Developer First"
        description="TypeScript support, comprehensive API docs, and an active community."
      ></dk-feature-card>
      <dk-feature-card
        icon="chart"
        title="Built-in Analytics"
        description="Track usage, performance, and engagement with zero-config dashboards."
      ></dk-feature-card>
    </dk-section-features-grid>
  `,
};

export const Alternating: Story = {
  render: () => html`
    <dk-section-features-alternating headline="How It Works" subheadline="Three simple steps to get started.">
      <dk-feature-card
        icon="star"
        title="Choose a Template"
        description="Browse our library of 500+ professionally designed templates and pick the one that fits your brand."
      ></dk-feature-card>
      <dk-feature-card
        icon="layers"
        title="Customize Everything"
        description="Adjust colors, typography, spacing, and layout with our intuitive visual editor. No code required."
      ></dk-feature-card>
      <dk-feature-card
        icon="zap"
        title="Publish Instantly"
        description="Deploy to your custom domain with a single click. SSL, CDN, and hosting are all included."
      ></dk-feature-card>
    </dk-section-features-alternating>
  `,
};

export const Centered: Story = {
  render: () => html`
    <dk-section-features-centered headline="Core Capabilities" subheadline="Built for teams that move fast.">
      <dk-feature-card
        icon="users"
        title="Team Collaboration"
        description="Real-time editing, comments, and version history keep everyone aligned."
      ></dk-feature-card>
      <dk-feature-card
        icon="settings"
        title="Fully Configurable"
        description="Extend with plugins, custom themes, and API integrations to match your workflow."
      ></dk-feature-card>
      <dk-feature-card
        icon="heart"
        title="Accessible by Default"
        description="WCAG 2.1 AA compliant components with built-in keyboard navigation and screen reader support."
      ></dk-feature-card>
    </dk-section-features-centered>
  `,
};
