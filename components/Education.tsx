import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../services/LanguageContext';
import { GraduationCap } from 'lucide-react';
import LogoKSU from '../Assets/LogoKSU.png';

const Education: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section id="education" className="py-16 md:py-24 bg-black">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 flex items-center gap-3">
          <GraduationCap className="text-brand-500 w-6 h-6 sm:w-8 sm:h-8" />
          {t.education.title}
        </h2>

        <div className="grid gap-6">
          {t.education.items.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 items-start"
            >
              {/* University Logo */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-center">
                  <img 
                    src={LogoKSU} 
                    alt="King Saud University" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{edu.institution}</h3>
                <div className="text-lg sm:text-xl text-brand-400 mb-3">{edu.degree}</div>
                {edu.desc && <p className="text-gray-400 text-sm sm:text-base max-w-2xl mb-4">{edu.desc}</p>}
                <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-xs sm:text-sm">
                  {edu.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;