# Plan — MOTW Performance Directory

> Written after specification. Every decision here must trace back to a requirement ID.

## 1. Approach Summary
We will build a single-page web app with a public Landing page, a Collection view listing all locations, a Detail view for each location, and a Comparison view for cross-location performance. Location and hours/contact data will be visible to everyone, while financial data (the sales trend on the Detail view and all data in the Comparison view) will be hidden behind one shared passcode. This is a front-end-only prototype for this phase: no backend, no accounts, and no real-time data. The app will use a static dataset stored locally in the browser and will rely on browser storage for pinned locations and passcode state.

## 1.5 Tech Stack
- Frontend: Vue 3, loaded via CDN script tag with no build step and no Vite/npm dependency; this matches the existing repo structure and keeps the prototype simple.
- Backend/DB: None for this phase. No server, database service, or authentication service is included because the project is scoped to a front-end prototype only.
- Charts: Chart.js via CDN script tag for the 3-month sales trend and Comparison view, consistent with the no-build-step pattern used by the app.
- Data source: a structured location/sales dataset in CSV or JSON format with fictional placeholder financial values, loaded client-side with fetch().
- Storage: browser localStorage only, used for pinned locations and for remembering that the passcode was entered during the current session. No accounts and no cross-device sync.
- Hosting: GitHub Pages, matching the current project hosting approach.
- Other services/APIs: none beyond the CDN-hosted Vue and Chart.js libraries.

## 2. Key Decisions (ADRs)

| ADR # | Decision | Traces to (R#) | Alternatives considered | Why this one |
|-------|----------|------------------|---------------------------|----------------|
| ADR-00 | Frontend: Vue 3 via CDN; no Vite/npm and no backend | R1-R20 (all); Constitution #3 | Vite/CLI setup, a framework with a real backend | This keeps the prototype lightweight, matches the repo's existing structure, and avoids adding build tooling for a project this small |
| ADR-01 | Use a client-side shared passcode gate instead of real authentication | R12, R13, R14; Constitution #2, #4 | Real user accounts and hosted auth service | The protected data is fictional placeholder data, so real auth would be over-engineering and would conflict with the no-backend approach; the passcode is explicitly a deterrent, not true security |
| ADR-02 | Use the projection formula of prior-month actual + 3% | R9 | 5-month rolling baseline used internally by MOTW | This is simpler to calculate on the client and is aligned with the project scope for the prototype; the rolling baseline is documented as a future improvement rather than a current requirement |
| ADR-03 | Add a state filter and search box to narrow the Collection view | R16, R17 | Filtering by city instead | State grouping is more useful at MOTW's scale and matches the interview feedback that the directory will span 30–50 locations across fewer states than cities |
| ADR-04 | Unlocking the passcode from the Detail view reveals the trend in place on that same screen instead of redirecting to Comparison view | R18, R19 | Redirect to the full Comparison view immediately after passcode entry | Staying in place keeps the user's context intact and avoids the disorienting navigation dead-end that was observed during prototype review |

## 3. Components / Building Blocks
List the major pieces (screens, services, data stores). No code — just names and purpose.

| Component | Purpose | Related requirements |
|-----------|---------|------------------------|
| Landing view | Introduces the directory and links users into the Collection view | R1 |
| Collection view | Lists all locations from the dataset, supports state filtering and name/city/address search, and shows pin indicators for favorites | R2, R5, R6, R16, R17 |
| Detail view | Shows public location information (state, city, address, hours, manager contact, franchisee/owner contact) and reveals the gated 3-month sales trend after passcode entry; includes navigation to Comparison view | R4, R15, R18, R19 |
| Comparison view | Displays all locations' actual vs. projected sales, supports sorting, flags underperformers by 5%+ variance, and includes navigation back to Collection view | R9, R10, R11, R20 |
| Passcode prompt | Shared modal or prompt component triggered from the Collection view's comparison action and from the Detail view's gated sales trend | R12, R13, R14 |
| Data loader | Fetches and parses the location/sales dataset and presents a visible error state if the dataset fails to load | R2, R7 |

## 4. Dependencies & Assumptions
- External services/tools needed: GitHub Pages for hosting; Vue CDN and Chart.js CDN for front-end libraries; a static dataset file (CSV or JSON) maintained manually by Nasif.
- Assumptions being made: the static dataset will be created and updated manually without an admin UI or backend editing workflow; the shared passcode will be stored in configuration or hardcoded for this prototype and distributed out-of-band rather than shown in the UI or documentation; the app will rely on local browser storage only, so pinned locations and passcode session state are local to that device/browser.
- The plan intentionally excludes backend, database, and authentication design because this phase is scoped to a front-end prototype only; those concerns would be handled in a later plan once the prototype is validated.

## 5. Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| Passcode is visible in client-side source code to anyone who inspects the app | Medium | Low | Document the limitation clearly in the specification and treat the passcode as a lightweight deterrent only; never use this approach with real financial data | Nasif |
| Dataset becomes stale if not updated regularly | Medium | Medium | Keep one source of truth for the dataset and assign ownership to Nasif for manual updates as needed | Nasif |
| Vue or Chart.js CDN fails to load or is blocked | Low | Medium | Keep dependencies minimal and confirm that the chosen hosting path supports the CDN-based approach | Nasif |
| Underperformance logic is misapplied when a location has no prior-month baseline | Medium | Medium | Define an explicit fallback behavior for locations without prior-month data, such as showing no underperformance flag until a valid baseline exists | Nasif |

## 6. Sequencing
1. Data source and dataset are established first, because the rest of the app depends on having valid location and sales records available.
2. Collection view is built next so the app can load, list, filter, and search locations before the financial logic is added.
3. Detail view is implemented after the Collection view, beginning with public information and then the passcode-gated sales trend once the data model is stable.
4. Shared passcode prompt logic is added before the Comparison view because both the Collection view and the Detail view depend on the same gate behavior.
5. Comparison view is built after the passcode flow is working, including sorting, variance calculations, and underperformance flags.
6. Landing view is completed last because it is the simplest screen and depends on the rest of the information architecture being in place.

## 7. Review & Approval
| Reviewer | Date | Approved? |
|----------|------|-----------|
| Nasif | Pending | Pending review |

This plan intentionally excludes backend, database, and authentication planning because this phase is scoped to the front-end prototype only. That work would be captured in a later plan once the prototype is validated and the product direction is confirmed.

**Gate:** Do not generate tasks until this plan is done.