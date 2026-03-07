import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-team-grid.js';
import './dk-section-team-list.js';
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
