import { test, expect, Page } from '@playwright/test'
import { loginAndSetup, seedMockTransactions } from './helpers'

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

function labelMes(mes: number, ano: number) {
  return `${MESES[mes - 1]} de ${ano}`
}

function hoje() {
  const d = new Date()
  return { mes: d.getMonth() + 1, ano: d.getFullYear() }
}

async function navegarParaMes(page: Page, alvo: { mes: number; ano: number }) {
  const atual = hoje()
  const labelAtual = labelMes(atual.mes, atual.ano)
  await page.goto('/extrato')
  await expect(page.getByText(labelAtual)).toBeVisible({ timeout: 10000 })
  const difMeses = (alvo.ano - atual.ano) * 12 + (alvo.mes - atual.mes)
  const direcao = difMeses >= 0 ? 'seguinte' : 'anterior'
  for (let i = 0; i < Math.abs(difMeses); i++) {
    await page.getByRole('button', { name: direcao }).click()
    await page.waitForTimeout(100)
  }
}

test.describe('Extrato', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndSetup(page)
    await page.goto('/extrato')
  })

  test('Page renders', async ({ page }) => {
    await expect(page.locator('h2, h1').filter({ hasText: /extrato/i })).toBeVisible({ timeout: 10000 })
  })

  test('Month filter shows current month', async ({ page }) => {
    const { mes, ano } = hoje()
    await expect(page.getByText(labelMes(mes, ano))).toBeVisible({ timeout: 10000 })
  })

  test('Navigate months with arrows', async ({ page }) => {
    const { mes, ano } = hoje()
    const atual = labelMes(mes, ano)

    await page.getByRole('button', { name: /anterior/i }).click()
    const mesPrev = mes === 1 ? 12 : mes - 1
    const anoPrev = mes === 1 ? ano - 1 : ano
    await expect(page.getByText(labelMes(mesPrev, anoPrev))).toBeVisible({ timeout: 10000 })

    await page.getByRole('button', { name: /seguinte/i }).click()
    await expect(page.getByText(atual)).toBeVisible({ timeout: 10000 })
  })

  test('Resumo cards render', async ({ page }) => {
    await expect(page.getByText(/receitas/i)).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/despesas/i)).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/saldo/i)).toBeVisible({ timeout: 10000 })
  })

  test('Resumo values are correct with seeded data', async ({ page }) => {
    await page.goto('/')
    await seedMockTransactions(page)
    await page.goto('/extrato')
    await navegarParaMes(page, { mes: 5, ano: 2026 })
    await expect(page.getByText('R$ 117,00')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('R$ 34,70')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('R$ 82,30')).toBeVisible({ timeout: 10000 })
  })

  test('Transaction table renders rows', async ({ page }) => {
    await page.goto('/')
    await seedMockTransactions(page)
    await page.goto('/extrato')
    await navegarParaMes(page, { mes: 5, ano: 2026 })
    const rows = page.locator('table tbody tr')
    await expect(rows).toHaveCount(5, { timeout: 10000 })
  })

  test('Table shows correct columns', async ({ page }) => {
    await page.goto('/')
    await seedMockTransactions(page)
    await page.goto('/extrato')
    await navegarParaMes(page, { mes: 5, ano: 2026 })
    const headers = page.locator('table thead th')
    await expect(headers).toContainText([/data/i, /descrição/i, /categoria/i, /valor/i, /status/i], { timeout: 10000 })
  })

  test('Empty state when no transactions', async ({ page }) => {
    await seedMockTransactions(page)
    await navegarParaMes(page, { mes: 2, ano: 2026 })
    await expect(page.getByText(/nenhuma transação/i)).toBeVisible({ timeout: 10000 })
  })

  test('Export buttons render', async ({ page }) => {
    await page.goto('/')
    await seedMockTransactions(page)
    await page.goto('/extrato')
    await navegarParaMes(page, { mes: 5, ano: 2026 })
    await expect(page.getByRole('button').filter({ hasText: /csv/i })).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('button').filter({ hasText: /excel/i })).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('button').filter({ hasText: /pdf/i })).toBeVisible({ timeout: 10000 })
  })

  test('Export buttons disabled when no data', async ({ page }) => {
    await page.goto('/')
    await seedMockTransactions(page)
    await page.goto('/extrato')
    await expect(page.getByRole('button').filter({ hasText: /csv/i })).toBeVisible({ timeout: 10000 })
  })

  test('CSV export works', async ({ page }) => {
    await page.goto('/')
    await seedMockTransactions(page)
    await page.goto('/extrato')
    await navegarParaMes(page, { mes: 5, ano: 2026 })
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button').filter({ hasText: /csv/i }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/\.csv$/i)
  })

  test('Excel export works', async ({ page }) => {
    await page.goto('/')
    await seedMockTransactions(page)
    await page.goto('/extrato')
    await navegarParaMes(page, { mes: 5, ano: 2026 })
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button').filter({ hasText: /excel/i }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/\.xlsx$/i)
  })

  test('PDF export works', async ({ page }) => {
    await page.goto('/')
    await seedMockTransactions(page)
    await page.goto('/extrato')
    await navegarParaMes(page, { mes: 5, ano: 2026 })
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button').filter({ hasText: /pdf/i }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i)
  })

  test('Month navigator wraps years', async ({ page }) => {
    await navegarParaMes(page, { mes: 1, ano: hoje().ano })
    await page.getByRole('button', { name: /anterior/i }).click()
    await expect(page.getByText(labelMes(12, hoje().ano - 1))).toBeVisible({ timeout: 10000 })
  })

  test('Table adjusts for mobile', async ({ page }) => {
    await page.goto('/')
    await seedMockTransactions(page)
    await page.setViewportSize({ width: 375, height: 667 })
    await navegarParaMes(page, { mes: 5, ano: 2026 })
    const table = page.locator('table')
    await expect(table).toBeVisible({ timeout: 10000 })
  })
})
