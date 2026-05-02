# CHANGELOG

## Brutalist Editorial × Dark redesign — May 2026

A single-pass, visual-only rewrite of the Salman Almutairi portfolio.
Translation strings, links, audio sources, contact endpoints, project data,
and TS types were not modified.

### Foundation

- **`src/index.css`** — rewritten.
  - Added Google Fonts import for Fraunces, Inter Tight, JetBrains Mono, IBM Plex Sans Arabic.
  - New `:root` token block: `--bg`, `--bg-elevated`, `--bg-deep`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border`, `--border-strong`, `--accent` (`#FF4D1F`), `--accent-soft`, motion easings, type families.
  - Global sweeps: every Tailwind `rounded-*` utility flattened to `2px`; every `shadow-*` killed; legacy `.glass-panel`, `.glass-nav`, `.terminal-glass` redefined as solid bordered blocks.
  - Brutalist primitives: `.btn-brutal` / `.btn-brutal-solid` / `.btn-brutal-accent`, `.link-brutal`, `.mono-label`, `.mono-meta`, `.hairline`, `.brutal-grid`, `.reg-cross`, `.letter-reveal`, `.mask-wipe`, `.cursor-blink`, `.skip-link`.
  - Fixed full-viewport SVG noise grain overlay (`.grain-overlay`) at 5% opacity, `mix-blend-overlay`.
  - `prefers-reduced-motion` global guard.
  - `.app-frame` offset for fixed status strip and side rail (RTL-aware).

- **`tailwind.config.js`** — rewritten.
  - Theme tokens: bone / muted / accent palette; `brand-*` ramp re-mapped to the signal-orange ramp so legacy utility classes still resolve.
  - Font families: `sans` (Inter Tight), `display` (Fraunces), `mono` (JetBrains Mono), `arabic` (IBM Plex Sans Arabic).
  - All `borderRadius` keys collapsed to `2px`.
  - `boxShadow.none = 'none'`.

- **`index.html`** — rewritten.
  - `<meta name="theme-color" content="#0A0A0A">`.
  - `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com`.
  - Body restyled to bone-on-deep-black, antialiased.
  - Skip-to-content `<a class="skip-link">` and the fixed `.grain-overlay` injected once at the body level.

### New components

- **`components/ui/Brutalist.tsx`** — created.
  - `SectionHeader`, `Reveal`, `MaskedLine`, `RiyadhClock`, `StatusStrip`, `SideRail`, `MetadataStrip`. See `DESIGN.md §5`.

### Rewritten components (visual only — props, exports, behavior preserved)

- **`App.tsx`** — Shell now mounts `<StatusStrip>` and `<SideRail>`, wraps content in `.app-frame`, adds editorial colophon footer. `LanguageProvider` and `PlayerProvider` unchanged.
- **`components/Hero.tsx`** — Recomposed as 12-col editorial spread. Per-character mask-rise reveal of the bilingual name, ~1.6s orchestrated reveal. Removed: floating Lucide icon ring, spinning portrait rings, aurora gradients, radial dot grid, status pill, scroll chevron, glass shadow CTA. Added: `[ 01 / INDEX ]` slate, `OPEN FOR CO-OP` indicator, role + typed line ($ caret + accent cursor), sharp 4:5 grayscale portrait with registration-cross corners and `PORTRAIT / 2026 · ●REC` strip, oversized stroked `01` anchor numeral, draw-in bottom hairline.
- **`components/Navbar.tsx`** — Flat top bar offset for the side rail. Mono numeric nav with `.link-brutal` underline + accent active number. Brand mark = accent square + `SA / Salman Almutairi`. Mobile menu re-templated as full-bleed list with mono indices.
- **`components/About.tsx`** — Asymmetric 5/7 grid. `SectionHeader` + Fraunces body. Stats now a hairline-divided row instead of a centered card. Education tags rebuilt as squared mono badges (one accent).
- **`components/Skills.tsx`** — Mono ticker: each skill card replaced with a 64px tall hairline-bordered cell containing index number, monochrome icon, and uppercase mono label. Pause-on-hover preserved.
- **`components/Projects.tsx`** — Each project rebuilt as a magazine spread (slate header → 7/5 image+copy grid). New `MetadataStrip` for project facts. Tech chips squared with hairline borders. Carousels (`ProjectCarousel`, `PhoneMockupCarousel`) restyled: sharp frames, `01 / 05` mono pagination slate, `SCREEN / 0X · ●LIVE` slate on phone mock, `brutal-grid` backdrop. Phone mock now sharp-edged with no rounded shell, no dynamic-island glass, no gradient backdrop.
- **`components/Education.tsx`** — Card → editorial entry: 12-col row split, oversized Fraunces institution title, accent-colored mono degree, hairline-bordered date pill with accent square.
- **`components/Certificates.tsx`** — Grid restyled as a no-gap 1px-bordered tile sheet. Hover state inverts grayscale, swaps border to accent, surfaces an `<Eye>` glyph in an accent frame. Each tile carries a top-left `0X` slate. "View All" CTA uses `.btn-brutal`.
- **`components/Contact.tsx`** — Channels list rebuilt as a hairline-divided log: index · framed icon · channel · handle · arrow. Form panel boxed in `--bg-elevated` with mono `FORM / 007` slate. Inputs flattened to bottom-only hairline-underline fields. Submit uses `.btn-brutal-solid`. Location card replaces the previous decorative blob.
- **`components/ui/Particles.tsx`** — Replaced with a no-op stub. Eliminates a ~60fps `requestAnimationFrame` canvas loop and ~15kB of JS path; texture now provided by the static SVG noise overlay.

### Behavior

- All translation keys (`constants.ts`) untouched.
- All hrefs / nav targets unchanged.
- All audio sources / project data / contact endpoints / Telegram env vars unchanged.
- `LanguageProvider`, `PlayerProvider`, `MiniPlayer`, modals (`ProjectModal`, `CertificateModal`) functionally unchanged; their visuals inherit from the global radius/shadow sweeps so they read consistently with the new shell.

### Performance

- Removed: particle canvas, 5 unused Lucide icon imports in Hero, four `blur-3xl` filter passes in Hero/Contact, three `backdrop-blur-xl` passes in Navbar/Hero icon ring/Contact form.
- Kept: Framer Motion (already a dep, used for orchestrated reveals).
- Fonts ship via Google Fonts CSS with `display=swap` + preconnect (self-host upgrade noted in `DESIGN.md §11`).

### Documentation

- Added `AUDIT.md` — pattern-by-pattern catalog of what was removed and what replaced it.
- Added `DESIGN.md` — design rationale, tokens, primitives, hero choreography, accessibility, divergences.
- Added `CHANGELOG.md` (this file).

### Known divergences from brief

- Eight approval checkpoints in the brief were collapsed into one execution pass at the user's request. Recorded in `mark_task_complete` drift.
- Fonts loaded from Google Fonts rather than self-hosted (see `DESIGN.md §11`).
- Optional fluid liquid-cursor not implemented — intentional, see `DESIGN.md §11`.
- `Mindset.tsx`, `Achievements.tsx`, `Experience.tsx` not restyled — they were not mounted by `App.tsx` before or after the redesign.
