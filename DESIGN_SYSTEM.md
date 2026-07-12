# Taste & Tales — Design System

> This is the canonical design reference for all UI development. Every visual decision must trace back to this document. No hardcoded hex values, no default Tailwind colors.

---

## Brand Identity

**Brand:** Taste & Tales  
**Tagline:** Sips. Bites. Memories.  
**Voice:** Warm, personal, heritage-forward. Never generic. Never transactional.  
**Mood reference:** Apple (restraint, whitespace, motion) × Paper Boat (nostalgia storytelling) × FabIndia (heritage/craft) × Aesop (editorial minimalism)

---

## Color Palette

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `ivory` | `#FAF7F2` | `bg-ivory`, `text-ivory` | Primary background, reversed text |
| `beige` | `#F2E8DA` | `bg-beige`, `text-beige` | Section alt background |
| `olive` | `#3F4A22` | `bg-olive`, `text-olive` | Primary brand, CTA button bg, footer |
| `gold` | `#C9A66B` | `bg-gold`, `text-gold` | Accents, dividers, price highlights, badges |
| `brown` | `#6D4C41` | `bg-brown`, `text-brown` | Secondary text on light, borders |
| `espresso` | `#2A1E17` | `bg-espresso`, `text-espresso` | Headline text, dark mode base |
| `gray` | `#555555` | `bg-gray`, `text-gray` | Body copy |
| `sand` | `#E5D8C8` | `bg-sand`, `text-sand` | Cards, input backgrounds |
| `sage` | `#7C8F5A` | `bg-sage`, `text-sage` | Success states, eco/sustainable tags |

### Background Section Rhythm
Alternate between these backgrounds across page sections:
```
Section 1 → bg-ivory
Section 2 → bg-beige
Section 3 → bg-ivory
Section 4 → bg-olive (full-bleed dark band)
Section 5 → bg-ivory
```

### WCAG Contrast Check
| Text | Background | Ratio | Status |
|---|---|---|---|
| `espresso` on `ivory` | #2A1E17 on #FAF7F2 | 14.8:1 | ✅ AAA |
| `gray` on `ivory` | #555555 on #FAF7F2 | 5.8:1 | ✅ AA |
| `brown` on `ivory` | #6D4C41 on #FAF7F2 | 6.2:1 | ✅ AA |
| `ivory` on `olive` | #FAF7F2 on #3F4A22 | 9.1:1 | ✅ AAA |
| `gold` on `espresso` | #C9A66B on #2A1E17 | 6.4:1 | ✅ AA |
| `gray` on `beige` | #555555 on #F2E8DA | 5.1:1 | ✅ AA |

---

## Typography

### Fonts
- **Display / Headings:** Fraunces (variable, optical size axis) — serif with expressive weight range. Loaded via `next/font/google`.
- **Body / UI:** Manrope (variable, 200–800) — humanist sans, clean and warm.

### Type Scale
| Name | Size | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|
| `display-2xl` | 4.5rem / 72px | 1.1 | -0.02em | Hero headlines |
| `display-xl` | 3.75rem / 60px | 1.1 | -0.02em | Page titles |
| `display-lg` | 3rem / 48px | 1.15 | -0.02em | Section headings |
| `display-md` | 2.25rem / 36px | 1.2 | -0.015em | Card/sub-section headings |
| `display-sm` | 1.875rem / 30px | 1.25 | -0.01em | Smaller headings |
| `display-xs` | 1.5rem / 24px | 1.3 | -0.01em | Component headings |
| `body-xl` | 1.25rem / 20px | 1.75 | — | Lead paragraph |
| `body-lg` | 1.125rem / 18px | 1.75 | — | Subtext, captions |
| `body-md` | 1rem / 16px | 1.7 | — | Default body |
| `body-sm` | 0.875rem / 14px | 1.6 | — | Small copy, meta |
| `body-xs` | 0.75rem / 12px | 1.6 | — | Fine print |
| `label-lg` | 0.9375rem / 15px | 1.5 | 0.06em | Buttons, nav |
| `label-md` | 0.8125rem / 13px | 1.5 | 0.06em | Chips, tags |
| `label-sm` | 0.6875rem / 11px | 1.4 | 0.08em | Overlines, micro-labels |

### Usage Rules
- **H1:** `font-display text-display-xl lg:text-display-2xl text-espresso` — one per page.
- **H2:** `font-display text-display-lg text-espresso`
- **H3:** `font-display text-display-md text-espresso`
- **H4+:** `font-display text-display-xs text-espresso`
- **Body:** `font-sans text-body-md text-gray`
- **Overlines** (above headings): `font-sans text-label-sm text-gold uppercase tracking-widest`

---

## Spacing Scale

Based on Tailwind default (4px base unit) with brand extensions for generous section padding.

| Section padding (desktop) | `py-24 lg:py-32` |
| Section padding (mobile) | `py-16` |
| Container max-width | `max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10` |
| Card padding | `p-6` |
| Component gap | `gap-4 sm:gap-6 lg:gap-8` |

---

## Buttons

### Primary CTA
```html
bg-olive text-ivory rounded-full px-6 py-3
font-sans font-semibold text-label-lg
shadow-button border border-transparent
hover: border-gold shadow-olive scale-1.03 (Framer Motion)
focus-visible: ring-2 ring-gold ring-offset-2
```
**Copy tone:** "Shop Sweets" not "Buy Now". "Explore Gifts" not "View Products".

### Secondary CTA
```html
bg-transparent text-brown border border-brown rounded-full px-6 py-3
font-sans font-semibold text-label-lg
hover: border-gold text-gold
```

### Ghost / Icon Button
```html
bg-transparent text-espresso p-2 rounded-full
hover: bg-sand
```

---

## Cards

### Product Card
```
bg-sand rounded-2xl overflow-hidden
shadow-card → hover: shadow-card-hover -translate-y-0.5
Image ratio: aspect-[4/3] or aspect-square
Padding: p-4 (image metadata area)
Price: text-display-xs font-display text-espresso
Compare price: line-through text-brown/60 text-body-sm
```

### Blog Card
```
bg-ivory border border-sand rounded-2xl overflow-hidden
Image: aspect-video
Padding: p-5
Category chip: bg-gold/10 text-gold text-label-md
```

---

## Trust Chips

Persistent brand badge pattern. Use in Hero, PDP, Footer.

```html
<!-- Dark variant (on ivory/beige backgrounds) -->
<span class="trust-chip">
  <LeafIcon size={12} />
  No Preservatives
</span>

<!-- Light variant (on olive backgrounds) -->
bg-ivory/10 text-ivory border border-ivory/20
```

**Four canonical chips:**
1. 🌿 No Preservatives
2. 🎨 No Artificial Colours
3. ⚡ No Shortcuts
4. 🌾 Just Honest Ingredients

---

## Feature Strip

Full-bleed dark olive band (`bg-olive`). 4 icons across on desktop, 2×2 grid on mobile.

**Four items:**
1. 🌾 Wholesome Ingredients
2. 📜 Traditional Recipes
3. 🎁 Thoughtful Gifting
4. 🌿 Sustainable Choices

Each item: `flex flex-col items-center gap-2 text-center` — icon in `text-gold`, label in `text-ivory font-sans font-semibold text-label-lg`

---

## Ornamental Divider

Thin gold rule with center glyph.
```html
<div class="divider-gold">
  <span>✦</span>
</div>
```
CSS: `::before` and `::after` are `flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #C9A66B, transparent)`

---

## Motion Language

All animations defined in `/lib/motion.js`.

| Use case | Variant | Duration |
|---|---|---|
| Scroll-into-view | `fadeUp` | 550ms ease-out |
| Stagger children | `stagger()` + `staggerItem` | 120ms between |
| Hero image | `heroImage` | 1100ms + 150ms delay |
| Modals / Drawers | `slideUp` / `slideFromRight` | 400–450ms expo |
| Badges / chips | `scalePop` | 350ms expo |
| Button hover | `whileHover={{ scale: 1.03 }}` | 200ms |
| Card hover | `whileHover={{ y: -4 }}` | 300ms |
| Page transitions | `fadeIn` | 450ms |

**Easing:** `[0.25, 0.46, 0.45, 0.94]` (ease-brand) for most. `[0.16, 1, 0.3, 1]` (ease-out-expo) for entrances.

**Rules:**
- No spring animations on content — too playful.
- Viewport-triggered animations use `once: true` — never loops.
- Reduced-motion users must get instant transitions (`@media (prefers-reduced-motion: reduce)`).

---

## Photography Treatment

- **Style:** Warm, top-down and 45°-angle shots
- **Backgrounds:** Brass trays, marble surfaces, olive-cloth, woven jute
- **Lighting:** Soft, natural, golden-hour warmth
- **Negative space:** Generous — product never touches container edges
- **Color treatment:** Warm (+10 temp, +5 tint, -5 highlights)
- **Format:** WebP primary, AVIF fallback via `next/image`

---

## Accessibility

- **Focus states:** `focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2` — never hidden
- **Alt text:** Every `<Image />` must have meaningful `alt` — not "product image"
- **ARIA:** `aria-live="polite"` on cart count, toast announcements
- **Skip links:** `<a href="#main-content">Skip to content</a>` in header
- **Keyboard nav:** All interactive elements reachable via Tab, activated via Enter/Space
- **Heading hierarchy:** Single `<h1>` per page, proper `h2 → h3 → h4` nesting

---

## Microcopy Guide

Replace every generic e-commerce label with a warm equivalent:

| Generic | Brand voice |
|---|---|
| "Add to Cart" | "Add to Box" |
| "Buy Now" | "Take This Home" |
| "Out of Stock" | "Taking a rest — check back soon" |
| "Order Confirmed" | "It's on its way to you 🎁" |
| "Empty Cart" | "Your box is waiting to be filled." |
| "No results found" | "We couldn't find that. Try something like 'millet' or 'ladoo'?" |
| "Subscribe" | "Join the story" |
| "Loading..." | "Just a moment…" |
| "Error" | "Something went quiet. Try again?" |
