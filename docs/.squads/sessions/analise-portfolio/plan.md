# Plano: analise-portfolio

> Gerado em: 2026-05-24 | Squad: frontend-001 (Ana Arquitetura)
> Artefato estático de referência humana — progresso real é rastreado em state.json.

---

## Roadmap Priorizado — SmartWallet

### P0 — Essenciais (MVP+)

| # | Funcionalidade | Esforço | Depende de |
|---|---------------|---------|------------|
| 1 | **Metas de Economia com progresso visual** | 2 dias | Nenhuma |
| 2 | **Extrato mensal + exportação CSV** | 2 dias | Transações existentes |
| 3 | **Estado vazio (empty states) em listas** | 0.5 dia | Nenhuma |
| 4 | **Skeleton loading em todas as páginas** | 0.5 dia | shadcn Skeleton |
| 5 | **Página 404 + redirect** | 0.5 dia | Nenhuma |
| 6 | **Confirmação ao excluir (AlertDialog)** | 0.5 dia | shadcn AlertDialog |
| 7 | **Lazy loading (React.lazy + Suspense)** | 0.5 dia | Nenhuma |
| 8 | **UserProvider com redirect salvo** | 0.5 dia | Nenhuma |

### P1 — Diferenciais Técnicos

| # | Funcionalidade | Esforço | Depende de |
|---|---------------|---------|------------|
| 9 | **Calculadora de Investimentos (juros compostos)** | 3 dias | Nenhuma |
| 10 | **Filtro full-text + valor min/max** | 1 dia | useFiltros |
| 11 | **Animações de transição (framer-motion)** | 1 dia | framer-motion |
| 12 | **Responsividade mobile (tabela → cards)** | 2 dias | shadcn Card |
| 13 | **Categorização inteligente por palavra-chave** | 1 dia | Transações |
| 14 | **Onboarding interativo (tour guiado)** | 2 dias | framer-motion |
| 15 | **Testes de integração (Playwright fluxo completo)** | 2 dias | Features |
| 16 | **Tooltips informativos no Dashboard** | 0.5 dia | shadcn Tooltip |

### P2 — Diferenciais de Mercado

| # | Funcionalidade | Esforço | Dep. técnica |
|---|---------------|---------|-------------|
| 17 | **PWA (manifest + service worker)** — vite-plugin-pwa | 1 dia | Lib externa |
| 18 | **Temas customizáveis (paletas)** | 2 dias | next-themes |
| 19 | **Internacionalização pt-BR + en-US** — react-i18next | 3 dias | Lib externa |
| 20 | **Performance monitoring + Lighthouse CI** | 1 dia | GitHub Actions |
| 21 | **Atalhos de teclado** (Ctrl+N, Ctrl+F, Escape) | 1 dia | Nenhuma |
| 22 | **Orçamento com rollover mensal** | 1 dia | useBudget |
| 23 | **Importar extrato bancário (CSV)** | 3 dias | Nenhuma |
| 24 | **Relatórios Detalhados (página nova)** | 3 dias | Transações |

---

## Melhorias de UX/UI (transversais)

Aplicar durante qualquer implementação:

1. **Empty states** em todas as listas (TransacaoEmpty já existe — verificar uso)
2. **Feedback visual** em ações críticas (loading state + toast)
3. **Responsividade mobile** (sidebar colapsa, tabela → cards)
4. **Skeleton loading** (shadcn Skeleton já existe)
5. **Validação inline** nos formulários (React Hook Form + Zod já configurados)
6. **Animações de rota** (framer-motion AnimatePresence)
7. **Tooltips informativos** (shadcn Tooltip já existe)
8. **Atalhos de teclado**

---

## Regras de Negócio a Implementar

1. Saldo nunca negativo sem alerta
2. Orçamento por categoria (com rollover opcional)
3. Transações recorrentes com pausa por período
4. Status automático: vencido (data passou), pendente (futuro)
5. Meta de economia com sugestão de 10% da renda
6. Categorias vinculadas a tipo (receita/despesa)
7. Cache local com timestamps de validade (30 min)
8. Proteção de rotas com redirect salvo
9. Reset de dados na conta demo (UI em Settings)

---

## Refatorações Técnicas (contínuas)

- [ ] Renomear `package.json` de `teste-shadcdn` → `smartwallet`
- [ ] Padronizar barrel files: usar `index.ts` (não `Index.tsx`)
- [ ] Migrar tipos de transação de `id: number` para `id: string` (UUID)
- [ ] Adicionar try/catch em `getUserId()` (dashboard service)
- [ ] Centralizar entrada mensal em hook compartilhado
- [ ] Usar `Intl.DateTimeFormat` para datas locais
- [ ] Extrair service layer (MockTransactionService / ApiTransactionService)
- [ ] Migrar lista de transações para `@tanstack/react-table`
- [ ] Reutilizar Zod schemas com `z.infer` em vez de interfaces manuais
