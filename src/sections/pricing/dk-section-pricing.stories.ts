import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-pricing-tiers.js';
import './dk-section-pricing-comparison.js';
import './dk-section-pricing-simple.js';
import './dk-section-pricing-dark.js';
import './dk-section-pricing-with-toggle.js';
import './dk-pricing-tier.js';
import '../../components/button/dk-button.js';

const meta: Meta = {
  title: 'Sections/Pricing',
  component: 'dk-section-pricing-tiers',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
  },
  args: {
    headline: 'Simple, Transparent Pricing',
    subheadline: 'Choose the plan that fits your team. Upgrade or downgrade anytime.',
  },
};

export default meta;
type Story = StoryObj;

export const Tiers: Story = {
  render: (args) => html`
    <dk-section-pricing-tiers headline=${args.headline} subheadline=${args.subheadline}>
      <dk-pricing-tier
        name="Starter"
        price="$0"
        period="/month"
        annual-price="$0"
        annual-period="/year"
        description="Perfect for side projects and experimentation."
        .features=${['5 projects', '10 components', 'Community support', 'Basic analytics', '1 team member']}
      >
        <dk-button slot="cta" variant="secondary">Get Started Free</dk-button>
      </dk-pricing-tier>
      <dk-pricing-tier
        name="Pro"
        price="$29"
        period="/month"
        annual-price="$290"
        annual-period="/year"
        description="For professional developers and growing teams."
        featured
        .features=${['Unlimited projects', 'All components', 'Priority support', 'Advanced analytics', 'Up to 10 members', 'Custom themes', 'API access']}
      >
        <dk-button slot="cta" variant="primary">Start Free Trial</dk-button>
      </dk-pricing-tier>
      <dk-pricing-tier
        name="Enterprise"
        price="$99"
        period="/month"
        annual-price="$990"
        annual-period="/year"
        description="For organizations that need scale, security, and support."
        .features=${['Everything in Pro', 'Unlimited members', 'SSO & SAML', 'SLA guarantee', 'Dedicated account manager', 'Custom integrations', 'On-premise option']}
      >
        <dk-button slot="cta" variant="secondary">Contact Sales</dk-button>
      </dk-pricing-tier>
    </dk-section-pricing-tiers>
  `,
};

export const Comparison: Story = {
  render: () => html`
    <dk-section-pricing-comparison headline="Compare Plans" subheadline="See which plan is right for you.">
      <dk-pricing-tier
        name="Basic"
        price="$9"
        period="/month"
        annual-price="$90"
        annual-period="/year"
        description="Essential tools for individuals."
        .features=${['3 projects', '20 components', 'Email support', 'Standard analytics']}
      >
        <dk-button slot="cta" variant="secondary">Choose Basic</dk-button>
      </dk-pricing-tier>
      <dk-pricing-tier
        name="Business"
        price="$49"
        period="/month"
        annual-price="$490"
        annual-period="/year"
        description="Advanced features for scaling teams."
        featured
        .features=${['Unlimited projects', 'All components', 'Phone support', 'Advanced analytics', 'Team management', 'White-label option']}
      >
        <dk-button slot="cta" variant="primary">Choose Business</dk-button>
      </dk-pricing-tier>
      <dk-pricing-tier
        name="Agency"
        price="$149"
        period="/month"
        annual-price="$1,490"
        annual-period="/year"
        description="Everything for agencies and consultancies."
        .features=${['Client workspaces', 'Reseller license', 'Dedicated support', 'Custom training', 'Priority features', 'Audit logs']}
      >
        <dk-button slot="cta" variant="secondary">Choose Agency</dk-button>
      </dk-pricing-tier>
    </dk-section-pricing-comparison>
  `,
};

export const Simple: Story = {
  render: () => html`
    <dk-section-pricing-simple
      headline="One Plan. Everything Included."
      name="All Access"
      price="$39"
      period="/month"
      description="Full access to every feature, every component, every update."
      .features=${['Unlimited everything', 'All current & future components', 'Priority support', 'Commercial license', 'Figma files included', 'Free updates forever']}
    >
      <dk-button slot="cta" variant="primary" size="lg">Get Full Access</dk-button>
    </dk-section-pricing-simple>
  `,
};

export const Dark: Story = {
  render: () => html`
    <dk-section-pricing-dark headline="Pricing Plans" subheadline="Flexible plans for teams of every size.">
      <dk-pricing-tier
        name="Hobby"
        price="$0"
        period="/month"
        annual-price="$0"
        annual-period="/year"
        description="For personal projects and learning."
        .features=${['3 projects', '5 components', 'Community forum', 'Basic docs']}
      >
        <dk-button slot="cta" variant="secondary">Get Started</dk-button>
      </dk-pricing-tier>
      <dk-pricing-tier
        name="Team"
        price="$39"
        period="/month"
        annual-price="$390"
        annual-period="/year"
        description="For professional teams shipping products."
        featured
        .features=${['Unlimited projects', 'All components', 'Slack support', 'Advanced docs', 'Theme editor', 'Up to 15 members']}
      >
        <dk-button slot="cta" variant="primary">Start Free Trial</dk-button>
      </dk-pricing-tier>
      <dk-pricing-tier
        name="Scale"
        price="$129"
        period="/month"
        annual-price="$1,290"
        annual-period="/year"
        description="For enterprises with custom needs."
        .features=${['Everything in Team', 'Unlimited members', 'SSO & audit logs', '99.9% SLA', 'Dedicated CSM', 'Custom contracts']}
      >
        <dk-button slot="cta" variant="secondary">Contact Sales</dk-button>
      </dk-pricing-tier>
    </dk-section-pricing-dark>
  `,
};

export const WithToggle: Story = {
  render: () => html`
    <dk-section-pricing-with-toggle
      headline="Choose Your Plan"
      subheadline="Save 20% with annual billing."
      monthly-label="Monthly"
      annual-label="Annual"
    >
      <dk-pricing-tier
        name="Starter"
        price="$12"
        period="/month"
        annual-price="$115"
        annual-period="/year"
        description="Everything you need to get started."
        .features=${['10 projects', '20 components', 'Email support', 'Standard analytics', '3 team members']}
      >
        <dk-button slot="cta" variant="secondary">Choose Starter</dk-button>
      </dk-pricing-tier>
      <dk-pricing-tier
        name="Growth"
        price="$49"
        period="/month"
        annual-price="$470"
        annual-period="/year"
        description="For teams that need more power and flexibility."
        featured
        .features=${['Unlimited projects', 'All components', 'Priority support', 'Advanced analytics', '25 team members', 'Custom themes', 'Figma library']}
      >
        <dk-button slot="cta" variant="primary">Choose Growth</dk-button>
      </dk-pricing-tier>
      <dk-pricing-tier
        name="Business"
        price="$149"
        period="/month"
        annual-price="$1,430"
        annual-period="/year"
        description="Advanced features for scaling organizations."
        .features=${['Everything in Growth', 'Unlimited members', 'SSO & SAML', 'SLA guarantee', 'Dedicated support', 'Custom integrations', 'On-premise deployment']}
      >
        <dk-button slot="cta" variant="secondary">Choose Business</dk-button>
      </dk-pricing-tier>
    </dk-section-pricing-with-toggle>
  `,
};
