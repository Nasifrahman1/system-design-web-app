# MOTW Performance Directory — Specification

> **How to use this template:** The specification is meant to be detailed before building anything and to represent the core "source of truth". It should be written for a non-technical author, but clear enough for an AI agent (or a team) to build from.

---

## 0. Constitution (fill once per project, reuse across specs)

Non-negotiable principles this product must never violate, regardless of feature.

| # | Principle | Why it exists |
|---|-----------|----------------|
| 1 | Never store customer payment or personal data | This is an internal staff/management tool, not customer-facing |
| 2 | All financial figures in this build are fictional/placeholder data | This build will be deployed somewhere publicly accessible; real franchisee financial data must never be included |
| 3 | The app must not depend on server-side infrastructure to operate | Keeps the app simple and inexpensive to host and maintain over time |
| 4 | Financial data must always sit behind a passcode prompt, even though this is a lightweight deterrent rather than true access control | Baristas and casual visitors shouldn't stumble onto sales/projection data meant for managers |

---

## 1. Problem & Intent

**Who is this for?**
MOTW Coffee & Pastries regional managers and ownership who need to compare location performance, not just look up contact info. Shift leads and staff also use the basic directory (hours, manager contact) but should not see financial data.

**What problem do they have today?**
Location details (hours, manager contact) and sales performance both live in scattered spreadsheets. There's no single place to see how locations stack up against each other or where a location is trending — and no easy way to keep financial figures separate from the basic staff-facing info.

**Why now / why us?**
As the franchise grows past a handful of locations, informal side-by-side comparisons (eyeballing separate spreadsheets) stop scaling and make it slow to spot underperforming or standout locations.

**What does success look like?**
A regional manager can open the app, enter the shared passcode, and within a minute identify which locations are ahead of or behind projection for the period — without exporting or merging spreadsheets, and without exposing that data to staff who don't need it.

---

## 2. Scope

**In scope**
- Landing page introducing the directory
- Collection view listing all MOTW locations
- Detail view per location: hours and manager contact are visible to everyone; the 3-month sales trend is hidden behind the passcode
- Comparison/Dashboard view: side-by-side sales and projection data across locations, sortable, with underperformance flagging — entirely behind the passcode
- A single shared passcode prompt that gates all financial data (Comparison view + Detail view sales trend)
- Ability to pin/favorite locations for quick access (persists locally for that visitor — see Constraints)
- Data sourced from a structured location/sales dataset (fictional/placeholder financial figures for this build)

**Out of scope**
- Editing location or financial data through the app (updates happen by editing the underlying dataset directly, by Nasif, on an as-needed basis — no fixed schedule)
- Per-user accounts or login — this is one shared passcode, not individual credentials or role management
- Cross-device syncing of pinned locations or passcode state (no accounts, so both are local to that visitor's device by design)
- Customer-facing features (ordering, loyalty, etc.)
- Live/real-time financial data — figures are monthly snapshots, not real-time feeds
- Real financial data of any kind (see Constitution #2)
- Real security — the passcode is a lightweight deterrent, not encryption or access control a determined person couldn't bypass (see Constraints)

---

## 3. User Scenarios

**Scenario 1: Quick lookup (no passcode needed)**
- Actor: Shift lead at Location A
- Trigger: Needs the manager's contact info for a nearby location
- Steps: Opens the app → browses Collection view → clicks the location → views hours and manager contact in Detail view
- Success outcome: Manager contact number is visible within a few seconds, with no passcode prompt in the way
- Failure outcome: Location isn't listed or contact info is missing/outdated

**Scenario 2: Comparing performance (passcode required)**
- Actor: Regional supervisor overseeing 4 locations
- Trigger: End of month, wants to see which locations hit projections
- Steps: Opens the app → goes to Comparison view → enters the shared passcode → sorts/filters locations by variance from projection
- Success outcome: Supervisor can immediately spot which locations are over/under target, with underperformers (5%+ below projection) visually flagged
- Failure outcome: Passcode is rejected, or the comparison view doesn't clearly show projection vs. actual

**Scenario 3: Single-location trend check (passcode required)**
- Actor: Franchise owner
- Trigger: Wants to see how one specific location has trended recently
- Steps: Opens the app → browses to the location's Detail view → enters the passcode when prompted → views its 3-month sales trend
- Success outcome: A clear trend (up/down/flat) is visible across the last 3 months, not just a single snapshot number
- Failure outcome: Only one data point is shown with no historical context, or the passcode prompt blocks access unexpectedly

---

## 4. Requirements (EARS notation)

| ID | Requirement | Pattern |
|----|-------------|---------|
| R1 | The system shall display a Landing page introducing the directory and linking to the Collection view. | Ubiquitous |
| R2 | When a user opens the Collection view, the system shall display all locations from the directory's data source. | Event |
| R3 | When a user clicks a location in the Collection view, the system shall open that location's Detail view. | Event |
| R4 | The Detail view shall display hours and manager contact to all visitors, with no passcode required. | Ubiquitous |
| R5 | When a user pins a location, the system shall remember that preference locally for that visitor. | Event |
| R6 | While a location is pinned, the system shall visually mark it as pinned in the Collection view. | State |
| R7 | If the directory's data fails to load, then the system shall display a clear error message instead of a blank page. | Unwanted behavior |
| R8 | Where a location has no manager contact listed, the system shall display "Not available" instead of leaving the field blank. | Optional |
| R9 | The system shall provide a Comparison view showing all locations' actual sales vs. projected sales for the current period. Projected sales = prior month's actual + 3%. | Ubiquitous |
| R10 | When a user sorts the Comparison view, the system shall reorder locations by the selected metric (e.g. variance from projection). | Event |
| R11 | If a location's actual sales fall 5% or more below its projected sales, then the system shall visually flag that location in the Comparison view. | Unwanted behavior |
| R12 | When a user attempts to open the Comparison view or a location's sales trend, the system shall prompt for the shared passcode before displaying any financial figures. | Event |
| R13 | If an incorrect passcode is entered, then the system shall deny access and allow the user to try again. | Unwanted behavior |
| R14 | While a correct passcode has been entered during the current session, the system shall not prompt again for that session. | State |

---

## 5. Acceptance Criteria

| Requirement | Test | Pass condition |
|-------------|------|-----------------|
| R2 | Load the Collection view | Every location in the dataset appears in the list |
| R3 | Click a location card | Detail view opens for the correct location |
| R4 | Open a location's Detail view without entering a passcode | Hours and manager contact are visible immediately, no prompt shown |
| R5 | Click "pin" on a location, then reload the page | The location is still marked as pinned after reload, for that same visitor |
| R7 | Remove or corrupt the underlying data and reload | An error message displays instead of a blank/broken page |
| R9 | Enter the correct passcode, then load the Comparison view with a location whose prior-month actual was $10,000 | Its projected figure displays as $10,300 |
| R10 | Click a sort control (e.g. "variance") | Location order updates to match the selected sort |
| R11 | Load Comparison view with a location whose actual sales are 6% below its projection | That location is visually flagged; a location only 3% below is not flagged |
| R12 | Click into the Comparison view or a location's sales trend without having entered the passcode | A passcode prompt appears before any financial figures are shown |
| R13 | Enter an incorrect passcode | Access is denied and the user can retry |
| R14 | Enter the correct passcode once, then navigate to a second financial view in the same session | No second prompt appears |

---

## 6. Constraints & Non-Functional Requirements

- **Performance:** Collection and Comparison views should load in under 2 seconds on a typical connection (small dataset, no heavy round-trip needed)
- **Security/Privacy:** No customer data is stored; all financial figures used in this build are fictional placeholder data, not real franchisee numbers. The passcode is a lightweight check only — since the deployment is publicly accessible, a technically curious person could find it in the underlying source. It's meant to stop casual browsing by staff, not to be real access control. This is acceptable only because the data is fictional; real financial data should never be protected this way.
- **Accessibility:** Text should be readable at default browser zoom; interactive elements (pins, sort controls, location links, passcode field) should be reachable via keyboard
- **Compliance/Legal:** None identified for this build — fictional data only, internal-use concept
- **Budget/Timeline:** No build cost beyond time; fits within the course module's timeframe
- **Data ownership:** The dataset is updated manually by Nasif as location or sales data changes; no fixed update schedule
- **Storage model:** Pinned locations and "passcode entered" state both persist locally on that visitor's device only — no accounts, no cross-device sync, consistent with the no-server-dependency constraint
- **Passcode distribution:** Shared verbally/directly by Nasif to managers and ownership — not written anywhere in the app's visible UI or documentation

---

## 7. Open Questions

None outstanding. All items resolved during drafting:

| Question | Resolution |
|----------|------------|
| Projection formula | Prior month's actual sales + 3% |
| Trend history length | 3 months per location |
| Underperformance flag threshold | 5% or more below projection |
| Cross-device pin syncing | Not supported — local to each visitor's device only, by design (no accounts) |
| Dataset update ownership/cadence | Manual updates by Nasif, no fixed schedule |
| Who can see financial data | Gated behind a shared passcode (Comparison view + Detail view sales trend); hours/contact stay open to all |

---

## 8. Plan (derived from this spec — separate document once approved)

Once the spec above is approved, translate it into:
- **`plan.md`** — the approach and key decisions, each traced back to a requirement ID above
- **`tasks.md`** — atomic, ordered, checkable tasks derived from the plan

Do not skip from spec straight to a build without reviewing the plan first.

---

## 9. Approval

| Role | Name | Date | Signed off? |
|------|------|------|-------------|
| Spec owner | Nasif Rahman | | Pending |
| Reviewer | | | |
