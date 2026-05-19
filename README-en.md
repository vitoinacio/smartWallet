# 💰 SmartWallet - Personal Finance Management

<div align="center">

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-purple?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38-green?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.4-black?style=for-the-badge)](https://ui.shadcn.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Modern dashboard for personal finance management built with React, TypeScript, and Tailwind CSS**

[View Demo](https://smart-wallet-eta.vercel.app) • [Versão em Português](./README.md)

</div>

---

## 📋 Project Overview

SmartWallet is a complete web application for personal finance management, developed with a focus on user experience, modern design, and development best practices. The project was designed to demonstrate skills in modern frontend development, component architecture, and cloud services integration.

The application allows users to track their income and expenses, set savings goals, and receive alerts about upcoming bills, all through an intuitive and responsive interface that works perfectly on mobile devices and desktop.

### 🎯 Target Audience

- **End Users**: People who want to organize their personal finances simply and efficiently
- **Tech Recruiters**: HR and technology professionals evaluating development skills
- **Developers**: Professionals who want to study or contribute to the project

---

## ✨ Key Features

### Authentication System
- [x] Secure login with credential validation
- [x] New user registration with data validation
- [x] Animated transition between login/register screens (carousel effect)
- [x] Light/dark theme toggle with persistence
- [x] Mock authentication system for testing without backend

### Main Dashboard
- [x] Consolidated financial overview
- [x] Interactive income and expense charts
- [x] Monthly summary with visual indicators
- [x] Financial health indicators
- [x] Quick action shortcuts

### Financial Management
- [x] Income and expense registration
- [x] Customizable transaction categorization
- [x] Bills/payables management system
- [x] Mark bills as paid
- [x] Upcoming due date alerts
- [x] Complete transaction history

### Institutional Pages
- [x] Terms of Use with section navigation
- [x] Complete Privacy Policy
- [x] Contact Us with functional form
- [x] Dark mode support on all pages

### Interface and Experience
- [x] Responsive design (mobile-first)
- [x] Modern drawer mobile menu
- [x] Anchor navigation on homepage
- [x] Smooth animations and modern transitions
- [x] Loading states and visual feedback

---

## 🔑 Test Account

| Field | Value |
|-------|-------|
| **Email** | `teste@gmail.com` |
| **Password** | `teste123` |

> **Important Note**: The system uses mock data that works in any environment (development or production), allowing complete testing without a backend. To use real data, configure the `VITE_API_URL` environment variable.

---

## 🏗️ Project Architecture

### Architecture Pattern

The project follows the **MVVM (Model-View-ViewModel)** pattern adapted for React, combined with **Feature-Based Architecture** for module organization. This approach provides:

- **Clear separation of concerns** between business logic and presentation
- **Component reusability** through composition
- **Easier maintenance** through modular organization
- **Superior testability** through dependency injection

### Directory Structure

```
src/
├── components/                    # Global reusable components
│   ├── layout/                   # Layout components (Header, Footer)
│   │   ├── header/
│   │   │   ├── HeaderContainer.tsx
│   │   │   ├── HeaderIcon.tsx
│   │   │   ├── HeaderNav.tsx
│   │   │   └── Index.tsx
│   │   └── footer/
│   │       └── Footer.tsx
│   └── ui/                       # shadcn/ui base components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── sheet.tsx
│       └── [other components]
│
├── core/                         # Core configurations and logic
│   ├── utils/                   # Utility functions
│   │   ├── cognito.ts          # AWS Cognito authentication simulation
│   │   ├── mask.ts             # Formatting utilities
│   │   └── utils.ts            # Helper functions
│   ├── viewModels/             # Business logic hooks
│   │   ├── useTheme.ts        # Light/dark theme management
│   │   ├── useLoginPage.ts    # Login page logic
│   │   ├── useSignupPage.ts   # Signup page logic
│   │   └── UserProvider.tsx   # Authenticated user context
│   ├── components/            # Core internal components
│   │   └── Loading.tsx        # Loading component
│   └── hooks/                 # Global custom hooks
│
├── features/                    # Functional modules by domain
│   ├── auth/                   # Authentication module
│   │   ├── views/
│   │   │   ├── AuthPage.tsx       # Unified login/signup page
│   │   │   ├── LoginPage.tsx      # Login page (legacy)
│   │   │   ├── CadastroPage.tsx   # Signup page (legacy)
│   │   │   └── components/
│   │   │       ├── LoginForm.tsx  # Login form
│   │   │       └── CadastroForm.tsx # Signup form
│   │   └── viewModels/
│   │       ├── useLoginPage.ts    # Login hook
│   │       └── useSignupPage.ts   # Signup hook
│   │
│   ├── dashboard/             # Dashboard module
│   │   └── views/
│   │       ├── DashboardPage.tsx
│   │       └── SettingsPage.tsx
│   │
│   ├── financeiro/           # Financial management module
│   │   └── views/
│   │       └── FinanceiroPage.tsx
│   │
│   ├── home/                 # Homepage module
│   │   └── views/
│   │       └── HomePage.tsx
│   │
│   └── pages-legais/        # Institutional pages
│       └── views/
│           ├── TermosPage.tsx
│           ├── PrivacidadePage.tsx
│           └── FaleConoscoPage.tsx
│
├── routes/                    # Route configuration
│   └── AppRoutes.tsx
│
├── types/                     # TypeScript type definitions
│   └── [type files]
│
├── lib/                       # Global settings and utilities
│   └── utils.ts              # Project utility functions
│
├── App.tsx                    # Main application component
├── main.tsx                   # React entry point
└── index.css                  # Global Tailwind styles
```

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Description |
|------------|---------|------------|
| **React** | 19 | Main library for building user interfaces |
| **TypeScript** | 5.1 | Typed superset for JavaScript with type safety |
| **Vite** | 6 | Modern build tool with native HMR |
| **Tailwind CSS** | 3.8 | Utility-first framework for styling |

### Libraries and Tools

| Category | Library | Purpose |
|----------|---------|---------|
| **UI Components** | shadcn/ui | Accessible components based on Radix UI |
| **Forms** | React Hook Form | High-performance form management |
| **Validation** | Zod | TypeScript schema validation |
| **Routing** | React Router DOM | SPA page navigation |
| **HTTP Client** | Axios | HTTP requests to APIs |
| **Icons** | Lucide React | Consistent and lightweight icons |
| **Notifications** | React Toastify / Sonner | Visual feedback to users |

### Patterns and Practices

- **Componentization**: Functional components composition with hooks
- **Type Safety**: Complete typing with TypeScript
- **CSS Utility**: Styling via Tailwind utility classes
- **Code Splitting**: Code division by routes
- **Accessibility**: WCAG compliance via Radix

---

## 📱 Design System

### Colors

The project uses a professional color palette designed to convey trust and seriousness:

```
Primary:     Blue 700 (#1d4ed8) - Trust and security
Secondary:   Neutral 800 (#1f2937) - Elegance in dark mode
Accent:      Green 500 (#22c55e) - Success and money
Background: Gray 50 / Neutral 900 - Light/dark mode
```

### Typography

- **Font Family**: Inter (project font)
- **Headings**: Bold, tracking-tight
- **Body**: Regular, leading-relaxed

### Components

All components follow the shadcn/ui design system with Tailwind customizations, ensuring visual consistency throughout the application.

---

## 🚀 How to Run the Project

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git for version control

### Step by Step

```bash
# 1. Clone the repository
git clone https://github.com/your-user/smartWallet.git

# 2. Navigate to the directory
cd smartWallet

# 3. Install dependencies
npm install

# 4. (Optional) Configure environment variables
cp .env.example .env

# 5. Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-----------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Run typecheck and production build |
| `npm run lint` | Run ESLint for code analysis |
| `npm run preview` | Serve the production build locally |

### Environment Variables

```env
# Backend API URL (optional)
VITE_API_URL=https://api.example.com

# Force mock data usage (optional)
VITE_USE_MOCK=true
```

---

## 📊 Technical Decisions

### Why React 19?
React 19 brings significant performance improvements with the new React Compiler, more powerful hooks, and better integration with future Server Components.

### Why Tailwind CSS?
Tailwind CSS enables rapid development through utility classes, eliminates the need for custom CSS files, and makes maintaining consistent design systems easy.

### Why shadcn/ui?
shadcn/ui combines Radix UI's accessibility with Tailwind's flexibility, offering completely customizable components that reside in the project itself (not runtime dependencies).

### Mock Authentication System
The implementation with mock data allows the application to be fully functional for demonstration and testing, and can be easily integrated with AWS Cognito, Auth0, or any other authentication provider through `src/core/utils/cognito.ts`.

---

## 🔄 Data Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Views     │────▶│  ViewModels  │────▶│  Utils/Services │
│ (Components)│◀────│   (Hooks)    │◀────│   (API/Axios)   │
└─────────────┘     └──────────────┘     └─────────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Context    │
                    │ (UserProvider)│
                    └──────────────┘
```

---

## 🧪 Testing the Application

### Login with Test Account

1. Go to the login page
2. Use credentials: `teste@gmail.com` / `teste123`
3. Explore all dashboard features

### Available Mock Features

- Login and simulated authentication
- Navigation between all pages
- Light/dark theme toggle
- Forms with validation
- Notification system

---

## 🤝 How to Contribute

Contributions are welcome! To contribute to the project:

1. **Fork** the repository
2. **Clone** your local version: `git clone https://github.com/your-fork/smartWallet.git`
3. **Create a branch** for your feature: `git checkout -b feature/your-feature`
4. **Make your changes** and commit: `git commit -m 'feat: adds new feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open a Pull Request** detailing your changes

### Best Practices

- Follow the project's code standards (ESLint configured)
- Use TypeScript with explicit types
- Functional components with hooks, no classes
- Tailwind utility CSS classes, avoid inline CSS
- Semantic commits following Conventional Commits

---

## 📈 Project Status

### Implemented Features

- ✅ Complete authentication system
- ✅ Dashboard with visualizations
- ✅ Financial management (income/expenses)
- ✅ Bills control
- ✅ Institutional pages (Terms, Privacy, Contact)
- ✅ Dark mode throughout the application
- ✅ Mobile-first responsive design
- ✅ Modern mobile menu

### Planned Features

- [ ] Real backend integration (AWS Lambda/DynamoDB)
- [ ] Interactive charts with library (Recharts)
- [ ] Data export (PDF/Excel)
- [ ] Social authentication (Google, Apple)
- [ ] Push notifications
- [ ] Offline mode with Service Worker

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact and Support

- **Email**: victor.hugo.ina10@gmail.com
- **Website**: [www.smartwallet.com.br](https://smart-wallet-eta.vercel.app)
- **GitHub Issues**: [Open Issue](https://github.com/your-user/smartWallet/issues)

---

## 🙏 Acknowledgments

- [shadcn](https://twitter.com/shadcn) for the extraordinary design system
- [Vercel](https://vercel.com) for inspiration in modern web development
- [Tailwind Labs](https://tailwindcss.com) for the revolutionary styling tool
- [React Community](https://react.dev) for the library that changed web development

---

<div align="center">

**Built with ❤️ and React**

Made by [Victor Oliveira](https://github.com/vitoinacio)

</div>