import { test, expect } from '@playwright/test';

test.skip('Bypass authentication by embedding the credentials in the URL (deprecated)', async ({ page }) => {
  await page.goto('https://the-internet-5chk.onrender.com/basic_auth');
});

test('Bypass authentication using Base64', async ({ page }) => {
  const username = process.env.PRACTICE_USERNAME;
  const password = process.env.PRACTICE_PASSWORD;

  const encodedCredential = Buffer
    .from(`${username}:${password}`)
    .toString('base64');

  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${encodedCredential}`
  });

  await page.goto('https://the-internet-5chk.onrender.com/basic_auth');

  await expect(page.locator('p')).toContainText('Congratulations');
});