import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-navbar-simple.js';
import './dk-section-navbar-with-search.js';
import './dk-section-navbar-mega.js';
import './dk-section-navbar-centered.js';
import './dk-section-navbar-dark.js';
import '../../components/button/dk-button.js';

const meta: Meta = {
  title: 'Sections/Navbar',
  component: 'dk-section-navbar-simple',
  tags: ['autodocs'],
  argTypes: {
    brand: { control: 'text' },
    sticky: { control: 'boolean' },
    transparent: { control: 'boolean' },
  },
  args: {
    brand: 'DesignKit',
    sticky: false,
    transparent: false,
  },
};

export default meta;
type Story = StoryObj;

export const Simple: Story = {
  render: (args) => html`
    <dk-section-navbar-simple
      brand=${args.brand}
      ?sticky=${args.sticky}
      ?transparent=${args.transparent}
    >
      <span slot="logo">DK</span>
      <a slot="links" href="#">Products</a>
      <a slot="links" href="#">Solutions</a>
      <a slot="links" href="#">Pricing</a>
      <a slot="links" href="#">Docs</a>
      <dk-button slot="cta" variant="primary" size="sm">Sign Up</dk-button>
    </dk-section-navbar-simple>
  `,
};

export const WithSearch: Story = {
  render: () => html`
    <dk-section-navbar-with-search brand="DevHub">
      <span slot="logo">DH</span>
      <a slot="links" href="#">Explore</a>
      <a slot="links" href="#">Templates</a>
      <a slot="links" href="#">Community</a>
      <a slot="links" href="#">Blog</a>
      <input slot="search" type="text" placeholder="Search components..." />
      <dk-button slot="cta" variant="secondary" size="sm">Log In</dk-button>
    </dk-section-navbar-with-search>
  `,
};

export const Mega: Story = {
  render: () => html`
    <dk-section-navbar-mega brand="Enterprise">
      <span slot="logo">EN</span>
      <a slot="links" href="#">Platform</a>
      <a slot="links" href="#">Developers</a>
      <a slot="links" href="#">Resources</a>
      <a slot="links" href="#">Company</a>
      <dk-button slot="cta" variant="primary" size="sm">Get Started</dk-button>
    </dk-section-navbar-mega>
  `,
};

export const Centered: Story = {
  render: () => html`
    <dk-section-navbar-centered brand="Acme Studio">
      <span slot="logo">AS</span>
      <a slot="links-left" href="#">About</a>
      <a slot="links-left" href="#">Services</a>
      <a slot="links-right" href="#">Portfolio</a>
      <a slot="links-right" href="#">Contact</a>
    </dk-section-navbar-centered>
  `,
};

export const Dark: Story = {
  render: () => html`
    <dk-section-navbar-dark brand="NightOwl" ?sticky=${false}>
      <span slot="logo">NO</span>
      <a slot="links" href="#">Features</a>
      <a slot="links" href="#">Integrations</a>
      <a slot="links" href="#">Changelog</a>
      <a slot="links" href="#">Support</a>
      <dk-button slot="cta" variant="primary" size="sm">Start Free Trial</dk-button>
    </dk-section-navbar-dark>
  `,
};
