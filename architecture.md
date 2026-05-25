# Decisão Arquitetural: Onboarding Multi-Step

**Data:** 2026-05-25
**Agent:** Ana Arquitetura

## Entendimento da Task

Construir um fluxo de onboarding multi-step (Welcome → Income → Goal) para novos usuários no SmartWallet, com barra de progresso, skip por etapa, persistência em localStorage e integração com o sistema de auth/routing existente para redirecionar usuários não-onboardados ao /onboarding e onboardados ao /dashboard.

## Estrutura de Componentes

```
src/features/onboarding/
├── views/
│   ├── OnboardingPage.tsx              → container: orquestra steps, progresso, navegação
│   └── components/
│       ├── StepWelcome/
│       │   ├── StepWelcome.tsx
│       │   └── index.ts
│       ├── StepIncome/
│       │   ├── StepIncome.tsx
│       │   └── index.ts
│       ├── StepGoal/
│       │   ├── StepGoal.tsx
│       │   └── index.ts
│       └── ProgressIndicator/
│           ├── ProgressIndicator.tsx
│           └── index.ts
├── viewModels/
│   └── useOnboarding.ts                → estado, navegação, persistência
├── models/
│   └── OnboardingTypes.ts
├── services/
│   └── onboarding.service.ts           → CRUD localStorage (futuro: API)
└── onboarding.utils.ts                 → helpers puros (formatação, validações)
```

## Decisões de Estado

| Estado | Tipo | Justificativa |
|--------|------|---------------|
| currentStep (0-2) | useState | navegação local, sem compartilhamento |
| formData (OnboardingData) | useState (via hook) | estado do formulário multi-step, persiste em localStorage via service |
| avatarFile (File \| null) | useState | arquivo binário local, convertido para base64 no submit |
| onboardingComplete (boolean) | localStorage (verificado no AuthContext) | sinaliza se onboarding foi concluído; usado para redirect em rotas |
| isSaving (boolean) | useState | feedback visual durante persistência assíncrona mockada |

## Contratos dos Componentes Principais

```typescript
// StepWelcome
interface StepWelcomeProps {
  nome: string;
  avatarPreview: string | null;
  errors: Partial<Record<keyof OnboardingData, string>>;
  onNomeChange: (value: string) => void;
  onAvatarChange: (file: File | null) => void;
  onNext: () => void;
  onSkip: () => void;
}

// StepIncome
interface StepIncomeProps {
  rendaMensal: number;
  categoriasInteresse: string[];
  categoriasDisponiveis: string[];
  errors: Partial<Record<keyof OnboardingData, string>>;
  onRendaChange: (value: number) => void;
  onCategoriasChange: (value: string[]) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

// StepGoal
interface StepGoalProps {
  metaValor: number;
  metaPrazo: string;
  errors: Partial<Record<keyof OnboardingData, string>>;
  onMetaValorChange: (value: number) => void;
  onMetaPrazoChange: (value: string) => void;
  onFinish: () => void;
  onBack: () => void;
  isSaving: boolean;
}

// ProgressIndicator
interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

// OnboardingData (model)
interface OnboardingData {
  nome: string;
  avatar: string | null;       // base64
  rendaMensal: number;
  categoriasInteresse: string[];
  metaEconomia: {
    valor: number;
    prazo: string;              // yyyy-mm-dd
  };
  completo: boolean;
  updatedAt: string;            // ISO string
}
```

## ADR

### ADR-1: Hook único vs hooks por step
**Contexto:** Decidir se cada step tem seu próprio hook ou se o container usa um hook centralizador.
**Decisão:** Hook único `useOnboarding` no container, steps recebem apenas props (stateless).
**Alternativas rejeitadas:** Hook por step — aumentaria complexidade e dificultaria o salvamento parcial entre steps.
**Consequências:** ✅ Estado centralizado facilita persistência / ⚠ Hook pode crescer; extrair serviços mantém o hook enxuto.

### ADR-2: OnboardingCheck como guarda de rota
**Contexto:** Impedir acesso ao /dashboard sem onboarding completo e ao /onboarding se já completo.
**Decisão:** Criar componente `OnboardingGuard` em `src/core/components/` (similar ao `AuthRedirect`) que lê `onboarding.completo` do localStorage.
**Alternativas rejeitadas:** Verificar dentro de cada página — duplicação e acoplamento.
**Consequências:** ✅ Desacoplado e reutilizável / ⚠ Nova dependência de localStorage em core.

### ADR-3: Avatar como base64 no localStorage
**Contexto:** Persistir avatar do usuário sem backend.
**Decisão:** Converter File → base64 via FileReader e armazenar string no onboardingData.
**Alternativas rejeitadas:** Armazenar apenas URL de objeto (revogada após refresh); ignorar avatar no localStorage.
**Consequências:** ✅ Persistente mesmo com refresh / ⚠ Base64 ocupa mais espaço; limite de ~5MB do localStorage pode ser atingido com imagens grandes (aplicar compressão < 200KB).

## Pontos de Atenção para o Dev

- **Guarda de rota:** Adicionar `OnboardingGuard` em `AppRoutes.tsx` — rotas privadas (`/dashboard`, `/financeiro`, `/metas`, `/extrato`, `/settings`) devem redirecionar para `/onboarding` se `onboarding.completo !== true`. Rota `/onboarding` deve redirecionar para `/dashboard` se já completo.
- **Layout:** `OnboardingPage` **não** deve usar `LayoutApp` (sidebar/header). Deve ser fullscreen like auth pages. Adicionar rota fora do `UserProvider` + `LayoutApp` wrapper.
- **AuthRedirect conflict:** Usuário logado que caiu em `/login` via `AuthRedirect` vai para `/dashboard`. Se onboarding incompleto, o `OnboardingGuard` no `/dashboard` deve redirecionar para `/onboarding`. Garantir que ambos os guards funcionem em cascata sem loop.
- **Refresh resilience:** `useOnboarding` deve ler `onboarding.service.ts` no mount para restaurar estado parcial se usuário refreshar no meio do fluxo.
- **Skip lógico:** Pular todos os steps ainda deve marcar `completo: true` com dados default. O `onFinish` deve persistir antes do redirect.
- **shadcn/ui disponíveis:** `Button`, `Input`, `Progress`, `Avatar`, `Card`, `Select`, `Label`, `Form` (Radix + RHF), `Separator`. Usar `Progress` para a barra, `Avatar` para preview da foto, `Card` para wrapper dos steps.
- **Categorias disponíveis:** Reaproveitar lista de categorias do financeiro (`TransacaoTypes.ts` ou similar) para o StepIncome — ou definir um subset fixo no `onboarding.utils.ts` se não houver shared source.
- **Notificações:** Usar Sonner (`toast`) para feedback de sucesso/erro ao finalizar onboarding.
- **Renda com máscara:** `rendaMensal` deve usar input com formatação de moeda BRL. Verificar se existe hook de máscara monetária na codebase (`useEntrada` em dashboard faz algo similar); reutilizar padrão ou extrair utilitário.
