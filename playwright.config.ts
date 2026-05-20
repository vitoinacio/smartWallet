import { defineConfig, devices } from '@playwright/test'

const isCI = process.env.CI === 'true'

const CHROME_PATH = 'C:\\Users\\victor.oliveira\\AppData\\Local\\ms-playwright\\chromium-148\\chromium-win64\\chrome.exe'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    launchOptions: {
      executablePath: isCI ? undefined : CHROME_PATH,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: isCI ? undefined : { executablePath: CHROME_PATH },
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !isCI,
    timeout: 120000,
  },
})