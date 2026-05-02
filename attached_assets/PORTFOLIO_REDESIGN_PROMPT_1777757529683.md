# Portfolio Redesign Prompt — `swesalman.xyz`

> **Project:** Salman Almutairi — Software Engineer Portfolio
> **Site:** https://swesalman.xyz
> **Goal:** Redesign the visual layer (design, typography, motion, responsiveness) without touching personal info or functionality.
> **Direction:** Brutalist / Raw & Editorial × Dark Mode

---

## Table of Contents

1. [Context & Scope](#1-context--scope)
2. [Design Decisions Locked In](#2-design-decisions-locked-in)
3. [Hard Rules — What Not to Touch](#3-hard-rules--what-not-to-touch)
4. [The Full Redesign Prompt](#4-the-full-redesign-prompt)
   - [4.1 Role & Mission](#41-role--mission)
   - [4.2 Diagnostic Phase](#42-diagnostic-phase)
   - [4.3 Design Direction](#43-design-direction)
   - [4.4 Color System](#44-color-system)
   - [4.5 Layout & Composition](#45-layout--composition)
   - [4.6 Motion System](#46-motion-system)
   - [4.7 Atmosphere & Visual Details](#47-atmosphere--visual-details)
   - [4.8 Responsive Engineering](#48-responsive-engineering)
   - [4.9 Accessibility](#49-accessibility)
   - [4.10 Performance Budget](#410-performance-budget)
   - [4.11 Deliverables](#411-deliverables)
   - [4.12 Process & Approval Gates](#412-process--approval-gates)
   - [4.13 Definition of Done](#413-definition-of-done)
5. [How to Use This Prompt](#5-how-to-use-this-prompt)

---

## 1. Context & Scope

This document is a **structured prompt** to be handed to an AI coding agent (Claude Code, Cursor, or similar) to redesign the portfolio's visual layer.

The redesign is purely visual and motion-focused. **All personal information, copy, project descriptions, contact details, and functional behavior must remain untouched.** Existing text is treated as immutable content that must be re-housed in a far better shell.

The portfolio is bilingual — it presents the name in both English (Salman Almutairi) and Arabic (سلمان المطيري). Both must be treated with equal typographic care.

---

## 2. Design Decisions Locked In

These were chosen during the brainstorming phase:

| Decision | Choice |
|----------|--------|
| **Aesthetic direction** | Brutalist / Raw & Editorial |
| **Color mode** | Dark mode primary |
| **Hero load reveal** | ✅ Required |
| **Scroll-triggered sections** | ✅ Required |
| **Hover micro-interactions** | ✅ Required |
| **Page transitions** | ✅ Required |
| **Custom cursor** | ❌ Not used |

---

## 3. Hard Rules — What Not to Touch

- ❌ **Do NOT** change any personal information, bio, project descriptions, contact details, or résumé content
- ❌ **Do NOT** change any functional behavior, routes, data fetching, or business logic
- ❌ **Do NOT** remove any existing sections or projects
- ❌ **Do NOT** rewrite copy, even if it seems like it could be improved — flag it instead
- ✅ **ONLY** redesign: layout, typography, color, motion, atmosphere, responsiveness

---

## 4. The Full Redesign Prompt

> Copy everything below this line into a file named `REDESIGN_PROMPT.md` in the project root and point your agent at it.

---

### 4.1 Role & Mission

You are a senior frontend designer-engineer. Redesign the **visual layer only** of the portfolio at `swesalman.xyz` (Salman Almutairi — Software Engineer).

The aesthetic target is **Brutalist Editorial × Dark**. Commit fully to that direction. No softening into "modern minimal." No fence-sitting.

---

### 4.2 Diagnostic Phase

Before any code, produce `AUDIT.md` covering:

1. **Current weaknesses** — typography hierarchy, spacing rhythm, color contrast, section transitions, generic patterns
2. **Section inventory** — list every section, document specific pain points per section
3. **Motion gaps** — what's static that should breathe, what's over-animated, what feels generic
4. **Responsive breaks** — test 320px, 375px, 768px, 1024px, 1440px, 1920px
5. **Accessibility audit** — contrast ratios, focus states, reduced-motion, semantic HTML, keyboard nav
6. **Performance** — current LCP, CLS, total JS, font weight count, image formats

**Wait for approval** before moving to the design phase.

---

### 4.3 Design Direction

**The aesthetic:**

> Raw, structural, magazine-grade. Oversized type as architecture. Hairline rules and grid lines exposed like blueprint scaffolding. Heavy contrast — deep near-black canvas against bone-white text and one violent accent. Asymmetric, intentionally off-balance. Type sits on the page like printed matter, not like a website. Code-like precision, editorial confidence.

**Reference language (mood, not copy):** Bauhaus poster, swiss editorial, terminal output, architectural drawing, IDE chrome, brutalist concrete, mono-spaced spec sheet.

**Forbidden — these are the AI-slop tells:**

- ❌ Inter, Roboto, Arial, generic system stacks
- ❌ Purple/pink/blue gradients of any kind
- ❌ Glassmorphism, frosted cards, soft shadows
- ❌ Centered-everything hero ("Hi, I'm 👋")
- ❌ Rounded-2xl cards in a 3-column grid
- ❌ Lucide icons sprinkled as decoration
- ❌ Soft pastel accents
- ❌ Generic "available for work" green dot

**Required typography stack** (pick from each row, document choice in `DESIGN.md`):

- **Display (oversized):** `PP Editorial New`, `Migra`, `Fraunces` (variable weights), `PP Neue Montreal Mono`, or `Söhne Breit`
- **Body:** `PP Neue Montreal`, `General Sans`, `Söhne`, or `Inter Tight` (only if treated boldly)
- **Mono (use heavily — labels, metadata, section indices):** `JetBrains Mono`, `Berkeley Mono`, `IBM Plex Mono`, or `Geist Mono`
- **Arabic (for سلمان المطيري and any Arabic text):** `IBM Plex Sans Arabic`, `Rubik`, or `Noto Sans Arabic` — treat with the same care as Latin, correct line-height, never let it default to a system font

Pair: **one** distinctive display + **one** body + **mono used as a structural element**, not just for code blocks.

---

### 4.4 Color System

Use CSS variables exclusively. No inline colors.

```css
--bg:            #0A0A0A   /* near-black, NOT pure #000 */
--bg-elevated:   #131313   /* subtle elevation only */
--text-primary:  #F5F2EC   /* bone, not pure white */
--text-secondary:#A8A39A   /* warm gray */
--text-muted:    #5C5852
--border:        rgba(245,242,236,0.08)  /* hairlines */
--border-strong: rgba(245,242,236,0.18)
--accent:        ONE of: #FF4D1F (signal orange) | #C8FF00 (acid lime) | #FF2D55 (siren red)
--grain:         SVG noise overlay, 4% opacity, fixed
```

**Rule:** Accent appears max 3 places per viewport. Scarcity = power.

---

### 4.5 Layout & Composition

- **Asymmetric 12-column grid** with visible grid lines (debug aesthetic kept as feature)
- **Oversized type as structure** — hero name renders at `clamp(4rem, 14vw, 14rem)`, treated as architectural element
- **Editorial numbering** — every section labeled `[ 01 / WORK ]`, `[ 02 / ABOUT ]` in mono caps
- **Metadata strips** — every project shows `YEAR · ROLE · STACK · STATUS` in mono, like a film slate
- **Sticky side rail** on desktop (≥1024px) — section index in mono, current section highlighted
- **Top status bar** — fixed strip with current location, local time (Riyadh), and a live `STATUS: AVAILABLE` indicator in mono caps. Treat like terminal chrome.
- **Project cards as full-bleed editorial spreads**, NOT uniform tiles. Vary layouts: one large/one small, image left/text right, then inverted.
- **Hero composition** — name aligned left or off-center, role and meta floating in negative space, one strong asymmetric anchor element (oversized number, large index, or ASCII-style mark)
- **Section dividers** — `1px` hairlines spanning full bleed with mono label centered or offset

---

### 4.6 Motion System

Use **Motion (Framer Motion)** if React, **GSAP + ScrollTrigger** otherwise. One coherent system.

#### 4.6.1 Hero Load Reveal (orchestrated, max 1.6s total)

- Status bar slides down from top (200ms)
- Section index fades in (200ms, delay 100ms)
- Name reveals **character-by-character** with mask wipe from below — stagger 30ms per char
- Role line draws in as if typed, mono cursor blink at end
- Accent element (line, shape, number) draws/scales in last as the punctuation
- Use cubic-bezier `(0.65, 0, 0.35, 1)` (expo-out feel)

#### 4.6.2 Scroll-Triggered Sections

- Use IntersectionObserver, trigger ONCE per element
- Section labels: mono text reveals via mask-wipe left-to-right (400ms)
- Headlines: lines split, rise 32px + fade in, stagger 80ms
- Body text: fade-up 16px, no stagger (avoid death by stagger)
- Project images: clip-path reveal from bottom, 800ms, ease-out
- Numbers and metadata: count up or type in for big stats

#### 4.6.3 Hover Micro-interactions

- **Project cards**: image scales 1.02 with 600ms ease, accent border slides in from left edge, metadata mono text underlines via animated background-size trick
- **Links**: underline draws left→right on enter, right→left on leave (200ms)
- **Buttons**: invert colors instantly on hover (no fade — brutalist hard cut), arrow icon translates 4px right
- **Section headlines on hover**: subtle accent color shift on a single character (editorial flourish)

#### 4.6.4 Page / Section Transitions

- Use a **mask-wipe transition** between routes/sections — solid accent or bone color sweeps across viewport (400ms in, 400ms out)
- Or: horizontal slide with current section number flashing during transition
- Pick ONE and apply consistently

#### 4.6.5 Motion Laws

- Easings: `cubic-bezier(0.65, 0, 0.35, 1)` default, `cubic-bezier(0.87, 0, 0.13, 1)` for dramatic
- Durations: `120ms` micro, `400ms` standard, `800ms` reveals, `1600ms` hero only
- **Always respect `prefers-reduced-motion: reduce`** — disable transforms and clip-paths, keep opacity-only fallbacks
- No infinite background loops. No parallax that fights scroll.
- **Never animate** during initial paint of below-fold content — wait for intersect

---

### 4.7 Atmosphere & Visual Details

- **SVG noise grain overlay** — fixed, full viewport, 4% opacity, `mix-blend-mode: overlay`
- **Visible grid lines** — toggleable or revealed on a specific scroll depth as design statement
- **Custom `::selection`** — accent background, bg-color text
- **Custom scrollbar** — thin (4px), accent thumb on dark track
- **Hairline borders everywhere** — `1px solid var(--border)` between every distinct block, exposed like wireframe
- **No box-shadows.** Brutalism uses borders and contrast, not soft elevation.
- **No border-radius above 2px** anywhere. Sharp corners. Rectangles.
- **Decorative elements**: oversized numerals, ASCII-style marks, registration crosses in corners, mono "FILE / 001" style labels — pick one motif and repeat with discipline

---

### 4.8 Responsive Engineering

- **Mobile-first** build, then enhance up
- Breakpoints: `480px`, `768px`, `1024px`, `1280px`, `1536px`
- **Fluid type** with `clamp()` — `clamp(min, fluid, max)` for every heading
- Test 320px — nothing overflows, hero name still impactful
- Touch targets ≥ 44×44px
- On `(hover: none)`: simplify hover effects, keep tap feedback, no parallax
- Test landscape mobile, foldables, ultra-wide (1920px+)
- Sticky side rail collapses to top progress bar on mobile

---

### 4.9 Accessibility

- WCAG **AA minimum**, AAA for body text where possible
- All hover-revealed info also reachable by keyboard / focus
- Visible focus states — accent color outline, on-brand, never browser default
- Semantic HTML — `<main>`, `<section>`, `<article>`, correct h1→h6 order
- All existing alt text preserved
- Keyboard nav for every interactive element including animated ones
- `aria-label` on icon-only buttons
- Skip-to-content link in mono, top-left
- **Reduced-motion fallback** for every animation (test in DevTools)
- Lighthouse accessibility ≥ 95
- Bilingual: declare `lang="ar"` on Arabic text spans, correct `dir` attribute where needed

---

### 4.10 Performance Budget

- LCP < 1.8s on 4G
- CLS < 0.05
- Total JS < 180kb gzipped (motion library budgeted)
- Self-host fonts, `font-display: swap`, max 2 weights per family unless variable
- Preload critical font + hero image
- WebP/AVIF images with fallback, `loading="lazy"` below fold
- No layout shift from font swap — set `size-adjust` in `@font-face`
- Lighthouse performance ≥ 90 mobile, ≥ 95 desktop

---

### 4.11 Deliverables

1. `AUDIT.md` — diagnostic from Phase 1
2. `DESIGN.md` — final tokens, fonts, motion specs, dos & don'ts, mood references
3. Refactored codebase, all original content intact
4. `CHANGELOG.md` — section-by-section visual changes (for fast review)
5. Before/after screenshots at 375px, 768px, 1440px
6. Lighthouse report (mobile + desktop)

---

### 4.12 Process & Approval Gates

1. Run diagnostic → ship `AUDIT.md` → **WAIT for approval**
2. Propose 2 brutalist directions (different accent colors, different display fonts) with hero mockups in `DESIGN.md` → **WAIT for selection**
3. Build hero + one project section as a vertical slice → **WAIT for approval**
4. Roll out to remaining sections
5. QA pass: Lighthouse, axe-core, manual responsive sweep at all breakpoints, reduced-motion test
6. Ship

**Stop and ask** before:

- Changing any text content (flag instead, don't write)
- Adding any new section
- Removing any project or link
- Going past the 180kb JS budget

---

### 4.13 Definition of Done

A visitor lands on the page and within 3 seconds thinks: *"this person ships taste."*

The site reads like printed matter from a design quarterly, not a tech portfolio. Every animation has a job. Every hairline is intentional. Mono type is used as architecture, not decoration. The accent color appears rarely and lands hard. On mobile, it's not a compressed desktop — it's a redesign that respects the format.

The original content is untouched. The shell is unrecognizable.

---

## 5. How to Use This Prompt

1. **Save this file** as `PORTFOLIO_REDESIGN_PROMPT.md` in your project root
2. **Open your coding agent** (Claude Code, Cursor, etc.) inside the portfolio repo
3. **Point the agent at this file** with a message like: *"Read PORTFOLIO_REDESIGN_PROMPT.md and start at Phase 1 — produce AUDIT.md and wait for my review."*
4. **Honor the approval gates** — don't let the agent skip ahead to coding before the audit and design directions are reviewed
5. **Review at each gate**, push back if anything drifts toward generic
6. **Iterate the vertical slice** (hero + one project) until it lands, then green-light the rollout

---

*Generated for the redesign of swesalman.xyz — content immutable, shell rebuilt.*
