# Tasks — MOTW Performance Directory

> Derived from the plan document. Each task is small, checkable, and traceable to a requirement.

## Task List

| ID | Task | Traces to (R#/ADR#) | Depends on | Status |
|----|------|--------------------------|------------|--------|
| T1 | Create the fictional MOTW location and sales dataset with state, city, address, hours, manager contact, franchisee/owner contact, and 3-month sales values across multiple states and locations | R2, R15, R16, ADR-00 | — | Done |
| T2 | Build the data loader to fetch and parse the dataset on app load | R2, ADR-00 | T1 | Done |
| T3 | Add a visible error state when the dataset cannot load, so the app shows a clear message instead of a blank page | R7 | T2 | Done |
| T4 | Adapt the Collection view component to render the location list from the loaded dataset instead of placeholder template data | R2, ADR-00 | T2 | Done |
| T5 | Adapt the Detail view component to show the always-visible public fields: state, city, full address, hours, manager contact, and franchisee/owner contact | R4, R15 | T2 | Done |
| T6 | Build the shared passcode prompt component and reuse it from both the Collection view and the Detail view | R12, R13, ADR-01 | T4, T5 | Done |
| T7 | Add the Compare Locations button on the Collection view so it opens the shared passcode prompt | R12 | T6 | Not started |
| T8 | Add the state filter control to the Collection view so users can narrow the list by state | R16, ADR-03 | T4 | Not started |
| T9 | Add the search box to the Collection view so it matches on location name, city, or address | R17 | T4 | Not started |
| T10 | Add a pin/star toggle to each location card and persist pinned items in localStorage | R5, R6 | T4 | Not started |
| T11 | Add the gated 3-month sales trend section to the Detail view and keep it hidden until the correct passcode is entered | R12, R18 | T5, T6 | Not started |
| T12 | Add incorrect-passcode handling so the prompt denies access and allows the user to retry | R13 | T6 | Not started |
| T13 | Add session-scoped localStorage logic so the correct passcode is remembered during the current session and does not re-prompt | R14 | T6, T12 | Not started |
| T14 | Wire the correct passcode to reveal the sales trend in place on the Detail view and add the control that navigates to Comparison view | R18, R19, ADR-04 | T11, T6, T12, T13 | Not started |
| T15 | Build the Comparison view to list locations with actual sales, projected sales, and sorting by the chosen metric | R9, R10 | T6, T14 | Not started |
| T16 | Add the underperformance flag in the Comparison view for locations at least 5% below projection | R11 | T15 | Not started |
| T17 | Add a back-to-Collection control on the Comparison view so users can return to the list view | R20 | T15 | Not started |
| T18 | Adapt the Landing page component to introduce the directory and link into the Collection view | R1 | T4 | Not started |
| T19 | Repurpose or remove the existing About page component so it does not interfere with the project scope or confuse the prototype flow | ADR-00 | — | Not started |

**Status values:** Not started · In progress · Done · Blocked

## Definition of Done (applies to every task)
- Matches its linked requirement's acceptance criteria in the specification.
- Reviewed by a human before marked done
- No task marked done without a test passing

## Blocked / Questions
| Task | Blocker | Raised | Resolved |
|------|---------|--------|----------|
| | | | |
