import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../services/LanguageContext';

const About: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden bg-black">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                {t.about.title}
              </span>
            </h2>
            <div className="w-16 h-1 bg-brand-500 rounded-full" />
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Content Text */}
            <div className={`space-y-6 text-lg text-gray-400 leading-relaxed ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t.about.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              
              <div className="pt-4 flex flex-wrap gap-4 justify-center">
                 <div className="px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm">
                   King Saud University
                 </div>
                 <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm">
                   Software Engineering
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;