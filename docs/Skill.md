# Project Skills

---

## Skill: `figma-component`

**Trigger:** User says "create a [ComponentName] component" or "add [ComponentName] to Figma"

---

### Step 1 — Look up the spec

Read `docs/FigmaComponents.md` for the component's:
- Properties table (Type, Size, State, HasIcon, etc.)
- Token mapping (which variable for each state/type)
- Total variant count

---

### Step 2 — Plan the structure

Before writing any code, decide:

**Component anatomy** — break into named parts:
- `Container` — the outermost auto-layout frame (holds everything)
- `Label` — text node, always present
- `Icon` — optional slot (leading or trailing)
- `Indicator` / `Dot` / `Badge` — component-specific extras

**Nested sub-components** — extract a part as its own component if:
- It repeats across multiple components (e.g. an icon slot, an avatar)
- It has its own independent states
- Rule: keep sub-components on the same page, prefixed with `_` (e.g. `_Icon/Slot`)

**Resizing behaviour** — define per axis before building:
| Situation | Setting |
|---|---|
| Button, badge, chip — width follows content | `primaryAxisSizingMode = 'AUTO'` (hug) |
| Input field, card — width fills container | `primaryAxisSizingMode = 'FIXED'` |
| All components — height follows padding + content | `counterAxisSizingMode = 'AUTO'` (hug) |
| Fixed-height component (e.g. nav bar) | `counterAxisSizingMode = 'FIXED'` |

---

### Step 3 — Identify the target page

Use the page map below. Use the existing page if it exists — never create a duplicate.
Check existing content with `get_metadata` before placing anything new.

---

### Step 4 — Load all variables FIRST

```js
const ids = {
  // Primitives (raw scale)
  brand100: 'VariableID:2036:3',
  brand200: 'VariableID:2036:4',
  brand300: 'VariableID:2036:5',
  brand500: 'VariableID:2036:7',
  brand600: 'VariableID:2036:8',
  brand700: 'VariableID:2036:9',
  neutral100: 'VariableID:2036:26',
  neutral200: 'VariableID:2036:27',
  neutral400: 'VariableID:2036:29',
};
const V = {};
for (const [k, id] of Object.entries(ids)) {
  V[k] = await figma.variables.getVariableByIdAsync(id);
}
```

Full variable ID map is in `docs/FigmaComponents.md`.

**Token naming layers:**
- **Primitive** — raw scale value: `brand/500`, `neutral/100`
- **Semantic** — intent-mapped: `button/primary/bg`, `button/primary/text`
Always bind the semantic intent, not the primitive directly, when a semantic variable exists.

---

### Step 5 — Apply variables to nodes

```js
// Color fills
function vFill(v) {
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v
  );
}
node.fills   = [vFill(V.brand500)];
node.strokes = [vFill(V.brand300)];

// Spacing / radius (bind directly to layout property)
node.setBoundVariable('paddingLeft',   V.spacingMd);
node.setBoundVariable('cornerRadius',  V.radiusButton);
node.setBoundVariable('itemSpacing',   V.spacingSm);
```

**Rules:**
- Never hardcode hex values, spacing numbers, or radius values
- State changes = token swaps only — never manually override a fill outside of variable binding
- No manual `opacity` overrides for disabled — use the disabled token value instead

---

### Step 6 — Apply text styles

```js
const TS = {
  h1:      'S:8ef6282d259210c7b1bb9b77378bdadb5be2c2d9,',
  h2:      'S:74dc0a1f31bd336417c4972180869b4e7ca94c5c,',
  h3:      'S:be36548b43b2ef4126b1f9f1e50c76af19bc56ce,',
  bodyLg:  'S:8b0c179ad5e26539781870124520b26191163fce,',
  bodyMd:  'S:8220347d95980891a377f917e7a5708c4ce73717,',
  bodySm:  'S:5a240463293826280a22895dbdb5c78405d00fa8,',
  labelMd: 'S:828b473e005bc8af46e82477366cdfac2d8d1350,',
  labelSm: 'S:40b02ede73c2ff8a920a662123904f7127253a6a,',
  labelXs: 'S:5caeaf8e45da8d3c27d870950f2fd551cd16b9b9,',
};
// Load font first, then set characters, then set style
await figma.loadFontAsync({ family: 'Manrope', style: 'SemiBold' });
txt.characters  = 'Label';
txt.textStyleId = TS.labelMd;
```

Never manually set `fontSize`, `fontName`, or `fontWeight` — always use `textStyleId`.

---

### Step 7 — Build as ONE scalable component set

**Core rule: ONE component set per component — never separate sets per type.**

`Button/Primary` + `Button/Secondary` + `Button/Ghost` as separate sets = **wrong**.
`Button` with `Type=Primary/Secondary/Ghost` as a property = **correct**.

Why: In a design file, separate sets force designers to detach and replace instances to change type — losing all overrides. A single set lets them change `Type` in the properties panel while keeping every override intact.

#### Variant properties

Look up the component's **Properties** table in `docs/FigmaComponents.md`.
Include optional properties only when the component needs them:

| Property | Values | Always include? |
|---|---|---|
| `Type` | Primary, Secondary, Ghost, etc. | Only if component has multiple visual types |
| `Size` | Sm, Md, Lg | Yes, if component has size variants |
| `State` | Default, Hover, Active, Focus, Disabled, Loading | Yes — always include all applicable states |
| `HasIcon` | True, False | When icon is optional |
| `LeadingIcon` | True, False | When icon position matters |
| `TrailingIcon` | True, False | When icon position matters |

**Loading state** — include when the component triggers async actions (e.g. buttons, inputs on submit).

#### Combinations generator

```js
const props = {
  Type:    ['Primary', 'Secondary', 'Ghost'],
  Size:    ['Sm', 'Md', 'Lg'],
  State:   ['Default', 'Hover', 'Active', 'Focus', 'Disabled'],
  HasIcon: ['True', 'False'],
};

function combinations(p) {
  const keys = Object.keys(p), vals = Object.values(p), result = [];
  function r(i, cur) {
    if (i === keys.length) { result.push({...cur}); return; }
    for (const v of vals[i]) { cur[keys[i]] = v; r(i+1, cur); }
  }
  r(0, {});
  return result;
}

const allCombos = combinations(props); // Type(3) × Size(3) × State(5) × HasIcon(2) = 90

const variants = [];
for (const combo of allCombos) {
  const c = figma.createComponent();
  c.name = Object.entries(combo).map(([k,v]) => `${k}=${v}`).join(', ');
  applyVariantStyles(c, combo, V, TS);
  variants.push(c);
}
```

#### applyVariantStyles logic

- Read `Size` → set padding, cornerRadius, icon size, gap via size config object
- Read `Type` + `State` → swap fills/strokes using token map (no manual overrides)
  - Primary: Default=brand/500, Hover=brand/600, Active=brand/700, Disabled=neutral/100 bg + neutral/400 text
  - Secondary: Default=white + brand/300 border, Hover=brand/100 + brand/600, Active=brand/200 + brand/700
  - Ghost: Default=transparent, Hover=brand/100, Active=brand/200
- Read `State=Focus` → add DROP_SHADOW effect: `spread:3, radius:0, color=brand/300`
- Read `HasIcon` / `LeadingIcon` / `TrailingIcon` → add or omit icon node
- Read `State=Loading` → swap label for spinner node if applicable
- All values via bound variables — never hardcoded

#### Grid positioning before combineAsVariants

⚠️ Always set `x`/`y` on every variant BEFORE calling `combineAsVariants` — Figma stacks all variants at (0,0) by default.

```js
// Columns = State (5), Rows = Type × Size × HasIcon
const COL_W = 180, COL_GAP = 24, ROW_GAP = 24;
const colProp = 'State';
const colVals = props[colProp];

const rowProps = Object.fromEntries(Object.entries(props).filter(([k]) => k !== colProp));
const rowCombos = combinations(rowProps);

let cumY = 0;
const rowY = rowCombos.map(rc => {
  const y = cumY;
  const h = rc.Size ? { Sm:32, Md:40, Lg:56 }[rc.Size] : 48;
  cumY += h + ROW_GAP;
  return y;
});

for (const c of variants) {
  const parts = Object.fromEntries(c.name.split(', ').map(s => s.split('=')));
  const colIdx = colVals.indexOf(parts[colProp]);
  const rowIdx = rowCombos.findIndex(rc => Object.entries(rc).every(([k,v]) => parts[k] === v));
  c.x = colIdx * (COL_W + COL_GAP);
  c.y = rowY[rowIdx];
}

const set = figma.combineAsVariants(variants, page);
set.name         = 'Button'; // matches component name, not type
set.clipsContent = false;    // required for focus rings / shadows to bleed outside
set.fills        = [{ type: 'SOLID', color: { r: 0.97, g: 0.97, b: 0.98 } }];
```

---

### Step 8 — Confirm

Report: component name, page, total variant count, property breakdown.

---

### Page Map

| Component | Page Name | Page ID |
|---|---|---|
| Buttons | Buttons | `2046:10` |
| Breadcrumbs | Breadcrumbs | `2316:2` |
| Input Field | Input Field | `2047:2` |
| Dropdown | Dropdown | `2108:2` |
| Search & Select | Search & Select | `2126:2` |
| Text Area | Text Area | `2139:2` |
| Avatar | Avatar | `2146:2` |
| Badge | Badge | `2046:12` |
| Chip | Chip | `2046:13` |
| Alerts | Alerts | `2046:14` |
| Navigation | Navigation | `2046:15` |
| Cards | Cards | `2046:16` |
| Overlays | Overlays | `2046:17` |
| Datepicker | Datepicker | `2228:2` |
| Timepicker | Timepicker | `2228:69` |

### Figma File
- **File key:** `vlxR2byVKe0xAV9HPB7SxW`
- **File name:** ClearPath Design System
- **URL:** https://www.figma.com/design/vlxR2byVKe0xAV9HPB7SxW/ClearPath-Design-system

---

### Rules

**Structure**
- ONE component set per component — never separate sets per Type
- Always use auto-layout — never absolute positioning inside component nodes
- Always set `x`/`y` on each variant before `combineAsVariants` — prevents stacking
- Set `clipsContent = false` on both the set and variants that have focus rings or shadow effects

**Tokens**
- Never hardcode hex, spacing, or radius values
- State changes = token swaps only — never manually override fills outside of variable binding
- Primitive tokens for raw values, semantic tokens for intent (use semantic when available)

**Typography**
- All text nodes must have font loaded before `characters` is set
- Always use `textStyleId` — never set `fontSize`, `fontName`, or `fontWeight` manually

**Variants**
- Variant naming: `Type=Primary, Size=Md, State=Default, HasIcon=False`
- Include Loading state for components that trigger async actions
- Add/remove properties based on what the component actually needs — don't force all properties on every component

**Icons**
- Use Tabler Icons — reference the icon table in `CLAUDE.md`
- Never use other icon libraries or raw SVGs

**Spacing**
- 8px grid: 8, 16, 24, 32, 40, 48px
