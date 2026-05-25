# Review Notes — Onboarding Multi-Step

**Data:** 2026-05-25
**Reviewer:** Renata Revisão

## Resumo
- BLOCKERs: 3 (resolvidos)
- SUGGESTIONs: 4 (2 resolvidos, 2 pendentes)
- QUESTIONs: 1 (esclarecido)
- PRAISEs: 3

## BLOCKERs Resolvidos

### BLOCKER 1: skip reference antes da declaração
**Arquivo:** `src/features/onboarding/viewModels/useOnboarding.ts`
**Correção:** Reordenado `finishOnboarding` antes de `skip`. `finishOnboarding` adicionado às dependências de `skip` no `useCallback`.

### BLOCKER 2: Erros de validação engolidos
**Arquivo:** `src/features/onboarding/viewModels/useOnboarding.ts`
**Correção:** Adicionado estado `StepErrors` com mensagens granulares por campo. ZodError.issues mapeado para erros específicos (nome, rendaMensal, categoriasInteresse, metaValor, metaPrazo). Props de erro conectadas aos componentes.

### BLOCKER 3: Upload de avatar inacessível por teclado
**Arquivo:** `src/features/onboarding/views/components/StepWelcome/StepWelcome.tsx`
**Correção:** Substituído `<Label>` por `<Button>` com `aria-label`, `sr-only` no input file com `ref` programático. Botão focalizável e acionável por teclado.

## SUGGESTIONs Pendentes
- **Focus management entre steps:** autoFocus adicionado no input de nome. Demais steps podem ser melhorados com foco programático.
- **Renda input UX:** `QUESTION` sobre notação de centavos para renda mensal — comportamento intencional (entrada em centavos como o resto do app).
