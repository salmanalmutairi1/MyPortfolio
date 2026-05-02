import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText, Mail } from 'lucide-react';
import { useLanguage } from '../services/LanguageContext';
import portrait from '../Assets/Me.png';

const EASE_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

const Hero: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const reduce = useReducedMotion();
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect on the role line — preserves original copy in t.hero.typingLines
  useEffect(() => {
    const currentLine = t.hero.typingLines[typingIndex];
    if (!currentLine) return;
    const typeSpeed = isDeleting ? 30 : 75;
    const pauseTime = 2600;

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!isDeleting && displayedText === currentLine) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setTypingIndex(prev => (prev + 1) % t.hero.typingLines.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(
          currentLine.substring(0, displayedText.length + (isDeleting ? -1 : 1))
        );
      }, typeSpeed);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [displayedText, isDeleting, typingIndex, t.hero.typingLines]);

  // Render the architectural name — character-by-character mask reveal
  const nameWords = t.hero.name.split(' ');

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-2.5rem)] flex items-stretch overflow-hidden border-b border-[var(--border)]"
    >
      {/* Blueprint grid backdrop */}
      <div className="absolute inset-0 brutal-grid opacity-[0.5] pointer-events-none" aria-hidden="true" />
      {/* Oversized accent number — anchor element */}
      <div
        className="absolute -bottom-12 -end-6 md:-bottom-20 md:-end-10 font-display text-[clamp(14rem,32vw,30rem)] leading-[0.78] text-transparent select-none pointer-events-none"
        style={{ WebkitTextStroke: '1px var(--border-strong)' }}
        aria-hidden="true"
      >
        01
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-24 grid grid-cols-12 gap-y-10 gap-x-6 lg:gap-x-10 items-center">

        {/* Top meta row */}
        <div className="col-span-12 flex items-center justify-between mb-6 lg:mb-12">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex items-center gap-4 mono-meta"
          >
            <span>[ 01 / INDEX ]</span>
            <span className="hidden md:inline opacity-50">/</span>
            <span className="hidden md:inline">
              {language === 'ar' ? 'الملف · ٠٠١' : 'FILE · 001'}
            </span>
          </motion.div>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
            className="flex items-center gap-3 mono-meta"
          >
            <span className="hidden sm:inline">{language === 'ar' ? 'متاح للتدريب التعاوني' : 'Open for Co-op'}</span>
            <span className="inline-block w-2 h-2 bg-[var(--accent)]" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Greeting */}
        <div className="col-span-12 lg:col-span-9">
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
            className="mono-label mb-6"
          >
            {t.hero.greeting}
          </motion.p>

          {/* Architectural name — bilingual treatment.
              EN: per-character mask reveal in Fraunces (last word italic for editorial cadence).
              AR: per-word reveal — never split characters or letter-joining breaks. */}
          <h1
            className={`relative font-display text-[var(--text-primary)] ${
              language === 'ar' ? 'font-arabic' : ''
            }`}
            style={{
              fontWeight: 500,
              fontSize:
                language === 'ar'
                  ? 'clamp(2.75rem, 10vw, 9.5rem)'
                  : 'clamp(3.5rem, 13.5vw, 13rem)',
              lineHeight: language === 'ar' ? 1.25 : 1,
              letterSpacing: language === 'ar' ? '0' : '-0.05em',
              fontFeatureSettings: language === 'ar' ? '"calt" 1, "liga" 1' : '"ss01" 1, "calt" 1',
              paddingBottom: language === 'ar' ? '0.15em' : 0,
            }}
            aria-label={t.hero.name}
          >
            {language === 'ar'
              ? // AR — word-level reveal, characters stay joined
                nameWords.map((word, wi) => (
                  <span
                    key={wi}
                    className="inline-block letter-reveal align-baseline"
                    style={{
                      marginInlineEnd: wi < nameWords.length - 1 ? '0.32em' : 0,
                    }}
                  >
                    <span
                      style={
                        reduce
                          ? { transform: 'none' }
                          : { animationDelay: `${300 + wi * 220}ms` }
                      }
                    >
                      {word}
                    </span>
                  </span>
                ))
              : // EN — first word per-character cascade (upright Fraunces holds up
                //      to per-letter masking); italic last word revealed as one
                //      whole-word mask so its side-bearings don't get chopped
                //      between per-letter overflow:hidden boxes.
                nameWords.map((word, wi) => {
                  const isLast = wi === nameWords.length - 1;
                  if (isLast) {
                    return (
                      <span
                        key={wi}
                        className="inline-block letter-reveal italic"
                        style={{ fontStyle: 'italic', marginInlineStart: '0.04em' }}
                      >
                        <span
                          style={
                            reduce
                              ? { transform: 'none' }
                              : { animationDelay: `${300 + word.length * 32 + 80}ms` }
                          }
                        >
                          {word}
                        </span>
                      </span>
                    );
                  }
                  return (
                    <span
                      key={wi}
                      className="inline-block"
                      style={{ marginInlineEnd: '0.18em' }}
                    >
                      {Array.from(word).map((ch, ci) => (
                        <span key={ci} className="letter-reveal">
                          <span
                            style={
                              reduce
                                ? { transform: 'none' }
                                : { animationDelay: `${300 + (wi * 8 + ci) * 32}ms` }
                            }
                          >
                            {ch}
                          </span>
                        </span>
                      ))}
                    </span>
                  );
                })}
          </h1>

          {/* Underscore signature — accent rule pulled tight under the name */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASE_OUT }}
            className="mt-4 flex items-center gap-3 origin-left"
            aria-hidden="true"
          >
            <span className="block h-[2px] w-12 bg-[var(--accent)]" />
            <span className="mono-label text-[var(--text-muted)]">
              {language === 'ar' ? '— التوقيع' : '— SIGNATURE'}
            </span>
          </motion.div>

          {/* Role + typed line */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT }}
            className="mt-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
          >
            <span className="mono-label">{language === 'ar' ? 'المسمى' : 'ROLE'}</span>
            <span className="font-mono text-sm md:text-base text-[var(--text-primary)]">
              {t.hero.role}
            </span>
            <span className="hidden md:inline-block w-px h-4 bg-[var(--border-strong)]" aria-hidden="true" />
            <span className="font-mono text-sm md:text-base text-[var(--accent)]">
              <span className="text-[var(--text-muted)]">$&nbsp;</span>
              {displayedText}
              <span className="cursor-blink" aria-hidden="true" />
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: EASE_OUT }}
            className="mt-8 max-w-2xl text-base md:text-lg text-[var(--text-secondary)] leading-relaxed"
          >
            {t.hero.tagline}
          </motion.p>

          {/* CTAs — brutalist hard-cut buttons */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: EASE_OUT }}
            className="mt-10 flex flex-wrap items-stretch gap-3"
          >
            <button
              type="button"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-brutal btn-brutal-solid group"
            >
              <span>{t.hero.cta.projects}</span>
              <ArrowRight
                size={14}
                className={`transition-transform duration-200 ${
                  dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-brutal"
            >
              <Mail size={14} />
              <span>{t.hero.cta.contact}</span>
            </button>
            <a
              href="/cvme.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal btn-brutal-accent"
              aria-label={t.hero.cta.cv}
            >
              <FileText size={14} />
              <span>{t.hero.cta.cv}</span>
            </a>
          </motion.div>
        </div>

        {/* Portrait — sharp, framed, no rounding, registration-cross corners */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.0, ease: EASE_OUT }}
          className="col-span-12 lg:col-span-3 lg:justify-self-end relative"
        >
          <div className="relative w-44 sm:w-56 lg:w-full max-w-[260px] aspect-[4/5] border border-[var(--border-strong)] bg-[var(--bg-elevated)] reg-cross">
            <img
              src={portrait}
              alt="Salman Almutairi"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-110"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 mix-blend-multiply" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.55) 100%)' }} aria-hidden="true" />
            {/* Bottom mono badge */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 border-t border-[var(--border-strong)] bg-[var(--bg)]/85 flex items-center justify-between">
              <span className="mono-meta">PORTRAIT / 2026</span>
              <span className="text-[10px] font-mono text-[var(--accent)]">●REC</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom hairline + scroll cue */}
        <div className="col-span-12 mt-10 lg:mt-16 flex items-center gap-6">
          <span className="mono-meta">SCROLL</span>
          <span
            className="block h-px flex-1 bg-[var(--border-strong)] origin-left"
            style={
              reduce
                ? undefined
                : { animation: 'drawLine 1.4s var(--ease-out) 1.6s both' }
            }
            aria-hidden="true"
          />
          <span className="mono-meta">02 · ABOUT</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
