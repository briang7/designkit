import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-faq-accordion.js';
import './dk-section-faq-two-column.js';
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
