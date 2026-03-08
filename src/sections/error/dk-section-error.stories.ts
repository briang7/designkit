import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-error-simple.js';
import './dk-section-error-split.js';
import './dk-section-error-with-links.js';
import '../../components/button/dk-button.js';

const meta: Meta = {
  title: 'Sections/Error',
  component: 'dk-section-error-simple',
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'text' },
    headline: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    code: '404',
    headline: 'Page not found',
    description: "Sorry, we couldn't find the page you're looking for.",
  },
};

export default meta;
type Story = StoryObj;

export const Simple: Story = {
  render: (args) => html`
    <dk-section-error-simple
      code=${args.code}
      headline=${args.headline}
      description=${args.description}
    >
      <dk-button slot="cta" variant="primary" size="lg">Go Home</dk-button>
      <dk-button slot="cta" variant="secondary" size="lg">Contact Support</dk-button>
    </dk-section-error-simple>
  `,
};

export const Simple500: Story = {
  name: 'Simple (500)',
  render: () => html`
    <dk-section-error-simple
      code="500"
      headline="Server error"
      description="Something went wrong on our end. Please try again later."
    >
      <dk-button slot="cta" variant="primary" size="lg">Try Again</dk-button>
      <dk-button slot="cta" variant="ghost" size="lg">Status Page</dk-button>
    </dk-section-error-simple>
  `,
};

export const Simple503: Story = {
  name: 'Simple (503)',
  render: () => html`
    <dk-section-error-simple
      code="503"
      headline="Under maintenance"
      description="We're performing scheduled maintenance. We'll be back shortly."
      bg="dark"
    >
      <dk-button slot="cta" variant="primary" size="lg">Check Status</dk-button>
    </dk-section-error-simple>
  `,
};

export const Split: Story = {
  render: () => html`
    <dk-section-error-split
      code="404"
      headline="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
    >
      <dk-button slot="cta" variant="primary" size="lg">Go Home</dk-button>
      <dk-button slot="cta" variant="secondary" size="lg">Contact Support</dk-button>
    </dk-section-error-split>
  `,
};

export const SplitWithImage: Story = {
  name: 'Split (Custom Image)',
  render: () => html`
    <dk-section-error-split
      code="500"
      headline="Something went wrong"
      description="Our servers encountered an unexpected error. We're working on it."
      image="https://placehold.co/400x300/3b82f6/ffffff?text=500+Error"
    >
      <dk-button slot="cta" variant="primary" size="lg">Try Again</dk-button>
      <dk-button slot="cta" variant="ghost" size="lg">Go Home</dk-button>
    </dk-section-error-split>
  `,
};

export const SplitWithCustomMedia: Story = {
  name: 'Split (Custom Media Slot)',
  render: () => html`
    <dk-section-error-split
      code="403"
      headline="Access denied"
      description="You don't have permission to view this page."
      bg="brand"
    >
      <dk-button slot="cta" variant="primary" size="lg">Sign In</dk-button>
      <dk-button slot="cta" variant="ghost" size="lg">Request Access</dk-button>
      <svg slot="media" viewBox="0 0 200 200" width="300" height="300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
        <rect x="80" y="60" width="40" height="50" rx="6" stroke="white" stroke-width="2" fill="none" />
        <circle cx="100" cy="80" r="8" stroke="white" stroke-width="2" fill="none" />
        <rect x="85" y="110" width="30" height="20" rx="4" stroke="white" stroke-width="2" fill="none" />
      </svg>
    </dk-section-error-split>
  `,
};

export const WithLinks: Story = {
  render: () => html`
    <dk-section-error-with-links
      code="404"
      headline="Page not found"
      description="Sorry, we couldn't find what you were looking for. Here are some helpful links instead."
    >
      <dk-button slot="cta" variant="primary" size="lg">Go Home</dk-button>
      <a slot="links" href="#">
        <strong>Documentation</strong>
        <span style="color: #6b7280; font-size: 0.875rem;">Learn how to get started</span>
      </a>
      <a slot="links" href="#">
        <strong>API Reference</strong>
        <span style="color: #6b7280; font-size: 0.875rem;">Detailed API documentation</span>
      </a>
      <a slot="links" href="#">
        <strong>Blog</strong>
        <span style="color: #6b7280; font-size: 0.875rem;">Read our latest articles</span>
      </a>
      <a slot="links" href="#">
        <strong>Support</strong>
        <span style="color: #6b7280; font-size: 0.875rem;">Get help from our team</span>
      </a>
      <a slot="links" href="#">
        <strong>Changelog</strong>
        <span style="color: #6b7280; font-size: 0.875rem;">See what's new</span>
      </a>
      <a slot="links" href="#">
        <strong>Community</strong>
        <span style="color: #6b7280; font-size: 0.875rem;">Join the discussion</span>
      </a>
    </dk-section-error-with-links>
  `,
};

export const WithLinksDark: Story = {
  name: 'With Links (Dark)',
  render: () => html`
    <dk-section-error-with-links
      code="503"
      headline="Service unavailable"
      description="We're currently performing maintenance. Check out these pages in the meantime."
      bg="dark"
    >
      <dk-button slot="cta" variant="primary" size="lg">Status Page</dk-button>
      <a slot="links" href="#" style="color: #ffffff;">
        <strong>Status</strong>
        <span style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">System status page</span>
      </a>
      <a slot="links" href="#" style="color: #ffffff;">
        <strong>Twitter</strong>
        <span style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">Follow for updates</span>
      </a>
      <a slot="links" href="#" style="color: #ffffff;">
        <strong>Email Support</strong>
        <span style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">Get in touch directly</span>
      </a>
    </dk-section-error-with-links>
  `,
};
