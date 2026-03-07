import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-cta-centered.js';
import './dk-section-cta-split.js';
import '../../components/button/dk-button.js';

const meta: Meta = {
  title: 'Sections/CTA',
  component: 'dk-section-cta-centered',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    description: { control: 'text' },
    bg: { control: 'select', options: ['primary', 'secondary', 'gradient', 'dark'] },
  },
  args: {
    headline: 'Ready to Get Started?',
    description: 'Join thousands of developers building better interfaces with DesignKit.',
    bg: 'primary',
  },
};

export default meta;
type Story = StoryObj;

export const Centered: Story = {
  render: (args) => html`
    <dk-section-cta-centered
      headline=${args.headline}
      description=${args.description}
      bg=${args.bg}
    >
      <div slot="cta" style="display: flex; gap: 12px; justify-content: center;">
        <dk-button variant="primary" size="lg">Start Building Free</dk-button>
        <dk-button variant="ghost" size="lg">Talk to Sales</dk-button>
      </div>
    </dk-section-cta-centered>
  `,
};

export const Split: Story = {
  args: {
    bg: "primary"
  },

  render: () => html`
    <dk-section-cta-split
      headline="Ship Your Next Project in Days, Not Months"
      description="Stop reinventing the wheel. DesignKit gives you production-ready components, so you can focus on what makes your product unique."
      bg="gradient"
    >
      <dk-button slot="cta" variant="primary" size="lg">Get Started Now</dk-button>
      <img
        slot="media"
        src="https://picsum.photos/seed/cta-split/600/400"
        alt="Product preview"
        style="width: 100%; border-radius: 12px;"
      />
    </dk-section-cta-split>
  `
};
