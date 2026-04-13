# Figma Component Specs

Reference for building components in Figma via `use_figma`.
All tokens map to the design system defined in `CLAUDE.md`.

---

## Figma Variable IDs

> **Always load these before creating any component.** Never hardcode hex, spacing, or radius values.

### Color — Semantic (`Color Semantic` collection)
| Key | Variable ID | Name |
|---|---|---|
| `textPrimary` | `VariableID:2036:70` | Text/Primary |
| `textSecondary` | `VariableID:2036:71` | Text/Secondary |
| `textMuted` | `VariableID:2036:72` | Text/Muted |
| `textWhite` | `VariableID:2066:13` | Text/White |
| `borderSubtle` | `VariableID:2036:73` | Border/Subtle |
| `borderDark` | `VariableID:2080:143` | Border/Dark |
| `borderBrand` | `VariableID:2225:47` | Border/Brand |
| `baseBrand` | `VariableID:2080:129` | Base/Brand |
| `baseDanger` | `VariableID:2036:83` | Base/Danger |
| `baseSuccess` | `VariableID:2080:126` | Base/Success |
| `baseWarning` | `VariableID:2080:127` | Base/Warning |
| `baseInfo` | `VariableID:2080:128` | Base/Info |
| `textDanger` | `VariableID:2080:211` | Text/Danger |
| `textSuccess` | `VariableID:2036:87` | Text/Success |
| `textWarning` | `VariableID:2080:141` | Text/Warning |
| `textInfo` | `VariableID:2080:142` | Text/Info |

### Color — Primitives (`Color Primitives` collection)
| Key | Variable ID | Name |
|---|---|---|
| `brand700` | `VariableID:2036:9` | Brand/700 |
| `neutral75` | `VariableID:2036:25` | Neutral/75 |
| `neutral100` | `VariableID:2036:26` | Neutral/100 |
| `neutral300` | `VariableID:2036:28` | Neutral/300 |
| `surface0` | `VariableID:2036:63` | Surface/0 (white) |
| `surface50` | `VariableID:2036:64` | Surface/50 |

### Spacing (`Spacing` collection)
| Key | Variable ID | Value |
|---|---|---|
| `sp4` | `VariableID:2057:637` | 4px |
| `sp8` | `VariableID:2018:169` | 8px |
| `sp16` | `VariableID:2018:170` | 16px |
| `sp24` | `VariableID:2018:171` | 24px |
| `sp32` | `VariableID:2018:172` | 32px |
| `sp40` | `VariableID:2018:173` | 40px |
| `sp48` | `VariableID:2018:174` | 48px |

### Border Radius (`Border Radius` collection)
| Key | Variable ID | Value |
|---|---|---|
| `r4` | `VariableID:2018:154` | 4px |
| `r6` | `VariableID:2018:155` | 6px |
| `r8` | `VariableID:2018:156` | 8px |
| `r12` | `VariableID:2018:157` | 12px |
| `r16` | `VariableID:2018:158` | 16px |
| `rFull` | `VariableID:2018:159` | 9999px |

### Font Size (`Typography Primitives` collection)
| Key | Variable ID | Value |
|---|---|---|
| `fsXs` | `VariableID:2019:188` | 12px |
| `fsSm` | `VariableID:2019:189` | 14px |
| `fsMd` | `VariableID:2019:190` | 16px |
| `fsLg` | `VariableID:2019:191` | 18px |

### Font (Figma file primary font)
- **Family:** `Manrope` (Regular, Medium, SemiBold, Bold)
- Load with: `await figma.loadFontAsync({ family: 'Manrope', style: 'Medium' })`

### Text Styles — use `node.textStyleId` instead of manual font/size settings
| Key | Style ID | Name | Size | Weight |
|---|---|---|---|---|
| `h1` | `S:8ef6282d259210c7b1bb9b77378bdadb5be2c2d9,` | Heading/H1 | 32 | Bold |
| `h2` | `S:74dc0a1f31bd336417c4972180869b4e7ca94c5c,` | Heading/H2 | 24 | Bold |
| `h3` | `S:be36548b43b2ef4126b1f9f1e50c76af19bc56ce,` | Heading/H3 | 20 | SemiBold |
| `bodyLg` | `S:8b0c179ad5e26539781870124520b26191163fce,` | Body/Lg | 18 | Regular |
| `bodyMd` | `S:8220347d95980891a377f917e7a5708c4ce73717,` | Body/Md | 16 | Regular |
| `bodySm` | `S:5a240463293826280a22895dbdb5c78405d00fa8,` | Body/Sm | 14 | Regular |
| `labelMd` | `S:828b473e005bc8af46e82477366cdfac2d8d1350,` | Label/Md | 16 | Medium |
| `labelSm` | `S:40b02ede73c2ff8a920a662123904f7127253a6a,` | Label/Sm | 14 | SemiBold |
| `labelXs` | `S:5caeaf8e45da8d3c27d870950f2fd551cd16b9b9,` | Label/Xs | 12 | SemiBold |

---

## Design Tokens (Figma values)

### Colors
| Token | Hex |
|---|---|
| `brand-blue` | `#143AC3` |
| `brand-blue-dark` | `#2C3F85` |
| `brand-green` | `#0d9488` |
| `text-primary` | `#121219` |
| `text-secondary` | `#666689` |
| `text-muted` | `#9ca3af` |
| `border-default` | `#F0F0F7` |
| `border-subtle` | `#f3f4f6` |
| `surface-white` | `#ffffff` |
| `surface-header` | `#F9F9FB` |
| `primary-100` | `#F0F3FF` |
| `primary-200` | `#A5B8FC` |
| `primary-50` | `#F5F7FF` |
| `cta-gradient-start` | `#143AC3` |
| `cta-gradient-end` | `#5F50E5` |

### Typography
> Note: "Google Sans" is not available in Figma. Use **Inter** (Regular) and **Manrope** (Medium) as substitutes.

| Role | Family | Style | Size |
|---|---|---|---|
| Body | Inter | Regular | 14 |
| Label / Active | Manrope | Medium | 13 |
| Heading | Manrope | Medium | 16–24 |
| Small/Caption | Inter | Regular | 12 |

### Spacing (8px grid)
`8, 16, 24, 32, 40, 48, 56, 64`

### Border Radius
| Size | Value |
|---|---|
| sm | 4px |
| md | 8px |
| lg | 12px |
| full | 9999px |

---

## Components

> Each component lists its **Properties** (the independent variant dimensions) and the **total variant count** (product of all values). When building in Figma, iterate every combination, name each component `Property=Value, Property=Value, ...`, then call `figma.combineAsVariants(allVariants, page)`.

---

### Button

**Page:** `Buttons` (`2046:10`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| Type | Primary \| Secondary \| Ghost \| Destructive | 4 |
| Size | Sm \| Md \| Lg | 3 |
| State | Default \| Hover \| Active \| Focus \| Disabled | 5 |
| HasIcon | True \| False | 2 |

**Total variants: 4 × 3 × 5 × 2 = 120**

Example variant name: `Type=Primary, Size=Md, State=Default, HasIcon=False`

**Anatomy:** `[Icon?] [Label]` — horizontal auto-layout, centered

**Specs:**
| Size | Height | Padding H | Border Radius | Font size |
|---|---|---|---|---|
| Sm | 32px | 8px | 6px | 14px |
| Md | 40px | 16px | 8px | 14px |
| Lg | 48px | 24px | 8px | 16px |

**Colors per Type:**
| Type | Background | Text | Border |
|---|---|---|---|
| Primary | `#27B2B2` | `#ffffff` | none |
| Secondary | `#ffffff` | `#27B2B2` | `#A9E0E0` |
| Ghost | transparent | `#27B2B2` | none |
| Destructive | `#FEF2F2` | `#DC2626` | `#DC2626` |

**State overrides (Primary):** Hover `#1B7D7D` · Active `#104747` · Focus ring `3px #A9E0E0` · Disabled bg `#F3F4F6` text `#9CA3AF`

---

### Badge

**Page:** `Badge` (`2046:12`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| Intent | Danger \| Success \| Warning \| Info \| Brand \| Neutral | 6 |
| Style | Subtle \| Solid | 2 |
| Size | Sm \| Md | 2 |
| HasIcon | True \| False | 2 |
| HasDot | True \| False | 2 |

**Total variants: 6 × 2 × 2 × 2 × 2 = 96**

Example variant name: `Intent=Danger, Style=Subtle, Size=Md, HasIcon=True, HasDot=False`

**Anatomy:** `[Dot?] [Icon?] [Label]` — horizontal auto-layout

**Specs:**
| Size | Height | Padding H | Font size | Border radius |
|---|---|---|---|---|
| Sm | 20px | 8px | 12px | 9999px |
| Md | 24px | 10px | 13px | 9999px |

**Colors per Intent (Subtle style):**
| Intent | Background | Text | Border |
|---|---|---|---|
| Danger | `#FEE2E2` | `#991B1B` | `#FCA5A5` |
| Success | `#D1FAE5` | `#065F46` | `#6EE7B7` |
| Warning | `#FEF3C7` | `#92400E` | `#FCD34D` |
| Info | `#DBEAFE` | `#1E40AF` | `#93C5FD` |
| Brand | `#E9F7F7` | `#104747` | `#A9E0E0` |
| Neutral | `#F3F4F6` | `#374151` | `#E5E7EB` |

**Solid style:** filled background (intent color), white text, no border.

---

### Chip

**Page:** `Chip` (`2046:13`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| Size | Xs \| Md | 2 |
| State | Default \| Hover \| Selected \| Disabled | 4 |
| LeadingIcon | True \| False | 2 |
| TrailingIcon | True \| False | 2 |

**Total variants: 2 × 4 × 2 × 2 = 32**

Example variant name: `Size=Md, State=Default, LeadingIcon=True, TrailingIcon=False`

**Anatomy:** `[LeadingIcon?] [Label] [TrailingIcon?]` — horizontal auto-layout

**Specs:**
| Size | Height | Padding H | Gap | Border Radius | Font size |
|---|---|---|---|---|---|
| Xs | 24px | 8px | 4px | 6px | 12px |
| Md | 32px | 12px | 6px | 8px | 14px |

**Colors per State:**
| State | Background | Text | Border |
|---|---|---|---|
| Default | `#ffffff` | `#121219` | `#F0F0F7` |
| Hover | `#F5F5F5` | `#121219` | `#D7DDE0` |
| Selected | `#27B2B2` | `#ffffff` | `#A9E0E0` |
| Disabled | `#F9FAFB` | `#9CA3AF` | `#E5E7EB` |

---

### Input Field

**Page:** `Input Field` (`2047:2`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| State | Default \| Focus \| Filled \| Error \| Disabled | 5 |
| LeadingIcon | True \| False | 2 |
| TrailingIcon | True \| False | 2 |

**Total variants: 5 × 2 × 2 = 20**

Example variant name: `State=Focus, LeadingIcon=True, TrailingIcon=False`

**Anatomy:** `[LeadingIcon?] [Placeholder/Value] [TrailingIcon?]` — horizontal auto-layout

**Specs:**
| Property | Value |
|---|---|
| Height | 40px |
| Padding H | 12px |
| Gap | 8px |
| Border radius | 8px |
| Border width | 1px |

**Colors per State:**
| State | Background | Border | Text |
|---|---|---|---|
| Default | `#ffffff` | `#F0F0F7` | `#121219` |
| Focus | `#ffffff` | `#143AC3` | `#121219` |
| Filled | `#ffffff` | `#F0F0F7` | `#121219` |
| Error | `#ffffff` | `#DC2626` | `#121219` |
| Disabled | `#F9FAFB` | `#F0F0F7` | `#9CA3AF` |

---

### Avatar

**Page:** `Avatar` (`2146:2`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| Size | Xs \| Sm \| Md \| Lg \| Xl | 5 |
| Type | Initials \| Image \| Icon | 3 |

**Total variants: 5 × 3 = 15**

Example variant name: `Size=Md, Type=Initials`

**Specs:**
| Size | Diameter | Font size |
|---|---|---|
| Xs | 24px | 10px |
| Sm | 32px | 12px |
| Md | 40px | 14px |
| Lg | 48px | 16px |
| Xl | 64px | 20px |

Background: `#0d9488` · Text: `#ffffff` · Shape: circle (radius `rFull`)

---

### Alert

**Page:** `Alerts` (`2046:14`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| Intent | Info \| Success \| Warning \| Danger | 4 |
| Dismissible | True \| False | 2 |

**Total variants: 4 × 2 = 8**

Example variant name: `Intent=Warning, Dismissible=True`

**Anatomy:** `[Icon] [Title + Description] [CloseButton?]` — horizontal auto-layout

**Specs:**
| Property | Value |
|---|---|
| Padding | 16px |
| Gap | 12px |
| Border radius | 8px |
| Left accent border | 4px |

**Colors per Intent:**
| Intent | Background | Border | Icon & Title |
|---|---|---|---|
| Info | `#DBEAFE` | `#93C5FD` | `#1D4ED8` |
| Success | `#D1FAE5` | `#6EE7B7` | `#059669` |
| Warning | `#FEF3C7` | `#FCD34D` | `#D97706` |
| Danger | `#FEE2E2` | `#FCA5A5` | `#DC2626` |

---

### Breadcrumbs

**Page:** `Breadcrumbs` (`2316:2`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| Length | 2-items \| 3-items \| 4-items | 3 |

**Total variants: 3**

Example variant name: `Length=3-items`

**Anatomy:** `[Item] / [Item] / [ActiveItem]` — horizontal auto-layout

**Specs:**
| Property | Value |
|---|---|
| Height | 24px |
| Gap | 4px |
| Inactive font | Manrope Regular 13px `#666689` underline |
| Active font | Manrope SemiBold 13px `#121219` no underline |
| Separator | `/` `#9CA3AF` |

---

### Dropdown

**Page:** `Dropdown` (`2108:2`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| State | Default \| Open \| Selected \| Disabled | 4 |
| HasLeadingIcon | True \| False | 2 |

**Total variants: 4 × 2 = 8**

Example variant name: `State=Open, HasLeadingIcon=False`

**Anatomy (trigger):** `[LeadingIcon?] [Label/Value] [ChevronDown]` — horizontal auto-layout, space-between

**Specs:** Height 40px · Padding H 12px · Border radius 8px · Border 1px `#F0F0F7`

**Menu item specs:** Height 36px · Padding H 12px · Hover bg `#F0F3FF` · Selected text `#143AC3`

---

### Text Area

**Page:** `Text Area` (`2139:2`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| State | Default \| Focus \| Filled \| Error \| Disabled | 5 |

**Total variants: 5**

Example variant name: `State=Error`

**Anatomy:** `[Placeholder/Value]` — vertical auto-layout, resizable

**Specs:** Min height 80px · Padding 12px · Border radius 8px · Border 1px. Colors same as Input Field per state.

---

### Search & Select

**Page:** `Search & Select` (`2126:2`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| State | Default \| Searching \| Results \| Selected \| Empty | 5 |

**Total variants: 5**

Example variant name: `State=Results`

**Anatomy:** `[SearchIcon] [Input] [ClearButton?]` + `[Dropdown panel]`

**Specs:** Input trigger same as Input Field. Dropdown panel same as Dropdown menu specs.

---

### Navigation

**Page:** `Navigation` (`2046:15`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| State | Default \| Hover \| Active | 3 |
| HasIcon | True \| False | 2 |

**Total variants: 3 × 2 = 6**

Example variant name: `State=Active, HasIcon=True`

**Anatomy:** `[Icon?] [Label]` — horizontal auto-layout

**Specs:** Height 40px · Padding H 16px · Gap 12px · Border radius 8px

**Colors:**
| State | Background | Text |
|---|---|---|
| Default | transparent | `#666689` |
| Hover | `#F0F3FF` | `#143AC3` |
| Active | `#F0F3FF` | `#143AC3` |

---

### Card

**Page:** `Cards` (`2046:16`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| Type | Default \| Hoverable \| Selected | 3 |
| HasHeader | True \| False | 2 |
| HasFooter | True \| False | 2 |

**Total variants: 3 × 2 × 2 = 12**

Example variant name: `Type=Default, HasHeader=True, HasFooter=False`

**Specs:** Padding 24px · Border radius 12px · Border 1px `#F0F0F7` · Background `#ffffff`
Shadow (Hoverable/Selected): `0 4px 16px rgba(0,0,0,0.08)`

---

### Datepicker

**Page:** `Datepicker` (`2228:2`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| State | Closed \| Open | 2 |

**Total variants: 2**

Example variant name: `State=Open`

**Anatomy:** Input trigger + Calendar panel (shown when State=Open)

**Calendar panel specs:** Width 280px · Padding 16px · Border radius 12px · Day cell 32px · Selected day bg `#143AC3`

---

### Timepicker

**Page:** `Timepicker` (`2228:69`)

**Properties:**
| Property | Values | Count |
|---|---|---|
| State | Default \| Open | 2 |

**Total variants: 2**

Example variant name: `State=Open`

**Anatomy:** Input trigger + dropdown list of time slots (30-min increments). Specs same as Dropdown.
