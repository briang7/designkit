import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-gallery-grid.js';
import './dk-section-gallery-carousel.js';
import './dk-section-gallery-masonry.js';
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

export const GridFourColumns: Story = {
  name: 'Grid (4 Columns)',
  render: () => html`
    <dk-section-gallery-grid headline="Photo Gallery" columns=${4}>
      <dk-gallery-item src="https://picsum.photos/seed/g4c1/600/450" alt="Photo 1" caption="Mountain sunrise"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g4c2/600/450" alt="Photo 2" caption="Coastal cliffs"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g4c3/600/450" alt="Photo 3" caption="Urban architecture"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g4c4/600/450" alt="Photo 4" caption="Autumn forest"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g4c5/600/450" alt="Photo 5" caption="Lake reflection"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g4c6/600/450" alt="Photo 6" caption="Flower field"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g4c7/600/450" alt="Photo 7" caption="Snowy peaks"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/g4c8/600/450" alt="Photo 8" caption="River valley"></dk-gallery-item>
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

export const Masonry: Story = {
  render: () => html`
    <dk-section-gallery-masonry headline="Creative Portfolio">
      <dk-gallery-item src="https://picsum.photos/seed/m1/600/400" alt="Project 1" caption="Brand identity"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/m2/600/800" alt="Project 2" caption="Editorial layout"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/m3/600/500" alt="Project 3" caption="Product photography"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/m4/600/700" alt="Project 4" caption="Illustration series"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/m5/600/450" alt="Project 5" caption="UI design system"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/m6/600/600" alt="Project 6" caption="Typography exploration"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/m7/600/500" alt="Project 7" caption="Motion graphics"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/m8/600/750" alt="Project 8" caption="Packaging design"></dk-gallery-item>
      <dk-gallery-item src="https://picsum.photos/seed/m9/600/400" alt="Project 9" caption="Icon set"></dk-gallery-item>
    </dk-section-gallery-masonry>
  `,
};

