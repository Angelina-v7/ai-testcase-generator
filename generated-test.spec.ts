import { test, expect } from '@playwright/test';

test('Test login with valid credentials', async ({ page }) => {
  // Open the login page
  await page.goto('https://example.com/login');

  // Enter valid credentials and submit the form
  await page.fill('input[name=username]', 'testuser');
  await page.fill('input[name=password]', 'P@ssw0rd');
  await page.click('button[type=submit]');

  // Verify that user is redirected to the dashboard page
  await page.waitForNavigation();
  const url = page.url();
  expect(url).toBe('https://example.com/dashboard');

  // Optionally, you can verify a welcome message or user details on the dashboard page
  const welcomeMessage = await page.innerText('.welcome-message');
  expect(welcomeMessage).toContain('Welcome, testuser');
});