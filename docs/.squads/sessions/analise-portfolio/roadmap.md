# SmartWallet — Plano de Evolução Prioritizado

> Gerado: 2026-05-20 | Squad: analise-wallet-001
> Foco: Portfólio + Funcionalidade + Qualidade Técnica

---

## VISÃO GERAL

Este plano divide as melhorias em 4 fases progressivas, equilibrando:
- **Portfólio** — o que impressiona recrutadores
- **Funcionalidade** — o que torna o app mais útil
- **Qualidade** — o que profissionaliza o código

---

## 🎯 FASE 1: FUNDAMENTOS DE PORTFÓLIO (Semanas 1-2)

### 1.1 Testes Automatizados (Prioridade Máxima)

**Por quê:** Testes são o fator #1 que separa júnior/pleno de sênior.

| Item | Descrição | Impacto |
|------|-----------|---------|
| Configurar Vitest | Test runner moderno para Vite | ⭐⭐⭐ |
| Configurar Testing Library | Testes de componentes React | ⭐⭐⭐ |
| Testes de utils | `cn()`, formatação de moeda, máscaras | ⭐⭐ |
| Testes de hooks | `useTransacoes`, `useFiltros`, `useResumo` | ⭐⭐⭐ |
| Testes de componentes | Formulários de auth, TransacaoForm | ⭐⭐ |
| Testes E2E (Playwright) | Fluxos críticos: login → dashboard | ⭐⭐⭐ |

**Comandos a adicionar:**
```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
npx playwright install
```

**Arquivos de teste:**
```
src/
├── __tests__/                    # Testes unitários
│   ├── utils/
│   ├── hooks/
│   └── components/
└── e2e/                         # Testes E2E
    └── auth.spec.ts
```

---

### 1.2 CI/CD Pipeline

**Por quê:** Demonstra DevOps skills e profissionalismo.

| Item | Descrição | Impacto |
|------|-----------|---------|
| GitHub Actions | Workflow de CI | ⭐⭐⭐ |
| Lint + Typecheck | Em PR e merge | ⭐⭐ |
| Build verification | Testa build em cada PR | ⭐⭐ |
| Deploy automático | Vercel em merge to main | ⭐⭐ |
| Testes no CI | Execução em Pull Requests | ⭐⭐⭐ |

**Arquivo:** `.github/workflows/ci.yml`

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test
```

---

### 1.3 Refatorações Rápidas de Qualidade

**Corrige problemas identificados na análise:**

| Item | Arquivo | Ação |
|------|---------|------|
| Mover ToastContainer | Dashboard, Financeiro, AuthPage | → App.tsx |
| Criar useToast | novo hook centralizado | Reutilizável |
| Extrair formatCurrency | para utils | DRY |
| Limpar duplicação | handlers de navegação | Hook compartilhado |
| Toastify → Sonner | substituir | Moderno, acessível |

---

## 🎯 FASE 2: FUNCIONALIDADES DE NEGÓCIO (Semanas 3-5)

### 2.1 Gráficos Interativos (Prioridade Alta)

**Por quê:** Visualização de dados é essencial para app financeiro.

| Componente | Descrição | Prioridade |
|------------|-----------|------------|
| Gráfico de Rosca | Despesas por categoria | 🔴 Alta |
| Gráfico de Barras | Receitas vs Despesas mensal | 🔴 Alta |
| Gráfico de Linha | Evolução patrimonial | 🟡 Média |
| Mini gráficos | No dashboard cards | 🟡 Média |

**Stack:** Recharts (já no roadmap do README)

```bash
npm install recharts
```

**Integração:**
```tsx
// src/features/dashboard/views/components/GraficoCategoria.tsx
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
```

---

### 2.2 Orçamentos e Metas

**Regras de negócio novas:**

| Feature | Descrição | Complexidade |
|---------|-----------|--------------|
| Budget mensal | Limite por categoria | Alta |
| Meta de economia | Percentual alvo mensal | Média |
| Alertas de orçamento | Quando atingir 80%, 100% | Média |
| Progress bars | Visualização de budget | Baixa |

**Estrutura de dados:**
```typescript
interface Budget {
  id: string;
  categoria: string;
  limite: number;
  mes: string; // YYYY-MM
}
```

---

### 2.3 Transações Recorrentes

| Feature | Descrição | Complexidade |
|---------|-----------|--------------|
| Marcar como recorrente | Assinaturas, aluguel | Baixa |
| Gerar automaticamente | Criar instâncias mensalmente | Alta |
| Templates de recorrência | Dropbox, Netflix, etc | Média |

---

### 2.4 Estados Vazios e UX

**Melhorias de UX:**

| Item | Descrição | Prioridade |
|------|-----------|------------|
| Empty States | Ilustrações + mensagens úteis | 🔴 Alta |
| Skeleton Loading | Antes de dados carregarem | 🔴 Alta |
| Mensagens de erro | Específicas por tipo | 🟡 Média |
| Microinterações | Hover states, feedback | 🟡 Média |

---

## 🎯 FASE 3: QUALIDADE TÉCNICA (Semanas 6-8)

### 3.1 Service Layer e Arquitetura

**Melhoria de arquitetura:**

| Item | Descrição | Impacto |
|------|-----------|---------|
| `src/services/` | Camada de API formal | ⭐⭐⭐ |
| `src/types/api.ts` | Tipos de resposta de API | ⭐⭐ |
| `src/constants/` | CATEGORIAS, CONFIG | ⭐⭐ |
| `src/hooks/` global | Hooks compartilhados | ⭐⭐ |

**Estrutura proposta:**
```
src/
├── services/                    # NOV0
│   ├── api.ts                 # Axios instance
│   ├── auth.service.ts
│   ├── transacao.service.ts
│   └── user.service.ts
├── constants/                  # NOVO
│   ├── categories.ts
│   └── config.ts
└── types/
    └── api.ts                  # NOVO
```

---

### 3.2 PWA e Offline

| Feature | Descrição | Impacto no portfólio |
|---------|-----------|----------------------|
| Service Worker | Cache de assets | ⭐⭐⭐ |
| Manifest.json | PWA installável | ⭐⭐⭐ |
| Modo offline | Funciona sem internet | ⭐⭐ |
| Background sync | Sincroniza quando online | ⭐⭐ |

```bash
npm install -D vite-plugin-pwa
```

---

### 3.3 Performance e Acessibilidade

| Item | Ferramenta | Prioridade |
|------|------------|------------|
| Code splitting | React.lazy + Suspense | 🔴 Alta |
| Image optimization | vite-imagetools | 🟡 Média |
| Error Boundaries | React Error Boundary | 🔴 Alta |
| Lighthouse CI | Performance tracking | 🟡 Média |
| A11y audit | a11y-announcer | 🔴 Alta |

---

### 3.4 Storybook

| Item | Descrição | Impacto |
|------|-----------|---------|
| Configuração | @storybook/react-vite | ⭐⭐⭐ |
| Button, Input, Card | Componentes base | ⭐⭐⭐ |
| Formulários | Login, Cadastro | ⭐⭐ |
| Layout | Header, Sidebar | ⭐⭐ |
| Dark mode | Com decorator | ⭐⭐ |

```bash
npx storybook@latest init
```

---

## 🎯 FASE 4: DIFERENCIAIS (Semanas 9-12)

### 4.1 Autenticação Real

| Solução | Prós | Contras |
|---------|------|---------|
| **Supabase** | Fácil, gratuito, auth completo | Dependência externa |
| **Firebase Auth** | Robusto, Google OAuth | Mais complexo |
| **Auth0** | Enterprise-ready | Custo |

**Recomendação:** Supabase (mais simples para MVP)

---

### 4.2 Exportação de Dados

| Formato | Biblioteca | Prioridade |
|---------|------------|------------|
| PDF | jspdf + jspdf-autotable | 🔴 Alta |
| Excel | xlsx | 🟡 Média |
| CSV | nativo | 🔴 Alta |

---

### 4.3 Notificações Push

| Item | Descrição | Prioridade |
|------|-----------|------------|
| Vencimento de contas | 3 dias antes | 🟡 Média |
| Orçamento atingido | 80% e 100% | 🟡 Média |
| Resumo semanal | Domingo à noite | 🟢 Baixa |

---

### 4.4 Documentação Avançada

| Item | Descrição | Prioridade |
|------|-----------|------------|
| CONTRIBUTING.md | Como contribuir | 🔴 Alta |
| CHANGELOG.md | Histórico de versões | 🔴 Alta |
| API.md | Especificação da API | 🟡 Média |
| ADR.md | Decisões arquiteturais | 🟡 Média |

---

## 📊 ROADMAP VISUAL

```
SEMANA  1   2   3   4   5   6   7   8   9   10  11  12
        ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───
FASE 1  [TESTES] [ CI/CD  ] [REFATORAÇÕES       ]
        ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───
FASE 2      [GRÁFICOS] [ORÇAMENTOS] [UX/MELHORIAS]
        ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───
FASE 3                  [SERVICES][PWA][PERF]
        ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───
FASE 4                              [STORYBOOK][AUTH][EXPORT]
        └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───
```

---

## 🎯 PRIORIDADES POR TIPO

### Para Portfólio (ordem de impacto)
1. Testes automatizados (Vitest + E2E)
2. CI/CD com GitHub Actions
3. Storybook
4. PWA com Service Worker
5. Gráficos com Recharts

### Para Funcionalidade (ordem de utilidade)
1. Gráficos interativos
2. Orçamentos e metas
3. Estados vazios e UX
4. Transações recorrentes
5. Exportação de dados

### Para Qualidade Técnica (ordem de manutenibilidade)
1. Service layer formal
2. Toastify → Sonner
3. Refatorações de código
4. Error boundaries
5. Performance optimization

---

## ⚡ quick wins (1 dia cada)

| # | Tarefa | Tempo | Impacto |
|---|--------|-------|---------|
| 1 | Mover ToastContainer para App.tsx | 15min | ⭐⭐ |
| 2 | Criar `useToast` hook | 30min | ⭐⭐ |
| 3 | Extrair `formatCurrency` | 15min | ⭐ |
| 4 | Adicionar CONTRIBUTING.md | 1h | ⭐⭐ |
| 5 | Configurar ESLint strict | 30min | ⭐⭐ |

---

## 📁 ARQUIVOS DO PLANO

- **Análise completa:** `docs/.squads/sessions/analise-portfolio/memories.md`
- **Este plano:** `docs/.squads/sessions/analise-portfolio/plan.md`

---

## 🚀 PRÓXIMO PASSO SUGERIDO

Começar pela **Fase 1.1** (Testes Automatizados) — maior impacto para portfólio com menor risco.

Deseja que eu execute algum item específico deste plano?