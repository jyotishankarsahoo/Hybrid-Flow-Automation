# Hybrid Flow Automation

## What this Project Achieves

This repository contains an end-to-end test suite that combines UI and API validation for feedback flows on articles. It uses Playwright to:

-   Automate user interactions on article pages (click thumbs up/down, enter comments, submit feedback).
-   Intercept and assert requests sent by the UI to the feedback API.
-   Mock API responses to validate UI behavior for different server-side scenarios.
-   Provide a repeatable, fast feedback loop to catch regressions at both UI and API integration boundaries.

Typical goals:

-   Ensure feedback submission sends the correct payloads.
-   Validate the app displays appropriate confirmation and error states.
-   Allow targeted negative-path testing by mocking backend responses.

## Framework Structure

Root files:

-   `package.json` — NPM scripts and dev dependencies.
-   `playwright.config.ts` — Playwright configuration (projects, reporter, baseURL).

Key folders:

-   `pages/` — Page object models encapsulating UI interactions.

    -   `ArticlePage.ts` — Methods to click thumbs up/down, enter comments, submit feedback, and verify confirmations.
    -   `BasePage.ts` — Shared utilities used across page objects.

-   `services/` — Helper services to interact with or assert API traffic.

    -   `BaseAPIService.ts` — Generic request/response interception helpers used by services.
    -   `FeedbackAPIService.ts` — Feedback-specific helpers: assertRequest, assertResponse, modifyRequest, mockResponse.

-   `tests/` — Test suites grouped by UI vs UI+API hybrid tests.

    -   `UI-Tests/` — Pure UI-focused scenarios.
    -   `UI-API-Tests/` — Tests that combine UI interactions with API assertions/mocking.

-   `utilities/` — Reusable test utilities and types.

    -   `test-utilities.ts` — Custom Playwright fixtures wiring page objects and services.
    -   `screenshot-helper.ts` — Capture screenshots on failure.
    -   `interfaces/FeedbackPayload.ts` — Type definitions for request/response shapes used by tests.

-   `playwright-report/` & `test-results/` — Generated artifacts (reports, screenshots).

## Best Practices Followed

-   Page Object Model: All UI interactions are encapsulated in `pages/` to keep tests readable and maintainable.
-   Single-responsibility services: `services/` hold API-related helpers for assertion and mocking.
-   Typed fixtures: The custom fixtures in `utilities/test-utilities.ts` use TypeScript types so tests get proper autocomplete and compile-time checks.
-   Cleanups: Services clean up routes after each test to avoid cross-test interference.
-   Small, focused tests: Tests assert a single behaviour per test and avoid bloated flows.
-   Artifacts on failure: Screenshots and Playwright HTML report are produced for easier debugging.

## Benefits & Use Cases

-   Cross-layer validation: Catch issues where the UI and backend disagree about contract shapes.
-   Faster iteration: Mocking lets you exercise UI behaviour for rare or hard-to-reproduce server states.
-   Regression safety: Automated checks reduce manual QA load and regressions in critical flows.
-   Documentation: Tests act as living documentation for expected API contracts and UI behaviours.

## How to run

Install dependencies:

```bash
npm install
```

Run the full test suite:

```bash
npm run tests
```

Run a specific test file:

```bash
npx playwright test tests/UI-API-Tests/feedback-request-payload-validation.spec.ts
```

Open the HTML report after a run:

```bash
npm run show:report
```

## Notes & Troubleshooting

-   Node & Playwright: This project uses Playwright v1.56.1 (declared in `package.json`). If you upgrade Playwright, re-check fixture typings and APIs.
-   Type errors in fixtures: Use the Playwright fixture function signatures (use callbacks typed to the fixture value) instead of untyped `Function` to avoid tuple scope/type mismatches.
-   When adding new fixtures, decide scope: `test` vs `worker`. Use `test` when you need a fresh instance each test (default for page-based fixtures).
