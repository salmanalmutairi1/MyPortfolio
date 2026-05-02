# Salman Almutairi Portfolio

A personal portfolio website built with React + Vite + TypeScript + Tailwind CSS, featuring bilingual (English/Arabic) content, project showcases, certificates, and an audio mini-player.

## Tech Stack
- **Build tool**: Vite 6
- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 (with PostCSS)
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Project Structure
- `index.html` – HTML entry point
- `index.tsx` – React root
- `App.tsx` – Top-level component
- `components/` – UI components (Hero, About, Skills, Projects, Education, Certificates, Contact, etc.)
- `services/` – React contexts (LanguageContext, PlayerContext)
- `src/` – Stylesheets and data
- `Assets/` – Images, audio, PDF resume
- `public/` – Static assets served as-is
- `constants.ts`, `types.ts` – App-wide constants and types

## Replit Setup
- **Workflow**: `Start application` runs `npm run dev` on port **5000** (webview)
- **Vite config** binds to `0.0.0.0:5000` and sets `allowedHosts: true` so the Replit proxy/iframe preview works correctly.
- **Deployment**: Configured as a `static` deployment using `npm run build` with `dist` as the public directory.

## Optional Environment Variables
Defined in `.env.example`:
- `VITE_TELEGRAM_BOT_TOKEN` – Telegram bot token (for contact form integration)
- `VITE_TELEGRAM_CHAT_ID` – Telegram chat id
- `GEMINI_API_KEY` – exposed to the client as `process.env.API_KEY`/`GEMINI_API_KEY` via Vite `define`

These are optional; the site renders without them.

## Scripts
- `npm run dev` – start Vite dev server on port 5000
- `npm run build` – produce production build in `dist/`
- `npm run preview` – preview production build locally
