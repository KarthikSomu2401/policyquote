# PolicyQuote Solution Notes

PolicyQuote is an Nx workspace with three application projects:

- `policyquote-web`: Angular frontend on port `4200`.
- `policyquote-api`: Express API on port `3000`, also exposed through `handler.ts` for AWS Lambda.
- `policyquote-web-e2e`: Playwright tests for the frontend user journeys.

The browser flow collects customer and property details, sends `POST /policy/quote`, and displays the premium, risk score, risk band, and applied factors. The E2E suite mocks that endpoint so browser tests are deterministic and independent of the backend process.

Risk configuration has two paths. Local Nx, Docker, and SAM development use the validated fallback at `apps/policyquote-api/src/assets/risk-kb.json`. The normal Lambda build does not bundle that file; production loads the active configuration from the AWS AppConfig Agent extension at `localhost:2772` using `APPCONFIG_AGENT_URL`, `APPCONFIG_APPLICATION`, `APPCONFIG_ENVIRONMENT`, and `APPCONFIG_CONFIGURATION`.

The loader caches a validated KB for a short configurable interval (`POLICYQUOTE_KB_REFRESH_INTERVAL_MS`, default 30 seconds), coalesces concurrent refreshes, and keeps the last valid KB when a refresh fails. Initial remote-load failures are returned to the caller. `GET /health` and quote responses expose `kbVersion`.

Primary local paths:

- API health: `http://localhost:3000/health`
- Swagger UI: `http://localhost:3000/api-docs`
- Frontend: `http://localhost:4200`
- SAM template: `template.yaml`

Runtime URLs and ports are configured through ignored `.env` files. Frontend configuration uses `POLICYQUOTE_API_URL` and `POLICYQUOTE_WEB_URL`; API startup uses `POLICYQUOTE_API_PORT`. Nx loads these files for project tasks, and `.env.example` files document safe local defaults. Risk values remain exclusively in the validated risk knowledge base.

The repository currently uses `npm install` for local dependency setup because the checked-in lockfile is not synchronized with `package.json`; Docker's `npm ci` step therefore needs a lockfile update before the image can build.