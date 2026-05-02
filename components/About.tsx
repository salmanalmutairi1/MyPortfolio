import React from 'react';
import { useLanguage } from '../services/LanguageContext';
import { SectionHeader, Reveal } from './ui/Brutalist';

const About: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section
      id="about"
      className="relative border-b border-[var(--border)] py-20 md:py-28"
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-y-10 gap-x-6 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-5">
          <SectionHeader
            index="02"
            label="About"
            title={t.about.title}
          />
        </div>

        <div className="col-span-12 lg:col-span-7 lg:pt-32">
          <Reveal>
            <div
              className={`space-y-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
            >
              {t.about.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl text-[var(--text-secondary)] leading-[1.7]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 border-y border-[var(--border)] divide-x divide-[var(--border)]">
              {t.about.stats.map((s, i) => (
                <div key={i} className="py-6 px-5 first:ps-0">
                  <div className="font-display text-4xl md:text-5xl text-[var(--text-primary)] leading-none">
                    {s.value}
                  </div>
                  <div className="mono-label mt-3">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <span className="px-3 py-2 border border-[var(--border-strong)] mono-meta text-[var(--text-primary)]">
                {dir === 'rtl' ? 'جامعة الملك سعود' : 'King Saud University'}
              </span>
              <span className="px-3 py-2 border border-[var(--accent)] mono-meta text-[var(--accent)]">
                {dir === 'rtl' ? 'هندسة البرمجيات' : 'Software Engineering'}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
