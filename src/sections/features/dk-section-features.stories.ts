import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-features-grid.js';
import './dk-section-features-alternating.js';
import './dk-section-features-centered.js';
import './dk-section-features-icon-grid.js';
import './dk-section-features-tabs.js';
import './dk-section-features-with-image.js';
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

export const IconGrid: Story = {
  render: () => html`
    <dk-section-features-icon-grid
      headline="Platform Features"
      subheadline="Everything you need to build world-class digital experiences."
    >
      <dk-feature-card
        icon="lightning"
        title="Blazing Performance"
        description="Sub-second page loads with automatic code splitting and edge caching."
      ></dk-feature-card>
      <dk-feature-card
        icon="shield"
        title="Bank-Grade Security"
        description="256-bit encryption, DDoS protection, and automated vulnerability scanning."
      ></dk-feature-card>
      <dk-feature-card
        icon="globe"
        title="Global Scale"
        description="Auto-scaling infrastructure across 30+ regions with 99.99% uptime SLA."
      ></dk-feature-card>
      <dk-feature-card
        icon="code"
        title="API First"
        description="RESTful and GraphQL APIs with SDKs for every major language and framework."
      ></dk-feature-card>
      <dk-feature-card
        icon="users"
        title="Team Management"
        description="Granular permissions, SSO integration, and audit logs for compliance."
      ></dk-feature-card>
      <dk-feature-card
        icon="chart"
        title="Real-Time Insights"
        description="Live dashboards, custom reports, and anomaly detection out of the box."
      ></dk-feature-card>
    </dk-section-features-icon-grid>
  `,
};

export const Tabs: Story = {
  render: () => html`
    <dk-section-features-tabs
      headline="See It in Action"
      subheadline="Explore the key capabilities that set our platform apart."
      .tabs=${[
        {
          label: 'Visual Editor',
          image: 'https://picsum.photos/seed/feat-editor/640/400',
          title: 'Drag-and-Drop Visual Editor',
          description:
            'Build layouts visually with our intuitive editor. Drag components onto the canvas, adjust spacing, and preview changes in real time — no code required.',
        },
        {
          label: 'Analytics',
          image: 'https://picsum.photos/seed/feat-analytics/640/400',
          title: 'Actionable Analytics Dashboard',
          description:
            'Track page views, conversions, and user flows with built-in analytics. Set up custom funnels and receive automated weekly reports delivered to your inbox.',
        },
        {
          label: 'Integrations',
          image: 'https://picsum.photos/seed/feat-integrations/640/400',
          title: 'Connect Your Favorite Tools',
          description:
            'One-click integrations with Slack, Stripe, HubSpot, Zapier, and 200+ other services. Build custom workflows with our webhook and API infrastructure.',
        },
        {
          label: 'Collaboration',
          image: 'https://picsum.photos/seed/feat-collab/640/400',
          title: 'Real-Time Team Collaboration',
          description:
            'Work together with live cursors, inline comments, and branch-based editing. Merge changes confidently with visual diffs and approval workflows.',
        },
      ]}
    ></dk-section-features-tabs>
  `,
};

export const WithImage: Story = {
  render: () => html`
    <dk-section-features-with-image
      headline="Why Teams Choose Us"
      subheadline="Built for modern development workflows from day one."
      image="https://picsum.photos/seed/feat-product/600/450"
    >
      <dk-feature-card
        icon="zap"
        title="Instant Deploys"
        description="Push to Git and your site is live in seconds. Automatic preview URLs for every pull request."
      ></dk-feature-card>
      <dk-feature-card
        icon="layers"
        title="Component Library"
        description="A curated set of 100+ pre-built components that are fully customizable and accessibility tested."
      ></dk-feature-card>
      <dk-feature-card
        icon="settings"
        title="Advanced Configuration"
        description="Fine-tune build pipelines, environment variables, and caching strategies to match your needs."
      ></dk-feature-card>
    </dk-section-features-with-image>
  `,
};
