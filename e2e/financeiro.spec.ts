import { test, expect } from '@playwright/test'
import { loginAndSetup, seedMockTransactions } from './helpers'

test.describe('Financeiro', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndSetup(page)
    await page.goto('/financeiro')
    await page.waitForURL(/\/financeiro/, { timeout: 10000 })
  })

  test('Financeiro page renders', async ({ page }) => {
    await expect(page.locator('h2, h1, h3').filter({ hasText: /resumo financeiro/i })).toBeVisible({ timeout: 10000 })
  })

  test('Resumo cards render', async ({ page }) => {
    await expect(page.getByText('Receitas').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Despesas').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Saldo').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Pendências').first()).toBeVisible({ timeout: 10000 })
  })

  test('TransacaoForm renders all fields', async ({ page }) => {
    await expect(page.getByText('Nova Transação')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Tipo')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Categoria').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByPlaceholder(/ex:/i)).toBeVisible({ timeout: 10000 })
    await expect(page.getByPlaceholder('0,00').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Adicionar Transação')).toBeVisible({ timeout: 10000 })
  })

  test('Create a despesa transaction', async ({ page }) => {
    await page.locator('button[role="combobox"]').nth(1).click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /despesa/i }).first().click()

    await page.locator('button[role="combobox"]').nth(2).click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /alimentação/i }).first().click()
    await page.waitForTimeout(300)

    await page.getByPlaceholder(/ex:/i).fill('Teste Despesa E2E')
    await page.getByPlaceholder('0,00').last().fill('15000')
    await page.locator('input[type="date"]').fill('2026-05-26')
    await page.getByText('Adicionar Transação').click()
    await page.waitForTimeout(1500)

    await expect(page.getByText('Teste Despesa E2E').first()).toBeVisible({ timeout: 10000 })
  })

  test('Verify new transaction in list', async ({ page }) => {
    await seedMockTransactions(page)
    await page.reload()
    await page.waitForURL(/\/financeiro/, { timeout: 10000 })
    await expect(page.getByText('Salário').first()).toBeVisible({ timeout: 10000 })
  })

  test('Create a receita transaction', async ({ page }) => {
    await page.locator('button[role="combobox"]').nth(1).click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /receita/i }).first().click()

    await page.locator('button[role="combobox"]').nth(2).click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /salário/i }).first().click()
    await page.waitForTimeout(300)

    await page.getByPlaceholder(/ex:/i).fill('Teste Receita E2E')
    await page.getByPlaceholder('0,00').last().fill('500000')
    await page.locator('input[type="date"]').fill('2026-05-26')
    await page.getByText('Adicionar Transação').click()
    await page.waitForTimeout(1500)

    await expect(page.getByText('Teste Receita E2E').first()).toBeVisible({ timeout: 10000 })
  })

  test('Create transaction with observacao', async ({ page }) => {
    await page.locator('button[role="combobox"]').nth(1).click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /despesa/i }).first().click()
    await page.waitForTimeout(300)

    await page.locator('button[role="combobox"]').nth(2).click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /alimentação/i }).first().click()
    await page.waitForTimeout(300)

    await page.getByPlaceholder(/ex:/i).fill('Teste Observacao E2E')
    await page.getByPlaceholder('0,00').last().fill('7500')
    await page.locator('input[type="date"]').fill('2026-05-26')
    await page.getByPlaceholder(/detalhes/i).fill('Pagamento mensal com observacao')
    await page.getByText('Adicionar Transação').click()
    await page.waitForTimeout(1500)

    await expect(page.getByText(/obs:/i)).toBeVisible({ timeout: 10000 })
  })

  test('Toggle tipo changes categoria options', async ({ page }) => {
    const tipoTrigger = page.locator('button[role="combobox"]').nth(1)
    const catTrigger = page.locator('button[role="combobox"]').nth(2)

    await tipoTrigger.click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /receita/i }).first().click()
    await page.waitForTimeout(300)

    await catTrigger.click()
    await page.waitForTimeout(500)
    await expect(page.locator('[role="option"]').filter({ hasText: /salário/i }).first()).toBeVisible({ timeout: 10000 })
    await expect(page.locator('[role="option"]').filter({ hasText: /freelance/i }).first()).toBeVisible({ timeout: 10000 })
    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)

    await tipoTrigger.click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /despesa/i }).first().click()
    await page.waitForTimeout(300)

    await catTrigger.click()
    await page.waitForTimeout(500)
    await expect(page.locator('[role="option"]').filter({ hasText: /alimentação/i }).first()).toBeVisible({ timeout: 10000 })
    await expect(page.locator('[role="option"]').filter({ hasText: /moradia/i }).first()).toBeVisible({ timeout: 10000 })
    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })

  test('Delete a transaction', async ({ page }) => {
    await seedMockTransactions(page)
    await page.reload()
    await page.waitForLoadState('load')

    await expect(page.getByText('Salário').first()).toBeVisible({ timeout: 10000 })
    const salarioCard = page.getByText('Salário').locator('xpath=ancestor::div[contains(@class, "rounded-xl")][1]')
    await salarioCard.locator('button').click()
    await page.waitForTimeout(300)
    const dialog = page.getByRole('alertdialog')
    await expect(dialog).toBeVisible({ timeout: 10000 })
    await dialog.getByRole('button', { name: /excluir/i }).click()
    await expect(dialog).not.toBeVisible({ timeout: 10000 })
    await page.waitForTimeout(500)
  })

  test('Filtros bar renders', async ({ page }) => {
    await expect(page.getByText('Filtros:')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('button[role="combobox"]').filter({ hasText: /último mês/i }).first()).toBeVisible({ timeout: 10000 })
    await expect(page.locator('button[role="combobox"]').filter({ hasText: /todos/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('Filter by type', async ({ page }) => {
    const tipoFilter = page.locator('button[role="combobox"]').filter({ hasText: /todos/i }).first()
    await tipoFilter.click()
    await page.getByRole('option').filter({ hasText: /receitas/i }).click()
    await page.waitForTimeout(500)
    await expect(page.getByText('Limpar')).toBeVisible({ timeout: 10000 })
  })

  test('Clear filters', async ({ page }) => {
    const tipoFilter = page.locator('button[role="combobox"]').filter({ hasText: /todos/i }).first()
    await tipoFilter.click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /receitas/i }).first().click()
    await page.waitForTimeout(300)
    await page.getByText('Limpar').click()
    await page.waitForTimeout(500)
    await expect(page.locator('button[role="combobox"]').filter({ hasText: /todos/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('Transaction status badges', async ({ page }) => {
    await seedMockTransactions(page)
    await page.reload()
    await page.waitForURL(/\/financeiro/, { timeout: 10000 })
    await expect(page.getByText('Pago').first()).toBeVisible({ timeout: 10000 })
  })

  test('Orçamentos section renders', async ({ page }) => {
    await page.getByText('Orçamentos do Mês').scrollIntoViewIfNeeded()
    await expect(page.getByText('Orçamentos do Mês')).toBeVisible({ timeout: 10000 })
  })

  test('Budget form: create budget', async ({ page }) => {
    await page.locator('button[role="combobox"]').first().click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /alimentação/i }).first().click()
    await page.waitForTimeout(300)
    await page.getByPlaceholder('0,00').first().fill('1200')
    await page.getByRole('button', { name: /definir orçamento/i }).click()
    await page.waitForTimeout(500)

    await expect(page.getByText('Alimentação').first()).toBeVisible({ timeout: 10000 })
  })

  test('Budget progressbar', async ({ page }) => {
    await page.locator('button[role="combobox"]').first().click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /alimentação/i }).first().click()
    await page.waitForTimeout(300)
    await page.getByPlaceholder('0,00').first().fill('1200')
    await page.getByRole('button', { name: /definir orçamento/i }).click()
    await page.waitForTimeout(500)

    await expect(page.getByText('Alimentação').first()).toBeVisible({ timeout: 10000 })
    await page.getByText('Orçamentos do Mês').scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await expect(page.getByText(/utilizado/).first()).toBeVisible({ timeout: 10000 })
  })

  test('Budget delete', async ({ page }) => {
    await page.locator('button[role="combobox"]').first().click()
    await page.waitForTimeout(500)
    await page.locator('[role="option"]').filter({ hasText: /alimentação/i }).first().click()
    await page.waitForTimeout(300)
    await page.getByPlaceholder('0,00').first().fill('1200')
    await page.getByRole('button', { name: /definir orçamento/i }).click()
    await page.waitForTimeout(500)

    const budgetSection = page.getByText('Orçamentos do Mês').locator('xpath=ancestor::div[contains(@class, "rounded-xl")][1]')
    await budgetSection.getByText('Alimentação').first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(200)
    const trashBtn = budgetSection.locator('button').last()
    await trashBtn.click()
    const dialog = page.getByRole('alertdialog')
    await expect(dialog).toBeVisible({ timeout: 10000 })
    await dialog.getByRole('button', { name: /excluir/i }).click()
    await expect(dialog).not.toBeVisible({ timeout: 10000 })
    await page.waitForTimeout(500)
  })

  test('Recorrencia section renders', async ({ page }) => {
    await page.getByText('Transações Recorrentes').first().scrollIntoViewIfNeeded()
    await expect(page.getByText('Transações Recorrentes').first()).toBeVisible({ timeout: 10000 })
  })

  test('Recorrencia: use template', async ({ page }) => {
    await page.getByText('Usar Template').scrollIntoViewIfNeeded()
    await page.getByText('Usar Template').click()
    await page.waitForTimeout(500)
    await expect(page.getByText('Templates de Recorrência')).toBeVisible({ timeout: 10000 })
    await page.getByText('Cancelar').click()
    await page.waitForTimeout(300)
  })

  test('Recorrencia: create from template', async ({ page }) => {
    await page.getByText('Usar Template').click()
    await page.waitForTimeout(500)
    await page.getByText('Netflix').first().click()
    await page.waitForTimeout(500)
    await page.getByText('Criar Recorrência').click()
    await page.waitForTimeout(1000)
    await expect(page.getByText('Netflix').first()).toBeVisible({ timeout: 10000 })
  })

  test('Recorrencia: toggle active/inactive', async ({ page }) => {
    await page.getByText('Usar Template').click()
    await page.waitForTimeout(500)
    await page.getByText('Netflix').first().click()
    await page.waitForTimeout(500)
    await page.getByText('Criar Recorrência').click()
    await page.waitForTimeout(1000)

    const toggleBtn = page.locator('button').filter({ has: page.locator('svg.lucide-pause') }).first()
    await expect(toggleBtn).toBeVisible({ timeout: 10000 })
    await toggleBtn.click()
    await page.waitForTimeout(500)
    await expect(page.locator('button').filter({ has: page.locator('svg.lucide-play') }).first()).toBeVisible({ timeout: 10000 })
  })

  test('Recorrencia: delete', async ({ page }) => {
    await page.getByText('Usar Template').click()
    await page.waitForTimeout(500)
    await page.getByText('Netflix').first().click()
    await page.waitForTimeout(500)
    await page.getByText('Criar Recorrência').click()
    await page.waitForTimeout(1000)

    await expect(page.getByText('Netflix').first()).toBeVisible({ timeout: 10000 })
    await page.getByText('Transações Recorrentes').first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(200)
    const recorrenciaCard = page.getByText('Transações Recorrentes').locator('..').locator('..')
    const trashBtn = recorrenciaCard.locator('button.text-red-500')
    await trashBtn.click()
    await page.waitForTimeout(300)
    const dialog = page.getByRole('alertdialog')
    await expect(dialog).toBeVisible({ timeout: 10000 })
    await dialog.getByRole('button', { name: /excluir/i }).click()
    await expect(dialog).not.toBeVisible({ timeout: 10000 })
    await page.waitForTimeout(500)
  })

  test('TransacaoLista shows data', async ({ page }) => {
    await expect(page.getByText('Nova Transação')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/transações/i).first()).toBeVisible({ timeout: 10000 })
  })
})
