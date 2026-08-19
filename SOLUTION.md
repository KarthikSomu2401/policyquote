# PolicyQuote Solution Notes

PolicyQuote is an Nx workspace with three application projects:

- `policyquote-web`: Angular frontend on port `4200`.
- `policyquote-api`: Express API on port `3000`, also exposed through `handler.ts` for AWS Lambda.
- `policyquote-web-e2e`: Playwright tests for the frontend user journeys.

The browser flow collects customer and property details, sends `POST /policy/quote`, and displays the premium, risk score, risk band, and applied factors. The E2E suite mocks that endpoint so browser tests are deterministic and independent of the backend process.

Risk configuration lives in `apps/policyquote-api/src/assets/risk-kb.json`. The API validates and loads that JSON from the bundled `assets/risk-kb.json`; rebuild API, SAM, or Docker outputs after editing it.

Primary local paths:

- API health: `http://localhost:3000/health`
- Swagger UI: `http://localhost:3000/api-docs`
- Frontend: `http://localhost:4200`
- SAM template: `template.yaml`

The repository currently uses `npm install` for local dependency setup because the checked-in lockfile is not synchronized with `package.json`; Docker's `npm ci` step therefore needs a lockfile update before the image can build.