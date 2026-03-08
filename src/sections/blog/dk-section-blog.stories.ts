import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dk-blog-card.js';
import './dk-section-blog-grid.js';
import './dk-section-blog-featured.js';

const meta: Meta = {
  title: 'Sections/Blog',
  component: 'dk-section-blog-grid',
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
    bg: { control: 'select', options: ['primary', 'alt', 'brand', 'dark'] },
  },
  args: {
    headline: 'From the Blog',
    subheadline: 'Insights, tutorials, and updates from our team.',
    bg: 'primary',
  },
};

export default meta;
type Story = StoryObj;

export const Grid: Story = {
  render: (args) => html`
    <dk-section-blog-grid
      headline=${args.headline}
      subheadline=${args.subheadline}
      bg=${args.bg}
    >
      <dk-blog-card
        image="https://picsum.photos/seed/blog1/800/400"
        category="Engineering"
        title="Building Accessible Web Components with Lit"
        description="Learn how to create web components that work for everyone, including keyboard navigation, ARIA attributes, and screen reader support."
        author="Sarah Chen"
        date="Mar 5, 2026"
        href="#"
      ></dk-blog-card>
      <dk-blog-card
        image="https://picsum.photos/seed/blog2/800/400"
        category="Design"
        title="Design Tokens: The Bridge Between Design and Code"
        description="How CSS custom properties power DesignKit's theming system and why design tokens matter for scalable design systems."
        author="Marcus Rivera"
        date="Mar 2, 2026"
        href="#"
      ></dk-blog-card>
      <dk-blog-card
        image="https://picsum.photos/seed/blog3/800/400"
        category="Tutorial"
        title="Getting Started with DesignKit in 5 Minutes"
        description="A quick-start guide to installing, configuring, and using DesignKit components in any framework or vanilla HTML project."
        author="Aisha Patel"
        date="Feb 28, 2026"
        href="#"
      ></dk-blog-card>
    </dk-section-blog-grid>
  `,
};

export const GridSixCards: Story = {
  name: 'Grid (6 Cards)',
  args: {
    headline: 'Latest Articles',
    subheadline: 'Stay up to date with the latest from our engineering and design teams.',
  },
  render: (args) => html`
    <dk-section-blog-grid
      headline=${args.headline}
      subheadline=${args.subheadline}
      bg=${args.bg}
    >
      <dk-blog-card
        image="https://picsum.photos/seed/blog4/800/400"
        category="Engineering"
        title="Web Components vs React: A Practical Comparison"
        description="We compare developer experience, performance, and interoperability between Web Components and React in real-world scenarios."
        author="Sarah Chen"
        date="Mar 6, 2026"
        href="#"
      ></dk-blog-card>
      <dk-blog-card
        image="https://picsum.photos/seed/blog5/800/400"
        category="Release"
        title="DesignKit v2.0: What's New"
        description="Announcing DesignKit v2.0 with new data-table, toast notifications, and a completely revamped theming engine."
        author="Marcus Rivera"
        date="Mar 4, 2026"
        href="#"
      ></dk-blog-card>
      <dk-blog-card
        image="https://picsum.photos/seed/blog6/800/400"
        category="Design"
        title="Color Systems That Scale"
        description="How we built a color system that adapts from light to dark mode while maintaining accessibility contrast ratios."
        author="Aisha Patel"
        date="Mar 1, 2026"
        href="#"
      ></dk-blog-card>
      <dk-blog-card
        image="https://picsum.photos/seed/blog7/800/400"
        category="Tutorial"
        title="Custom Theming with CSS Custom Properties"
        description="A deep dive into overriding DesignKit's design tokens to match your brand identity in under 50 lines of CSS."
        author="James Nguyen"
        date="Feb 26, 2026"
        href="#"
      ></dk-blog-card>
      <dk-blog-card
        image="https://picsum.photos/seed/blog8/800/400"
        category="Community"
        title="Spotlight: How Acme Corp Uses DesignKit"
        description="A case study on how Acme Corp reduced their UI development time by 60% after adopting DesignKit across three product teams."
        author="Elena Vasquez"
        date="Feb 22, 2026"
        href="#"
      ></dk-blog-card>
      <dk-blog-card
        image="https://picsum.photos/seed/blog9/800/400"
        category="Engineering"
        title="Performance Budgets for Component Libraries"
        description="How we keep DesignKit under 15KB gzipped and the techniques we use to measure and optimize bundle size."
        author="Sarah Chen"
        date="Feb 18, 2026"
        href="#"
      ></dk-blog-card>
    </dk-section-blog-grid>
  `,
};

export const Featured: Story = {
  render: (args) => html`
    <dk-section-blog-featured
      headline=${args.headline}
      subheadline=${args.subheadline}
      bg=${args.bg}
    >
      <dk-blog-card
        slot="featured"
        image="https://picsum.photos/seed/blog-feat/800/500"
        category="Featured"
        title="The Future of Framework-Agnostic Design Systems"
        description="Why Web Components are becoming the standard for enterprise design systems, and how DesignKit is leading the charge with Lit 3, CSS custom properties, and first-class accessibility support."
        author="Sarah Chen"
        date="Mar 7, 2026"
        href="#"
      ></dk-blog-card>
      <dk-blog-card
        image="https://picsum.photos/seed/blog-side1/800/400"
        category="Tutorial"
        title="Server-Side Rendering with Web Components"
        description="Techniques for SSR-compatible shadow DOM and declarative shadow DOM support."
        author="Marcus Rivera"
        date="Mar 5, 2026"
        href="#"
      ></dk-blog-card>
      <dk-blog-card
        image="https://picsum.photos/seed/blog-side2/800/400"
        category="Release"
        title="Introducing dk-data-table"
        description="Sort, filter, paginate, and customize — our new data table component is here."
        author="Aisha Patel"
        date="Mar 3, 2026"
        href="#"
      ></dk-blog-card>
    </dk-section-blog-featured>
  `,
};

export const DarkBackground: Story = {
  name: 'Grid (Dark Background)',
  args: {
    bg: 'dark',
  },
  render: (args) => html`
    <dk-section-blog-grid
      headline=${args.headline}
      subheadline=${args.subheadline}
      bg=${args.bg}
    >
      <dk-blog-card
        image="https://picsum.photos/seed/blog-d1/800/400"
        category="Engineering"
        title="Shadow DOM Styling Strategies"
        description="Three approaches to styling web components: CSS custom properties, ::part selectors, and adoptable stylesheets."
        author="Sarah Chen"
        date="Mar 5, 2026"
        href="#"
      ></dk-blog-card>
      <dk-blog-card
        image="https://picsum.photos/seed/blog-d2/800/400"
        category="Design"
        title="Motion Design in Component Libraries"
        description="How to add meaningful animation while respecting prefers-reduced-motion and keeping bundles small."
        author="Marcus Rivera"
        date="Mar 2, 2026"
        href="#"
      ></dk-blog-card>
      <dk-blog-card
        image="https://picsum.photos/seed/blog-d3/800/400"
        category="Tutorial"
        title="Testing Web Components with Open WC"
        description="A practical guide to unit testing Lit components with @open-wc/testing and @web/test-runner."
        author="Aisha Patel"
        date="Feb 28, 2026"
        href="#"
      ></dk-blog-card>
    </dk-section-blog-grid>
  `,
};
