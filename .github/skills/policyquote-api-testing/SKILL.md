---
name: policyquote-api-testing
description: "Use whenever a request changes, fixes, refactors, or adds code under apps/policyquote-api. Require focused Jest tests for every API behavior change, repair existing API tests when they expose stale behavior, and validate with API test, typecheck, and lint targets."
---

# PolicyQuote API Testing

Apply this workflow to every change under `apps/policyquote-api`.

## Required behavior

- Inspect the affected API implementation, schemas, loaders, and existing tests before editing.
- Add or update focused Jest tests for every changed behavior.
- If existing tests are missing, stale, or failing because they do not match the current contract, fix the tests and the implementation only when the implementation is demonstrably wrong.
- Keep tests close to the code they cover using `*.spec.ts` files.
- Do not weaken assertions merely to make tests pass.
- Do not modify frontend tests to satisfy backend behavior.

## Validation

Run the narrowest relevant checks first, then the full API slice:

```bash
npx nx test policyquote-api --runInBand
npx nx typecheck policyquote-api
npx nx lint policyquote-api
```

For a focused test:

```bash
npx nx test policyquote-api --runInBand --testFile=<path-to-test>
```

Report any unrelated failures separately. Do not claim success unless the commands actually pass.

## Audit log

After a meaningful repository change, append one normal-English entry to `AGENT_LOG.md` with the exact prompt, changed files, rationale, and validation results.
