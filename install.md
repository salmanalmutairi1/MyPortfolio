# 🚀 Portfolio Project Setup Guide

This guide describes how to run the Salman Almutairi Portfolio locally using **Vite + React + TypeScript**. This is the industry-standard way to run modern React applications.

## 1. Prerequisites
Ensure you have **Node.js** installed on your computer.
- Download: [nodejs.org](https://nodejs.org/) (LTS version recommended).
- Verify: Run `node -v` in your terminal.

---

## 2. Initialize the Project

Open your terminal and run the following commands to create a new project scaffold:

```bash
# Create a new Vite project
npm create vite@latest salman-portfolio -- --template react-ts

# Navigate into the folder
cd salman-portfolio

# Install standard dependencies
npm install
```

---

## 3. Install Required Packages

Install the libraries we used in the code (Framer Motion, Lucide Icons, etc.):

```bash
# UI and Animation libraries
npm install framer-motion lucide-react

# Tailwind CSS and its dependencies
npm install -D tailwindcss postcss autoprefixer
```

---

## 4. Configure Tailwind CSS

1. Initialize Tailwind configuration:
   ```bash
   npx tailwindcss init -p
   ```

2. Open the created `tailwind.config.js` file and replace its content with the configuration used in our project:

   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     darkMode: 'class',
     theme: {
       extend: {
         fontFamily: {
           sans: ['Inter', 'sans-serif'],
           mono: ['JetBrains Mono', 'monospace'],
         },
         colors: {
           brand: {
             50: '#f5f3ff',
             100: '#ede9fe',
             200: '#ddd6fe',
             300: '#c4b5fd',
             400: '#a78bfa',
             500: '#8b5cf6', // Violet
             600: '#7c3aed',
             700: '#6d28d9',
             800: '#5b21b6',
             900: '#4c1d95',
             950: '#2e1065',
           },
           accent: {
             DEFAULT: '#6366f1',
             glow: '#818cf8',
           }
         },
         animation: {
           'float': 'float 6s ease-in-out infinite',
           'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
           'cursor': 'cursor .75s step-end infinite',
           'aurora': 'aurora 10s linear infinite alternate',
         },
         keyframes: {
           float: {
             '0%, 100%': { transform: 'translateY(0)' },
             '50%': { transform: 'translateY(-20px)' },
           },
           cursor: {
             '0%, 100%': { opacity: '1' },
             '50%': { opacity: '0' },
           },
           aurora: {
             '0%': { backgroundPosition: '50% 50%', filter: 'hue-rotate(0deg)' },
             '100%': { backgroundPosition: '100% 50%', filter: 'hue-rotate(20deg)' },
           }
         }
       },
     },
     plugins: [],
   }
   ```

3. Open `./src/index.css` and replace its content with the base Tailwind directives and our custom global styles:

   ```css
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* Custom Scrollbar */
   ::-webkit-scrollbar {
     width: 6px;
   }
   ::-webkit-scrollbar-track {
     background: #000000; 
   }
   ::-webkit-scrollbar-thumb {
     background: #333333; 
     border-radius: 10px;
   }
   ::-webkit-scrollbar-thumb:hover {
     background: #8b5cf6; 
   }

   /* Glassmorphism Utilities */
   .glass-panel {
     background: rgba(255, 255, 255, 0.02);
     backdrop-filter: blur(12px);
     -webkit-backdrop-filter: blur(12px);
     border: 1px solid rgba(255, 255, 255, 0.05);
   }

   .glass-nav {
     background: rgba(0, 0, 0, 0.6);
     backdrop-filter: blur(16px);
     -webkit-backdrop-filter: blur(16px);
     border-bottom: 1px solid rgba(255, 255, 255, 0.05);
   }

   .terminal-glass {
     background: rgba(5, 5, 8, 0.9);
     backdrop-filter: blur(20px);
     border: 1px solid rgba(255, 255, 255, 0.08);
     box-shadow: 0 20px 50px rgba(0,0,0,0.5);
   }

   /* Noise Texture */
   .bg-noise {
     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
     pointer-events: none;
   }
   ```

---

## 5. Organize Files

Copy the code provided in the chat into the `src` folder. Organize them like this:

```
salman-portfolio/
├── index.html                  <-- Modify this (see step 6)
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx                <-- Entry point (formerly index.tsx)
    ├── App.tsx
    ├── constants.ts
    ├── types.ts
    ├── index.css               <-- Global styles
    ├── services/
    │   ├── LanguageContext.tsx
    │   └── PlayerContext.tsx
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── About.tsx
        ├── Skills.tsx
        ├── Projects.tsx
        ├── ProjectModal.tsx
        ├── Education.tsx
        ├── Certificates.tsx
        ├── Achievements.tsx
        ├── Mindset.tsx
        ├── Contact.tsx
        ├── MiniPlayer.tsx
        └── ui/
            ├── Particles.tsx
            └── AudioVisualizer.tsx
```

---

## 6. Update `index.html`

In the root folder, update `index.html` to point to the Vite entry file (`/src/main.tsx`).

```html
<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Salman Almutairi | Software Engineer</title>
  </head>
  <body class="bg-black text-white antialiased overflow-x-hidden selection:bg-brand-500/30 selection:text-white">
    <div class="fixed inset-0 bg-noise z-50 pointer-events-none mix-blend-overlay"></div>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

*Note: In Vite, we rename `index.tsx` to `main.tsx` by convention.*

---

## 7. Run the Project

Everything is ready! Start the local development server:

```bash
npm run dev
```

Open the link shown in the terminal (usually `http://localhost:5173`) to view the premium portfolio.
