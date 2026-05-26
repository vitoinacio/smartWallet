import { Page } from '@playwright/test'

export const TEST_USER = {
  email: 'teste@gmail.com',
  password: 'teste123',
  name: 'Usuário Teste',
}

export async function seedLocalStorage(page: Page) {
  await page.evaluate(() => {
    localStorage.removeItem('smartwallet_mock_transacoes')
    localStorage.removeItem('smartwallet_mock_entrada')
    localStorage.removeItem('smartwallet_onboarding')
    localStorage.removeItem('smartwallet_budget')
    localStorage.removeItem('smartwallet_recorrencias')
    localStorage.removeItem('smartwallet_metas')
    localStorage.removeItem('theme')
    localStorage.removeItem('sidebar-collapsed')
    localStorage.removeItem('i18nextLng')
  })
}

export async function completeOnboarding(page: Page) {
  await page.evaluate(() => {
    localStorage.setItem('smartwallet_onboarding', JSON.stringify({
      nome: 'Usuário Teste',
      avatar: null,
      rendaMensal: 8500,
      categoriasInteresse: ['salario', 'moradia'],
      metaEconomia: { valor: 10000, prazo: '2027-12-31' },
      completo: true,
      updatedAt: new Date().toISOString(),
    }))
  })
}

export async function loginAndSetup(page: Page) {
  await page.goto('/')
  await page.waitForLoadState('load')
  await seedLocalStorage(page)
  await page.evaluate(() => { localStorage.setItem('i18nextLng', 'pt-BR') })
  await completeOnboarding(page)
  await page.goto('/login')
  await page.waitForLoadState('load')
  await page.waitForTimeout(2000)
  await page.locator('input[type="email"]').first().fill(TEST_USER.email)
  await page.locator('input[type="password"]').first().fill(TEST_USER.password)
  await page.getByRole('button').filter({ hasText: /entrar|sign.?in|acessar|login/i }).first().click()
  await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 30000 })
}

export async function seedMockTransactions(page: Page) {
  await page.evaluate(() => {
    const transacoes = [
      { id: 1, descricao: 'Salário', valor: 8500, tipo: 'receita', categoria: 'salario', data: '2026-05-05', status: 'pago', observacao: '', notificar: false },
      { id: 2, descricao: 'Freelance', valor: 3200, tipo: 'receita', categoria: 'freelance', data: '2026-05-10', status: 'pago', observacao: '', notificar: false },
      { id: 3, descricao: 'Aluguel', valor: 2500, tipo: 'despesa', categoria: 'moradia', data: '2026-05-05', status: 'pago', observacao: 'Apartamento', notificar: false },
      { id: 4, descricao: 'Supermercado', valor: 850, tipo: 'despesa', categoria: 'alimentacao', data: '2026-05-08', status: 'pago', observacao: '', notificar: false },
      { id: 5, descricao: 'Internet', valor: 120, tipo: 'despesa', categoria: 'contas', data: '2026-05-15', status: 'pendente', observacao: 'Vivo Fibra', notificar: false },
      { id: 6, descricao: 'Freelance Abril', valor: 1500, tipo: 'receita', categoria: 'freelance', data: '2026-04-20', status: 'pago', observacao: '', notificar: false },
      { id: 7, descricao: 'Conta Luz', valor: 190, tipo: 'despesa', categoria: 'contas', data: '2026-04-10', status: 'pago', observacao: '', notificar: false },
    ]
    localStorage.setItem('smartwallet_mock_transacoes', JSON.stringify(transacoes))
    localStorage.setItem('smartwallet_mock_entrada', '8500')
  })
}
