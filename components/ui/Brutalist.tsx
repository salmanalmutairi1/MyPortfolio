import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* -----------------------------------------------------------
   Section header — editorial index + headline + hairline
   Renders [ 0X / NAME ] mono label, oversized headline, rule.
   ----------------------------------------------------------- */
export const SectionHeader: React.FC<{
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'right';
}> = ({ index, label, title, subtitle, align = 'left' }) => {
  return (
    <header
      className={`mb-12 md:mb-20 ${align === 'right' ? 'text-end' : 'text-start'}`}
    >
      <div
        className={`flex items-center gap-4 mb-8 ${
          align === 'right' ? 'justify-end' : ''
        }`}
      >
        <span className="mono-label whitespace-nowrap">[ {index} / {label.toUpperCase()} ]</span>
        <span className="hairline flex-1 max-w-[40vw]" aria-hidden="true" />
      </div>
      <h2
        className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-medium text-[var(--text-primary)] leading-[0.95] tracking-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 max-w-2xl text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
};

/* -----------------------------------------------------------
   Reveal — single-fire IntersectionObserver fade-up
   ----------------------------------------------------------- */
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}> = ({ children, delay = 0, y = 24, className }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* -----------------------------------------------------------
   MaskedLine — inline mask-wipe text reveal (single line)
   ----------------------------------------------------------- */
export const MaskedLine: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => {
  const reduce = useReducedMotion();
  return (
    <span className={`mask-wipe ${className || ''}`}>
      <span
        style={
          reduce
            ? { transform: 'none' }
            : { animationDelay: `${delay}ms` }
        }
      >
        {children}
      </span>
    </span>
  );
};

/* -----------------------------------------------------------
   Riyadh local time badge for the top status strip
   ----------------------------------------------------------- */
export const RiyadhClock: React.FC = () => {
  const [now, setNow] = useState<string>('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const fmt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Riyadh',
      });
      setNow(fmt.format(d));
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="font-mono tabular-nums">{now || '--:--'}</span>;
};

/* -----------------------------------------------------------
   StatusStrip — fixed top terminal-chrome bar
   Location · Riyadh time · STATUS: AVAILABLE · accent dot
   ----------------------------------------------------------- */
export const StatusStrip: React.FC<{
  language: 'en' | 'ar';
}> = ({ language }) => {
  return (
    <div
      className="fixed top-0 inset-x-0 z-40 h-9 lg:h-10 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-[2px]"
      role="status"
      aria-label="Status bar"
    >
      <div className="h-full px-4 lg:px-8 flex items-center justify-between text-[10px] lg:text-[11px] tracking-[0.18em] uppercase font-mono text-[var(--text-secondary)]">
        <div className="flex items-center gap-3 lg:gap-6">
          <span className="hidden sm:inline">
            {language === 'ar' ? '٢٤°٤٢′ ش · ٤٦°٤٣′ ق' : '24°42′N · 46°43′E'}
          </span>
          <span className="hidden md:inline opacity-50">/</span>
          <span>
            {language === 'ar' ? 'الرياض' : 'Riyadh'} · <RiyadhClock />
          </span>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          <span className="hidden md:inline opacity-50">/</span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 bg-[var(--accent)]"
              aria-hidden="true"
            />
            <span className="text-[var(--text-primary)]">
              STATUS: {language === 'ar' ? 'متاح' : 'AVAILABLE'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

/* -----------------------------------------------------------
   SideRail — desktop fixed left rail, mono section indices
   On mobile collapses to a thin top progress bar
   ----------------------------------------------------------- */
type RailItem = { id: string; label: string };

export const SideRail: React.FC<{ items: RailItem[] }> = ({ items }) => {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sections = items
        .map(i => document.getElementById(i.id))
        .filter(Boolean) as HTMLElement[];
      const probe = window.scrollY + window.innerHeight * 0.35;
      for (const s of sections) {
        if (probe >= s.offsetTop && probe < s.offsetTop + s.offsetHeight) {
          setActive(s.id);
          break;
        }
      }
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(1, window.scrollY / docH) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  return (
    <>
      {/* Mobile / tablet: thin top progress bar under status strip */}
      <div
        className="fixed left-0 right-0 z-30 lg:hidden h-[2px] bg-[var(--border)]"
        style={{ top: '36px' }}
        aria-hidden="true"
      >
        <div
          className="h-full bg-[var(--accent)] origin-left"
          style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
        />
      </div>

      {/* Desktop: vertical rail */}
      <aside
        className="hidden lg:flex fixed left-0 top-10 bottom-0 z-30 w-[76px] border-e border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-[2px] flex-col items-center py-8 gap-8"
        aria-label="Section index"
      >
        <div className="rotate-180 [writing-mode:vertical-rl] mono-label">
          INDEX
        </div>
        <ul className="flex flex-col items-center gap-5 mt-2">
          {items.map((it, i) => {
            const isActive = active === it.id;
            const num = String(i + 1).padStart(2, '0');
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  className="group flex flex-col items-center gap-1 text-[10px] font-mono tracking-[0.15em] uppercase"
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span
                    className={`w-3 h-px transition-all duration-300 ${
                      isActive
                        ? 'w-6 bg-[var(--accent)]'
                        : 'bg-[var(--text-muted)] group-hover:bg-[var(--text-primary)]'
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={
                      isActive
                        ? 'text-[var(--text-primary)]'
                        : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
                    }
                  >
                    {num}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto mono-label tracking-[0.25em] [writing-mode:vertical-rl] rotate-180">
          {Math.round(progress * 100).toString().padStart(2, '0')}%
        </div>
      </aside>
    </>
  );
};

/* -----------------------------------------------------------
   MetadataStrip — film-slate row of YEAR · ROLE · STACK · STATUS
   ----------------------------------------------------------- */
export const MetadataStrip: React.FC<{
  items: { label: string; value: string }[];
  className?: string;
}> = ({ items, className }) => {
  return (
    <dl
      className={`grid grid-cols-2 md:grid-cols-4 border-y border-[var(--border)] divide-y md:divide-y-0 md:divide-x divide-[var(--border)] [dir=rtl]:md:divide-x-reverse ${className || ''}`}
    >
      {items.map((it, i) => (
        <div key={i} className="py-4 px-4 first:ps-0 last:pe-0">
          <dt className="mono-label mb-2">{it.label}</dt>
          <dd className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--text-primary)] truncate">
            {it.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
