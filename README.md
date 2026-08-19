# PolicyQuote

PolicyQuote is an Nx monorepo containing an Angular frontend and a Node.js/Express API for generating illustrative home insurance quotes. The API can also run as an AWS Lambda through AWS SAM.

## Repository structure

```text
apps/
	policyquote-web/       Angular frontend
	policyquote-api/       Express API and Lambda handler
	policyquote-web-e2e/   Playwright browser tests
packages/                Shared workspace packages
template.yaml            AWS SAM local Lambda template
SOLUTION.md              Architecture and operating notes
AGENT_LOG.md             Required Copilot change log
.github/
	copilot-instructions.md Required repository agent instructions
```

Nx project names are `policyquote-web`, `policyquote-api`, and `policyquote-web-e2e`. Run commands from the repository root.

## Prerequisites

- Node.js 20 or newer and npm.
- Docker Desktop for AWS SAM local execution or the optional API container.
- AWS SAM CLI for local Lambda invocation and the SAM API emulator.
- Playwright browser binaries for E2E tests. Install them with `npx playwright install` when needed.

Install workspace dependencies:

```sh
npm install
```

## Local development

Use three terminal commands for the standard local path:

```sh
npm install
npx nx serve policyquote-api
npx nx serve policyquote-web
```

The Angular frontend runs at <http://localhost:4200> and calls the API at <http://localhost:3000>. The API serves:

- Health check: <http://localhost:3000/health>
- Swagger UI: <http://localhost:3000/api-docs>
- Quote endpoint: `POST http://localhost:3000/policy/quote`

The frontend quote flow is: open the landing page, select **Enquire Quote**, complete customer and property details, submit **Get quote**, then review the annual premium, monthly estimate, risk band, score, and applied risk factors. The frontend E2E suite mocks the quote endpoint and does not require the backend.

## API tasks

```sh
npx nx build policyquote-api
npx nx typecheck policyquote-api
npx nx lint policyquote-api
npx nx test policyquote-api
```

The API validates quote requests and returns `400` for invalid input. Its local Express server listens on port `3000`.

## AWS SAM local

The SAM template is [template.yaml](template.yaml). The Nx SAM targets build the Lambda-compatible handler before invoking it:

```sh
npx nx run policyquote-api:sam-build
npx nx run policyquote-api:sam-invoke
npx nx run policyquote-api:sam-start-api
```

`sam-invoke` uses [apps/policyquote-api/events/quote.json](apps/policyquote-api/events/quote.json). `sam-start-api` exposes the local API on the SAM default URL, normally <http://127.0.0.1:3000>.

## Docker

An API image definition is available at [apps/policyquote-api/Dockerfile](apps/policyquote-api/Dockerfile):

```sh
docker build -f apps/policyquote-api/Dockerfile -t policyquote-api .
docker run --rm -p 3000:3000 policyquote-api
```

The container exposes port `3000`, with Swagger at `/api-docs` and the quote endpoint at `/policy/quote`. The current Dockerfile runs `npm ci`; at this checkout the lockfile is not synchronized with `package.json`, so the image build requires the lockfile to be synchronized first. The failed build reports missing `yaml@2.9.0` and `@swc/helpers@0.5.23` entries.

## Risk knowledge base

The source knowledge base is [apps/policyquote-api/src/assets/risk-kb.json](apps/policyquote-api/src/assets/risk-kb.json). The API loads it from its bundled `assets/risk-kb.json` at runtime. SAM and generated build outputs also contain copies under `apps/policyquote-api/sam-dist/assets/` or the active build output directory.

Edit the source JSON to configure risk bands, risk factors, conditions, and pricing inputs. The knowledge-base schema validates the file when the API starts or handles a health/quote request. Rebuild the API, SAM output, or Docker image after changing it; there is no runtime environment-variable override for this file.

## Frontend tests

Run Angular unit tests with Jest:

```sh
npx nx test policyquote-web
npx nx test policyquote-web --runInBand
```

Run the deterministic Playwright suite:

```sh
npx nx e2e policyquote-web-e2e
npx nx typecheck policyquote-web-e2e
npx nx lint policyquote-web-e2e
```

The suite is split into [landing-page.spec.ts](apps/policyquote-web-e2e/src/landing-page.spec.ts) and [quote-form.spec.ts](apps/policyquote-web-e2e/src/quote-form.spec.ts), with shared helpers in [support/policyquote.ts](apps/policyquote-web-e2e/src/support/policyquote.ts). It uses stable `data-testid` hooks for form controls and mocks `POST /policy/quote` with the existing API response contract.

## Required repository guidance

- [AGENT_LOG.md](AGENT_LOG.md) records every meaningful Copilot repository change, its validation, and changed files.
- [SOLUTION.md](SOLUTION.md) records the application architecture, runtime paths, and implementation decisions.
- [.github/copilot-instructions.md](.github/copilot-instructions.md) contains the repository instructions for Copilot sessions, including mandatory activity logging.

Keep these files in place when changing the repository. Do not place secrets, tokens, or private keys in documentation or logs.
