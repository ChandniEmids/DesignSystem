---
name: Design System & Project Stack
description: ClearPath FDO design system tokens, colors, typography, icons, spacing rules and tech stack
type: project
---

## Stack
- Plain HTML + Tailwind CSS (CDN)
- Vanilla JavaScript — no frameworks, no build tools
- Google Sans font via Google Fonts
- All files are self-contained single-page HTML files
- Local server: `python3 -m http.server 3000`

## Brand Colors
- Brand blue: `#143AC3` — active nav, focus rings, primary interactive
- Brand blue dark: `#2C3F85` — hover states
- Brand path green: `#0d9488` — logo accent, user avatar
- Primary CTA gradient: `linear-gradient(90deg, #143AC3 0%, #5F50E5 100%)`

## Primary Scale
| Token | Hex | Usage |
|---|---|---|
| primary-900 | #2C3F85 | Hover dark state |
| primary-500 | #143AC3 | Brand, nav active, focus ring |
| primary-200 | #A5B8FC | Chip border |
| primary-100 | #F0F3FF | Nav active background |
| primary-50 | #F5F7FF | Status chip background |

## Text Colors
- Text primary: `#121219`
- Text secondary: `#666689`
- Text muted: `#9ca3af`

## Surfaces
- Page background: `linear-gradient(180deg, rgba(235,235,237,0.60) 0%, rgba(220,220,236,0.60) 100%), #FFF`
- Header background: `#F9F9FB`
- Content surface: `#ffffff`

## Typography
- Font: Google Sans
- Headings: font-weight 700
- Labels: 13px, font-weight 500
- Body: 14px, font-weight 400

## Icons
- Library: Tabler Icons — outline style only
- CDN: `https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css`
- Syntax: `<i class="ti ti-[icon-name]"></i>`
- Never use other icon libraries or raw SVGs

## Spacing — strict 8px grid
All spacing must be a multiple of 8px: 8, 16, 24, 32, 40, 48, 56, 64px.
Never use 6px, 10px, 14px, 18px, 28px.

## Layout
- Header height: 64px (sticky, z-50)
- Sidebar width: 240px (fixed left)
- Main content padding: 32px left/right

## Token Architecture Rule
Primitives before semantics — always:
1. Add raw hex as primitive in global.css Layer 1
2. Map to intent as semantic in Layer 2
3. Reference only semantic token in components
Never write raw hex directly into semantic token or component style.

## Appointment Type Colors
| Type | Text | Background |
|---|---|---|
| Facility Tour | #9A3412 | #FFF3EE |
| Counselling Session | #0C5E73 | #E8F6FA |
| Group Therapy | #A21CAF | #FCF0FD |
| Psychological Evaluation | #4A6B00 | #F2F9E8 |
| Medical Test | #1E293B | #F1F5F9 |

## Design Principles
- Clarity first — every element has a clear purpose
- Consistency — use design system tokens strictly, no one-off values
- Efficiency — front desk staff work fast, interactions minimal and predictable
- Trust — healthcare context, avoid playful patterns
- Accessibility — WCAG-compliant contrast, keyboard navigable, visible focus states
