---
gerado: 2026-05-25
auto_detectado: true
---
# Stack do Projeto

**Linguagem:** TypeScript
**Runtime/Versão:** Node.js (via Vite 6)
**Framework:** React 19 + Vite 6
**Package Manager:** npm
**ORM / Banco:** não detectado
**Validação:** Zod
**Test Runner:** Vitest + Playwright
**Linter / Formatter:** ESLint

## Estrutura de Pastas

```
src/
  components/      # shadcn/ui + layout
  core/            # viewModels, services, utils, models
  features/        # auth, dashboard, financeiro, metas, extrato, home, pages-legais
  lib/             # utils globais
  routes/          # AppRoutes com lazy loading
  mocks/           # mock interativo
  __tests__/       # testes unitários
e2e/               # testes E2E Playwright
```

## Banco de Dados e Infraestrutura

Não detectado. Projeto é frontend puro com dados mockados em localStorage/sessionStorage.

## Notas

> Gerado por /setup:discover em 2026-05-25.
> Agents usam este contexto para adaptar exemplos, imports e estruturas de pastas ao projeto real.
> Para atualizar: edite este arquivo ou execute /setup:discover novamente.
