import { test, expect } from '@playwright/test';

test('Bypass authentication using Base64', async ({ page }) => {
  const username = 'admin';
  const password = 'admin';

  const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${encodedCredentials}`,
  });

  await page.goto('https://the-internet-5chk.onrender.com/basic_auth');

  await expect(page.locator('p')).toContainText('Congratulations');
});