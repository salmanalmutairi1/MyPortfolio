import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../services/LanguageContext';
import { Trophy } from 'lucide-react';

const Achievements: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="achievements" className="py-16 md:py-24 bg-black">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <Trophy className="text-yellow-500" />
            {t.achievements.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {t.achievements.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl -mr-12 -mt-12 transition-opacity group-hover:opacity-100 opacity-50" />
              
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">{item.title}</h3>
              <p className="text-gray-400 relative z-10 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;