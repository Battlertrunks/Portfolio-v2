# AGENTS.md

Guidance for AI agents working in this repository.

## Project layout

```text
src/
  components/   Reusable UI components (PascalCase)
  features/     Screen-level views and feature data
  routes/       Vue Router configuration
  services/     API clients and other side effects (when needed)
  types/        Shared TypeScript types
  style.css     Tailwind theme tokens and base styles
public/         Static assets, including project media in public/projects/
tests/          Vitest + Vue Test Utils specs
```

## Implementation workflow

- Implement and verify the feature before adding or updating tests, unless the developer asks
  otherwise.
- Keep test changes in a separate commit from feature implementation.
- Do not add or upgrade third-party dependencies without explicit developer approval. Explain the
  need and wait for approval first.
- Do not commit or revert unrelated existing changes. Leave the developer's work untouched.

## Commits and pushes

- Group related changes into one logical commit. Avoid both one-commit-per-file and large
  catch-all commits.
- Keep refactors, features, tests, documentation, and dependency changes in separate commits.
- Push after a coherent, self-contained set of commits. Do not push unrelated work together.
- Use clear, imperative commit messages that describe the change.

## Verification

Run the relevant checks before committing:

```sh
pnpm lint
pnpm type-check
pnpm test
pnpm build
```

Format `.ts`, `.vue`, `.json`, `.md`, `.css`, and `.html` files with Prettier.
