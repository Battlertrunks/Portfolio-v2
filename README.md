# Portfolio V2

The personal portfolio of Gavin Szczesniak, a full-stack developer who builds dependable
applications with a backend-first approach: clear data models, typed API contracts, and accessible
interfaces.

This repository contains the Vue 3 client for the site. It brings together an overview of how I
work, a growing set of project case studies, and media that shows each build in context. The API and
persisted content layer are planned next; today the site runs from typed local data.

## Highlights

- Home, About, and Projects routes with a responsive dark theme.
- Project sections with a title, skills, description, and an image/video collage of up to four
  items.
- A sticky project index with smooth scrolling, scroll-spy tracking, and an animated teal underline.
- Keyboard-friendly navigation, visible focus states, semantic markup, and reduced-motion support.
- Typed project content and reusable UI primitives that are ready for real case studies.

## Tech stack

- Vue 3 with TypeScript
- Vue Router
- Tailwind CSS v4
- Vite
- Vitest and Vue Test Utils

## Getting started

Requires Node.js 20.19 or newer and pnpm 11 or newer.

```sh
pnpm install
pnpm dev
```

The dev server prints the local URL when it starts.

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
  components/   Reusable UI and project media components
  features/     Route-level views and project content
  routes/       Vue Router configuration
  types/        Shared TypeScript types
  style.css     Theme tokens and base styles
public/
  projects/     Project screenshots, mockups, and videos
tests/          Vitest and Vue Test Utils specs
```

## Project content and media

Project content lives in `src/features/projects/projects.data.ts`. Each project defines an `id` used
by the sidebar anchor, plus a title, status, description, skill tags, and optional media. Media can
be an image with `src` and `alt` text, or a video with `src`, an optional `poster`, and an accessible
label. The collage shows at most four items.

Assets under `public/projects/` are referenced from the site root, for example
`/projects/portfolio-home.svg`. The current SVGs are placeholders; replace them with real
screenshots and recordings as each case study is completed.

## Git hooks

Commits run type-checking and lint-staged. Pushes run the unit tests.
