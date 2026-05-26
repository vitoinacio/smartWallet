import { describe, it, expect, beforeEach } from 'vitest'
import { login, createAccount } from '@/core/utils/cognito'

describe('cognito utils - login', () => {
  beforeEach(() => {
    import.meta.env.VITE_USE_MOCK = 'true'
  })

  it('returns status 200 with valid mock credentials', async () => {
    const response = await login({ email: 'teste@gmail.com', senha: 'teste123' })
    expect(response.status).toBe(200)
  })

  it('returns user object with valid mock credentials', async () => {
    const response = await login({ email: 'teste@gmail.com', senha: 'teste123' })
    expect(response.data.user).toBeDefined()
    expect(response.data.user?.email).toBe('teste@gmail.com')
    expect(response.data.user?.nome).toBe('Usuário Teste')
  })

  it('throws Error with wrong password', async () => {
    await expect(login({ email: 'teste@gmail.com', senha: 'wrong' })).rejects.toThrow('Credenciais inválidas')
  })

  it('throws Error with wrong email', async () => {
    await expect(login({ email: 'wrong@email.com', senha: 'teste123' })).rejects.toThrow('Credenciais inválidas')
  })

  it('throws Error with empty email', async () => {
    await expect(login({ email: '', senha: 'teste123' })).rejects.toThrow('Credenciais inválidas')
  })
})

describe('cognito utils - createAccount', () => {
  it('returns status 200 with mock mode', async () => {
    const response = await createAccount({
      nome: 'Test',
      email: 'test@test.com',
      senha: '123456',
      sexo: 'Masculino',
      dataNasc: '2000-01-01',
    })
    expect(response.status).toBe(200)
  })

  it('returns success message containing mock', async () => {
    const response = await createAccount({
      nome: 'Test',
      email: 'test@test.com',
      senha: '123456',
      sexo: 'Masculino',
      dataNasc: '2000-01-01',
    })
    expect(response.data.message).toContain('mock')
  })
})
