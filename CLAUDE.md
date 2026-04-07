# Project Skills
> **Always read `docs/Skill.md`** at the start of every session. It contains project-specific repeatable workflows, preferred approaches, and domain knowledge. Apply any matching skill entry before responding to a task.
> **Always read `docs/UIElements.md`** before generating any UI screen or component. It contains mechanical definitions for UI elements (e.g. Badge vs Chip) that determine which component to use.

---

# App Overview

## Product Name
Design System

## Stack
- Plain HTML + Tailwind CSS (CDN: https://cdn.tailwindcss.com)
- Vanilla JavaScript — no frameworks, no build tools
- Google Sans font via Google Fonts
- All files are self-contained single-page HTML files




Start if needed: `python3 -m http.server 3000`

## Figma Integration
- Figma capture script is injected in signin.html head (do not remove)
- MCP server: figma-remote-mcp at http://127.0.0.1:3845/mcp
- Target Figma file: gNQF8eNTjwL4O9o5Mf083C (Layout-log_Pod-2)


---


# Design System

## Token Architecture Rule
**Primitives before semantics — always.** When adding a new color value:
1. Add the raw hex as a **primitive** in `global.css` Layer 1 (e.g. `--green-200: #bbf7d0`)
2. Map it to intent as a **semantic** in Layer 2 (e.g. `--color-success-border: var(--green-200)`)
3. Reference only the semantic token in components and `ds.css`

Never write a raw hex value directly into a semantic token or component style.

## Color System

### Brand Colors
- Brand blue: `#143AC3` — active nav, focus rings, primary interactive
- Brand blue dark: `#2C3F85` — hover states
- Brand path green: `#0d9488` — logo accent, user avatar
- Primary CTA gradient: `linear-gradient(90deg, #143AC3 0%, #5F50E5 100%)` — New appointment button, modal submit, empty state CTA

### Primary Scale
| Token | Hex | Usage |
|---|---|---|
| `primary-900` | `#2C3F85` | Hover dark state |
| `primary-500` | `#143AC3` | Brand, nav active, focus ring |
| `primary-200` | `#A5B8FC` | Future chip border |
| `primary-100` | `#F0F3FF` | Nav active background |
| `primary-50` | `#F5F7FF` | Future status chip background |
| `primary-cta` | `#143AC3 → #5F50E5` | CTA buttons, logo icon |

### Surface & Background
- Page background: `linear-gradient(180deg, rgba(235,235,237,0.60) 0%, rgba(220,220,236,0.60) 100%), #FFF`
- Header background: `#F9F9FB`
- Sidebar background: transparent
- Calendar / content surface: `#ffffff`

### Text
- Text primary: `#121219`
- Text secondary: `#666689`
- Text muted: `#9ca3af`

### Borders
- Input/select border: `#F0F0F7`
- Divider / subtle border: `#f3f4f6`

### Appointment Type Colors
Colors chosen to avoid conflict with semantic colors (red=error, green=success, amber=warning, blue=info).

| Type | Text color | Background 
|---|---|---|---|---|
| Facility Tour | `#9A3412` | `#FFF3EE` |
| Counselling Session | `#0C5E73` | `#E8F6FA` |
| Group Therapy | `#A21CAF` | `#FCF0FD` |
| Psychological Evaluation | `#4A6B00` | `#F2F9E8` |
| Medical Test | `#1E293B` | `#F1F5F9` |


<!-- 


| Type | Text Color | Background |
|---|---|---|
| Counselling Session | `#0F766E` | `#F0FDFA` |
| Facility Tour | `#C2410C` | `#FFF7ED` |
| Group Therapy | `#BE185D` | `#FDF2F8` |
| Individual Therapy | `#0E7490` | `#ECFEFF` | -->

## Typography
- Font: Google Sans (Google Fonts)
- CDN: `<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />`
- CSS: `font-family: 'Google Sans', sans-serif`
- Headings: font-weight 700
- Labels: 13px, font-weight 500
- Body: 14px, font-weight 400

## Icons
- Library: Tabler Icons — outline style only (https://tabler.io/icons)
- CDN: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css">`
- Syntax: `<i class="ti ti-[icon-name]"></i>`
- Sizing via inline style: `font-size:12px` (xs), `font-size:16px` (sm/default), `font-size:20px` (md), `font-size:24px` (lg)
- Color inherits from parent — do not set color on `<i>` unless overriding
- Never use other icon libraries (Heroicons, Feather, etc.)
- Never use raw SVG icons — always use Tabler webfont classes
- **Before using any icon, verify it exists in Tabler outline by checking https://tabler.io/icons** — do not guess icon names. If unsure, use a name from the Common Icon Reference table below.

### Common Icon Reference
| Usage | Icon class |
|---|---|
| Appointments / calendar | `ti-calendar` |
| Patients | `ti-users` |
| Providers | `ti-stethoscope` |
| Rooms | `ti-door` |
| Reports | `ti-chart-bar` |
| Settings | `ti-settings` |
| Help | `ti-help-circle` |
| Search | `ti-search` |
| Filter | `ti-filter` |
| Add / plus | `ti-plus` |
| Close / X | `ti-x` |
| Chevrons | `ti-chevron-left/right/down` |
| User / person | `ti-user` |
| Check / complete | `ti-check` |
| Warning / due | `ti-alert-triangle` |
| Pending / clock | `ti-clock` |
| Delete | `ti-trash` |
| Reschedule | `ti-calendar` |
| Error alert | `ti-alert-circle` |
| Eye / password | `ti-eye` / `ti-eye-off` |
| Success | `ti-circle-check` |

## Layout & Spacing

### Spacing — strict 8px grid
All spacing must be a multiple of 8px: 8, 16, 24, 32, 40, 48, 56, 64px.
Never use 6px, 10px, 14px, 18px, 28px, or any non-multiple of 8.

### Layout Tokens
- Header height: 64px (sticky, z-50)
- Sidebar width: 240px (fixed left, top: 64px, full height)
- Main content padding left/right: 32px

### App Shell
```
┌──────────────────────────────────────────────────────┐
│ HEADER 64px — Logo | Global Search | Avatar only     │
├────────────┬─────────────────────────────────────────┤
│ SIDEBAR    │ MAIN CONTENT                            │
│ 240px      │ margin-left: 240px, padding-top: 64px  │
│ fixed      │                                         │
│            │ [page content here]                     │
└────────────┴─────────────────────────────────────────┘
```

### Header Rules
- Logo: left-aligned (teal icon 32px + "ClearPath FDO" text)
- Global search: centered, min-width 320px, placeholder "Search patients, appointments, rooms…"
- Right side: user avatar (32px circle, initials) ONLY — no other buttons



---


# Accessibility Guidelines
- WCAG-compliant color contrast on all text and interactive elements
- Icons always paired with visible text labels
- Focus states visible on all interactive elements
- Form errors announced via visible error text (not just color)
- All interactive elements keyboard-navigable


---


# Usability Heuristics
- **Clear Feedback** — Show loading states, success messages, and error states at all times
- **Error Prevention** — Use validations, confirmation dialogs, and helpful error messages before destructive actions


---


# Content / UX Writing
- Use plain, clinical language appropriate for a healthcare front desk context
- Patient-facing labels use full names (e.g. "Counselling Session", not "CS")
- Status labels: Ongoing · Completed · Cancelled · Future · Pending · Upcoming
- Placeholder text should be instructive (e.g. "Search patients, appointments, rooms…")
- Error messages should be specific and actionable


---


# Responsive Behaviour
- Auth pages (signin, signup): centered card, max-width 400–480px, collapses gracefully on small screens
- App shell: sidebar fixed, main content scrolls independently
- Calendar views: week view has horizontal scroll on small screens (min-width 900px table)


---


# Design Principles
- **Clarity first** — Every element should have a clear purpose; remove anything decorative that adds noise
- **Consistency** — Use the design system tokens strictly; never introduce one-off colors or spacing values
- **Efficiency** — Front desk staff work fast; interactions should be minimal and predictable
- **Trust** — Healthcare context demands visual reliability; avoid playful patterns or ambiguous states
- **Accessibility** — Design for all users by default, not as an afterthought
