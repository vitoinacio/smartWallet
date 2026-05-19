# 💰 SmartWallet - Gestão Financeira Pessoal

<div align="center">

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-purple?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38-green?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.4-black?style=for-the-badge)](https://ui.shadcn.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Dashboard moderna para gestão financeira pessoal com React, TypeScript e Tailwind CSS**

[Acessar Demonstração](https://smart-wallet-eta.vercel.app) • [English Version](./README-en.md)

</div>

---

## 📋 Visão Geral do Projeto

SmartWallet é uma aplicação web completa para gestão de finanças pessoais, desenvolvida com foco em experiência do usuário, design moderno e boas práticas de desenvolvimento. O projeto foi concebido para demonstrar habilidades em desenvolvimento frontend modernas, arquitetura de componentes e integração com serviços cloud.

A aplicação permite que usuários acompanhem suas receitas, despesas, configur metas de economia e recebam alertas sobre contas a pagar, tudo em uma interface intuitiva e responsiva que funciona perfeitamente em dispositivos móveis e desktop.

### 🎯 Público Alvo

- **Usuários finais**: Pessoas que desejam organizar suas finanças pessoais de forma simples e eficiente
- **Recrutadores técnicos**: Profissionais de RH e tecnologia avaliando competências de desenvolvimento
- **Desenvolvedores**: Profissionais que desejam estudar ou contribuir com o projeto

---

## ✨ Funcionalidades Principais

### Sistema de Autenticação
- [x] Login seguro com validação de credenciais
- [x] Cadastro de novos usuários com validação de dados
- [x] Transição animada entre telas de login/cadastro (efeito carrossel)
- [x] Toggle de tema claro/escuro com persistência
- [x] Sistema de autenticação mockada para testes sem backend

### Dashboard Principal
- [x] Visão geral consolidada das finanças
- [x] Gráficos interativos de entradas e saídas
- [x] Resumo mensal com indicadores visuais
- [x] Indicadores de saúde financeira
- [x] Atalhos para ações rápidas

### Gestão Financeira
- [x] Cadastro de receitas e despesas
- [x] Categorização personalizável de transações
- [x] Sistema de débitos/contas a pagar
- [x] Marcação de contas como pagas
- [x] Alertas de vencimento próximos
- [x] Histórico completo de transações

### Páginas Institucionais
- [x] Termos de Uso com navegação por seções
- [x] Política de Privacidade completa
- [x] Fale Conosco com formulário funcional
- [x] Suporte a dark mode em todas as páginas

### Interface e Experiência
- [x] Design responsivo (mobile-first)
- [x] Menu mobile com drawer moderno
- [x] Navegação por âncora na página inicial
- [x] Animações suaves e transições modernas
- [x] Loading states e feedback visual

---

## 🔑 Conta de Teste

| Campo | Valor |
|-------|-------|
| **Email** | `teste@gmail.com` |
| **Senha** | `teste123` |

> **Nota Importante**: O sistema utiliza dados mockados que funcionam em qualquer ambiente (desenvolvimento ou produção), permitindo testes completos sem necessidade de backend. Para usar dados reais, configure a variável `VITE_API_URL`.

---

## 🏗️ Arquitetura do Projeto

### Padrão de Arquitetura

O projeto segue o padrão **MVVM (Model-View-ViewModel)** adaptado para React, combinado com **Feature-Based Architecture** para organização dos módulos. Esta abordagem proporciona:

- **Separação de responsabilidades** clara entre lógica de negócio e apresentação
- **Reutilização de componentes** através de composição
- **Manutenibilidade** facilitada por organização modular
- **Testabilidade** superior através de injeção de dependências

### Estrutura de Diretórios

```
src/
├── components/                    # Componentes reutilizáveis globais
│   ├── layout/                   # Componentes de layout (Header, Footer)
│   │   ├── header/
│   │   │   ├── HeaderContainer.tsx
│   │   │   ├── HeaderIcon.tsx
│   │   │   ├── HeaderNav.tsx
│   │   │   └── Index.tsx
│   │   └── footer/
│   │       └── Footer.tsx
│   └── ui/                       # Componentes base shadcn/ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── sheet.tsx
│       └── [outros componentes]
│
├── core/                         # Configurações e lógica central
│   ├── utils/                   # Funções utilitárias
│   │   ├── cognito.ts          # Simulação de autenticação AWS Cognito
│   │   ├── mask.ts             # Utilitários de formatação
│   │   └── utils.ts            # Funções auxiliares
│   ├── viewModels/             # Hooks de lógica de negócio
│   │   ├── useTheme.ts        # Gerenciamento de tema claro/escuro
│   │   ├── useLoginPage.ts    # Lógica da página de login
│   │   ├── useSignupPage.ts   # Lógica da página de cadastro
│   │   └── UserProvider.tsx   # Contexto de usuário autenticado
│   ├── components/            # Componentes internos do core
│   │   └── Loading.tsx        # Componente de carregamento
│   └── hooks/                 # Hooks customizados globais
│
├── features/                    # Módulos funcionais por domínio
│   ├── auth/                   # Módulo de autenticação
│   │   ├── views/
│   │   │   ├── AuthPage.tsx       # Página unificada login/cadastro
│   │   │   ├── LoginPage.tsx      # Página de login (legado)
│   │   │   ├── CadastroPage.tsx   # Página de cadastro (legado)
│   │   │   └── components/
│   │   │       ├── LoginForm.tsx  # Formulário de login
│   │   │       └── CadastroForm.tsx # Formulário de cadastro
│   │   └── viewModels/
│   │       ├── useLoginPage.ts    # Hook de login
│   │       └── useSignupPage.ts   # Hook de cadastro
│   │
│   ├── dashboard/             # Módulo do dashboard
│   │   └── views/
│   │       ├── DashboardPage.tsx
│   │       └── SettingsPage.tsx
│   │
│   ├── financeiro/           # Módulo de gestão financeira
│   │   └── views/
│   │       └── FinanceiroPage.tsx
│   │
│   ├── home/                 # Módulo da página inicial
│   │   └── views/
│   │       └── HomePage.tsx
│   │
│   └── pages-legais/        # Páginas institucionais
│       └── views/
│           ├── TermosPage.tsx
│           ├── PrivacidadePage.tsx
│           └── FaleConoscoPage.tsx
│
├── routes/                    # Configuração de rotas
│   └── AppRoutes.tsx
│
├── types/                     # Definições de tipos TypeScript
│   └── [arquivos de tipo]
│
├── lib/                       # Configurações e utilitários globais
│   └── utils.ts              # Funções utility do projeto
│
├── App.tsx                    # Componente principal da aplicação
├── main.tsx                   # Ponto de entrada React
└── index.css                  # Estilos globais Tailwind
```

---

## 🛠️ Stack Tecnológico

### Tecnologias Principais

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **React** | 19 | Biblioteca principal para construção de interfaces |
| **TypeScript** | 5.1 | Superset tipado para JavaScript com segurança de tipos |
| **Vite** | 6 | Build tool moderno com HMR nativo |
| **Tailwind CSS** | 3.8 | Framework utility-first para estilização |

### Bibliotecas e Ferramentas

| Categoria | Biblioteca | Propósito |
|-----------|-------------|-----------|
| **UI Components** | shadcn/ui | Componentes acessíveis baseados em Radix UI |
| **Formulários** | React Hook Form | Gerenciamento de formulários com performance |
| **Validação** | Zod | Schema validation para TypeScript |
| **Roteamento** | React Router DOM | Navegação entre páginas SPA |
| **HTTP Client** | Axios | Requisições HTTP para APIs |
| **Ícones** | Lucide React | Ícones consistentes e Легковесні |
| **Notificações** | React Toastify / Sonner | Feedbacks visuais para o usuário |

### Padrões e Práticas

- **Componentização**: Composição de componentes funcionais com hooks
- **Type Safety**: Tipagem completa com TypeScript
- **CSS Utility**: Estilização via classes utilitárias Tailwind
- **Code Splitting**: Divisão de código por rotas
- **Accessibility**: Conformidade com padrões WCAG via Radix

---

## 📱 Design System

### Cores

O projeto utiliza uma paleta de cores profissional desenvolvida para transmitir confiança e seriedade:

```
Primary:     Blue 700 (#1d4ed8) - Confiança e segurança
Secondary:   Neutral 800 (#1f2937) - Elegância no dark mode
Accent:      Green 500 (#22c55e) - Sucesso e dinheiro
Background: Gray 50 / Neutral 900 - Modo claro/escuro
```

### Tipografia

- **Font Family**: Inter (font-family do projeto)
- **Headings**: Bold, tracking-tight
- **Body**: Regular, leading-relaxed

### Componentes

Todos os componentes seguem o design system shadcn/ui com customizações Tailwind, garantindo consistência visual em toda a aplicação.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior
- Git para controle de versão

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/smartWallet.git

# 2. Navegue até o diretório
cd smartWallet

# 3. Instale as dependências
npm install

# 4. (Opcional) Configure variáveis de ambiente
cp .env.example .env

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com HMR |
| `npm run build` | Executa typecheck e build de produção |
| `npm run lint` | Executa ESLint para análise de código |
| `npm run preview` | Serve o build de produção localmente |

### Variáveis de Ambiente

```env
# URL da API backend (opcional)
VITE_API_URL=https://api.exemplo.com

# Forçar uso de dados mockados (opcional)
VITE_USE_MOCK=true
```

---

## 📊 Decisões Técnicas

### Por que React 19?
React 19 traz melhorias significativas de performance com o novo React Compiler, além de hooks mais poderosos e melhor integração com Server Components futuros.

### Por que Tailwind CSS?
Tailwind CSS permite desenvolvimento rápido através de classes utilitárias, elimina a necessidade de arquivos CSS customizados, e facilita a manutenção de design systems consistentes.

### Por que shadcn/ui?
shadcn/ui combina a acessibilidade do Radix UI com a flexibilidade do Tailwind, oferecendo componentes completamente customizáveis que residem no próprio projeto (não são dependências de runtime).

### Sistema de Autenticação Mockada
A implementação de autenticação com dados mockados permite que a aplicação seja completamente funcional para demonstração e testes, podendo ser facilmente integrada com AWS Cognito, Auth0, ou qualquer outro provedor de autenticação real através do arquivo `src/core/utils/cognito.ts`.

---

## 🔄 Fluxo de Dados

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Views     │────▶│  ViewModels  │────▶│  Utils/Services │
│ (Componentes)│◀────│   (Hooks)    │◀────│   (API/Axios)   │
└─────────────┘     └──────────────┘     └─────────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Context    │
                    │ (UserProvider)│
                    └──────────────┘
```

---

## 🧪 Testando a Aplicação

### Login com Conta de Teste

1. Acesse a página de login
2. Use as credenciais: `teste@gmail.com` / `teste123`
3. Explore todas as funcionalidades do dashboard

### Funcionalidades Disponíveis no Mock

- Login e autenticação simulada
- Navegação entre todas as páginas
- Toggle de tema claro/escuro
- Formulários com validação
- Sistema de notificações

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Para contribuir com o projeto:

1. **Fork** o repositório
2. **Clone** sua versão local: `git clone https://github.com/seu-fork/smartWallet.git`
3. **Crie uma branch** para sua feature: `git checkout -b feature/nome-da-feature`
4. **Faça suas alterações** e commite: `git commit -m 'feat: adiciona nova funcionalidade'`
5. **Push** para sua branch: `git push origin feature/nome-da-feature`
6. **Abra um Pull Request** detalhando suas alterações

### Boas Práticas

- Siga os padrões de código do projeto (ESLint configurado)
- Utilize TypeScript com tipos explícitos
- Componentes funcionais com hooks, sem classes
- Classes CSS utilitárias Tailwind, evite CSS inline
- Commits semânticos seguindo Conventional Commits

---

## 📈 Status do Projeto

### Funcionalidades Implementadas

- ✅ Sistema de autenticação completo
- ✅ Dashboard com visualizações
- ✅ Gestão de finanças (receitas/despesas)
- ✅ Controle de débitos
- ✅ Páginas institucionais (Termos, Privacidade, Fale Conosco)
- ✅ Dark mode em toda aplicação
- ✅ Design responsivo mobile-first
- ✅ Menu mobile moderno

### Funcionalidades Planejadas

- [ ] Integração com backend real (AWS Lambda/DynamoDB)
- [ ] Gráficos interativos com biblioteca (Recharts)
- [ ] Exportação de dados (PDF/Excel)
- [ ] Autenticação com provedores sociais (Google, Apple)
- [ ] Push notifications
- [ ] Modo offline com Service Worker

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - consulte o arquivo [LICENSE](LICENSE) para detalhes.

---

## 📞 Contato e Suporte

- **Email**: victor.hugo.ina10@gmail.com
- **Website**: [www.smartwallet.com.br](https://smart-wallet-eta.vercel.app)
- **GitHub Issues**: [Abrir Issue](https://github.com/seu-usuario/smartWallet/issues)

---

## 🙏 Agradecimentos

- [shadcn](https://twitter.com/shadcn) pelo design system extraordinário
- [Vercel](https://vercel.com) pela inspiração em desenvolvimento web moderno
- [Tailwind Labs](https://tailwindcss.com) pela ferramenta de styling revolucionária
- [React Community](https://react.dev) pela biblioteca que mudou o desenvolvimento web

---

<div align="center">

**Desenvolvido com ❤️ e React**

Feito por [Victor Oliveira](https://github.com/vitoinacio)

</div>