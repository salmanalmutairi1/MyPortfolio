import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../services/LanguageContext';
import { Award, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { CertificateItem } from '../types';
import CertificateModal from './CertificateModal';

const Certificates: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleOpenModal = (cert: CertificateItem) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCert(null), 300);
  };

  // Best 4 certificates (first 4 - Apple, ISTQB, BSF, Data Collection)
  const featuredCerts = t.certificates.items.slice(0, 4);
  const remainingCerts = t.certificates.items.slice(4);
  const displayedCerts = showAll ? t.certificates.items : featuredCerts;

  return (
    <section id="certificates" className="py-16 md:py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Award className="text-brand-500 w-6 h-6 sm:w-8 sm:h-8" />
            {t.certificates.title}
          </h2>
          <p className="text-gray-500 text-sm">
            {language === 'ar' ? `${t.certificates.items.length} شهادة احترافية` : `${t.certificates.items.length} Professional Certifications`}
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {displayedCerts.map((cert, index) => (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleOpenModal(cert)}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-b from-white/[0.03] to-transparent rounded-xl sm:rounded-2xl border border-white/5 hover:border-brand-500/30 overflow-hidden cursor-pointer transition-all duration-300"
              >
                {/* Certificate Image */}
                <div className="relative h-36 sm:h-44 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <div className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                      <Eye size={20} className="text-white sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5" dir={dir}>
                  <div className="mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-brand-300 transition-colors line-clamp-1">
                      {cert.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-1">{cert.issuer}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 font-mono bg-white/5 px-2 py-1 rounded">
                      {cert.date}
                    </span>
                    <div className="flex gap-1">
                      {cert.skills.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="hidden sm:inline-block px-2 py-0.5 text-xs bg-white/5 text-gray-400 rounded-full border border-white/5 truncate max-w-20"
                        >
                          {skill}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 text-xs bg-brand-500/10 text-brand-400 rounded-full">
                        +{cert.skills.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* See More / See Less Button */}
        {remainingCerts.length > 0 && (
          <motion.div 
            className="flex justify-center mt-8 sm:mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-brand-500/20 border border-white/10 hover:border-brand-500/30 rounded-full text-gray-300 hover:text-white transition-all duration-300"
            >
              <span className="text-sm sm:text-base font-medium">
                {showAll 
                  ? (language === 'ar' ? 'عرض أقل' : 'Show Less') 
                  : (language === 'ar' ? `عرض الكل (${remainingCerts.length}+)` : `View All (${remainingCerts.length}+ more)`)}
              </span>
              {showAll ? (
                <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <style>{`
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      `}</style>
    </section>
  );
};

export default Certificates;