# Arquitetura: Análise de Portfólio — SmartWallet

> **Autora:** Ana Arquitetura (Arquiteta Frontend Sênior)
> **Step:** Decisão de Arquitetura — Pipeline frontend-001
> **Data:** 2026-05-24

---

## Entendimento da Task

Victor Oliveira (dev) pede uma análise completa do SmartWallet como tech lead de portfólio. Ele quer recomendações práticas e específicas em 7 blocos: funcionalidades essenciais, diferenciais, telas, UX/UI, regras de negócio, implementação técnica e roadmap priorizado. O objetivo é tornar o projeto mais completo e atrativo para recrutadores.

O projeto já passou por 2 ciclos de evolução: testes (33 unit + 9 E2E), CI/CD, refatorações (Sonner, Toast), gráficos (Recharts), orçamentos, transações recorrentes e mock interativo. A base está sólida — agora o foco é elevar o patamar para um case de portfólio que impressione.

---

## Análise do Projeto como Tech Lead

### Pontos Fortes Atuais

| Aspecto | Status |
|---|---|
| Estrutura Feature-Based + MVVM | ✅ Clara e escalável |
| Separação models/viewModels/views | ✅ Bem definida |
| Mock interativo com fallback | ✅ Diferencial técnico |
| Testes unitários (33) + E2E (9) | ✅ Acima da média de portfolio |
| CI/CD com GitHub Actions + Vercel | ✅ Maturidade de mercado |
| Gráficos Recharts + Orçamentos + Recorrências | ✅ Funcionalidades complexas |
| Sonner + shadcn/ui + Theme | ✅ Stack moderna |
| TypeScript estrito + ESLint | ✅ Qualidade de código |

### O que falta para ser um Portfólio Forte

| Lacuna | Impacto |
|---|---|
| **Sem gerenciamento de estado global** (Context API/Redux/Zustand) | Dados duplicados entre features (ex: transações no Dashboard vs Financeiro) |
| **API service layer monolítico** (`axios` direto nos hooks) | Acoplamento, difícil testar, sem tipagem de responses |
| **Sem lazy loading / code splitting** | Bundle monolithic, sem otimização de performance |
| **Sem metas de economia com tracking visual** | Funcionalidade financeira incompleta |
| **Sem extrato/exportação de dados** | Falta recurso esperado em app financeiro |
| **Sem calculadora de investimentos** | Diferencial de portfólio perdido |
| **Sem onboarding / tutorial interativo** | UX introdutória ausente |
| **Sem testes de integração entre features** | Cobertura focada em unidades isoladas |
| **Acessibilidade (a11y) não verificada** | Gap em padrão de mercado |
| **PWA não configurado** | Poderia rodar offline / instalar |
| **Internacionalização (i18n) não suportada** | Limita alcance do portfolio |

---

## Funcionalidades Essenciais

O que **não pode faltar** para um app de finanças pessoais completo:

### P0 — Essenciais (precisa ter)

1. **Metas de Economia com Progresso Visual**
   - Definir meta mensal/anual com tracking visual (barra + % + valor restante)
   - Alertas ao atingir 50%, 75%, 100%
   - Render no Dashboard como card destacado

2. **Extrato Mensal com Exportação**
   - Tabela consolidada de receitas/despesas do mês
   - Botão "Exportar como CSV" e "Exportar como PDF"
   - Saldo acumulado mês a mês

3. **Dashboard com Visão Financeira Real**
   - Saldo atual + projeção para o mês
   - Gastos por categoria (já tem no gráfico, mas precisa de card numérico)
   - Transações vencidas em destaque

4. **Paginação/Scroll Infinito na Lista de Transações**
   - A lista atual carrega tudo de uma vez → degrada com muitas transações

5. **Filtros Avançados**
   - Já existe filtro básico (período, tipo)
   - Adicionar: filtro por valor (min/max), por status (pago/pendente/vencido), full-text search na descrição

---

## Funcionalidades Diferenciais para Portfólio

O que **impressiona recrutadores** e demonstra maturidade técnica:

### P1 — Diferenciais Técnicos

1. **Calculadora de Investimentos com Juros Compostos**
   - Simulador: valor inicial + aporte mensal + taxa + prazo → projeção
   - Gráfico de crescimento ao longo do tempo (Recharts)
   - Demonstra capacidade com lógica financeira + visualização

2. **Categorização Inteligente com Autocomplete**
   - Ao digitar descrição da transação, sistema sugere categoria baseada em histórico
   - Ex: "Ifood" → "Alimentação", "Uber" → "Transporte"
   - Implementação simples: mapa de palavras-chave no front

3. **Onboarding Interativo (Tour Guiado)**
   - Primeiro login: tour de 3-4 passos apresentando as telas
   - Usar `framer-motion` (já instalado) para animações
   - Mostra maturidade em UX

4. **Modo Offline com Service Worker**
   - Cache do último estado via localStorage + Service Worker
   - Banner "Modo Offline" quando sem conexão
   - Demonstra conhecimento de PWA

5. **Testes de Integração entre Features**
   - Ex: "criar transação → ver no dashboard → ver no extrato"
   - Teste de fluxo completo (Playwright)
   - Diferencial vs testes unitários isolados

6. **Performance Monitoring**
   - Lighthouse CI no GitHub Actions
   - Badge de performance no README
   - Web Vitals report

### P2 — Diferenciais de Mercado

1. **Internacionalização (i18n)**
   - pt-BR + en-US
   - Troca de idioma no Settings
   - sem dependência extra (i18next não está no package.json)

2. **Tema Customizável (além de dark/light)**
   - Paletas de cores selecionáveis (ex: "Profissional", "Vibrante", "Monocromático")
   - Persistência em localStorage

3. **PWA (Progressive Web App)**
   - Manifest.json + Service Worker
   - Ícone + splash screen
   - "Instalar" no celular

---

## Telas Necessárias

### Mapeamento Atual vs Proposto

| Rota | Tela | Status | Ação |
|---|---|---|---|
| `/` | Home / Landing Page | ✅ Existe | Melhorar hero com demo interativa |
| `/login` | Login | ✅ Existe | OK |
| `/criar` | Cadastro | ✅ Existe | OK |
| `/recuperar` | Recuperar Senha | ✅ Existe | OK |
| `/dashboard` | Dashboard Principal | ✅ Existe | Adicionar metas + extrato rápido |
| `/financeiro` | Gestão Financeira | ✅ Existe | Adicionar paginação |
| `/settings` | Configurações | ✅ Existe | Adicionar tema customizado + i18n |
| `/termos` | Termos de Uso | ✅ Existe | OK |
| `/privacidade` | Privacidade | ✅ Existe | OK |
| `/fale-conosco` | Fale Conosco | ✅ Existe | OK |

### Telas Novas Propostas

| Rota | Tela | Prioridade | Justificativa |
|---|---|---|---|
| `/metas` | Metas de Economia | P0 | Funcionalidade core de app financeiro |
| `/extrato` | Extrato Mensal | P0 | Essencial para gestão financeira |
| `/investimentos` | Calculadora de Investimentos | P1 | Diferencial de portfólio |
| `/relatorios` | Relatórios Detalhados | P1 | Dashboard avançado com filtros |
| `/importar` | Importar/extrato bancário | P2 | Recurso avançado |
| `/404` | Página não encontrada | P0 | UX básica |

---

## Melhorias de UX/UI

### Prioridade Alta

1. **Estado Vazio (Empty State) para Todas as Listas**
   - Quando não há transações: ilustração + "Nenhuma transação encontrada" + CTA "Criar primeira transação"
   - Quando não há orçamentos: "Defina seu primeiro orçamento"
   - Quando filtro não retorna resultados: "Nenhum resultado para estes filtros" + botão "Limpar filtros"
   - Já existe `TransacaoEmpty.tsx` — verificar se está sendo usado em todos cenários

2. **Feedback Visual em Ações Críticas**
   - Excluir transação → diálogo de confirmação (shadcn AlertDialog já existe)
   - Criar/editar → botão com loading state + toast de sucesso/erro
   - Sempre scrollar para o topo após ações (ScrollToTop já existe nas rotas)

3. **Responsividade Mobile**
   - Verificar se sidebar colapsa corretamente em mobile (já tem hook `use-mobile`)
   - Header com hamburger em telas pequenas
   - Tabelas → cartões em mobile (shadcn Table não é responsiva nativamente)

4. **Skeleton Loading**
   - Substituir spinner genérico por skeleton cards (shadcn Skeleton já existe)
   - Dashboard: skeleton do resumo, gráficos e transações recentes
   - Financeiro: skeleton da tabela

5. **Validação em Tempo Real nos Formulários**
   - React Hook Form + Zod já estão configurados
   - Melhorar feedback: erro inline no campo, não apenas toast

### Prioridade Média

6. **Animações de Transição entre Rotas**
   - `framer-motion` já está instalado
   - Adicionar `AnimatePresence` no `AppRoutes`
   - Fade + slide sutis entre páginas

7. **Tooltips Informativos**
   - shadcn Tooltip já existe
   - Adicionar tooltips em ícones, cards de resumo ("Valor total de receitas do mês")
   - Budget: tooltip "Gasto atual vs limite definido"

8. **Atalhos de Teclado**
   - `Ctrl+N` → Nova transação
   - `Ctrl+F` → Focar no campo de busca/filtro
   - `Escape` → Fechar modal/dropdown

### Prioridade Baixa

9. **Custom Scrollbar** (para webkit)
10. **Toasts empilhados com ação "Desfazer"** (Sonner suporta nativamente)

---

## Regras de Negócio Importantes

### Regras Financeiras

1. **Saldo Nunca Negativo sem Alerta**
   - Se receitas - despesas < 0 → toast warning + destaque vermelho no dashboard
   - Impedir criar despesa que zera saldo sem confirmação extra

2. **Orçamento por Categoria com Rollover**
   - Orçamento não utilizado no mês → não acumula para o próximo (padrão)
   - Opção: "Permitir rollover" toggle por categoria
   - Regra: rollover só funciona se orçamento anterior foi 100% cumprido

3. **Transações Recorrentes com Pausa por Período**
   - Recorrência pode ser pausada por N meses (ex: "pausar em janeiro")
   - Ao criar instância, verificar se o mês está dentro do período ativo

4. **Status de Transação com Regra de Data**
   - Se `data` passou e `status !== 'pago'` → automaticamente 'vencido'
   - Se `data` é hoje ou futura → 'pendente'
   - Se marcado como 'pago' → data de pagamento registrada (campo novo)

5. **Meta de Economia com Sugestão Automática**
   - Sugerir 10% da renda mensal como meta padrão
   - Alerta ao atingir 50%, 75%, 100%
   - Meta resetada automaticamente no início de cada mês (ou mantida, configurável)

6. **Categorias com Tipo Vinculado**
   - Categorias de receita (`salario`, `investimento`, `freelance`, `outros_receita`) só podem ser usadas em transações do tipo 'receita'
   - Categorias de despesa (`alimentacao`, `transporte`, etc.) só 'despesa'
   - Validar no formulário + no schema Zod

### Regras de Sistema

7. **Cache Local com Timestamp de Validade**
   - Dados em localStorage expiram após 30 minutos sem sincronia
   - Ao abrir app, verificar idade do cache
   - Se expirado e online → fetch novo; se offline → usar cache com aviso

8. **Proteção de Rotas com Redirect**
   - Já existe `UserProvider` que redireciona para `/login`
   - Melhorar: após login, redirecionar para a rota que o usuário tentou acessar (salvar em `sessionStorage`)

9. **Limpeza de Dados na Conta Demo**
   - Usuário `teste@gmail.com`: botão "Resetar Dados Demo" (já existe no mockService.reset)
   - Expor UI em Settings → Dados

---

## Como Implementar Tecnicamente

### Orientações por Funcionalidade

#### 1. Metas de Economia

```
src/features/metas/
├── models/
│   └── MetasTypes.ts          # MetaEconomia, EconomiaProgress
├── viewModels/
│   └── useMetas.ts            # Estado + lógica (localStorage)
└── views/
    ├── MetasPage.tsx          # Página completa
    └── components/
        ├── MetaCard.tsx       # Card individual com barra
        ├── MetaForm.tsx       # Criar/editar meta
        └── MetaDashboardCard.tsx  # Render no Dashboard
```

- Armazenar em localStorage (já é o padrão do projeto)
- Interface: usar shadcn `Progress` + `Card`
- Schema Zod para validação de valor alvo

#### 2. Extrato e Exportação

- Feature `extrato/` dentro de `features/`
- Tabela com `@tanstack/react-table` (já instalado)
- Exportação CSV: gerar blob in memory, usar `URL.createObjectURL`
- Exportação PDF: usar `window.print()` com CSS `@media print` (sem lib extra) ou `html2canvas` + `jspdf`

```
src/features/extrato/
├── models/
│   └── ExtratoTypes.ts
├── viewModels/
│   └── useExtrato.ts
└── views/
    ├── ExtratoPage.tsx
    └── components/
        ├── TabelaExtrato.tsx
        └── ExportarBotoes.tsx
```

#### 3. Calculadora de Investimentos

```
src/features/investimentos/
├── models/
│   └── InvestimentoTypes.ts   # CenarioInvestimento, ProjecaoMensal
├── viewModels/
│   └── useSimulacao.ts        # Lógica de juros compostos
└── views/
    ├── InvestimentosPage.tsx
    └── components/
        ├── SimuladorForm.tsx  # Inputs: valor inicial, aporte, taxa, prazo
        ├── TabelaProjecao.tsx # Mês a mês
        └── GraficoProjecao.tsx # Recharts line chart
```

- Fórmula de juros compostos: `M = C * (1 + i)^t`
- Usar `useMemo` para calcular projeção reativa
- Recharts LineChart para gráfico de crescimento

#### 4. PWA

- `vite-plugin-pwa` para gerar service worker automaticamente
- Configurar no `vite.config.ts`
- Manifest.json com ícones
- Badge "Instalar App" no header quando detectar que não está instalado

#### 5. Performance (Lazy Loading)

```typescript
// AppRoutes.tsx — já está com imports estáticos
// Migrar para React.lazy():
const Financeiro = lazy(() => import('@/features/financeiro/views/FinanceiroPage'));
const Dashboard = lazy(() => import('@/features/dashboard/views/DashboardPage'));

// Envolver em Suspense com shadcn Skeleton como fallback
```

### State Management — Decisões

| Dado | Tipo de Estado | Justificativa |
|---|---|---|
| Transações | `localStorage` + hook state (`useTransacoes`) | Mock interativo, sem backend real; localStorage já implementado |
| Orçamentos | `localStorage` + hook state (`useBudget`) | Dados do usuário, baixa frequência de atualização |
| Recorrências | `localStorage` + hook state (`useRecorrencia`) | Mesmo caso dos orçamentos |
| Metas de Economia | `localStorage` + hook state (`useMetas`) | Dado persistente, escopo local |
| Tema (dark/light) | `next-themes` (ThemeProvider) | Global, poucas re-renderizações |
| Sidebar state | Context (`SidebarProvider`) | Global UI state |
| Usuário logado | `sessionStorage` (`UserProvider`) | Sessão, não precisa de estado global |
| Filtros (financeiro) | Hook state local (`useFiltros`) | Escopo da página, não compartilhado |
| Entrada mensal | `localStorage` + hook state (`useEntrada`) | Dado financeiro persistente |
| Idioma | `Context` ou Zustand (se adicionar i18n) | Global, poucas atualizações |

**Decisão:** manter MVVM com hooks (sem estado global adicional) por enquanto. O app não tem estado compartilhado complexo o suficiente para justificar Redux/Zustand. Se i18n for adicionado, usar `Context` simples.

---

## Estrutura de Componentes

### Componentes Existentes (mapeamento completo)

```
src/
├── App.tsx                              # Root: BrowserRouter + Toaster
├── main.tsx                             # Entry point
│
├── components/
│   ├── layout/
│   │   ├── sidebar/
│   │   │   ├── AppSidebar.tsx           # Sidebar container
│   │   │   ├── NavPages.tsx            # Navegação entre páginas
│   │   │   ├── NavUser.tsx             # Avatar + user info
│   │   │   └── index.tsx
│   │   ├── header/
│   │   │   ├── HeaderContainer.tsx
│   │   │   ├── HeaderIcon.tsx
│   │   │   ├── HeaderNav.tsx
│   │   │   └── Index.tsx
│   │   └── footer/
│   └── ui/ (20 shadcn components)
│
├── core/
│   ├── components/
│   │   ├── LayoutApp.tsx               # Layout protegido (sidebar + content)
│   │   ├── LayoutIndex.tsx             # Layout público (landing)
│   │   └── Loading.tsx                 # Spinner genérico
│   ├── models/
│   │   ├── index.ts
│   │   ├── DashboardTypes.ts           # DashboardEntrada, DashboardResumo, etc
│   │   └── DebitosTypes.ts             # Debitos, InfoDebitoTypes
│   ├── services/
│   │   └── api/
│   │       ├── dashboard.ts            # getFinanceiro, setDashboardData (axios)
│   │       └── debitos.ts              # getDebitosData, setDebitosData (axios)
│   ├── utils/
│   │   ├── cognito.ts                  # Auth helpers
│   │   ├── formatedBrl.ts             # R$ formatting
│   │   ├── formatedDate.ts            # Date formatting
│   │   ├── isTestUser.ts              # Detecção de usuário mock
│   │   └── User.ts                    # User helpers
│   └── viewModels/
│       ├── UserProvider.tsx            # Auth guard + redirect
│       ├── useTheme.tsx                # Dark mode (next-themes)
│       ├── useSidebar.tsx              # Sidebar collapse state
│       ├── useScroll.tsx               # Scroll position tracking
│       ├── useMobile.tsx               # Mobile detection
│       └── useUserInfo.ts             # User data from sessionStorage
│
├── features/
│   ├── auth/
│   │   ├── models/AuthTypes.ts
│   │   ├── viewModels/
│   │   │   ├── useAuthPage.ts
│   │   │   ├── useAuthAnimation.ts
│   │   │   ├── useLoginPage.ts
│   │   │   └── useSignupPage.ts
│   │   └── views/
│   │       ├── AuthPage.tsx
│   │       ├── LoginPage.tsx
│   │       ├── CadastroPage.tsx
│   │       └── components/
│   │           ├── AuthFormContainer.tsx
│   │           ├── AuthPainelBlue.tsx
│   │           ├── CadastroForm.tsx
│   │           ├── LoginForm.tsx
│   │           └── RecuperarSenhaForm.tsx
│   │
│   ├── dashboard/
│   │   ├── models/
│   │   │   ├── index.ts
│   │   │   ├── DashboardTypes.ts
│   │   │   └── SettingsTypes.ts
│   │   ├── viewModels/
│   │   │   ├── index.ts
│   │   │   ├── useEntrada.ts
│   │   │   ├── useResumo.ts
│   │   │   ├── useSettings.ts
│   │   │   └── useTransacoesRecentes.ts
│   │   └── views/
│   │       ├── DashboardPage.tsx
│   │       ├── SettingsPage.tsx
│   │       └── components/
│   │           ├── index.ts
│   │           ├── SaudacaoUsuario.tsx
│   │           ├── ResumoFinanceiro.tsx
│   │           ├── EntradaEditor.tsx
│   │           ├── TransacoesRecentes.tsx
│   │           ├── AcoesRapidas.tsx
│   │           ├── GraficoRosca.tsx
│   │           ├── GraficoBarras.tsx
│   │           ├── SettingsNav.tsx
│   │           ├── SettingsPerfil.tsx
│   │           ├── SettingsApp.tsx
│   │           ├── SettingsSeguranca.tsx
│   │           ├── SettingsDados.tsx
│   │           └── SettingsSobre.tsx
│   │
│   ├── financeiro/
│   │   ├── models/
│   │   │   ├── index.ts
│   │   │   ├── TransacaoTypes.ts
│   │   │   ├── BudgetTypes.ts
│   │   │   └── RecorrenciaTypes.ts
│   │   ├── viewModels/
│   │   │   ├── index.ts
│   │   │   ├── useTransacoes.ts
│   │   │   ├── useTransacaoForm.ts
│   │   │   ├── useResumo.ts
│   │   │   ├── useFiltros.ts
│   │   │   ├── useBudget.ts
│   │   │   └── useRecorrencia.ts
│   │   └── views/
│   │       ├── FinanceiroPage.tsx
│   │       └── components/
│   │           ├── index.ts
│   │           ├── TransacaoForm.tsx
│   │           ├── TransacaoInputs.tsx
│   │           ├── TransacaoLista.tsx
│   │           ├── TransacaoItem.tsx
│   │           ├── TransacaoEmpty.tsx
│   │           ├── TransacaoCategoriaSelect.tsx
│   │           ├── TransacaoTipoSelect.tsx
│   │           ├── TransacaoNotificacao.tsx
│   │           ├── FiltrosBar.tsx
│   │           ├── ResumoCards.tsx
│   │           ├── BudgetForm.tsx
│   │           ├── BudgetProgress.tsx
│   │           ├── RecorrenciaForm.tsx
│   │           └── RecorrenciaList.tsx
│   │
│   ├── home/
│   │   └── views/
│   │       ├── HomePage.tsx
│   │       └── components/
│   │           ├── index.ts
│   │           ├── HeroSection.tsx
│   │           ├── FeaturesSection.tsx
│   │           ├── FuncionalidadesSection.tsx
│   │           ├── ComoFuncionaSection.tsx
│   │           ├── BeneficiosSection.tsx
│   │           ├── StatsSection.tsx
│   │           ├── SobreSection.tsx
│   │           └── CTASection.tsx
│   │
│   └── pages-legais/
│       └── views/
│           ├── TermosPage.tsx
│           ├── PrivacidadePage.tsx
│           └── FaleConoscoPage.tsx
│
├── routes/
│   └── AppRoutes.tsx                   # React Router config
│
├── lib/
│   └── utils.ts                        # cn() utility
│
├── mocks/
│   └── transacoes.ts                   # MockService + 19 transações
│
└── test/                               # Test setup
```

### Estrutura Proposta (novas features)

```
src/features/
├── metas/                              # NOVO — Metas de Economia
│   ├── models/MetasTypes.ts
│   ├── viewModels/useMetas.ts
│   └── views/
│       ├── MetasPage.tsx
│       └── components/
│           ├── MetaCard.tsx
│           ├── MetaForm.tsx
│           └── MetaDashboardCard.tsx
│
├── extrato/                            # NOVO — Extrato Mensal
│   ├── models/ExtratoTypes.ts
│   ├── viewModels/useExtrato.ts
│   └── views/
│       ├── ExtratoPage.tsx
│       └── components/
│           ├── TabelaExtrato.tsx
│           └── ExportarBotoes.tsx
│
└── investimentos/                      # NOVO — Calculadora
    ├── models/InvestimentoTypes.ts
    ├── viewModels/useSimulacao.ts
    └── views/
        ├── InvestimentosPage.tsx
        └── components/
            ├── SimuladorForm.tsx
            ├── TabelaProjecao.tsx
            └── GraficoProjecao.tsx
```

---

## Decisões de Estado

Para cada funcionalidade, abaixo o tipo de estado, onde vive e por quê.

| Funcionalidade | Dado | Tipo de Estado | Onde Vive | Justificativa |
|---|---|---|---|---|
| **Auth** | Usuário logado | `sessionStorage` + redirect | `UserProvider` + localStorage | Sessão efêmera; não precisa de estado global reativo |
| **Auth** | Rota atual | URL | React Router | Estado da aplicação representado na URL |
| **Transações** | Lista de transações | Local (hook) + localStorage | `useTransacoes` | Dado mutável, escopo da feature financeiro; sem backend real, persistência em localStorage |
| **Dashboard** | Transações recentes | Derivado (useMemo) | `useTransacoesRecentes` | Fatiamento da lista de transações, não estado novo |
| **Dashboard** | Entrada mensal | Local (hook) + localStorage | `useEntrada` | Dado financeiro simples, escopo do dashboard |
| **Dashboard** | Resumo financeiro | Derivado (useMemo) | `useResumo` | Cálculo puro a partir de entrada + transações |
| **Dashboard** | Dados do gráfico | Derivado (useMemo) | `DashboardPage` (inline) | Transformação da lista de transações |
| **Orçamentos** | Budgets por mês | Local (hook) + localStorage | `useBudget` | Persistência local, escopo da feature financeiro |
| **Orçamentos** | Progresso dos budgets | Derivado (useMemo) | `useBudget` | Cálculo a partir de budgets + transações |
| **Recorrências** | Templates | Constante (`TEMPLATES_RECURRENCIA`) | `useRecorrencia` | Dado estático, nunca muda |
| **Recorrências** | Recorrências ativas | Local (hook) + localStorage | `useRecorrencia` | CRUD do usuário, persistência local |
| **Recorrências** | Instâncias do mês | Local (hook) + localStorage | `useRecorrencia` | Gerado automaticamente, persistido |
| **Metas** | Metas de economia | Local (hook) + localStorage | `useMetas` (proposto) | Dado persistente, escopo da feature |
| **Filtros** | Filtro ativo | URL params | `useFiltros` + `useSearchParams` | Estado de UI que deve ser compartilhável via URL |
| **Tema** | dark/light | Global Provider | `ThemeProvider` (next-themes) | Tema afeta toda a app, poucas re-renderizações |
| **Sidebar** | Collapsed state | Context | `SidebarProvider` | Estado global de UI, compartilhado entre layout + sidebar |
| **Settings** | Perfil, app, segurança | Local (hook) + sessionStorage | `useSettings` | Dados do usuário, escopo da página |
| **Mock** | Flag de usuário teste | Derivado de email | `isTestUser()` | Cálculo puro, sem estado |
| **i18n** | Idioma selecionado | Context (proposto) | `I18nProvider` (proposto) | Global, poucas atualizações, poucos consumidores |

### Diagrama de Fluxo de Dados

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────┐
│  User Auth   │────▶│  UserProvider    │────▶│  Rotas       │
│  (Cognito)   │     │  (sessionStorage)│     │  Protegidas  │
└─────────────┘     └──────────────────┘     └──────────────┘
                                                      │
                                                      ▼
┌──────────────────────────────────────────────────────────┐
│                    LayoutApp (Sidebar + Header)           │
│  ThemeProvider (next-themes) │ SidebarProvider (Context)  │
└──────────────────────────────────────────────────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   ▼                           ▼
          ┌────────────────┐          ┌──────────────────┐
          │  DashboardPage  │          │ FinanceiroPage   │
          │  useEntrada()   │          │ useTransacoes()  │
          │  useResumo()    │          │ useFiltros()     │
          │  useMemo()      │          │ useBudget()      │
          └────────┬───────┘          │ useRecorrencia() │
                   │                  └────────┬─────────┘
                   ▼                           ▼
          ┌──────────────────────────────────────────┐
          │            localStorage                  │
          │  (mock_transacoes, budgets, recorrencias) │
          └──────────────────────────────────────────┘
```

---

## Contratos dos Componentes Principais

### Interface: `Transacao`

```typescript
// src/features/financeiro/models/TransacaoTypes.ts
export type TipoTransacao = 'receita' | 'despesa';
export type StatusPagamento = 'pago' | 'pendente' | 'vencido';

export interface Categoria {
  id: string;
  nome: string;
  icone: string;
  cor: string;
}

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoria: string;
  data: string;
  status: StatusPagamento;
  observacao?: string;
  notificar: boolean;
}

export interface TransacaoFormData {
  descricao: string;
  valor: string;
  tipo: TipoTransacao;
  categoria: string;
  data: string;
  observacao?: string;
  notificar: boolean;
}

export interface FiltrosTransacao {
  periodo: 'semana' | 'mes' | 'ano' | 'custom';
  tipo?: TipoTransacao;
  categoria?: string;
  dataInicio?: string;
  dataFim?: string;
}

export interface ResumoFinanceiro {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  transacoesPendentes: number;
  transacoesVencidas: number;
}
```

### Interface: `Budget`

```typescript
// src/features/financeiro/models/BudgetTypes.ts
export interface Budget {
  id: string;
  categoria: string;
  limite: number;
  mes: string; // YYYY-MM
}

export interface BudgetProgress {
  categoria: string;
  limite: number;
  gasto: number;
  percentual: number;
  status: 'ok' | 'warning' | 'excedido';
}

export interface MetaEconomia {
  percentual: number; // 0-100
  valorAlvo: number;
}
```

### Interface: `Recorrencia`

```typescript
// src/features/financeiro/models/RecorrenciaTypes.ts
export type FrequenciaRecorrencia = 'semanal' | 'mensal' | 'trimestral' | 'anual';

export interface Recorrencia {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  frequencia: FrequenciaRecorrencia;
  diaVencimento: number; // 1-31
  dataInicio: string; // YYYY-MM-DD
  dataFim?: string;
  ativa: boolean;
  observacao?: string;
  notificar: boolean;
  templateId?: string;
}

export interface InstanciaRecorrencia {
  id: number;
  recorrenciaId: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: string;
  status: 'pago' | 'pendente' | 'vencido';
  observacao?: string;
  notificar: boolean;
  geradaAutomaticamente: boolean;
}

export interface RecorrenciaTemplate {
  id: string;
  nome: string;
  descricao: string;
  valorSugerido: number;
  categoria: string;
  frequencia: FrequenciaRecorrencia;
  diaVencimento: number;
  icone: string;
}
```

### Interfaces Propostas (novas features)

```typescript
// src/features/metas/models/MetasTypes.ts  (PROPOSTO)
export interface MetaEconomia {
  id: string;
  nome: string;
  valorAlvo: number;
  valorAtual: number;
  mes: string; // YYYY-MM
  tipo: 'mensal' | 'anual';
  categoria?: string; // opcional: associar a categoria específica
  ativa: boolean;
}

export interface EconomiaProgress {
  meta: MetaEconomia;
  percentual: number;
  restante: number;
  status: 'ok' | 'warning' | 'atingida';
}

// src/features/investimentos/models/InvestimentoTypes.ts  (PROPOSTO)
export interface ParametrosSimulacao {
  valorInicial: number;
  aporteMensal: number;
  taxaAnual: number;   // %
  prazoMeses: number;
}

export interface ProjecaoMensal {
  mes: number;
  valorInicial: number;
  aporte: number;
  juros: number;
  valorFinal: number;
}

// src/features/extrato/models/ExtratoTypes.ts  (PROPOSTO)
export interface ExtratoMensal {
  mes: string;       // YYYY-MM
  receitas: number;
  despesas: number;
  saldo: number;
  transacoes: Transacao[];
}
```

### Props dos Componentes View

```typescript
// Padrão atual — todos os componentes view recebem dados + callbacks via props
// Exemplo de contratos existentes:

interface ResumoCardsProps {
  resumo: ResumoFinanceiro;
}

interface TransacaoFormProps {
  onSubmit: (data: TransacaoFormData) => Promise<void>;
  isLoading: boolean;
}

interface TransacaoListaProps {
  transacoes: Transacao[];
  isLoading: boolean;
  onExcluir: (id: number) => void;
}

interface FiltrosBarProps {
  filtros: FiltrosTransacao;
  onPeriodoChange: (periodo: FiltrosTransacao['periodo']) => void;
  onTipoChange: (tipo?: TipoTransacao) => void;
  onLimpar: () => void;
  temFiltros: boolean;
}

interface GraficoRoscaProps {
  dados: { nome: string; valor: number; cor: string }[];
}

interface GraficoBarrasProps {
  dados: { mes: string; receitas: number; despesas: number }[];
}

interface BudgetProgressListProps {  // (exportado como BudgetProgressList do index)
  progressos: BudgetProgress[];
  onRemover: (categoria: string) => void;
}
```

---

## Roadmap por Prioridade

### P0 — Essencial (MVP+)

| # | Funcionalidade | Esforço | Depende de |
|---|---|---|---|
| 1 | Metas de Economia com progresso visual | 2 dias | Nenhuma |
| 2 | Extrato mensal com exportação CSV | 2 dias | Transações existentes |
| 3 | Estado vazio (empty states) em listas | 0.5 dia | Nenhuma |
| 4 | Skeleton loading em todas as páginas | 0.5 dia | shadcn Skeleton (já existe) |
| 5 | Página 404 + redirect | 0.5 dia | Nenhuma |
| 6 | Confirmação ao excluir (AlertDialog) | 0.5 dia | shadcn AlertDialog (já existe) |
| 7 | Lazy loading das páginas (React.lazy) | 0.5 dia | Nenhuma |
| 8 | Melhorar UserProvider com redirect salvo | 0.5 dia | Nenhuma |

### P1 — Diferenciais Técnicos

| # | Funcionalidade | Esforço | Depende de |
|---|---|---|---|
| 9 | Calculadora de Investimentos (juros compostos) | 3 dias | Nenhuma |
| 10 | Filtro full-text + valor min/max | 1 dia | useFiltros existente |
| 11 | Animações de transição (framer-motion) | 1 dia | framer-motion (já instalado) |
| 12 | Responsividade mobile (tabela → cards) | 2 dias | shadcn Card |
| 13 | Categorização inteligente por palavra-chave | 1 dia | Transações existentes |
| 14 | Onboarding interativo (tour) | 2 dias | framer-motion |
| 15 | Testes de integração (Playwright fluxo completo) | 2 dias | Features existentes |
| 16 | Tooltips informativos no Dashboard | 0.5 dia | shadcn Tooltip (já existe) |

### P2 — Diferenciais de Mercado

| # | Funcionalidade | Esforço | Depende de |
|---|---|---|---|
| 17 | PWA (manifest + service worker) | 1 dia | vite-plugin-pwa |
| 18 | Temas customizáveis (paletas) | 2 dias | next-themes |
| 19 | Internacionalização (pt-BR + en-US) | 3 dias | Nenhuma (sem lib extra) |
| 20 | Performance monitoring + Lighthouse CI | 1 dia | GitHub Actions |
| 21 | Atalhos de teclado | 1 dia | Nenhuma |
| 22 | Orçamento com rollover | 1 dia | useBudget existente |
| 23 | Importar extrato bancário (CSV) | 3 dias | Nenhuma |
| 24 | Relatórios Detalhados (página nova) | 3 dias | Transações + Gráficos |

---

## Pontos de Atenção para o Dev

### Edge Cases e Alertas

1. **Transações com `id: number` — risco de conflito**
   - Mock usa números sequenciais; se transação real vier da API com ID diferente, pode haver conflito
   - Sugestão: migrar para `id: string` (UUID) em toda a base

2. **`localStorage` sem tratamento de falha em alguns pontos**
   - `useBudget` e `useRecorrencia` tratam `JSON.parse` com try/catch ✅
   - `mockService.getTransacoes` trata com try/catch ✅
   - `getUserId()` em `dashboard.ts` NÃO trata erro de parse → pode quebrar
   - `getStoredInstancias` e `getStoredRecorrencias` tratam ✅

3. **`useEntrada` no Dashboard vs Entrada no Financeiro**
   - Entrada mensal é gerenciada em `useEntrada.ts` (Dashboard)
   - `ResumoFinanceiro` no Financeiro recebe transações e calcula localmente
   - **Inconsistência:** se o usuário muda a entrada no Dashboard e vai para Financeiro, a entrada não reflete
   - Solução: extrair "entrada mensal" para um hook compartilhado ou centralizar em Context

4. **Data sem fuso horário**
   - `new Date().toISOString().split('T')[0]` retorna UTC
   - Usuário em GMT-3 pode ter data incorreta se criada perto da meia-noite
   - Sugestão: usar `Intl.DateTimeFormat` para obter data local

5. **Performance com muitas transações**
   - `useTransacoes` carrega toda a lista → com 1000+ itens, renderização pode degradar
   - Solução futura: virtualização (`@tanstack/react-virtual`) + paginação

6. **Serviço de API real vs mock**
   - Código tem `if (isTestUser())` espalhado em vários hooks
   - Se um dia tiver backend real, essa lógica precisará ser extraída para um service layer
   - Sugestão: criar `TransactionService` com interface `getAll()`, `create()`, `delete()` e duas implementações: `MockTransactionService` e `ApiTransactionService`

7. **`@tanstack/react-table` instalado mas não usado**
   - A tabela de transações usa `map` manual, não o `useReactTable`
   - Para Extrato e para otimizar a lista atual, vale migrar

8. **Zod schemas não reutilizados entre validação e types**
   - `TRANSACAO_SCHEMA` existe mas `TransacaoFormData` é interface separada
   - Poderiam ser inferidos: `z.infer<typeof TRANSACAO_SCHEMA>`

9. **Nome do projeto no package.json: `teste-shadcdn`**
   - Renomear para `smartwallet` — detalhe que recrutador nota

10. **`index.ts` em módulos vs `index.tsx`**
    - Alguns componentes exportam de `index.ts` (ex: sidebar), outros de `Index.tsx` (header)
    - Padronizar: usar `index.ts` sempre (barrel file)

---

## HANDOFF

**Decisões que o próximo agente deve respeitar:**
- Manter MVVM com hooks (sem Redux/Zustand) — estado global desnecessário no momento
- Novas features seguem o padrão `models/` → `viewModels/` → `views/` dentro de `features/`
- Dados persistidos em `localStorage` com fallback try/catch obrigatório
- Componentes view recebem dados + callbacks via props (sem acessar hooks diretamente)
- Zod schemas devem ser usados para inferir tipos (`z.infer`) em vez de interfaces duplicadas
- Tema: `next-themes`; Gráficos: `Recharts`; Tabelas: `@tanstack/react-table` (migrar lista atual)

**O que foi entregue:**
- `architecture.md` — análise completa do SmartWallet como tech lead:
  - Avaliação de pontos fortes e lacunas
  - 5 funcionalidades essenciais (P0) + 6 diferenciais técnicos (P1) + 3 diferenciais de mercado (P2)
  - 5 telas novas propostas + 10 melhorias de UX/UI
  - 9 regras de negócio detalhadas
  - Roadmap priorizado com 24 itens (P0/P1/P2)
  - Estrutura de componentes existentes e propostos
  - Decisões de estado para cada funcionalidade (20 itens mapeados)
  - Contratos TypeScript dos componentes principais
  - 10 pontos de atenção para o dev com edge cases

**O que o próximo agente precisa saber:**
- A base está sólida com 33 testes unitários + 9 E2E + CI/CD + gráficos + orçamentos + recorrências + mock interativo
- O foco deve ser elevar o patamar para portfólio: começar pelo P0 (metas, extrato, empty states, skeleton, lazy loading)
- O mock interativo via localStorage já está funcional e testado
- `framer-motion` já está instalado — pode ser usado para animações sem nova dependência
- `@tanstack/react-table` está instalado mas não está sendo usado na lista de transações — migrar quando for implementar a tabela de extrato

**Bloqueios ou [DECISÃO PENDENTE]:**
- Nenhum bloco identificado
- `[DECISÃO PENDENTE]` Se for adicionar i18n, escolher entre: (a) Context simples (sem lib), (b) `react-i18next` (mais completo). Recomendação: Context simples, já que o app tem poucas strings e não justifica dependência extra.
- `[DECISÃO PENDENTE]` Se for adicionar exportação de PDF, decidir entre: (a) `window.print()` com CSS @media print (sem dependência), (b) `html2canvas` + `jspdf`. Recomendação: começar com `window.print()` — mais simples, sem dependência extra.
- `[DECISÃO PENDENTE]` Se for adicionar PWA, confirmar uso de `vite-plugin-pwa` (recomendado) vs configuração manual de service worker.
