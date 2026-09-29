# Design System — MOTW Performance Directory

## 1. Brand Principles
Clear, trustworthy, and efficient. This is an internal tool for regional managers and franchise leadership, not a customer-facing app, so the design favors legibility and fast scanning over decoration. Every screen should let someone find a number or a fact in seconds, not admire the interface.

## 2. Color Palette

| Name | Hex | Use |
|------|-----|-----|
| Primary | #2B4C3F | Main brand color, primary buttons, active nav state |
| Secondary | #B08D57 | Accents, links, pinned/star indicators (a muted coffee-brown, ties back to MOTW without leaning "cutesy") |
| Background | #F7F7F5 | Page background |
| Text | #1F1F1F | Body text |
| Success/OK | #2E7D4F | On-target performance indicators |
| Warning/Flag | #B3261E | Underperformance flags, gated/locked indicators |

## 3. Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Heading 1 | Inter | 28px | Bold |
| Heading 2 | Inter | 20px | Semibold |
| Body | Inter | 15px | Regular |
| Data/Table figures | Inter | 15px | Medium (slightly heavier than body, so numbers stand out in dense tables) |

## 4. Logo Usage
- File(s): `/assets/logo.png`
- Do NOT: stretch or recolor the logo outside the palette above; do not place it on busy or low-contrast backgrounds; do not display it smaller than 32px tall, where detail is lost.

## 5. Spacing & Grid
- Base unit: 8px
- Grid: default Bootstrap 12-column grid (already used by the app template), max content width 1200px
- Standard spacing scale: 8 / 16 / 24 / 32 / 48px

## 6. Core Components

| Component | Rules |
|-----------|-------|
| Button (primary) | Primary color (#2B4C3F) background, white text, 6px corner radius, 12px vertical / 20px horizontal padding |
| Button (secondary) | Outlined, primary-color border and text, transparent background |
| Card (location card) | White background, 1px border #E0E0E0, 16px padding, 6px corner radius; pinned locations show a filled star in Secondary color, unpinned show an outlined star in muted gray |
| Table row (Comparison view) | Default row: white background. Flagged (underperforming) row: light red tint background (#FBEAEA) with Warning-color text for the flag label |
| Form field (passcode input) | Label above input, 6px corner radius, red border + inline error message below field on incorrect passcode |
| Gated content block | Wrapped in a bordered panel with a lock icon (`bi-lock-fill`) and Warning-color accent border until unlocked |

## 7. Voice & Tone
- Tone: plain, direct, professional but not stiff. Short labels, no corporate jargon or forced friendliness.
- Example microcopy: button says "Compare Locations," not "Launch Comparison Dashboard"; passcode error says "Incorrect passcode. Try again." not "Access denied: authentication failure."

## 8. Accessibility Standards
- Minimum contrast ratio: 4.5:1 for body text (WCAG AA)
- Standard to meet: WCAG 2.1 AA
- All interactive elements (pins, sort controls, location links, passcode field) must be reachable via keyboard, consistent with the specification's existing Accessibility constraint

## 9. Version & Change Log

| Version | Date | Change | Approved by |
|---------|------|--------|--------------|
| 1.0 | 2026-09-29 | Initial version | Nasif Rahman |

---

**Referenced by:** specification.md Section 6 (Constraints — Branding), plan.md (Dependencies), and every front-end task in tasks.md.
