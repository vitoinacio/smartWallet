# Contexto: analise-portfolio

> Arquivo central da feature. Lido por todos os roles antes de executar qualquer step.
> Atualizado pelo role que fizer discovery/investigação.

## O que é
Análise completa do projeto SmartWallet como tech lead, avaliando funcionalidades essenciais, diferenciais de portfólio, telas, UX, regras de negócio e roadmap priorizado para tornar o projeto mais completo e atrativo para recrutadores.

## Por que existe
O usuário (Victor Oliveira) deseja transformar este projeto em um case forte para seu portfólio, destacando suas habilidades como desenvolvedor. O objetivo é tornar a aplicação mais completa, sólida, bem estruturada e alinhada às melhores práticas de desenvolvimento.

## Decisões tomadas
- Squad: analise-wallet-001 (Squad Engineer)
- Modo: complete (execução completa com ADRs e contexto)
- Domínio: engineer (foco em análise técnica e arquitetura)
- Usuário de teste: `teste@gmail.com` → mock interativo via localStorage
- Demais usuários → API real

## O que não fazer
- Não criar backend real (manter mock atual)
- Não modificar a stack principal (React/TypeScript/Vite)
- Não usar `any` types (exceto catch blocks com eslint-disable)
- Não desabilitar regras do ESLint
- Não criar wrappers customizados quando o shadcn/ui já tem o componente nativo

## Fases implementadas

### Fase 1.1 — Testes Automatizados
- Vitest + Testing Library (33 testes unitários)
- Playwright E2E (9 testes)
- Configuração de CI para testes

### Fase 1.2 — CI/CD Pipeline
- GitHub Actions: lint, typecheck, unit tests, E2E tests
- Deploy automático via Vercel CLI
- Playwright configurado para CI (sem caminho hardcoded)

### Fase 1.3 — Refatorações de Qualidade
- ToastContainer centralizado em App.tsx (removido de 6 páginas)
- react-toastify → Sonner (shadcn/ui nativo)
- Hook useToast removido (redundante)
- ViewModels atualizados para usar toast nativo

### Fase 2.1 — Gráficos Interativos
- Recharts instalado
- GraficoRosca (despesas por categoria)
- GraficoBarras (receitas vs despesas mensal)
- Integrados no Dashboard

### Fase 2.2 — Orçamentos e Metas
- Budget mensal por categoria
- Barras de progresso com status (ok/warning/excedido)
- Alertas automáticos ao atingir 80% e 100%
- CRUD completo via localStorage

### Fase 2.3 — Transações Recorrentes
- Recorrências com frequência (semanal, mensal, trimestral, anual)
- 10 templates pré-configurados (Netflix, Spotify, Aluguel, etc)
- Geração automática de instâncias no início do mês
- Toggle ativar/pausar, excluir
- Playwright E2E corrigido — usa Chrome do sistema local (9/9 passando)

### Mock Interativo
- Detecção automática por email (`teste@gmail.com`)
- 19 transações realistas pré-carregadas
- CRUD completo: adicionar/excluir transações e renda mensal
- Persistência em localStorage
