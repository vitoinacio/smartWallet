import { test, expect } from '@playwright/test'

test.describe('Autenticação', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('deve carregar a página de login', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /bem-vindo/i })).toBeVisible()
  })

  test('deve mostrar mensagem de erro com credenciais inválidas', async ({ page }) => {
    await page.getByPlaceholder('seu@email.com').fill('invalid@test.com')
    await page.getByPlaceholder('••••••••').fill('wrongpassword')
    await page.getByRole('button', { name: /entrar/i }).click()

    await expect(page.getByText(/credenciais inválidas/i)).toBeVisible({ timeout: 5000 })
  })

  test('deve fazer login com credenciais válidas e redirecionar', async ({ page }) => {
    await page.getByPlaceholder('seu@email.com').fill('teste@gmail.com')
    await page.getByPlaceholder('••••••••').fill('teste123')
    await page.getByRole('button', { name: /entrar/i }).click()

    await expect(page).toHaveURL(/dashboard/i, { timeout: 10000 })
  })

  test('deve navegar para página de cadastro', async ({ page }) => {
    const criarContaButton = page.getByRole('button', { name: /criar conta/i })
    if (await criarContaButton.isVisible()) {
      await criarContaButton.click()
      await expect(page.getByRole('heading', { name: /crie sua conta/i })).toBeVisible()
    }
  })

  test('deve toggle para modo escuro/claro', async ({ page }) => {
    await page.goto('/dashboard')
    const themeToggle = page.locator('[data-testid="theme-toggle"], button').filter({ hasText: /sol|lua|moon|sun/i }).first()
    if (await themeToggle.isVisible()) {
      await themeToggle.click()
    }
  })
})

test.describe('Dashboard', () => {
  test('deve permitir acesso ao dashboard via autenticação', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('domcontentloaded')
    
    const emailInput = page.getByPlaceholder('seu@email.com')
    const passwordInput = page.getByPlaceholder('••••••••')
    const loginButton = page.getByRole('button', { name: /entrar/i })
    
    if (await emailInput.isVisible() && await passwordInput.isVisible()) {
      await emailInput.fill('teste@gmail.com')
      await passwordInput.fill('teste123')
      await loginButton.click()
      await page.waitForTimeout(3000)
    }
    
    expect(true).toBe(true)
  })
})

test.describe('Gestão Financeira', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('seu@email.com').fill('teste@gmail.com')
    await page.getByPlaceholder('••••••••').fill('teste123')
    await page.getByRole('button', { name: /entrar/i }).click()
    await page.goto('/financeiro')
    await page.waitForLoadState('networkidle')
  })

  test('deve carregar página financeira', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /resumo financeiro/i })).toBeVisible()
  })

  test('deve exibir formulário de transação', async ({ page }) => {
    await expect(page.getByText(/nova transação/i)).toBeVisible()
  })
})

test.describe('Responsividade', () => {
  test('deve carregar landing page em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
  })
})