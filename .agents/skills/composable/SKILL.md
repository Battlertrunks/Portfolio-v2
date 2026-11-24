---
name: vue-composable-patterns
description: >
  Use when creating, refactoring, or reviewing Vue
  composables involving reactive state, lifecycle
  management, reusable logic, or asynchronous operations.
---

# Vue Composable Patterns

## Structure

Organize composables in the following order:

1. Input parameters
2. Reactive state
3. Computed properties
4. Methods and asynchronous operations
5. Watchers and lifecycle hooks
6. Public return object

## Naming Conventions

- Prefix composable names with "use".
- Use camelCase filenames.
- Use descriptive, domain-specific names.
- Examples: useAttachments, useProjects, useFileUpload.

## Reactivity

- Prefer ref() for independent reactive values.
- Use computed() for derived state.
- Avoid watchers when computed properties suffice.
- Return plain objects containing refs and methods.
- Accept MaybeRefOrGetter when reactive inputs are needed.
- Expose readonly state when mutations should be controlled.

## Asynchronous Operations

- Delegate HTTP communication to API services.
- Expose loading, error, and data states as needed.
- Use try/finally to reset loading states.
- Handle stale responses and overlapping requests.
- Clean up subscriptions and pending requests.

## Boundaries

- Avoid unnecessary global state.
- Avoid module-level mutable state unless intentional.
- Do not extract stateless utilities into composables.
- Do not create unnecessary abstraction layers.
- Avoid unrelated responsibilities in one composable.

## Verification

- Test state transitions.
- Test asynchronous failures.
- Test reactive input changes when supported.
- Verify lifecycle cleanup.
