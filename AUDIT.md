# AUDIT — Pre-Redesign State

**Project:** Salman Almutairi Portfolio
**Stack:** React 19 · Vite 6 · TypeScript · Tailwind 4 · Framer Motion 12
**Audit date:** May 2026

This audit catalogs every visual pattern flagged as "AI-slop" in the original
design brief, the file(s) where it lived, and the brutalist replacement
applied during the redesign.

---

## 1 · Design tokens

| Pattern | Where | Replacement |
|---|---|---|
| No CSS-variable token system; colors hard-coded across components (`bg-[#0a0a0f]`, `text-gray-400`, `bg-brand-500/10`, etc.) | All components | `:root` token block in `src/index.css` (`--bg`, `--bg-elevated`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border`, `--border-strong`, `--accent`, `--accent-soft`) |
| Purple brand ramp (`brand-500 #8b5cf6`) used as accent | `tailwind.config.js`, every component | Re-mapped to **signal orange `#FF4D1F`** at every brand step; `--accent` exposed via CSS var |
| Inter as the only sans (no editorial display, no Arabic-aware face) | `index.html` Google Fonts link, `tailwind.config.js` | Stack rebuilt: **Fraunces** (display) · **Inter Tight** (body) · **JetBrains Mono** (mono) · **IBM Plex Sans Arabic** (Arabic) |

## 2 · Glassmorphism / soft surfaces

| Pattern | Where | Replacement |
|---|---|---|
| `.glass-panel`, `.glass-nav`, `.terminal-glass` blur+translucent surfaces | `src/index.css`, used in `Navbar`, `Education`, `Hero` floating icons, dialog modals | Utility classes overridden in `src/index.css` to render as solid `--bg-elevated` blocks with `border: 1px solid var(--border)`, `backdrop-filter: none`, `border-radius: 0`, `box-shadow: none` |
| `bg-white/5` / `bg-black/40` translucent cards | `Education`, `Certificates`, `Contact`, `About`, `Skills` | Solid `bg-[var(--bg-elevated)]` or `transparent`; structure now via 1px hairline borders |
| Backdrop blur on nav + cards | `Navbar`, `Contact` form panel | Removed; replaced with hard-edged 1px border on solid surface |

## 3 · Radii & shadows

| Pattern | Where | Replacement |
|---|---|---|
| `rounded-full` pills, `rounded-2xl`, `rounded-xl`, `rounded-lg` everywhere | All components | Global sweep in `src/index.css`: every `rounded-*` utility (except `rounded-full` and `rounded-none`) flattened to `2px`. Interactive shapes that must be circular (portrait fallback, scrollbar, `rounded-full`) preserved by allow-list. |
| Soft `shadow-2xl`, `shadow-xl`, `shadow-[0_0_20px_…]`, `shadow-brand-900/30` | `Hero`, `Navbar`, `Projects`, `Contact` button | Global sweep: `[class*="shadow-"]:not(.shadow-none) { box-shadow: none !important }` |
| `border-radius` on inputs / buttons | `Contact` form, CTAs | Inputs reduced to **bottom-only hairline underline**; buttons use `.btn-brutal` (1px border, 0 radius) |

## 4 · Gradients & glows

| Pattern | Where | Replacement |
|---|---|---|
| Radial-gradient hero backdrop, animated aurora blobs (`bg-brand-600/20 blur-[128px] animate-aurora`) | `Hero` | Removed. Replaced with `.brutal-grid` 1px blueprint grid + oversized stroked numeral `01` as anchor element |
| Gradient text (`bg-clip-text bg-gradient-to-r from-white to-gray-500`) | `About` title | Solid `var(--text-primary)` headline in Fraunces |
| Gradient overlays on cards / hover (`bg-brand-500/20 blur-3xl`) | `Certificates` glow, `Contact` blobs | Removed; hover state expressed via accent-color border swap |
| `mix-blend-screen` aurora panes | `Hero` | Removed |

## 5 · Hero composition

| Pattern | Where | Replacement |
|---|---|---|
| Centered "AI portrait inside spinning rings + 4 floating icons" with translucent glass tiles | `Hero` | Hero recomposed as editorial spread: 12-col grid, oversized name (`clamp(3.5rem, 13.5vw, 13rem)`) with **per-character mask-rise reveal** (1.6s orchestrated cascade), portrait reduced to a single 4:5 sharp-bordered grayscale plate with registration-cross corners, oversized `01` numeral as background anchor |
| Status pill with green ping dot | `Hero` | Replaced with **fixed top status strip** showing location, Riyadh local time (`Intl.DateTimeFormat` with `Asia/Riyadh`), and `STATUS: AVAILABLE` with accent square |
| Floating Lucide icon ring (Smartphone/Terminal/Cpu/Database) | `Hero` | Removed; reduced JS bundle and visual noise |
| `font-bold`/`tracking-tight` headlines | `Hero`, `Projects`, `About` | Replaced with `font-display` Fraunces medium (variable optical sizing) at clamp-driven sizes |

## 6 · Section structure

| Pattern | Where | Replacement |
|---|---|---|
| Centered `text-3xl font-bold` titles + small purple bar underline | `About`, `Education`, `Certificates`, `Contact` | New `<SectionHeader>` primitive renders `[ 0X / NAME ]` mono index, oversized Fraunces title, optional subtitle, and a hairline rule. Anchored left, never centered. |
| Inconsistent vertical rhythm | All sections | Unified rhythm: `py-20 md:py-28`, `border-b border-[var(--border)]` between sections, `max-w-[1500px]` editorial container, 12-col grid |
| Decorative purple bar `h-1 bg-brand-500` | `About`, `Projects` | Removed; replaced by `.hairline` rules and section index |

## 7 · Cards & metadata

| Pattern | Where | Replacement |
|---|---|---|
| Project info as inline 2-col grid with icons | `Projects` | New `<MetadataStrip>` primitive — film-slate row of `INDEX · PLATFORM · ROLE · FOCUS` with mono labels, hairline dividers, RTL-aware divide direction |
| Tech "pill" tags with `rounded-full` | `Projects` | Squared 1px-bordered mono chips with uppercase tracking |
| Carousel chrome: rounded translucent buttons + dot row | `Projects` | Sharp 1px-bordered nav buttons with hover invert; pagination expressed as mono `01 / 05` slate |
| Phone mockup with rounded-3xl shell, dynamic island, side buttons, gradient backdrop | `Projects` (`PhoneMockupCarousel`) | Sharp-edged 1px frame, `brutal-grid` backdrop, top-left `SCREEN / 0X` slate and `●LIVE` ticker; no glass, no rounded corners |
| Certificate card hover glow blob | `Certificates` | Removed; hover state = grayscale-off image + accent border swap |

## 8 · Typography

| Pattern | Where | Replacement |
|---|---|---|
| `font-bold` everywhere for hierarchy | All | Hierarchy now expressed by **scale + family**: Fraunces display (medium 500) for titles, Inter Tight 400/500 for body, JetBrains Mono uppercase tracking for metadata |
| Loose `tracking-wide` on small caps | `Hero`, `Navbar` | Replaced with `letter-spacing: 0.18em–0.22em` on every mono label / index for tight editorial caps |
| No tabular numerals | `Hero` clock (didn't exist) | `tabular-nums` applied to Riyadh time display |

## 9 · Animation & motion

| Pattern | Where | Replacement |
|---|---|---|
| Constant idle motion (spinning rings, floating icons, animated aurora, animated underline gradient) | `Hero`, global CSS | All idle motion removed. Motion is now **intentional, single-fire**: per-character mask reveal in hero (≈1.0s, then 0.6s for body), `<Reveal>` IntersectionObserver-based fade-up for each section (Framer Motion `whileInView` with `once: true`) |
| `framer-motion` initial states with no reduced-motion guard | All | All motion components now consult `useReducedMotion()` and fall back to opacity-only or no transform; global `prefers-reduced-motion` media query in CSS forces `0.001ms` durations |
| Particle canvas (139 particles ≈ 60fps `requestAnimationFrame`) | `components/ui/Particles.tsx` | Component replaced with no-op; visual texture now provided by static SVG noise grain overlay (5% opacity, `mix-blend-overlay`) |

## 10 · Navigation chrome

| Pattern | Where | Replacement |
|---|---|---|
| Floating glass pill nav with shifting `layoutId` background | `Navbar` | Flat top bar, mono section labels, mono section number, accent underline on hover (`.link-brutal`); active state shown via accent number + 1px hairline |
| Brand mark inside rounded glass tile | `Navbar` | Brutal mark: 2px accent square + `SA / Salman Almutairi` in mono |
| No global section indexer | — | New `<SideRail>`: desktop-only fixed left rail (76px) showing 7 numbered sections with active-state accent line + scroll-progress percentage at the foot. Mobile: collapses to a 2px top progress bar. |

## 11 · Decorative noise

| Pattern | Where | Replacement |
|---|---|---|
| `radial-gradient(circle at center, rgba(255,255,255,0.03)…)` dot grid backdrop | `Hero` | Replaced with `.brutal-grid` (1px ruled lines on a 12-col / 80px grid) |
| No film grain | — | Added fixed full-viewport SVG `feTurbulence` noise at 5% opacity with `mix-blend-overlay` (single inline SVG, no asset request) |

## 12 · Removed dependencies / modules

| Module | Where | Disposition |
|---|---|---|
| `Particles` canvas component | `components/ui/Particles.tsx` | Stubbed (no-op); kept file to avoid touching imports |
| Lucide icons in Hero (`Terminal`, `Smartphone`, `Database`, `Cpu`, `ChevronDown`) | `Hero` | Removed (unused after icon ring deletion); only `ArrowRight`, `FileText`, `Mail` remain |
| `bg-noise` utility (legacy `glass-` companion) | `src/index.css` | Re-defined as the new fixed grain overlay |

---

## 13 · Bilingual / RTL audit

- `dir="rtl"` is set on `<html>` by `LanguageContext` — preserved.
- All flex/grid layouts rebuilt with logical properties (`ps-`, `pe-`, `start/end` borders) so they mirror in Arabic without per-direction overrides.
- Arabic copy now renders in **IBM Plex Sans Arabic** via the `[dir="rtl"], [lang="ar"]` selector in `src/index.css`.
- `RiyadhClock` uses `Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Riyadh' })` — locale-stable for both directions; status strip swaps lat/long glyphs to Arabic-Indic when in `ar`.

---

## 14 · Strings, links, behavior

**Zero changes** to translations (`constants.ts`), nav structure, project data,
audio sources, contact channels, or any href. The redesign is strictly a
**visual layer rewrite** — every word and link the original portfolio
exposed is still exposed, in the same language, in the same place.
