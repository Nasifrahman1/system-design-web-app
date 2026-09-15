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
MOTW Coffee & Pastries regional managers, ownership, and franchising leadership who need to compare location performance and maintain accurate location details — not just look up contact info. Shift leads and staff also use the basic directory (hours, manager contact) but should not see financial data.

**What problem do they have today?**
There is no working central directory. The existing corporate website lists locations but doesn't automatically sync with each location's Google listing, so hours and contact information has drifted out of date. There's also no single record combining shop, city, address, hours, on-site manager contact, and the franchisee/owner contact — information franchising leadership currently has to piece together manually, including when coordinating with vendors and distributors who work across all locations. Sales performance also lives in scattered spreadsheets, with no single place to see how locations stack up against each other or where a location is trending.

**Why now / why us?**
As the franchise grows past a handful of locations, informal side-by-side comparisons (eyeballing separate spreadsheets, an outdated website) stop scaling. At 30 and soon 50 locations, manually tracking every location individually becomes impractical.

**What does success look like?**
A regional manager or franchising lead can open the app, enter the shared passcode when needed, and within a minute either find accurate location/contact details or identify which locations are ahead of or behind projection — without exporting or merging spreadsheets, and without exposing financial data to staff who don't need it.

---

## 2. Scope

**In scope**
- Landing page introducing the directory (kept intentionally as its own screen, separate from Collection view, to leave room for additional introductory elements as the app grows)
- Collection view listing all MOTW locations, with a state filter and a name/city/address search to stay usable as the location count grows toward 30–50
- Detail view per location: state, city, full address, hours, on-site manager contact, and franchisee/owner contact are visible to everyone; the 3-month sales trend is hidden behind the passcode and, once unlocked, appears in place on the same Detail view (no redirect), with a separate control to continue to Comparison view
- Comparison/Dashboard view: side-by-side sales and projection data across locations, sortable, with underperformance flagging — entirely behind the passcode, with a control to navigate back to Collection view
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
- Automatic syncing with Google listings or other outside sources (a known gap in the current corporate website — this build fixes staleness via a single maintained dataset instead, not automation)

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
| R15 | The Detail view shall display each location's state, city, full address, and franchisee/owner contact, in addition to hours and manager contact, with no passcode required. | Ubiquitous |
| R16 | When a user selects a state filter in the Collection view, the system shall display only locations in that state. | Event |
| R17 | When a user enters a search term in the Collection view, the system shall display only locations whose name, city, or address match the term. | Event |
| R18 | When a user enters the correct passcode from a location's Detail view, the system shall reveal that location's sales trend in place on the Detail view, without navigating away. | Event |
| R19 | The Detail view shall provide a control that navigates to the Comparison view. | Ubiquitous |
| R20 | The Comparison view shall provide a control that navigates back to the Collection view. | Ubiquitous |

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
| R15 | Open a location's Detail view without entering a passcode | State, city, full address, and franchisee/owner contact are all visible alongside hours and manager contact |
| R16 | Select a state from the filter in Collection view | Only locations in that state are shown; other locations are hidden |
| R17 | Type a location's name, city, or address into the search field | Only matching locations are shown |
| R18 | Enter the correct passcode from a location's Detail view | The sales trend appears on that same Detail view; the user is not redirected to Comparison view |
| R19 | On a location's Detail view, click the control leading to Comparison view | Comparison view opens |
| R20 | On the Comparison view, click the back control | Collection view opens |

---

## 6. Constraints & Non-Functional Requirements

- **Performance:** Collection and Comparison views should load in under 2 seconds on a typical connection (small dataset, no heavy round-trip needed)
- **Security/Privacy:** No customer data is stored; all financial figures used in this build are fictional placeholder data, not real franchisee numbers. The passcode is a lightweight check only — since the deployment is publicly accessible, a technically curious person could find it in the underlying source. It's meant to stop casual browsing by staff, not to be real access control. This is acceptable only because the data is fictional; real financial data should never be protected this way.
- **Accessibility:** Text should be readable at default browser zoom; interactive elements (pins, sort controls, location links, passcode field) should be reachable via keyboard
- **Compliance/Legal:** None identified for this build — fictional data only, internal-use concept
- **Budget/Timeline:** No build cost beyond time; fits within the course module's timeframe
- **Data ownership:** The dataset is updated manually by Nasif as location or sales data changes; no fixed update schedule. This matters more than it might sound — research surfaced that the current corporate website has already gone stale relative to individual locations' Google listings, so keeping this dataset current is the actual value proposition, not an afterthought
- **Storage model:** Pinned locations and "passcode entered" state both persist locally on that visitor's device only — no accounts, no cross-device sync, consistent with the no-server-dependency constraint
- **Passcode distribution:** Shared verbally/directly by Nasif to managers and ownership — not written anywhere in the app's visible UI or documentation

---

## 7. Open Questions

None outstanding for this build. All items resolved during drafting and research:

| Question | Resolution |
|----------|------------|
| Projection formula | Prior month's actual sales + 3%, kept simple for this build. Research (interview with Head of Franchising) surfaced that the real evaluation method is different — each store's first 5 months set its own baseline average, and performance is monitored against that baseline going forward. This is a stronger, more realistic approach and is flagged as a future improvement rather than built now, to keep this version's scope manageable |
| Trend history length | 3 months per location |
| Underperformance flag threshold | 5% or more below projection |
| Cross-device pin syncing | Not supported — local to each visitor's device only, by design (no accounts) |
| Dataset update ownership/cadence | Manual updates by Nasif, no fixed schedule |
| Who can see financial data | Gated behind a shared passcode (Comparison view + Detail view sales trend); hours/contact/address/city/franchisee-owner info stay open to all |
| What fields does the directory need beyond hours/contact | Resolved via interview: state, city, full address, and franchisee/owner contact are needed, primarily for coordinating with vendors and distributors |
| Where does unlocking the passcode from Detail view take the user | Resolved via interview: stays on Detail view, reveals the sales trend in place, with a separate button forward to Comparison view (R18, R19) |
| How should locations be filtered/searched at 30–50 locations | Resolved via interview: filter by state (more useful than city at this scale) plus a general search box (R16, R17) |
| Does Comparison view need a way back | Resolved via prototype self-evaluation: yes — added an explicit back-to-Collection control (R20), since the browser back button alone isn't a reliable UX pattern to depend on |
| Should the Landing page be folded into Collection view | Resolved: kept as a separate screen, on purpose, to leave room for additional introductory elements as the app grows beyond this build |
| Should the sales trend render as a chart or as raw values | Deliberately left open at the spec level — this is a visual/implementation choice, not a behavioral requirement, and belongs in `plan.md` once building begins |

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
