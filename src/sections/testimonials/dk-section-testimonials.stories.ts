import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-testimonials-grid.js';
import './dk-section-testimonials-carousel.js';
import './dk-testimonial-card.js';

const meta: Meta = {
  title: 'Sections/Testimonials',
  component: 'dk-section-testimonials-grid',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
  },
  args: {
    headline: 'Loved by Developers',
    subheadline: 'See what our customers have to say about their experience.',
  },
};

export default meta;
type Story = StoryObj;

export const Grid: Story = {
  render: (args) => html`
    <dk-section-testimonials-grid headline=${args.headline} subheadline=${args.subheadline}>
      <dk-testimonial-card
        quote="DesignKit cut our development time in half. The components are polished and the API is intuitive."
        author="Sarah Chen"
        role="CTO, Stackwise"
        avatar="https://i.pravatar.cc/80?img=1"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="We migrated from a custom system and the transition was seamless. Incredible documentation."
        author="Marcus Johnson"
        role="Lead Engineer, Flowstate"
        avatar="https://i.pravatar.cc/80?img=3"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="The accessibility features alone make this worth it. Every component just works with screen readers."
        author="Priya Sharma"
        role="Frontend Architect, Civica"
        avatar="https://i.pravatar.cc/80?img=5"
        rating=${4}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Best design system I've used in 15 years of web development. The theming system is brilliant."
        author="James O'Brien"
        role="VP Engineering, NovaTech"
        avatar="https://i.pravatar.cc/80?img=8"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Our designers and developers finally speak the same language. Handoff is no longer a bottleneck."
        author="Anika Patel"
        role="Design Lead, Mosaic"
        avatar="https://i.pravatar.cc/80?img=9"
        rating=${4}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Shipped our entire SaaS UI in two weeks using DesignKit. The ROI is unquestionable."
        author="David Kim"
        role="Founder, LaunchPad"
        avatar="https://i.pravatar.cc/80?img=11"
        rating=${5}
      ></dk-testimonial-card>
    </dk-section-testimonials-grid>
  `,
};

export const Carousel: Story = {
  render: () => html`
    <dk-section-testimonials-carousel headline="What People Are Saying" subheadline="Trusted by teams at companies of every size.">
      <dk-testimonial-card
        quote="The animation quality is next level. Every interaction feels buttery smooth and intentional."
        author="Elena Rodriguez"
        role="UX Director, Craft Studio"
        avatar="https://i.pravatar.cc/80?img=16"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="We evaluated six design systems. DesignKit won on performance, accessibility, and developer experience."
        author="Tom Fischer"
        role="Staff Engineer, Vertex"
        avatar="https://i.pravatar.cc/80?img=12"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Finally a component library that doesn't fight you. Customization is a breeze."
        author="Mei Lin"
        role="Senior Developer, Pagoda"
        avatar="https://i.pravatar.cc/80?img=20"
        rating=${4}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Switching from MUI was the best decision we made this year. Zero regrets."
        author="Roberto Silva"
        role="Tech Lead, Nuvem"
        avatar="https://i.pravatar.cc/80?img=33"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="The web components approach means we use it across React, Vue, and Angular simultaneously."
        author="Lisa Park"
        role="Principal Engineer, Omni"
        avatar="https://i.pravatar.cc/80?img=25"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Support is incredible. Got a detailed response within an hour on a Sunday."
        author="Ahmed Hassan"
        role="Founder, Pixelcraft"
        avatar="https://i.pravatar.cc/80?img=52"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="The dark mode implementation is flawless. One CSS variable change and everything adapts."
        author="Nina Kowalski"
        role="UI Engineer, Darkroom"
        avatar="https://i.pravatar.cc/80?img=44"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Tree shaking actually works. Our bundle only includes what we use — under 8KB total."
        author="Carlos Mendez"
        role="Performance Lead, Speedy"
        avatar="https://i.pravatar.cc/80?img=59"
        rating=${4}
      ></dk-testimonial-card>
    </dk-section-testimonials-carousel>
  `,
};
