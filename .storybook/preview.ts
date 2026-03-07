import type { Preview } from '@storybook/web-components';
import { withThemeByClassName } from '@storybook/addon-themes';

import '../src/themes/tokens.css';
import '../src/themes/light.css';
import '../src/themes/dark.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        Light: '',
        Dark: 'dk-dark',
      },
      defaultTheme: 'Light',
    }),
  ],
};

export default preview;
