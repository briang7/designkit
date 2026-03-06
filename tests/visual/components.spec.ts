import { test, expect } from '@playwright/test';

const components = [
  { name: 'Button', story: 'components-button--variants' },
  { name: 'Badge', story: 'components-badge--variants' },
  { name: 'Avatar', story: 'components-avatar--default' },
  { name: 'Input', story: 'components-input--default' },
  { name: 'Checkbox', story: 'components-checkbox--default' },
  { name: 'Switch', story: 'components-switch--default' },
  { name: 'Select', story: 'components-select--default' },
  { name: 'Card', story: 'components-card--default' },
  { name: 'Tooltip', story: 'components-tooltip--default' },
  { name: 'Tabs', story: 'components-tabs--default' },
  { name: 'Dialog', story: 'components-dialog--default' },
  { name: 'DataTable', story: 'components-datatable--default' },
];

for (const { name, story } of components) {
  test(`${name} visual regression`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story}&viewMode=story`);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#storybook-root')).toHaveScreenshot(`${name}.png`);
  });
}
