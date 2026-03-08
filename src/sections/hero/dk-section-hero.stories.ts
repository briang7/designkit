import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-hero-centered.js';
import './dk-section-hero-split.js';
import './dk-section-hero-background.js';
import './dk-section-hero-gradient.js';
import './dk-section-hero-minimal.js';
import './dk-section-hero-image-tiles.js';
import './dk-section-hero-video.js';
import '../../components/button/dk-button.js';

const meta: Meta = {
  title: 'Sections/Hero',
  component: 'dk-section-hero-centered',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
    badge: { control: 'text' },
  },
  args: {
    headline: 'Build Beautiful Interfaces Faster',
    subheadline: 'A modern design system built with Lit web components. Ship polished UIs in record time.',
    badge: 'New Release',
  },
};

export default meta;
type Story = StoryObj;

export const Centered: Story = {
  render: (args) => html`
    <dk-section-hero-centered
      headline=${args.headline}
      subheadline=${args.subheadline}
      badge=${args.badge}
    >
      <dk-button slot="cta-primary" variant="primary" size="lg">Get Started</dk-button>
      <dk-button slot="cta-secondary" variant="secondary" size="lg">View Docs</dk-button>
    </dk-section-hero-centered>
  `,
};

export const Split: Story = {
  render: () => html`
    <dk-section-hero-split
      headline="Design Systems Made Simple"
      subheadline="Drag, drop, and customize. Create stunning websites without writing a single line of CSS."
    >
      <dk-button slot="cta-primary" variant="primary" size="lg">Start Free Trial</dk-button>
      <dk-button slot="cta-secondary" variant="ghost" size="lg">Watch Demo</dk-button>
      <img
        slot="media"
        src="https://picsum.photos/seed/hero-split/600/400"
        alt="Hero illustration"
        style="width: 100%; border-radius: 12px;"
      />
    </dk-section-hero-split>
  `,
};

export const Background: Story = {
  render: () => html`
    <dk-section-hero-background
      headline="Launch Your Next Big Idea"
      subheadline="Everything you need to go from concept to production. Trusted by 10,000+ developers worldwide."
      image="https://placehold.co/1920x800/1e1b4b/ffffff?text=Background"
    >
      <dk-button slot="cta-primary" variant="primary" size="lg">Join Waitlist</dk-button>
      <dk-button slot="cta-secondary" variant="ghost" size="lg">Learn More</dk-button>
    </dk-section-hero-background>
  `,
};

export const Gradient: Story = {
  render: () => html`
    <dk-section-hero-gradient
      headline="Unleash Your Creativity"
      subheadline="A vibrant, animated gradient hero that captures attention instantly. Perfect for bold product launches."
      badge="Coming Soon"
    >
      <dk-button slot="cta-primary" variant="primary" size="lg">Get Early Access</dk-button>
      <dk-button slot="cta-secondary" variant="ghost" size="lg">See Features</dk-button>
    </dk-section-hero-gradient>
  `,
};

export const Minimal: Story = {
  render: () => html`
    <dk-section-hero-minimal
      headline="Less is More"
      subheadline="A clean, typography-focused hero with elegant serif type and a subtle scroll indicator."
    >
      <dk-button slot="cta-primary" variant="primary" size="lg">Explore</dk-button>
    </dk-section-hero-minimal>
  `,
};

export const ImageTiles: Story = {
  render: () => html`
    <dk-section-hero-image-tiles
      headline="Curate Your Collection"
      subheadline="Showcase multiple visuals in an asymmetric grid layout alongside compelling copy."
      badge="Portfolio"
    >
      <dk-button slot="cta-primary" variant="primary" size="lg">Browse Gallery</dk-button>
      <dk-button slot="cta-secondary" variant="secondary" size="lg">Upload Yours</dk-button>
      <img slot="image-1" src="https://picsum.photos/seed/tile1/400/500" alt="Tile 1" />
      <img slot="image-2" src="https://picsum.photos/seed/tile2/400/250" alt="Tile 2" />
      <img slot="image-3" src="https://picsum.photos/seed/tile3/400/500" alt="Tile 3" />
      <img slot="image-4" src="https://picsum.photos/seed/tile4/400/250" alt="Tile 4" />
    </dk-section-hero-image-tiles>
  `,
};

export const Video: Story = {
  render: () => html`
    <dk-section-hero-video
      headline="Experience in Motion"
      subheadline="A full-bleed background video hero with a dark overlay for maximum readability."
      badge="Live Demo"
      video-src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
    >
      <dk-button slot="cta-primary" variant="primary" size="lg">Play Reel</dk-button>
      <dk-button slot="cta-secondary" variant="ghost" size="lg">Read Case Study</dk-button>
    </dk-section-hero-video>
  `,
};
