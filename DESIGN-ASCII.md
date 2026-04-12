# Design System Inspired by Carles Faus

## 1. Visual Theme & Atmosphere

Carles Faus's portfolio embodies **architectural minimalism merged with Swiss typographic tradition** — a site that reads like a printed monograph published as a website. Every element is stripped to its structural essence. No decoration, no ornament, no warmth. The aesthetic is cold precision: all-uppercase thin-weight geometric sans-serif type, pure black-on-white (or white-on-black via blend modes), and zero rounded corners anywhere. This is typography as architecture — the grid is the design.

The most distinctive quality is the **viewport-proportional sizing system**. Every dimension — font sizes, spacing, gutters — is defined in `vw` units, making the entire site scale as a single proportional system. At any viewport width, every ratio stays locked. The result feels like a PDF or printed page that happens to be interactive: precise, measured, engineered.

Photography provides all color. The UI itself is strictly monochromatic. Decorative brackets `[ ]` around labels reference architectural notation — a subtle identity detail that signals the designer's discipline without shouting it.

**Key Characteristics:**
- Pure black-and-white UI with photography providing all color
- All-uppercase text throughout the entire site — no exceptions
- Thin-weight (100-400) geometric sans-serif — the opposite of bold/heavy
- Zero border-radius anywhere — every edge is sharp and angular
- Zero box-shadows — depth is created through layering and opacity, never shadow
- Zero gradients — every surface is a solid color or transparency
- Viewport-proportional sizing (`vw` units) for fluid scaling
- Bracket notation `[ ]` around UI labels as an identity detail
- Tight line-heights (1.0-1.1) for compressed, architectural headlines
- Mix-blend-mode `exclusion` for navigation that auto-inverts over any background

## 2. Color Palette & Roles

### Primary
- **Black** (`#000000`): Primary text, structural elements, borders
- **White** (`#ffffff`): Primary background, inverse text on dark surfaces

### Surfaces
- **Warm Black** (`#161310`): Dark overlays, selection background — slightly brown-tinted for subtle warmth
- **Off-White** (`#ecebeb`): Selection text, soft contrast on dark surfaces
- **Near-White** (`#fffffffc`, `#fffffff3`): Semi-transparent white layers for subtle depth separation

### Neutral
- **Light Gray** (`#d4d4d4`): Borders, dividers, structural lines
- **Transparent** (`#0000`): Fade-out states, hidden elements

### Accent (use sparingly)
- **Soft Red** (`#f006`): Error states only — 40% opacity red
- **Soft Pink** (`#ffc7c7`): Highlight/selection — barely visible warmth

### Gradient System
- **None.** Every surface is a flat solid color or a transparency. No gradients exist anywhere in the system — not on backgrounds, not on overlays, not on hover states. Depth is communicated through opacity layering and mix-blend-modes.

## 3. Typography Rules

### Font Family
- **All text**: A single geometric sans-serif. Carles Faus uses a custom proprietary face (`sm`). For implementation, use **Inter Tight** or **DM Sans** at thin/light weights as the closest available substitute. The character should be geometric, wide-proportioned, and clean at small sizes in uppercase.
- Fallbacks: `system-ui, -apple-system, Helvetica Neue, Arial, sans-serif`

### Global Rule
- `text-transform: uppercase` is applied **globally**. Every piece of text on the site renders in all caps — headings, body, labels, navigation, footer. No exceptions.

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Display / Hero | 1.8vw (~26px at 1440) | 100-200 | 1.0 | 0.05em | Maximum architectural presence, whisper-thin |
| Section Heading | 1.25vw (~18px at 1440) | 100-200 | 1.05 | 0.05em | Section anchors, same thin weight |
| Body / Content | 0.83vw (~12px at 1440) | 400 | 1.4 | 0.04em | Standard reading text, still uppercase |
| Label / Meta | 0.69vw (~10px at 1440) | 400 | 1.3 | 0.06em | Metadata, dates, categories |
| Micro / Legal | 0.56vw (~8px at 1440) | 400 | 1.5 | 0.08em | Fine print, technical details |

### Principles
- **Thin, not bold**: Headlines use weight 100-200 (ultralight/thin). This is the opposite of Uber's bold approach. Authority comes from scale and uppercase, not weight.
- **Uppercase everything**: The entire site is uppercase. This creates a uniform texture and architectural quality. Case variation is never used for hierarchy — size and weight do that job.
- **Wide letter-spacing**: All text has positive letter-spacing (0.04-0.08em) to open up the uppercase characters. Tighter at larger sizes, wider at smaller sizes.
- **Viewport-proportional sizing**: Font sizes use `vw` units, not `px` or `rem`. This means typography scales proportionally with the viewport — no breakpoint-based font size changes needed.
- **One font, weight-varied**: A single typeface family handles everything. Hierarchy is created through size and weight variation, not font-family changes.

## 4. Component Stylings

### Buttons
- Background: `#000000` or `transparent`
- Text: `#ffffff` (on black) or `#000000` (on transparent)
- Padding: `0.69vw 1.39vw` (proportional)
- **Border-radius: 0** — sharp rectangular edges, never rounded
- Border: 1px solid `#000000` for ghost/outline variant
- Hover: background inverts (black → white, white → black) or opacity shift
- Text-transform: uppercase (inherited from global)

### Cards & Containers
- Background: `#ffffff` or `transparent`
- **Border-radius: 0** — no rounding anywhere
- **No box-shadow** — depth comes from border or background contrast
- Border: 1px solid `#d4d4d4` when structural separation is needed
- Cards are defined by content grouping and whitespace, not by visual containers

### Labels with Bracket Notation
- Format: `[ LABEL TEXT ]`
- Implemented via CSS pseudo-elements `::before` content `"[ "` and `::after` content `" ]"`
- Font: same as label text, same weight
- This is the signature identity detail — use on section labels, categories, and metadata tags

### Navigation
- Fixed position, high z-index
- `mix-blend-mode: exclusion` — text automatically inverts against any background (white text turns black over white images, stays white over dark)
- All-uppercase, thin-weight, wide-tracked
- No background — fully transparent, reads over content
- No hamburger on mobile — links are visible and compact at all sizes

### Image Treatment
- Full-bleed with no border-radius — sharp rectangular edges
- No overlays, no color filters, no shadows on images
- Fade masks at edges: `mask-image: linear-gradient(90deg, transparent, black 10% 90%, transparent)` for carousel/horizontal scroll contexts
- Photography is the only source of color in the entire system

### Dividers & Borders
- Always 1px solid `#d4d4d4` (light gray) or `#000000` (black)
- Used as structural elements, not decoration
- Full-width or inset — both are valid depending on context
- No dashed, dotted, or decorative border styles

## 5. Layout Principles

### Spacing System (viewport-proportional)
| Token | Value | ~px at 1440 | Use |
|-------|-------|-------------|-----|
| `--space-xs` | 0.14vw | ~2px | Hairline gaps |
| `--space-sm` | 0.69vw | ~10px | Tight internal spacing |
| `--space-md` | 2.08vw | ~30px | Standard section padding |
| `--space-lg` | 4.17vw | ~60px | Major section gaps |
| `--space-xl` | 6.25vw | ~90px | Hero/feature spacing |
| `--space-2xl` | 8.33vw | ~120px | Maximum breathing room |

### Grid
- 3-column grid for project listings: `grid-template-columns: repeat(3, 1fr)`
- Asymmetric column widths for content sections: e.g., `55vw`, `48vw`, `37.5vw`
- No single max-width container — different sections use different widths for visual rhythm
- Grid gaps use `vw` units to maintain proportional relationships

### Whitespace Philosophy
- **Generous and deliberate**: Unlike Uber's compact density, this system uses large amounts of negative space as a design element. Whitespace is not empty — it's the structure.
- **Asymmetric margins**: Content is not always centered. Sections may use different left/right margins for visual tension.
- **Vertical breathing**: Major sections have `6-8vw` of vertical padding — significantly more than a typical portfolio.

### Border Radius Scale
- **0px for everything**. No exceptions. No rounded corners on any element — buttons, cards, images, inputs, containers. The sharp angular quality is a core identity element. This is non-negotiable.

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, solid background | Everything — this is the default and only level |
| Overlay | `backdrop-filter: blur(30px)` + semi-transparent bg | Navigation panels, modal overlays |
| Blend | `mix-blend-mode: exclusion` or `difference` | Navigation text, cursor effects |

**Shadow Philosophy**: There are no shadows in this system. None. Zero. Depth is communicated through:
1. **Background contrast** (white section → black section)
2. **Opacity layering** (semi-transparent whites stacked)
3. **Mix-blend-modes** (exclusion, difference)
4. **Backdrop blur** for overlays only

## 7. Motion & Animation

### Principles
- Motion is **precise and mechanical**, not organic or springy
- No easing bounces, no elastic curves, no playful timing
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` — a clean, linear-feeling ease-out
- Duration: 300-500ms for most transitions, 500ms for page transitions

### Animation Types
| Type | Description | Use |
|------|-------------|-----|
| Text scramble | Characters cycle through random glyphs before resolving to final text | Page load, navigation transitions |
| Progressive reveal | Width-based mask reveals text character by character | Section entrances |
| Slide | `translate3d()` transforms | Page transitions, panel open/close |
| Fade | Opacity 0 → 1 | General entrance animations |
| Stagger | `transition-delay: calc(var(--i) * 25ms)` | Sequential element reveals in lists/grids |

### What NOT to animate
- No parallax scrolling
- No hover scale transforms
- No floating/bouncing elements
- No gradient animations
- No color transitions on backgrounds

## 8. Do's and Don'ts

### Do
- Use `text-transform: uppercase` on everything — the all-caps treatment is the entire identity
- Use thin font weights (100-200) for headlines — authority through scale, not weight
- Use `vw` units for sizing when possible — the proportional system is core to the aesthetic
- Keep border-radius at 0 everywhere — sharp edges are non-negotiable
- Use `mix-blend-mode: exclusion` for navigation — it handles dark/light backgrounds automatically
- Let photography provide all color — the UI is strictly black and white
- Use bracket notation `[ ]` for labels — it's the signature detail
- Apply wide letter-spacing (0.04-0.08em) to all uppercase text
- Use 1px borders in light gray (`#d4d4d4`) for structural separation
- Create depth through opacity and blend modes, never shadows

### Don't
- Don't use bold weights (600-900) for headlines — this system whispers, it doesn't shout
- Don't introduce any border-radius — not 4px, not 8px, not 999px. Zero.
- Don't use box-shadows anywhere — elevation is not part of this visual language
- Don't use gradients of any kind — every surface is a flat solid
- Don't use sentence case or title case — everything is uppercase
- Don't add color to UI elements — no accent colors, no colored buttons, no tinted backgrounds
- Don't use bouncy or elastic animations — motion is mechanical and precise
- Don't round images — photographs have sharp rectangular edges
- Don't use decorative elements — no icons, no illustrations, no ornamental dividers
- Don't create warm, friendly, or approachable moments — this aesthetic is cold, precise, and architectural

## 9. Adaptation Notes for Portfolio

### What to adapt (not copy literally)
- **Font**: Use Inter Tight (thin/light weights) instead of the proprietary `sm` font
- **Sizing**: Use a hybrid `clamp()` approach instead of pure `vw` — e.g., `clamp(10px, 0.83vw, 14px)` — to maintain readability on very small/large screens
- **Content density**: A portfolio needs more readable body text than an architecture presskit. Keep uppercase for labels and headings but consider sentence case for long body paragraphs in case studies
- **Mobile**: Pure `vw` sizing breaks on mobile. Use `clamp()` with sensible minimums
- **Bracket notation**: Use on section labels (e.g., `[ THE PROBLEM ]`, `[ APPROACH ]`, `[ OUTCOME ]`) but not on every text element

### What to keep exactly
- Zero border-radius
- Zero shadows
- Zero gradients
- Black and white only
- Sharp, angular, architectural
- Photography as the only color source
- Thin-weight headlines
- Wide letter-spacing on uppercase text
- 1px structural borders
