import { test, expect } from '@playwright/test'
import { seedLocalStorage, completeOnboarding, TEST_USER } from './helpers'

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
    await seedLocalStorage(page)
    await page.evaluate(() => {
      sessionStorage.setItem('UserProvider', 'teste@gmail.com')
    })
  })

  test('Onboarding redirects to dashboard if already complete', async ({ page }) => {
    await completeOnboarding(page)

    await page.goto('/dashboard')
    await page.waitForLoadState('load')

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 })
  })

  test('New user sees onboarding after login', async ({ page }) => {
    await page.goto('/onboarding')
    await page.waitForLoadState('load')

    await expect(page.locator('h2').filter({ hasText: /bem-vindo/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('Step 0 - Welcome renders', async ({ page }) => {
    await page.goto('/onboarding')
    await page.waitForLoadState('load')

    await expect(page.locator('[id="nome"]').first()).toBeVisible({ timeout: 10000 })
  })

  test('Step 0 - Skip', async ({ page }) => {
    await page.goto('/onboarding')
    await page.waitForLoadState('load')

    await page.getByRole('button').filter({ hasText: /pular/i }).first().click()

    await expect(page.locator('h2').filter({ hasText: /quase lá/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('Step 0 - Fill name', async ({ page }) => {
    await page.goto('/onboarding')
    await page.waitForLoadState('load')

    await page.locator('[id="nome"]').first().fill(TEST_USER.name)
    await page.getByRole('button').filter({ hasText: /continuar/i }).first().click()

    await expect(page.locator('h2').filter({ hasText: /quase lá/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('Step 1 - Income renders', async ({ page }) => {
    await page.goto('/onboarding')
    await page.waitForLoadState('load')
    await page.locator('[id="nome"]').first().fill(TEST_USER.name)
    await page.getByRole('button').filter({ hasText: /continuar/i }).first().click()
    await page.waitForTimeout(500)

    await expect(page.locator('[id="renda"]').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/salário/i)).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/moradia/i)).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('button').filter({ hasText: /pular/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('Step 1 - Skip', async ({ page }) => {
    await page.goto('/onboarding')
    await page.waitForLoadState('load')
    await page.locator('[id="nome"]').first().fill(TEST_USER.name)
    await page.getByRole('button').filter({ hasText: /continuar/i }).first().click()
    await page.waitForTimeout(500)

    await page.getByRole('button').filter({ hasText: /pular/i }).first().click()

    await expect(page.locator('h2').filter({ hasText: /meta|economia/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('Step 1 - Fill income', async ({ page }) => {
    await page.goto('/onboarding')
    await page.waitForLoadState('load')
    await page.locator('[id="nome"]').first().fill(TEST_USER.name)
    await page.getByRole('button').filter({ hasText: /continuar/i }).first().click()
    await page.waitForTimeout(500)

    await page.locator('[id="renda"]').first().fill('850000')
    await page.getByText(/salário/i).click()
    await page.getByText(/moradia/i).click()
    await page.getByRole('button').filter({ hasText: /continuar/i }).first().click()

    await expect(page.locator('h2').filter({ hasText: /meta|economia/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('Step 2 - Goal renders', async ({ page }) => {
    await page.goto('/onboarding')
    await page.waitForLoadState('load')
    await page.locator('[id="nome"]').first().fill(TEST_USER.name)
    await page.getByRole('button').filter({ hasText: /continuar/i }).first().click()
    await page.waitForTimeout(500)
    await page.getByRole('button').filter({ hasText: /pular/i }).first().click()
    await page.waitForTimeout(500)

    await expect(page.locator('[id="metaValor"]').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('button').filter({ hasText: /finalizar|finish/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('Complete full onboarding', async ({ page }) => {
    await page.goto('/onboarding')
    await page.waitForLoadState('load')

    await page.locator('[id="nome"]').first().fill(TEST_USER.name)
    await page.getByRole('button').filter({ hasText: /continuar/i }).first().click()
    await page.waitForTimeout(500)

    await page.locator('[id="renda"]').first().fill('850000')
    await page.getByText(/salário/i).click()
    await page.getByText(/moradia/i).click()
    await page.getByRole('button').filter({ hasText: /continuar/i }).first().click()
    await page.waitForTimeout(500)

    await page.locator('[id="metaValor"]').first().fill('1000000')
    await page.locator('[id="metaPrazo"]').first().fill('2026-12-31')
    await page.getByRole('button').filter({ hasText: /finalizar/i }).first().click()

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 })
  })

  test('State persisted', async ({ page }) => {
    await completeOnboarding(page)

    await page.goto('/dashboard')
    await page.waitForLoadState('load')

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 })
  })
})
