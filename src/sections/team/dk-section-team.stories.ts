import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-team-grid.js';
import './dk-section-team-list.js';
import './dk-section-team-cards.js';
import './dk-section-team-compact.js';
import './dk-team-member.js';

const meta: Meta = {
  title: 'Sections/Team',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Grid: Story = {
  render: () => html`
    <dk-section-team-grid headline="Our Team" subheadline="Meet the people behind the product.">
      <dk-team-member
        name="Alex Rivera"
        role="Lead Engineer"
        image="https://i.pravatar.cc/400?img=11"
        bio="Full-stack developer passionate about design systems."
      ></dk-team-member>
      <dk-team-member
        name="Jordan Lee"
        role="Design Lead"
        image="https://i.pravatar.cc/400?img=32"
        bio="Former Figma designer turned component architect."
      ></dk-team-member>
      <dk-team-member
        name="Sam Taylor"
        role="Developer Advocate"
        image="https://i.pravatar.cc/400?img=48"
        bio="Writes docs, builds demos, and helps teams ship faster."
      ></dk-team-member>
    </dk-section-team-grid>
  `,
};

export const List: Story = {
  render: () => html`
    <dk-section-team-list headline="Leadership">
      <dk-team-member
        name="Morgan Chen"
        role="CEO & Co-founder"
        image="https://i.pravatar.cc/400?img=5"
        bio="10+ years building developer tools. Previously at Vercel and GitHub."
      ></dk-team-member>
      <dk-team-member
        name="Casey Wright"
        role="CTO & Co-founder"
        image="https://i.pravatar.cc/400?img=15"
        bio="Open source enthusiast. Core contributor to Lit and web components standards."
      ></dk-team-member>
    </dk-section-team-list>
  `,
};

export const Cards: Story = {
  render: () => html`
    <dk-section-team-cards headline="Engineering Team" subheadline="The builders behind DesignKit.">
      <dk-team-member
        name="Priya Sharma"
        role="Senior Frontend Engineer"
        image="https://i.pravatar.cc/400?img=25"
        bio="Component architecture specialist. Loves performance optimization and accessibility."
      ></dk-team-member>
      <dk-team-member
        name="David Kim"
        role="Backend Engineer"
        image="https://i.pravatar.cc/400?img=33"
        bio="API design and infrastructure. Previously scaled systems at Cloudflare."
      ></dk-team-member>
      <dk-team-member
        name="Elena Vasquez"
        role="Design Engineer"
        image="https://i.pravatar.cc/400?img=44"
        bio="Bridges design and code. Maintains the Figma library and design tokens."
      ></dk-team-member>
      <dk-team-member
        name="Marcus Johnson"
        role="QA Lead"
        image="https://i.pravatar.cc/400?img=52"
        bio="Testing evangelist. Built our visual regression and accessibility test pipeline."
      ></dk-team-member>
      <dk-team-member
        name="Sophie Laurent"
        role="DevRel Engineer"
        image="https://i.pravatar.cc/400?img=28"
        bio="Creates tutorials, speaks at conferences, and helps developers succeed."
      ></dk-team-member>
      <dk-team-member
        name="Tomás Reyes"
        role="Platform Engineer"
        image="https://i.pravatar.cc/400?img=60"
        bio="CI/CD, package publishing, and monorepo tooling. Nx and Turborepo expert."
      ></dk-team-member>
    </dk-section-team-cards>
  `,
};

export const Compact: Story = {
  render: () => html`
    <dk-section-team-compact headline="Contributors" subheadline="Thank you to our amazing open source contributors.">
      <dk-team-member
        name="Aiko Tanaka"
        role="Core Contributor"
        image="https://i.pravatar.cc/400?img=9"
      ></dk-team-member>
      <dk-team-member
        name="Liam O'Brien"
        role="Core Contributor"
        image="https://i.pravatar.cc/400?img=14"
      ></dk-team-member>
      <dk-team-member
        name="Fatima Al-Rashid"
        role="Docs Author"
        image="https://i.pravatar.cc/400?img=23"
      ></dk-team-member>
      <dk-team-member
        name="Noah Fischer"
        role="Bug Hunter"
        image="https://i.pravatar.cc/400?img=35"
      ></dk-team-member>
      <dk-team-member
        name="Isha Patel"
        role="A11y Champion"
        image="https://i.pravatar.cc/400?img=41"
      ></dk-team-member>
      <dk-team-member
        name="Carlos Mendez"
        role="i18n Lead"
        image="https://i.pravatar.cc/400?img=53"
      ></dk-team-member>
      <dk-team-member
        name="Yuna Park"
        role="Theme Designer"
        image="https://i.pravatar.cc/400?img=47"
      ></dk-team-member>
      <dk-team-member
        name="Erik Svensson"
        role="Performance"
        image="https://i.pravatar.cc/400?img=57"
      ></dk-team-member>
    </dk-section-team-compact>
  `,
};
