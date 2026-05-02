# PORTFOLIO_REDESIGN_PROMPT

This document is the canonical prompt for the brutalist editorial × dark
mode redesign of the Salman Almutairi portfolio. It captures the original
direction, constraints, deliverables, and acceptance criteria so the work
can be re-run, audited, or extended without context loss.

---

## 1 · Mission

Replace the existing "modern SaaS dark mode" portfolio (glassmorphism,
purple gradients, particle canvas, floating-icon hero) with a
**Brutalist Editorial × Dark Mode** treatment that reads like a magazine
spread accidentally rendered to a screen.

The redesign is **visual-layer only** — no copy changes, no link
changes, no functional changes. Every word, link, audio source,
contact channel, and project field stays exactly as it was.

---

## 2 · Stack constraints

- React 19 · Vite 6 · TypeScript · Tailwind 4 · Framer Motion 12.
- Single repo, no backend changes.
- Bilingual EN / AR with full RTL via `LanguageContext`.
- Translation strings in `constants.ts` are **immutable** during this work.

---

## 3 · Visual direction

### Tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A0A0A` | Page background |
| `--bg-elevated` | `#131313` | Cards, framed images, mockups |
| `--bg-deep` | `#050505` | Footer, certificates strip |
| `--text-primary` | `#F5F2EC` | Bone — body & display |
| `--text-secondary` | `#A8A39A` | Long-form prose |
| `--text-muted` | `#5C5852` | Slate labels, indices |
| `--border` | `rgba(245,242,236,0.08)` | Default hairline |
| `--border-strong` | `rgba(245,242,236,0.18)` | Framed elements |
| `--accent` | **`#FF4D1F`** | Signal orange — single accent |

**Single-accent law.** No purple, no blue, no emerald. Every state
expression — focus, hover, active nav, status dot — uses `--accent` only.

### Type stack

| Role | Family | Notes |
|---|---|---|
| Display | **Fraunces** (variable, opsz 9–144) | Medium 500 only, never bold |
| Body | **Inter Tight** | 300 / 400 / 500 |
| Mono / metadata | **JetBrains Mono** | Uppercase, `letter-spacing: 0.16em–0.22em` |
| Arabic | **IBM Plex Sans Arabic** | Auto-applied via `[dir="rtl"]` |

Fonts must be **self-hosted** with `font-display: swap` and `size-adjust`
fallback descriptors to eliminate CLS. No external font CDN.

### Geometry

- **Radii ≤ 2px.** Only `rounded-full` (and the scrollbar) may be circular.
- **No shadows.** Depth comes from 1px hairline borders, not blur.
- **No gradients.** Single-token color application. No radial blobs, no `mix-blend-screen` aurora panes.
- **No backdrop blur.** Surfaces are solid. Texture is a fixed SVG noise overlay (5% opacity, `mix-blend-overlay`).

### Composition

- 12-column CSS grid in every section.
- `max-w-[1500px]` editorial container, `px-6 lg:px-12`.
- `py-20 md:py-28` vertical rhythm, `border-b var(--border)` between sections.
- Section headers carry an `[ 0X / NAME ]` mono index, oversized Fraunces title, optional subtitle, and a hairline rule. Always anchored to the start edge — never centered.

### Persistent chrome

- **Top status strip** (fixed, 36–40px tall): location · live Riyadh time · `STATUS: AVAILABLE` with accent square.
- **Desktop side rail** (76px, fixed): vertical mono indices for the 7 sections, accent-line active state, scroll-progress percentage at the foot. Mobile: collapses to a 2px top progress bar.

### Hero

- 12-col editorial spread.
- Bilingual name set in Fraunces at `clamp(3.5rem, 13.5vw, 13rem)`.
- **Per-character mask-rise reveal**, ~1.6s total orchestrated reveal:
  - 0.0s status row + meta
  - 0.2s greeting
  - 0.3s+ name (28ms / character cascade, 700ms each)
  - 0.9s role + typed line
  - 1.05s tagline
  - 1.2s CTAs
  - 1.0s portrait scale-in
  - 1.6s bottom hairline draw-in
- Background = `.brutal-grid` (12-col 1px ruled lines) + oversized stroked `01` numeral as anchor.
- Portrait = single sharp 4:5 grayscale plate with registration-cross corners and a `PORTRAIT / YEAR · ●REC` slate.

### Projects

Each project rebuilt as a magazine spread:
- Slate header (`0X` numeral + hairline + optional `NDA / PRIVATE` badge).
- 7/5 image-and-copy grid that alternates left/right by index.
- `<MetadataStrip>` (`INDEX · PLATFORM · ROLE · FOCUS`) under the body copy.
- Squared 1px-bordered tech chips with `TechIcon`.
- Phone mockup is a sharp 1px frame on a `.brutal-grid` backdrop with `SCREEN / 0X · ●LIVE` slate — no rounded shell, no dynamic island, no glass.

---

## 4 · Motion principles

- **No idle motion.** Nothing animates unless the user has just arrived, just scrolled into view, or just hovered.
- **Single fire.** Every reveal uses `viewport={{ once: true }}`. Re-scrolling does not retrigger.
- **Mask-wipe over fade.** Headlines drop in like print plates, not modal pops.
- **Hard ease.** Default `cubic-bezier(0.65, 0, 0.35, 1)`; emphasis `cubic-bezier(0.87, 0, 0.13, 1)`.
- **Reduced-motion respected.** Every Framer block consults `useReducedMotion()`; the global CSS pins all animations to 1ms when `prefers-reduced-motion: reduce`.

---

## 5 · Accessibility (non-negotiable)

- Skip-to-content link in `index.html`, focus-revealed.
- 44×44 minimum hit targets.
- `outline: 2px solid var(--accent)` with 3px offset on every focusable element.
- `aria-current="true"` on active nav and rail items.
- `aria-label` on every icon-only button.
- AAA contrast for primary text (17.4:1), AA Small for secondary (8.2:1) and accent (5.6:1).
- `role="status"` on the top availability strip.

---

## 6 · Bilingual / RTL

- Layouts use logical properties (`ps-`, `pe-`, `start/end`) so they mirror without per-direction code paths.
- Arabic cascade applied via `[dir="rtl"], [lang="ar"] { font-family: IBM Plex Sans Arabic, … }`.
- `RiyadhClock` uses `Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Riyadh' })` — locale-stable in both directions.
- Status strip swaps lat/long glyphs to Arabic-Indic numerals when in `ar`.

---

## 7 · Deliverables

| Artifact | Purpose |
|---|---|
| `AUDIT.md` | Pattern-by-pattern catalogue of removed AI-slop and replacements |
| `DESIGN.md` | Tokens, primitives, hero choreography, accessibility, divergences |
| `CHANGELOG.md` | Per-file change log for the redesign |
| `PORTFOLIO_REDESIGN_PROMPT.md` | This file — the canonical brief |
| `screenshots/before-after/` | Editorial captures of the new shell |
| `lighthouse/` | Lighthouse reports (mobile + desktop) |

---

## 8 · Acceptance criteria

- [ ] Zero changes to `constants.ts` translations.
- [ ] Zero changes to project hrefs / data fields.
- [ ] All radii ≤ 2px (or `rounded-full`).
- [ ] No `box-shadow` (except focus ring).
- [ ] No `backdrop-filter` / `blur(*)`.
- [ ] No gradients in the body.
- [ ] Single accent (`#FF4D1F`).
- [ ] Fonts self-hosted with `font-display: swap` + `size-adjust` fallbacks.
- [ ] Hero name reveals character-by-character within ~1s; full hero ≤ 1.6s.
- [ ] Status strip persistent on every scroll position.
- [ ] Side rail persistent on desktop; mobile shows 2px scroll-progress.
- [ ] AR layout mirrors via logical properties; IBM Plex Sans Arabic active.
- [ ] `prefers-reduced-motion` honored globally.
- [ ] Skip-to-content link present and focus-revealed.
- [ ] No `any` casts in TS.
- [ ] No runtime errors on initial load or section navigation in EN or AR.

---

## 9 · Out of scope (intentional)

- Mindset / Achievements / Experience components — not mounted in `App.tsx` (true before the redesign too). Queued as a follow-up.
- Optional fluid liquid-cursor — would fight the brutalist stance.
- Backend / data changes.
- Modal redesign (`ProjectModal`, `CertificateModal`) — they inherit the global radius/shadow sweeps and read consistently with the new shell.
