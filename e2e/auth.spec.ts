import { test, expect } from '@playwright/test'
import { seedLocalStorage, completeOnboarding, TEST_USER } from './helpers'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
    await seedLocalStorage(page)
  })

  test('Home page renders login CTA', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')

    const entrarLink = page.locator('a[href="/login"]')
    await expect(entrarLink.first()).toBeVisible({ timeout: 10000 })
  })

  test('Login page renders', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('load')

    await expect(page.locator('h2').first()).toBeVisible({ timeout: 10000 })
    await expect(page.locator('input[type="email"]').first()).toBeVisible({ timeout: 10000 })
    await expect(page.locator('input[type="password"]').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/esqueceu a senha|forgot/i)).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('button').filter({ hasText: /entrar|sign.?in|acessar/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('Invalid credentials shows error', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('load')

    await page.locator('input[type="email"]').first().fill('wrong@email.com')
    await page.locator('input[type="password"]').first().fill('wrongpassword')
    await page.getByRole('button').filter({ hasText: /entrar|sign.?in|acessar/i }).first().click()

    await expect(page.getByText(/credenciais inválidas|invalid|erro|error/i)).toBeVisible({ timeout: 10000 })
  })

  test('Login with valid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('load')

    await page.locator('input[type="email"]').first().fill(TEST_USER.email)
    await page.locator('input[type="password"]').first().fill(TEST_USER.password)
    await page.getByRole('button').filter({ hasText: /entrar|sign.?in|acessar/i }).first().click()

    await expect(page).toHaveURL(/\/onboarding|\/dashboard/, { timeout: 15000 })
  })

  test('Forgot password link', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('load')

    await page.getByText(/esqueceu a senha|forgot/i).click()
    await expect(page).toHaveURL(/\/recuperar/, { timeout: 10000 })
  })

  test('Recuperar senha form', async ({ page }) => {
    await page.goto('/recuperar')
    await page.waitForLoadState('load')

    await expect(page.locator('h2').first()).toBeVisible({ timeout: 10000 })
    await expect(page.locator('input[type="email"]').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('button').filter({ hasText: /enviar|send/i }).first()).toBeVisible({ timeout: 10000 })
    await expect(page.locator('a[href="/login"]').first()).toBeVisible({ timeout: 10000 })
  })

  test('Recuperar senha success', async ({ page }) => {
    await page.goto('/recuperar')
    await page.waitForLoadState('load')

    await page.locator('input[type="email"]').first().fill(TEST_USER.email)
    await page.getByRole('button').filter({ hasText: /enviar|send/i }).first().click()

    await expect(page.getByText(/e.mail enviado|email sent/i)).toBeVisible({ timeout: 10000 })
  })

  test('Recuperar senha back to login', async ({ page }) => {
    await page.goto('/recuperar')
    await page.waitForLoadState('load')

    await page.locator('a[href="/login"]').first().click()
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 })
  })

  test('Cadastro page', async ({ page }) => {
    await page.goto('/criar')
    await page.waitForLoadState('load')

    await expect(page.locator('input[type="email"]').first()).toBeVisible({ timeout: 10000 })
    await expect(page.locator('input[type="password"]').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('button').filter({ hasText: /criar|create/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('AuthRedirect', async ({ page }) => {
    await page.evaluate(() => {
      sessionStorage.setItem('UserProvider', 'teste@gmail.com')
    })
    await completeOnboarding(page)

    await page.goto('/login')
    await page.waitForLoadState('load')

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 })
  })

  test('Logout', async ({ page }) => {
    await page.evaluate(() => {
      sessionStorage.setItem('UserProvider', 'teste@gmail.com')
    })
    await completeOnboarding(page)

    await page.goto('/settings')
    await page.waitForLoadState('load')

    const sairButton = page.getByRole('button').filter({ hasText: /sair|logout|sign.?out/i })
    await expect(sairButton.first()).toBeVisible({ timeout: 10000 })
    await sairButton.first().click()

    const confirmButtons = page.getByRole('button').filter({ hasText: /^sair$|^sim$|confirm|logout/i })
    await expect(confirmButtons.first()).toBeVisible({ timeout: 10000 })
    await confirmButtons.first().click()

    await expect(page).toHaveURL(/\//, { timeout: 10000 })
  })
})
