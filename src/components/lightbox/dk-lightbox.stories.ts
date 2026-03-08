import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-lightbox.js';
import type { DkLightbox } from './dk-lightbox.js';

const meta: Meta = {
  title: 'Components/Lightbox',
  component: 'dk-lightbox',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <style>
      .lightbox-demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        padding: 2rem;
      }
      .lightbox-demo-grid img {
        width: 100%;
        aspect-ratio: 4/3;
        object-fit: cover;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .lightbox-demo-grid img:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      }
      .lightbox-demo-info {
        padding: 0 2rem;
        font-family: system-ui, sans-serif;
        color: #666;
        font-size: 0.875rem;
      }
    </style>
    <div class="lightbox-demo-info">
      <p>Click any image to open the lightbox. Navigate with arrow keys, swipe, scroll wheel, or the nav buttons.</p>
    </div>
    <div class="lightbox-demo-grid">
      ${[1,2,3,4,5,6,7,8].map(i => html`
        <img
          src="https://picsum.photos/seed/lb${i}/800/600"
          alt="Demo photo ${i}"
          @click=${(e: Event) => {
            const images = [1,2,3,4,5,6,7,8].map(n => ({
              src: `https://picsum.photos/seed/lb${n}/800/600`,
              alt: `Demo photo ${n}`,
              caption: `Photo ${n} of 8`,
            }));
            const lb = (e.target as HTMLElement).closest('.lightbox-demo-grid')
              ?.parentElement?.querySelector('dk-lightbox') as DkLightbox;
            lb?.open(images, i - 1);
          }}
        />
      `)}
    </div>
    <dk-lightbox></dk-lightbox>
  `,
};

export const SingleImage: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <p style="margin-bottom: 1rem; font-size: 14px; color: #666;">Click the image to view in lightbox (no nav buttons for single image).</p>
      <img
        src="https://picsum.photos/seed/single/800/600"
        alt="Single photo"
        style="width: 300px; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px; cursor: pointer;"
        @click=${(e: Event) => {
          const lb = (e.target as HTMLElement).parentElement?.querySelector('dk-lightbox') as DkLightbox;
          lb?.open([{ src: 'https://picsum.photos/seed/single/800/600', alt: 'Single photo', caption: 'A single image with no navigation' }], 0);
        }}
      />
      <dk-lightbox></dk-lightbox>
    </div>
  `,
};

export const WithCaptions: Story = {
  render: () => {
    const images = [
      { src: 'https://picsum.photos/seed/cap1/800/600', alt: 'Mountain', caption: 'Sunrise over the mountain range — captured at dawn' },
      { src: 'https://picsum.photos/seed/cap2/800/600', alt: 'Ocean', caption: 'Calm ocean waves along the Pacific coast' },
      { src: 'https://picsum.photos/seed/cap3/800/600', alt: 'Forest', caption: 'Ancient redwood forest in Northern California' },
      { src: 'https://picsum.photos/seed/cap4/800/600', alt: 'Desert', caption: 'Sand dunes at golden hour in the Sahara' },
    ];
    return html`
      <style>
        .caption-demo { display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; }
        .caption-demo img {
          width: 200px; aspect-ratio: 4/3; object-fit: cover;
          border-radius: 8px; cursor: pointer;
          transition: transform 0.2s ease;
        }
        .caption-demo img:hover { transform: scale(1.03); }
      </style>
      <p style="padding: 0 2rem; font-size: 14px; color: #666;">Each image has a caption displayed at the bottom of the lightbox.</p>
      <div class="caption-demo">
        ${images.map((img, i) => html`
          <img
            src=${img.src}
            alt=${img.alt}
            @click=${(e: Event) => {
              const lb = (e.target as HTMLElement).closest('.caption-demo')
                ?.parentElement?.querySelector('dk-lightbox') as DkLightbox;
              lb?.open(images, i);
            }}
          />
        `)}
      </div>
      <dk-lightbox></dk-lightbox>
    `;
  },
};

export const ProgrammaticControl: Story = {
  render: () => {
    const images = [
      { src: 'https://picsum.photos/seed/prog1/800/600', alt: 'Photo 1', caption: 'First image' },
      { src: 'https://picsum.photos/seed/prog2/800/600', alt: 'Photo 2', caption: 'Second image' },
      { src: 'https://picsum.photos/seed/prog3/800/600', alt: 'Photo 3', caption: 'Third image' },
    ];
    return html`
      <div style="padding: 2rem;">
        <p style="margin-bottom: 1rem; font-size: 14px; color: #666;">
          Use <code>open(images, startIndex)</code> and <code>close()</code> methods to control the lightbox programmatically.
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button
            style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 8px; background: white; cursor: pointer;"
            @click=${(e: Event) => {
              const lb = (e.target as HTMLElement).closest('div[style]')?.parentElement?.querySelector('dk-lightbox') as DkLightbox;
              lb?.open(images, 0);
            }}
          >Open at image 1</button>
          <button
            style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 8px; background: white; cursor: pointer;"
            @click=${(e: Event) => {
              const lb = (e.target as HTMLElement).closest('div[style]')?.parentElement?.querySelector('dk-lightbox') as DkLightbox;
              lb?.open(images, 1);
            }}
          >Open at image 2</button>
          <button
            style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 8px; background: white; cursor: pointer;"
            @click=${(e: Event) => {
              const lb = (e.target as HTMLElement).closest('div[style]')?.parentElement?.querySelector('dk-lightbox') as DkLightbox;
              lb?.open(images, 2);
            }}
          >Open at image 3</button>
        </div>
        <dk-lightbox></dk-lightbox>
      </div>
    `;
  },
};
