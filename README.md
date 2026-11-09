# Portfolio Client

The frontend for Portfolio V2: a small, accessible portfolio built with Vue 3, TypeScript,
Tailwind CSS v4, and Vite.

## Requirements

- Node.js 20.19 or newer
- pnpm 11 or newer

## Setup

```sh
pnpm install
pnpm dev
```

The dev server runs at the URL printed by Vite.

## Commands

| Command             | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `pnpm dev`          | Start the Vite dev server                      |
| `pnpm build`        | Type-check and build for production            |
| `pnpm preview`      | Preview the production build                   |
| `pnpm lint`         | Run ESLint                                     |
| `pnpm lint:fix`     | Run ESLint and apply safe fixes                |
| `pnpm format`       | Format files with Prettier                     |
| `pnpm format:check` | Check formatting without writing               |
| `pnpm type-check`   | Type-check `.ts` and `.vue` files with vue-tsc |
| `pnpm test`         | Run the unit tests once                        |
| `pnpm test:watch`   | Run the unit tests in watch mode               |

## Project structure

```text
src/
  components/   Reusable UI components (PascalCase)
  features/     Feature-specific views and containers
  routes/       Route definitions
  services/     API clients and other side effects (added when needed)
  types/        Shared TypeScript types and interfaces
```

## Git hooks

The repository uses Husky. Commits run type-checking and lint-staged; pushes run the unit tests.

## Environment variables

API base URLs and secrets belong in environment variables, never in source. Create a local
`.env` file when a service needs one and document the variable in `.env.example`.
# Portfolio-v2
