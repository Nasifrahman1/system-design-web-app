# Business Case — MOTW Location Directory

## 1. Problem / Opportunity
MOTW has multiple franchise locations, but location details (hours, manager contact, basic stats) are scattered across spreadsheets and texts instead of living in one place.

## 2. Proposed Solution
A simple web app listing all MOTW locations. Clicking a location opens a detail view with its info. Users can pin locations they check often.

## 3. Options Considered

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| Option A | Keep using shared spreadsheets | No build cost, familiar | Hard to search, gets outdated fast |
| Option B (recommended) | Build a small web directory app | Fast lookup, one source of truth, pinning for quick access | Takes time to build, needs upkeep |

## 4. Feasibility

| Type | Assessment |
|------|------------|
| Operational — will people actually use/support this? | Yes, staff already look this info up regularly |
| Technical — can we build it with what we have/can get? | Yes, small Vue.js app with a CSV dataset, no server needed |
| Economic — does the payoff justify the cost? | Yes, low build cost against time saved from faster lookups |
| Schedule — can it be done in a useful timeframe? | Yes, a working prototype fits in one short dev cycle |

## 5. Costs & Benefits

**Costs** (one-time + ongoing):

| Item | One-time | Ongoing/year |
|------|----------|----------------|
| Development | Low | — |
| Keeping data updated | — | Some staff time monthly |

**Benefits** (tangible + intangible):

| Benefit | Tangible ($/time saved)? | Notes |
|---------|-----------------------------|-------|
| Faster location lookups | Yes | Replaces manual spreadsheet searching |
| Fewer errors from outdated info | Intangible | One source instead of scattered files |
| Easier onboarding | Intangible | New staff can self-serve location info |

**Payback period:** A few months, mostly from staff time saved
**ROI:** Positive within the first year, since the build cost is small relative to time saved

*(See Toolkit Part C — Financial Analysis Tools document for payback, ROI, and present value formulas.)*

## 6. Priority & Urgency
As MOTW grows, the spreadsheet approach only gets messier. Building this now, while there aren't many locations yet, is easier than fixing it later.

## 7. Recommendation
Go with Option B — build the MOTW Location Directory as a small internal web app.

## 8. Approval

| Role | Name | Date | Decision |
|------|------|------|----------|
| Sponsor | | | Go / No-go |

---

### Primary sources
- *Systems Analysis and Design*, 10th ed. (Cengage, 2017) — Ch. 2 "Analyzing the Business Case" and Toolkit Part C "Financial Analysis Tools"