# Chiang Mai Craft House — Design System

> Kinfolk-inspired design for a handwoven rattan & bamboo lamp brand based in Chiang Mai, Thailand.
> Aesthetic direction: slow living, editorial, artisan warmth. Never trendy. Never loud.

---

## 1. Brand Personality

| Axis | Direction |
|------|-----------|
| Tone | Quiet, warm, considered |
| Pace | Slow — never rushed |
| Feel | Editorial magazine meets village workshop |
| Avoid | Flashy, playful, corporate, neon, busy |

**Reference:** Kinfolk magazine, Muji catalogue, Norm Architects

---

## 2. Color Palette

All colors are warm-neutral. No pure whites, no cool grays, no saturated hues.

### Base Colors

| Name | Token | Hex | Usage |
|------|-------|-----|-------|
| Cream 50 | `cream-50` | `#faf8f4` | Page background |
| Cream 100 | `cream-100` | `#f2ede5` | Section alternating bg |
| Cream 200 | `cream-200` | `#e8e0d4` | Hero bg, editorial sections |
| Cream 300 | `cream-300` | `#d9cfc2` | Grid dividers, borders |
| Cream 400 | `cream-400` | `#c9bba8` | Product image backgrounds |

### Earth Tones

| Name | Token | Hex | Usage |
|------|-------|-----|-------|
| Earth 100 | `earth-100` | `#c4a882` | Lamp body color, accents |
| Earth 200 | `earth-200` | `#b09070` | Secondary accents |
| Earth 300 | `earth-300` | `#9c8070` | Decorative elements |
| Earth 400 | `earth-400` | `#8a7060` | Icons, weave lines, muted text |
| Earth 500 | `earth-500` | `#6b5c4e` | Body text, descriptions |
| Earth 600 | `earth-600` | `#4a3c30` | Medium-weight text |
| Earth 700 | `earth-700` | `#2c2420` | Primary text, logo, dark buttons |
| Earth 800 | `earth-800` | `#1e1612` | Dark section background |

### Accent

| Name | Hex | Usage |
|------|-----|-------|
| Warm gold | `#f5e0a0` | Lamp glow effect only (low opacity) |
| Border default | `#d9cfc2` | All borders (cream-300) |
| Border hover | `#8a7060` | Interactive border states |

### Do / Don't

- **Do:** Use cream and earth tones exclusively
- **Don't:** Use pure white (`#ffffff`), cool gray, blue, or any saturated color
- **Don't:** Use opacity tricks to create "white" — use cream-50 instead

---

## 3. Typography

### Font Stack

```css
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap');
```

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Heading | Lora (serif) | 400, 500, italic | All headings, logo, pull quotes |
| Body | Raleway (sans) | 300 (light), 400, 500 | Body text, nav, labels, captions |
| Fallback serif | Georgia, serif | — | — |
| Fallback sans | system-ui, sans-serif | — | — |

### Type Scale

| Element | Size | Weight | Family | Letter-spacing |
|---------|------|--------|--------|----------------|
| Eyebrow label | 10px | 400 | Raleway | `0.25em` (widest) |
| Caption | 11px | 400–500 | Raleway | `0.18em` |
| Body small | 13px | 300 | Raleway | normal |
| Body | 14px | 300–400 | Raleway | normal |
| Nav links | 11px | 400 | Raleway | `0.18em` |
| Product name | 18–20px | 400 | Lora | normal |
| H3 | 22–24px | 400 | Lora | normal |
| H2 | 30–40px | 400 | Lora | normal |
| H1 | 48–72px | 400 | Lora | tight (`-0.01em`) |
| Pull quote | 18–22px | 400 italic | Lora | normal |

### Typography Rules

- **Never use font-weight 700 or bold** — Raleway 500 is the maximum weight for sans
- Lora italic is a feature, not decoration — use it for emotional emphasis in headings
- Eyebrow labels are ALWAYS: `10px / Raleway / uppercase / tracking-widest / earth-400`
- Line height for body text: `1.8–2.0`
- Line height for headings: `1.1–1.3`
- Max line length: `60ch` (prose sections)

---

## 4. Spacing

Base unit: `4px`. All spacing in multiples of 4.

| Token | Value | Common use |
|-------|-------|------------|
| xs | 4px | Icon gaps |
| sm | 8px | Internal component gaps |
| md | 16px | Card padding (compact) |
| lg | 24px | Card padding (standard) |
| xl | 32px | Section internal gaps |
| 2xl | 48px | Between components |
| 3xl | 64px | Section top/bottom padding (mobile) |
| 4xl | 80–96px | Section top/bottom padding (desktop) |

---

## 5. Layout

### Grid

- Max content width: `1280px` (`max-w-7xl`)
- Horizontal padding: `24px` mobile → `48px` md → `96px` lg
- Product grid: 1 col mobile / 2 col sm / 3 col lg, separated by `1px bg-cream-300` gaps (not gutter gaps)
- Split sections (hero, craft story): `md:grid-cols-2` with no gap — panels bleed edge to edge

### Section Backgrounds (alternating rhythm)

```
Hero:         cream-200 | cream-400
Band:         earth-700
Collection:   cream-50
Editorial:    cream-200
Craft Story:  cream-400 | cream-100
Testimonials: cream-50
About:        earth-800
Visit:        cream-100
Footer:       earth-800
```

The warm-cool rhythm of cream shades creates visual breathing without needing borders.

---

## 6. Components

### Buttons

One style only — outline button. No filled primary button (except dark sections).

```css
/* Standard outline */
display: inline-block;
padding: 12px 32px;
border: 1px solid #2c2420;
font: 500 11px/1 'Raleway', sans-serif;
letter-spacing: 0.18em;
text-transform: uppercase;
color: #2c2420;
background: transparent;
transition: background 0.3s ease, color 0.3s ease;
cursor: pointer;

/* Hover */
background: #2c2420;
color: #faf8f4;
```

**Variants:**

| Variant | Border | Text | Hover bg |
|---------|--------|------|----------|
| Default (light section) | `earth-700` | `earth-700` | `earth-700` → text cream-50 |
| Muted | `earth-400` | `earth-500` | `earth-500` → text cream-50 |
| On dark section | `cream-300` | `cream-200` | `cream-200` → text earth-800 |

**Never:** filled buttons, rounded buttons, gradient buttons, colored buttons

### Eyebrow Label

```html
<p class="font-sans text-[10px] tracking-widest uppercase text-earth-400">Label text</p>
```

Always precedes headings. Always earth-400. Always uppercase + tracking-widest.

### Product Card

- No border-radius (sharp corners)
- `1px solid cream-300` divider via parent grid background (not individual borders)
- Image area: fixed height `288px` with appropriate cream background
- Info area: `24px` padding
- Hover: `translateY(-4px)` with `transition: 0.4s ease`
- Image hover: `filter: brightness(1.03)`

### Blockquote / Pull Quote

```html
<blockquote class="border-l-2 border-earth-300 pl-6">
  <p class="font-serif italic text-lg leading-relaxed text-earth-600">...</p>
  <footer class="font-sans text-[10px] tracking-widest uppercase text-earth-400 mt-3">— Name, Role</footer>
</blockquote>
```

Border: `2px solid earth-300` (left only, no radius)

### Section Divider

```html
<div class="w-8 h-px bg-earth-400"></div>
```

Used before subsection headings in editorial sections.

### Navigation

- Fixed top, `backdrop-blur-sm bg-cream-50/90`
- Height: `64px`
- Logo: Lora serif, `text-base`, earth-700
- Nav links: Raleway 11px, tracking-widest, uppercase, earth-500 → earth-700 on hover
- Underline hover: CSS `::after` pseudo-element, `width: 0 → 100%` on hover
- Icons: custom SVG, `18px`, earth-500 → earth-700

---

## 7. Illustration Style (SVG Lamps)

All product illustrations are hand-drawn SVG — no photos in the current version.

### Lamp Construction Rules

| Element | Stroke color | Fill color | Opacity |
|---------|-------------|------------|---------|
| Cord | `#8a7060` | — | 1.0 |
| Cap/ring | `#7a6050` | `#8a7060` | 0.7–0.8 |
| Shade body | — | `#c4a882` | 0.85–0.9 |
| Horizontal weave lines | `#9c7e60` | — | 0.6–0.7 |
| Vertical weave lines | `#9c7e60` | — | 0.4–0.5 |
| Bottom rim | `#b09070` | `#b09070` | 0.5–0.6 |
| Inner glow | — | `#f5e0a0` | 0.20–0.25 |
| Light cone below | — | `#f5e0a0` | 0.08–0.12 |

Stroke widths: cord `1.5–2px`, weave `0.6–0.8px`, rim `0.9–1px`

### Animation

Hero lamp: `animation: sway 6s ease-in-out infinite` — rotate `-1deg` to `1deg`, origin `top center`

Always wrap with:
```css
@media (prefers-reduced-motion: reduce) {
  .lamp-sway { animation: none; }
}
```

---

## 8. Interactions & Animation

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Button hover | background, color | 300ms | ease |
| Nav link underline | width | 300ms | ease |
| Product card hover | transform translateY | 400ms | ease |
| Product image hover | filter brightness | 400ms | ease |
| Scroll fade-in | opacity + translateY | 700ms | ease |
| Mobile menu open/close | max-height + opacity | 400ms | ease |
| Lamp sway | rotate | 6000ms | ease-in-out |

**Scroll fade-in pattern:**
```css
.fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }
```
Triggered by `IntersectionObserver` at `threshold: 0.12`.

---

## 9. Accessibility

- All interactive elements have `cursor: pointer`
- Focus states: `focus-visible:outline-2 focus-visible:outline-earth-400 focus-visible:outline-offset-3`
- All SVG illustrations: `aria-label` + `role="img"`
- Decorative SVG icons: `aria-hidden="true"`
- Icon-only buttons: `aria-label` required
- Form inputs: `<label>` with `for` attribute (or `sr-only` label)
- Color contrast: all body text earth-500 (`#6b5c4e`) on cream-50 passes 4.5:1
- `prefers-reduced-motion` respected for lamp animation
- Mobile menu: `aria-expanded` toggled on button

---

## 10. Responsive Breakpoints

| Breakpoint | Width | Key changes |
|------------|-------|-------------|
| Mobile | 375px | Single column, stacked hero, hamburger nav |
| sm | 640px | 2-col product grid, inline band items |
| md | 768px | Split layouts (2-col), desktop nav |
| lg | 1024px | 3-col product grid, wider padding |
| xl | 1280px | Max content width reached |

---

## 11. Content Voice

- **Headings:** Poetic, short, use italic for emotional words — *slowly*, *old way*, *intention*
- **Body:** Calm, factual, never salesy. Present tense. Short sentences.
- **Labels/eyebrows:** Purely informational — material, category, location
- **Calls to action:** Understated — "Explore collection", "Our story →", "Enquire →"
- **Avoid:** Exclamation marks, superlatives ("best!", "amazing!"), urgency language ("limited time!")

---

## 12. What Not to Do

| Category | Avoid |
|----------|-------|
| Colors | Pure white, cool gray, blue tones, saturated hues |
| Typography | Bold weights (700+), sans-serif headings, all-caps headings |
| Buttons | Filled/colored buttons, rounded corners, icon-inside buttons |
| Layout | Centered text blocks wider than 60ch, tight padding, card drop shadows |
| Animation | Fast transitions (< 150ms), bounce easing, scale-on-hover that shifts layout |
| Content | Emoji, exclamation marks, urgency copy, sales language |
| Photography | Stock photos, overly produced images — prefer natural, imperfect, warm-lit |

---

*Last updated: June 2026 — matches `index.html` v1.0*
