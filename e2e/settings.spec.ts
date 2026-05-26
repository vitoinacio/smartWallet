import { test, expect } from '@playwright/test'
import { loginAndSetup, TEST_USER } from './helpers'

test.describe('Settings', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndSetup(page)
    await page.goto('/settings')
    await page.waitForLoadState('load')
  })

  test('1 - Settings page renders', async ({ page }) => {
    await expect(page.locator('h2, h1').filter({ hasText: /configurações|settings/i })).toBeVisible({ timeout: 10000 })
  })

  test('2 - 5 tab buttons visible', async ({ page }) => {
    const tabs = [/perfil|profile/i, /aplicativo|app/i, /segurança|security/i, /dados|data/i, /sobre|about/i]
    for (const tab of tabs) {
      await expect(page.getByRole('button').filter({ hasText: tab }).first()).toBeVisible({ timeout: 10000 })
    }
  })

  test('3 - Perfil tab shows user info', async ({ page }) => {
    await expect(page.getByText(TEST_USER.name)).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(TEST_USER.email)).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/perfil|profile/i).first()).toBeVisible({ timeout: 10000 })
  })

  test('4 - Perfil shows disabled fields', async ({ page }) => {
    const disabledInputs = page.locator('input[disabled]')
    await expect(disabledInputs.first()).toBeVisible({ timeout: 10000 })
    const count = await disabledInputs.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })

  test('5 - Logout button in perfil', async ({ page }) => {
    await expect(page.getByRole('button').filter({ hasText: /sair da conta|sign out/i })).toBeVisible({ timeout: 10000 })
  })

  test('6 - Logout flow', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /sair da conta|sign out/i }).click()
    await expect(page.getByRole('alertdialog')).toBeVisible({ timeout: 10000 })
    await page.getByRole('alertdialog').getByRole('button').filter({ hasText: /sair|sign out/i }).click()
    await page.waitForURL('/', { timeout: 10000 })
  })

  test('7 - Switch to Aplicativo tab', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /aplicativo|app/i }).click()
    await page.waitForTimeout(300)
    await expect(page.getByText(/tema escuro|dark theme|aparência|appearance/i).first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/notificações|notifications/i).first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/idioma|language/i).first()).toBeVisible({ timeout: 10000 })
  })

  test('8 - Theme toggle', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /aplicativo|app/i }).click()
    await page.waitForTimeout(300)
    const card = page.getByText(/aparência|appearance/i).locator('..').locator('..')
    const themeCheckbox = card.locator('button[role="checkbox"]')
    await expect(themeCheckbox).toBeVisible({ timeout: 10000 })
    const wasDark = await page.locator('html').evaluate(el => el.classList.contains('dark'))
    await themeCheckbox.click()
    await page.waitForTimeout(500)
    const isDark = await page.locator('html').evaluate(el => el.classList.contains('dark'))
    expect(isDark).not.toBe(wasDark)
  })

  test('9 - Notification toggles', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /aplicativo|app/i }).click()
    await page.waitForTimeout(300)
    const checkboxes = page.locator('button[role="checkbox"]')
    const count = await checkboxes.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })

  test('10 - Language select renders', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /aplicativo|app/i }).click()
    await page.waitForTimeout(300)
    const langTrigger = page.locator('button[role="combobox"]').filter({ hasText: /português|english/i })
    await expect(langTrigger).toBeVisible({ timeout: 10000 })
  })

  test('11 - Switch language to en-US', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /aplicativo|app/i }).click()
    await page.waitForTimeout(300)
    await page.locator('button[role="combobox"]').filter({ hasText: /português|english/i }).click()
    await page.waitForTimeout(300)
    await page.getByRole('option', { name: /english/i }).click()
    await page.waitForTimeout(500)
    await expect(page.locator('h2, h1').filter({ hasText: /settings/i })).toBeVisible({ timeout: 10000 })
  })

  test('12 - Language persists on reload', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /aplicativo|app/i }).click()
    await page.waitForTimeout(300)
    await page.locator('button[role="combobox"]').filter({ hasText: /português|english/i }).click()
    await page.waitForTimeout(300)
    await page.getByRole('option', { name: /english/i }).click()
    await page.waitForTimeout(500)
    await page.reload()
    await page.waitForLoadState('load')
    await expect(page.locator('h2, h1').filter({ hasText: /settings/i })).toBeVisible({ timeout: 10000 })
  })

  test('13 - Switch to Seguranca tab', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /segurança|security/i }).click()
    await page.waitForTimeout(300)
    await expect(page.getByText(/two-factor|autenticação.*2|2 fatores|two factor/i)).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/alterar senha|change password/i).first()).toBeVisible({ timeout: 10000 })
  })

  test('14 - Change password form renders', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /segurança|security/i }).click()
    await page.waitForTimeout(300)
    const passwordInputs = page.locator('input[type="password"]')
    await expect(passwordInputs).toHaveCount(3, { timeout: 10000 })
    await expect(page.getByRole('button').filter({ hasText: /alterar senha|change password/i })).toBeVisible({ timeout: 10000 })
  })

  test('15 - Switch to Dados tab', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /dados|data/i }).click()
    await page.waitForTimeout(300)
    await expect(page.getByText(/exportar dados|export data/i)).toBeVisible({ timeout: 10000 })
    await expect(page.locator('button[role="checkbox"]').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('button').filter({ hasText: /baixar dados|download data/i })).toBeVisible({ timeout: 10000 })
  })

  test('16 - Download data', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /dados|data/i }).click()
    await page.waitForTimeout(300)
    const downloadBtn = page.getByRole('button').filter({ hasText: /baixar dados|download data/i })
    await expect(downloadBtn).toBeDisabled({ timeout: 10000 })
    await page.locator('button[role="checkbox"]').first().click()
    await expect(downloadBtn).toBeEnabled({ timeout: 10000 })
  })

  test('17 - Clear data section renders', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /dados|data/i }).click()
    await page.waitForTimeout(300)
    const clearBtn = page.getByRole('button').filter({ hasText: /limpar dados|clear data/i })
    await clearBtn.scrollIntoViewIfNeeded()
    await expect(clearBtn).toBeVisible({ timeout: 10000 })
  })

  test('18 - Clear data confirmation flow', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /dados|data/i }).click()
    await page.waitForTimeout(300)
    await page.getByRole('button').filter({ hasText: /limpar dados|clear data/i }).click()
    await page.waitForTimeout(300)
    await expect(page.getByText(/confirmar limpeza|confirm clear/i)).toBeVisible({ timeout: 10000 })
    await expect(page.locator('button[role="checkbox"]').last()).toBeVisible({ timeout: 10000 })
  })

  test('19 - Switch to Sobre tab', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /sobre|about/i }).click()
    await page.waitForTimeout(300)
    await expect(page.getByText(/smartwallet/i).first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/versão|version 1\.0/i)).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/gestão financeira|financial management/i).first()).toBeVisible({ timeout: 10000 })
  })

  test('20 - Sobre links visible', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /sobre|about/i }).click()
    await page.waitForTimeout(300)
    const linkTexts = [/termos de uso|terms of use/i, /privacidade|privacy policy/i, /fale conosco|contact us/i]
    for (const link of linkTexts) {
      const btn = page.getByRole('button').filter({ hasText: link })
      const lnk = page.getByRole('link').filter({ hasText: link })
      await expect(btn.or(lnk).first()).toBeVisible({ timeout: 10000 })
    }
  })

  test('21 - Tech badges rendered', async ({ page }) => {
    await page.getByRole('button').filter({ hasText: /sobre|about/i }).click()
    await page.waitForTimeout(300)
    for (const tech of [/react 19|react/i, /typescript|typescript/i, /vite/i, /tailwind/i]) {
      await expect(page.getByText(tech).first()).toBeVisible({ timeout: 10000 })
    }
  })
})
