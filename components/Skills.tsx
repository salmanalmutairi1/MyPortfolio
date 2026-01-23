import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../services/LanguageContext';
import { ExternalLink } from 'lucide-react';

const Skills: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 bg-black border-y border-white/5 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 mb-10 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{t.skills.title}</h2>
          <div className="h-px bg-white/10 flex-1 ml-6" />
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full overflow-hidden mask-gradient-x" dir="ltr">
        <div className="flex gap-4 w-max hover:pause-animation">
          {[...new Array(3)].map((_, arrayIndex) => (
            <motion.div
              key={arrayIndex}
              className="flex gap-4"
              animate={{ x: "-50%" }}
              transition={{ 
                duration: 60,
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
              }}
            >
              {t.skills.list.map((skill, index) => (
                <a
                  key={`${arrayIndex}-${index}`}
                  href={skill.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center gap-3 px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-500/30 transition-all cursor-pointer min-w-[160px]"
                >
                  <div className="w-6 h-6 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                     <img 
                       src={`https://cdn.simpleicons.org/${skill.iconSlug}/white`} 
                       alt={skill.name}
                       className="w-full h-full object-contain"
                       loading="lazy"
                     />
                  </div>
                  
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{skill.name}</span>
                </a>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
      
      <style>{`
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  );
};

export default Skills;