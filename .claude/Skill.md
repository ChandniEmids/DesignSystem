

---
name: ds-token-generator
description: Generates UI documentation using strict Design Tokens and an 8px grid system.
---

## Typography Foundation

**Trigger:**  
When user asks to create or document typography system, typography tokens, or text styles.

**Context:**  
Typography is a **foundation**, not a component.  
It follows a **Primitive → Semantic token structure** using the format:  
`typography.group.property.state`

---

**Approach:**

### 1. Primitive Tokens (Layer 1)

Create only the following base tokens:

- **Font Family**
  - `typography.font.family.primary`
  - `typography.font.family.mono`

- **Font Size (Scale xs → 3xl)**

| Token | Value |
|------|------|
| `typography.font.size.xs` | 12px |
| `typography.font.size.sm` | 14px |
| `typography.font.size.md` | 16px |
| `typography.font.size.lg` | 18px |
| `typography.font.size.xl` | 20px |
| `typography.font.size.2xl` | 24px |
| `typography.font.size.3xl` | 32px |

- **Font Weight**
  - `typography.font.weight.regular` → 400
  - `typography.font.weight.medium` → 500
  - `typography.font.weight.semibold` → 600
  - `typography.font.weight.bold` → 700

- **Line Height (Percentage-based)**
  - `typography.line.height.tight` → 120% (headings)
  - `typography.line.height.normal` → 150% (body)
  - `typography.line.height.relaxed` → 160% (long content)

---

### 2. Semantic Tokens (Layer 2)

Create usage-based tokens:

- **Headings**
  - `typography.heading.h1`
  - `typography.heading.h2`
  - `typography.heading.h3`

- **Text**
  - `typography.text.body`
  - `typography.text.body.large`
  - `typography.text.caption`

- **Labels**
  - `typography.label.form`
  - `typography.label.nav`

---

### 3. Token Mapping Rule (STRICT)

Each semantic token must map only to primitives.

Example:

- `typography.heading.h1`
  - font-size → `typography.font.size.3xl` (32px)
  - font-weight → `typography.font.weight.bold`
  - line-height → `typography.line.height.tight`

---

### 4. Rules

- No raw px values in semantic tokens  
- No color values inside typography tokens  
- No mixing with component tokens  
- Use consistent size scale (no random sizes like 13px, 15px)  
- Always use defined scale (12px → 32px only)  

---

### 5. Usage Guidelines

- Headings → hierarchy only (use xl → 3xl scale)  
- Body → default reading (md = 16px recommended)  
- Caption → metadata / helper text (xs, sm)  
- Labels → form and navigation UI (sm, md)  

---

### 6. Output Structure (for documentation)

When generating typography documentation, always include:

- Section A: Purpose  
- Section B: Primitive Tokens (table)  
- Section C: Semantic Tokens (table)  
- Section D: Usage Rules  
---






## Spacing Foundation

**Trigger:**  
When user asks to create or document spacing system, layout spacing, padding, margin, or grid rules.

**Context:**  
Spacing is a **foundation**, not a component.  
It follows **Primitive → Semantic token structure** using 8px grid system.  
Naming format: `space.group.property`

---

**Approach:**

### 1. Primitive Tokens (Layer 1)

Use strict **8px grid system**:

- `space.0` → 0px
- `space.1` → 8px
- `space.2` → 16px
- `space.3` → 24px
- `space.4` → 32px
- `space.5` → 40px
- `space.6` → 48px
- `space.7` → 56px
- `space.8` → 64px

Optional half steps (for tighter UI):
- `space.0-5` → 4px
- `space.1-5` → 12px
- `space.2-5` → 20px

---




## Icon System

**Trigger:**  
When user asks to document icons, define icon usage, or include icons in a design system.

**Context:**  
Icons are a **foundation asset**, not a component.  
This system uses **Tabler Icons (outline style only)** as the single source of truth.  
Icons must follow token-based sizing and color rules.  
No custom icons or mixed icon libraries are allowed.

---

**Approach:**

### 1. Icon Source (STRICT)

- Use only **Tabler Icons (outline)**
- Always use official icon names (e.g., `user`, `calendar`, `alert-circle`)
- Do not rename icons based on domain (e.g., no `icon.patient`, `icon.appointment`)

---

### 2. Size Tokens (Primitive)

Define fixed icon sizes:

- `icon.size.sm` → 16px  
- `icon.size.md` → 20px  
- `icon.size.lg` → 24px  

No arbitrary sizes allowed.

---

### 3. Color Rules (Semantic)

Icons must always use semantic color tokens:

- `icon.color.default` → `color.text.secondary`  
- `icon.color.primary` → `color.brand.blue`  
- `icon.color.disabled` → `color.text.muted`  

No hardcoded colors allowed.

---

### 4. Usage Types

Icons must be categorized as:

- **Decorative:** Used with text (e.g., buttons, labels)  
- **Informational:** Status or feedback (alerts, indicators)  
- **Interactive:** Clickable icons (actions, controls)  

---

### 5. Rules

- Use only outline style icons  
- Do not mix icon libraries  
- Do not stretch or distort icons  
- Maintain consistent size across similar components  
- Always pair icons with text where clarity is required  

---

### 6. Accessibility

- Provide `aria-label` for meaningful icons  
- Do not rely on icons alone to convey critical information  

---

### 7. Output Structure (for documentation)

When generating icon documentation, include:

- Section A: Purpose  
- Section B: Icon Source & Rules  
- Section C: Size Tokens  
- Section D: Color Usage  
- Section E: Usage Guidelines  
- Section F: Accessibility  

---




### 2. Semantic Tokens (Layer 2)

Create usage-based tokens:

- Layout
  - `space.layout.section`
  - `space.layout.container`

- Component spacing
  - `space.component.padding`
  - `space.component.gap`

- Input/Form
  - `space.input.padding`
  - `space.input.gap`

---

### 3. Token Mapping Rule (STRICT)

Each semantic token must map only to primitives.

Example:

- `space.layout.section` → `space.4`
- `space.component.gap` → `space.2`

---

### 4. Rules

- Always follow 8px grid  
- No random values (no 10px, 14px, etc.)  
- No raw px in semantic tokens  
- Prefer reuse over creating new tokens  

---

### 5. Usage Guidelines

- Small spacing → internal padding (inputs, chips)  
- Medium spacing → component gaps  
- Large spacing → layout sections  

---

### 6. Output Structure (for documentation)

- Section A: Purpose  
- Section B: Primitive Tokens (table)  
- Section C: Semantic Tokens (table)  
- Section D: Usage Rules  

---







## Border Radius Foundation

**Trigger:**  
When user asks to create or document border radius system or corner styles.

**Context:**  
Border radius is a **foundation**, not a component.  
It follows **Primitive → Semantic token structure**.  
Naming format: `radius.group.property`

---

**Approach:**

### 1. Primitive Tokens (Layer 1)

Define consistent radius scale:

- `radius.none` → 0px
- `radius.xs` → 2px
- `radius.sm` → 4px
- `radius.md` → 6px
- `radius.lg` → 8px
- `radius.xl` → 12px
- `radius.2xl` → 16px
- `radius.pill` → 9999px (fully rounded)

---

### 2. Semantic Tokens (Layer 2)

Create usage-based tokens:

- Components
  - `radius.button`
  - `radius.input`
  - `radius.card`
  - `radius.modal`

- Special
  - `radius.badge`
  - `radius.avatar`

---

### 3. Token Mapping Rule (STRICT)

Each semantic token must map only to primitives.

Example:

- `radius.button` → `radius.md`
- `radius.card` → `radius.lg`
- `radius.badge` → `radius.pill`

---

### 4. Rules

- Keep radius scale minimal and consistent  
- No random values (no 5px, 7px, etc.)  
- No raw px in semantic tokens  
- Use pill only for fully rounded elements  

---

### 5. Usage Guidelines

- Small radius → inputs, buttons  
- Medium radius → cards, containers  
- Large radius → modals, panels  
- Pill → chips, badges, avatars  

---

### 6. Output Structure (for documentation)

- Section A: Purpose  
- Section B: Primitive Tokens (table)  
- Section C: Semantic Tokens (table)  
- Section D: Usage Rules  

---




## Design System Documentation Skill (Token-Strict)

Every time the user asks to "create a design system for [component/foundation]", apply the following constraints:

## 1. The Token-First Rule
- **NO Generic Classes:** Never use hardcoded Tailwind values like `bg-blue-500` or `p-4`.
- **YES Semantic Tokens:** Always use CSS variables or bracket-notation linked to tokens:
    - **Spacing:** `[var(--space-1)]` (8px), `[var(--space-2)]` (16px), etc.
    - **Color:** `[var(--color-surface-primary)]`, `[var(--color-text-body)]`.
    - **Radius:** `[var(--radius-md)]`.
- **Consistency:** If a token doesn't exist, identify it as a "New Token Candidate" in the Specs.
- **Primitives before semantics — always:** When a new color value is needed, follow this exact order:
    1. Add the raw hex as a **primitive** in `global.css` Layer 1 (e.g. `--green-200: #bbf7d0`)
    2. Map it to intent as a **semantic** in Layer 2 (e.g. `--color-success-border: var(--green-200)`)
    3. Reference only the semantic token in components and `ds.css`
    - Never write a raw hex value directly into a semantic token or any component style.

## 2. Mandatory Structure
Generate the documentation as a high-density HTML document with the following sections:

### Section A: Purpose
- Clear, professional definition of the component’s role in an enterprise healthcare environment.

### Section B: Dos & Don'ts
- Use a 2-column grid. Focus on Heuristics (e.g., "Error Prevention," "Consistency").

### Section C: Anatomy & Specs for components
- **Visual Anatomy:** Identify components by number.
- **Technical Table:** - Map every element to a **Specific Token**.
    - Example: | Element | Property | Token | Value |
               | :--- | :--- | :--- | :--- |
               | Container | Padding | `--space-2` | 16px |

### Section D: The Code Tab (Developer Usage)
- Provide a clean HTML snippet using **only** token-based styling.
- **Example Implementation:**
  ```html
  <button class="bg-[var(--color-action-primary)] p-[var(--space-2)] rounded-[var(--radius-sm)]">
    <span class="text-[var(--color-text-on-primary)]">Confirm</span>
  </button>


### E. Interaction States (The Missing Layer) for components
- Define and document the visual tokens for:
  - **Default:** Standard state.
  - **Hover:** Subtle change (e.g., background darken by 5%).
  - **Focus:** Mandatory 2px focus ring using `[var(--color-focus-ring)]`.
  - **Disabled:** 40% opacity or grayed out using `[var(--color-disabled)]`

### F. Accessibility (A11y) Standards
- Specify the **WCAG Contrast** target (4.5:1 for small text).
- Define **Screen Reader** behavior (e.g., `role="status"`, `aria-label`).
- List **Keyboard Navigation** (e.g., "Tab to focus, Enter to select").


### G. Content & Voice for components
- Define **Character Limits** and **Case Styling** (e.g., "Always use Sentence case").



## 3. Token Architecture & Construction (The Rule of Three)
Stop using data-specific names (e.g., `appt-tour-bg`). Every component token must follow this strict 3-tier mapping to ensure the system is scalable and professional.

### The Formula:
`[component].[variant/intent].[property]`

### The 3-Tier Mapping Rule:
1. **Tier 3 (Component):** `badge.danger.bg` (What you use in the HTML)
2. **Tier 2 (Global Semantic):** Maps to `[var(--color-danger-bg)]` (The Intent)
3. **Tier 1 (Primitive):** Maps to `[var(--red-50)]` (The Raw Color)

### Implementation Examples:
- **Status Badge (Ongoing):** Use `--badge-danger-bg` -> maps to `--color-danger-bg` -> maps to `--red-50`.
- **Primary Button:** Use `button.brand.bg` -> maps to `color.brand.bg`.
- **Specialty Tags:** For unique healthcare categories (e.g., Facility Tour), use **Generic Tiers** to keep the design system "data-blind":
  - `badge.variant-1.bg` (instead of `badge.tour.bg`)
  - `badge.variant-2.bg` (instead of `badge.counselling.bg`)

## 4. The "Clinical" Fallback Rule
If a component has a unique use case not covered by standard 'Success' or 'Danger' intents:
- **Naming:** Use `[component].variant-[n].[property]`.
- **Logic:** This ensures that if the medical category name changes in the database, the Design System documentation remains valid and doesn't need a code change.
- **Consistency:** Always map these variants to the 8px grid and defined primitive palette.


## 5. The "Clinical" Variant Standards (Atlassian/Carbon Logic)
When generating documentation or code for UI variants, **NEVER** list specific UI labels (e.g., "Ongoing", "Medical Test") as the primary variants. Use **Atomic Decoupling**:

### A. Semantic Intent (The "What")
Define by functional meaning only. **NEVER use structural names (Primary, Secondary, Tertiary, Ghost, Outline) as intents — those are forbidden.** The six valid intents are:
* **Danger:** Errors, busy, high-priority, live activity, urgent. → Red palette.
* **Success:** Positive status, available, completed, confirmed. → Green palette.
* **Warning:** Caution, pending, delayed, attention required. → Amber palette.
* **Info:** General metadata, upcoming, informational categories. → Sky/Blue palette.
* **Brand:** Brand-adjacent, anticipated, future, inactive states. → Primary blue palette (uses dashed outline style).
* **Neutral:** Low-emphasis, cancelled, dismissed, muted utility. → Grey palette.

### B. Appearance Styles (The "How It Looks")
The container treatment is a reusable style applicable to ANY intent. **"Outline" and "Ghost" are styles, not intents.**
* **Subtle (Default):** Tinted background, high-contrast text, solid 1px border. Used by Danger, Success, Warning, Info, Neutral.
* **Outline:** Tinted background, brand text, 1.5px dashed border. Used by Brand intent. Any intent can adopt this style for "inactive" / "future" variants.

### C. Structural Modifiers (The Props)
Treat internal elements as boolean toggles, not separate variants:
* **`hasIcon`:** Leading icon for categorization.
* **`hasDot`:** 6px status indicator (reserved for real-time/live states).
* **`size`:** `small` (20px height for tables) or `medium` (24px+ for general UI).

## 5. Project Awareness & Asset Reference
* **Scan Phase:** Before outputting, check `global.css` for valid variable names.
* **Icon Verification:** Only use **Tabler Icons (outline)**. Confirm names at tabler.io. Never guess.
* **Shared CSS Rule:** ALL design-system CSS lives in `design-system/ds.css`. Never use `<style>` blocks in HTML.
* **Dos & Don'ts:** Use white cards with 3px colored top borders. Use `ti-thumb-up` / `ti-thumb-down`. Use `—` for list items, never Unicode checks/crosses.


## 6. Token Display Context Rule
Token names must match the audience of the section they appear in. This applies to every component documentation page.

- **Overview tab** (design context — spec tables, anatomy card, redline panels): Use **Figma dot-notation** format.
  - Component token: `badge.danger.bg`
  - Semantic token: `brand.blue`, `border.subtle`, `text.muted`
  - Primitive (value column): `color.red.50`, `color.green.700`, `color.neutral.100`
  - Spacing/radius: `radius.pill`, `space.1`
- **Code tab** (developer context — HTML snippets, JS logic, CSS references): Use **CSS custom property** format.
  - `var(--badge-danger-bg)`, `var(--brand-blue)`, `var(--border-subtle)`

**Never mix formats within a section.** The `var(--...)` syntax in inline styles used for actual rendering (e.g. `background:var(--badge-danger-bg)`) is invisible to the reader and does not count — only the displayed `<code>` tag content must follow this rule.


## 7. Anatomy Example Rules (The "Redline" Format)
The Redline format applies **only to the visual anatomy example card** inside the Anatomy & Specs section. It does NOT apply to the spec table, prose descriptions, variants section, or any other part of the page.

When generating the anatomy example card for any component, the output must follow the "Redline" format. Focus on **Nodes**, **Geometry**, and **Fixed Tokens**.

### A. The "Selected Node" Visual Mapping
For every component anatomy, identify and list the technical specs for the **Root Container**:
1. **Direction:** (e.g., Horizontal/Flex).
2. **Alignment:** (e.g., Middle Left / Center).
3. **Resizing:** (e.g., Horizontal: Fill/Hug, Vertical: Fixed).
4. **Padding:** Use the 8px grid tokens (e.g., Padding Left: 12px [var(--space-1-5)]).

### B. Element Property Breakdown
Every numbered part (Node) must include a table or list with these specific technical attributes:
* **Height/Width:** Use fixed values for high-density components (e.g., Height: 32px).
* **Background/Border:** Reference the **Tier 3 Component Token** and the hex value.
* **Border Weight & Radius:** (e.g., Weight: 1px, Radius: 6px).

### C. Typography specs (The "Text Node")
For any text element, explicitly document:
* **Token:** The semantic text token.
* **Font Specs:** Font-family, Weight (Regular/600), Size (14px), and Letter Spacing (-0.15).
* **Color:** The high-contrast text hex.

### D. Layout Annotations
* Use green "spacer" bars in the visual representation to indicate internal padding and gaps.
* Clearly label internal spacing between slots (e.g., "Gap: 8").






## 8. Component Categorization & Inventory Mapping
**Trigger:** User asks to "document," "inventory," or "categorize" UI elements/components.
**Context:** This project uses a universal classification technique to ensure documentation scales across all future components (Badges, Chips, Buttons, etc.).
**Approach:**
1. **Classify by Interaction Type (The "Click" Rule):**
    - **Passive (Information-First):** Read-only. NO hover/active states. (e.g., Badges, Indicators).
    - **Active (Action-First):** Interactive. MUST have Hover, Focus, and Selected states. (e.g., Chips, Buttons).
2. **Classify by Visual Variant (The "Build"):**
    - **Solid:** High-contrast, full background.
    - **Subtle:** 10-15% opacity background (Clinical Clean default).
    - **Outline:** 1px border, transparent background.
    - **Ghost:** No background or border.
3. **Classify by Dimension (T-Shirt Sizing):**
    - **Size S:** 16px - 24px height (High-density/Cards).
    - **Size M:** 32px height (Standard default).
    - **Size L:** 40px+ height (Headers/Primary actions).
4. **Classify by Composition (Modifiers):**
    - Identify if the version is: `Label-Only`, `Icon-Leading`, `Icon-Trailing`, `Icon-Only`, or `Dismissible` (for Active components).
5. **Output Format:**
    - Always document the element using the string: `[Component Name] | [Interaction Type] | [Visual Variant] | [Sizing] | [Modifiers]`.



## 8. Scope & Intent
This file defines the PHYSICAL and FUNCTIONAL properties of components. 
**STRICT RULE:** This file contains ZERO business logic or domain-specific mappings (e.g., no mention of "Patients," "Admitted," or "Healthcare").









## 9. Project Awareness & Asset Reference
- **Scan Phase:** Before outputting, check `global.css` for valid variable names and `CLAUDE.md` for the existing icon library.
- **Contextual Logic:** Use `design-system/colors.html` as the visual and layout reference for all new design system pages. Match its spacing, section structure, demo block style, and typography exactly.
- **Icon Verification Rule:** Only use icons from **Tabler Icons outline** library. Before writing any `ti ti-[name]`, confirm the icon name exists at https://tabler.io/icons. Never guess icon names. If unsure, pick from the Common Icon Reference in `CLAUDE.md`. Never use CSS `content:` pseudo-elements or Unicode characters (✓ ✗) as icon replacements.
- **Dos & Don'ts pattern:** Use white cards with a 3px colored top border (`border-top-color: green / --color-danger`). Use `ti-thumb-up` / `ti-thumb-down` for the section header icons. Use `—` dash list items (`.dd-list li::before { content:'—' }`) — never Unicode check/cross characters.
- **Shared CSS rule:** ALL CSS for design-system pages lives in `design-system/ds.css`. Never write a `<style>` block inside any design-system HTML file. New component styles go into `ds.css` only. When generating a new design system page, add `<link rel="stylesheet" href="ds.css">` in the `<head>` (after `global.css`) and write zero inline CSS.







