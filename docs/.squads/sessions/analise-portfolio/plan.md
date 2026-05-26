# Plan: SmartWallet — Roadmap de Evolução

> Leia `context.md` e `architecture.md` antes de trabalhar em qualquer fase.
> Atualize este arquivo ao concluir cada fase — marque tarefas e adicione comentários.

---

## FASE 1: Onboarding Multi-Step [Concluída ✅]
> Agents: ana-arquitetura-fe → rodrigo-react → renata-revisao-fe
> Skill: nenhuma
> Estimativa: ~2h (real: ~3h com revisão)

Implementar fluxo de onboarding para novos usuários com 3 etapas:
1. Boas-vindas + perfil (nome, foto)
2. Renda mensal + categorias de interesse
3. Meta de economia inicial

### Tarefa 1.1: Arquitetura do Onboarding [Concluída ✅]
- Criado `src/features/onboarding/` com estrutura de componentes
- Definidos tipos, estados e contratos em `models/OnboardingTypes.ts`
- Decidido estado: localStorage (mock) + rota guard OnboardingGuard

### Tarefa 1.2: Implementação dos Steps [Concluída ✅]
- StepWelcome, StepIncome, StepGoal implementados
- ProgressIndicator com barra de progresso + labels
- Validação com Zod por step (schemas separados)
- Salvamento no localStorage via onboarding.service.ts
- Skip permitido em todos os steps

### Tarefa 1.3: Integração com Auth [Concluída ✅]
- OnboardingGuard redireciona onboardados para /dashboard
- OnboardingGuard protege rota /onboarding
- Skip total marca como completo com dados default
- AuthRedirect e OnboardingGuard funcionam em cascata sem loop

### Pontos de Atenção (pós-review)
- finishOnboarding deve ser declarado antes de skip (closure ordering)
- Erros Zod propagados individualmente por campo (não engolidos)
- Upload de avatar acessível por teclado (Button + ref programático)
- FileReader abort-safe com mountedRef em caso de unmount

---

## FASE 2: Backend Real [Não Iniciada ⏳]
> Agents: a definir
> Estimativa: ~8h
> Depende de: FASE 1

### Mock Removal
- Substituir mocks de transações por API real
- Substituir mock de auth por JWT
- Substituir mock de usuário por banco

---

## FASE 3: PWA + Offline [Não Iniciada ⏳]
> Estimativa: ~3h
> Depende de: FASE 2

---

## FASE 4: Relatórios Anuais [Não Iniciada ⏳]
> Estimativa: ~4h
> Depende de: FASE 2

---

## FASE 5: i18n pt-BR + en-US [Concluída ✅]
> Estimativa: ~3h (real: ~1h com task agents)
> Depende de: Frontend puro (sem backend)
> Libs: i18next, react-i18next, i18next-browser-languagedetector

### Infraestrutura
- `src/lib/i18n.ts` — configuração i18next com 11 namespaces
- `src/locales/pt-BR/` — 11 arquivos JSON (common, layout, home, auth, onboarding, dashboard, financeiro, metas, extrato, settings, legal)
- `src/locales/en-US/` — mesmos 11 arquivos com traduções para inglês
- Language detector via localStorage + navigator
- Seletor de idioma em Settings → Aplicativo

### Escopo
- ~65+ arquivos .tsx modificados
- ~600+ strings substituídas por `t('namespace:key')`
- Namespaces por feature (common, layout, home, auth, onboarding, dashboard, financeiro, metas, extrato, settings, legal)
- pt-BR como fallback padrão
- Idioma detectado do navegador e persistido em localStorage

### Observações
- FASE 5 não depende de backend — foi executada diretamente sobre a FASE 1
- 0 erros TypeScript, 0 erros ESLint (apenas warnings pré-existentes)
- Legal pages (Termos/Privacidade) com seções traduzidas (conteúdo jurídico extenso manteria ambos idiomas)

---

## FASE 6: Testes P0 — Cobertura de Fluxos Críticos [Concluída ✅]
> Estimativa: ~4h (real: ~2h com task agents)
> Depende de: FASE 1 + FASE 5

### Resultados
- **17 test files, 125 testes — todos passando** ✅
- Build TypeScript + Vite — 0 erros

### Mapa de Cobertura (antes → depois)

| Área | Antes | Depois |
|------|-------|--------|
| Auth (cognito, login, signup) | 0% | 24 testes (P0) |
| AuthContext + OnboardingGuard | 0% | 8 testes (P0) |
| Onboarding service + schemas | 0% | 25 testes (P0) |
| Zod schemas (transação + onboarding) | 0% | 27 testes (P0) |
| Core utils (isTestUser, redirect) | 0% | 8 testes (P0) |
| Dashboard useEntrada | 0% | 11 testes (P0) |
| Hooks existentes (useResumo, useFiltros) | 14 testes | 14 testes (mantidos) |
| Utils existentes (cn, formatedBrl, formatedDate) | 19 testes | 19 testes (mantidos) |
| NotFoundPage | 4 testes | 4 testes (mantidos) |

### Arquivos criados (11 novos)
```
src/__tests__/
├── core/
│   ├── AuthContext.test.tsx
│   ├── cognito.test.ts
│   ├── isTestUser.test.ts
│   └── redirectAfterLogin.test.ts
├── components/
│   └── OnboardingGuard.test.tsx
├── schemas/
│   ├── onboarding.schemas.test.ts
│   └── transacao.schemas.test.ts
├── services/
│   └── onboarding.service.test.ts
└── viewModels/
    ├── useEntrada.test.ts
    ├── useLoginPage.test.ts
    └── useSignupPage.test.ts
```

### Arquivos alterados
- `src/test/setup.ts` — Storage mock trocado para transparente (Map-based)
- `vitest.config.ts` — Adicionado VITE_USE_MOCK=true para testes

### Próximos testes recomendados (P1)
- useTransacoes (CRUD transações)
- useBudget (orcamentos)
- useRecorrencia (recorrencias)
- useMetas (metas)
- useExtrato (extrato/exportação)
- Componentes de formulário (LoginForm, CadastroForm, TransacaoForm)
- Fluxos E2E (signup, onboarding, CRUD transação, extrato, metas)
- useSettings (configurações)
- Dashboard page + Financeiro page (integração)

---

## FASE 7: Acessibilidade WCAG AA [Não Iniciada ⏳]
> Estimativa: ~3h
