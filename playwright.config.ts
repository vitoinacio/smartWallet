import { defineConfig, devices } from '@playwright/test'

const CHROME_PATH = 'C:\\Users\\victor.oliveira\\AppData\\Local\\ms-playwright\\chromium-148\\chromium-win64\\chrome.exe'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    channel: undefined,
    launchOptions: {
      executablePath: CHROME_PATH,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: undefined },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})