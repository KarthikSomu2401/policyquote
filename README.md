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

The Angular frontend runs at <http://localhost:4200> and calls the API at <http://localhost:3000>. Local Nx development uses the file fallback. The API serves:

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

The SAM template is [template.yaml](template.yaml). SAM local is configured with `POLICYQUOTE_KB_SOURCE=local`, so it uses the checked-in fallback file. The Nx SAM targets build the Lambda-compatible handler before invoking it:

```sh
npx nx run policyquote-api:sam-build
npx nx run policyquote-api:sam-invoke
npx nx run policyquote-api:sam-start-api
```

`sam-invoke` uses [apps/policyquote-api/events/quote.json](apps/policyquote-api/events/quote.json). `sam-start-api` exposes the local API on the SAM default URL, normally <http://127.0.0.1:3000>.

For a production Lambda deployment, configure the AppConfig Agent Lambda extension and set these environment variables on the function:

| Variable | Purpose |
| --- | --- |
| `POLICYQUOTE_KB_SOURCE=appconfig` | Selects AppConfig instead of the local file. Production defaults to this source when unset. |
| `APPCONFIG_AGENT_URL` | AppConfig Agent base URL; defaults to `http://localhost:2772`. |
| `APPCONFIG_APPLICATION` | AppConfig application identifier. |
| `APPCONFIG_ENVIRONMENT` | AppConfig environment identifier. |
| `APPCONFIG_CONFIGURATION` | AppConfig configuration/profile identifier. |
| `POLICYQUOTE_KB_REFRESH_INTERVAL_MS` | Optional refresh interval; defaults to 30,000 ms. |
| `POLICYQUOTE_KB_PATH` | Optional local fallback path override. |

The loader requests `/appconfig/applications/{application}/environments/{environment}/configurations/{configuration}` from the Agent. It validates every response with the existing Zod schema, caches a valid KB for the refresh interval, and continues serving the last valid KB if a later refresh fails. A failed initial remote load is surfaced rather than silently using a local file.

## Docker

An API image definition is available at [apps/policyquote-api/Dockerfile](apps/policyquote-api/Dockerfile):

```sh
docker build -f apps/policyquote-api/Dockerfile -t policyquote-api .
docker run --rm -e POLICYQUOTE_KB_SOURCE=local -p 3000:3000 policyquote-api
```

The container exposes port `3000`, with Swagger at `/api-docs` and the quote endpoint at `/policy/quote`. The current Dockerfile runs `npm ci`; at this checkout the lockfile is not synchronized with `package.json`, so the image build requires the lockfile to be synchronized first. The failed build reports missing `yaml@2.9.0` and `@swc/helpers@0.5.23` entries.

## Risk knowledge base

The local fallback knowledge base is [apps/policyquote-api/src/assets/risk-kb.json](apps/policyquote-api/src/assets/risk-kb.json). Local Nx development reads this source file; Docker reads `/app/risk-kb.json`; and SAM local retains a copy in `apps/policyquote-api/sam-dist/assets/`. The normal Lambda build does not include this file, so production uses AppConfig through the Agent extension.

Edit the source JSON to configure local risk bands, risk factors, conditions, and pricing inputs. The knowledge-base schema validates the file before use. Rebuild the SAM output or Docker image after changing it; production configuration is managed in AppConfig rather than this bundled fallback.

Both `GET /health` and `POST /policy/quote` expose the active `kbVersion`, making the configuration used for a response observable.

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
