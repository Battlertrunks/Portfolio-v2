---
name: api-integration
description: |-
  Use when implementing or modifying HTTP requests,
    API services, asynchronous composables, or
    API-related loading and error states in Vue.
---

# API Integration

## Architecture

- Keep HTTP transport logic within src/api/.
- Keep reactive request state within src/composables/.
- Keep presentation logic within Vue components.

## Implementation

1. Inspect existing API services and composables.
2. Verify the backend API contract.
3. Define typed request and response interfaces.
4. Implement or reuse the API service.
5. Expose reactive state through a composable when needed.
6. Handle loading, errors, and request cancellation.
7. Test successful and unsuccessful responses.

## Constraints

- Avoid introducing unnecessary dependencies.
- Do not duplicate existing API services.
- Avoid using `any` to bypass TypeScript errors.
- Do not silently swallow request failures.
- Do not introduce global state for component-local data.
