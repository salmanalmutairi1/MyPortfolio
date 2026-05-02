import React from 'react';
import { LanguageProvider, useLanguage } from './services/LanguageContext';
import { PlayerProvider } from './services/PlayerContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import MiniPlayer from './components/MiniPlayer';
import { StatusStrip, SideRail } from './components/ui/Brutalist';

const RAIL_ITEMS = [
  { id: 'home',         label: 'Index'   },
  { id: 'about',        label: 'About'   },
  { id: 'skills',       label: 'Stack'   },
  { id: 'projects',     label: 'Work'    },
  { id: 'education',    label: 'Edu'     },
  { id: 'certificates', label: 'Certs'   },
  { id: 'contact',      label: 'Contact' },
];

const Shell: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <StatusStrip language={language} />
      <SideRail items={RAIL_ITEMS} />
      <Navbar />

      <main id="main" className="app-frame relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
      </main>

      <footer className="app-frame relative z-10 border-t border-[var(--border)] bg-[var(--bg-deep)] py-10 pb-28 md:pb-10">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 mono-meta">
            <span className="inline-block w-2 h-2 bg-[var(--accent)]" aria-hidden="true" />
            <span>FILE / 002 · COLOPHON</span>
          </div>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
            © {new Date().getFullYear()} Salman Almutairi · All rights reserved
          </p>
          <p className="mono-meta">SET IN FRAUNCES · INTER TIGHT · JETBRAINS MONO</p>
        </div>
      </footer>

      <MiniPlayer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <PlayerProvider>
        <Shell />
      </PlayerProvider>
    </LanguageProvider>
  );
};

export default App;
