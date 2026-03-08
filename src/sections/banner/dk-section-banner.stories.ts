import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-banner-bar.js';
import './dk-section-banner-floating.js';
import './dk-section-banner-cookie.js';

const meta: Meta = {
  title: 'Sections/Banner',
  tags: ['autodocs'],
  argTypes: {
    bg: { control: 'select', options: ['primary', 'alt', 'brand', 'dark'] },
  },
};

export default meta;
type Story = StoryObj;

export const Bar: Story = {
  args: {
    message: 'New feature available! Check out our latest release with improved performance.',
    bg: 'brand',
  },
  render: (args) => html`
    <dk-section-banner-bar
      message=${args.message}
      bg=${args.bg}
      href="https://example.com"
      link-text="Learn more"
    ></dk-section-banner-bar>
  `,
};

export const BarNonDismissable: Story = {
  name: 'Bar (Non-dismissable)',
  render: () => html`
    <dk-section-banner-bar
      message="Scheduled maintenance on Saturday, March 15th from 2:00 AM to 6:00 AM UTC."
      bg="dark"
      ?dismissable=${false}
    ></dk-section-banner-bar>
  `,
};

export const BarWithLink: Story = {
  name: 'Bar with Link',
  render: () => html`
    <dk-section-banner-bar
      message="Free shipping on all orders over $50!"
      bg="brand"
      href="/deals"
      link-text="Shop now"
    ></dk-section-banner-bar>
  `,
};

export const Floating: Story = {
  args: {
    message: 'Your trial expires in 3 days. Upgrade now to keep all your data.',
    bg: 'dark',
  },
  render: (args) => html`
    <div style="height: 300px; position: relative;">
      <p style="color: #6b7280;">Scroll down to see the floating banner in the corner.</p>
      <dk-section-banner-floating
        message=${args.message}
        bg=${args.bg}
        position="bottom-right"
      >
        <a slot="cta" href="#" style="color: #3b82f6; font-size: 0.875rem; font-weight: 600; text-decoration: underline;">Upgrade Now</a>
      </dk-section-banner-floating>
    </div>
  `,
};

export const FloatingBottomCenter: Story = {
  name: 'Floating (Bottom Center)',
  render: () => html`
    <div style="height: 300px; position: relative;">
      <p style="color: #6b7280;">Floating banner positioned at bottom center.</p>
      <dk-section-banner-floating
        message="We've updated our privacy policy. Please review the changes."
        bg="primary"
        position="bottom-center"
      >
        <a slot="cta" href="#" style="color: #3b82f6; font-size: 0.875rem; font-weight: 600; text-decoration: underline;">Review Changes</a>
      </dk-section-banner-floating>
    </div>
  `,
};

export const Cookie: Story = {
  args: {
    bg: 'dark',
  },
  render: (args) => html`
    <div style="height: 300px; position: relative;">
      <p style="color: #6b7280;">Cookie consent banner fixed at the bottom of the viewport.</p>
      <dk-section-banner-cookie
        bg=${args.bg}
        position="bottom"
        @dk-cookie-accept=${() => console.log('Cookies accepted')}
        @dk-cookie-decline=${() => console.log('Cookies declined')}
      ></dk-section-banner-cookie>
    </div>
  `,
};

export const CookieTop: Story = {
  name: 'Cookie (Top Position)',
  render: () => html`
    <div style="height: 300px; position: relative;">
      <p style="color: #6b7280;">Cookie consent banner fixed at the top.</p>
      <dk-section-banner-cookie
        position="top"
        bg="brand"
        message="This site uses cookies to deliver a better experience."
        accept-text="Got it"
        decline-text="No thanks"
      ></dk-section-banner-cookie>
    </div>
  `,
};

export const CookieCustomText: Story = {
  name: 'Cookie (Custom Text)',
  render: () => html`
    <div style="height: 300px; position: relative;">
      <p style="color: #6b7280;">Cookie banner with custom button text and message.</p>
      <dk-section-banner-cookie
        position="bottom"
        bg="primary"
        message="We value your privacy. We use essential cookies to make our site work and optional cookies to understand how you interact with it."
        accept-text="Accept All"
        decline-text="Reject Optional"
      ></dk-section-banner-cookie>
    </div>
  `,
};
