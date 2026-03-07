import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-footer-columns.js';
import './dk-section-footer-simple.js';
import './dk-footer-helpers.js';

const meta: Meta = {
  title: 'Sections/Footer',
  component: 'dk-section-footer-columns',
  tags: ['autodocs'],
  argTypes: {
    brand: { control: 'text' },
    description: { control: 'text' },
    copyright: { control: 'text' },
  },
  args: {
    brand: 'DesignKit',
    description: 'A modern design system built with Lit web components for the modern web.',
    copyright: '2026 DesignKit. All rights reserved.',
  },
};

export default meta;
type Story = StoryObj;

export const Columns: Story = {
  render: (args) => html`
    <dk-section-footer-columns
      brand=${args.brand}
      description=${args.description}
      copyright=${args.copyright}
    >
      <span slot="logo">DK</span>
      <div slot="columns">
        <dk-footer-column label="Product">
          <dk-footer-link href="#">Components</dk-footer-link>
          <dk-footer-link href="#">Templates</dk-footer-link>
          <dk-footer-link href="#">Pricing</dk-footer-link>
          <dk-footer-link href="#">Changelog</dk-footer-link>
        </dk-footer-column>
        <dk-footer-column label="Resources">
          <dk-footer-link href="#">Documentation</dk-footer-link>
          <dk-footer-link href="#">Tutorials</dk-footer-link>
          <dk-footer-link href="#">Blog</dk-footer-link>
          <dk-footer-link href="#">Community</dk-footer-link>
        </dk-footer-column>
        <dk-footer-column label="Company">
          <dk-footer-link href="#">About</dk-footer-link>
          <dk-footer-link href="#">Careers</dk-footer-link>
          <dk-footer-link href="#">Contact</dk-footer-link>
          <dk-footer-link href="#">Press Kit</dk-footer-link>
        </dk-footer-column>
        <dk-footer-column label="Legal">
          <dk-footer-link href="#">Privacy Policy</dk-footer-link>
          <dk-footer-link href="#">Terms of Service</dk-footer-link>
          <dk-footer-link href="#">Cookie Policy</dk-footer-link>
          <dk-footer-link href="#">Licenses</dk-footer-link>
        </dk-footer-column>
      </div>
      <div slot="social" style="display: flex; gap: 16px;">
        <a href="#" aria-label="GitHub">GH</a>
        <a href="#" aria-label="Twitter">TW</a>
        <a href="#" aria-label="Discord">DC</a>
        <a href="#" aria-label="YouTube">YT</a>
      </div>
    </dk-section-footer-columns>
  `,
};

export const Simple: Story = {
  render: () => html`
    <dk-section-footer-simple
      brand="DesignKit"
      copyright="2026 DesignKit. Built with Lit."
    >
      <span slot="logo">DK</span>
      <nav slot="links" style="display: flex; gap: 24px;">
        <a href="#">Docs</a>
        <a href="#">Blog</a>
        <a href="#">GitHub</a>
        <a href="#">Twitter</a>
      </nav>
    </dk-section-footer-simple>
  `,
};
