import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../services/LanguageContext';
import { Language, SectionId } from '../types';

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems: { id: SectionId; label: string }[] = Object.entries(t.nav).map(
    ([key, value]) => ({ id: key as SectionId, label: value })
  );

  useEffect(() => {
    const checkModalState = () => {
      setIsModalOpen(document.body.style.overflow === 'hidden');
    };
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const probe = window.scrollY + window.innerHeight * 0.35;
      for (const it of navItems) {
        const el = document.getElementById(it.id);
        if (el && probe >= el.offsetTop && probe < el.offsetTop + el.offsetHeight) {
          setActiveSection(it.id);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navItems.length]);

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.AR : Language.EN);
  };

  const scrollToSection = (id: SectionId) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 56, behavior: 'smooth' });
    }
  };

  if (isModalOpen) return null;

  return (
    <header
      className={`fixed left-0 lg:left-[76px] right-0 z-30 transition-[border-color,background-color] duration-300 ${
        scrolled
          ? 'bg-[var(--bg)]/92 backdrop-blur-[2px] border-b border-[var(--border)]'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ top: 'calc(var(--rail-top, 36px))' }}
    >
      <style>{`
        :root { --rail-top: 36px; }
        @media (min-width:1024px) { :root { --rail-top: 40px; } }
      `}</style>

      <div className="max-w-[1500px] mx-auto px-4 lg:px-12 h-14 flex items-center justify-between gap-4">
        {/* Brand mark */}
        <button
          onClick={() => scrollToSection('home')}
          className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-primary)]"
        >
          <span className="inline-block w-2 h-2 bg-[var(--accent)]" aria-hidden="true" />
          <span>SA</span>
          <span className="hidden sm:inline opacity-60">/</span>
          <span className="hidden sm:inline text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            {language === Language.AR ? 'سلمان المطيري' : 'Salman Almutairi'}
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.2em]"
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  className={
                    isActive
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
                  }
                >
                  {num}
                </span>
                <span
                  className={`link-brutal ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="font-mono text-[11px] tracking-[0.2em] uppercase px-3 h-9 border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-colors"
            aria-label={language === Language.EN ? 'Switch to Arabic' : 'التحويل إلى الإنجليزية'}
          >
            {language === Language.EN ? 'AR' : 'EN'}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[var(--text-primary)] border border-[var(--border-strong)]"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[var(--bg)] border-y border-[var(--border-strong)]"
          >
            <nav className="flex flex-col">
              {navItems.map((item, idx) => {
                const num = String(idx + 1).padStart(2, '0');
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group flex items-center justify-between px-6 py-4 border-b border-[var(--border)] text-start"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-[11px] tracking-[0.2em] ${
                          isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {num}
                      </span>
                      <span
                        className={`text-base ${
                          isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {isActive && (
                      <span className="block w-2 h-2 bg-[var(--accent)]" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
