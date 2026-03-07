import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-gallery-grid.js';
import './dk-section-gallery-carousel.js';
import './dk-gallery-item.js';

const meta: Meta = {
  title: 'Sections/Gallery',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Grid: Story = {
  render: () => html`
    <dk-section-gallery-grid headline="Photo Gallery">
      <dk-gallery-item src="https://picsum.photos/seed/g1/600/450" alt="Photo 1" caption="Mountain landscape"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g2/600/450" alt="Photo 2" caption="Ocean sunset"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g3/600/450" alt="Photo 3" caption="City skyline"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g4/600/450" alt="Photo 4" caption="Forest trail"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g5/600/450" alt="Photo 5" caption="Desert dunes"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g6/600/450" alt="Photo 6" caption="Northern lights"></dk-gallery-item>
    </dk-section-gallery-grid>
  `,
};

export const Carousel: Story = {
  render: () => html`
    <dk-section-gallery-carousel headline="Featured Work">
      <dk-gallery-item src="https://picsum.photos/seed/c1/800/500" alt="Work 1" caption="Brand identity project"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/c2/800/500" alt="Work 2" caption="Web redesign"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/c3/800/500" alt="Work 3" caption="Mobile app UI"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/c4/800/500" alt="Work 4" caption="Dashboard design"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/c5/800/500" alt="Work 5" caption="E-commerce platform"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/c6/800/500" alt="Work 6" caption="SaaS analytics dashboard"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/c7/800/500" alt="Work 7" caption="Travel booking app"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/c8/800/500" alt="Work 8" caption="Real estate platform"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/c9/800/500" alt="Work 9" caption="Fitness tracker UI"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/c10/800/500" alt="Work 10" caption="Restaurant ordering system"></dk-gallery-item>
    </dk-section-gallery-carousel>
  `,
};
