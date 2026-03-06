import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/visual',
  use: {
    baseURL: 'http://localhost:6006',
    browserName: 'chromium',
  },
  webServer: {
    command: 'npm run storybook -- --no-open',
    port: 6006,
    reuseExistingServer: true,
  },
  snapshotDir: 'tests/visual/__snapshots__',
});
