# Arquitetura: analise-portfolio

## Escopo da Análise

Este documento define o escopo e estrutura para a análise completa do SmartWallet.

## Arquivos a analisar

### Visão Geral
- README.md
- docs/ (se existir)
- src/ (estrutura completa)

### Stack e Tecnologias
- package.json
- tsconfig.json
- vite.config.ts
- tailwind.config.js

### Código
- src/components/
- src/features/
- src/core/
- src/routes/
- src/lib/
- src/types/

### UI/UX
- src/features/*/views/*.tsx
- src/components/layout/
- src/index.css

## ADRs Aplicadas

Nenhuma ADR existente no projeto.

## Verificação de Consistência

✅ Estrutura de pastas: Feature-Based Architecture com MVVM
✅ Components: shadcn/ui + layout components
✅ Features: auth, dashboard, financeiro, home, pages-legais
✅ Core: utils, viewModels, hooks, components
✅ Rotas: React Router DOM com proteção via UserProvider

## Arquivos a modificar/criar

Para análise:
- docs/.squads/sessions/analise-portfolio/architecture.md (atualizar com escopo completo)
- docs/.squads/sessions/analise-portfolio/plan.md (definir fases de análise)

Para recomendações:
- docs/tech/ (novos arquivos de documentação técnica)
- docs/business/ (documentação de negócio se necessário)