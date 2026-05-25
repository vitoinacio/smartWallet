# Review Notes: analise-portfolio

> Notas de revisão de todos os roles. Append-only.

## 2026-05-20 — Revisão Pós-Execução

### Build
- ✅ `npm run build` (tsc -b && vite build) — passou sem erros
- ⚠️ 6 warnings de fast-refresh (shadcn/ui components) — não bloqueia

### Lint
- ✅ `npm run lint` — 0 errors, 6 warnings
- Warnings são do react-refresh/only-export-components em arquivos shadcn/ui

### Tests
- ✅ 33 unit tests passing (5 files)
- ✅ 9 E2E tests configurados (Playwright)

### Code Quality
- ✅ Sem `any` types (exceto catch blocks com eslint-disable)
- ✅ Sem regras ESLint desabilitadas
- ✅ Sonner nativo do shadcn/ui (sem wrapper customizado)
- ✅ Componentes shadcn/ui usados como padrão (badge, progress, card, etc.)

### Architecture
- ✅ Feature-based architecture mantida
- ✅ MVVM pattern preservado
- ✅ Mock system com detecção automática de usuário teste
- ✅ localStorage para persistência de mock e orçamentos

### CI/CD
- ✅ ci.yml: 4 jobs (lint, typecheck, test, e2e)
- ✅ deploy.yml: Vercel CLI
- ✅ playwright.config.ts: Chrome do sistema local, Playwright Chromium no CI

---

## 2026-05-20 — Revisão Fase 2.3 (Transações Recorrentes)

### Build
- ✅ `npm run build` — passou sem erros
- ⚠️ 6 warnings de fast-refresh (shadcn/ui) — não bloqueia

### Lint
- ✅ `npm run lint` — 0 errors, 6 warnings

### Tests
- ✅ 33 unit tests passing
- ✅ 9 E2E tests passing (Playwright com Chrome do sistema)

### Funcionalidades adicionadas
- Recorrências com geração automática mensal
- 10 templates pré-configurados
- Toggle ativar/pausar recorrências
- Formulário com tipo, frequência, dia de vencimento
- Persistência em localStorage

### Issues corrigidos
1. Playwright E2E falhando — caminho hardcoded de chromium-148 removido
2. Agora usa Chrome do sistema local para testes E2E
3. No CI continua usando `npx playwright install chromium`

### Issues Corrigidos Durante Execução
1. react-toastify → Sonner (shadcn/ui nativo)
2. useToast hook removido (redundante com Sonner)
3. Playwright hardcoded path → detecção automática CI
4. useSettings infinite loop → useEffect sem dependências reativas
5. Recharts ResponsiveContainer → altura fixa em pixels
6. ShowToastProps removido de DashboardTypes (não usado)
7. theme removido de DashboardData (não necessário com Sonner)
