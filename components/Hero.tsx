import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Smartphone, 
  Database, 
  Cpu, 
  ArrowRight, 
  FileText, 
  Mail,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../services/LanguageContext';
import portrait from '../Assets/Me.png';

const Hero: React.FC = () => {
  const { t, dir } = useLanguage();
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing Effect Logic
  useEffect(() => {
    const currentLine = t.hero.typingLines[typingIndex];
    if (!currentLine) return;
    
    const typeSpeed = isDeleting ? 30 : 80;
    const pauseTime = 3000;

    let timer: NodeJS.Timeout;
    
    if (!isDeleting && displayedText === currentLine) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % t.hero.typingLines.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(
          currentLine.substring(0, displayedText.length + (isDeleting ? -1 : 1))
        );
      }, typeSpeed);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [displayedText, isDeleting, typingIndex, t.hero.typingLines]);

  const floatingIcons = [
    { Icon: Smartphone, color: 'text-blue-400', delay: 0, x: -120, y: -80, scale: 1.1 },
    { Icon: Terminal, color: 'text-brand-400', delay: 1.5, x: 140, y: -60, scale: 1.2 },
    { Icon: Cpu, color: 'text-emerald-400', delay: 3, x: -140, y: 100, scale: 1.0 },
    { Icon: Database, color: 'text-amber-400', delay: 4.5, x: 120, y: 80, scale: 1.1 },
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Cinematic Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px] z-0 opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[128px] animate-aurora mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] animate-aurora animation-delay-2000 mix-blend-screen" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1 text-center lg:text-start"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 w-fit mx-auto lg:mx-0 backdrop-blur-sm shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Open for Co-op</span>
          </div>

          <h2 className="text-lg text-gray-400 font-medium mb-2 tracking-wide">
            {t.hero.greeting}
          </h2>
          
          <div className="relative mb-6">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
              <span className="text-white relative z-10 block">
                {t.hero.name}
              </span>
            </h1>
            <div className="absolute -inset-10 bg-gradient-to-r from-brand-600/20 via-blue-600/10 to-transparent blur-3xl -z-10 opacity-60 rounded-full pointer-events-none" />
          </div>

          <div className="h-8 mb-8 flex items-center justify-center lg:justify-start">
            <span className="text-lg md:text-xl text-brand-300 font-mono flex items-center gap-2 bg-brand-500/5 px-3 py-1 rounded border border-brand-500/10">
              <span className="text-brand-500">$</span>
              {displayedText}
              <span className="w-2 h-5 bg-brand-500 animate-cursor" />
            </span>
          </div>

          <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0 font-light">
            {t.hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all flex items-center gap-2 group w-full sm:w-auto justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              {t.hero.cta.projects}
              <ArrowRight size={18} className={`transition-transform duration-300 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </button>
            
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-12 px-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center gap-2 w-full sm:w-auto justify-center hover:border-white/20"
            >
              <Mail size={18} />
              {t.hero.cta.contact}
            </button>
            
            <a 
                href="/Assets/cvme.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-8 rounded-full bg-brand-500/10 border border-brand-500/50 text-brand-300 font-bold hover:bg-brand-500 hover:text-white transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] relative overflow-hidden w-full sm:w-auto justify-center"
                aria-label="Download CV"
            >
              <div className="absolute inset-0 bg-brand-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <FileText size={20} className="relative z-10" />
              <span className="relative z-10">{t.hero.cta.cv}</span>
            </a>
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="order-1 lg:order-2 flex justify-center relative select-none"
        >
          {/* Main Portrait Circle container */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            {/* Background Decoration Rings */}
            <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-dashed border-white/10 animate-[spin_30s_linear_infinite_reverse]" />
            
            {/* Portrait Image Placeholder */}
            <div className="absolute inset-10 rounded-full overflow-hidden border border-white/10 shadow-2xl shadow-brand-900/20 bg-gray-900 z-10 group cursor-none">
              <img 
                src={portrait}
                alt="Salman Almutairi"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent mix-blend-multiply"></div>
            </div>

            {/* Refined Floating 3D Icons */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2 z-20"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
                style={{
                  marginLeft: item.x,
                  marginTop: item.y,
                }}
              >
                <div 
                  className="glass-panel p-4 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl"
                  style={{ transform: `scale(${item.scale})` }}
                >
                  <item.Icon className={`w-6 h-6 ${item.color}`} strokeWidth={1.5} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator - Hidden on Mobile */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] opacity-50">Scroll</span>
        <ChevronDown size={16} className="opacity-50" />
      </motion.div>
    </section>
  );
};

export default Hero;
