import { test, expect } from '@playwright/test'

test.describe('Home Page (Public)', () => {
  test('1 - Home page hero', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
    await expect(page.locator('h2, h1').filter({ hasText: /gestão financeira simplificada|simplified financial management/i })).toBeVisible({ timeout: 10000 })
  })

  test('2 - Home page features', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    await expect(page.getByText(/recursos principais|main features|benefícios|benefits|sobre nós|about us/i).first()).toBeVisible({ timeout: 10000 })
  })

  test('3 - Header navigation', async ({ page }) => {
    await page.goto('/')
    const navLinks = [/recursos|features/i, /funcionalidades|capabilities/i, /benefícios|benefits/i, /sobre nós|about us/i, /como funciona|how it works/i]
    for (const link of navLinks) {
      await expect(page.locator('nav a, header a').filter({ hasText: link }).first()).toBeVisible({ timeout: 10000 })
    }
  })

  test('4 - Footer', async ({ page }) => {
    await page.goto('/')
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect(page.locator('footer')).toBeVisible({ timeout: 10000 })
    for (const text of [/termos de uso|terms of use/i, /privacidade|privacy policy/i, /fale conosco|contact us/i]) {
      await expect(page.getByText(text).first()).toBeVisible({ timeout: 10000 })
    }
  })
})

test.describe('Sidebar & Protected Routes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => {
      sessionStorage.setItem('UserProvider', 'teste@gmail.com')
      localStorage.setItem('smartwallet_onboarding', JSON.stringify({
        nome: 'Usuário Teste', completo: true, updatedAt: new Date().toISOString(),
      }))
    })
  })

  test('5 - Sidebar renders', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('load')
    await expect(page.locator('aside').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('SmartWallet').first()).toBeVisible({ timeout: 10000 })
  })

  test('6 - Sidebar navigation', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('load')
    await expect(page.locator('aside')).toBeVisible({ timeout: 10000 })
  })

  test('7 - Sidebar user section', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('load')
    await expect(page.locator('aside')).toBeVisible({ timeout: 10000 })
  })
})

test.describe('404 Pages', () => {
  test('8 - 404 page', async ({ page }) => {
    await page.goto('/nonexistent-route')
    await expect(page.getByText('404')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('h2, h1').filter({ hasText: /página não encontrada|page not found/i })).toBeVisible({ timeout: 10000 })
  })

  test('9 - 404 for anonymous', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => sessionStorage.removeItem('UserProvider'))
    await page.goto('/nonexistent-route')
    await expect(page.getByRole('button').filter({ hasText: /página inicial|home page|home/i })).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Public Legal Pages', () => {
  test('10 - Legal pages', async ({ page }) => {
    await page.goto('/termos')
    await page.waitForLoadState('load')
    await expect(page.locator('h2, h1').filter({ hasText: /termos de uso|terms of use|termos e condições/i }).first()).toBeVisible({ timeout: 10000 })

    await page.goto('/privacidade')
    await page.waitForLoadState('load')
    await expect(page.locator('h2, h1').filter({ hasText: /política de privacidade|privacy policy/i }).first()).toBeVisible({ timeout: 10000 })

    await page.goto('/fale-conosco')
    await page.waitForLoadState('load')
    await expect(page.locator('h2, h1').filter({ hasText: /fale conosco|contact us|contact/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('11 - Protected route redirect', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => sessionStorage.removeItem('UserProvider'))
    await page.goto('/dashboard')
    await page.waitForURL(/\/login/, { timeout: 10000 })
    await expect(page.locator('h2, h1').filter({ hasText: /bem-vindo|welcome|welcome back/i })).toBeVisible({ timeout: 10000 })
  })

  test('12 - CTA to Create Account', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
    const criarLink = page.locator('a[href="/criar"], a[href="/CreateAccount"]').first()
    await expect(criarLink).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Language Switcher', () => {
  test('13 - Header language switcher', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
    const langButton = page.locator('header button[aria-label*="Switch"]').first()
    await expect(langButton).toBeVisible({ timeout: 10000 })
  })

  test('14 - Switch language on public page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
    const langButton = page.locator('header button[aria-label*="Switch"]').first()
    await expect(langButton).toBeVisible({ timeout: 10000 })
    await langButton.click()
    await page.waitForTimeout(1000)
    await expect(page.getByText(/simplified financial management|financial management simplified/i).first()).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Responsive', () => {
  test('15 - Mobile responsive', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => {
      sessionStorage.setItem('UserProvider', 'teste@gmail.com')
    })
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/dashboard')
    await page.waitForLoadState('load')
    await page.waitForTimeout(500)
    const sidebar = page.locator('aside').filter({ has: page.getByText('SmartWallet') })
    await expect(sidebar).not.toBeVisible({ timeout: 10000 })
  })
})
