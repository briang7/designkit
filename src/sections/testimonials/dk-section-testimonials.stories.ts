import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-testimonials-grid.js';
import './dk-section-testimonials-carousel.js';
import './dk-section-testimonials-featured.js';
import './dk-section-testimonials-masonry.js';
import './dk-section-testimonials-dark.js';
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

export const Featured: Story = {
  render: () => html`
    <dk-section-testimonials-featured
      headline="Featured Testimonial"
      quote="DesignKit transformed the way our entire organization builds UIs. We went from spending weeks on component development to shipping pixel-perfect interfaces in days. The theming system alone saved us hundreds of engineering hours."
      author="Katherine Wright"
      role="VP of Engineering, Meridian Software"
      avatar="https://i.pravatar.cc/80?img=47"
      rating=${5}
    ></dk-section-testimonials-featured>
  `,
};

export const Masonry: Story = {
  render: () => html`
    <dk-section-testimonials-masonry headline="Wall of Love" subheadline="Real feedback from real teams building real products.">
      <dk-testimonial-card
        quote="Migrated our entire design system to DesignKit in a single sprint. The API surface is remarkably consistent across components."
        author="Jordan Lee"
        role="Engineering Manager, Cloudpeak"
        avatar="https://i.pravatar.cc/80?img=14"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="The TypeScript types are outstanding. Autocomplete just works everywhere and catches errors before they hit production."
        author="Samira Osei"
        role="Senior Frontend Dev, Lattice"
        avatar="https://i.pravatar.cc/80?img=23"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="We use DesignKit across three different frameworks in our micro-frontends architecture. Web components were the right call."
        author="Liam Chen"
        role="Principal Architect, Nexus"
        avatar="https://i.pravatar.cc/80?img=57"
        rating=${4}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Outstanding docs. I had a junior developer productive with the library within their first day on the job."
        author="Rebecca Strand"
        role="Team Lead, Forge Labs"
        avatar="https://i.pravatar.cc/80?img=36"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Love the animation utilities. Every transition feels intentional, not just tacked on as an afterthought."
        author="Yuki Tanaka"
        role="Creative Technologist, Atelier"
        avatar="https://i.pravatar.cc/80?img=29"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Cut our bundle size by 60% switching from our old monolith component library. Tree shaking actually works here."
        author="Patrick Doran"
        role="Performance Engineer, Bolt"
        avatar="https://i.pravatar.cc/80?img=60"
        rating=${4}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="The a11y audit on DesignKit components came back clean. Every single component passed WCAG 2.1 AA without modifications."
        author="Fatima Al-Rashid"
        role="Accessibility Lead, GovTech"
        avatar="https://i.pravatar.cc/80?img=41"
        rating=${5}
      ></dk-testimonial-card>
    </dk-section-testimonials-masonry>
  `,
};

export const Dark: Story = {
  render: () => html`
    <dk-section-testimonials-dark headline="Trusted by Industry Leaders" subheadline="Teams worldwide rely on DesignKit to ship faster and more consistently.">
      <dk-testimonial-card
        quote="The dark mode support is first-class. One token swap and the entire UI adapts flawlessly — no edge cases."
        author="Viktor Holm"
        role="Design Systems Lead, Nightowl"
        avatar="https://i.pravatar.cc/80?img=18"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="We replaced three separate libraries with DesignKit. Fewer dependencies, fewer conflicts, better consistency."
        author="Chloe Marchetti"
        role="CTO, Streamline"
        avatar="https://i.pravatar.cc/80?img=31"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="The slot-based composition model is genius. Our designers can prototype layouts without writing any JavaScript."
        author="Ravi Krishnan"
        role="Head of Product, Canopy"
        avatar="https://i.pravatar.cc/80?img=53"
        rating=${4}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Went from zero to production dashboard in under a week. The data table component alone saved us a month of work."
        author="Ingrid Bergstrom"
        role="Fullstack Developer, Polaris"
        avatar="https://i.pravatar.cc/80?img=45"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="SSR compatibility was seamless. No hydration mismatches, no flicker — it just works with our Astro site."
        author="Daniel Okafor"
        role="Staff Engineer, Keystone"
        avatar="https://i.pravatar.cc/80?img=62"
        rating=${5}
      ></dk-testimonial-card>
      <dk-testimonial-card
        quote="Best investment our frontend team made this year. Velocity is up and design review cycles dropped by half."
        author="Anna Petrov"
        role="Engineering Director, Helix"
        avatar="https://i.pravatar.cc/80?img=38"
        rating=${5}
      ></dk-testimonial-card>
    </dk-section-testimonials-dark>
  `,
};
