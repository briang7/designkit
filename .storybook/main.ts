import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.ts',
    '../docs/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  staticDirs: ['../src/themes'],
};

export default config;
