import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-section-products-grid.js';
import './dk-section-products-carousel.js';
import './dk-product-card.js';

const meta: Meta = {
  title: 'Sections/Products',
  component: 'dk-section-products-grid',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
  },
  args: {
    headline: 'Featured Products',
    subheadline: 'Handpicked items our customers love.',
  },
};

export default meta;
type Story = StoryObj;

const sampleProducts = html`
  <dk-product-card
    image="https://picsum.photos/seed/prod1/400/300"
    name="Minimalist Watch"
    price="$149.00"
    original-price="$199.00"
    badge="Sale"
    rating="4.5"
    description="Sleek stainless steel timepiece with sapphire crystal glass and leather strap."
  >
    <button slot="cta" style="width:100%;padding:0.625rem 1rem;border:none;border-radius:0.5rem;background:#3b82f6;color:#fff;font-weight:600;cursor:pointer;">Add to Cart</button>
  </dk-product-card>
  <dk-product-card
    image="https://picsum.photos/seed/prod2/400/300"
    name="Wireless Headphones"
    price="$79.99"
    rating="4"
    description="Active noise cancelling with 30-hour battery life and premium drivers."
  >
    <button slot="cta" style="width:100%;padding:0.625rem 1rem;border:none;border-radius:0.5rem;background:#3b82f6;color:#fff;font-weight:600;cursor:pointer;">Add to Cart</button>
  </dk-product-card>
  <dk-product-card
    image="https://picsum.photos/seed/prod3/400/300"
    name="Canvas Backpack"
    price="$59.00"
    badge="New"
    rating="5"
    description="Water-resistant waxed canvas with padded laptop compartment and brass hardware."
  >
    <button slot="cta" style="width:100%;padding:0.625rem 1rem;border:none;border-radius:0.5rem;background:#3b82f6;color:#fff;font-weight:600;cursor:pointer;">Add to Cart</button>
  </dk-product-card>
  <dk-product-card
    image="https://picsum.photos/seed/prod4/400/300"
    name="Ceramic Mug Set"
    price="$34.00"
    rating="4.5"
    description="Hand-glazed stoneware set of four in earthy tones. Microwave and dishwasher safe."
  >
    <button slot="cta" style="width:100%;padding:0.625rem 1rem;border:none;border-radius:0.5rem;background:#3b82f6;color:#fff;font-weight:600;cursor:pointer;">Add to Cart</button>
  </dk-product-card>
  <dk-product-card
    image="https://picsum.photos/seed/prod5/400/300"
    name="Desk Lamp"
    price="$89.00"
    original-price="$120.00"
    badge="Sale"
    rating="3.5"
    description="Adjustable LED lamp with wireless charging base and touch dimmer control."
  >
    <button slot="cta" style="width:100%;padding:0.625rem 1rem;border:none;border-radius:0.5rem;background:#3b82f6;color:#fff;font-weight:600;cursor:pointer;">Add to Cart</button>
  </dk-product-card>
  <dk-product-card
    image="https://picsum.photos/seed/prod6/400/300"
    name="Leather Wallet"
    price="$45.00"
    rating="4"
    description="Full-grain leather bifold with RFID blocking and coin pocket."
  >
    <button slot="cta" style="width:100%;padding:0.625rem 1rem;border:none;border-radius:0.5rem;background:#3b82f6;color:#fff;font-weight:600;cursor:pointer;">Add to Cart</button>
  </dk-product-card>
`;

export const Grid: Story = {
  render: (args) => html`
    <dk-section-products-grid
      headline=${args.headline}
      subheadline=${args.subheadline}
      columns="3"
    >
      ${sampleProducts}
    </dk-section-products-grid>
  `,
};

export const GridFourColumns: Story = {
  name: 'Grid (4 Columns)',
  render: (args) => html`
    <dk-section-products-grid
      headline=${args.headline}
      subheadline=${args.subheadline}
    >
      ${sampleProducts}
    </dk-section-products-grid>
  `,
};

export const GridDarkBackground: Story = {
  name: 'Grid (Dark Background)',
  render: (args) => html`
    <dk-section-products-grid
      headline=${args.headline}
      subheadline=${args.subheadline}
      bg="dark"
      columns="3"
    >
      ${sampleProducts}
    </dk-section-products-grid>
  `,
};

export const Carousel: Story = {
  render: (args) => html`
    <dk-section-products-carousel
      headline=${args.headline}
      subheadline=${args.subheadline}
    >
      ${sampleProducts}
    </dk-section-products-carousel>
  `,
};

export const CarouselBrandBackground: Story = {
  name: 'Carousel (Brand Background)',
  render: (args) => html`
    <dk-section-products-carousel
      headline="Top Sellers"
      subheadline="Our most popular items this season."
      bg="brand"
    >
      ${sampleProducts}
    </dk-section-products-carousel>
  `,
};
