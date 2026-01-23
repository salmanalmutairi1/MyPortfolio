import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../services/LanguageContext';
import { Language, SectionId } from '../types';
import logo from '../Assets/logo1.png';

const Navbar: React.FC = () => {
  const { language, setLanguage, t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems: { id: SectionId; label: string }[] = Object.entries(t.nav).map(([key, value]) => ({
    id: key as SectionId,
    label: value,
  }));

  // Detect when a modal is open by checking body overflow style
  useEffect(() => {
    const checkModalState = () => {
      setIsModalOpen(document.body.style.overflow === 'hidden');
    };

    // Use MutationObserver to watch for style changes on body
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section logic
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200; // Increased offset for better detection

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id as SectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navItems]);

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.AR : Language.EN);
  };

  const scrollToSection = (id: SectionId) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  // Hide navbar completely when a modal is open
  if (isModalOpen) {
    return null;
  }

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav h-16' : 'bg-transparent h-24'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('home')}
          className="relative text-xl md:text-2xl font-bold cursor-pointer flex items-center gap-2 group z-50"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-500/50 transition-colors overflow-hidden">
            <img
              src={logo}
              alt="Salman Almutairi logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-medium tracking-tight text-gray-200 group-hover:text-white transition-colors">
            {language === Language.AR ? 'سلمان' : 'Salman'}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 bg-black/20 backdrop-blur-sm p-1.5 rounded-full border border-white/5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === item.id 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {activeSection === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
          
        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold font-mono tracking-wider text-gray-400 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
          >
            <Globe size={14} />
            <span>{language === Language.EN ? 'AR' : 'EN'}</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={toggleLanguage}
            className="text-gray-400 hover:text-white transition-colors font-mono text-xs font-bold border border-white/10 px-2 py-1 rounded"
          >
            {language === Language.EN ? 'AR' : 'EN'}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-16 left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col p-6 gap-2">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`p-4 rounded-xl text-lg font-medium transition-all flex items-center justify-between group ${
                    activeSection === item.id 
                      ? 'bg-white/5 text-white border border-white/10' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && <div className="w-2 h-2 bg-brand-500 rounded-full shadow-[0_0_10px_#8b5cf6]" />}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
