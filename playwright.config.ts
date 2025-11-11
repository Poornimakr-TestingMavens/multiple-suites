import { defineConfig, devices} from '@playwright/test';
import path from 'path';
 
export default defineConfig({
  globalSetup: path.resolve(__dirname, 'global-setup.ts'),
 
/**
 * Read environment variables from file.
 * [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv)
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
 
/**
 * See [https://playwright.dev/docs/test-configuration](https://playwright.dev/docs/test-configuration).
 */
 
  testDir: 'testAssets/tests',
  snapshotDir: './.artifacts/snapshots',
  /* Run tests in files in parallel */
  fullyParallel: true,
 
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : undefined,
  /* Reporter to use. See [https://playwright.dev/docs/test-reporters](https://playwright.dev/docs/test-reporters) */
   reporter: [
 ['html', { open: 'always' }],
    ['list'],
    ['allure-playwright', {
      outputFolder: '.artifacts/allure-results',
      detail: false,
      suiteTitle: false,
      useCucumberStepReporter: false,
      useStepsForHooks: false
    }]
  ],
  /* Shared settings for all the projects below. See [https://playwright.dev/docs/api/class-testoptions](https://playwright.dev/docs/api/class-testoptions). */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
   
    /* Collect trace when retrying the failed test. See [https://playwright.dev/docs/trace-viewer](https://playwright.dev/docs/trace-viewer) */
    trace: 'on-first-retry',
    screenshot: 'on', // Attach screenshots automatically
    video: 'on',
    headless: true,
  },
 
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
 
    // Other browsers can be enabled if needed
  ],
 
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
 
 
});
 