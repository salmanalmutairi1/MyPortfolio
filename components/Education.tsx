import React from 'react';
import { useLanguage } from '../services/LanguageContext';
import { SectionHeader, Reveal } from './ui/Brutalist';
import LogoKSU from '../Assets/LogoKSU.png';

const Education: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section
      id="education"
      className="relative border-b border-[var(--border)] py-20 md:py-28"
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        <SectionHeader index="05" label="Edu" title={t.education.title} />

        <div className="grid gap-10">
          {t.education.items.map((edu, index) => (
            <Reveal key={index}>
              <article
                className={`grid grid-cols-12 gap-y-6 gap-x-6 lg:gap-x-10 border-y border-[var(--border-strong)] py-10`}
              >
                <div className="col-span-12 md:col-span-2 flex md:block items-center gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-3 flex items-center justify-center">
                    <img
                      src={LogoKSU}
                      alt="King Saud University"
                      className="w-full h-full object-contain grayscale"
                    />
                  </div>
                  <div className="md:mt-4 mono-meta">{String(index + 1).padStart(2, '0')} / KSU</div>
                </div>

                <div className={`col-span-12 md:col-span-10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <h3 className="font-display text-3xl md:text-5xl text-[var(--text-primary)] leading-tight">
                    {edu.institution}
                  </h3>
                  <div className="mt-4 font-mono text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
                    {edu.degree}
                  </div>
                  {edu.desc && (
                    <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                      {edu.desc}
                    </p>
                  )}
                  <div className="mt-6 inline-flex items-center gap-3 mono-meta">
                    <span className="inline-block w-2 h-2 bg-[var(--accent)]" aria-hidden="true" />
                    <span className="text-[var(--text-primary)]">{edu.date}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
