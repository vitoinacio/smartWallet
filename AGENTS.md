# SmartWallet - Agent Instructions

## Commands
- `npm run dev` - Start dev server (Vite)
- `npm run build` - Typecheck + build (`tsc -b && vite build`)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS + shadcn/ui (Radix primitives)
- React Router DOM, React Hook Form, Zod, Axios, React Toastify

## Project Structure
- Entry: `src/main.tsx` → `src/App.tsx`
- Routes: `src/routes/AppRoutes.tsx`
- Components: `src/components/ui/` (shadcn), `src/components/layout/`, `src/components/*`
- Hooks: `src/hooks/`
- Services: `src/service/api/`
- Utils: `src/utils/`, `src/lib/utils.ts`
- Types: `src/types/`

## Path Alias
`@` maps to `./src` (configured in `tsconfig.json` and `vite.config.ts`)

## Important Notes
- No test framework configured (no tests in repo)
- No pre-commit hooks
- No CI/CD workflows found
- Build command runs typecheck before build (`tsc -b && vite build`)
- Optimize deps excludes `@radix-ui/react-select` (in vite.config.ts)