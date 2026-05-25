# Contexto: analise-portfolio

## O que é
Implementar fluxo de onboarding multi-step para novos usuários do SmartWallet. Três etapas: perfil, renda, meta de economia. Experiência guiada com progresso visual.

## Por que existe
Melhorar a primeira experiência do usuário, aumentar retenção e guiar o cadastro de informações financeiras iniciais de forma amigável. Sem onboarding, o usuário cai em um dashboard vazio sem contexto.

## Decisões tomadas
- Onboarding como feature isolada em `src/features/onboarding/`
- Estado via Context (completion status) + localStorage (dados do usuário)
- Barra de progresso entre steps
- Validação Zod por step
- Skip automático se onboarding já completo
- Redirecionar para onboarding após cadastro/login primeiro acesso

## Status
FASE 1 (Onboarding Multi-Step) — **Concluída ✅**
- Implementado, revisado por Renata, 3 BLOCKERs resolvidos
- Pronto para FASE 2 (Backend Real)

## Resultados
- 20+ arquivos criados/modificados
- 0 erros TypeScript, 0 erros ESLint
- 3 ADRs documentados e seguidos
- Todos os componentes acessíveis por teclado (BLOCKER 3 resolvido)
- Validação Zod com feedback granular (BLOCKER 2 resolvido)
- Closure ordering corrigido (BLOCKER 1 resolvido)

## Estrutura final
```
src/features/onboarding/
├── views/
│   ├── OnboardingPage.tsx       → container com step router
│   ├── components/
│   │   ├── StepWelcome.tsx      → boas-vindas + nome/foto
│   │   ├── StepIncome.tsx       → renda + categorias
│   │   ├── StepGoal.tsx         → meta de economia
│   │   └── OnboardingProgress.tsx → barra de progresso
├── viewModels/
│   ├── useOnboarding.ts        → estado dos steps
│   └── useOnboardingForm.ts    → formulário por step
└── models/
    └── OnboardingTypes.ts      → tipos e schemas Zod
```

## O que não fazer
- Não criar mais de 3 steps (manter onboarding rápido)
- Não pedir dados complexos (só o essencial)
- Não bloquear o usuário (permitir pular)
- Não remover rota de login atual
