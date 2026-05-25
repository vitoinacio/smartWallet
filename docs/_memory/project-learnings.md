# Aprendizados do Projeto

> Aprendizados transversais compartilhados por todos os squads deste projeto.
> Atualizado automaticamente ao final de cada pipeline.

## Aprendizado — 2026-05-24 [frontend-001 / analise-portfolio]

SmartWallet é um projeto de portfólio frontend/web para gestão de finanças pessoais. O objetivo é evoluir o projeto com qualidade profissional, clareza para tech recruiters e foco em UX, arquitetura, testes e boas práticas.

### Regras Globais Obrigatórias
- `.synapos` é a fonte principal de verdade do projeto
- Todos os squads devem seguir estritamente o workflow, agentes, etapas, validações e critérios definidos no `.synapos`
- Em caso de conflito, o `.synapos` sempre vence
- Não implementar código antes da etapa correta do workflow
- Não pular análise, planejamento, revisão, documentação ou validação quando exigidos
- Manter arquitetura atual: separação view / viewModel / service / types / schemas
- TypeScript forte — nunca usar `any`
- Validações com Zod quando aplicável
- Manter integração mock/API sem quebrar o fluxo atual
- Toda funcionalidade deve prever loading, erro, sucesso e estado vazio
- Toda implementação relevante deve prever testes unitários e/ou E2E
- Priorizar entregas úteis para produto real e atrativas para portfólio
- Cada componente: uma única exportação (SOLID)
- Se o componente passar de 100 linhas, componentizar mais para melhorar manutenabilidade
