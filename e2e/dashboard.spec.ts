import { test, expect } from '@playwright/test'
import { loginAndSetup, seedMockTransactions } from './helpers'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndSetup(page)
  })

  test('Dashboard title renders', async ({ page }) => {
    await expect(page.locator('h2, h1, h3').filter({ hasText: /visão geral/i })).toBeVisible({ timeout: 10000 })
  })

  test('SaudacaoUsuario shows greeting', async ({ page }) => {
    await expect(page.getByText('Usuário').first()).toBeVisible({ timeout: 10000 })
  })

  test('SaudacaoUsuario shows current date', async ({ page }) => {
    const hoje = new Date()
    const dataFormatada = hoje.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    await expect(page.getByText(dataFormatada, { exact: false })).toBeVisible({ timeout: 10000 })
  })

  test('ResumoFinanceiro cards rendered', async ({ page }) => {
    await expect(page.getByText('Entrada Mensal')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Total Gasto')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Saldo Restante')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Orçamento Usado')).toBeVisible({ timeout: 10000 })
  })

  test('EntradaEditor shows current value', async ({ page }) => {
    await expect(page.getByText('Minha Renda Mensal')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/valor mensal informado/i)).toBeVisible({ timeout: 10000 })
  })

  test('EntradaEditor edit mode', async ({ page }) => {
    const editBtn = page.getByText('Minha Renda Mensal')
      .locator('..').locator('..')
      .locator('button').filter({ has: page.locator('svg.lucide-pencil') })
    await editBtn.click()
    await page.waitForTimeout(500)
    await expect(page.getByPlaceholder('0,00')).toBeVisible({ timeout: 10000 })
    const cancelBtn = page.locator('button').filter({ has: page.locator('svg.lucide-x') }).first()
    await cancelBtn.click()
    await page.waitForTimeout(500)
  })

  test('AcoesRapidas renders 3 buttons', async ({ page }) => {
    await expect(page.getByText('Ações Rápidas')).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('link', { name: /adicionar despesa/i })).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('link', { name: /ver finanças/i })).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('link', { name: /configurações/i })).toBeVisible({ timeout: 10000 })
  })

  test('AcoesRapidas links navigate', async ({ page }) => {
    await page.getByRole('link', { name: /ver finanças/i }).first().click()
    await page.waitForURL(/\/financeiro/, { timeout: 10000 })
  })

  test('TransacoesRecentes shows empty or list', async ({ page }) => {
    await expect(page.getByText('Transações Recentes')).toBeVisible({ timeout: 10000 })
  })

  test('TransacoesRecentes "Ver todas" link', async ({ page }) => {
    await page.locator('a[href="/financeiro"]').filter({ hasText: /ver todas/i }).click()
    await page.waitForURL(/\/financeiro/, { timeout: 10000 })
  })

  test('GraficoRosca renders donut chart', async ({ page }) => {
    await expect(page.getByText('Despesas por Categoria')).toBeVisible({ timeout: 10000 })
  })

  test('GraficoBarras renders bar chart', async ({ page }) => {
    await expect(page.getByText('Receitas vs Despesas')).toBeVisible({ timeout: 10000 })
  })

  test('MetaDashboardCard renders', async ({ page }) => {
    await expect(page.getByText('Metas de Economia')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('a[href="/metas"]').first()).toBeVisible({ timeout: 10000 })
  })

  test('Dashboard with seeded data', async ({ page }) => {
    await seedMockTransactions(page)
    await page.reload()
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })
    await expect(page.getByText('Transações Recentes')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Salário').first()).toBeVisible({ timeout: 10000 })
  })

  test('Sidebar navigation from dashboard', async ({ page }) => {
    await page.getByText('Financeiro').first().click()
    await page.waitForURL(/\/financeiro/, { timeout: 10000 })
    await page.getByText('Dashboard').first().click()
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })
  })
})
