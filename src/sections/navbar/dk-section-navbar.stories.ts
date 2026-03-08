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
      <nav slot="links">
        <a href="#">Products</a>
        <a href="#">Solutions</a>
        <a href="#">Pricing</a>
        <a href="#">Docs</a>
      </nav>
      <dk-button slot="cta" variant="primary" size="sm">Sign Up</dk-button>
    </dk-section-navbar-simple>
  `,
};

export const WithSearch: Story = {
  render: () => html`
    <dk-section-navbar-with-search brand="DevHub">
      <span slot="logo">DH</span>
      <nav slot="links">
        <a href="#">Explore</a>
        <a href="#">Templates</a>
        <a href="#">Community</a>
        <a href="#">Blog</a>
      </nav>
      <input slot="search" type="text" placeholder="Search components..." />
      <dk-button slot="cta" variant="secondary" size="sm">Log In</dk-button>
    </dk-section-navbar-with-search>
  `,
};

export const Mega: Story = {
  render: () => html`
    <dk-section-navbar-mega brand="Enterprise">
      <span slot="logo">EN</span>
      <nav slot="links">
        <a href="#">Platform</a>
        <a href="#">Developers</a>
        <a href="#">Resources</a>
        <a href="#">Company</a>
      </nav>
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
