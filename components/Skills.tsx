import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../services/LanguageContext';

const Skills: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="relative border-b border-[var(--border)] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 mb-12 flex items-center gap-6">
        <span className="mono-meta whitespace-nowrap">[ 03 / STACK ]</span>
        <span className="hairline flex-1" aria-hidden="true" />
        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
          {t.skills.title}
        </h2>
      </div>

      {/* Infinite mono ticker */}
      <div className="relative w-full overflow-hidden mask-gradient-x" dir="ltr">
        <div className="flex w-max hover:pause-animation">
          {[0, 1, 2].map(arrayIndex => (
            <motion.div
              key={arrayIndex}
              className="flex"
              animate={{ x: '-50%' }}
              transition={{ duration: 65, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
            >
              {t.skills.list.map((skill, index) => (
                <a
                  key={`${arrayIndex}-${index}`}
                  href={skill.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 px-5 lg:px-7 h-16 border-l border-[var(--border)] last:border-r-0 hover:bg-[var(--bg-elevated)] transition-colors min-w-[180px]"
                >
                  <span className="mono-meta text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="w-5 h-5 relative grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition">
                    <img
                      src={`https://cdn.simpleicons.org/${skill.iconSlug}/F5F2EC`}
                      alt=""
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors whitespace-nowrap">
                    {skill.name}
                  </span>
                </a>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
