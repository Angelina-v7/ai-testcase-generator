# Test info

- Name: Test login with valid credentials
- Location: C:\Users\Angelina\ai-testcase-generator\generated-test.spec.ts:3:5

# Error details

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name=username]')

    at C:\Users\Angelina\ai-testcase-generator\generated-test.spec.ts:8:14
```

# Page snapshot

```yaml
- heading "Example Domain" [level=1]
- paragraph: This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.
- paragraph:
  - link "More information...":
    - /url: https://www.iana.org/domains/example
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('Test login with valid credentials', async ({ page }) => {
   4 |   // Open the login page
   5 |   await page.goto('https://example.com/login');
   6 |
   7 |   // Enter valid credentials and submit the form
>  8 |   await page.fill('input[name=username]', 'testuser');
     |              ^ Error: page.fill: Test timeout of 30000ms exceeded.
   9 |   await page.fill('input[name=password]', 'P@ssw0rd');
  10 |   await page.click('button[type=submit]');
  11 |
  12 |   // Verify that user is redirected to the dashboard page
  13 |   await page.waitForNavigation();
  14 |   const url = page.url();
  15 |   expect(url).toBe('https://example.com/dashboard');
  16 |
  17 |   // Optionally, you can verify a welcome message or user details on the dashboard page
  18 |   const welcomeMessage = await page.innerText('.welcome-message');
  19 |   expect(welcomeMessage).toContain('Welcome, testuser');
  20 | });
```