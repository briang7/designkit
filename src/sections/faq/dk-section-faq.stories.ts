import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-faq-accordion.js';
import './dk-section-faq-two-column.js';
import './dk-section-faq-centered.js';
import './dk-section-faq-dark.js';
import './dk-faq-item.js';

const meta: Meta = {
  title: 'Sections/FAQ',
  component: 'dk-section-faq-accordion',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
    multiple: { control: 'boolean' },
  },
  args: {
    headline: 'Frequently Asked Questions',
    subheadline: 'Everything you need to know about DesignKit.',
    multiple: false,
  },
};

export default meta;
type Story = StoryObj;

export const Accordion: Story = {
  render: (args) => html`
    <dk-section-faq-accordion
      headline=${args.headline}
      subheadline=${args.subheadline}
      ?multiple=${args.multiple}
    >
      <dk-faq-item question="What frameworks does DesignKit support?" open>
        DesignKit is built with Lit web components, so it works with any framework including React, Vue, Angular, Svelte, and vanilla JavaScript. No adapters or wrappers needed.
      </dk-faq-item>
      <dk-faq-item question="Is there a free tier available?">
        Yes! Our Starter plan is completely free and includes 5 projects, 10 components, and community support. No credit card required to get started.
      </dk-faq-item>
      <dk-faq-item question="Can I use DesignKit for commercial projects?">
        Absolutely. All paid plans include a commercial license. You can use DesignKit in client projects, SaaS products, and internal tools without restrictions.
      </dk-faq-item>
      <dk-faq-item question="How do I customize the theme?">
        DesignKit uses CSS custom properties for theming. You can override any design token globally or per-component. We also provide a visual theme editor in the Pro plan.
      </dk-faq-item>
      <dk-faq-item question="What about accessibility?">
        Every component is WCAG 2.1 AA compliant out of the box. We test with screen readers, keyboard navigation, and automated accessibility audits as part of our CI pipeline.
      </dk-faq-item>
      <dk-faq-item question="Do you offer support?">
        Community support is available on our Discord for all users. Pro and Enterprise plans include priority email support with guaranteed response times.
      </dk-faq-item>
    </dk-section-faq-accordion>
  `,
};

export const TwoColumn: Story = {
  render: () => html`
    <dk-section-faq-two-column
      headline="Common Questions"
      subheadline="Can't find what you're looking for? Reach out to our support team."
      .items=${[
        { question: 'How do I install DesignKit?', answer: 'Install via npm with a single command: npm install @designkit/core. Then import the components you need in your application entry point.' },
        { question: 'Is server-side rendering supported?', answer: 'Yes. DesignKit components work with SSR via Declarative Shadow DOM. We provide first-class support for Next.js, Nuxt, and Astro.' },
        { question: 'Can I contribute to the project?', answer: 'We welcome contributions! Check out our contributing guide on GitHub. We have good-first-issue labels for newcomers.' },
        { question: 'What is the bundle size?', answer: 'Each component is individually tree-shakeable. The average component is under 3KB gzipped. Import only what you use.' },
        { question: 'How often are updates released?', answer: 'We follow semantic versioning and release minor updates bi-weekly. Major versions are released annually with a 6-month migration window.' },
        { question: 'Is there a Figma design kit?', answer: 'Yes, Pro and Enterprise plans include a complete Figma library that stays in sync with the code components. Auto-layout and variants are fully supported.' },
      ]}
    ></dk-section-faq-two-column>
  `,
};

export const Centered: Story = {
  render: () => html`
    <dk-section-faq-centered
      headline="Questions & Answers"
      subheadline="Find answers to the most common questions about getting started."
    >
      <dk-faq-item question="How do I get started with DesignKit?" open>
        Install the package via npm, import the components you need, and drop them into your HTML. No build step required for basic usage.
      </dk-faq-item>
      <dk-faq-item question="Does DesignKit work with TypeScript?">
        Yes. Every component ships with full TypeScript declarations. You get autocomplete, type checking, and inline documentation in your IDE.
      </dk-faq-item>
      <dk-faq-item question="Can I use individual components without the full library?">
        Absolutely. Each component is published as a separate entry point. Import only what you need and your bundler will tree-shake the rest.
      </dk-faq-item>
      <dk-faq-item question="What browsers are supported?">
        All modern browsers including Chrome, Firefox, Safari, and Edge. We support the last two major versions of each browser.
      </dk-faq-item>
      <dk-faq-item question="Is there a migration guide from v1 to v2?">
        Yes, our documentation includes a comprehensive migration guide with codemods to automate most of the breaking changes.
      </dk-faq-item>
    </dk-section-faq-centered>
  `,
};

export const Dark: Story = {
  render: () => html`
    <dk-section-faq-dark
      headline="Frequently Asked Questions"
      subheadline="Everything you need to know about our platform and pricing."
    >
      <dk-faq-item question="What payment methods do you accept?" open>
        We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.
      </dk-faq-item>
      <dk-faq-item question="Can I cancel my subscription at any time?">
        Yes. You can cancel anytime from your account settings. Your access continues until the end of the current billing period with no additional charges.
      </dk-faq-item>
      <dk-faq-item question="Do you offer refunds?">
        We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact support for a full refund.
      </dk-faq-item>
      <dk-faq-item question="Is there a discount for open source projects?">
        Yes! Open source maintainers get free access to the Pro plan. Apply through our OSS program page with a link to your repository.
      </dk-faq-item>
      <dk-faq-item question="How do I upgrade my plan?">
        Navigate to Settings > Billing in your dashboard. Select the new plan and the prorated difference will be charged immediately.
      </dk-faq-item>
    </dk-section-faq-dark>
  `,
};
