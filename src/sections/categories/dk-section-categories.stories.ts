import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-categories-grid.js';
import './dk-section-categories-scroll.js';
import './dk-category-card.js';

const meta: Meta = {
  title: 'Sections/Categories',
  component: 'dk-section-categories-grid',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
  },
  args: {
    headline: 'Shop by Category',
    subheadline: 'Browse our curated collections to find exactly what you need.',
  },
};

export default meta;
type Story = StoryObj;

export const Grid: Story = {
  render: (args) => html`
    <dk-section-categories-grid headline=${args.headline} subheadline=${args.subheadline}>
      <dk-category-card
        image="https://picsum.photos/seed/cat-electronics/600/400"
        name="Electronics"
        description="Phones, laptops, and gadgets"
        count=${128}
        href="#electronics"
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-fashion/600/400"
        name="Fashion"
        description="Clothing and accessories"
        count=${256}
        href="#fashion"
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-home/600/400"
        name="Home & Garden"
        description="Furniture and decor"
        count=${94}
        href="#home"
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-sports/600/400"
        name="Sports"
        description="Gear and equipment"
        count=${73}
        href="#sports"
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-books/600/400"
        name="Books"
        description="Fiction, non-fiction, and more"
        count=${412}
        href="#books"
      ></dk-category-card>
    </dk-section-categories-grid>
  `,
};

export const GridFourColumns: Story = {
  name: 'Grid (4 Columns)',
  render: (args) => html`
    <dk-section-categories-grid headline=${args.headline} subheadline=${args.subheadline} columns=${4}>
      <dk-category-card
        image="https://picsum.photos/seed/cat-travel/600/400"
        name="Travel"
        description="Luggage and accessories"
        count=${52}
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-beauty/600/400"
        name="Beauty"
        description="Skincare and makeup"
        count=${189}
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-toys/600/400"
        name="Toys"
        description="Games and puzzles"
        count=${67}
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-food/600/400"
        name="Food & Drink"
        description="Gourmet and specialty"
        count=${145}
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-auto/600/400"
        name="Automotive"
        description="Parts and accessories"
        count=${38}
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-music/600/400"
        name="Music"
        description="Instruments and gear"
        count=${91}
      ></dk-category-card>
    </dk-section-categories-grid>
  `,
};

export const GridDarkBg: Story = {
  name: 'Grid (Dark Background)',
  render: () => html`
    <dk-section-categories-grid
      headline="Explore Categories"
      subheadline="Find your next favorite product."
      bg="dark"
    >
      <dk-category-card
        image="https://picsum.photos/seed/cat-tech/600/400"
        name="Technology"
        count=${210}
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-art/600/400"
        name="Art & Design"
        count=${78}
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-fitness/600/400"
        name="Fitness"
        count=${56}
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-pets/600/400"
        name="Pets"
        count=${34}
      ></dk-category-card>
    </dk-section-categories-grid>
  `,
};

export const Scroll: Story = {
  render: (args) => html`
    <dk-section-categories-scroll headline=${args.headline} subheadline=${args.subheadline}>
      <dk-category-card
        image="https://picsum.photos/seed/cat-nature/600/400"
        name="Nature"
        description="Outdoor and adventure"
        count=${63}
        href="#nature"
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-architecture/600/400"
        name="Architecture"
        description="Modern and classic designs"
        count=${47}
        href="#architecture"
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-photography/600/400"
        name="Photography"
        description="Cameras and lenses"
        count=${82}
        href="#photography"
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-cooking/600/400"
        name="Cooking"
        description="Kitchen tools and recipes"
        count=${115}
        href="#cooking"
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-wellness/600/400"
        name="Wellness"
        description="Health and mindfulness"
        count=${39}
        href="#wellness"
      ></dk-category-card>
      <dk-category-card
        image="https://picsum.photos/seed/cat-crafts/600/400"
        name="Crafts"
        description="DIY and handmade"
        count=${71}
        href="#crafts"
      ></dk-category-card>
    </dk-section-categories-scroll>
  `,
};
