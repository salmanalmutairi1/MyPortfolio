import React from 'react';
import { LanguageProvider } from './services/LanguageContext';
import { PlayerProvider } from './services/PlayerContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Particles from './components/ui/Particles';
import MiniPlayer from './components/MiniPlayer';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <PlayerProvider>
        <div className="relative min-h-screen bg-black text-white selection:bg-brand-500/30">
          <Particles />
          <Navbar />
          
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Certificates />
            <Contact />
          </main>

          <footer className="py-8 text-center text-gray-600 border-t border-white/5 relative z-10 bg-black pb-24 md:pb-8">
            <p>© {new Date().getFullYear()} Salman Almutairi. All rights reserved.</p>
          </footer>

          <MiniPlayer />
        </div>
      </PlayerProvider>
    </LanguageProvider>
  );
};

export default App;