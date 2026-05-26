import { test, expect } from '@playwright/test'
import { loginAndSetup } from './helpers'

test.describe('Autenticação', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('deve carregar a página de login', async ({ page }) => {
    await expect(page.locator('h2, h1').filter({ hasText: /bem-vindo|welcome|welcome back/i })).toBeVisible({ timeout: 10000 })
  })

  test('deve mostrar mensagem de erro com credenciais inválidas', async ({ page }) => {
    await page.locator('input[type="email"]').fill('invalid@test.com')
    await page.locator('input[type="password"]').fill('wrongpassword')
    await page.getByRole('button').filter({ hasText: /entrar|sign.?in|acessar|login/i }).first().click()
    await expect(page.getByText(/credenciais inválidas|invalid|erro|error/i)).toBeVisible({ timeout: 10000 })
  })

  test('deve fazer login com credenciais válidas e redirecionar', async ({ page }) => {
    await page.locator('input[type="email"]').fill('teste@gmail.com')
    await page.locator('input[type="password"]').fill('teste123')
    await page.getByRole('button').filter({ hasText: /entrar|sign.?in|acessar|login/i }).first().click()
    await expect(page).toHaveURL(/dashboard|onboarding/i, { timeout: 10000 })
  })

  test('deve navegar para página de cadastro', async ({ page }) => {
    const criarContaButton = page.getByRole('button').filter({ hasText: /criar conta|create account/i })
    if (await criarContaButton.isVisible()) {
      await criarContaButton.click()
      await expect(page.locator('h2, h1').filter({ hasText: /crie sua conta|create your account|create account/i })).toBeVisible({ timeout: 10000 })
    }
  })
})

test.describe('Dashboard', () => {
  test('deve acessar dashboard via autenticação', async ({ page }) => {
    await loginAndSetup(page)
    await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 15000 })
    await expect(page.locator('body')).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Gestão Financeira', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndSetup(page)
    await page.goto('/financeiro')
    await page.waitForLoadState('load')
  })

  test('deve carregar página financeira', async ({ page }) => {
    await expect(page.locator('h2, h1').filter({ hasText: /resumo financeiro|financial summary|financeiro|finance/i })).toBeVisible({ timeout: 10000 })
  })

  test('deve exibir formulário de transação', async ({ page }) => {
    await expect(page.getByText(/nova transação|new transaction/i)).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Responsividade', () => {
  test('deve carregar landing page em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('load')
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 })
  })
})
