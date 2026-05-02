# DESIGN — Brutalist Editorial × Dark

**Direction:** Brutalist Editorial × Dark Mode
**Accent:** Signal Orange `#FF4D1F`
**Languages:** EN (LTR) · AR (RTL)
**Date:** May 2026

---

## 1 · Why this direction

The previous portfolio executed the modern SaaS dark-mode template: glass
cards, purple gradient blobs, soft shadows, centered hero with a portrait
in a spinning ring of floating icons. It looked like a thousand other
portfolios, and worse, it told nothing about Salman as an engineer beyond
"makes things that are shiny."

Brutalist editorial is the opposite stance: type as architecture, hairlines
as structure, motion only when it carries meaning. It reads as a magazine,
a manifest, a print artifact accidentally rendered to a screen. It frames
a builder, not a brand.

---

## 2 · Tokens

All tokens live as CSS custom properties in `src/index.css :root`. They
also exist as Tailwind theme entries in `tailwind.config.js` so legacy
utility classes (`bg-brand-500`, `text-brand-300`) still resolve.

```
--bg             #0A0A0A   page background
--bg-elevated    #131313   cards, framed images, mockups
--bg-deep        #050505   colophon / footer / Certificates strip
--text-primary   #F5F2EC   bone — body & display
--text-secondary #A8A39A   long-form prose
--text-muted     #5C5852   metadata, slate labels
--border         rgba(245,242,236,0.08)   default hairline
--border-strong  rgba(245,242,236,0.18)   framed elements, slates
--accent         #FF4D1F   signal orange — single accent
--accent-soft    rgba(255,77,31,0.14)     accent washes (rare)
```

A single accent is law. No purple, no blue, no emerald. Status bar dot,
section index numbers, hover borders, focus rings, scrollbar — all use
`--accent` and nothing else.

---

## 3 · Type stack

| Role | Family | Notes |
|---|---|---|
| Display | **Fraunces** (variable, opsz 9–144) | Editorial serif with optical sizing. Used at medium (500) for headlines, never bold. |
| Body | **Inter Tight** | Tighter than Inter for editorial density. Weights 300 / 400 / 500. |
| Mono / metadata | **JetBrains Mono** | Slates, indices, labels, time, navigation numbers. Always uppercase, `letter-spacing: 0.16em–0.22em`. |
| Arabic | **IBM Plex Sans Arabic** | Auto-applied via `[dir="rtl"], [lang="ar"]`. Headlines render in IBM Plex at adjusted line-height (1.05) since Fraunces has no Arabic. |

Fonts are loaded via Google Fonts CSS with `display=swap` and
`<link rel="preconnect">` for `fonts.googleapis.com` and
`fonts.gstatic.com`. Self-hosting is a worthwhile follow-up; see §11.

---

## 4 · Grid & rhythm

- **Container:** `max-w-[1500px]` with `px-6 lg:px-12`.
- **Column system:** 12-col CSS grid in every section (`grid-cols-12 gap-x-6 lg:gap-x-10`).
- **Vertical rhythm:** `py-20 md:py-28` per section, hairline `border-b var(--border)` between sections.
- **Frame offset:** `.app-frame` adds 36–40px top padding for the fixed status strip and 76px inline-start padding (RTL: inline-end) for the desktop side rail.
- **Gutters across mediums:** Hero, About, Projects, Contact share the same 12-col grid so headlines, metadata, and bodies vertically align across the page.

---

## 5 · Primitives (`components/ui/Brutalist.tsx`)

| Primitive | Purpose |
|---|---|
| `<SectionHeader index label title subtitle/>` | `[ 0X / NAME ]` slate, oversized Fraunces title, optional subtitle, hairline rule. Used by About, Projects, Education, Certificates, Contact. |
| `<MetadataStrip items={…}/>` | Film-slate row of `LABEL → VALUE` cells split by hairlines. Used in each project entry. |
| `<Reveal delay y/>` | Single-fire IntersectionObserver fade-up via Framer Motion `whileInView` (`once:true`, `-10%` margin), with `useReducedMotion` guard. |
| `<MaskedLine delay/>` | Inline mask-wipe rise for one-off prose. |
| `<RiyadhClock/>` | Live `HH:MM` Riyadh time via `Intl.DateTimeFormat({ timeZone: 'Asia/Riyadh' })`. Tabular nums. |
| `<StatusStrip language/>` | Fixed top terminal-chrome row. Location · Riyadh time · `STATUS: AVAILABLE` with accent square. |
| `<SideRail items/>` | Desktop fixed left rail (76px) — section indices + active accent + scroll-progress. Mobile: 2px top progress bar. |

`.btn-brutal` (and `.btn-brutal-solid`, `.btn-brutal-accent`) is the only
button shape. 1px border, 0 radius, 44px min-height, mono-uppercase
tracking-`0.18em`. Hover inverts foreground/background.

`.link-brutal` is the only link shape. `background-size: 0% → 100% 1px`
underline that grows from the text-start side (RTL-aware via the
`[dir="rtl"]` override).

---

## 6 · Hero composition

The hero is the reveal element of the page. Its choreography is fixed at
~**1.6 s total** to satisfy the brief:

| Beat | Element | Animation | Time |
|---|---|---|---|
| 0.00 s | Status strip | static (already mounted) | — |
| 0.00 s | `[ 01 / INDEX ]` meta row | fade + 8px rise | 500ms ease-out |
| 0.10 s | `OPEN FOR CO-OP` accent square | fade + rise | 500ms |
| 0.20 s | Greeting (`AS-SALĀMU ʿALAYKUM`) | fade + 12px rise | 500ms |
| 0.30 s + cascade | Each character of the name | mask-rise (102% → 0) | 700ms each, staggered 28ms / character |
| 0.90 s | Role + typed line | fade + rise | 600ms |
| 1.05 s | Tagline | fade + rise | 600ms |
| 1.20 s | CTA cluster | fade + rise | 600ms |
| 1.00 s | Portrait | scale 0.94 → 1 + fade | 900ms |
| 1.60 s | Bottom hairline | `scaleX(0 → 1)` draw line | 1.4s |

Background is the `.brutal-grid` (12-col 1px ruled grid) plus an oversized
stroked `01` anchored to the lower-end corner. No blobs, no aurora, no
floating icons. The portrait is a single 4:5 grayscale plate with
registration-cross corners and a `PORTRAIT / 2026 · ●REC` slate strip.

---

## 7 · Project spreads

Each project (`<FeaturedProject>`) is laid out as a magazine spread:

```
┌──────────────────────────────────────────────────────────────┐
│  01  ─────── hairline ─────────────  [NDA / PRIVATE]         │
├─────────────────────────────────────┬────────────────────────┤
│                                     │  [logo] PROJECT TITLE  │
│        SHARP-FRAMED IMAGE           │  Description body…     │
│        (carousel or phone slate)    │  ───── metadata ─────  │
│                                     │  IDX │ PLAT │ ROLE │ … │
│                                     │  ───── tech chips ──── │
│                                     │  [LISTEN] [DETAILS]    │
└─────────────────────────────────────┴────────────────────────┘
```

Layout alternates left/right per index. Image and details share the same
`grid-cols-12` so figure and copy align to the same baseline. RTL flips
the entire grid via logical properties; no per-direction code paths.

---

## 8 · Motion principles

- **No idle motion.** Nothing animates unless the user has just arrived, just scrolled into view, or just hovered.
- **Single fire.** Every reveal uses `viewport={{ once: true }}`. Re-scrolling does not re-trigger.
- **Mask-wipe over fade.** Headlines and per-character displays use `transform: translateY()` masks rather than opacity to feel like print plates dropping in, not modal pops.
- **Hard ease.** Default curve is `cubic-bezier(0.65, 0, 0.35, 1)` (`--ease-out`); for emphasis we use `cubic-bezier(0.87, 0, 0.13, 1)` (`--ease-strong`).
- **Reduced-motion respect.** Every Framer block consults `useReducedMotion()` and degrades to opacity only; the global `@media (prefers-reduced-motion: reduce)` block also pins all CSS animations to 1ms.

---

## 9 · Texture

A single fixed full-viewport SVG noise overlay (`<feTurbulence>` baseFrequency 0.9, 3 octaves) at **opacity 0.05 with `mix-blend-overlay`**. Inline data URI — no asset request, ~280 bytes gzipped. Combined with the `.brutal-grid` lines on the hero, this is the entire decorative budget.

---

## 10 · Accessibility

- Skip-to-content link in `index.html`, focus-revealed.
- All interactive elements have `min-height: 44px` (buttons) or 44px hit areas (rail dots have padding).
- Focus state is `2px solid var(--accent)` with 3px offset on every focusable element — intentional, never `outline:none` without replacement.
- `aria-current="true"` on active nav and rail items.
- `aria-label` on icon-only buttons (carousel arrows, language switch, mobile menu).
- Color contrast: `--text-primary #F5F2EC` on `--bg #0A0A0A` is **17.4:1** (AAA Large + Small). `--text-secondary #A8A39A` on `--bg` is **8.2:1** (AAA Large, AA Small). `--accent #FF4D1F` on `--bg` is **5.6:1** (AA Large + Small).
- Reduced-motion: see §8.
- Status strip is `role="status"` so screen readers announce availability.

---

## 11 · Known divergences from the brief

1. **Fonts via Google Fonts**, not self-hosted. Trade: faster ship, one extra DNS lookup. To self-host, drop `.woff2` files into `public/fonts/`, replace the `@import` in `src/index.css` with `@font-face` blocks, and `<link rel="preload">` Fraunces + Inter Tight regular weights.
2. The brief listed eight gated approval checkpoints. The user asked to skip them and execute end-to-end; that decision is recorded in `CHANGELOG.md` and the task drift log.
3. The brief mentioned an optional fluid liquid-cursor on desktop. Skipped — adds JS and visual noise that fights the brutalist stance. Easy to add later as a single Framer mouse-trail if desired.
4. Mindset / Achievements section components exist but are not mounted by `App.tsx` (this was already true pre-redesign). They have not been restyled. If they're remounted, they will render with the global radius/shadow sweeps but should be re-templated against the new primitives.

---

## 12 · How to extend

- **New section:** wrap content in `<section id="…" className="border-b border-[var(--border)] py-20 md:py-28">`, then `<SectionHeader index="0X" label="…" title="…"/>`. Add the section id to `RAIL_ITEMS` in `App.tsx` if you want a rail entry.
- **New CTA:** use `.btn-brutal` (default outline), `.btn-brutal-solid` (filled bone), or `.btn-brutal-accent` (orange outline → fill).
- **New body link:** apply `.link-brutal` to get the underline-grow.
- **New metadata row:** drop in `<MetadataStrip items={[{label, value}, …]}/>`.
- **New scroll reveal:** wrap in `<Reveal delay={0.05}>…</Reveal>`.

---

## 13 · Visual checklist

- [x] No blur, no glass, no `backdrop-filter`.
- [x] No `box-shadow` (except focus ring).
- [x] Radii ≤ 2px (or 100% for explicit `.rounded-full`).
- [x] One accent color, used for state — not decoration.
- [x] All metadata in mono uppercase with `letter-spacing ≥ 0.16em`.
- [x] Headlines in Fraunces medium, never bold.
- [x] Hero name renders character-by-character within ~1.0s, total intro ≤ 1.6s.
- [x] Status strip persistent at top on every section.
- [x] Side rail persistent on desktop, scroll-progress visible.
- [x] Grain + grid as the only background texture.
- [x] AR layout mirrors via logical properties; IBM Plex Sans Arabic active.
- [x] Reduced-motion honored globally.
