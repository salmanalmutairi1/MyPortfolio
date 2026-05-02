# Lighthouse reports

## Why this folder is mostly empty

Lighthouse audits require a headless Chromium binary. The Replit sandbox
this redesign was executed in does not ship Chromium, and downloading one
through `npx lighthouse` consistently exceeds the available command
timeout.

To produce real reports, run the commands below from a developer machine
with Chrome installed against the deployed (or locally-served) site.

## Reproduce locally

```bash
# 1. Build and serve the production bundle
npm run build
npx vite preview --host --port 4173

# 2. In another terminal — desktop run
npx lighthouse http://localhost:4173 \
  --preset=desktop \
  --output=html --output=json \
  --output-path=./lighthouse/desktop \
  --chrome-flags="--headless=new"

# 3. Mobile run
npx lighthouse http://localhost:4173 \
  --form-factor=mobile \
  --throttling.cpuSlowdownMultiplier=4 \
  --output=html --output=json \
  --output-path=./lighthouse/mobile \
  --chrome-flags="--headless=new"
```

Both runs produce `desktop.report.html`, `desktop.report.json`,
`mobile.report.html`, `mobile.report.json` in this folder.

## What the redesign optimizes for

The architectural choices made during the brutalist redesign are aimed
squarely at Lighthouse's Core Web Vitals:

| Metric | Architectural lever |
|---|---|
| **LCP** | Self-hosted Fraunces Variable + Inter Tight Variable via `@fontsource-variable/*` (bundled by Vite, no external CDN handshake). Hero portrait marked `loading="eager" fetchPriority="high"`. |
| **CLS** | `@font-face` fallback declarations with `size-adjust`, `ascent-override`, `descent-override` so the system fallback occupies the same metric box as the real face. No element is sized in viewport units that depend on the loaded font. |
| **FID / INP** | The 60fps `requestAnimationFrame` particle canvas was deleted. Framer Motion reveals are single-fire (`viewport: { once: true }`) so scroll handlers do not re-trigger. |
| **TBT** | No idle motion. Three `setInterval`s exist (status clock 30s, project carousel 5.5s, phone mock 4.5s) — all paused under `prefers-reduced-motion: reduce`. |
| **Accessibility score** | Skip-to-content link, AAA contrast (`#F5F2EC` on `#0A0A0A` = 17.4:1), 44px hit targets, `aria-current` on active nav, `aria-label` on icon-only buttons, `role="status"` on the availability strip, focus ring (`2px solid var(--accent)` + 3px offset) on every focusable element. |
| **Best Practices** | No external font CDN, no `box-shadow` (no paint thrash), no `backdrop-filter` (no compositor overhead), `<meta name="theme-color">` set. |
| **SEO** | All meta tags preserved (Open Graph, Twitter Card, canonical, bilingual locale alternates), valid `lang` and `dir`, semantic landmarks (`<main id="main">`, `<header>`, `<footer>`, `<nav>`). |

## Expected ranges

Based on the architecture above, expected Lighthouse scores at the
default mobile (Slow 4G, 4× CPU) profile are:

- Performance: **90–100** (single image-heavy page, no JS frameworks beyond React + Framer; main JS bundle dominated by Lucide-React icons and embedded base64-grain).
- Accessibility: **100**.
- Best Practices: **100**.
- SEO: **100**.

These are projections — the user is encouraged to run the commands
above and replace this README with the real reports.
