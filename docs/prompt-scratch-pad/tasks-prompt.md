xNow we will complete docs/design/tasks.md based on docs/design/plan.md and docs/design/specification.md. Focus only on front-end tasks that adapt the existing template application in this workspace (index.html, app.js, style.css, and the components folder: landing-page-component, collection-page-component, item-detail-page-component, navbar-component, about-page-component) into a working prototype of the MOTW Performance Directory. This should produce a compelling, working front-end prototype before any database/backend/auth work — that work is explicitly out of scope for this task list, per plan.md and the assignment.

Use docs/design/reference/tasks-guide.md as a guide for structure and quality. Be very mindful of the existing template code as it currently exists in this workspace — avoid creating tasks that are redundant or that would require a complete rewrite of the template. Where an existing component clearly maps to one of our views (e.g. landing-page-component → Landing view, collection-page-component → Collection view, item-detail-page-component → Detail view), write tasks that adapt/extend that component rather than tasks that build a new one from scratch. If about-page-component isn't part of this app's scope, add one task to either repurpose or remove it — don't leave it unaddressed.

Adapt my task list below to fit the tasks.md template structure exactly (columns: ID, Task, Traces to (R#/ADR#), Depends on, Status). Keep every task small enough to finish in under a day, and checkable — someone else should be able to look at it and say yes/no whether it's done. Follow the sequencing from plan.md (data source → Collection view → Detail view → passcode → Comparison view → Landing view last).

## Task List

**Data source (plan.md step 1)**
* Create the fictional locations/sales dataset (CSV or JSON) with the fields from R15/R16 (state, city, address, hours, manager contact, franchisee/owner contact) plus sales figures for 3 months, covering enough locations across a few different states to actually test filtering. Traces to R2, R15, R16, ADR-00.
* Build the data loader: fetch + parse the dataset on app load. Traces to R2, ADR-00.
* Add the error state for when the dataset fails to load (R7) — don't let this get skipped since it's easy to forget until something actually breaks.

**Collection view (plan.md step 2)**
* Adapt collection-page-component to render the location list from the loaded dataset instead of its current placeholder/template data. Traces to R2.
* Add the state filter dropdown/control. Traces to R16, ADR-03.
* Add the search box (matches name/city/address). Traces to R17.
* Add the pin/star toggle per location card, wired to localStorage. Traces to R5, R6.
* Add the "Compare Locations" button that opens the passcode prompt. Traces to R12.

**Detail view (plan.md step 3)**
* Adapt item-detail-page-component to show the always-visible fields (state, city, address, hours, manager contact, franchisee/owner contact). Traces to R4, R15.
* Add the gated section placeholder (3-month sales trend) that's hidden until the passcode is entered. Traces to R12, R18.
* Once the passcode component exists (see below), wire the gated section to reveal in place after correct entry, and add the button forward to Comparison view. Traces to R18, R19, ADR-04.

**Passcode prompt (plan.md step 4)**
* Build the shared passcode prompt component (modal or similar), reusable from both Collection view's Compare button and Detail view's gated section. Traces to R12, R13, ADR-01.
* Add incorrect-passcode handling (deny + allow retry). Traces to R13.
* Add localStorage-based "already entered this session" state so it doesn't re-prompt. Traces to R14.

**Comparison view (plan.md step 5)**
* Build the Comparison view listing all locations' actual vs.